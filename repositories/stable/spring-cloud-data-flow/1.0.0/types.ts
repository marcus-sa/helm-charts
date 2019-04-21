// Automatically generated

export interface ChartValues {
  appNameOverride?: any
  dataflowAdminPassword?: any
  dataflowAdminRoles?: any
  dataflowAdminUsername?: any
  dataflowPassword?: any
  dataflowRoles?: any
  dataflowUsername?: any
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
  metrics?: {
    image?: any
    imagePullPolicy?: any
    resources?: any
    service?: {
      type?: any
    }
    version?: any
  }
  nameOverride?: any
  rabbitmq?: {
    rabbitmqUsername?: any
  }
  rbac?: {
    create?: any
  }
  server?: {
    image?: any
    imagePullPolicy?: any
    resources?: any
    service?: {
      externalPort?: any
      type?: any
    }
    version?: any
  }
  service?: {
    type?: any
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

