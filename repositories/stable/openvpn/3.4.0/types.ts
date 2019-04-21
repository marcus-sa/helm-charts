// Automatically generated

export interface ChartValues {
  fullnameOverride?: any
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
    dhcpOptionDomain?: any
  }
  persistence?: {
    accessMode?: any
    enabled?: any
    existingClaim?: any
    size?: any
    storageClass?: any
    subPath?: any
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
    annotations?: any
    externalIPs?: any
    externalPort?: any
    internalPort?: any
    loadBalancerIP?: any
    nodePort?: any
    type?: any
  }
}

