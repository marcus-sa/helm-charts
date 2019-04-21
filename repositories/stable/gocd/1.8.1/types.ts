// Automatically generated

export interface ChartValues {
  agent?: {
    affinity?: any
    deployStrategy?: any
    env?: {
      agentAutoRegisterEnvironemnts?: any
      agentAutoRegisterEnvironments?: any
      agentAutoRegisterHostname?: any
      agentAutoRegisterKey?: any
      agentAutoRegisterResources?: any
      extraEnvVars?: any
      goAgentBootstrapperArgs?: any
      goAgentBootstrapperJvmArgs?: any
      goAgentSystemProperties?: any
      goServerUrl?: any
    }
    goServerUrl?: any
    healthCheck?: {
      enabled?: any
      failureThreshold?: any
      initialDelaySeconds?: any
      periodSeconds?: any
    }
    hostAliases?: any
    image?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
    initContainers?: any
    nodeSelector?: any
    persistence?: {
      accessMode?: any
      enabled?: any
      existingClaim?: any
      extraVolumeMounts?: any
      extraVolumes?: any
      name?: {
        dockerEntryPoint?: any
      }
      pvSelector?: any
      size?: any
      storageClass?: any
      subpath?: {
        dockerEntryPoint?: any
        homego?: any
      }
    }
    preStop?: any
    privileged?: any
    replicaCount?: any
    resources?: any
    restartPolicy?: any
    security?: {
      ssh?: {
        enabled?: any
        secretName?: any
      }
    }
    serviceAccount?: {
      name?: any
      reuseTopLevelServiceAccount?: any
    }
    terminationGracePeriodSeconds?: any
  }
  fullnameOverride?: any
  nameOverride?: any
  rbac?: {
    apiVersion?: any
    create?: any
    roleRef?: any
  }
  server?: {
    affinity?: any
    enabled?: any
    env?: {
      extraEnvVars?: any
      goServerSystemProperties?: any
    }
    healthCheck?: {
      failureThreshold?: any
      initialDelaySeconds?: any
      periodSeconds?: any
    }
    hostAliases?: any
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
    initContainers?: any
    nodeSelector?: any
    persistence?: {
      accessMode?: any
      enabled?: any
      existingClaim?: any
      extraVolumeMounts?: any
      extraVolumes?: any
      name?: {
        dockerEntryPoint?: any
      }
      pvSelector?: any
      size?: any
      storageClass?: any
      subpath?: {
        dockerEntryPoint?: any
        godata?: any
        homego?: any
      }
    }
    preStop?: any
    preconfigureCommand?: any
    resources?: any
    restartPolicy?: any
    security?: {
      ssh?: {
        enabled?: any
        secretName?: any
      }
    }
    service?: {
      annotations?: any
      externalPort?: any
      httpPort?: any
      httpsPort?: any
      loadBalancerSourceRanges?: any
      nodeHttpPort?: any
      nodeHttpsPort?: any
      type?: any
    }
    shouldPreconfigure?: any
    terminationGracePeriodSeconds?: any
  }
  serviceAccount?: {
    create?: any
    name?: any
  }
}

