// Automatically generated

export interface ChartValues {
  arch?: any
  broker?: {
    image?: {
      repository?: any
      tag?: any
    }
    ingress?: {
      path?: any
    }
  }
  cam?: {
    cloudConnectionName?: any
    contentRuntimeName?: any
    ip?: any
    port?: any
    secret?: any
  }
  cloudsm?: {
    capacity?: any
    image?: {
      repository?: any
      tag?: any
    }
  }
  console?: {
    image?: {
      repository?: any
      tag?: any
    }
    ingress?: {
      path?: any
    }
  }
  couchdb?: {
    image?: {
      repository?: any
      tag?: any
    }
    persistentVolume?: {
      size?: any
      storageClass?: any
      useDynamicProvisioning?: any
    }
  }
  dashboard?: {
    image?: {
      repository?: any
      tag?: any
    }
    ingress?: {
      path?: any
    }
  }
  devops?: {
    image?: {
      repository?: any
      tag?: any
    }
  }
  environment?: {
    name?: any
  }
  iam?: {
    endpoint?: any
  }
  image?: {
    pullPolicy?: any
    pullSecret?: any
  }
  migration?: {
    enabled?: any
    mountPoint?: any
    serverAddress?: any
  }
  nameOverride?: any
  vsphere?: {
    datacenter?: any
    dnsServers?: any
    dnsSuffixes?: any
    domain?: any
    folder?: any
    ipPool?: any
    ipv4Gateway?: any
    ipv4PrefixLength?: any
    networkInterfaceLabel?: any
    osAdminPassword?: any
    osAdminUser?: any
    osImage?: any
    resourcePool?: any
    rootDiskDatastore?: any
    rootDiskSize?: any
  }
}

