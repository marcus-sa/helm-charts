// Automatically generated

export interface ChartValues {
  affinity?: any
  db?: {
    bundleTestDB?: any
    chartName?: any
    host?: any
    port?: any
  }
  fullnameOverride?: any
  global?: {
    imagePullSecrets?: any
    imageRegistry?: any
  }
  image?: {
    pullPolicy?: any
    pullSecrets?: any
    registry?: any
    repository?: any
    tag?: any
  }
  ingress?: {
    annotations?: any
    enabled?: any
    host?: any
    path?: any
    tls?: any
  }
  metrics?: {
    enabled?: any
    image?: {
      pullPolicy?: any
      pullSecrets?: any
      registry?: any
      repository?: any
      tag?: any
    }
    podAnnotations?: any
    resources?: any
  }
  nameOverride?: any
  nodeSelector?: any
  podAnnotations?: any
  probesEnabled?: any
  resources?: any
  service?: {
    port?: any
    type?: any
  }
  tolerations?: any
}

