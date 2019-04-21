// Automatically generated

export interface ChartValues {
  arch?: any
  authentication?: {
    icp?: {
      edgeIp?: any
      endpointPort?: any
      secretName?: any
    }
    oidc?: {
      clientId?: any
      clientSecret?: any
      endpointPort?: any
    }
  }
  couchdb?: {
    image?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
    livenessProbe?: {
      failureThreshold?: any
      initialDelaySeconds?: any
      periodSeconds?: any
      timeoutSeconds?: any
    }
    persistence?: {
      accessMode?: any
      enabled?: any
      existingClaim?: any
      size?: any
      storageClassName?: any
      useDynamicProvisioning?: any
      volumeMountPath?: any
    }
    readinessProbe?: {
      failureThreshold?: any
      initialDelaySeconds?: any
      periodSeconds?: any
      timeoutSeconds?: any
    }
    resources?: any
  }
  demo?: {
    enabled?: any
  }
  ingress?: {
    enabled?: any
  }
  nameOverride?: any
  security?: {
    serviceAccountName?: any
  }
  transadv?: {
    image?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
    livenessProbe?: {
      failureThreshold?: any
      initialDelaySeconds?: any
      periodSeconds?: any
      timeoutSeconds?: any
    }
    publicUrl?: any
    readinessProbe?: {
      failureThreshold?: any
      initialDelaySeconds?: any
      periodSeconds?: any
      timeoutSeconds?: any
    }
    resources?: any
    service?: {
      nodePort?: any
    }
  }
  transadvui?: {
    image?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
    inmenu?: any
    internal?: {
      port?: any
    }
    livenessProbe?: {
      failureThreshold?: any
      initialDelaySeconds?: any
      periodSeconds?: any
      timeoutSeconds?: any
    }
    readinessProbe?: {
      failureThreshold?: any
      initialDelaySeconds?: any
      periodSeconds?: any
      timeoutSeconds?: any
    }
    resources?: any
    service?: {
      nodePort?: any
    }
  }
}

