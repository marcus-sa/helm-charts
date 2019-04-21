// Automatically generated

export interface ChartValues {
  arch?: any
  image?: {
    imagePullSecrets?: any
    mediaRelay?: {
      containerName?: any
      repository?: any
      tag?: any
    }
    pullPolicy?: any
    sipOrchestrator?: {
      containerName?: any
      repository?: any
      tag?: any
    }
  }
  mediaRelayEnvVariables?: {
    clusterWorkers?: any
    enableRecording?: any
    maxSessions?: any
    mediaRelayLogLevel?: any
    mediaRelayLogRotationFileCount?: any
    mediaRelayLogRotationPeriod?: any
    mediaRelayWsHost?: any
    mediaRelayWsPort?: any
    musicOnHoldEnableProxy?: any
    proxyHost?: any
    proxyPasswordSecret?: any
    proxyPort?: any
    proxyType?: any
    proxyUsername?: any
    rtpPacketLossReportingThreshold?: any
    rtpUdpPortRange?: any
    stereoRecording?: any
    watsonSttEnableProxy?: any
    watsonTtsEnableProxy?: any
  }
  metering?: {
    icpMasterNodeIP?: any
    meteringApiKey?: any
    meteringEnabled?: any
    meteringServerURL?: any
  }
  nameOverride?: any
  nodeSelector?: any
  persistence?: {
    useDynamicProvisioning?: any
  }
  productName?: any
  recordingsVolume?: {
    name?: any
    size?: any
    storageClassName?: any
  }
  replicaCount?: any
  sipOrchestratorEnvVariables?: {
    cmrHealthCheckFailErrCode?: any
    consoleLogFormat?: any
    consoleLogLevel?: any
    consoleLogSource?: any
    enableAuditMessages?: any
    enableTranscriptionAuditMessages?: any
    latencyReportingThreshold?: any
    logLevel?: any
    logMaxFileSize?: any
    logMaxFiles?: any
    mediaRelayHost?: any
    proxyHost?: any
    proxyPasswordSecret?: any
    proxyPort?: any
    proxyUsername?: any
    relayLatencyReportingThreshold?: any
    sipPort?: any
    sipPortTcp?: any
    sipPortTls?: any
    trustedIpList?: any
  }
  tenantConfigSecretName?: any
}

