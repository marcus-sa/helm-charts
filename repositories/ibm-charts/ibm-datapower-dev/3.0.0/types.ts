// Automatically generated

export interface ChartValues {
  crypto?: {
    frontsideSecret?: any
  }
  datapower?: {
    env?: {
      defaultLogFormat?: any
      workerThreads?: any
    }
    flexpointBundle?: any
    gatewaySshLocalAddress?: any
    gatewaySshPort?: any
    gatewaySshState?: any
    image?: {
      pullPolicy?: any
      pullSecret?: any
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
    snmpLocalAddress?: any
    snmpPort?: any
    snmpState?: any
    webGuiManagementLocalAddress?: any
    webGuiManagementPort?: any
    webGuiManagementState?: any
    xmlManagementLocalAddress?: any
    xmlManagementPort?: any
    xmlManagementState?: any
  }
  helmTestOverride?: any
  nameOverride?: any
  patternName?: any
  restProxy?: {
    backendURL?: any
    containerPort?: any
  }
  service?: {
    name?: any
    type?: any
  }
}

