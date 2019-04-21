// Automatically generated

export interface ChartValues {
  affinity?: any
  annotationFilter?: any
  aws?: {
    accessKey?: any
    credentialsPath?: any
    region?: any
    roleArn?: any
    secretKey?: any
    zoneType?: any
  }
  azure?: {
    secretName?: any
  }
  cloudflare?: {
    apiKey?: any
    email?: any
    proxied?: any
  }
  domainFilters?: any
  extraArgs?: any
  extraEnv?: any
  google?: {
    project?: any
    serviceAccountSecret?: any
  }
  image?: {
    name?: any
    pullPolicy?: any
    pullSecrets?: any
    tag?: any
  }
  infoblox?: {
    domainFilter?: any
    gridHost?: any
    noSslVerify?: any
    wapiConnectionPoolSize?: any
    wapiHttpTimeout?: any
    wapiPassword?: any
    wapiPort?: any
    wapiUsername?: any
    wapiVersion?: any
  }
  logLevel?: any
  nameOverride?: any
  nodeSelector?: any
  podAnnotations?: any
  podLabels?: any
  policy?: any
  priorityClassName?: any
  provider?: any
  publishInternalServices?: any
  rbac?: {
    apiVersion?: any
    create?: any
    serviceAccountName?: any
  }
  registry?: any
  resources?: any
  securityContext?: any
  service?: {
    annotations?: any
    clusterIP?: any
    externalIPs?: any
    loadBalancerIP?: any
    loadBalancerSourceRanges?: any
    servicePort?: any
    type?: any
  }
  sources?: any
  tolerations?: any
  txtOwnerId?: any
  txtPrefix?: any
  zoneIdFilters?: any
}

