import { ethers } from 'ethers'
import BacalhauCompiledContract from '../api/StoryTellerFRC721.json'
import { INITIAL_WALLET_STATUS } from './consts'
import { genericMsg, successMintingNFTmsg } from './messages'

const contractAddressHyperspace =
  process.env.NEXT_PUBLIC_BACALHAUFRC721_CONTRACT_ADDRESS || ''

//Destructure for other chain additions
export const getContractConnection = async (mode) => {
  console.log('Connection to Contract...')
  // TO DO - no hardcoding
  let rpc = process.env.NEXT_PUBLIC_RPC_FILECOIN_CALIBRATION
  let provider, signer, bacalhauContract
  if (mode === 'read') {
    provider = new ethers.providers.JsonRpcProvider(rpc)
    bacalhauContract = new ethers.Contract(
      contractAddressHyperspace,
      BacalhauCompiledContract.abi,
      provider
    )
  } else if (window.ethereum) {
    provider = new ethers.providers.Web3Provider(window.ethereum)
    const contract = new ethers.Contract(
      contractAddressHyperspace,
      BacalhauCompiledContract.abi,
      provider
    )
    signer = provider.getSigner()
    bacalhauContract = contract.connect(signer)
    console.log('bac contract', bacalhauContract)
  }
  return bacalhauContract
}

export const fetchContractConnection = async (mode, rpc, contractAddress) => {
  console.log('Connection to Contract...')
  let provider, contract //,signer;
  if (mode === 'read') {
    provider = new ethers.providers.JsonRpcProvider(rpc)
    contract = new ethers.Contract(
      contractAddress,
      BacalhauCompiledContract.abi,
      provider
    )
  } else if (window.ethereum) {
    provider = new ethers.providers.Web3Provider(window.ethereum)
    contract = new ethers.Contract(
      contractAddress,
      BacalhauCompiledContract.abi,
      provider
    )
    // signer = provider.getSigner();
    // connectedcontract = contract.connect(signer);
  }
  return contract
}

//Events never fire.... hmmm
export const setContractEventListeners = async (
  setStatus,
  getDisplayData,
  getNFTByOwner,
  bacalhauImages,
  setBacalhauImages
) => {
  const connectedContract = await getContractConnection('read')
  connectedContract.on(
    'NewBacalhauFRC721NFTMinted',
    (sender, tokenId, tokenURI) => {
      console.log(
        'NewbacalhauNFTMinted event triggered, data: ',
        sender,
        tokenId,
        tokenURI
      )
      setStatus({
        ...INITIAL_WALLET_STATUS,
        success: successMintingNFTmsg(tokenURI),
      })
      getDisplayData()
      getNFTByOwner()
      setBacalhauImages((prevState) => [
        {
          ...prevState[0],
          minted: 'true',
        },
      ])
    }
  )
}
