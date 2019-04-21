// Automatically generated

export interface ChartValues {
  image?: {
    pullPolicy?: any
    repository?: any
    tag?: any
  }
  nameOverride?: any
  openvpn?: {
    OVPN_K8S_POD_NETWORK?: any
    OVPN_K8S_POD_SUBNET?: any
    OVPN_NETWORK?: any
    OVPN_PROTO?: any
    OVPN_SUBNET?: any
    conf?: any
  }
  persistence?: {
    accessMode?: any
    enabled?: any
    existingClaim?: any
    size?: any
    storageClass?: any
  }
  replicaCount?: any
  resources?: {
    limits?: {
      cpu?: any
      memory?: any
    }
    requests?: {
      cpu?: any
      memory?: any
    }
  }
  service?: {
    externalPort?: any
    internalPort?: any
    nodePort?: any
    type?: any
  }
}

