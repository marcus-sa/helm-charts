// Automatically generated

export interface ChartValues {
  affinity?: any
  configMaps?: any
  defaultK8sCloud?: {
    enabled?: any
    jvmArgs?: any
    labels?: any
    name?: any
    remoteFs?: any
    slaveImage?: any
  }
  env?: any
  envSecrets?: any
  fullnameOverride?: any
  image?: {
    pullPolicy?: any
    repository?: any
    tag?: any
  }
  ingress?: {
    additionalRules?: any
    annotations?: any
    enabled?: any
    hostname?: any
    httpProtocol?: any
    path?: any
    tls?: {
      secretName?: any
    }
  }
  javaMemoryOpts?: any
  jenkinsAdminUser?: any
  livenessProbe?: {
    failureThreshold?: any
    initialDelaySeconds?: any
    periodSeconds?: any
    timeout?: any
  }
  managedConfig?: {
    security?: any
  }
  nameOverride?: any
  nodeSelector?: any
  persistence?: {
    jenkinsHome?: {
      accessMode?: any
      annotations?: any
      enabled?: any
      existingClaim?: any
      size?: any
      storageClass?: any
    }
    jenkinsWorkspace?: {
      accessMode?: any
      annotations?: any
      enabled?: any
      existingClaim?: any
      size?: any
      storageClass?: any
    }
    mountDockerSocket?: any
    mounts?: any
    volumes?: any
  }
  persistenceExistingClaim?: any
  podAnnotations?: any
  rbac?: {
    clusterWideAccess?: any
    create?: any
  }
  readinessProbe?: {
    failureThreshold?: any
    initialDelaySeconds?: any
    periodSeconds?: any
    timeout?: any
  }
  resources?: any
  secrets?: any
  service?: {
    httpPort?: any
    jnlpPort?: any
    loadBalancerIP?: any
    loadBalancerSourceRanges?: any
    sshdPort?: any
    type?: any
  }
  tolerations?: any
  useHostNetwork?: any
}

