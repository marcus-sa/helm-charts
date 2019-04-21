// Automatically generated

export interface ChartValues {
  agent?: {
    affinity?: any
    annotations?: any
    env?: any
    nodeSelector?: any
    replicas?: any
    resources?: any
    schedulerName?: any
  }
  dind?: {
    args?: any
    command?: any
    driver?: any
    enabled?: any
    env?: any
    resources?: any
  }
  images?: {
    agent?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
    dind?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
    server?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
  }
  ingress?: {
    annotations?: any
    enabled?: any
    hosts?: any
    tls?: any
  }
  metrics?: {
    prometheus?: {
      enabled?: any
    }
  }
  nameOverride?: any
  persistence?: {
    accessMode?: any
    enabled?: any
    existingClaim?: any
    size?: any
    storageClass?: any
  }
  rbac?: {
    apiVersion?: any
    create?: any
  }
  server?: {
    adminUser?: any
    affinity?: any
    alwaysAuth?: any
    annotations?: any
    env?: any
    envSecrets?: any
    extraContainers?: any
    extraVolumes?: any
    host?: any
    kubernetes?: {
      enabled?: any
      namespace?: any
      pipelineServiceAccount?: any
    }
    nodeSelector?: any
    protocol?: any
    resources?: any
    schedulerName?: any
  }
  service?: {
    annotations?: any
    exposeGRPC?: any
    httpPort?: any
    loadBalancerIP?: any
    nodePort?: any
    type?: any
  }
  serviceAccount?: {
    create?: any
    name?: any
  }
  sharedSecret?: any
  sourceControl?: {
    bitbucketCloud?: {
      clientID?: any
      clientSecretKey?: any
      clientSecretValue?: any
      consumerKey?: any
      passwordKey?: any
      privateKey?: any
    }
    bitbucketServer?: {
      server?: any
      username?: any
    }
    gitea?: {
      server?: any
    }
    github?: {
      clientID?: any
      clientSecretKey?: any
      clientSecretValue?: any
      server?: any
    }
    gitlab?: {
      clientID?: any
      clientSecretKey?: any
      clientSecretValue?: any
      server?: any
    }
    gogs?: {
      server?: any
    }
    provider?: any
    secret?: any
  }
}

