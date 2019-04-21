// Automatically generated

export interface ChartValues {
  configData?: any
  image?: {
    pullPolicy?: any
    repository?: any
    tag?: any
  }
  ingress?: {
    annotations?: any
    enabled?: any
    hosts?: any
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
  replicaCount?: any
  resources?: any
  s3?: {
    bucket?: any
    encrypt?: any
    region?: any
    secure?: any
  }
  secrets?: {
    haSharedSecret?: any
    htpasswd?: any
    s3?: {
      accessKey?: any
      secretKey?: any
    }
  }
  service?: {
    annotations?: any
    externalPort?: any
    name?: any
    nodePort?: any
    port?: any
    type?: any
  }
  storage?: any
  tlsSecretName?: any
  updateStrategy?: any
}

