// Automatically generated

export interface ChartValues {
  customRules?: any
  daemonset?: {
    updateStrategy?: any
  }
  ebpf?: {
    enabled?: any
    settings?: {
      hostNetwork?: any
      mountEtcVolume?: any
    }
  }
  extraArgs?: any
  fakeEventGenerator?: {
    enabled?: any
    replicas?: any
  }
  falco?: {
    bufferedOutputs?: any
    fileOutput?: {
      enabled?: any
      filename?: any
      keepAlive?: any
    }
    jsonIncludeOutputProperty?: any
    jsonOutput?: any
    logLevel?: any
    logStderr?: any
    logSyslog?: any
    outputs?: {
      maxBurst?: any
      rate?: any
    }
    priority?: any
    programOutput?: {
      enabled?: any
      keepAlive?: any
      program?: any
    }
    rulesFile?: any
    stdoutOutput?: {
      enabled?: any
    }
    syslogOutput?: {
      enabled?: any
    }
  }
  fullnameOverride?: any
  image?: {
    pullPolicy?: any
    repository?: any
    tag?: any
  }
  integrations?: {
    gcscc?: {
      enabled?: any
      webhookAuthenticationToken?: any
      webhookUrl?: any
    }
    natsOutput?: {
      enabled?: any
      natsUrl?: any
    }
    snsOutput?: {
      aws_access_key_id?: any
      aws_default_region?: any
      aws_secret_access_key?: any
      enabled?: any
      topic?: any
    }
  }
  nameOverride?: any
  proxy?: {
    httpProxy?: any
    httpsProxy?: any
    noProxy?: any
  }
  rbac?: {
    create?: any
  }
  resources?: any
  serviceAccount?: {
    create?: any
    name?: any
  }
  tolerations?: any
}

