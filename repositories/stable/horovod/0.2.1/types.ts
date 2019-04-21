// Automatically generated

export interface ChartValues {
  fullnameOverride?: any
  master?: {
    args?: any
    env?: any
    image?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
    privileged?: any
  }
  nameOverride?: any
  resources?: any
  ssh?: {
    hostKey?: any
    hostKeyPub?: any
    port?: any
    useSecrets?: any
  }
  useHostNetwork?: any
  useHostPID?: any
  volumeMounts?: any
  volumes?: any
  worker?: {
    image?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
    number?: any
    podManagementPolicy?: any
    privileged?: any
  }
}

