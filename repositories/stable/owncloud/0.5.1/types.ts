// Automatically generated

export interface ChartValues {
  image?: any
  imagePullPolicy?: any
  ingress?: {
    enabled?: any
    servicePort?: any
  }
  mariadb?: {
    mariadbRootPassword?: any
  }
  nameOverride?: any
  owncloudEmail?: any
  owncloudHost?: any
  owncloudLoadBalancerIP?: any
  owncloudPassword?: any
  owncloudPort?: any
  owncloudUsername?: any
  persistence?: {
    apache?: {
      accessMode?: any
      size?: any
      storageClass?: any
    }
    enabled?: any
    owncloud?: {
      accessMode?: any
      size?: any
      storageClass?: any
    }
  }
  resources?: any
  serviceType?: any
}

