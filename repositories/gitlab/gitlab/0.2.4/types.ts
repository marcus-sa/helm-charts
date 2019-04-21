// Automatically generated

export interface ChartValues {
  global?: {
    gitaly?: {
      authToken?: {
        key?: any
        secret?: any
      }
    }
    hosts?: {
      domain?: any
      gitlab?: {
        https?: any
        name?: any
      }
      hostSuffix?: any
      https?: any
      minio?: {
        https?: any
        name?: any
      }
    }
    imagePullPolicy?: any
    ingress?: any
    initialRootPassword?: {
      key?: any
      secret?: any
    }
    minio?: {
      credentials?: {
        secret?: any
      }
    }
    psql?: {
      database?: any
      host?: any
      password?: {
        key?: any
        secret?: any
      }
      port?: any
      secretName?: any
      username?: any
    }
    railsSecrets?: {
      secret?: any
    }
    redis?: {
      password?: {
        key?: any
        secret?: any
      }
    }
    registry?: {
      certificate?: {
        secret?: any
      }
    }
    runner?: {
      registrationToken?: {
        secret?: any
      }
    }
    service?: {
      annotations?: any
    }
    shell?: {
      authToken?: {
        key?: any
        secret?: any
      }
      hostKeys?: {
        secret?: any
      }
    }
  }
  image?: {
    pullPolicy?: any
  }
  ingress?: any
  nameOverride?: any
  runners?: {
    cache?: {
      s3ServerAddress?: any
    }
  }
  service?: any
}

