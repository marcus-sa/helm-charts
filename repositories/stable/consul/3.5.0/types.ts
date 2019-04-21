// Automatically generated

export interface ChartValues {
  Component?: any
  ConsulConfig?: any
  ConsulDnsPort?: any
  DatacenterName?: any
  DisableHostNodeId?: any
  Domain?: any
  Gossip?: {
    Create?: any
    Encrypt?: any
  }
  GossipKey?: any
  HttpPort?: any
  Image?: any
  ImagePullPolicy?: any
  ImageTag?: any
  Replicas?: any
  Resources?: any
  RpcPort?: any
  SerflanPort?: any
  SerflanUdpPort?: any
  SerfwanPort?: any
  SerfwanUdpPort?: any
  ServerPort?: any
  Storage?: any
  StorageClass?: any
  acl?: {
    agentToken?: any
    enabled?: any
    masterToken?: any
  }
  affinity?: any
  fullnameOverride?: any
  maxUnavailable?: any
  nameOverride?: any
  nodeSelector?: any
  priorityClassName?: any
  test?: {
    image?: any
    imageTag?: any
    rbac?: {
      create?: any
      serviceAccountName?: any
    }
  }
  tolerations?: any
  uiIngress?: {
    annotations?: any
    enabled?: any
    hosts?: any
    tls?: any
  }
  uiService?: {
    enabled?: any
    type?: any
  }
}

