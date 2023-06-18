export const INITIAL_WALLET_STATUS = {
  injectedeth: false,
  accounts: [],
  chainId: null,
  message: '',
}

export const INITIAL_TRANSACTION_STATE = {
  loading: '',
  error: '',
  success: '',
  warning: '',
}

export const ipfsHttpGatewayLink = `.ipfs.nftstorage.link/`
export const blockExplorerRoots = {
  wallaby: [
    'https://fvm.starboard.ventures/contracts/',
    'https://wallaby.filscan.io/address/general?address=',
  ],
  hyperspace: [
    'https://fvm.starboard.ventures/contracts/',
    'https://hyperspace.filscan.io/address/general?address=',
    'https://explorer.glif.io/?network=hyperspacenet',
    'https://beryx.zondax.ch/',
    'https://hyperspace.filfox.info/en',
  ],
  calibration: [
    'https://calibration.filscout.com/en',
    'https://calibration.filscan.io/',
  ],
}
