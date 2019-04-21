// Automatically generated

export interface ChartValues {
  configurationFiles?: any
  image?: any
  imagePullPolicy?: any
  imageTag?: any
  livenessProbe?: {
    failureThreshold?: any
    initialDelaySeconds?: any
    periodSeconds?: any
    successThreshold?: any
    timeoutSeconds?: any
  }
  mysqlAllowEmptyPassword?: any
  mysqlDatabase?: any
  mysqlPassword?: any
  mysqlRootPassword?: any
  mysqlUser?: any
  nameOverride?: any
  nodeSelector?: any
  persistence?: {
    accessMode?: any
    enabled?: any
    existingClaim?: any
    size?: any
    storageClass?: any
    subPath?: any
  }
  readinessProbe?: {
    failureThreshold?: any
    initialDelaySeconds?: any
    periodSeconds?: any
    successThreshold?: any
    timeoutSeconds?: any
  }
  resources?: any
  service?: {
    nodePort?: any
    port?: any
    type?: any
  }
  ssl?: {
    certificates?: any
    enabled?: any
    secret?: any
  }
}

