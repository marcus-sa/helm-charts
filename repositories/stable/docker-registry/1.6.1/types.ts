// Automatically generated

export interface ChartValues {
  configData?: any
  fullnameOverride?: any
  image?: {
    pullPolicy?: any
    repository?: any
    tag?: any
  }
  imagePullSecrets?: any
  ingress?: {
    annotations?: any
    enabled?: any
    hosts?: any
    path?: any
    tls?: any
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
  priorityClassName?: any
  replicaCount?: any
  resources?: any
  s3?: {
    bucket?: any
    encrypt?: any
    region?: any
    secure?: any
  }
  secrets?: {
    azure?: {
      accountKey?: any
      accountName?: any
      container?: any
    }
    haSharedSecret?: any
    htpasswd?: any
    s3?: {
      accessKey?: any
      secretKey?: any
    }
    swift?: {
      password?: any
      username?: any
    }
  }
  securityContext?: {
    enabled?: any
    fsGroup?: any
    runAsUser?: any
  }
  service?: {
    annotations?: any
    clusterIP?: any
    externalPort?: any
    name?: any
    nodePort?: any
    port?: any
    type?: any
  }
  storage?: any
  swift?: {
    authurl?: any
    container?: any
  }
  tlsSecretName?: any
  tolerations?: any
  updateStrategy?: any
}

