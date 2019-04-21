// Automatically generated

export interface ChartValues {
  arch?: any
  brokers?: {
    clusterSize?: any
    secrets?: {
      password?: any
      username?: any
    }
  }
  cemservicebroker?: {
    suffix?: any
  }
  cemusers?: {
    clusterSize?: any
    secrets?: {
      clientid?: any
      clientsecret?: any
      oidcclientid?: any
      oidcclientsecret?: any
      password?: any
      username?: any
    }
  }
  channelservices?: {
    clusterSize?: any
    secrets?: {
      password?: any
      username?: any
    }
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
    from?: any
    smtphost?: any
    smtppassword?: any
    smtpport?: any
    smtpuser?: any
    type?: any
  }
  eventanalyticsui?: {
    clusterSize?: any
    secrets?: {
      session?: any
    }
  }
  eventpreprocessor?: {
    clusterSize?: any
  }
  global?: {
    cassandraNodeReplicas?: any
    environmentSize?: any
    image?: {
      repository?: any
    }
    ingress?: {
      domain?: any
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
    }
    proxyIP?: any
  }
  incidentprocessor?: {
    clusterSize?: any
  }
  integrationcontroller?: {
    clusterSize?: any
    secrets?: {
      password?: any
      username?: any
    }
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
    }
    rbs?: {
      clusterSize?: any
    }
  }
  schedulingui?: {
    clusterSize?: any
  }
}

