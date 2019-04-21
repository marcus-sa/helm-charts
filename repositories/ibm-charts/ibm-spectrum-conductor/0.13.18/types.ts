// Automatically generated

export interface ChartValues {
  arch?: any
  cluster?: {
    ascdDebugPort?: any
    basePort?: any
    etcdSharedStorageClassName?: any
    ldapBaseDn?: any
    ldapServerIp?: any
    proxyOption?: any
    useDynamicProvisioning?: any
  }
  dataimages?: any
  dli?: {
    enabled?: any
    frameworksStorageClassName?: any
    sharedFsStorageClassName?: any
  }
  helm?: {
    credentialName?: any
    credentialType?: any
    password?: any
  }
  master?: {
    cpu?: any
    imageName?: any
    imagePullPolicy?: any
    memory?: any
    name?: any
    registry?: any
    registryPasswd?: any
    registryUser?: any
    sharedStorageClassName?: any
  }
  nameOverride?: any
  need_create_pvc?: any
  new_namespace?: any
  sig?: {
    cpu?: any
    gpu?: any
    maxReplicas?: any
    memory?: any
    registry?: any
    registryPasswd?: any
    registryUser?: any
    ssAllocationInterval?: any
    ssAllocationUnit?: any
  }
  storage_class_name?: any
  volumes?: any
}

