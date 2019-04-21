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
    type?: any
  }
}

