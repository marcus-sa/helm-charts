// Automatically generated

export interface ChartValues {
  apiserver?: {
    ca?: any
    enableValidatingWebhook?: any
    groupPriorityMinimum?: any
    versionPriority?: any
  }
  criticalAddon?: any
  enableAnalytics?: any
  icinga?: {
    registry?: any
    repository?: any
    tag?: any
  }
  icinga2?: {
    password?: any
  }
  icinga2web?: {
    password?: any
  }
  ido?: {
    registry?: any
    repository?: any
    tag?: any
  }
  imagePullPolicy?: any
  imagePullSecrets?: any
  logLevel?: any
  nameOverride?: any
  nodeSelector?: any
  notifier?: {
    hipchat?: {
      authToken?: any
    }
    mailgun?: {
      apiKey?: any
      domain?: any
      from?: any
      publicAPIKey?: any
    }
    plivo?: {
      authId?: any
      authToken?: any
      from?: any
    }
    slack?: {
      authToken?: any
      channel?: any
    }
    smtp?: {
      from?: any
      host?: any
      insecureSkipVerify?: any
      password?: any
      port?: any
      username?: any
    }
    twilio?: {
      accountSid?: any
      authToken?: any
      from?: any
    }
  }
  operator?: {
    registry?: any
    repository?: any
    tag?: any
  }
  rbac?: {
    create?: any
  }
  serviceAccount?: {
    create?: any
    name?: any
  }
}

