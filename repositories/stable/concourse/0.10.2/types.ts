// Automatically generated

export interface ChartValues {
  concourse?: {
    allowSelfSignedCertificates?: any
    atcPort?: any
    authDuration?: any
    baggageclaimDriver?: any
    dockerRegistry?: any
    encryptionKey?: any
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
    gitlabAuthApiUrl?: any
    gitlabAuthAuthUrl?: any
    gitlabAuthClientId?: any
    gitlabAuthClientSecret?: any
    gitlabAuthGroup?: any
    gitlabAuthTokenUrl?: any
    hostKey?: any
    hostKeyPub?: any
    insecureDockerRegistry?: any
    oldEncryptionKey?: any
    oldResourceGracePeriod?: any
    password?: any
    resourceCacheCleanupInterval?: any
    resourceCheckingInterval?: any
    sessionSigningKey?: any
    tsaPort?: any
    username?: any
    workerKey?: any
    workerKeyPub?: any
  }
  credentialManager?: {
    enabled?: any
    vault?: {
      appRoleId?: any
      appRoleSecretId?: any
      authBackend?: any
      caCert?: any
      clientCert?: any
      clientKey?: any
      clientToken?: any
      pathPrefix?: any
      url?: any
    }
  }
  encryptionKey?: any
  image?: any
  imagePullPolicy?: any
  imageTag?: any
  nameOverride?: any
  oldEncryptionKey?: any
  persistence?: {
    enabled?: any
    worker?: {
      accessMode?: any
      size?: any
      storageClass?: any
    }
  }
  postgresql?: {
    enabled?: any
    nameOverride?: any
    postgresDatabase?: any
    postgresUser?: any
    uri?: any
  }
  web?: {
    additionalAffinities?: any
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
      annotations?: any
      atcNodePort?: any
      tsaNodePort?: any
      type?: any
    }
    tolerations?: any
  }
  worker?: {
    additionalAffinities?: any
    annotations?: any
    env?: any
    fatalErrors?: any
    minAvailable?: any
    nameOverride?: any
    postStopDelaySeconds?: any
    replicas?: any
    resources?: any
    terminationGracePeriodSeconds?: any
    tolerations?: any
    updateStrategy?: any
  }
}

