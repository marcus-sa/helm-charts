// Automatically generated

export interface ChartValues {
  admissionControllerCA?: any
  admissionControllerCert?: any
  admissionControllerFailurePolicy?: any
  admissionControllerKey?: any
  admissionControllerKind?: any
  admissionControllerRules?: any
  authz?: {
    enabled?: any
  }
  fullnameOverride?: any
  generateAdmissionControllerCerts?: any
  image?: any
  imagePullPolicy?: any
  imageTag?: any
  livenessProbe?: any
  logFormat?: any
  logLevel?: any
  mgmt?: {
    configmapPolicies?: {
      enabled?: any
      namespaces?: any
      requireLabel?: any
    }
    enabled?: any
    image?: any
    imagePullPolicy?: any
    imageTag?: any
    replicate?: {
      cluster?: any
      namespace?: any
      path?: any
    }
    resources?: any
  }
  nameOverride?: any
  nodeSelector?: any
  opa?: any
  podDisruptionBudget?: {
    enabled?: any
    maxUnavailable?: any
    minAvailable?: any
  }
  rbac?: {
    create?: any
    rules?: {
      cluster?: any
    }
  }
  readinessProbe?: any
  replicas?: any
  resources?: any
  sar?: {
    enabled?: any
    image?: any
    imagePullPolicy?: any
    imageTag?: any
    resources?: any
  }
  serviceAccount?: {
    create?: any
    name?: any
  }
  tolerations?: any
}

