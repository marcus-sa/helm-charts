// Automatically generated

export interface ChartValues {
  affinity?: any
  externalDatabase?: {
    database?: any
    host?: any
    password?: any
    user?: any
  }
  extraEnv?: any
  global?: {
    imageRegistry?: any
  }
  healthcheckHttps?: any
  image?: {
    pullPolicy?: any
    pullSecrets?: any
    registry?: any
    repository?: any
    tag?: any
  }
  ingress?: {
    annotations?: any
    certManager?: any
    enabled?: any
    hosts?: any
    secrets?: any
  }
  livenessProbe?: any
  mariadb?: {
    db?: {
      name?: any
      user?: any
    }
    enabled?: any
    service?: {
      port?: any
    }
  }
  metrics?: {
    enabled?: any
    image?: {
      pullPolicy?: any
      registry?: any
      repository?: any
      tag?: any
    }
    podAnnotations?: any
    resources?: any
  }
  nameOverride?: any
  nodeSelector?: any
  persistence?: {
    accessMode?: any
    enabled?: any
    existingClaim?: any
    size?: any
    storageClass?: any
  }
  podAnnotations?: any
  readinessProbe?: any
  replicaCount?: any
  resources?: any
  service?: {
    annotations?: any
    clusterIP?: any
    externalTrafficPolicy?: any
    httpsPort?: any
    loadBalancerIP?: any
    nodePorts?: {
      http?: any
      https?: any
    }
    port?: any
    type?: any
  }
  tolerations?: any
  volumeMounts?: any
  volumes?: any
  yourlsPassword?: any
  yourlsSite?: any
  yourlsTablePrefix?: any
  yourlsUsername?: any
}

