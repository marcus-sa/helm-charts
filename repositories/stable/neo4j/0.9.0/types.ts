// Automatically generated

export interface ChartValues {
  acceptLicenseAgreement?: any
  authEnabled?: any
  clusterDomain?: any
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
  podDisruptionBudget?: any
  readReplica?: {
    extraVars?: any
    initContainers?: any
    numberOfServers?: any
  }
  resources?: any
  testImage?: any
  testImageTag?: any
}

