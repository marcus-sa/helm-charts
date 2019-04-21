// Automatically generated

export interface ChartValues {
  git?: {
    branch?: any
    enabled?: any
    repoURL?: any
    resources?: any
    revision?: any
    wait?: any
  }
  htpasswdString?: any
  httpd?: {
    repository?: any
    resources?: any
    tag?: any
  }
  ingress?: {
    annotations?: any
    domain?: any
    enabled?: any
    htpasswdString?: any
    ssl?: any
    subdomainWWW?: any
  }
  init?: {
    clone?: {
      hostPath?: any
      release?: any
    }
    manually?: {
      enabled?: any
      pullPolicy?: any
      repository?: any
      tag?: any
    }
    resources?: any
  }
  keepSecrets?: any
  mysql?: {
    database?: any
    password?: any
    pullPolicy?: any
    repository?: any
    resources?: any
    rootPassword?: any
    sockets?: any
    tag?: any
    user?: any
  }
  nameOverride?: any
  persistence?: {
    accessMode?: any
    enabled?: any
    hostPath?: any
    keep?: any
    size?: any
    storageClass?: any
  }
  php?: {
    copyRoot?: any
    envVars?: any
    fpm?: any
    fpmEnabled?: any
    ini?: any
    oldHTTPRoot?: any
    persistentSubpaths?: any
    pullPolicy?: any
    repository?: any
    resources?: any
    sockets?: any
    tag?: any
  }
  phpmyadmin?: {
    enabled?: any
    port?: any
    repository?: any
    resources?: any
    subdomain?: any
    tag?: any
  }
  replicaCount?: any
  resources?: any
  service?: {
    HTTPPort?: any
    type?: any
  }
  sftp?: {
    enabled?: any
    nodePort?: any
    password?: any
    port?: any
    repository?: any
    resources?: any
    tag?: any
    user?: any
  }
  svn?: {
    allowOverwrite?: any
    enabled?: any
    password?: any
    repoURL?: any
    resources?: any
    user?: any
  }
  webdav?: {
    enabled?: any
    password?: any
    port?: any
    subdomain?: any
    user?: any
  }
  wordpress?: {
    develop?: {
      delete_uploads?: any
      devDomain?: any
      enabled?: any
    }
    domain?: any
    enabled?: any
    gdriveFolder?: any
    gdriveRToken?: any
  }
}

