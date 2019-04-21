// Automatically generated

export interface ChartValues {
  gitlab?: {
    migrations?: {
      initialRootPassword?: {
        secret?: any
      }
    }
    sidekiq?: {
      minio?: any
    }
    unicorn?: {
      enabled?: any
      ingress?: {
        tls?: any
      }
      minio?: any
    }
  }
  global?: {
    appConfig?: {
      ldap?: {
        servers?: any
      }
    }
    application?: {
      allowClusterRoles?: any
      create?: any
      links?: any
    }
    certificates?: {
      customCAs?: any
      image?: {
        repository?: any
        tag?: any
      }
    }
    gitaly?: {
      authToken?: {
        key?: any
        secret?: any
      }
    }
    hosts?: {
      domain?: any
      externalIP?: any
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
    ingress?: {
      configureCertmanager?: any
      enabled?: any
      tls?: {
        enabled?: any
        secretName?: any
      }
    }
    initialRootPassword?: {
      key?: any
      secret?: any
    }
    minio?: {
      credentials?: {
        secret?: any
      }
      enabled?: any
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
      httpSecret?: {
        key?: any
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
      port?: any
    }
    workhorse?: {
      key?: any
      secret?: any
    }
  }
  image?: {
    pullPolicy?: any
  }
  ingress?: {
    enabled?: any
    tls?: {
      enabled?: any
    }
  }
  init?: {
    resources?: any
  }
  minio?: {
    ingress?: {
      tls?: any
    }
  }
  nameOverride?: any
  registry?: {
    enabled?: any
    httpSecret?: any
    ingress?: {
      tls?: any
    }
    minio?: any
    storage?: any
  }
  runners?: {
    cache?: {
      s3ServerAddress?: any
      secretName?: any
    }
  }
  service?: any
}

