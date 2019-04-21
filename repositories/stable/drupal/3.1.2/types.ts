// Automatically generated

export interface ChartValues {
  allowEmptyPassword?: any
  drupalEmail?: any
  drupalPassword?: any
  drupalProfile?: any
  drupalUsername?: any
  externalDatabase?: {
    database?: any
    host?: any
    password?: any
    user?: any
  }
  extraVars?: any
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
    enabled?: any
    hostname?: any
    hosts?: any
  }
  livenessProbe?: any
  mariadb?: {
    db?: {
      name?: any
      user?: any
    }
    enabled?: any
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
  podAnnotations?: any
  readinessProbe?: any
  resources?: any
  service?: {
    externalTrafficPolicy?: any
    httpsPort?: any
    nodePorts?: {
      http?: any
      https?: any
    }
    port?: any
    type?: any
  }
  volumeMounts?: {
    apache?: {
      mountPath?: any
    }
    drupal?: {
      mountPath?: any
    }
  }
}

