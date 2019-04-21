// Automatically generated

export interface ChartValues {
  bootnode?: {
    image?: {
      repository?: any
      tag?: any
    }
  }
  ethstats?: {
    image?: {
      repository?: any
      tag?: any
    }
    service?: {
      type?: any
    }
    webSocketSecret?: any
  }
  fullnameOverride?: any
  geth?: {
    account?: {
      address?: any
      privateKey?: any
      secret?: any
    }
    genesis?: {
      difficulty?: any
      gasLimit?: any
      networkId?: any
    }
    image?: {
      repository?: any
      tag?: any
    }
    miner?: {
      replicaCount?: any
    }
    tx?: {
      replicaCount?: any
      service?: {
        type?: any
      }
    }
  }
  imagePullPolicy?: any
  nameOverride?: any
  nodeSelector?: any
}

