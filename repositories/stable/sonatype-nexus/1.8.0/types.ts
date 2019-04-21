// Automatically generated

export interface ChartValues {
  fullnameOverride?: any
  ingress?: {
    annotations?: any
    enabled?: any
    path?: any
    tls?: {
      enabled?: any
      secretName?: any
    }
  }
  nameOverride?: any
  nexus?: {
    annotations?: any
    dockerPort?: any
    env?: any
    hostAliases?: any
    imageName?: any
    imagePullPolicy?: any
    imageTag?: any
    livenessProbe?: {
      failureThreshold?: any
      initialDelaySeconds?: any
      path?: any
      periodSeconds?: any
    }
    nexusPort?: any
    nodeSelector?: any
    readinessProbe?: {
      failureThreshold?: any
      initialDelaySeconds?: any
      path?: any
      periodSeconds?: any
    }
    resources?: any
    securityContext?: any
    serviceType?: any
  }
  nexusBackup?: {
    enabled?: any
    env?: {
      targetBucket?: any
    }
    imageName?: any
    imagePullPolicy?: any
    imageTag?: any
    nexusAdminPassword?: any
    persistence?: {
      accessMode?: any
      annotations?: any
      enabled?: any
      existingClaim?: any
      fsType?: any
      pdName?: any
      storageClass?: any
      storageSize?: any
    }
  }
  nexusProxy?: {
    env?: {
      clientId?: any
      clientSecret?: any
      cloudIamAuthEnabled?: any
      enforceHttps?: any
      nexusDockerHost?: any
      nexusHttpHost?: any
      organizationId?: any
      redirectUrl?: any
    }
    imageName?: any
    imagePullPolicy?: any
    imageTag?: any
    name?: any
    port?: any
    resources?: any
    secrets?: {
      keystore?: any
      password?: any
    }
  }
  persistence?: {
    accessMode?: any
    annotations?: any
    enabled?: any
    existingClaim?: any
    fsType?: any
    pdName?: any
    storageClass?: any
    storageSize?: any
  }
  replicaCount?: any
  tolerations?: any
}

