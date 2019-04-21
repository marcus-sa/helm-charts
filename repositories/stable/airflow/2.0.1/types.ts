// Automatically generated

export interface ChartValues {
  airflow?: {
    config?: any
    connections?: any
    defaultSecretsMapping?: any
    executor?: any
    externalPortHttp?: any
    extraConfigmapMounts?: any
    fernetKey?: any
    image?: {
      pullPolicy?: any
      pullSecret?: any
      repository?: any
      tag?: any
    }
    internalPortHttp?: any
    name?: any
    podAnnotations?: any
    podDisruptionBudget?: any
    schedulerNumRuns?: any
    secretsMapping?: any
    service?: {
      type?: any
    }
    webReplicas?: any
  }
  dags?: {
    doNotPickle?: any
    git?: {
      ref?: any
      secret?: any
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
  existingAirflowSecret?: any
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
  logs?: {
    path?: any
  }
  logsPersistence?: {
    accessMode?: any
    enabled?: any
    existingClaim?: any
    size?: any
    storageClass?: any
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
    postgresDatabase?: any
    postgresHost?: any
    postgresPassword?: any
    postgresUser?: any
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
    redisHost?: any
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
    podAnnotations?: any
    replicas?: any
    resources?: any
    secrets?: any
    secretsDir?: any
  }
}

