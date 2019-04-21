// Automatically generated

export interface ChartValues {
  config?: {
    network?: any
    nodeInstancePrefix?: any
    nodeTags?: any
    projectID?: any
    subnetwork?: any
    tokenUrl?: any
  }
  controller?: {
    affinity?: any
    image?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
    nodeSelector?: any
    replicaCount?: any
    resources?: any
    tolerations?: any
  }
  defaultBackend?: {
    affinity?: any
    image?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
    nodeSelector?: any
    replicaCount?: any
    resources?: any
    tolerations?: any
  }
  fullnameOverride?: any
  nameOverride?: any
  rbac?: {
    create?: any
    enabled?: any
  }
  secret?: any
  service?: {
    port?: any
    type?: any
  }
  serviceAccount?: {
    create?: any
    name?: any
  }
}

