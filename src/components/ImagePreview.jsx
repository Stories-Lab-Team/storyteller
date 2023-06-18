import { ImageLayout } from './ImageLayout'

const ipfsHttpGatewayLink = `.ipfs.nftstorage.link/` //.ipfs.ipfs.joaoleitao.org

//should take an array prop
// interface ImagePreviewContainerProps {
//   images: Object[];
//   mode?: 'bacalhau' | 'nft';
//   children?: ReactNode;
// }

export const ImagePreview = ({
  images,
  mode, //= bacalhau or nfts
  children,
  ...rest
}) => {
  return (
    <div className="h-auto w-full p-5 flex flex-wrap justify-center overflow-hidden overflow-y-scroll">
      {images.map((item, x) => {
        console.log('parsing image', item)
        let link, linkArr
        if (mode === 'bacalhau') {
          linkArr = item.properties.origins.ipfs.split('/')
          link = `https://${linkArr[2]}${ipfsHttpGatewayLink}`
        } else {
          linkArr = item.image.split('/')
          link = `https://${linkArr[2]}${ipfsHttpGatewayLink}${linkArr[3]}`
        }
        return (
          <div key={x} className="flex flex-col justify-center">
            <ImageLayout src={link} alt={item.name} data={item}  />
            {children}
          </div>
        )
      })}
    </div>
  )
}
