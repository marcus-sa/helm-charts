// Automatically generated

export interface ChartValues {
  annotations?: any
  configMaps?: any
  elasticsearch?: {
    buffer_chunk_limit?: any
    buffer_queue_limit?: any
    host?: any
    logstash_prefix?: any
    port?: any
  }
  env?: any
  extraVolumeMounts?: any
  extraVolumes?: any
  image?: {
    repository?: any
    tag?: any
  }
  imagePullPolicy?: any
  livenessProbe?: {
    enabled?: any
  }
  nameOverride?: any
  nodeSelector?: any
  podSecurityPolicy?: {
    annotations?: any
    enabled?: any
  }
  rbac?: {
    create?: any
  }
  resources?: any
  service?: {
    ports?: any
    type?: any
  }
  serviceAccount?: {
    create?: any
    name?: any
  }
  tolerations?: any
}

