// Automatically generated

export interface ChartValues {
  fullnameOverride?: any
  graylog?: {
    affinity?: any
    elasticsearch?: {
      hosts?: any
      indexPrefix?: any
      maxDocsPerIndex?: any
      maxNumberOfIndices?: any
      replicas?: any
      retentionStrategy?: any
      rotationStrategy?: any
      shards?: any
    }
    env?: any
    geoip?: {
      enabled?: any
    }
    heapSize?: any
    image?: {
      pullPolicy?: any
      repository?: any
    }
    ingress?: {
      annotations?: any
      enabled?: any
      hosts?: any
      path?: any
      tls?: any
    }
    input?: {
      tcp?: {
        ports?: any
        service?: {
          annotations?: any
          clusterIP?: any
          externalIPs?: any
          loadBalancerIP?: any
          loadBalancerSourceRanges?: any
          nodePort?: any
          type?: any
        }
      }
      udp?: {
        ports?: any
        service?: {
          annotations?: any
          clusterIP?: any
          externalIPs?: any
          loadBalancerIP?: any
          loadBalancerSourceRanges?: any
          nodePort?: any
          type?: any
        }
      }
    }
    metrics?: {
      enabled?: any
    }
    mongodb?: {
      maxConnections?: any
      uri?: any
    }
    nodeSelector?: any
    persistence?: {
      accessMode?: any
      enabled?: any
      size?: any
      storageClass?: any
    }
    plugins?: any
    podAnnotations?: any
    replicas?: any
    resources?: any
    rootEmail?: any
    rootPassword?: any
    rootTimezone?: any
    rootUsername?: any
    serverFiles?: any
    service?: {
      annotations?: any
      clusterIP?: any
      externalIPs?: any
      loadBalancerIP?: any
      loadBalancerSourceRanges?: any
      master?: {
        annotations?: any
        port?: any
      }
      nodePort?: any
      port?: any
      type?: any
    }
    terminationGracePeriodSeconds?: any
    tolerations?: any
    transportEmail?: {
      authPassword?: any
      authUsername?: any
      enabled?: any
      fromEmail?: any
      hostname?: any
      port?: any
      subjectPrefix?: any
      useAuth?: any
      useSsl?: any
      useTls?: any
    }
    updateStrategy?: any
  }
  nameOverride?: any
  rbac?: {
    create?: any
  }
  serviceAccount?: {
    create?: any
    name?: any
  }
}

