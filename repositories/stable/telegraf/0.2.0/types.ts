// Automatically generated

export interface ChartValues {
  daemonset?: {
    config?: {
      agent?: any
      global_tags?: any
      inputs?: any
      outputs?: {
        influxdb?: {
          urls?: any
        }
      }
    }
    enabled?: any
    resources?: any
  }
  image?: {
    pullPolicy?: any
    repo?: any
    tag?: any
  }
  nameOverride?: any
  single?: {
    config?: {
      agent?: any
      global_tags?: any
      inputs?: any
      outputs?: {
        influxdb?: {
          urls?: any
        }
      }
    }
    enabled?: any
    resources?: any
    service?: {
      enabled?: any
      type?: any
    }
  }
}

