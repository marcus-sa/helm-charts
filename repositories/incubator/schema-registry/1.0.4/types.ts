// Automatically generated

export interface ChartValues {
  configurationOverrides?: any
  external?: {
    enabled?: any
    loadBalancerIP?: any
    nodePort?: any
    servicePort?: any
    type?: any
  }
  image?: any
  imagePullPolicy?: any
  imageTag?: any
  ingress?: {
    annotations?: any
    enabled?: any
    hostname?: any
    labels?: any
    tls?: {
      enabled?: any
      secretName?: any
    }
  }
  jmx?: {
    enabled?: any
    port?: any
  }
  kafkaStore?: {
    overrideBootstrapServers?: any
    overrideGroupId?: any
  }
  livenessProbe?: {
    failureThreshold?: any
    initialDelaySeconds?: any
    periodSeconds?: any
    successThreshold?: any
    timeoutSeconds?: any
  }
  nameOverride?: any
  readinessProbe?: {
    failureThreshold?: any
    initialDelaySeconds?: any
    periodSeconds?: any
    successThreshold?: any
    timeoutSeconds?: any
  }
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
  secrets?: any
  servicePort?: any
}

