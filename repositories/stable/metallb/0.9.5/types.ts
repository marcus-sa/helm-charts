// Automatically generated

export interface ChartValues {
  configInline?: any
  controller?: {
    affinity?: any
    image?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
    nodeSelector?: any
    resources?: any
    tolerations?: any
  }
  existingConfigMap?: any
  fullnameOverride?: any
  nameOverride?: any
  prometheus?: {
    scrapeAnnotations?: any
  }
  psp?: {
    create?: any
  }
  rbac?: {
    create?: any
  }
  serviceAccounts?: {
    controller?: {
      create?: any
      name?: any
    }
    speaker?: {
      create?: any
      name?: any
    }
  }
  speaker?: {
    affinity?: any
    image?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
    nodeSelector?: any
    resources?: any
    tolerations?: any
  }
}

