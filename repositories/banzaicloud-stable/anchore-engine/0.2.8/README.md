# `@helm-charts/banzaicloud-stable-anchore-engine`

Anchore container analysis and policy evaluation engine service

| Field               | Value              |
| ------------------- | ------------------ |
| Repository Name     | banzaicloud-stable |
| Chart Name          | anchore-engine     |
| Chart Version       | 0.2.8              |
| NPM Package Version | 0.1.0              |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for anchore_engine chart.

# The configuration for the API service, which must be reachable inside the cluster by other workers and users
service:
  type: ClusterIP
  ports:
    api: 8228
    queue: 8083
    catalog: 8082
    policy: 8087
    k8sImagePolicyWebhook: 8338

image:
  # Can use 'latest' but not recommended
  repository: 'docker.io/anchore/anchore-engine'
  tag: 'v0.3.2'
  pullPolicy: IfNotPresent

ingress:
  enabled: false
  annotations:
    {}
    #kubernetes.io/ingress.class: traefik
    #ingress.kubernetes.io/ssl-redirect: "false"
    #traefik.frontend.rule.type: PathPrefix
  hosts:
    - '/'
    # - "domain.com/xyz"
    # - "domain.com"
  tls: []
  #  - secretName: chart-example-tls
  #    hosts:
  #      - chart-example.local

# Dependency on Postgresql, configure here
postgresql:
  enabled: true
  postgresUser: postgres
  postgresPassword: anchore
  postgresDatabase: anchore

  # Use this config if you set enabled=False and want to specify an external (already existing) postres deployment for use.
  # Set this to the host and port. eg. mypostgres.myserver.io:5432
  externalEndpoint: null

cloudsql:
  enabled: false
  instance: ''
  dbName: ''
  dbUserName: ''
  dbUserPass: ''
  image:
    repository: gcr.io/cloudsql-docker/gce-proxy
    tag: 1.11
    pullPolicy: IfNotPresent

# Global configuration shared by both core and worker
globalConfig:
  # Set where default configs are placed at startup. This must be a writable location for the pod.
  configDir: /anchore_service_config

  dbConfig:
    timeout: 120
    # Use ssl, but the default postgresql config in helm's stable repo does not support ssl on server side, so this should be set for external dbs only for the time being
    ssl: false
    connectionPoolSize: 30
    connectionPoolMaxOverflow: 100

  # Cleanup local images used during analysis, defaults to True. If set to false, images will remain on workers after analysis.
  cleanupImages: true

  # If True, if a user adds an ECR registry with username = awsauto then the system will look for an instance profile to use for auth against the registry
  allowECRUseIAMRole: false

  # User configuration. Add more users here if needed.
  users:
    admin:
      password: ''
      email: admin@myemail.com
      policyBundleSyncEnabled: false

      # Credentials for https://anchore.io Cloud service if you have them. Can be used to automatically sync policy bundles.
      anchoreIOCredentials:
        # If use_anonymous = False, the specific credentials are used for the feed sync and bundle sync features otherwise disregarded.
        useAnonymous: true
        user: someuser
        password: somepassword

  internalServicesSslEnabled: false
  internalServicesSslVerifyCerts: false

  # Intervals to run specific events on (seconds)
  cycleTimers:
    # Interval to check for an update to a tag
    image_watcher: 3600
    # Interval to re-run a policy eval on a tag
    policy_eval: 3600
    # Interval to run a feed sync to get latest cve data
    feed_sync: 14400
    # Interval workers check the queue
    analyzer_queue: 1
    # Interval notifications will be processed for state changes
    notifications: 30
    # Intervals service state updates are polled
    service_watcher: 15
    # Interval for policy bundle sync from anchore.io if enabled
    policy_bundle_sync: 300

  # Enable prometheus metrics
  enableMetrics: false

# Configuration for the core engine service that serves the API
# The core service handles the user facing APIs and coordination of workers as well as storage interfaces for data
coreConfig:
  # For the moment, the replica count should stay at 1. That restriction should change soon.
  replicaCount: 1
  logLevel: INFO

  # Policy bundle sync enables the engine to download a policy bundle from anchore.io if you have an account there with a custom bundle. Requires providing your login credentials in the globalConfig.users.anchoreIOCredentials section
  policyBundleSyncEnabled: false

  ssl:
    # To use certs for TLS directly from the services, create a secret with keys that match the values fo certSecretKey and certSecretCert
    certSecret: null
    certSecretKeyName: 'tls.key'
    certSecretCertName: 'tls.crt'
    certDir: '/certs'

  # Configure webhook outputs here. The service provides these webhooks for notifying external systems of updates
  webhooks:
    enabled: True
    config:
      # User and password to be set (using HTTP basic auth) on all webhook calls if necessary
      user: null
      password: null
      ssl_verify: true

      # Endpoint for general notification delivery. These events are image/tag updates etc. This is globally configured
      # and updates for all users are sent to the same host but with a different path for each user.
      general:
        {}
        # url: "http://somehost:9090/<notification_type>/<userId>"
      # Endpoint and credentials for policy evaluation delivery
      policy_eval:
        {}
        # url: "http://somehost:9090/policy_eval/<userId>"
        # user: null
        # password: null
      # Endpoint for fatal system errors to be delivery
      error_event:
        {}
        # url: 'http://somehost:9090/error_event/'
  # Event log configuration
  events:
    notification:
      enabled: true
      # Send notifications for events with severity level that matches items in this list
      level:
        - error
  #        - info
  archive:
    compression:
      enabled: true
      min_size_kbytes: 100
    storage_driver:
      # Valid storage driver names: 'db', 'localfs', 's3', 'swift'
      # It is strongly recommended to only use localfs for local testing using persisent volumes or a shared FS and generally not in a k8s deployment.
      name: db
      config: {}

      # Example S3 Configuration:
      # name: s3
      # config:
      #   # All objects are stored in a single bucket, defined here
      #   bucket: "anchore-engine-testing"
      #   # A prefix for keys in the bucket if desired (optional)
      #   prefix: "internaltest"
      #   # Create the bucket if it doesn't already exist
      #   create_bucket: False
      # Url only needed for non-AWS S3 implementations (e.g. minio). Otherwise, configure the region instead
      #   #url: "https://s3.amazonaws.com"
      #   # AWS region to connect to if 'url' not specified, if both are set, then 'url' has precedent
      #   region: us-west-2
      #   # For Auth can provide access/secret keys or use 'iamauto' which will use an instance profile or any credentials found in normal aws search paths/metadata service
      #   access_key: XXXX
      #   secret_key: YYYY
      #   iamauto: False
      # Example Minio configuration (basically same as s3 example):
      # name: s3
      # config:
      #   url: http://<minio url>:9000
      #   bucket: mybucket
      #   access_key: xxxxxx
      #   secret_key: yyyyyy
      #   create_bucket: True
      # Example Swift Configuration:
      # name: swift
      # config:
      #     # Config for swift has a few options, just add the keys and names as used to configure a swiftclient here. All are passed directly to the client impl.
      #     user: "test:tester"
      #     key: "testing"
      #     auth: "http://swift_ephemeral:8080/auth/v1.0"
      #     # The swift container where data will be stored
      #     container: "local_test_anchore"
      #     # Create the container if it is not already present
      #     create_container: False

  # resources:
  #  limits:
  #    cpu: 100m
  #    memory: 6Gi
  #  requests:
  #    cpu: 100m
  #    memory: 4Gi

  ## Node labels for pod assignment
  ## Ref: https://kubernetes.io/docs/user-guide/node-selection/
  ##
  nodeSelector: {}

  tolerations: []

  affinity: {}

# Configuration for the worker pods that perform image analysis
# There may be many of these workers but best practice is to not have more than one per node since analysis
# is very IO intensive. Use of affinity/anti-affinity rules for scheduling the workers is future work.
workerConfig:
  replicaCount: 1
  logLevel: INFO

  # The cycle timer is the interval between checks to the work queue for new jobs
  cycleTimerSeconds: 1

  # Controls the concurrency of the worker itself. Can be configured to process more than one task at a time, but it IO bound, so may not
  # necessarily be faster depending on hardware. Should test and balance this value vs. number of workers for your deployment cluster performance.
  concurrentTasksPerWorker: 1

  # The analysisVolume controls the mounting of an external volume for scratch space for image analysis. Generally speaking
  # you need to provision 3x the size of the largest image (uncompressed) that you want to analyze for this space.
  analysisScratchVolume:
    mountPath: /tmp
    details:
      emptyDir: {}

  port: 8084

  # Configuration for ssl used for internal node communications between components
  ssl:
    certDir: '/certs'
    certSecret: null
    certSecretKeyName: 'tls.key'
    certSecretCertName: 'tls.crt'

  # resources:
  #  limits:
  #    cpu: 100m
  #    memory: 3Gi
  #  requests:
  #    cpu: 100m
  #    memory: 2Gi

  ## Node labels for pod assignment
  ## Ref: https://kubernetes.io/docs/user-guide/node-selection/
  ##
  nodeSelector: {}

  tolerations: []

  affinity: {}
```

</details>

---

# Anchore Engine Helm Chart

This chart deploys the Anchore Engine docker container image analysis system. Anchore Engine
requires a PostgreSQL database (>=9.6) which may be handled by the chart or supplied externally,
and executes in a 2-tier architecture with an api/control layer and a batch execution worker pool layer.

See [Anchore Engine](https://github.com/anchore/anchore-engine) for more project details.

## tl;dr:

The chart is split into three primary sections: GlobalConfig, CoreConfig, WorkerConfig. As the name implies,
the GlobalConfig is for configuration values that all components require, while the Core and Worker sections are
tier-specific and allow customization for each role.

NOTE: It is highly recommended to set a non-default password when deploying. The admin password is set to a default in the chart. To customize it use:
`--set globalConfig.users.admin.password=<pass>` or set it in the values.yaml locally.

### Core Role

The core services provide the apis and state management for the system. Core services must be available within the cluster
for use by the workers.

- Core component provides webhook calls to external services for notifications of events:
  - New images added
  - CVE changes in images
  - Policy evaluation state change for an image

### Worker Role

The workers download and analyze images and upload results to the core services. The workers poll the queue service and
do not have their own external api.

## Installing the Chart

```bash
$ helm repo add banzaicloud-stable http://kubernetes-charts.banzaicloud.com/branch/master
$ helm repo update
```

Deploying PostgreSQL as a dependency managed in the chart:

```bash
$ helm install --name <name> banzaicloud-stable/anchore-engine
```

Using GKE Cloudsql (PostgreSQL) service:

```bash
$ helm install --name <name> --set postgresql.enabled=False --set cloudsql.enabled=True banzaicloud-stable/anchore-engine
```

## Configuration

The following tables lists the main configurable parameters of the anchore-engine chart and their default values.

| Parameter                          | Description                                | Default                            |
| ---------------------------------- | ------------------------------------------ | ---------------------------------- |
| service.type                       | service type                               | ClusterIP                          |
| service.ports.api                  | anchore-engine api port                    | 8228                               |
| image.repository                   | anchore-engine image repo                  | "docker.io/anchore/anchore-engine" |
| image.tag                          | anchore-engine image tag                   | "v0.2.3"                           |
| image.pullPolicy                   | anchore-engine image pull policy           | IfNotPresent                       |
| ingress.enable                     | enable ingress                             | false                              |
| ingress.annotations                | ingress annotations                        | {}                                 |
| ingress.hosts                      | ingress hosts definitions                  | "/"                                |
| ingress.tls                        | ingress tls                                | []                                 |
| postgresql.enabled                 | Deploy postgres pod                        | true                               |
| postgresql.externalEndpoint        | use external PostgreSQL db                 | null                               |
| postgresUser                       | postgres username                          | postgres                           |
| postgresPassword                   | postgres password                          | anchore                            |
| postgresDatabase                   | postgres database name                     | anchore                            |
| cloudsql.enable                    | use GKE cloudsql instead of local postgres | false                              |
| cloudsql.instance                  | Cloudsql instance                          | ""                                 |
| cloudsql.image.repository          | Cloudsql proxy image repo                  | gcr.io/cloudsql-docker/gce-proxy   |
| cloudsql.image.tag                 | Cloudsql proxy image tag                   | 1.11                               |
| cloudsql.image.pullPolicy          | Cloudsql proxy image pull policy           | IfNotPresent                       |
| coreConfig.policyBundleSyncEnabled | sync policy bundles from anchore.io        | false                              |
| globalConfig.enableMetrics         | export prometheus metrics                  | false                              |

## Adding Core Components

To set a specific number of core service containers:

```bash
$ helm install banzaicloud-stable/anchore-engine --set coreConfig.replicaCount=2
```

To update the number in a running configuration:

```bash
$ helm upgrade --set coreConfig.replicaCount=2 <releasename> banzaicloud-stable/anchore-engine <-f values.yaml>
```

## Adding Workers

To set a specific number of workers once the service is running:

If using defaults from the chart:

```bash
$ helm upgrade --set workerConfig.replicaCount=2 <releasename> banzaicloud-stable/anchore-engine
```

If customized values, use the local directory for the chart values:

```bash
$ helm upgrade --set workerConfig.replicaCount=2 <releasename> ./anchore-engine
```

To launch with more than one worker you can either modify values.yaml or run with:

```bash
$ helm install --set workerConfig.replicaCount=2 banzaicloud-stable/anchore-engine
```
