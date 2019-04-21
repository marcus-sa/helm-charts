// Automatically generated

export interface ChartValues {
  fullnameOverride?: any
  images?: {
    database?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
    tls?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
  }
  isolateClusterWithNetworkPolicy?: any
  nameOverride?: any
  podDisruptionPolicies?: {
    configServers?: any
    routers?: any
    shardServers?: any
  }
  tls?: {
    ca?: {
      managementMode?: any
    }
  }
  topology?: {
    configServers?: any
    routers?: any
    shards?: {
      count?: any
      servers?: any
    }
  }
}

