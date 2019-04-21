// Automatically generated

export interface ChartValues {
  additionalPorts?: any
  affinity?: any
  configurationOverrides?: any
  external?: {
    annotations?: any
    distinct?: any
    domain?: any
    enabled?: any
    firstListenerPort?: any
    init?: {
      image?: any
      imagePullPolicy?: any
      imageTag?: any
    }
    servicePort?: any
    type?: any
  }
  fullnameOverride?: any
  headless?: {
    annotations?: any
    port?: any
    targetPort?: any
  }
  image?: any
  imagePullPolicy?: any
  imageTag?: any
  jmx?: {
    configMap?: {
      enabled?: any
      overrideConfig?: any
      overrideName?: any
    }
    port?: any
    whitelistObjectNames?: any
  }
  kafkaHeapOptions?: any
  livenessProbe?: {
    failureThreshold?: any
    initialDelaySeconds?: any
    periodSeconds?: any
    successThreshold?: any
    timeoutSeconds?: any
  }
  logSubPath?: any
  nameOverride?: any
  nodeSelector?: any
  persistence?: {
    enabled?: any
    mountPath?: any
    size?: any
    storageClass?: any
  }
  podAnnotations?: any
  podManagementPolicy?: any
  prometheus?: {
    jmx?: {
      enabled?: any
      image?: any
      imageTag?: any
      interval?: any
      port?: any
      resources?: any
    }
    kafka?: {
      enabled?: any
      image?: any
      imageTag?: any
      interval?: any
      port?: any
      resources?: any
    }
    operator?: {
      enabled?: any
      serviceMonitor?: {
        namespace?: any
        selector?: any
      }
    }
  }
  rbac?: {
    enabled?: any
  }
  readinessProbe?: {
    failureThreshold?: any
    initialDelaySeconds?: any
    periodSeconds?: any
    successThreshold?: any
    timeoutSeconds?: any
  }
  replicas?: any
  resources?: any
  schedulerName?: any
  secrets?: any
  terminationGracePeriodSeconds?: any
  tolerations?: any
  topics?: any
  updateStrategy?: any
  zookeeper?: {
    enabled?: any
    nameOverride?: any
    port?: any
    url?: any
  }
}

