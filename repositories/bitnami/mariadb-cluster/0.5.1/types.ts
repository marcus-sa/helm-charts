// Automatically generated

export interface ChartValues {
  db?: {
    name?: any
    password?: any
    user?: any
  }
  image?: any
  master?: {
    antiAffinity?: any
    persistence?: {
      accessModes?: any
      annotations?: any
      enabled?: any
      size?: any
      storageClass?: any
    }
    resources?: any
  }
  metrics?: {
    annotations?: any
    enabled?: any
    image?: any
    imagePullPolicy?: any
    imageTag?: any
    resources?: any
  }
  nameOverride?: any
  pullPolicy?: any
  replication?: {
    password?: any
    user?: any
  }
  root?: {
    password?: any
  }
  service?: {
    port?: any
    type?: any
  }
  slave?: {
    antiAffinity?: any
    hpa?: {
      max?: any
      min?: any
      target?: {
        cpuPercentage?: any
      }
    }
    replicas?: any
    resources?: any
  }
}

