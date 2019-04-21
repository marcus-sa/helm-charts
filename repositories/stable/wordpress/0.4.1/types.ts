// Automatically generated

export interface ChartValues {
  image?: any
  imagePullPolicy?: any
  ingress?: {
    annotations?: any
    enabled?: any
    hostname?: any
    tls?: any
  }
  nameOverride?: any
  persistence?: {
    apache?: {
      accessMode?: any
      size?: any
      storageClass?: any
    }
    enabled?: any
    wordpress?: {
      accessMode?: any
      size?: any
      storageClass?: any
    }
  }
  resources?: any
  serviceType?: any
  smtpHost?: any
  smtpPassword?: any
  smtpPort?: any
  smtpProtocol?: any
  smtpUser?: any
  smtpUsername?: any
  wordpressBlogName?: any
  wordpressEmail?: any
  wordpressFirstName?: any
  wordpressLastName?: any
  wordpressPassword?: any
  wordpressUsername?: any
}

