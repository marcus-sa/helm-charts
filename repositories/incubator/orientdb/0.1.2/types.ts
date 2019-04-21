// Automatically generated

export interface ChartValues {
  affinity?: any
  config?: {
    overrideDistributedDbConfig?: any
    overrideHazelcastConfig?: any
  }
  distributed?: {
    enabled?: any
  }
  fullnameOverride?: any
  image?: {
    name?: any
    pullPolicy?: any
    pullSecret?: any
    tag?: any
  }
  ingress?: {
    annotations?: any
    enabled?: any
    hosts?: any
    path?: any
    tls?: any
  }
  jvm?: {
    memory?: any
    options?: any
    settings?: any
  }
  livenessProbe?: {
    enabled?: any
  }
  nameOverride?: any
  nodeSelector?: any
  persistence?: {
    backup?: {
      accessMode?: any
      size?: any
    }
    enabled?: any
    storage?: {
      accessMode?: any
      size?: any
    }
  }
  readinessProbe?: {
    enabled?: any
  }
  replicaCount?: any
  resources?: any
  rootPassword?: any
  service?: {
    gremlinWebsocket?: any
    hazelcast?: any
    orientBinary?: any
    orientHttp?: any
    port?: any
    type?: any
  }
  testing?: {
    enabled?: any
  }
  tolerations?: any
}

