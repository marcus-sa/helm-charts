// Automatically generated

export interface ChartValues {
  airflow?: {
    config?: any
    executor?: any
    externalPortHttp?: any
    fernetKey?: any
    image?: {
      pullPolicy?: any
      pullSecret?: any
      repository?: any
      tag?: any
    }
    internalPortHttp?: any
    name?: any
    podDisruptionBudget?: any
    schedulerNumRuns?: any
    service?: {
      type?: any
    }
    webReplicas?: any
  }
  dags?: {
    doNotPickle?: any
    git?: {
      ref?: any
      url?: any
    }
    initContainer?: {
      enabled?: any
      image?: {
        pullPolicy?: any
        repository?: any
        tag?: any
      }
      installRequirements?: any
    }
    path?: any
  }
  ingress?: {
    enabled?: any
    flower?: {
      annotations?: any
      host?: any
      livenessPath?: any
      path?: any
      tls?: {
        enabled?: any
        secretName?: any
      }
    }
    web?: {
      annotations?: any
      host?: any
      path?: any
      tls?: {
        enabled?: any
        secretName?: any
      }
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
  postgresql?: {
    nameOverride?: any
    postgresHost?: any
    postgresqlDatabase?: any
    postgresqlPassword?: any
    postgresqlUsername?: any
    service?: {
      port?: any
    }
  }
  rbac?: {
    create?: any
  }
  redis?: {
    master?: {
      port?: any
    }
    nameOverride?: any
    password?: any
  }
  serviceAccount?: {
    create?: any
    name?: any
  }
  workers?: {
    celery?: {
      instances?: any
    }
    enabled?: any
    pod?: {
      annotations?: any
    }
    replicas?: any
    resources?: any
    secrets?: any
    secretsDir?: any
  }
}

