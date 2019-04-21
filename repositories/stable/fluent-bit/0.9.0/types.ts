// Automatically generated

export interface ChartValues {
  backend?: {
    es?: {
      host?: any
      http_passwd?: any
      http_user?: any
      index?: any
      logstash_prefix?: any
      port?: any
      tls?: any
      tls_ca?: any
      tls_debug?: any
      tls_verify?: any
      type?: any
    }
    forward?: {
      host?: any
      port?: any
    }
    http?: {
      format?: any
      host?: any
      port?: any
      proxy?: any
      uri?: any
    }
    splunk?: {
      host?: any
      message_key?: any
      port?: any
      send_raw?: any
      tls?: any
      tls_verify?: any
      token?: any
    }
    type?: any
  }
  env?: any
  existingConfigMap?: any
  extraVolumeMounts?: any
  extraVolumes?: any
  filter?: {
    enableExclude?: any
    enableParser?: any
    kubeCAFile?: any
    kubeTag?: any
    kubeTokenFile?: any
    kubeURL?: any
    mergeJSONLog?: any
  }
  image?: {
    fluent_bit?: {
      repository?: any
      tag?: any
    }
    pullPolicy?: any
  }
  metrics?: {
    enabled?: any
    service?: {
      port?: any
      type?: any
    }
  }
  nameOverride?: any
  nodeSelector?: any
  on_minikube?: any
  parsers?: {
    json?: any
    regex?: any
  }
  podAnnotations?: any
  rbac?: {
    create?: any
  }
  resources?: any
  serviceAccount?: {
    create?: any
    name?: any
  }
  tolerations?: any
  trackOffsets?: any
}

