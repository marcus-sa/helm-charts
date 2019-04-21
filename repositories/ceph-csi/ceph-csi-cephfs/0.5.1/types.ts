// Automatically generated

export interface ChartValues {
  attacher?: {
    affinity?: any
    fullnameOverride?: any
    image?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
    name?: any
    nodeSelector?: any
    replicas?: any
    resources?: any
    tolerations?: any
  }
  driverName?: any
  fullnameOverride?: any
  nameOverride?: any
  nodeplugin?: {
    affinity?: any
    fullnameOverride?: any
    name?: any
    nodeSelector?: any
    plugin?: {
      image?: {
        imagePullPolicy?: any
        repository?: any
        tag?: any
      }
      resources?: any
    }
    registrar?: {
      image?: {
        imagePullPolicy?: any
        repository?: any
        tag?: any
      }
      resources?: any
    }
    tolerations?: any
  }
  provisioner?: {
    affinity?: any
    fullnameOverride?: any
    image?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
    name?: any
    nodeSelector?: any
    replicas?: any
    resources?: any
    tolerations?: any
  }
  rbac?: {
    create?: any
  }
  registrationDir?: any
  serviceAccounts?: {
    attacher?: {
      create?: any
      name?: any
    }
    nodeplugin?: {
      create?: any
      name?: any
    }
    provisioner?: {
      create?: any
      name?: any
    }
  }
  socketDir?: any
  socketFile?: any
  volumeDevicesDir?: any
}

