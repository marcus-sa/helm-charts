// Automatically generated

export interface ChartValues {
  default?: {
    image?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
    replicaCount?: any
    resources?: any
  }
  lego?: {
    configmap?: {
      email?: any
      url?: any
    }
    enabled?: any
    image?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
    replicaCount?: any
  }
  nameOverride?: any
  nginx?: {
    configmap?: {
      body_size?: any
      enable_vts_status?: any
      hsts_include_subdomains?: any
      proxy_connect_timeout?: any
      proxy_read_timeout?: any
      proxy_send_imeout?: any
      server_name_hash_bucket_size?: any
    }
    image?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
    monitoring?: any
    replicaCount?: any
    resources?: any
    service?: {
      type?: any
    }
  }
}

