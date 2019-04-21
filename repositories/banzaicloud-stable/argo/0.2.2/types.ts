// Automatically generated

export interface ChartValues {
  artifactRepository?: {
    s3?: {
      accessKeySecret?: {
        key?: any
        name?: any
      }
      bucket?: any
      endpoint?: any
      insecure?: any
      secretKeySecret?: {
        key?: any
        name?: any
      }
    }
  }
  controller?: {
    instanceID?: {
      enabled?: any
      explicitID?: any
      useReleaseName?: any
    }
    logging?: {
      globallevel?: any
      level?: any
    }
    name?: any
    podAnnotations?: any
    serviceAccount?: any
    workflowNamespaces?: any
  }
  images?: {
    controller?: any
    executor?: any
    namespace?: any
    tag?: any
    ui?: any
  }
  init?: {
    serviceAccount?: any
  }
  minio?: {
    defaultBucket?: {
      name?: any
    }
    install?: any
  }
  nameOverride?: any
  ui?: {
    enableWebConsole?: any
    ingress?: {
      annotations?: any
      enabled?: any
      hosts?: any
      tls?: any
    }
    name?: any
    podAnnotations?: any
    serviceAccount?: any
    serviceAnnotations?: any
    servicePort?: any
    serviceType?: any
  }
  uiName?: any
  useDefaultArtifactRepo?: any
  useStaticCredentials?: any
}

