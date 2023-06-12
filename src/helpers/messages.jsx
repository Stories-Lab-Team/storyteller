import { ReactElement } from 'react'
import { blockExplorerRoots } from './consts'

//this should become one component

const loadingMsg = (msg) => {
  return <h5 className="font-bold">{msg ? msg : 'Loading...'}</h5>
}

//data: { hash: any }
const successMintingNFTmsg = (data, msg) => {
  console.log('data msg', data)
  return (
    <>
      <h4 className="font-bold">Success! NFT Minted to FVM</h4>
      {data.hash && (
        <h6 className="font-bold break-words">Tx Hash: {data.hash}</h6>
      )}
      {/* TODO: FIX THIS CONTRACT ADDRESS TO BE GENERIC */}
      <h6 className="font-bold break-words">
        Contract Address:{' '}
        {process.env.NEXT_PUBLIC_BACALHAUFRC721_CONTRACT_ADDRESS_HS || ''}
      </h6>
      {/* TODO: TX HASHES are not available on the current block explorers for now
            - so can only see this transaction by going to the contract  */}
      <h6 noWrap className="font-bold break-words">
        <span>
          See contract on BlockExplorer:{' '}
          <a
            href={`${blockExplorerRoots.hyperspace[0]}${process.env.NEXT_PUBLIC_BACALHAUFRC721_CONTRACT_ADDRESS_HS}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'lightskyblue' }}
          >
            {`${blockExplorerRoots.hyperspace[0]}${process.env.NEXT_PUBLIC_BACALHAUFRC721_CONTRACT_ADDRESS_HS}`}
          </a>
        </span>
      </h6>
    </>
  )
}

const errorMsg = (err, msg) => {
  return (
    <>
      <h4 className="font-bold">{msg}</h4>
      <h6 className="font-bold break-words">{err}</h6>
    </>
  )
}

const genericMsg = (title, msg) => {
  return (
    <>
      <h4 className="font-bold">{title}</h4>
      <h6 className="font-bold break-words">{msg}</h6>
    </>
  )
}

export { loadingMsg, successMintingNFTmsg, errorMsg, genericMsg }
