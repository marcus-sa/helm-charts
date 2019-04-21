// Automatically generated

export interface ChartValues {
  drupalEmail?: any
  drupalPassword?: any
  drupalUsername?: any
  image?: any
  imagePullPolicy?: any
  imagePullSecrets?: any
  ingress?: {
    annotations?: any
    enabled?: any
    hostname?: any
    tls?: any
  }
  nameOverride?: any
  persistence?: {
    apache?: {
      accessMode?: any
      size?: any
      storageClass?: any
    }
    drupal?: {
      accessMode?: any
      existingClaim?: any
      hostPath?: any
      size?: any
      storageClass?: any
    }
    enabled?: any
  }
  resources?: any
  serviceType?: any
}

