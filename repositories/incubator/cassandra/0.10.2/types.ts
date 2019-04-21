// Automatically generated

export interface ChartValues {
  affinity?: any
  argsOverrides?: any
  backup?: {
    enabled?: any
  }
  commandOverrides?: any
  config?: {
    cluster_domain?: any
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
  configOverrides?: any
  env?: any
  exporter?: {
    enabled?: any
    image?: {
      repo?: any
      tag?: any
    }
    jvmOpts?: any
    port?: any
  }
  fullnameOverride?: any
  image?: {
    pullPolicy?: any
    pullSecrets?: any
    repo?: any
    tag?: any
  }
  livenessProbe?: {
    failureThreshold?: any
    initialDelaySeconds?: any
    periodSeconds?: any
    successThreshold?: any
    timeoutSeconds?: any
  }
  nameOverride?: any
  persistence?: {
    accessMode?: any
    enabled?: any
    size?: any
    storageClass?: any
  }
  podAnnotations?: any
  podDisruptionBudget?: any
  podLabels?: any
  podManagementPolicy?: any
  podSettings?: {
    terminationGracePeriodSeconds?: any
  }
  rbac?: {
    create?: any
  }
  readinessProbe?: {
    failureThreshold?: any
    initialDelaySeconds?: any
    periodSeconds?: any
    successThreshold?: any
    timeoutSeconds?: any
  }
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
  serviceAccount?: {
    create?: any
    name?: any
  }
  tolerations?: any
  updateStrategy?: {
    type?: any
  }
}

