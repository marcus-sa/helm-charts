// Automatically generated

export interface ChartValues {
  config?: {
    data?: any
    enabled?: any
    mountPath?: any
  }
  deployment?: {
    additionalContainers?: any
    additionalVolumes?: any
    annotations?: any
    initContainers?: any
    postStart?: {
      command?: any
    }
  }
  deploymentStrategy?: any
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
    labels?: any
    livenessProbe?: {
      failureThreshold?: any
      initialDelaySeconds?: any
      path?: any
      periodSeconds?: any
      timeoutSeconds?: any
    }
    nexusPort?: any
    nodeSelector?: any
    podAnnotations?: any
    readinessProbe?: {
      failureThreshold?: any
      initialDelaySeconds?: any
      path?: any
      periodSeconds?: any
      timeoutSeconds?: any
    }
    resources?: any
    securityContext?: any
    service?: {
      clusterIP?: any
      type?: any
    }
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
    enabled?: any
    env?: {
      clientId?: any
      clientSecret?: any
      cloudIamAuthEnabled?: any
      enforceHttps?: any
      nexusDockerHost?: any
      nexusHttpHost?: any
      organizationId?: any
      redirectUrl?: any
      requiredMembershipVerification?: any
    }
    imageName?: any
    imagePullPolicy?: any
    imageTag?: any
    labels?: any
    name?: any
    port?: any
    resources?: any
    secrets?: {
      keystore?: any
      password?: any
    }
    svcName?: any
    targetPort?: any
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
  secret?: {
    data?: any
    enabled?: any
    mountPath?: any
    readOnly?: any
  }
  service?: {
    annotations?: any
    enabled?: any
    labels?: any
    name?: any
    port?: any
    portName?: any
    serviceType?: any
    targetPort?: any
  }
  statefulset?: {
    enabled?: any
  }
  tolerations?: any
}

