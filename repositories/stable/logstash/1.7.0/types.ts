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
  files?: any
  filters?: any
  fullnameOverride?: any
  image?: {
    pullPolicy?: any
    pullSecrets?: any
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
    enabled?: any
    size?: any
    storageClass?: any
  }
  podAnnotations?: any
  podDisruptionBudget?: any
  podLabels?: any
  ports?: any
  priorityClassName?: any
  readinessProbe?: any
  replicaCount?: any
  resources?: any
  securityContext?: {
    fsGroup?: any
    runAsUser?: any
  }
  service?: {
    annotations?: any
    clusterIP?: any
    externalTrafficPolicy?: any
    loadBalancerIP?: any
    nodePort?: any
    ports?: {
      http?: {
        port?: any
      }
    }
    type?: any
  }
  terminationGracePeriodSeconds?: any
  tolerations?: any
  volumeMounts?: any
  volumes?: any
}

