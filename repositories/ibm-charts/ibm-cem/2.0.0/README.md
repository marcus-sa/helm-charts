# `@helm-charts/ibm-charts-ibm-cem`

A cloud based event management solution

| Field               | Value      |
| ------------------- | ---------- |
| Repository Name     | ibm-charts |
| Chart Name          | ibm-cem    |
| Chart Version       | 2.0.0      |
| NPM Package Version | 0.1.0      |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
---
#/********************************************************** {COPYRIGHT-TOP} ****
#* Licensed Materials - Property of IBM
#*
#* "Restricted Materials of IBM"
#*
#*  5737-H89, 5737-H64
#*
#* ? Copyright IBM Corp. 2015, 2018  All Rights Reserved.
#*
#* US Government Users Restricted Rights - Use, duplication, or
#* disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
#********************************************************* {COPYRIGHT-END} ****/

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
      tag: 1.2.0-20180914T184654Z-TryBuy-TKAI-B3NJAV
  cemusers:
    image:
      tag: 1.2.0-20180913T204803Z-TryBuy-TKAI-B3NJAV
  channelservices:
    image:
      tag: 1.2.0-20180917T144222Z-TryBuy-TKAI-B3NJAV
  datalayer:
    image:
      tag: 1.2.0-20180913T160140Z-TryBuy-TKAI-B3NJAV
  eventanalyticsui:
    image:
      tag: 1.2.0-20180918T195954Z-TryBuy-TKAI-B3NJAV
  eventpreprocessor:
    image:
      tag: 1.2.0-20180913T222104Z-TryBuy-TKAI-B3NJAV
  incidentprocessor:
    image:
      tag: 1.2.0-20180913T174931Z-TryBuy-TKAI-B3NJAV
  notificationprocessor:
    image:
      tag: 1.2.0-20180913T195115Z-TryBuy-TKAI-B3NJAV
  integrationcontroller:
    image:
      tag: 1.2.0-20180914T145758Z-TryBuy-TKAI-B3NJAV
  normalizer:
    image:
      tag: 1.2.0-20180918T101845Z-TryBuy-TKAI-B3NJAV
  schedulingui:
    image:
      tag: 1.2.0-20180913T182850Z-TryBuy-TKAI-B3NJAV
  rba:
    rbs:
      image:
        tag: 1.13.1-20180912T201704Z
    as:
      image:
        tag: 1.13.1-20180912T201059Z
  cemhelmtests:
    image:
      tag: 0.2.0-20180918T180839Z-TryBuy-TKAI-B3NJAV
# <-CEM-common-images
#/********************************************************** {COPYRIGHT-TOP} ****
#* Licensed Materials - Property of IBM
#*
#* "Restricted Materials of IBM"
#*
#*  5737-H89, 5737-H64
#*
#* © Copyright IBM Corp. 2015, 2018  All Rights Reserved.
#*
#* US Government Users Restricted Rights - Use, duplication, or
#* disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
#********************************************************* {COPYRIGHT-END} ****/
# CEM-kub-config->
# Configuration related to Kubernetes

productName: 'IBM Cloud Event Management Community Edition'
license: 'not accepted'
arch: ''

# CEM microservices
brokers:
  clusterSize: 1
cemusers:
  clusterSize: 1
channelservices:
  clusterSize: 1
datalayer:
  clusterSize: 1
eventanalyticsui:
  clusterSize: 1
eventpreprocessor:
  clusterSize: 1
incidentprocessor:
  clusterSize: 1
integrationcontroller:
  clusterSize: 1
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
  secretName: 'cem-couchdb-cred-secret'

# Redis dependency
redis:
  replicas:
    servers: 3
    sentinels: 3
# <-CEM-kub-config

global: # Properties in here can be accessed by the main chart and by all subcharts
  # CEM-global->
  image:
    repository: 'ibmcom'
    pullSecret: ''
  masterIP: ''
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
email:
  # Set this property to the Email address that should be shown as the sender (From) of the message.
  mail: noreply-your-company-notification@your-company.com
  # Set this property to "smtp" to use a mail relay server. This requires setting the other smtp-prefixed properties as well.
  # Set to "direct" (default) to send directly to the recipient's server.
  # Use "api" if the "sendgrid" service is available. This requires the "apikey" property also to be set.
  #
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
nexmo:
  # API key name, from https://dashboard.nexmo.com
  key: ''
  # API key secret, from https://dashboard.nexmo.com
  secret: ''
  # Default Nexmo number from which to send SMS messages
  sms: ''
  # Default Nexmo number from which to send voice messages
  voice: ''
  # true to use Nexmo, false disables
  enabled: false
  # Override numbers used for selected countries
  # Property names are country codes, values are objects with "voice" and "sms" properties
  # Enter as a JSON object in quotes
  numbers: '{}'
  # Numbers from countries to which messages must not be sent
  # Enter as a comma separated list of strings
  countryblacklist: '[]'
watsonworkspace:
  # CEM app ID defined by IBM
  appid: APPID
  # CEM app secret defined by IBM
  appsecret: APPSECRET
  # CEM share token defined by IBM
  sharetoken: SHARETOKEN
# <-CEM-autocompiled-config
```

</details>

---

# IBM Cloud Event Management Community Edition

## Introduction

- Use the IBM® Cloud Event Management Community Edition service to set up real-time incident management for your services, applications, and infrastructure.
- Restore service and resolve operational incidents fast!
- Empower your DevOps teams to correlate different sources of events into actionable incidents, synchronize teams, and automate incident resolution.
- The service sets you on course to achieve efficient and reliable operational health, service quality and continuous improvement.

## Chart Details

This chart will install the following:

Cluster Service Broker resources:

- ibm-cem-cemcsb

Deployment resources:

- ibm-cem-rba-as
- ibm-cem-brokers
- ibm-cem-cem-users
- ibm-cem-channelservices
- ibm-cem-event-analytics-ui
- ibm-cem-eventpreprocessor
- ibm-cem-incidentprocessor
- ibm-cem-integration-controller
- ibm-cem-normalizer
- ibm-cem-notificationprocessor
- ibm-cem-rba-rbs
- ibm-cem-scheduling-ui
- redis-server
- redis-sentinel

Horizontal Pod Autoscale resources:

- ibm-cem-brokers
- ibm-cem-cem-users
- ibm-cem-channelservices
- ibm-cem-event-analytics-ui
- ibm-cem-eventpreprocessor
- ibm-cem-incidentprocessor
- ibm-cem-integration-controller
- ibm-cem-normalizer
- ibm-cem-notificationprocessor
- ibm-cem-rba-as
- ibm-cem-rba-rbs
- ibm-cem-scheduling-ui

Ingress resources:

- cem-api
- cem-ingress

Secret resources:

- cem-couchdb-secret
- cem-brokers-cred-secret
- cem-cemusers-cred-secret
- cem-channelservices-cred-secret
- cem-email-cred-secret
- cem-event-analytics-ui-session-secret
- cem-integrationcontroller-cred-secret
- cem-nexmo-cred-secret
- rba-devops-secret
- rba-jwt-secret

Service resources:

- cassandra
- couchdb
- ibm-cem-brokers
- ibm-cem-cem-users
- ibm-cem-channelservices
- ibm-cem-datalayer
- ibm-cem-event-analytics-ui
- ibm-cem-eventpreprocessor
- ibm-cem-incidentprocessor
- ibm-cem-integration-controller
- ibm-cem-normalizer
- ibm-cem-notificationprocessor
- ibm-cem-rba-as
- ibm-cem-rba-rbs
- ibm-cem-scheduling-ui
- kafka
- redis-master-svc
- redis-sentinel
- redis-slave-svc
- zkensemble
- zookeeper

Statefulset resources:

- cassandra
- couchdb
- ibm-cem-datalayer
- kafka
- zookeeper

_NOTE:_
All resources created are prefixed with the release name. For example if the release name is 'user-release', the cassandra stateful set would be named 'user-release-cassandra''

Pods are spread across worker nodes using the Kubernetes anti-affinity feature.

## Prerequisites

- IBM Cloud Private 2.1.0.3
- Cluster admin privilege is required for OIDC registration, cluster security policies and service broker
- The default storage class is used. See the Storage section below.

## Resources Required

#### System resources, based on default install parameters.

- Minimum: 8GB Memory and 4 CPU
- Recommended: 16GB Memory and 18 CPU

The CPU resource is measured in Kuberenetes _cpu_ units. See Kubernetes documentation for details.

#### Persistence:

- Cassandra will need 108GB of disk space
- Other components will need an additional 4GB

## Installing the Chart

1. From the IBM Cloud Private dashboard console, open the Catalog.
2. Locate and select the `ibm-cem` chart.
3. Review the provided instructions and select Configure.
4. Provide a release name and select a namespace.
5. Review and accept the license(s).
6. Using the Configuration table below, provide the required configuration based on requirements specific to your installation. Required fields are displayed with an asterisk.
7. Select the Install button to complete the helm installation.

For more information on installing IBM Cloud Event Management, consult the [Installation](https://www.ibm.com/support/knowledgecenter/SSURRN/com.ibm.cem.doc/em_install_cem_icp.html) topic.

Note:

- If multiple installs of the chart in a single IBM Cloud Private environment is required, set the CEM Users OIDC client ID, CEM Users OIDC client secret, and CEM Service Broker Configuration `suffix` properties to unique values. If the same `Ingress Domain` is used between the installs, specify a unique `Ingress Prefix` path value.
- See the Storage section below for storage configuration considerations.

## Verifying the Chart via the Command Line:

- To verify the installation after all pods are in the ready state, run the following kubectl command:
  `helm test <release> --tls --cleanup`

## Post installation

1. Follow the instructions displayed after the helm installation completes. The instructions can also be displayed by viewing the installed helm release under Menu -> Workloads -> Helm Releases or by running the command: `helm status <release> --tls`.
2. IBM Cloud Event Management is multi-tenant and a single installation supports many service instances. Refer to the [Create service instances](https://www.ibm.com/support/knowledgecenter/SSURRN/com.ibm.cem.doc/em_cem_install_servinstance.html) topic.
3. After creating and launching into a service instance, see the [Configuring](https://www.ibm.com/support/knowledgecenter/SSURRN/com.ibm.cem.doc/em_configuring.html) topic for getting started.

### Uninstalling the Chart via UI:

1. Select the Menu -> Workloads -> Helm Releases
2. Locate the installed helm release and select the actions menu -> Delete
3. Confirm deletion by selecting the Remove button

The helm delete command does not delete Persistent Volumes created by the installation. If the chart is removed and you do not want to retain its data:

1. Select the Menu -> Platform -> Storage
2. Review any orphned Persistnece Volume Claims and delete as required.

### Uninstalling the Chart via the Command Line

To uninstall and delete the deployment:

```bash
helm delete --purge <release> --tls
```

The helm delete command does not delete Persistent Volumes created by the installation. If the chart is removed and you do not want to retain its data, review any orphaned Persistent Volume claims using the following command, and delete as required.

```console
$ kubectl get pvc -l release=<release>
```

## Configuration

The following tables lists the global configurable parameters of the cloud-event-management chart and their default values.

| Parameter                                             | Description                                           | Default                                              |
| ----------------------------------------------------- | ----------------------------------------------------- | ---------------------------------------------------- |
| `global.image.repository`                             | Registry containing CEM services images               | ``                                                   |
| `global.image.pullSecret`                             | Images pull secret                                    | ``                                                   |
| `global.masterIP`                                     | The IP of the kubernetes master node                  | ``                                                   |
| `global.masterPort`                                   | The Port of the kubernetes master node                | `8443`                                               |
| `global.environmentSize`                              | The resource footprint requested                      | `size0` _NOTE:1_                                     |
| `global.cassandraNodeReplicas`                        | The number of cassandra servers                       | `1`                                                  |
| `global.persistence.enabled`                          | Data persistance between restarts                     | `true`                                               |
| `global.persistence.storageClassName`                 | Persistance storage name                              | `nil`                                                |
| `global.persistence.storageClassOption.datalayerjobs` | Storage class option for Datalayer                    | `default`                                            |
| `global.persistence.storageClassOption.kafkadata`     | Storage class option for Kafka                        | `default`                                            |
| `global.persistence.storageClassOption.cassandradata` | Storage class option for Cassandra data               | `default`                                            |
| `global.persistence.storageClassOption.cassandrabak`  | Storage class option for Cassandra backup             | `default`                                            |
| `global.persistence.storageClassOption.zookeeperdata` | Storage class option for Zookeeper                    | `default`                                            |
| `global.persistence.storageClassOption.couchdbdata`   | Storage class option for CouchDB                      | `default`                                            |
| `global.persistence.storageSize.cassandradata`        | Data storage for each cassandra server                | `50Gi`                                               |
| `global.persistence.storageSize.cassandrabak`         | Backup storage for each casandra server               | `50Gi`                                               |
| `global.persistence.storageSize.couchdbdata`          | Storage for each couchdb server                       | `1Gi`                                                |
| `global.persistence.storageSize.datalayerjobs`        | Storage for dataapi service                           | `512Mi`                                              |
| `global.ingress.domain`                               | Fully Qualified Domain Name of Cloud Event Management |                                                      |
| `global.ingress.tlsSecret`                            | TLS cerfificates for Ingress controller               | _NOTE:2_                                             |
| `global.ingress.prefix`                               | Prefix for UI path to UI end point                    | ``                                                   |
| `commonimages.brokers.image.tag`                      | Brokers image tag                                     |                                                      |
| `commonimages.cemusers.image.tag`                     | Users image tag                                       |                                                      |
| `commonimages.channelservices.image.tag`              | Channel services image tag                            |                                                      |
| `commonimages.datalayer.image.tag`                    | Data layer image tag                                  |                                                      |
| `commonimages.eventanalyticsui.image.tag`             | Event analytics ui image tag                          |                                                      |
| `commonimages.eventpreprocessor.image.tag`            | Event preprocessor image tag                          |                                                      |
| `commonimages.incidentprocessor.image.tag`            | Incident processor image tag                          |                                                      |
| `commonimages.notificationprocessor.image.tag`        | Notification processor image tag                      |                                                      |
| `commonimages.integrationcontroller.image.tag`        | Integration Controller image tag                      |                                                      |
| `commonimages.normalizer.image.tag`                   | Normalizer image tag                                  |                                                      |
| `commonimages.schedulingui.image.tag`                 | Scheduling ui image tag                               |                                                      |
| `commonimages.rba.rbs.image.tag`                      | Runbook service image tag                             |                                                      |
| `commonimages.rba.as.image.tag`                       | Automation service image tag                          |                                                      |
| `commonimages.cemhelmtests.image.tag`                 | CEM helm tests image tag                              |                                                      |
| `productName`                                         | Product name                                          |                                                      |
| `license`                                             | License                                               | `not accepted`                                       |
| `arch`                                                | Architecture                                          |                                                      |
| `brokers.clusterSize`                                 | Brokers cluster size                                  | `1`                                                  |
| `cemusers.clusterSize`                                | CEM users cluster size                                | `1`                                                  |
| `channelservices.clusterSize`                         | Channel services cluster size                         | `1`                                                  |
| `datalayer.clusterSize`                               | Data layer cluster size                               | `1`                                                  |
| `eventanalyticsui.clusterSize`                        | Eventan alytics ui cluster size                       | `1`                                                  |
| `eventpreprocessor.clusterSize`                       | Event preprocessor cluster size                       | `1`                                                  |
| `incidentprocessor.clusterSize`                       | Incident processor cluster size                       | `1`                                                  |
| `integrationcontroller.clusterSize`                   | Integration controller cluster size                   | `1`                                                  |
| `normalizer.clusterSize`                              | Normalizer cluster size                               | `1`                                                  |
| `normalizer.outgoingUseSelfsignedCert`                | Self signed certificate                               | `true`                                               |
| `notificationprocessor.clusterSize`                   | Notification processor cluster size                   | `1`                                                  |
| `schedulingui.clusterSize`                            | Scheduling ui cluster size                            | `1`                                                  |
| `rba.rbs.clusterSize`                                 | Runbook cluster size                                  | `1`                                                  |
| `rba.as.clusterSize`                                  | Automation cluster size                               | `1`                                                  |
| `kafka.clusterSize`                                   | Kafka cluster size                                    | `1`                                                  |
| `kafka.client.username`                               | Kafka username                                        |                                                      |
| `kafka.client.password`                               | Kafka password                                        |                                                      |
| `kafka.admin.username`                                | Kafka admin username                                  |                                                      |
| `kafka.admin.password`                                | Kafka admin password                                  |                                                      |
| `kafka.ssl.enabled`                                   | Enable kafka SSL                                      |                                                      |
| `kafka.ssl.secret`                                    | Kafka TLS secret                                      |                                                      |
| `kafka.ssl.password`                                  | Kafka TLS password                                    |                                                      |
| `couchdb.clusterSize`                                 | CouchDB cluster size                                  | `1`                                                  |
| `couchdb.autoClusterConfig.enabled`                   | CouchDB cluster config                                | `false`                                              |
| `couchdb.numShards`                                   | CouchDB number of shards                              | `8`                                                  |
| `couchdb.numReplicas`                                 | CouchDB number of replicas                            | `3`                                                  |
| `couchdb.secretName`                                  | CouchDB secret name                                   |                                                      |
| `redis.replicas.servers`                              | Redis servers replica count                           | `3`                                                  |
| `redis.replicas.sentinels`                            | Redis sentinels replica count                         | `3`                                                  |
| `email.mail`                                          | Sender email configuration                            | `noreply-your-company-notification@your-company.com` |
| `email.type`                                          | Email type                                            | `direct`                                             |
| `email.smtphost`                                      | Smtp host                                             | ``                                                   |
| `email.smtpport`                                      | Smtp port                                             | ``                                                   |
| `email.smtpuser`                                      | Smtp user                                             | ``                                                   |
| `email.smtppassword`                                  | Smtp password                                         | ``                                                   |
| `email.apikey`                                        | API key required by the Sendgrid API                  | ``                                                   |
| `nexmo.enabled`                                       | Nexmo SMS and Voice Messages                          | `false`                                              |
| `nexmo.key`                                           | API key required by the Nexmo API                     | ``                                                   |
| `nexmo.secret`                                        | API secret required by the Nexmo API                  | ``                                                   |
| `nexmo.sms`                                           | Nexmo number to send SMS messages                     | ``                                                   |
| `nexmo.voice`                                         | Nexmo number to send voice messages                   | ``                                                   |
| `nexmo.numbers`                                       | API key required by the Sendgrid API                  | `{}`                                                 |
| `nexmo.countryblacklist`                              | Blacklisted countries                                 | `{}`                                                 |

_NOTE:_

1. Valid values for `global.environmentSize` are `size0` and `size1`. `size0` specifies a minimal resource footprint for development and test purposes, while `size1` is intended for production systems with a larger footprint.

2. If this is left empty the default TLS certificate installed on the Ingress Controller is used.

## Storage

- If the default storage class is glusterfs then Persistent Volumes will be dynamically provisioned.
- If you require a none-default storage class, update the persistance.storageClassName to the storage class name. Alternatively, set each individual value under global.persistance.storageClassOption to specific persistent volumes.

## Limitations

- These charts can be deployed multiple times in the same namespace under different release names.
- To avoid multiple deployments in the same namespace, install one instance per namespace, and deploy multiple namespaces for ease of management and separation of resources.

## Documentation

[IBM Cloud Event Management Knowledge Center ](https://www.ibm.com/support/knowledgecenter/SSURRN/com.ibm.cem.doc/index.html)
