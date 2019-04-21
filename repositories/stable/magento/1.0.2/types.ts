// Automatically generated

export interface ChartValues {
  externalDatabase?: {
    database?: any
    host?: any
    password?: any
    port?: any
    user?: any
  }
  image?: {
    pullPolicy?: any
    pullSecrets?: any
    registry?: any
    repository?: any
    tag?: any
  }
  magentoAdminUri?: any
  magentoEmail?: any
  magentoFirstName?: any
  magentoLastName?: any
  magentoLoadBalancerIP?: any
  magentoMode?: any
  magentoUsername?: any
  mariadb?: {
    enabled?: any
    mariadbDatabase?: any
    mariadbRootPassword?: any
    mariadbUser?: any
  }
  nameOverride?: any
  persistence?: {
    apache?: {
      accessMode?: any
      size?: any
      storageClass?: any
    }
    enabled?: any
    magento?: {
      accessMode?: any
      size?: any
      storageClass?: any
    }
  }
  resources?: any
  serviceType?: any
}

