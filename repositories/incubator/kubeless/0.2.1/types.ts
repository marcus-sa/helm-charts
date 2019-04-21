// Automatically generated

export interface ChartValues {
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
  kafka?: {
    resources?: any
    statefulSet?: {
      image?: {
        pullPolicy?: any
        repository?: any
        tag?: any
      }
      replicaCount?: any
    }
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
  zookeeper?: {
    resources?: any
    statefulSet?: {
      image?: {
        pullPolicy?: any
        repository?: any
        tag?: any
      }
      replicaCount?: any
    }
  }
}

