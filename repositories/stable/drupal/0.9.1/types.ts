// Automatically generated

export interface ChartValues {
  drupalEmail?: any
  drupalPassword?: any
  drupalUsername?: any
  extraVars?: any
  image?: any
  imagePullPolicy?: any
  imagePullSecrets?: any
  ingress?: {
    annotations?: any
    enabled?: any
    hostname?: any
    tls?: any
  }
  livenessProbe?: any
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
  readinessProbe?: any
  resources?: any
  serviceType?: any
  volumeMounts?: {
    apache?: {
      mountPath?: any
    }
    drupal?: {
      mountPath?: any
    }
  }
}

