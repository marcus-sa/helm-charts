// Automatically generated

export interface ChartValues {
  environment?: any
  fullnameOverride?: any
  gcs?: {
    enableGCS?: any
    secret?: any
  }
  hdfs?: {
    HADOOP_CONF_DIR?: any
    coreSiteConfigMap?: any
    hdfsSiteConfigMap?: any
  }
  image?: {
    pullPolicy?: any
    repository?: any
    tag?: any
  }
  nameOverride?: any
  nfs?: {
    enableExampleNFS?: any
  }
  pvc?: {
    enablePVC?: any
    eventsDir?: any
    existingClaimName?: any
  }
  rbac?: {
    create?: any
  }
  replicaCount?: any
  service?: {
    port?: any
    type?: any
  }
  serviceAccount?: {
    create?: any
    name?: any
  }
}

