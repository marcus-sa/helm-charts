// Automatically generated

export interface ChartValues {
  agent?: {
    env?: any
    resources?: any
  }
  images?: {
    agent?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
    dind?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
    server?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
  }
  ingress?: {
    annotations?: any
    enabled?: any
    hosts?: any
    tls?: any
  }
  nameOverride?: any
  persistence?: {
    accessMode?: any
    enabled?: any
    existingClaim?: any
    size?: any
    storageClass?: any
  }
  server?: {
    env?: any
    host?: any
    resources?: any
  }
  service?: {
    httpPort?: any
    nodePort?: any
    type?: any
  }
  sharedSecret?: any
}

