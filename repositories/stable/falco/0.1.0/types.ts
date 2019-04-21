// Automatically generated

export interface ChartValues {
  customRules?: any
  daemonset?: {
    updateStrategy?: any
  }
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
  }
  nameOverride?: any
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

