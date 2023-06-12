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
              name: 'Bacalhau Hyperspace NFTs 2023',
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

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      {bacalhauImages.length > 0 && (
        <>
          <img images={bacalhauImages[0]} mode="bacalhau" />
        </>
      )}
      <PromptInput prompt={prompt} setPrompt={setPrompt}>
        {/* If there's bacalhau images - show either wallet button (not connected) or mintNFT button */}
        <PromptButton
          action={() => callBacalhauToGenerateImages(prompt)}
          disabled={Boolean(status.loading) || !Boolean(prompt)}
          text="Generate Image"
        />
      </PromptInput>
    </main>
  )
}
