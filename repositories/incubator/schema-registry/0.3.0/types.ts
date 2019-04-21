// Automatically generated

export interface ChartValues {
  configurationOverrides?: any
  image?: any
  imagePullPolicy?: any
  imageTag?: any
  kafka?: {
    enabled?: any
    zookeeperPort?: any
    zookeeperUrl?: any
  }
  kafkaStore?: {
    overrideBootstrapServers?: any
  }
  nameOverride?: any
  overrideGroupId?: any
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

