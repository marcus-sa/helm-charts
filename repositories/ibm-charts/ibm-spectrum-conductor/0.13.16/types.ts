// Automatically generated

export interface ChartValues {
  arch?: any
  cluster?: {
    basePort?: any
    etcdSharedStorageClassName?: any
    ldapBaseDn?: any
    ldapServerIp?: any
    proxyOption?: any
  }
  dataimages?: any
  dli?: {
    enabled?: any
    frameworksStorageClassName?: any
    sharedFsStorageClassName?: any
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
  new_namespace?: any
  sig?: {
    cpu?: any
    gpu?: any
    maxCpu?: any
    maxGpu?: any
    maxMemory?: any
    maxReplicas?: any
    memory?: any
    registry?: any
    registryPasswd?: any
    registryUser?: any
    ssAllocationInterval?: any
    ssAllocationUnit?: any
  }
  volumes?: any
}

