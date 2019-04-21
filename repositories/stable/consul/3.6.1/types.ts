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
  additionalLabels?: any
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
  ui?: {
    enabled?: any
  }
  uiIngress?: {
    annotations?: any
    enabled?: any
    hosts?: any
    labels?: any
    tls?: any
  }
  uiService?: {
    annotations?: any
    enabled?: any
    type?: any
  }
}

