import { useEffect, useState } from 'react'
import { fetchNFTStoreStatus } from '@/helpers/nftstorage_helper_functions'
// const { src, alt } = Images.logo;

//todo; this only displays an image (not any other type of media)
export const ImageLayout = ({ src, alt, data, children }) => {
  const [deals, setDeals] = useState()

  useEffect(() => {
    let linkArr = data.properties.origins.ipfs.split('/')
    let ipfsCID = linkArr[2]
    // fetchDeals(ipfsCID); //getting cors or rate limited
  }, [src])

  const fetchDeals = async (ipfsCID) => {
    const nftdeals = await fetchNFTStoreStatus(ipfsCID)
      .then((resp) => {
        setDeals(nftdeals)
      })
      .catch((err) => console.log('error fetching deals', err))
  }

  return (
    <div className="m-4 h-fit">
      <img
        src={src}
        alt={alt}
        style={{
          border: '3px solid white',
          borderRadius: '1em',
          height: '20rem',
          width: 'fit-content',
          minWidth: '1rem',
        }}
      />
      <div>
        <p style={{ wordWrap: 'break-word' }}>Name: {data.name}</p>
        <p style={{ wordWrap: 'break-word' }}>
          Prompt: {data.properties.prompt}
        </p>
        {deals && (
          <>
            <p style={{ wordWrap: 'break-word' }}>
              {deals.deals.length > 0
                ? `Deals: Miner - ${deals.deals[0].miner}, Status - ${deals.deals[0].status}`
                : 'Deals: No deals yet'}
            </p>
            <p style={{ wordWrap: 'break-word' }}>
              {`Pinned?: ${deals.pin.status || 'No pins yet'}`}
            </p>
          </>
        )}
      </div>
      {children}
    </div>
  )
}

function StatusResult(StatusResult) {
  throw new Error('Function not implemented.')
}

//EX object
// const json = {
//   description: 'Prompt',
//   image:
//     'ipfs://bafybeiadkkdymv273fu7pn3zbfc3cn4sgmf7moeilvxf4fzoylmboyq6uq/blob',
//   name: 'Bacalhau NFT 2023',
//   properties: {
//     content: { ' text / markdown': 'hello, world' },
//     innovation: 100,
//     origins: {
//       ipfs: 'ipfs://bafkreic7fpje6mhilvneyigzxbrvl4h3qkxioov4wziqg42fhuccesvzcq',
//     },
//     prompt: 'Prompt',
//     type: 'stable-diffusion-image',
//   },
// };
