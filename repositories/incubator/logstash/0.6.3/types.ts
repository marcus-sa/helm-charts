// Automatically generated

export interface ChartValues {
  affinity?: any
  config?: any
  elasticsearch?: {
    host?: any
    port?: any
  }
  exporter?: {
    logstash?: {
      config?: any
      enabled?: any
      image?: {
        pullPolicy?: any
        repository?: any
        tag?: any
      }
      livenessProbe?: any
      port?: any
      readinessProbe?: any
      resources?: any
      target?: {
        port?: any
      }
    }
  }
  filters?: any
  fullnameOverride?: any
  image?: {
    pullPolicy?: any
    repository?: any
    tag?: any
  }
  ingress?: {
    annotations?: any
    enabled?: any
    hosts?: any
    path?: any
    tls?: any
  }
  inputs?: any
  livenessProbe?: any
  nameOverride?: any
  nodeSelector?: any
  outputs?: any
  patterns?: any
  persistence?: {
    accessMode?: any
    size?: any
    storageClass?: any
  }
  podAnnotations?: any
  podDisruptionBudget?: any
  podLabels?: any
  ports?: any
  readinessProbe?: any
  replicaCount?: any
  resources?: any
  service?: {
    annotations?: any
    loadBalancerIP?: any
    ports?: {
      http?: {
        port?: any
      }
    }
    type?: any
  }
  tolerations?: any
  volumeMounts?: any
}

