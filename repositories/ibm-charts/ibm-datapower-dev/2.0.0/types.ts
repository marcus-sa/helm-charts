// Automatically generated

export interface ChartValues {
  RESTProxy?: {
    backendURL?: any
    containerPort?: any
  }
  crypto?: {
    frontsideCert?: any
    frontsideKey?: any
  }
  datapower?: {
    env?: {
      workerThreads?: any
    }
    gatewaySshLocalAddress?: any
    gatewaySshPort?: any
    gatewaySshState?: any
    image?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
    replicaCount?: any
    resources?: {
      limits?: {
        cpu?: any
        memory?: any
      }
      requests?: {
        cpu?: any
        memory?: any
      }
    }
    restManagementLocalAddress?: any
    restManagementPort?: any
    restManagementState?: any
    webGuiManagementLocalAddress?: any
    webGuiManagementPort?: any
    webGuiManagementState?: any
    xmlManagementLocalAddress?: any
    xmlManagementPort?: any
    xmlManagementState?: any
  }
  nameOverride?: any
  patternName?: any
  service?: {
    name?: any
    type?: any
  }
}

