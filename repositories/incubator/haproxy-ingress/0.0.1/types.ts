// Automatically generated

export interface ChartValues {
  controller?: {
    headers?: any
    image?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
    name?: any
    service?: {
      annotations?: any
      clusterIP?: any
      labels?: any
      nodePorts?: {
        http?: any
        https?: any
      }
      targetPorts?: {
        http?: any
        https?: any
      }
      type?: any
    }
  }
  defaultBackend?: {
    image?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
    name?: any
    resources?: {
      cpu?: any
      memory?: any
    }
    service?: {
      name?: any
    }
  }
  fullnameOverride?: any
  nameOverride?: any
  rbac?: {
    create?: any
  }
  serviceAccount?: {
    create?: any
    name?: any
  }
}

