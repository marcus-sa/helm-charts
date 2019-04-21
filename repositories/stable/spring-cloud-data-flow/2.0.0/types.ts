// Automatically generated

export interface ChartValues {
  appNameOverride?: any
  deployer?: {
    livenessProbe?: {
      initialDelaySeconds?: any
    }
    readinessProbe?: {
      initialDelaySeconds?: any
    }
    resourceLimits?: {
      cpu?: any
      memory?: any
    }
  }
  kafka?: {
    enabled?: any
  }
  nameOverride?: any
  rabbitmq?: {
    enabled?: any
    rabbitmqUsername?: any
  }
  rbac?: {
    create?: any
  }
  server?: {
    image?: any
    imagePullPolicy?: any
    platformName?: any
    resources?: any
    service?: {
      externalPort?: any
      type?: any
    }
    version?: any
  }
  serviceAccount?: {
    create?: any
    name?: any
  }
  skipper?: {
    image?: any
    imagePullPolicy?: any
    platformName?: any
    resources?: any
    service?: {
      type?: any
    }
    version?: any
  }
}

