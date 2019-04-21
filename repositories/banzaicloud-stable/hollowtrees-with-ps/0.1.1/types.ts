// Automatically generated

export interface ChartValues {
  affinity?: any
  healthcheck?: {
    endpoint?: any
    listenPort?: any
  }
  htpsp?: {
    healthcheck?: {
      endpoint?: any
      listenPort?: any
    }
    image?: {
      imagePullPolicy?: any
      repository?: any
      tag?: any
    }
    listenPort?: any
    log?: {
      format?: any
      level?: any
    }
    resources?: any
    scaler?: {
      pipelineInternalAddress?: any
      recommenderAddress?: any
      retries?: any
      waitBetweenRetries?: any
      waitInQueue?: any
    }
  }
  image?: {
    imagePullPolicy?: any
    repository?: any
    tag?: any
  }
  log?: {
    format?: any
    level?: any
  }
  nameOverride?: any
  nodeSelector?: any
  podAnnotations?: any
  promalert?: {
    listenPort?: any
  }
  replicaCount?: any
  resources?: any
  scaler?: {
    allowedEvents?: any
    cooldown?: any
    description?: any
    groupBy?: any
    hostname?: any
    name?: any
    port?: any
    type?: any
  }
  service?: {
    port?: any
    type?: any
  }
  tolerations?: any
}

