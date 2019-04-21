// Automatically generated

export interface ChartValues {
  affinity?: any
  env?: {
    JMXPORT?: any
  }
  exporters?: {
    jmx?: {
      config?: {
        lowercaseOutputName?: any
        rules?: any
        startDelaySeconds?: any
      }
      enabled?: any
      env?: any
      image?: {
        pullPolicy?: any
        repository?: any
        tag?: any
      }
      livenessProbe?: any
      ports?: {
        jmxxp?: {
          containerPort?: any
        }
      }
      readinessProbe?: any
      resources?: any
    }
    zookeeper?: {
      config?: {
        logLevel?: any
        resetOnScrape?: any
      }
      enabled?: any
      env?: any
      image?: {
        pullPolicy?: any
        repository?: any
        tag?: any
      }
      livenessProbe?: any
      path?: any
      ports?: {
        zookeeperxp?: {
          containerPort?: any
        }
      }
      readinessProbe?: any
      resources?: any
    }
  }
  fullnameOverride?: any
  headless?: {
    annotations?: any
  }
  image?: {
    pullPolicy?: any
    repository?: any
    tag?: any
  }
  jobs?: {
    chroots?: {
      enabled?: any
    }
  }
  livenessProbe?: any
  nameOverride?: any
  nodeSelector?: any
  persistence?: {
    accessMode?: any
    enabled?: any
    size?: any
    storageClass?: any
  }
  podAnnotations?: any
  podDisruptionBudget?: any
  podLabels?: any
  ports?: {
    client?: {
      containerPort?: any
    }
  }
  priorityClassName?: any
  readinessProbe?: any
  replicaCount?: any
  resources?: any
  schedulerName?: any
  securityContext?: any
  service?: {
    annotations?: any
    ports?: {
      client?: {
        port?: any
      }
    }
    type?: any
  }
  terminationGracePeriodSeconds?: any
  tolerations?: any
  updateStrategy?: any
}

