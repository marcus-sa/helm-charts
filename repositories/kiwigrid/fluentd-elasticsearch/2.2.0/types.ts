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
    scheme?: any
    ssl_version?: any
  }
  env?: any
  extraVolumeMounts?: any
  extraVolumes?: any
  fullnameOverride?: any
  image?: {
    pullPolicy?: any
    repository?: any
    tag?: any
  }
  livenessProbe?: {
    enabled?: any
  }
  nameOverride?: any
  nodeSelector?: any
  podAnnotations?: any
  podSecurityPolicy?: {
    annotations?: any
    enabled?: any
  }
  priorityClassName?: any
  rbac?: {
    create?: any
  }
  resources?: any
  secret?: any
  service?: {
    port?: any
    ports?: any
    type?: any
  }
  serviceAccount?: {
    create?: any
    name?: any
  }
  tolerations?: any
  updateStrategy?: any
}

