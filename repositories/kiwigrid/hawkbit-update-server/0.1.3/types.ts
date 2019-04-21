// Automatically generated

export interface ChartValues {
  affinity?: any
  env?: {
    springDatasourceDb?: any
    springDatasourceHost?: any
    springDatasourcePassword?: any
    springDatasourceUsername?: any
    springRabbitmqHost?: any
    springRabbitmqPassword?: any
    springRabbitmqUsername?: any
    springSecurityUserName?: any
    springSecurityUserPassword?: any
  }
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
    paths?: any
    tls?: any
  }
  livenessProbe?: {
    initialDelaySeconds?: any
    timeoutSeconds?: any
  }
  nameOverride?: any
  nodeSelector?: any
  readinessProbe?: {
    initialDelaySeconds?: any
    timeoutSeconds?: any
  }
  replicaCount?: any
  resources?: any
  service?: {
    port?: any
    type?: any
  }
  tolerations?: any
  useMysql?: any
  useRabbitmq?: any
}

