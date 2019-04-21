// Automatically generated

export interface ChartValues {
  annotationFilter?: any
  aws?: {
    accessKey?: any
    region?: any
    roleArn?: any
    secretKey?: any
    zoneType?: any
  }
  azure?: {
    resoureGroup?: any
  }
  cloudflare?: {
    apiKey?: any
    email?: any
  }
  domainFilters?: any
  extraArgs?: any
  extraEnv?: any
  global?: {
    imageRegistry?: any
  }
  google?: {
    project?: any
    serviceAccountSecret?: any
  }
  image?: {
    debug?: any
    pullPolicy?: any
    pullSecrets?: any
    registry?: any
    repository?: any
    tag?: any
  }
  livenessProbe?: {
    enabled?: any
    failureThreshold?: any
    initialDelaySeconds?: any
    periodSeconds?: any
    successThreshold?: any
    timeoutSeconds?: any
  }
  logLevel?: any
  metrics?: {
    enabled?: any
    podAnnotations?: any
  }
  nameOverride?: any
  nodeSelector?: any
  podAnnotations?: any
  policy?: any
  provider?: any
  publishInternalServices?: any
  rbac?: {
    apiVersion?: any
    create?: any
    serviceAccountName?: any
  }
  readinessProbe?: {
    enabled?: any
    failureThreshold?: any
    initialDelaySeconds?: any
    periodSeconds?: any
    successThreshold?: any
    timeoutSeconds?: any
  }
  registry?: any
  replicas?: any
  resources?: any
  securityContext?: {
    enabled?: any
    fsGroup?: any
    runAsUser?: any
  }
  service?: {
    annotations?: any
    loadBalancerIP?: any
    nodePort?: any
    port?: any
    type?: any
  }
  sources?: any
  tolerations?: any
  txtOwnerId?: any
  txtPrefix?: any
}

