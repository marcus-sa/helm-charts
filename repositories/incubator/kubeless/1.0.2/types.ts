// Automatically generated

export interface ChartValues {
  config?: {
    builderImage?: any
    builderImagePullSecret?: any
    deploymentTemplate?: any
    enableBuildStep?: any
    functionRegistryTLSVerify?: any
    provisionImage?: any
    provisionImagePullSecret?: any
    runtimeImages?: any
  }
  controller?: {
    deployment?: {
      image?: {
        pullPolicy?: any
        repository?: any
        tag?: any
      }
      replicaCount?: any
    }
    resources?: any
  }
  nameOverride?: any
  rbac?: {
    create?: any
  }
  ui?: {
    deployment?: {
      proxy?: {
        image?: {
          pullPolicy?: any
          repository?: any
          tag?: any
        }
      }
      ui?: {
        image?: {
          pullPolicy?: any
          repository?: any
          tag?: any
        }
      }
    }
    enabled?: any
    service?: {
      externalPort?: any
      name?: any
      type?: any
    }
  }
}

