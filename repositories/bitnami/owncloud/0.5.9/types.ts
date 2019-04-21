// Automatically generated

export interface ChartValues {
  image?: any
  imagePullPolicy?: any
  ingress?: {
    annotations?: any
    enabled?: any
    servicePort?: any
    tls?: any
  }
  mariadb?: {
    mariadbRootPassword?: any
  }
  nameOverride?: any
  networkPolicyApiVersion?: any
  owncloudEmail?: any
  owncloudHost?: any
  owncloudLoadBalancerIP?: any
  owncloudPassword?: any
  owncloudPort?: any
  owncloudUsername?: any
  persistence?: {
    apache?: {
      accessMode?: any
      existingClaim?: any
      size?: any
      storageClass?: any
    }
    enabled?: any
    owncloud?: {
      accessMode?: any
      existingClaim?: any
      size?: any
      storageClass?: any
    }
  }
  resources?: any
  serviceType?: any
}

