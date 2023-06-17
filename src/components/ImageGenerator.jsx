import React from 'react'
import { PromptButton } from '@/components/PromptButton'
import { PromptInput } from '@/components/PromptInput'

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

export default function Images() {
  const [prompt, setPrompt] = React.useState()
  const [status, setStatus] = React.useState({
    loading: '',
    error: '',
    success: '',
    warning: '',
  })

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
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
