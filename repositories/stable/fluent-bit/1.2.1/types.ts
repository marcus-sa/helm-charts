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
      replace_dots?: any
      time_key?: any
      tls?: any
      tls_ca?: any
      tls_debug?: any
      tls_verify?: any
      type?: any
    }
    forward?: {
      host?: any
      port?: any
      shared_key?: any
    }
    http?: {
      format?: any
      host?: any
      http_passwd?: any
      http_user?: any
      port?: any
      proxy?: any
      tls?: any
      tls_debug?: any
      tls_verify?: any
      uri?: any
    }
    splunk?: {
      host?: any
      message_key?: any
      port?: any
      send_raw?: any
      tls?: any
      tls_debug?: any
      tls_verify?: any
      token?: any
    }
    type?: any
  }
  dnsPolicy?: any
  env?: any
  existingConfigMap?: any
  extraEntries?: {
    filter?: any
    input?: any
    output?: any
  }
  extraPorts?: any
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
  fullConfigMap?: any
  hostNetwork?: any
  image?: {
    fluent_bit?: {
      repository?: any
      tag?: any
    }
    pullPolicy?: any
    pullSecrets?: any
  }
  input?: {
    tail?: {
      memBufLimit?: any
      path?: any
    }
  }
  metrics?: {
    enabled?: any
    service?: {
      annotations?: any
      port?: any
      type?: any
    }
  }
  nameOverride?: any
  nodeSelector?: any
  on_minikube?: any
  parsers?: {
    enabled?: any
    json?: any
    regex?: any
  }
  podAnnotations?: any
  rawConfig?: any
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

