// Automatically generated

export interface ChartValues {
  arch?: any
  image?: {
    mediaRelay?: {
      containerName?: any
      image?: any
    }
    pullPolicy?: any
    sipOrchestrator?: {
      containerName?: any
      image?: any
    }
    tag?: any
  }
  mediaRelayEnvVariables?: {
    clusterWorkers?: any
    echoSuppression?: any
    enableRecording?: any
    maxSessions?: any
    mediaRelayLogLevel?: any
    mediaRelayLogRotationFileCount?: any
    mediaRelayLogRotationPeriod?: any
    mediaRelayWsHost?: any
    mediaRelayWsPort?: any
    musicOnHoldEnableProxy?: any
    proxyHost?: any
    proxyPassword?: any
    proxyPort?: any
    proxyType?: any
    proxyUsername?: any
    rtpPacketLossReportingThreshold?: any
    rtpUdpPortRange?: any
    stereoRecording?: any
    ttsCacheTimeToLive?: any
    watsonSttEnableProxy?: any
    watsonSttModel?: any
    watsonTtsEnableProxy?: any
    watsonTtsVoice?: any
  }
  nameOverride?: any
  persistence?: {
    useDynamicProvisioning?: any
  }
  recordingsVolume?: {
    name?: any
    size?: any
    storageClassName?: any
  }
  replicaCount?: any
  serviceCredentials?: {
    watsonConversationPassword?: any
    watsonConversationUrl?: any
    watsonConversationUsername?: any
    watsonConversationWorkspaceId?: any
    watsonSttPassword?: any
    watsonSttUrl?: any
    watsonSttUsername?: any
    watsonTtsPassword?: any
    watsonTtsUrl?: any
    watsonTtsUsername?: any
  }
  sipOrchestratorEnvVariables?: {
    cmrHealthCheckFailErrCode?: any
    conversationFailedReplyMessage?: any
    customSipInviteHeader?: any
    customSipSessionHeader?: any
    disconnectCallOnTransferFailure?: any
    enableAuditMessages?: any
    enableTranscriptionAuditMessages?: any
    latencyReportingThreshold?: any
    logLevel?: any
    logMaxFileSize?: any
    logMaxFiles?: any
    mediaRelayHost?: any
    proxyHost?: any
    proxyPassword?: any
    proxyPort?: any
    proxyUsername?: any
    putCallerOnHoldOnTransfer?: any
    relayLatencyReportingThreshold?: any
    reportingCdrEventIndex?: any
    reportingConversationEventIndex?: any
    reportingPassword?: any
    reportingTranscriptionEventIndex?: any
    reportingUrl?: any
    reportingUsername?: any
    sendProvisionalResponse?: any
    sendSipCallIdToConversation?: any
    sendSipFromUriToConversation?: any
    sendSipRequestUriToConversation?: any
    sendSipToUriToConversation?: any
    sipPort?: any
    sipPortTcp?: any
    sipPortTls?: any
    transferDefaultTarget?: any
    transferFailedReplyMessage?: any
    trustedIpList?: any
    watsonConversationApiVersion?: any
    watsonConversationConnectTimeout?: any
    watsonConversationReadTimeout?: any
    whitelistFromUri?: any
    whitelistToUri?: any
  }
}

