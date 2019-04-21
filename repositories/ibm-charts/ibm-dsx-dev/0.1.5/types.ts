// Automatically generated

export interface ChartValues {
  dsxUxServerContainer?: {
    image?: {
      repository?: any
      tag?: any
    }
    resources?: any
  }
  dsxservice?: {
    externalPort?: any
  }
  image?: {
    pullPolicy?: any
    secret?: any
  }
  nameOverride?: any
  notebookServerContainer?: {
    image?: {
      repository?: any
      tag?: any
    }
    resources?: any
  }
  rstudioServerContainer?: {
    image?: {
      repository?: any
      tag?: any
    }
    resources?: any
  }
  userHomePvc?: {
    name?: any
    persistence?: {
      existingClaimName?: any
      size?: any
      storageClassName?: any
    }
  }
  zeppelinServerContainer?: {
    image?: {
      repository?: any
      tag?: any
    }
    resources?: any
  }
}

