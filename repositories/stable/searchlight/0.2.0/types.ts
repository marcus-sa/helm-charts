// Automatically generated

export interface ChartValues {
  criticalAddon?: any
  icinga?: {
    image?: any
    tag?: any
  }
  icinga2web?: {
    password?: any
  }
  ido?: {
    image?: any
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
    image?: any
    tag?: any
  }
  rbac?: {
    create?: any
    serviceAccountName?: any
  }
}

