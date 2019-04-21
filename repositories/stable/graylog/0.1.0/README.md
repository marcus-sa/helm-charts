# `@helm-charts/stable-graylog`

Graylog is the centralized log management solution built to open standards for capturing, storing, and enabling real-time analysis of terabytes of machine data.

| Field               | Value   |
| ------------------- | ------- |
| Repository Name     | stable  |
| Chart Name          | graylog |
| Chart Version       | 0.1.0   |
| NPM Package Version | 0.1.0   |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for Graylog.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.

rbac:
  # Specifies whether RBAC resources should be created
  ##
  create: true

serviceAccount:
  # Specifies whether a ServiceAccount should be created
  ##
  create: true
  # The name of the ServiceAccount to use.
  # If not set and create is true, a name is generated using the fullname template
  ##
  name:

tags:
  # If true, this chart will install Elasticsearch from requirement dependencies
  install-elasticsearch: true
  # If true, this chart will install MongoDB replicaset from requirement dependencies
  install-mongodb: true

graylog:
  ## Graylog image version
  ## Ref: http://kubernetes.io/docs/user-guide/images/#pre-pulling-images
  ##
  ## Important note: Official Graylog Docker image may replace the existing Docker image tags and cause some corrupt when starting the pod.
  ## Make sure you strict with the `x` version of Graylog where `x` is ${version}-${x}
  ##
  image:
    repository: 'graylog/graylog:2.5.1-3'
    pullPolicy: 'IfNotPresent'

  replicas: 2

  ## Pod affinity
  ## ref: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#affinity-and-anti-affinity
  ##

  affinity: {}
  ## Node tolerations for node-exporter scheduling to nodes with taints
  ## Ref: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/
  ##

  tolerations:
    []
    # - key: "key"
    #   operator: "Equal|Exists"
    #   value: "value"
    #   effect: "NoSchedule|PreferNoSchedule|NoExecute(1.6 only)"

  ## Node labels for node-exporter pod assignment
  ## Ref: https://kubernetes.io/docs/user-guide/node-selection/
  ##
  nodeSelector: {}

  ## Annotations to be added to Graylog pods
  ##
  podAnnotations: {}

  persistence:
    ## If true, Graylog will create/use a Persistent Volume Claim
    ## If false, use emptyDir
    ##
    enabled: true
    ## Graylog data Persistent Volume access modes
    ## Must match those of existing PV or dynamic provisioner
    ## Ref: http://kubernetes.io/docs/user-guide/persistent-volumes/
    ##
    accessMode: ReadWriteOnce
    ## Graylog data Persistent Volume size
    ##
    size: '20Gi'
    ## Graylog data Persistent Volume Storage Class
    ## If defined, storageClassName: <storageClass>
    ## If set to "-", storageClassName: "", which disables dynamic provisioning
    ## If undefined (the default) or set to null, no storageClassName spec is
    ##   set, choosing the default provisioner.  (gp2 on AWS, standard on
    ##   GKE, AWS & OpenStack)
    ##
    # storageClass: "ssd"

  ## Additional plugins you need to install on Graylog.
  plugins:
    []
    # - name: graylog-plugin-slack-2.7.1.jar
    #   url: https://github.com/omise/graylog-plugin-slack/releases/download/2.7.1/graylog-plugin-slack-2.7.1.jar
    # - name: graylog-plugin-function-check-diff-1.0.0.jar
    #   url: https://github.com/omise/graylog-plugin-function-check-diff/releases/download/1.0.0/graylog-plugin-function-check-diff-1.0.0.jar
    # - name: graylog-plugin-custom-alert-condition-1.0.0.jar
    #   url: https://github.com/omise/graylog-plugin-custom-alert-condition/releases/download/v1.0.0/graylog-plugin-custom-alert-condition-1.0.0.jar

  ## A service for Graylog web interface
  service:
    type: ClusterIP
    port: 9000

  ## Additional input ports for receiving logs from servers
  ## Note: Name must be in IANA_SVC_NAME (at most 15 characters, matching regex [a-z0-9]([a-z0-9-]*[a-z0-9])* and it must contains at least one letter [a-z], hyphens cannot be adjacent to other hyphens)
  ## Note: Array must be sorted by port order
  ##
  input:
    {}
    # tcp:
    #   service:
    #     type: LoadBalancer
    #     loadBalancerIP:
    #   ports:
    #     - name: gelf
    #       port: 12222
    # udp:
    #   service:
    #     type: ClusterIP
    #   ports:
    #     - name: syslog
    #       port: 12222

  ingress:
    ## If true, Graylog server Ingress will be created
    ##
    enabled: false
    port: 80
    ## Graylog server Ingress annotations
    ##
    annotations: {}
    ## Graylog server Ingress hostnames with optional path
    ## Must be provided if Ingress is enabled
    ## Note: Graylog does not support two URL. You can specify only single URL
    ##
    hosts: []
    #   - graylog.yourdomain.com

    ## Graylog server Ingress TLS configuration
    ## Secrets must be manually created in the namespace
    ##
    tls: []
    #   - secretName: graylog-server-tls
    #     hosts:
    #       - graylog.yourdomain.com

  ## Configure resource requests and limits
  ## ref: http://kubernetes.io/docs/user-guide/compute-resources/
  ##
  resources:
    limits:
      cpu: '1'
    requests:
      cpu: '500m'
      memory: '1024Mi'

  ## Set Graylog Java heapsize. If this value empty, chart will allocate heapsize using `-XX:+UseCGroupMemoryLimitForHeap`
  ## ref: https://blogs.oracle.com/java-platform-group/java-se-support-for-docker-cpu-and-memory-limits
  ##
  # heapSize: "1024g"

  ## RollingUpdate update strategy
  ## ref: https://kubernetes.io/docs/tutorials/stateful-application/basic-stateful-set/#updating-statefulsets
  updateStrategy: OnDelete
  ## Graylog server pod termination grace period
  ##
  terminationGracePeriodSeconds: 120

  metrics:
    ## If true, prometheus annotations will not be attached
    ##
    enabled: false

  geoip:
    ## If true, Maxmind GeoLite2 will be installed to ${GRAYLOG_HOME}/geoip location
    ##
    enabled: false

  ## Graylog root user name
  ##
  rootUsername: 'admin'

  ## Graylog root password
  ## Defaults to a random 16-character alphanumeric string if not set
  ##
  # rootPassword: ""

  ## Graylog root email
  ##
  rootEmail: ''

  ## Graylog root timezone
  ##
  rootTimezone: 'UTC'

  elasticsearch:
    ## List of Elasticsearch hosts Graylog should connect to.
    ## Need to be specified as a comma-separated list of valid URIs for the http ports of your elasticsearch nodes.
    ## If one or more of your elasticsearch hosts require authentication, include the credentials in each node URI that
    ## requires authentication.
    ##
    # hosts: http://elasticsearch-client.graylog.svc.cluster.local:9200

    ## These configuration settings are only used on the first start of Graylog. After that,
    ## index related settings can be changed in the Graylog web interface on the 'System / Indices' page.
    ## Also see http://docs.graylog.org/en/2.3/pages/configuration/index_model.html#index-set-configuration.
    rotationStrategy: time
    maxNumberOfIndices: 24
    retentionStrategy: delete
    shards: 5
    replicas: 1
    indexPrefix: graylog

  mongodb:
    ## MongoDB connection string
    ## See https://docs.mongodb.com/manual/reference/connection-string/ for details
    # uri: mongodb://user:pass@host1:27017,host2:27017,host3:27017/graylog?replicaSet=rs01

    ## Increase this value according to the maximum connections your MongoDB server can handle from a single client
    ## if you encounter MongoDB connection problems.
    maxConnections: 1000

  transportEmail:
    ## If true, enable Email transport.
    enabled: false
    hostname: ''
    port: 2587
    useAuth: true
    useTls: true
    useSsl: true
    authUsername: ''
    authPassword: ''
    subjectPrefix: '[graylog]'
    fromEmail: ''

  ## Additional server files will be deployed to /etc/graylog/server
  ## For example, you can put server certificates or authorized clients certificates here
  ##
  serverFiles:
    {}
    # graylog-server.key: |
    # graylog-server.cert: |

## Specify Elasticsearch version from requirement dependencies. Ignore this seection if you install Elasticsearch manually.
## Note: Graylog 2.4 requires Elasticsearch version <= 5.6
elasticsearch:
  image:
    repository: 'docker.elastic.co/elasticsearch/elasticsearch-oss'
    tag: '6.5.4'
  cluster:
    xpackEnable: false
```

</details>

---

# Graylog

This chart provide the [Graylog](https://www.graylog.org/) deployments.
Note: It is strongly recommend to use on Official Graylog image to run this chart.

## Quick Installation

This chart requires the following charts before install Graylog

1. MongoDB
2. Elasticsearch

To install the Graylog Chart with all dependencies

```bash
kubectl create namespace graylog

helm repo add incubator http://storage.googleapis.com/kubernetes-charts-incubator
helm install --namespace "graylog" -n "graylog" incubator/graylog
```

## Manually Install Dependencies

This method is _recommended_ when you want to expand the availability, scalability, and security of the services. You need to install MongoDB replicaset and Elasticsearch with proper settings before install Graylog.

To install MongoDB, run

```bash
helm install --namespace "graylog" -n "mongodb" stable/mongodb-replicaset
```

To install Elasticsearch, run

```bash
helm install --namespace "graylog" -n "elasticsearch" stable/elasticsearch
```

Note: There are many alternative Elasticsearch available on GitHub. If you found the `stable/elasticsearch` is not suitable, you can search other charts from GitHub repositories.

## Install Chart

To install the Graylog Chart into your Kubernetes cluster (This Chart requires persistent volume by default, you may need to create a storage class before install chart.

```bash
helm repo add incubator http://storage.googleapis.com/kubernetes-charts-incubator
helm install --namespace "graylog" -n "graylog" incubator/graylog \
  --set tags.install-mongodb=false\
  --set tags.install-elasticsearch=false\
  --set graylog.mongodb.uri=mongodb://mongodb-mongodb-replicaset-0.mongodb-mongodb-replicaset.graylog.svc.cluster.local:27017/graylog?replicaSet=rs0 \
  --set elasticsearch.hosts=http://elasticsearch-client.graylog.svc.cluster.local:9200
```

After installation succeeds, you can get a status of Chart

```bash
helm status "graylog"
```

If you want to delete your Chart, use this command

```bash
helm delete --purge "graylog"
```

## Install Chart with specific Graylog cluster size

By default, this Chart will create a graylog with 2 nodes (1 master, 1 coordinating). If you want to change the cluster size during installation, you can use `--set graylog.replicas={value}` argument. Or edit `values.yaml`

For example:
Set cluster size to 5

```bash
helm install --namespace "graylog" -n "graylog" --set servers.replicas=5 stable/graylog
```

The command above will install 1 master and 4 coordinating.

## Install Chart with specific node pool

Sometime you may need to deploy your graylog to specific node pool to allocate resources.
For example, you have 6 vms in node pools and you want to deploy graylog to node which labeled as `cloud.google.com/gke-nodepool: graylog-pool`

Set the following values in `values.yaml`

```yaml
servers:
  nodeSelector: {cloud.google.com/gke-nodepool: graylog-pool}
```

## Configuration

The following table lists the configurable parameters of the Cassandra chart and their default values.

| Parameter                               | Description                                                                                                                                           | Default                               |
| --------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- |
| `graylog.image`                         | `graylog` image repository                                                                                                                            | `graylog/graylog:2.4`                 |
| `graylog.imagePullPolicy`               | Image pull policy                                                                                                                                     | `IfNotPresent`                        |
| `graylog.replicas`                      | The number of Graylog instances in the cluster. The chart will automatic create assign master to one of replicas                                      | `2`                                   |
| `graylog.resources`                     | CPU/Memory resource requests/limits                                                                                                                   | Memory: `1024Mi`, CPU: `500m`         |
| `graylog.heapSize`                      | Override Java heap size. If this value empty, chart will allocate heapsize using `-XX:+UseCGroupMemoryLimitForHeap`                                   | ``                                    |
| `graylog.nodeSelector`                  | Graylog server pod assignment                                                                                                                         | `{}`                                  |
| `graylog.affinity`                      | Graylog server affinity                                                                                                                               | `{}`                                  |
| `graylog.tolerations`                   | Graylog server tolerations                                                                                                                            | `[]`                                  |
| `graylog.nodeSelector`                  | Graylog server node selector                                                                                                                          | `{}`                                  |
| `graylog.service.type`                  | Kubernetes Service type                                                                                                                               | `ClusterIP`                           |
| `graylog.service.port`                  | Graylog Service port                                                                                                                                  | `9000`                                |
| `graylog.podAnnotations`                | Kubernetes Pod annotations                                                                                                                            | `{}`                                  |
| `graylog.terminationGracePeriodSeconds` | Pod termination grace period                                                                                                                          | `120`                                 |
| `graylog.updateStrategy`                | Update Strategy of the StatefulSet                                                                                                                    | `OnDelete`                            |
| `graylog.persistence.enabled`           | Use a PVC to persist data                                                                                                                             | `true`                                |
| `graylog.persistence.storageClass`      | Storage class of backing PVC                                                                                                                          | `nil` (uses storage class annotation) |
| `graylog.persistence.accessMode`        | Use volume as ReadOnly or ReadWrite                                                                                                                   | `ReadWriteOnce`                       |
| `graylog.persistence.size`              | Size of data volume                                                                                                                                   | `10Gi`                                |
| `graylog.ingress.enabled`               | If true, Graylog Ingress will be created                                                                                                              | `false`                               |
| `graylog.ingress.port`                  | Graylog Ingress port                                                                                                                                  | `false`                               |
| `graylog.ingress.annotations`           | Graylog Ingress annotations                                                                                                                           | `{}`                                  |
| `graylog.ingress.hosts`                 | Graylog Ingress host names                                                                                                                            | `[]`                                  |
| `graylog.ingress.tls`                   | Graylog Ingress TLS configuration (YAML)                                                                                                              | `[]`                                  |
| `graylog.input`                         | Graylog Input configuration (YAML) Sees #Input section for detail                                                                                     | `{}`                                  |
| `graylog.metrics.enabled`               | If true, add Prometheus annotations to pods                                                                                                           | `false`                               |
| `graylog.geoip.enabled`                 | If true, Maxmind Geoip Lite will be installed to \${GRAYLOG_HOME}/etc/GeoLite2-City.mmdb                                                              | `false`                               |
| `graylog.plugins`                       | A list of Graylog installation plugins                                                                                                                | `[]`                                  |
| `graylog.rootUsername`                  | Graylog root user name                                                                                                                                | `admin`                               |
| `graylog.rootPassword`                  | Graylog root password. If not set, random 10-character alphanumeric string                                                                            | ``                                    |
| `graylog.rootEmail`                     | Graylog root email.                                                                                                                                   | ``                                    |
| `graylog.rootTimezone`                  | Graylog root timezone.                                                                                                                                | `UTC`                                 |
| `graylog.elasticsearch.hosts`           | Graylog Elasticsearch host name. You need to specific where data will be stored.                                                                      | ``                                    |
| `graylog.mongodb.uri`                   | Graylog MongoDB connection string. You need to specific where data will be stored.                                                                    | ``                                    |
| `graylog.transportEmail.enabled`        | If true, enable transport email settings on Graylog                                                                                                   | `false`                               |
| `graylog.serverFiles`                   | Add additional server files on /etc/graylog/server. This is useful for enable TLS on input                                                            | `{}`                                  |
| `rbac.create`                           | If true, create & use RBAC resources                                                                                                                  | `true`                                |
| `rbac.serviceAccount.create`            | If true, create the Graylog service account                                                                                                           | `true`                                |
| `rbac.serviceAccount.name`              | Name of the server service account to use or create                                                                                                   | `{{ graylog.fullname }}`              |
| `tags.install-mongodb`                  | If true, this chart will install MongoDB from requirement dependencies. If you want to install MongoDB by yourself, please set to `false`             | `true`                                |
| `tags.install-elasticsearch`            | If true, this chart will install Elasticsearch from requirement dependencies. If you want to install Elasticsearch by yourself, please set to `false` | `true`                                |

## How it works

This chart will create a Graylog statefulset with one Master node. The chart will automatically create Master node Pod label `graylog-role=master`, if it does not exists. The others Pods will be label with `graylog-role=coordinating`

This chart will automatically calculate Java heap size from given `resources.requests.memory` value. If you want to specify number of heap size, you can set `graylog.heapSize` to your desired value. The `graylog.heapSize` value must be in JVM `-Xmx` format.

## Input

You can enable input ports by edit the `input` values. For example, you want to create a GELF input on port `12222`, and `12223` with Cloud LoadBalancer and syslog on UDP port `5410` without load balancer.

```
  input:
    tcp:
      service:
        type: LoadBalancer
        loadBalancerIP:
      ports:
        - name: gelf1
          port: 12222
        - name: gelf2
          port: 12223
    udp:
      service:
        type: ClusterIP
      ports:
        - name: syslog
          port: 5410
```

Note: Name must be in IANA_SVC_NAME (at most 15 characters, matching regex [a-z0-9]([a-z0-9-]*[a-z0-9])\* and it must contains at least one letter [a-z], hyphens cannot be adjacent to other hyphens)

Note: The port list should be sorted by port number.

## Input TLS

To enable TLS on input in Graylog, you need to specify the server private key and certificate. You can add them in `graylog.serverFiles` value. For example

```yaml
graylog:
  serverFiles:
    server.cert: |
      -----BEGIN CERTIFICATE-----
      MIIFYTCCA0mgAwIBAgICEAIwDQYJKoZIhvcNAQELBQAwcjELMAkGA1UEBhMCVEgx
      EDAOBgNVBAgMB0Jhbmdrb2sxEDAOBgNVBAcMB0Jhbmdrb2sxGDAWBgNVBAoMD09t
      aXNlIENvLiwgTHRkLjEPMA0GA1UECwwGRGV2b3BzMRQwEgYDVQQDDAtjYS5vbWlz
      ZS5jbzAeFw0xNzA2MDEwOTQ0NTJaFw0xOTA2MjEwOTQ0NTJaMHkxCzAJBgNVBAYT
      AlRIMRAwDgYDVQQIDAdCYW5na29rMRAwDgYDVQQHDAdCYW5na29rMRgwFgYDVQQK
      DA9PbWlzZSBDby4sIEx0ZC4xDzANBgNVBAsMBkRldm9wczEbMBkGA1UEAwwSZ3Jh
      4YE6FOKJmiDV7KsmoSO2JTEaZAK6sdxI7zFJJH0TNFIuKewEBsVH/W5RccjwK/z/
      BHwoTQc95zbfFjt1JwDiq8jGTVnQoXH99wAIW+HDYq6hqHyqW3YuQ8QvXfi/ebAs
      rn0urmEC7JhsZIg92AqVYEgdp5H6uFqPIK1U6aYrz5zzZpRfEA==
      -----END CERTIFICATE-----
    server.key: |
      -----BEGIN PRIVATE KEY-----
      MIIEugIBADANBgkqhkiG9w0BAQEFAASCBKQwggSgAgEAAoIBAQC1zwgrnurQGlwe
      ZcKe2RXLs9XzQo4PzNsbxRQXSZef/siUZ/X3phd7Tt7QbQv8sxoZFR1/R4neN3KV
      tsWJ6YL3CY1IwqzxtR6SHzkg/CgUFgP4Jq9NDodOFRlmkZBK9iO9x/VITxLZPBQt
      f+ygeNhfG/oZZxlLSWNC/adlFfUGI8TujCGGyydxAegyWRYmhkLM7F3vRqMXiUn2
      UP/nPEMasHiHS7r99RzJILbU494aNYTxprfBAoGAdWwO/4I/r3Zo672AvCs2s/P6
      G85cX2hKMFy3B4/Ww53jFA3bsWTOyXBv4srl3v9C3xkQmDwUxPDshEN45JX1AMIc
      vxQkW5cm2IaPHB1BsuQpAuW6qIBT/NZqLmexb4jipAjTN4wQ2dkjI/zK2/SST5wb
      vNufGafZ1IpvkUsDkA0=
      -----END PRIVATE KEY-----
```

Then configure Graylog input to

| Parameter      | Value                           |
| -------------- | ------------------------------- |
| tls_cert_file: | /etc/graylog/server/server.cert |
| tls_enable:    | true                            |
| tls_key_file:  | /etc/graylog/server/server.key  |

## Get Graylog status

You can get your Graylog status by running the command

```
kubectl get po -L graylog-role
```

Output

```
NAME                        READY     STATUS    RESTARTS   AGE       graylog-ROLE
graylog-0                   1/1       Running     0          1d        master
graylog-1                   1/1       Running     0          1d        coordinating
graylog-2                   1/1       Running     0          1m        coordinating
```
