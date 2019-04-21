// Automatically generated

export interface ChartValues {
  arch?: any
  brokers?: {
    clusterSize?: any
  }
  cemservicebroker?: {
    suffix?: any
  }
  cemusers?: {
    clusterSize?: any
  }
  channelservices?: {
    clusterSize?: any
  }
  commonimages?: {
    brokers?: {
      image?: {
        tag?: any
      }
    }
    cemhelmtests?: {
      image?: {
        tag?: any
      }
    }
    cemusers?: {
      image?: {
        tag?: any
      }
    }
    channelservices?: {
      image?: {
        tag?: any
      }
    }
    datalayer?: {
      image?: {
        tag?: any
      }
    }
    eventanalyticsui?: {
      image?: {
        tag?: any
      }
    }
    eventpreprocessor?: {
      image?: {
        tag?: any
      }
    }
    incidentprocessor?: {
      image?: {
        tag?: any
      }
    }
    integrationcontroller?: {
      image?: {
        tag?: any
      }
    }
    normalizer?: {
      image?: {
        tag?: any
      }
    }
    notificationprocessor?: {
      image?: {
        tag?: any
      }
    }
    rba?: {
      as?: {
        image?: {
          tag?: any
        }
      }
      rbs?: {
        image?: {
          tag?: any
        }
      }
    }
    schedulingui?: {
      image?: {
        tag?: any
      }
    }
  }
  couchdb?: {
    secretName?: any
  }
  datalayer?: {
    clusterSize?: any
  }
  email?: {
    apikey?: any
    mail?: any
    smtphost?: any
    smtppassword?: any
    smtpport?: any
    smtpuser?: any
    type?: any
  }
  eventanalyticsui?: {
    clusterSize?: any
  }
  eventpreprocessor?: {
    clusterSize?: any
  }
  global?: {
    cassandraNodeReplicas?: any
    environmentSize?: any
    image?: {
      pullSecret?: any
      repository?: any
    }
    ingress?: {
      domain?: any
      port?: any
      prefix?: any
      tlsSecret?: any
    }
    masterIP?: any
    masterPort?: any
    persistence?: {
      enabled?: any
      storageClassName?: any
      storageClassOption?: {
        datalayerjobs?: any
      }
      storageSize?: {
        datalayerjobs?: any
      }
      supplementalGroups?: any
    }
  }
  incidentprocessor?: {
    clusterSize?: any
  }
  integrationcontroller?: {
    clusterSize?: any
  }
  kafka?: {
    client?: {
      password?: any
      username?: any
    }
    clusterSize?: any
    ssl?: {
      enabled?: any
      password?: any
    }
  }
  license?: any
  nameOverride?: any
  nexmo?: {
    countryblacklist?: any
    enabled?: any
    key?: any
    numbers?: any
    secret?: any
    sms?: any
    voice?: any
  }
  normalizer?: {
    clusterSize?: any
    outgoingUseSelfsignedCert?: any
  }
  notificationprocessor?: {
    clusterSize?: any
  }
  productName?: any
  rba?: {
    as?: {
      clusterSize?: any
      updateStrategy?: any
    }
    rbs?: {
      clusterSize?: any
      updateStrategy?: any
    }
  }
  schedulingui?: {
    clusterSize?: any
  }
  watsonworkspace?: {
    appid?: any
    appsecret?: any
    sharetoken?: any
  }
}

