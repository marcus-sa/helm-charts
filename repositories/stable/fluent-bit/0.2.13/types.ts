// Automatically generated

export interface ChartValues {
  backend?: {
    es?: {
      host?: any
      port?: any
    }
    forward?: {
      host?: any
      port?: any
    }
    http?: {
      format?: any
      host?: any
      port?: any
      proxy?: any
      uri?: any
    }
    type?: any
  }
  env?: any
  existingConfigMap?: any
  extraVolumeMounts?: any
  extraVolumes?: any
  filter?: {
    kubeCAFile?: any
    kubeTokenFile?: any
    kubeURL?: any
    mergeJSONLog?: any
  }
  image?: {
    fluent_bit?: {
      repository?: any
      tag?: any
    }
    pullPolicy?: any
  }
  nameOverride?: any
  nodeSelector?: any
  on_minikube?: any
  rbac?: {
    create?: any
    serviceAccountName?: any
  }
  resources?: any
  tolerations?: any
}

