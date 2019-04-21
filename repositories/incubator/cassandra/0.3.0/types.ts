// Automatically generated

export interface ChartValues {
  affinity?: any
  config?: {
    cluster_name?: any
    cluster_size?: any
    dc_name?: any
    endpoint_snitch?: any
    heap_new_size?: any
    max_heap_size?: any
    ports?: {
      agent?: any
      cql?: any
      thrift?: any
    }
    rack_name?: any
    seed_size?: any
    start_rpc?: any
  }
  fullnameOverride?: any
  image?: {
    pullPolicy?: any
    pullSecrets?: any
    repo?: any
    tag?: any
  }
  nameOverride?: any
  persistence?: {
    accessMode?: any
    enabled?: any
    size?: any
    storageClass?: any
  }
  podLabels?: any
  podManagementPolicy?: any
  resources?: any
  securityContext?: {
    enabled?: any
    fsGroup?: any
    runAsUser?: any
  }
  selector?: any
  service?: {
    type?: any
  }
  updateStrategy?: {
    type?: any
  }
}

