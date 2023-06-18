import React from 'react'
import { NFTStorage } from 'nft.storage'
import { PromptButton } from '@/components/PromptButton'
import { PromptInput } from '@/components/PromptInput'
import {
  callBacalhauJob,
  getImageBlob,
} from '@/helpers/general_helper_functions'
import { INITIAL_TRANSACTION_STATE } from '@/helpers/consts'
import { errorMsg, genericMsg, loadingMsg } from '@/helpers/messages'
import { ImagePreview } from '@/components/ImagePreview'

export default function Images() {
  const [bacalhauImages, setBacalhauImages] = React.useState([])
  const [prompt, setPrompt] = React.useState()
  const [status, setStatus] = React.useState(INITIAL_TRANSACTION_STATE)

  // NFT.Stroage
  const NFTStorageClient = new NFTStorage({
    token: process.env.NEXT_PUBLIC_NFT_STORAGE_API_KEY ?? 'undefined',
  })

  // Stable diffusion script call (text to image prompt)
  const callBacalhauToGenerateImages = async (promptInput) => {
    //save to bacalhauImages
    console.log('Calling Bacalhau & Running Stable Diffusion Script.....')
    setStatus({
      ...INITIAL_TRANSACTION_STATE,
      loading: loadingMsg(
        'Calling Bacalhau & Running Stable Diffusion Script...'
      ),
    })

    await callBacalhauJob(promptInput)
      .then(async (cid) => {
        console.log('Bacalhau Job Successful', cid)
        setStatus({
          ...INITIAL_TRANSACTION_STATE,
          loading: loadingMsg('Creating Metadata from Bacalhau Job Results...'),
        })
        const imageIPFSOrigin = `ipfs://${cid}/outputs/image0.png`
        const imageHTTPURL = `https://${cid}.ipfs.nftstorage.link/outputs/image0.png`
        await createNFTMetadata(promptInput, imageIPFSOrigin, imageHTTPURL)
          .then((data) => {
            console.log('Nft Metadata created', data)
            const bacalhauResult = { ...data, minted: false }
            console.log('bacResult', bacalhauResult, bacalhauImages)
            setBacalhauImages([bacalhauResult])
            setStatus({
              ...INITIAL_TRANSACTION_STATE,
              success: genericMsg(
                'Success running Bacalhau Job',
                `Job output CID: ${cid}`
              ),
            })
          })
          .catch((err) => {
            setStatus({
              ...INITIAL_TRANSACTION_STATE,
              error: errorMsg('Error creating NFT Metadata', err),
            })
            console.log('err', err)
          })
      })
      .catch((err) => {
        setStatus({
          ...INITIAL_TRANSACTION_STATE,
          error: errorMsg('Error Fetch Stable Diffusion Result', err),
        })
        console.log('err', err)
      })
  }

  const createNFTMetadata = async (
    promptInput,
    imageIPFSOrigin,
    imageHTTPURL //fetchable through http
  ) => {
    console.log('Creating NFT Metadata...', imageHTTPURL)
    let nftJSON
    await getImageBlob(status, setStatus, imageHTTPURL).then(
      async (imageData) => {
        await NFTStorageClient.storeBlob(imageData)
          .then((imageIPFS) => {
            console.log(imageIPFS)
            nftJSON = {
              name: 'Stories Lab NFTs 2023',
              description: promptInput,
              image: imageData, // Blob
              properties: {
                prompt: promptInput,
                type: 'stable-diffusion-image',
                origins: {
                  ipfs: `ipfs://${imageIPFS}`,
                  bacalhauipfs: imageIPFSOrigin,
                },
                innovation: 100,
                content: {
                  'text/markdown': promptInput,
                },
              },
            }
          })
          .catch((err) => console.log('error creating blob cid', err))
      }
    )
    return nftJSON
  }

  // Store NFT Metadata to NFT.Storage
  const saveToNFTStorage = async (nftJson) => {
    //check wallet connection first
    // TODO: move these functions to a generic call
    if (userWallet.accounts.length < 1) {
      setStatus({
        ...status,
        warning: genericMsg(
          'No wallet connection',
          'Connect your wallet to Mint an NFT!'
        ),
      })
      return
    }
    if (userWallet.chainId || userWallet.chainId !== '0x4CB2F') {
      await changeWalletChain('0x4CB2F').catch((err) => {
        setStatus({
          ...INITIAL_TRANSACTION_STATE,
          error: errorMsg(err, 'Couldnt change chain to calibration'),
        })
        return
      })
    }

    setStatus({
      ...status,
      loading: loadingMsg('Saving Metadata to NFT.Storage....'),
    })

    await NFTStorageClient.store(nftJson)
      .then((metadata) => {
        console.log('NFT Data pinned to IPFS & stored on Filecoin!')
        console.log('Metadata URI: ', metadata.url)
        mintNFT(metadata)
      })
      .catch((err) => {
        console.log('error uploading to nft.storage')
        setStatus({
          ...INITIAL_TRANSACTION_STATE,
          error: errorMsg(err, 'Error saving to NFT.Storage'),
        })
      })
  }

  // Connect to the contract to mint the NFT!
  const mintNFT = async (metadata) => {
    //wallet checks required here.
    setStatus({
      ...status,
      loading: loadingMsg('Waiting for wallet permission...'),
    })
    const contract = await getContractConnection('write')

    if (contract) {
      await contract
        .mintBacalhauNFT(
          userWallet.accounts[0],
          metadata.url //test ipfs address
        )
        .then(async (data) => {
          console.log('CALLED FUNCTION', data)
          setStatus({
            ...status,
            loading: loadingMsg('Minting NFT...'),
          })
          await data
            .wait()
            .then(async (tx) => {
              console.log('tx', tx)
              //CURRENTLY NOT RETURNING TX - (I use event triggering to see)
              let tokenId = tx.events[1].args.tokenId.toString()
              console.log('tokenId args', tokenId)
              setStatus({
                ...INITIAL_TRANSACTION_STATE,
                success: successMintingNFTmsg(data),
              })
            })
            .catch((err) => {
              console.log('ERROR', err)
              setStatus({
                ...status,
                loading: '',
                error: errorMsg(err.message, 'Error minting NFT'),
              })
            })
        })
        .catch((err) => {
          console.log('ERROR1', err)
          setStatus({
            ...status,
            loading: '',
            error: errorMsg(
              err && err.message ? err.message : null,
              'Error minting NFT'
            ),
          })
        })
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      {!status.loading && status !== INITIAL_TRANSACTION_STATE && (
        <div className="alert">
          <span>
            {status.error
              ? status.error
              : status.success
              ? status.success
              : status.warning}
          </span>
        </div>
      )}
      {status.loading && (
        <div className="alert">
          <span>{status.loading}</span>
        </div>
      )}
      {bacalhauImages.length > 0 && (
        <>
          <ImagePreview images={bacalhauImages} mode="bacalhau" />
        </>
      )}
      <PromptInput prompt={prompt} setPrompt={setPrompt}>
        {/* If there's bacalhau images - show either wallet button (not connected) or mintNFT button */}
        <PromptButton
          action={() => callBacalhauToGenerateImages(prompt)}
          disabled={Boolean(status.loading) || !Boolean(prompt)}
          text="Generate Image"
        />

        {!bacalhauImages[0].minted && (
          <PromptButton
            text={'Mint NFT!'}
            disabled={Boolean(status.loading)}
            action={() => saveToNFTStorage(bacalhauImages[0])}
          />
        )}
      </PromptInput>
    </main>
  )
}
