// Automatically generated

export interface ChartValues {
  airflow?: {
    config?: any
    connections?: any
    defaultSecretsMapping?: any
    executor?: any
    externalPortHttp?: any
    extraConfigmapMounts?: any
    extraContainers?: any
    extraVolumeMounts?: any
    extraVolumes?: any
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
    variables?: any
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
  flower?: {
    resources?: any
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
  scheduler?: {
    resources?: any
  }
  serviceAccount?: {
    create?: any
    name?: any
  }
  serviceMonitor?: {
    enabled?: any
    interval?: any
    path?: any
    selector?: any
  }
  web?: {
    resources?: any
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

