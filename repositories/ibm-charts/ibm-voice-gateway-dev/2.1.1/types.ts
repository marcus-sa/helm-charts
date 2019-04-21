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
    enableMrcp?: any
    enableMutualAuth?: any
    enableRecording?: any
    enableSsl?: any
    maxSessions?: any
    mediaRelayLogLevel?: any
    mediaRelayLogRotationFileCount?: any
    mediaRelayLogRotationPeriod?: any
    mediaRelayWsHost?: any
    mediaRelayWsPort?: any
    mrcpv2SipPort?: any
    musicOnHoldEnableProxy?: any
    proxyHost?: any
    proxyPasswordSecret?: any
    proxyPort?: any
    proxyType?: any
    proxyUsername?: any
    rtpPacketLossReportingThreshold?: any
    rtpUdpPortRange?: any
    sslClientCACertSecret?: any
    sslClientPassphraseSecret?: any
    sslClientPkcs12FileSecret?: any
    stereoRecording?: any
    unimrcpConfigSecretName?: any
    watsonSttEnableProxy?: any
    watsonTtsEnableProxy?: any
  }
  metering?: {
    icpMasterNodeIP?: any
    meteringApiKeySecret?: any
    meteringEnabled?: any
    meteringServerURL?: any
  }
  nameOverride?: any
  nodeSelector?: any
  persistence?: {
    logsVolume?: {
      enablePersistentLogs?: any
      name?: any
      size?: any
      storageClassName?: any
    }
    recordingsVolume?: {
      enablePersistentRecordings?: any
      name?: any
      size?: any
      storageClassName?: any
    }
    useDynamicProvisioning?: any
  }
  productName?: any
  replicaCount?: any
  sipOrchestratorEnvVariables?: {
    cmrHealthCheckFailErrCode?: any
    consoleLogFormat?: any
    consoleLogLevel?: any
    consoleLogSource?: any
    enableAuditMessages?: any
    enableSslorMutualAuth?: any
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
    sslFileType?: any
    sslKeyTrustStoreSecret?: any
    sslPassphraseSecret?: any
    trustedIpList?: any
  }
  tenantConfigSecretName?: any
}

