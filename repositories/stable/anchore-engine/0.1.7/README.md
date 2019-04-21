# `@helm-charts/stable-anchore-engine`

Anchore container analysis and policy evaluation engine service

| Field               | Value          |
| ------------------- | -------------- |
| Repository Name     | stable         |
| Chart Name          | anchore-engine |
| Chart Version       | 0.1.7          |
| NPM Package Version | 0.1.0          |

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
  tag: docker.io/anchore/anchore-engine:v0.1.10
  # pullPolicy: IfNotPresent

# Used to create Ingress record (should used with service.type: ClusterIP or NodePort depending on platform)
ingress:
  enabled: false
  annotations:
    # kubernetes.io/ingress.allow-http: False
    # kubernetes.io/ingress.class: nginx
    # kubernetes.io/tls-acme: true

  # Secrets must be manually created in the namespace.
  tls:
  # - secretName: tlstestsecret

# Dependency on Postgresql, configure here
postgresql:
  enabled: true
  postgresUser: anchoreengine
  postgresPassword: anchore-postgres,123
  postgresDatabase: anchore

  # Use this config if you set enabled=False and want to specify an external (already existing) postres deployment for use.
  # Set this to the host and port. eg. mypostgres.myserver.io:5432
  externalEndpoint: Null

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
      password: foobar
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

# Configuration for the core engine service that serves the API
# The core service handles the user facing APIs and coordination of workers as well as storage interfaces for data
coreConfig:
  # For the moment, the replica count should stay at 1. That restriction should change soon.
  replicaCount: 1
  hostId: 'anchore-engine-core-host'
  logLevel: INFO
  policyBundleSyncEnabled: false

  ssl:
    # To use certs for TLS directly from the services, create a secret with keys that match the values fo certSecretKey and certSecretCert
    certSecret: null
    certSecretKeyName: 'tls.key'
    certSecretCertName: 'tls.crt'
    certDir: '/certs'

  # Configure webhook outputs here. The service provides these webhooks for notifying external systems of updates
  webhooks:
    enabled: 'True'
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

  # Analyzer driver determines how the worker performs download and extraction of images
  #
  # "nodocker" does not require docker and pulls content directly from the registry and assembles it directly. This has the side-effect
  #    of not handling images with V1 manifests as cleanly due to missing metadata in those manifests.
  #
  # "localanchore" requires the docker socket mounted into the worker container and uses docker itself to pull and extract the image into the container.
  #    this is the legacy mode.
  analyzerMode: nodocker

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

## Chart Details

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

Deploying PostgreSQL as a dependency managed in the chart:

`helm install stable/anchore-engine`

Using an existing/external PostgreSQL service:

`helm install --name <name> --set postgresql.enabled=False stable/anchore-engine`

This installs the chart in cluster-local mode. To expose the service outside the chart there are two options:

1. Use a LoadBalancer service type by setting the `service.type=LoadBalancer` in the values.yaml or on CLI
2. Use an ingress by setting `ingress.enabled=True` in the values.yaml or on CLI

## Configuration

While the configuration options of Anchore Engine are extensive, the options provided by the chart are:

### Exposing the service outside the cluster:

- Use ingress, which enables SSL termination at the LB:

  - ingress.enabled=True (may require service.type=NodePort for some K8s installations e.g. GKE)

- Use a LoadBalancer service type:
  - service.type=LoadBalancer

### Database

- External Postgres (not managed by helm)
  - postgresql.enabled=False
  - postgresql.externalEndpoint=myserver.mypostgres.com:5432
  - postgresql.postgresUser=username
  - postgresql.postgresPassword=password
  - postgresql.postgresDatabase=db name
  - globalConfig.dbConfig.ssl=True

### Policy Sync from anchore.io

anchore.io is a hosted version of anchore engine that includes a UI and policy editor. You can configure a local anchore-engine
to download and keep the policy bundles in sync (policies defining how to evaluate images).
Simply provide the credentials for your anchore.io account in the values.yaml or using `--set` on CLI to enable:

- coreConfig.policyBundleSyncEnabled=True
- globalConfig.users.admin.anchoreIOCredentials.useAnonymous=False
- globalConfig.users.admin.anchoreIOCredentials.user=username
- globalConfig.users.admin.anchoreIOCredentials.password=password

## Adding Workers

To set a specific number of workers once the service is running:

If using defaults from the chart:

`helm upgrade --set workerConfig.replicaCount=2 <releasename> stable/anchore-engine`

If customized values, use the local directory for the chart values:

`helm upgrade --set workerConfig.replicaCount=2 <releasename> ./anchore-engine`

To launch with more than one worker you can either modify values.yaml or run with:

`helm install --set workerConfig.replicaCount=2 stable/anchore-engine`
