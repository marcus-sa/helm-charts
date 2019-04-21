// Automatically generated

export interface ChartValues {
  allowEmptyPassword?: any
  drupalEmail?: any
  drupalPassword?: any
  drupalUsername?: any
  externalDatabase?: {
    database?: any
    host?: any
    password?: any
    user?: any
  }
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
  mariadb?: {
    enabled?: any
    mariadbDatabase?: any
    mariadbUser?: any
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

