// Automatically generated

export interface ChartValues {
  affinity?: any
  fullnameOverride?: any
  image?: {
    pullPolicy?: any
    repository?: any
    tag?: any
  }
  nameOverride?: any
  nodeSelector?: any
  resources?: any
  server?: {
    config?: {
      http?: {
        port?: any
      }
      path?: any
      query?: {
        maxMemory?: any
        maxMemoryPerNode?: any
      }
    }
    jvm?: {
      gcMethod?: {
        g1?: {
          heapRegionSize?: any
        }
        type?: any
      }
      maxHeapSize?: any
    }
    log?: {
      presto?: {
        level?: any
      }
    }
    node?: {
      dataDir?: any
      environment?: any
    }
    workers?: any
  }
  service?: {
    type?: any
  }
  tolerations?: any
}

