// Automatically generated

export interface ChartValues {
  authEnabled?: any
  core?: {
    extraVars?: any
    initContainers?: any
    numberOfServers?: any
    persistentVolume?: {
      annotations?: any
      mountPath?: any
      size?: any
      storageClass?: any
      subPath?: any
    }
    sidecarContainers?: any
  }
  image?: any
  imagePullPolicy?: any
  imagePullSecret?: any
  imageTag?: any
  name?: any
  nameOverride?: any
  neo4jPassword?: any
  readReplica?: {
    extraVars?: any
    initContainers?: any
    numberOfServers?: any
  }
  resources?: any
  testImage?: any
  testImageTag?: any
}

