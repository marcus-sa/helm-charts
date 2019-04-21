// Automatically generated

export interface ChartValues {
  configurationOverrides?: any
  image?: any
  imagePullPolicy?: any
  imageTag?: any
  ingress?: {
    annotations?: any
    enabled?: any
    hostname?: any
    labels?: any
  }
  kafkaStore?: {
    overrideBootstrapServers?: any
    overrideGroupId?: any
  }
  nameOverride?: any
  replicaCount?: any
  resources?: any
  sasl?: {
    configPath?: any
    scram?: {
      clientPassword?: any
      clientUser?: any
      enabled?: any
      init?: {
        image?: any
        imagePullPolicy?: any
        imageTag?: any
      }
      useExistingSecret?: {
        clientPassword?: any
        zookeeperClientPassword?: any
      }
      zookeeperClientPassword?: any
      zookeeperClientUser?: any
    }
  }
  schemaRegistryOpts?: any
  servicePort?: any
}

