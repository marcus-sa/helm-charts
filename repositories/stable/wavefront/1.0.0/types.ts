// Automatically generated

export interface ChartValues {
  clusterName?: any
  collector?: {
    discovery?: {
      config?: any
      enabled?: any
    }
    enabled?: any
    image?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
    includeContainers?: any
    includeLabels?: any
    interval?: any
    kubernetesSource?: any
    logVerbosity?: any
    maxProcs?: any
    prefix?: any
    proxyAddress?: any
    resources?: any
    sinkDelay?: any
    useProxy?: any
  }
  fullnameOverride?: any
  kubeStateMetrics?: {
    enabled?: any
  }
  nameOverride?: any
  openshift?: {
    enabled?: any
    pvcName?: any
  }
  proxy?: {
    args?: any
    enabled?: any
    heap?: any
    image?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
    jaegerPort?: any
    port?: any
    preprocessor?: any
    tracePort?: any
    traceSamplingDuration?: any
    traceSamplingRate?: any
    zipkinPort?: any
  }
  rbac?: {
    create?: any
  }
  serviceAccount?: {
    create?: any
    name?: any
  }
  wavefront?: {
    token?: any
    url?: any
  }
}

