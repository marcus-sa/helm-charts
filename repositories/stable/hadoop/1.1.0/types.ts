// Automatically generated

export interface ChartValues {
  antiAffinity?: any
  hadoopVersion?: any
  hdfs?: {
    dataNode?: {
      pdbMinAvailable?: any
      replicas?: any
      resources?: any
    }
    nameNode?: {
      pdbMinAvailable?: any
      resources?: any
    }
  }
  image?: {
    pullPolicy?: any
    repository?: any
    tag?: any
  }
  nameOverride?: any
  persistence?: {
    dataNode?: {
      accessMode?: any
      enabled?: any
      size?: any
      storageClass?: any
    }
    nameNode?: {
      accessMode?: any
      enabled?: any
      size?: any
      storageClass?: any
    }
  }
  yarn?: {
    nodeManager?: {
      parallelCreate?: any
      pdbMinAvailable?: any
      replicas?: any
      resources?: any
    }
    resourceManager?: {
      pdbMinAvailable?: any
      resources?: any
    }
  }
}

