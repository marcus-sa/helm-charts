// Automatically generated

export interface ChartValues {
  concourse?: {
    allowSelfSignedCertificates?: any
    atcPort?: any
    authDuration?: any
    dockerRegistry?: any
    externalURL?: any
    genericOauthAuthUrl?: any
    genericOauthAuthUrlParam?: any
    genericOauthClientId?: any
    genericOauthClientSecret?: any
    genericOauthDisplayName?: any
    genericOauthScope?: any
    genericOauthTokenUrl?: any
    githubAuthApiUrl?: any
    githubAuthAuthUrl?: any
    githubAuthClientId?: any
    githubAuthClientSecret?: any
    githubAuthOrganization?: any
    githubAuthTeam?: any
    githubAuthTokenUrl?: any
    githubAuthUser?: any
    hostKey?: any
    hostKeyPub?: any
    insecureDockerRegistry?: any
    oldResourceGracePeriod?: any
    password?: any
    resourceCacheCleanupInterval?: any
    resourceCheckingInterval?: any
    sessionSigningKey?: any
    sessionSigningKeyPub?: any
    tsaPort?: any
    username?: any
    workerKey?: any
    workerKeyPub?: any
  }
  image?: any
  imagePullPolicy?: any
  imageTag?: any
  nameOverride?: any
  persistence?: {
    enabled?: any
    worker?: {
      accessMode?: any
      class?: any
      size?: any
    }
  }
  postgresql?: {
    nameOverride?: any
    postgresDatabase?: any
    postgresUser?: any
  }
  web?: {
    ingress?: {
      annotations?: any
      enabled?: any
      hosts?: any
      tls?: any
    }
    nameOverride?: any
    replicas?: any
    resources?: any
    service?: {
      type?: any
    }
  }
  worker?: {
    minAvailable?: any
    nameOverride?: any
    replicas?: any
    resources?: any
  }
}

