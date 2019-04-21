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
  }
  metrics?: {
    image?: any
    imagePullPolicy?: any
    resources?: any
    service?: {
      externalPort?: any
      internalPort?: any
      type?: any
    }
    version?: any
  }
  nameOverride?: any
  rabbitmq?: {
    rabbitmqUsername?: any
  }
  server?: {
    image?: any
    imagePullPolicy?: any
    resources?: any
    service?: {
      externalPort?: any
      internalPort?: any
      type?: any
    }
    version?: any
  }
  service?: {
    externalPort?: any
    type?: any
  }
}

