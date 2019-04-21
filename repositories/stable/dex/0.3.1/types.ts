// Automatically generated

export interface ChartValues {
  certs?: {
    grpc?: {
      activeDeadlineSeconds?: any
      altIPs?: any
      altNames?: any
      create?: any
      secret?: {
        caName?: any
        clientTlsName?: any
        serverTlsName?: any
      }
    }
    image?: any
    imagePullPolicy?: any
    imageTag?: any
    web?: {
      activeDeadlineSeconds?: any
      altIPs?: any
      altNames?: any
      caDays?: any
      certDays?: any
      create?: any
      secret?: {
        caName?: any
        tlsName?: any
      }
    }
  }
  config?: any
  env?: any
  extraVolumeMounts?: any
  extraVolumes?: any
  fullnameOverride?: any
  image?: any
  imagePullPolicy?: any
  imageTag?: any
  inMiniKube?: any
  nameOverride?: any
  nodeSelector?: any
  ports?: any
  rbac?: {
    create?: any
  }
  replicas?: any
  resources?: any
  service?: {
    annotations?: any
    externalIPs?: any
    port?: any
    type?: any
  }
  serviceAccount?: {
    create?: any
    name?: any
  }
}

