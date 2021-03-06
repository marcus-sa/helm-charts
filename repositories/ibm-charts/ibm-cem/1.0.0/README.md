# `@helm-charts/ibm-charts-ibm-cem`

A cloud based event management solution

| Field               | Value      |
| ------------------- | ---------- |
| Repository Name     | ibm-charts |
| Chart Name          | ibm-cem    |
| Chart Version       | 1.0.0      |
| NPM Package Version | 0.1.0      |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
---
# Put properties for the charts in here, and then you can get them out in the templates.
# Notice that the microservice names are a little different here, they don't have dashes. That's because the templating language couldn't handle the - characters.

###############################################################################
## Common image variables
##
###############################################################################
# CEM-common-images->
commonimages:
  ## All docker images required for this chart
  ##
  ## NOTES
  ## imagePullPolicy - Always, Never, or IfNotPresent. Defaults to Always
  ## if :latest tag is specified, or IfNotPresent otherwise.
  ## ref: http://kubernetes.io/docs/user-guide/images/#pre-pulling-images
  ##
  ## Image tags are of the format <V.R.M>-<BuildClassifier>
  ## Where <BuildClassifier> is a timestamp based identifier which uniquely identifies
  ## a build.
  ##
  brokers:
    image:
      tag: 1.0.7-20180619T163111Z-ILAN-AYJJMM
  cemusers:
    image:
      tag: 1.0.7-20180620T100409Z-ILAN-AYJJMM
  channelservices:
    image:
      tag: 1.0.7-20180619T174112Z-ILAN-AYJJMM
  datalayer:
    image:
      tag: 1.0.7-20180619T174136Z-ILAN-AYJJMM
  eventanalyticsui:
    image:
      tag: 1.0.7-20180620T211305Z-ILAN-AYJJMM
  eventpreprocessor:
    image:
      tag: 1.0.7-20180620T074922Z-ILAN-AYJJMM
  incidentprocessor:
    image:
      tag: 1.0.7-20180620T074411Z-ILAN-AYJJMM
  notificationprocessor:
    image:
      tag: 1.0.7-20180619T180630Z-ILAN-AYJJMM
  integrationcontroller:
    image:
      tag: 1.0.7-20180619T174242Z-ILAN-AYJJMM
  normalizer:
    image:
      tag: 1.0.7-20180619T174256Z-ILAN-AYJJMM
  schedulingui:
    image:
      tag: 1.0.7-20180619T174038Z-ILAN-AYJJMM
  rba:
    rbs:
      image:
        tag: 1.12.2-20180619T151412Z_evaluation-license
    as:
      image:
        tag: 1.12.2-20180619T151122Z_evaluation-license
  cemhelmtests:
    image:
      tag: 0.1.0-20180618T131407Z-ILAN-AYJJMM
# <-CEM-common-images
# CEM-kub-config->
# Configuration related to Kubernetes

productName: 'IBM Cloud Event Management Community Edition'
license: 'not accepted'
arch: ''

# CEM microservices
brokers:
  clusterSize: 1
  secrets: # If values are blank, the secret will be automatically generated.
    username: ''
    password: ''
cemusers:
  clusterSize: 1
  secrets: # If values are blank, the secret will be automatically generated.
    username: ''
    password: ''
    clientid: ''
    clientsecret: ''
    oidcclientid: 'ibmcloudeventmanagement'
    oidcclientsecret: ''
channelservices:
  clusterSize: 1
  secrets: # If values are blank, the secret will be automatically generated.
    username: ''
    password: ''
datalayer:
  clusterSize: 1
eventanalyticsui:
  clusterSize: 1
  secrets: # If values are blank, the secret will be automatically generated.
    session: ''
eventpreprocessor:
  clusterSize: 1
incidentprocessor:
  clusterSize: 1
integrationcontroller:
  clusterSize: 1
  secrets: # If values are blank, the secret will be automatically generated.
    username: ''
    password: ''
normalizer:
  clusterSize: 1
  outgoingUseSelfsignedCert: true
notificationprocessor:
  clusterSize: 1
schedulingui:
  clusterSize: 1

# RBA dependency (rbs/as)
rba:
  rbs:
    clusterSize: 1
  as:
    clusterSize: 1

# Zookeeper dependency
zookeeper:
  clusterSize: 1

# Kafka dependency
kafka:
  clusterSize: 1
  ## The kafka client credentials
  client:
    username: 'alice'
    password: 'alice-secret'
  ## The kafka administrative credentials
  admin:
    username: 'admin'
    password: 'admin-secret'
  ssl:
    enabled: false

    # SSL with kafka isn't used (yet)
    secret: 'cem-trust'
    password: 'abcdefgh'

# Couchdb dependency
couchdb:
  ## The CouchDB cluster initial cluster size
  clusterSize: 1

  ## If enabled, nodes are automatically added to the couchdb cluster when
  ## couchdb pods are started. Requires the default system service account for
  ## the namespace has read access to the Kubernetes endpoints API.
  autoClusterConfig:
    enabled: false

  ## The number of shards and replicas of data
  numShards: 8
  numReplicas: 3
  # The Couchdb Secret name
  secretName: 'cem-couchdb-secret'

# Redis dependency
redis:
  replicas:
    servers: 3
    sentinels: 3
# <-CEM-kub-config

email:
  # Set this property to the Email address that should be shown as the sender (From) of the message.
  from: noreply-your-company-notification@your-company.com
  # Set this property to "smtp" to use a mail relay server. This requires setting the other smtp-prefixed properties as well.
  # Set to "direct" (default) to send directly to the recipient's server.
  # Use "api" if the "sendgrid" service is available. This requires the "apikey" property also to be set.
  type: direct
  # When "type" is set to "smtp", set this to the host name of your smtp server used for mail relay.
  smtphost: ''
  # When "type" is set to "smtp", set this to the port number used by the smtp server specified by the "smtphost" value.
  smtpport: ''
  # When "type" is set to "smtp", set this to a valid user name for the smtp server specified by the "smtphost" value.
  smtpuser: ''
  # When "type" is set to "smtp", set this to the password for the user name defined by the "smtpuser" value.
  smtppassword: ''
  # When "type" is set to "api", set this value to the API key required by the Sendgrid API. (Send mail authorization is required).
  apikey: ''
global: # Properties in here can be accessed by the main chart and by all subcharts
  # CEM-global->
  image:
    repository: 'ibmcom'
  masterIP: ''
  proxyIP: ''
  masterPort: 8443
  environmentSize: 'size0'
  # Controls the resource sizes the value can be either 'size1' or 'size0'.
  # Size0 is a minimal spec for evaluation or development purposes.
  # <-CEM-global
  cassandraNodeReplicas: 1
  persistence:
    enabled: true
    storageClassName: ''
    storageClassOption:
      # CEM-global-storage-option->
      datalayerjobs: 'default'
      kafkadata: 'default'
      cassandradata: 'default'
      cassandrabak: 'default'
      zookeeperdata: 'default'
      couchdbdata: 'default'
      # <-CEM-global-storage-option
    storageSize:
      cassandradata: '50Gi'
      cassandrabak: '50Gi'
      couchdbdata: '1Gi'
      datalayerjobs: '512Mi'
  ingress:
    # global.ingress.domain must be set to the fully qualified domain name
    # (FQDN) of the CEM service. This FQDN must resolve to the IP address of
    # the ICp proxy host running the ingress controller.  This normally
    # requires a DNS entry, for testing /etc/hosts on any client host may be
    # updated.
    domain: ''
    # If global.ingress.tlsSecret is the empty string CEM will use the default
    # TLS certificate installed on the ingress controller. If this certificate
    # does not match the value of global.ingress.domain browsers and other
    # clients will raise security warnings.
    # For production use a TLS certificate for the FQDN should be obtained from
    # a well known certificate authority and installed in a TLS secret in the
    # name space. global.ingress.tlsSecret must be set to the name of this
    # secret.
    tlsSecret: ''
    # If multiple releases of CEM are installed in a single ICp each should be
    # given a different FQDN, and each should have a TLS certificate installed.
    # If the same FQDN is used for each release, or tlsSecret is left empty for
    # any release, global.ingress.prefix may be used to give each a different
    # path.  E.g. if global.ingress.domain is 'cem.example.com' and
    # global.ingress.prefix is 'mycem/', the UI end point will be
    # https://cem.example.com/mycem/cemui.
    prefix: ''
# CEM-autocompiled-config->
# Config related to microservice container configuration
# Automatically compiled properties from makehelm will be concatenated below. There MUST be a new line at the end of this file:
cemservicebroker:
  # Appended to names and ids in catalog to allow multiple brokers to be registered.
  suffix: ''
# <-CEM-autocompiled-config
```

</details>

---

# IBM Cloud Event Management

## Introduction

- Use the IBM?? Cloud Event Management service to set up real-time incident management for your services, applications, and infrastructure.
- Restore service and resolve operational incidents fast!
- Empower your DevOps teams to correlate different sources of events into actionable incidents, synchronize teams, and automate incident resolution.
- The service sets you on course to achieve efficient and reliable operational health, service quality and continuous improvement.

## Chart Details

This chart will install the following:

Services via stateful sets:

- cassandra
- couchdb
- kafka
- zookeeper
- datalayer

Services not via stateful sets:

- rba-as
- brokers
- cem-users
- channelservices
- datalayer
- event-analytics-ui
- eventpreprocessor
- incidentprocessor
- integration-controller
- normalizer
- notificationprocessor
- rba-rbs
- scheduling-ui

Ingress resources:

- cem-api
- cem-ingress

Secrets:

- cem-couchdb-secret
- cem-brokers-cred-secret
- cem-cemusers-cred-secret
- cem-channelservices-cred-secret
- cem-email-cred-secret
- cem-event-analytics-ui-session-secret
- cem-integrationcontroller-cred-secret
- rba-devops-secret
- rba-jwt-secret

_NOTE:_
All resources created are prefixed with the release name. For example if the release name is 'user-release', the cassandra stateful set would be named 'user-release-cassandra''

Services and pods are spread across nodes using the Kubernetes anti-affinity
feature.

## Prerequisites

- Kubernetes v1.10 or higher
- The default storage class is used. See the Storage section in this document.

## Resources Required

#### System resources, based on default install parameters.

- Minimum: 8GB Memory and 4 CPU
- Recommended: 16GB Memory and 18 CPU

The CPU resource is measured in Kuberenetes _cpu_ units. See Kubernetes documentation for details.

#### Persistence:

- Cassandra will need 108GB of disk space
- Other components will need an additional 4GB

## Installing the Chart

- Set the `global.masterIP` parameter to the IP address of the kubernetes master node
- If multiple instances of the charts are installed set cemusers.secrets.oidcclientid and cemservicebroker.suffix to unique values.
- See the Storage section in this document for storage configuration considerations.

To install the chart with the release name `my-release`:

```bash
$ helm install --tls --name my-release stable/ibm-cloud-evtmgmt
```

The command deploys cloud-event-management on the Kubernetes cluster in the default configuration. The Configuration section in this document lists common parameters that can be configured during installation.

## Verifying the chart

- To verify the installation run the following kubectl command:
  `helm test my-release --tls --cleanup`

## Post installation

Follow the instructions displayed after the helm installation completes.
See the [Configuring](https://www.ibm.com/support/knowledgecenter/SSURRN/com.ibm.cem.doc/em_configuring.html) topic in the [IBM Cloud Event Management Knowledge Center ](https://www.ibm.com/support/knowledgecenter/SSURRN/com.ibm.cem.doc/index.html)afterwards for further information on Cloud Event Management configuration and use.

### Uninstalling the Chart

To uninstall and delete the `my-release` deployment:

```bash
helm delete --purge my-release
```

The helm delete command does not delete Persistent Volumes created by the installation. If a chart is uninstalled and you do not want to retain its data, review any orphaned Persistent Volume claims using the following command, and delete as required.

```console
$ kubectl get pvc -l release=my-release
```

## Configuration

The following tables lists the global configurable parameters of the cloud-event-management chart and their default values.

| Parameter                                             | Description                                           | Default          |
| ----------------------------------------------------- | ----------------------------------------------------- | ---------------- |
| `global.masterIP`                                     | The IP of the kubernetes master node                  |                  |
| `global.masterPort`                                   | The Port of the kubernetes master node                | `8443`           |
| `global.environmentSize`                              | The resource footprint requested                      | `size0` _NOTE:1_ |
| `global.cassandraNodeReplicas`                        | The number of cassandra servers                       | `1`              |
| `global.persistence.enabled`                          | Data persistance between restarts                     | `true`           |
| `global.persistence.storageClassName`                 | Persistance storage name                              | `nil`            |
| `global.persistence.storageClassOption.datalayerjobs` | Storage class option for Datalayer                    | `default`        |
| `global.persistence.storageClassOption.kafkadata`     | Storage class option for Kafka                        | `default`        |
| `global.persistence.storageClassOption.cassandradata` | Storage class option for Cassandra data               | `default`        |
| `global.persistence.storageClassOption.cassandrabak`  | Storage class option for Cassandra backup             | `default`        |
| `global.persistence.storageClassOption.zookeeperdata` | Storage class option for Zookeeper                    | `default`        |
| `global.persistence.storageClassOption.couchdbdata`   | Storage class option for CouchDB                      | `default`        |
| `global.persistence.storageSize.cassandradata`        | Data storage for each cassandra server                | `50Gi`           |
| `global.persistence.storageSize.cassandrabak`         | Backup storage for each casandra server               | `50Gi`           |
| `global.persistence.storageSize.couchdbdata`          | Storage for each couchdb server                       | `1Gi`            |
| `global.persistence.storageSize.datalayerjobs`        | Storage for dataapi service                           | `512Mi`          |
| `global.ingress.domain`                               | Fully Qualified Domain Name of Cloud Event Management |                  |
| `global.ingress.tlsSecret`                            | TLS cerfificates for Ingress controller               | _NOTE:2_         |
| `global.ingress.prefix`                               | Prefix for UI path to UI end point                    | ``               |

_NOTE:_

1. Valid values for `global.environmentSize` are `size0` and `size1`. `size0` specifies a minimal resource footprint for development and test purposes, while `size1` is intended for production systems with a larger footprint.

2. If this is left empty the default TLS certificate installed on the Ingress Controller is used.

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`.

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart.

## Storage

- If the default storage class is glusterfs then Persistent Volumes will be dynamically provisioned.
- If you require a none-default storage class, update the persistance.storageClassName to the storage class name. Alternatively, set each
  individual value under global.persistance.storageClassOption to specific persistent volumes.

## Limitations

- These charts can be deployed multiple times in the same namespace under different release names.
- To avoid multiple deployments in the same namespace, install one instance per namespace, and deploy multiple namespaces for ease of management and separation of resources.

_NOTE:_ IBM Cloud Event Management is multi-tenant and a single installation supports multiple users.

## Documentation

[IBM Cloud Event Management Knowledge Center ](https://www.ibm.com/support/knowledgecenter/SSURRN/com.ibm.cem.doc/index.html)
