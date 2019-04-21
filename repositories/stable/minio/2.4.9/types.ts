// Automatically generated

export interface ChartValues {
  DeploymentUpdate?: {
    maxSurge?: any
    maxUnavailable?: any
    type?: any
  }
  StatefulSetUpdate?: {
    updateStrategy?: any
  }
  accessKey?: any
  affinity?: any
  azuregateway?: {
    enabled?: any
    replicas?: any
  }
  buckets?: any
  clusterDomain?: any
  configPath?: any
  configPathmc?: any
  defaultBucket?: {
    enabled?: any
    name?: any
    policy?: any
    purge?: any
  }
  environment?: any
  existingSecret?: any
  fullnameOverride?: any
  gcsgateway?: {
    enabled?: any
    gcsKeyJson?: any
    projectId?: any
    replicas?: any
  }
  image?: {
    pullPolicy?: any
    repository?: any
    tag?: any
  }
  ingress?: {
    annotations?: any
    enabled?: any
    hosts?: any
    path?: any
    tls?: any
  }
  livenessProbe?: {
    failureThreshold?: any
    initialDelaySeconds?: any
    periodSeconds?: any
    successThreshold?: any
    timeoutSeconds?: any
  }
  mcImage?: {
    pullPolicy?: any
    repository?: any
    tag?: any
  }
  mode?: any
  mountPath?: any
  nameOverride?: any
  nasgateway?: {
    enabled?: any
    pv?: any
    replicas?: any
  }
  networkPolicy?: {
    allowExternal?: any
    enabled?: any
  }
  nodeSelector?: any
  ossgateway?: {
    enabled?: any
    endpointURL?: any
    replicas?: any
  }
  persistence?: {
    accessMode?: any
    enabled?: any
    existingClaim?: any
    size?: any
    storageClass?: any
    subPath?: any
  }
  podAnnotations?: any
  priorityClassName?: any
  readinessProbe?: {
    failureThreshold?: any
    periodSeconds?: any
    successThreshold?: any
    timeoutSeconds?: any
  }
  replicas?: any
  resources?: any
  s3gateway?: {
    enabled?: any
    replicas?: any
    serviceEndpoint?: any
  }
  secretKey?: any
  service?: {
    annotations?: any
    clusterIP?: any
    externalIPs?: any
    loadBalancerIP?: any
    nodePort?: any
    port?: any
    type?: any
  }
  tls?: {
    certSecret?: any
    enabled?: any
    privateKey?: any
    publicCrt?: any
  }
  tolerations?: any
}

