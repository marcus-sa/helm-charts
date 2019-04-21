// Automatically generated

export interface ChartValues {
  config?: {
    admin?: {
      bind_address?: any
      enabled?: any
      https_certificate?: any
      https_enabled?: any
    }
    bind_address?: any
    collectd?: {
      auth_file?: any
      batch_pending?: any
      batch_size?: any
      batch_timeout?: any
      bind_address?: any
      database?: any
      enabled?: any
      read_buffer?: any
      retention_policy?: any
      security_level?: any
      typesdb?: any
    }
    continuous_queries?: {
      enabled?: any
      log_enabled?: any
      run_interval?: any
    }
    coordinator?: {
      log_queries_after?: any
      max_concurrent_queries?: any
      max_select_buckets?: any
      max_select_point?: any
      max_select_series?: any
      query_timeout?: any
      write_timeout?: any
    }
    data?: {
      cache_max_memory_size?: any
      cache_snapshot_memory_size?: any
      cache_snapshot_write_cold_duration?: any
      compact_full_write_cold_duration?: any
      max_series_per_database?: any
      max_values_per_tag?: any
      query_log_enabled?: any
      trace_logging_enabled?: any
    }
    graphite?: {
      batch_pending?: any
      batch_size?: any
      batch_timeout?: any
      bind_address?: any
      consistency_level?: any
      database?: any
      enabled?: any
      protocol?: any
      retention_policy?: any
      separator?: any
      templates?: any
      udp_read_buffer?: any
    }
    http?: {
      auth_enabled?: any
      bind_address?: any
      bind_socket?: any
      enabled?: any
      https_certificate?: any
      https_enabled?: any
      https_private_key?: any
      log_enabled?: any
      max_connection_limit?: any
      max_row_limit?: any
      pprof_enabled?: any
      realm?: any
      shared_secret?: any
      unix_socket_enabled?: any
      write_tracing?: any
    }
    meta?: {
      logging_enabled?: any
      retention_autocreate?: any
    }
    monitor?: {
      store_database?: any
      store_enabled?: any
      store_interval?: any
    }
    opentsdb?: {
      batch_pending?: any
      batch_size?: any
      batch_timeout?: any
      bind_address?: any
      certificate?: any
      consistency_level?: any
      database?: any
      enabled?: any
      log_point_errors?: any
      retention_policy?: any
      tls_enabled?: any
    }
    reporting_disabled?: any
    retention?: {
      check_interval?: any
      enabled?: any
    }
    shard_precreation?: {
      advance_period?: any
      check_interval?: any
      enabled?: any
    }
    storage_directory?: any
    subscriber?: {
      ca_certs?: any
      enabled?: any
      http_timeout?: any
      insecure_skip_verify?: any
      write_buffer_size?: any
      write_concurrency?: any
    }
    udp?: {
      batch_pending?: any
      batch_size?: any
      batch_timeout?: any
      bind_address?: any
      database?: any
      enabled?: any
      precision?: any
      read_buffer?: any
      retention_policy?: any
    }
  }
  env?: any
  fullnameOverride?: any
  image?: {
    pullPolicy?: any
    repo?: any
    tag?: any
  }
  ingress?: {
    annotations?: any
    enabled?: any
    hostname?: any
    secretName?: any
    tls?: any
  }
  nameOverride?: any
  nodeSelector?: any
  persistence?: {
    accessMode?: any
    enabled?: any
    name?: any
    size?: any
    storageClass?: any
    useExisting?: any
  }
  resources?: any
  service?: {
    annotations?: any
    clusterIP?: any
    externalIPs?: any
    loadBalancerIP?: any
    loadBalancerSourceRanges?: any
    type?: any
  }
  setDefaultUser?: {
    activeDeadlineSeconds?: any
    enabled?: any
    image?: any
    restartPolicy?: any
    user?: {
      password?: any
      privileges?: any
      username?: any
    }
  }
}

