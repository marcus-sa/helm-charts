// Automatically generated

export interface ChartValues {
  dmarc2logstash?: {
    affinity?: any
    deleteMessages?: any
    extraContainer?: any
    extraEnvs?: any
    image?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
    nodeSelector?: any
    resources?: any
    tolerations?: any
  }
  extraSpec?: any
  filebeat?: {
    extraContainer?: any
    image?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
    logstash?: {
      extraOutput?: any
      host?: any
      index?: any
      port?: any
      timeout?: any
    }
    resources?: any
    sourceType?: any
  }
  fullnameOverride?: any
  nameOverride?: any
}

