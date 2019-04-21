# `@helm-charts/stable-anchore-engine`

Anchore container analysis and policy evaluation engine service

| Field               | Value          |
| ------------------- | -------------- |
| Repository Name     | stable         |
| Chart Name          | anchore-engine |
| Chart Version       | 0.12.2         |
| NPM Package Version | 0.1.0          |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for anchore_engine chart.

# Anchore engine has a dependency on Postgresql, configure here
postgresql:
  # To use an external DB or Google CloudSQL in GKE, uncomment & set 'enabled: false'
  # externalEndpoint, postgresUser, postgresPassword & postgresDatabase are required values for external postgres
  # enabled: false
  postgresUser: anchoreengine
  postgresPassword: anchore-postgres,123
  postgresDatabase: anchore

  # Specify an external (already existing) postgres deployment for use.
  # Set to the host and port. eg. mypostgres.myserver.io:5432
  externalEndpoint: Null

  # Configure size of the persitant volume used with helm managed chart.
  # This should be commented out if using an external endpoint.
  persistence:
    size: 20Gi

# Google CloudSQL support in GKE via gce-proxy
cloudsql:
  # To use CloudSQL in GKE set 'enable: true'
  enabled: false
  # set CloudSQL instance: 'project:zone:instancname'
  instance: ''
  image:
    # set repo and image tag of gce-proxy
    repository: gcr.io/cloudsql-docker/gce-proxy
    tag: 1.12
    pullPolicy: IfNotPresent

# Create an ingress resource for all external anchore engine services (API & Enterprise UI).
# By default this chart is setup to use the NGINX ingress controller which needs to be installed & configured on your cluster.
# To utilize a GCE/ALB ingress controller comment out the nginx annotations below, change ingress.class, edit path configurions as per the comments, & set API/UI services to use NodePort.
ingress:
  enabled: false
  # Uncomment the following paths for GCE/ALB ingress controller
  # apiPath: /v1/*
  # uiPath: /*
  apiPath: /v1/
  uiPath: /
  # Uncomment the following lines to bind on specific hostnames
  # apiHosts:
  #   - anchore-api.example.com
  # uiHosts:
  #   - anchore-ui.example.com
  annotations:
    # kubernetes.io/ingress.class: gce
    kubernetes.io/ingress.class: nginx
    # nginx.ingress.kubernetes.io/ssl-redirect: "false"
    # kubernetes.io/ingress.allow-http: false
    # kubernetes.io/tls-acme: true
  tls: []
  # Secrets must be manually created in the namespace.
  #  - secretName: chart-example-tls
  #    hosts:
  #      - chart-example.local

# Global configuration shared by all anchore-engine services.
anchoreGlobal:
  # Image used for all anchore engine deployments (excluding enterprise components).
  image: docker.io/anchore/anchore-engine:v0.3.3
  imagePullPolicy: IfNotPresent

  # Set extra environment variables. These will be set on all containers.
  extraEnv:
    {}
    # FOO: bar

  ###
  # Start of General Anchore Engine Configurations (populates /config/config.yaml)
  ###
  # Set where default configs are placed at startup. This must be a writable location for the pod.
  serviceDir: /anchore_service_config
  logLevel: INFO

  # If true, when a user adds an ECR registry with username = awsauto then the system will look for an instance profile to use for auth against the registry
  allowECRUseIAMRole: false

  # Enable prometheus metrics
  enableMetrics: false

  # Sets the password & email address for the default anchore-engine admin user.
  defaultAdminPassword: foobar
  defaultAdminEmail: example@email.com

  # Configure the database connection within anchore-engine & enterprise-ui. This may get split into 2 different configurations based on service utilized.
  dbConfig:
    timeout: 120
    # Use ssl, but the default postgresql config in helm's stable repo does not support ssl on server side, so this should be set for external dbs only for the time being
    ssl: false
    connectionPoolSize: 30
    connectionPoolMaxOverflow: 100

  # Enable to force all anchore-engine services to communicate internally using SSL
  internalServicesSslEnabled: false
  internalServicesSsl:
    # specify whether cert is verfied against the local certifacte bundle (allow self-signed certs if set to false)
    verifyCerts: false
    certDir: /certs
    certSecret: Null
    certSecretKeyName: tls.key
    certSecretCertName: tls.crt

  # To enable webhooks, set webhooksEnabled: true
  webhooksEnabled: false
  # Configure webhook outputs here. The service provides these webhooks for notifying external systems of updates
  webhooks:
    # User and password to be set (using HTTP basic auth) on all webhook calls if necessary
    webhook_user: Null
    webhook_password: Null
    ssl_verify: true

    # Endpoint for general notification delivery. These events are image/tag updates etc. This is globally configured
    # and updates for all users are sent to the same host but with a different path for each user.
    # <notification_type>/<userId> are required as documented at end of URI - only hostname:port should be configured.
    general:
      {}
      # url: "http://somehost:9090/<notification_type>/<userId>"

# Configuration for the analyzer pods that perform image analysis
# There may be many of these analyzers but best practice is to not have more than one per node since analysis
# is very IO intensive. Use of affinity/anti-affinity rules for scheduling the analyzers is future work.
anchoreAnalyzer:
  replicaCount: 1
  containerPort: 8084

  # Set extra environment variables. These will be set only on analyzer containers.
  extraEnv:
    {}
    # FOO: bar

  # The cycle timer is the interval between checks to the work queue for new jobs
  cycleTimers:
    image_analyzer: 5

  # Controls the concurrency of the analyzer itself. Can be configured to process more than one task at a time, but it IO bound, so may not
  # necessarily be faster depending on hardware. Should test and balance this value vs. number of analyzers for your deployment cluster performance.
  concurrentTasksPerWorker: 1

  # The analysisVolume controls the mounting of an external volume for scratch space for image analysis. Generally speaking
  # you need to provision 3x the size of the largest image (uncompressed) that you want to analyze for this space.
  scratchVolume:
    mountPath: /scratch
    details:
      # Specify volume configuration here
      emptyDir: {}

  # resources:
  #  limits:
  #    cpu: 100m
  #    memory: 8Gi
  #  requests:
  #    cpu: 100m
  #    memory: 3Gi

  annotations: {}
  nodeSelector: {}
  tolerations: []
  affinity: {}

# Pod configuration for the anchore engine api service.
anchoreApi:
  replicaCount: 1

  # Set extra environment variables. These will be set on all api containers.
  extraEnv:
    {}
    # FOO: bar

  # kubernetes service configuration for anchore external API
  service:
    type: ClusterIP
    port: 8228
    annotations: {}

  # resources:
  #  limits:
  #    cpu: 100m
  #    memory: 6Gi
  #  requests:
  #    cpu: 100m
  #    memory: 4Gi

  annotations: {}
  nodeSelector: {}
  tolerations: []
  affinity: {}

anchoreCatalog:
  replicaCount: 1

  # Set extra environment variables. These will be set on all catalog containers.
  extraEnv:
    {}
    # FOO: bar

  # Intervals to run specific events on (seconds)
  cycleTimers:
    # Interval to check for an update to a tag
    image_watcher: 3600
    # Interval to run a policy evaluation on images with the policy_eval subscription activated.
    policy_eval: 3600
    # Interval to run a vulnerability scan on images with the vuln_update subscription activated.
    vulnerability_scan: 14400
    # Interval at which the catalog looks for new work to put on the image analysis queue.
    analyzer_queue: 1
    # Interval notifications will be processed for state changes
    notifications: 30
    # Intervals service state updates are polled for the system status
    service_watcher: 15
    # Interval between checks to repo for new tags
    repo_watcher: 60

  # Event log configuration for webhooks
  events:
    notification:
      enabled: false
      # Send notifications for events with severity level that matches items in this list
      level:
        - error
        # - info

  archive:
    compression:
      enabled: true
      min_size_kbytes: 100
    storage_driver:
      # Valid storage driver names: 'db', 's3', 'swift'
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
      #   create_bucket: false
      # Url only needed for non-AWS S3 implementations (e.g. minio). Otherwise, configure the region instead
      #   #url: "https://s3.amazonaws.com"
      #   # AWS region to connect to if 'url' not specified, if both are set, then 'url' has precedent
      #   region: us-west-2
      #   # For Auth can provide access/secret keys or use 'iamauto' which will use an instance profile or any credentials found in normal aws search paths/metadata service
      #   access_key: XXXX
      #   secret_key: YYYY
      #   iamauto: false
      # Example Minio configuration (basically same as s3 example):
      # name: s3
      # config:
      #   url: http://<minio url>:9000
      #   bucket: mybucket
      #   access_key: xxxxxx
      #   secret_key: yyyyyy
      #   create_bucket: true
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
      #     create_container: false

  # kubernetes service configuration for anchore catalog api
  service:
    type: ClusterIP
    port: 8082
    annotations: {}

  # resources:
  #  limits:
  #    cpu: 100m
  #    memory: 8Gi
  #  requests:
  #    cpu: 100m
  #    memory: 3Gi

  annotations: {}
  nodeSelector: {}
  tolerations: []
  affinity: {}

# Pod configuration for the anchore engine policy service.
anchorePolicyEngine:
  replicaCount: 1

  # Set extra environment variables. These will be set on all policy engine containers.
  extraEnv:
    {}
    # FOO: bar

  # Intervals to run specific events on (seconds)
  cycleTimers:
    # Interval to run a feed sync to get latest cve data
    feed_sync: 14400
    # Interval between checks to see if there needs to be a task queued
    feed_sync_checker: 3600

  # kubernetes service configuration for anchore policy engine api
  service:
    type: ClusterIP
    port: 8087
    annotations: {}

  # resources:
  #  limits:
  #    cpu: 100m
  #    memory: 8Gi
  #  requests:
  #    cpu: 100m
  #    memory: 3Gi

  annotations: {}
  nodeSelector: {}
  tolerations: []
  affinity: {}

# Pod configuration for the anchore engine simplequeue service.
anchoreSimpleQueue:
  replicaCount: 1

  # Set extra environment variables. These will be set on all simplequeue containers.
  extraEnv:
    {}
    # FOO: bar

  # kubernetes service configuration for anchore simplequeue api
  service:
    type: ClusterIP
    port: 8083
    annotations: {}

  # resources:
  #  limits:
  #    cpu: 100m
  #    memory: 3Gi
  #  requests:
  #    cpu: 100m
  #    memory: 2Gi

  annotations: {}
  nodeSelector: {}
  tolerations: []
  affinity: {}

# This section is used for configuring anchore enterprise.
anchoreEnterpriseGlobal:
  enabled: false
  # Name of kubernetes secret containing your license.yaml file.
  # Create this secret with the following command - kubectl create secret generic anchore-license --from-file=license.yaml=<PATH TO LICENSE.YAML>
  licenseSecretName: anchore-enterprise-license

  image: docker.io/anchore/enterprise:v0.3.3
  imagePullPolicy: IfNotPresent
  # Name of the kubernetes secret containing your dockerhub creds with access to the anchore enterprise images.
  # Create this secret with the following command - kubectl create secret docker-registry anchore-dockerhub-creds --docker-server=docker.io --docker-username=<USERNAME> --docker-password=<PASSWORD> --docker-email=<EMAIL_ADDRESS>
  imagePullSecretName: anchore-enterprise-pullcreds

# Configure the second postgres database instance for the enterprise feeds service.
# Only utilized if anchoreEnterpriseFeeds.enabled: true
anchore-feeds-db:
  # To use an external DB or Google CloudSQL, uncomment & set 'enabled: false'
  # externalEndpoint, postgresUser, postgresPassword & postgresDatabase are required values for external postgres
  # enabled: false
  postgresUser: anchoreengine
  postgresPassword: anchore-postgres,123
  postgresDatabase: anchore-feeds

  # Specify an external (already existing) postgres deployment for use.
  # Set to the host and port. eg. mypostgres.myserver.io:5432
  externalEndpoint: Null

  # Configure size of the persitant volume used with helm managed chart.
  # This should be commented out if using an external endpoint.
  persistence:
    size: 20Gi

# Configure & enable the Anchore Enterprise on-prem feeds service.
anchoreEnterpriseFeeds:
  # If enabled is set to false, set anchore-feeds-db.enabled to false to ensure that helm doesn't stand up a unneccessary postgres instance.
  enabled: true

  # Set extra environment variables. These will be set on all feeds containers.
  extraEnv:
    {}
    # FOO: bar

  # Time delay in seconds between consecutive driver runs for processing data
  cycleTimers:
    driver_sync: 7200

  # Configure the database connection within anchore-engine & enterprise-ui. This may get split into 2 different configurations based on service utilized.
  dbConfig:
    timeout: 120
    # Use ssl, but the default postgresql config in helm's stable repo does not support ssl on server side, so this should be set for external dbs only for the time being
    ssl: false
    connectionPoolSize: 30
    connectionPoolMaxOverflow: 100

  # kubernetes service configuration for anchore feeds service api
  service:
    type: ClusterIP
    port: 8448
    annotations: {}

  # Staging space for holding normalized output from drivers.
  scratchVolume:
    mountPath: /scratch
    details:
      # Specify volume configuration here
      emptyDir: {}

  # resources:
  #  limits:
  #    cpu: 100m
  #    memory: 8Gi
  #  requests:
  #    cpu: 100m
  #    memory: 3Gi

  annotations: {}
  nodeSelector: {}
  tolerations: []
  affinity: {}

# Configure the Anchore Enterprise role based access control component.
# This component consists of 2 containers that run as side-cars in the anchore engine api pod.
anchoreEnterpriseRbac:
  enabled: true

  # Set extra environment variables. These will be set on all rbac containers.
  extraEnv:
    {}
    # FOO: bar

  # Kubernetes service config - annotations & serviceType configs must be set in anchoreApi
  # Due to RBAC sharing a service with the general API.
  service:
    apiPort: 8229
    authPort: 8089

  # authResources:
  #  limits:
  #    cpu: 100m
  #    memory: 8Gi
  #  requests:
  #    cpu: 100m
  #    memory: 3Gi
  # managerResources:
  #  limits:
  #    cpu: 100m
  #    memory: 8Gi
  #  requests:
  #    cpu: 100m
  #    memory: 3Gi

# Configure the Anchore Enterprise UI.
anchoreEnterpriseUi:
  # If enabled is set to false, set anchore-ui-redis.enabled to false to ensure that helm doesn't stand up a unneccessary redis instance.
  enabled: true

  # Set extra environment variables. These will be set on all UI containers.
  extraEnv:
    {}
    # FOO: bar

  # Specifies whether to trust a reverse proxy when setting secure cookies (via the `X-Forwarded-Proto` header).
  enableProxy: false
  # Specifies if SSL is enabled in the web app container.
  enableSsl: false
  # Specifies if a single set of user credentials can be used to start multiple Anchore Enterprise UI sessions; for
  # example, by multiple users across different systems, or by a single user on a single system across multiple browsers.
  #
  # When set to `false`, only one session per credential is permitted at a time, and logging in will invalidate any other
  # sessions that are using the same set of credentials. Note that setting this property to `false` does not prevent a
  # single session from being viewed within multiple *tabs* inside the same browser.
  enableSharedLogin: true

  image: docker.io/anchore/enterprise-ui:v0.3.1
  imagePullPolicy: IfNotPresent

  # kubernetes service configuration for anchore UI
  service:
    type: ClusterIP
    port: 80
    annotations: {}
    sessionAffinity: ClientIP

  # resources:
  #  limits:
  #    cpu: 100m
  #    memory: 8Gi
  #  requests:
  #    cpu: 100m
  #    memory: 3Gi

  annotations: {}
  nodeSelector: {}
  tolerations: []
  affinity: {}

# Anchore Engine Enterprise UI is dependent on redis for storing sessions
# Only utilized if 'anchoreEnterpriseUi.enabled: true'
anchore-ui-redis:
  password: anchore-redis,123
  cluster:
    enabled: false
  persistence:
    enabled: false

  # To use an external redis endpoint, uncomment to set 'enabled: false'
  # enabled: false

  # If 'enabled: false', specify an external redis endpoint -
  # eg redis://:<password>@hostname:6379
  externalEndpoint: Null
```

</details>

---

# Anchore Engine Helm Chart

This chart deploys the Anchore Engine docker container image analysis system. Anchore Engine requires a PostgreSQL database (>=9.6) which may be handled by the chart or supplied externally, and executes in a service based architecture utilizing the following Anchore Engine services: External API, Simplequeue, Catalog, Policy Engine, and Analyzer.

This chart can also be used to install the following Anchore Enterprise services: GUI, RBAC, On-prem Feeds. Enterprise services require a valid Anchore Enterprise License as well as credentials with access to the private dockerhub repository hosting the images. These are not enabled by default.

Each of these services can be scaled and configured independently.

See [Anchore Engine](https://github.com/anchore/anchore-engine) for more project details.

## Chart Details

The chart is split into global and service specific configurations for the OSS Anchore Engine, as well as global and services specific configurations for the Enterprise components.

- The `anchoreGlobal` section is for configuration values required by all Anchore Engine components.
- The `anchoreEnterpriseGlobal` section is for configuration values required by all Anchore Engine Enterprise components.
- Service specific configuration values allow customization for each individual service.

For a description of each component, view the official documentation at: [Anchore Enterprise Service Overview](https://anchore.freshdesk.com/support/solutions/articles/36000098518-enterprise-service-overview-and-architecture)

## Installing the Anchore Engine OSS Chart

TL;DR - `helm install stable/anchore-engine`

Anchore Engine will take approximately 3 minutes to bootstrap. After the initial bootstrap period, Anchore Engine will begin a vulnerability feed sync. During this time, image analysis will show zero vulnerabilities until the sync is completed. This sync can take multiple hours depending on which feeds are enabled. The following anchore-cli command is available to poll the system and report back when the engine is bootstrapped and the vulnerability feeds are all synced up. `anchore-cli system wait`

The recommended way to install the Anchore Engine Chart is with a customized values file and a custom release name. Create a new file named `anchore_values.yaml` and add all desired custom values (examples below); then run the following command:

`helm install --name <release_name> -f anchore_values.yaml stable/anchore-engine`

_Note: It is highly recommended to set non-default passwords when deploying. All passwords are set to defaults specified in the chart._

##### Install using chart managed PostgreSQL service with custom passwords.

```
## anchore_values.yaml

postgresql:
  postgresPassword: <PASSWORD>
  persistence:
    size: 50Gi

anchoreGlobal:
  defaultAdminPassword: <PASSWORD>
  defaultAdminEmail: <EMAIL>
```

#### Install using Google CloudSQL

```
## anchore_values.yaml
postgresql:
  enabled: false
  postgresPassword: <CLOUDSQL-PASSWORD>
  postgresUser: <CLOUDSQL-USER>
  postgresDatabase: <CLOUDSQL-DATABASE>

cloudsql:
  enabled: true
  instance: "project:zone:cloudsqlinstancename"
  image:
    repository: gcr.io/cloudsql-docker/gce-proxy
    tag: 1.12
    pullPolicy: IfNotPresent
```

## Upgrading to Chart version 0.12.0

Redis dependency chart major version updated to v6.1.3 - check redis chart readme for instructions for upgrade.

The ingress configuration has been consolidated to a single global section. This should make it easier to manage the ingress resource. Before performing an upgrade ensure you update your custom values file to reflect this change.

#### Chart v0.12.0 ingress config

```
ingress:
  enabled: true
  annotations:
    kubernetes.io/ingress.class: gce
  apiPath: /v1/*
  uiPath: /*
  apiHosts:
  - anchore-api.example.com
  uiHosts:
  - anchore-ui.example.com
```

## Upgrading to Chart version 0.11.0

The image map has been removed in all configuration sections in favor of individual keys. This should make configuration for tools like skaffold simpler. If using a custom values file, update your `image.repository`, `image.tag`, & `image.pullPolicy` values with `image` & `imagePullPolicy`.

#### Chart v0.11.0 image config

```
anchoreGlobal:
  image: docker.io/anchore/anchore-engine:v0.3.2
  imagePullPolicy: IfNotPresent

anchoreEnterpriseGlobal:
  image: docker.io/anchore/enterprise:v0.3.3
  imagePullPolicy: IfNotPresent

anchoreEnterpriseUI:
  image: docker.io/anchore/enterprise-ui:v0.3.1
  imagePullPolicy: IfNotPresent
```

## Upgrading to Chart version 0.10.0

Ingress resources have been changed to work natively with NGINX ingress controllers. If you're using a different ingress controller update your values.yaml file accordingly. See the **Using Ingress** configuration section for examples of NGINX & GCE ingress controller configurations.

Service configs have been moved from the anchoreGlobal section, to individual component sections in the values.yaml file. If you're upgrading from a previous install and are using custom ports or serviceTypes, be sure to update your values.yaml file accordingly.

#### Chart v0.10.0 service config

```
anchoreApi:
  service:
    type: ClusterIP
    port: 8228
```

## Upgrading to Chart version 0.9.0

Version 0.9.0 of the anchore-engine helm chart includes major changes to the architecture, values.yaml file, as well as introduced Anchore Enterprise components. Due to these changes, it is highly recommended that upgrades are handled with caution. Any custom values.yaml files will also need to be adjusted to match the new structure. Version upgrades have only been validated when upgrading from 0.2.6 -> 0.9.0.

`helm upgrade <release_name> stable/anchore-engine`

When upgrading the Chart from version 0.2.6 to version 0.9.0, it will take approximately 5 minutes for anchore-engine to upgrade the database. To ensure that the upgrade has completed, run the `anchore-cli system status` command and verify the engine & db versions match the output below.

```
Engine DB Version: 0.0.8
Engine Code Version: 0.3.0
```

## Configuration

All configurations should be appended to your custom `anchore_values.yaml` file and utilized when installing the chart. While the configuration options of Anchore Engine are extensive, the options provided by the chart are:

### Exposing the service outside the cluster:

#### Using Ingress

This configuration allows SSL termination using your chosen ingress controller.

##### NGINX Ingress Controller

```
ingress:
  enabled: true
```

##### GCE Ingress Controller

```
ingress:
  enabled: true
  annotations:
    kubernetes.io/ingress.class: gce
  apiPath: /v1/*
  uiPath: /*
  apiHosts:
    - anchore-api.example.com
  uiHosts:
    - anchore-ui.example.com

anchoreApi:
  service:
    type: NodePort

anchoreEnterpriseUi:
  service
    type: NodePort
```

##### Using Service Type

```
anchoreApi:
  service:
    type: LoadBalancer
```

### Install using an existing/external PostgreSQL instance

_Note: it is recommended to use an external Postgresql instance for production installs_

```
postgresql:
  postgresPassword: <PASSWORD>
  postgresUser: <USER>
  postgresDatabase: <DATABASE>
  enabled: false
  externalEndpoint: <HOSTNAME:5432>

anchoreGlobal:
  dbConfig:
    ssl: true
```

### Archive Driver

_Note: it is recommended to use an external archive driver for production installs._

The archive subsystem of Anchore Engine is what stores large json documents and can consume quite a lot of storage if
you analyze a lot of images. A general rule for storage provisioning is 10MB per image analyzed, so with thousands of
analyzed images, you may need many gigabytes of storage. The Archive drivers now support other backends than just postgresql,
so you can leverage external and scalable storage systems and keep the postgresql storage usage to a much lower level.

##### Configuring Compression:

The archive system has compression available to help reduce size of objects and storage consumed in exchange for slightly
slower performance and more cpu usage. There are two config values:

To toggle on/off (default is True), and set a minimum size for compression to be used (to avoid compressing things too small to be of much benefit, the default is 100):

```
anchoreCatalog:
  archive:
    compression:
      enabled=True
      min_size_kbytes=100
```

##### The supported archive drivers are:

- S3 - Any AWS s3-api compatible system (e.g. minio, scality, etc)
- OpenStack Swift
- Local FS - A local filesystem on the core pod. Does not handle sharding or replication, so generally only for testing.
- DB - the default postgresql backend

#### S3:

```
anchoreCatalog:
  archive:
    storage_driver:
      name: 's3'
      config:
        access_key: 'MY_ACCESS_KEY'
        secret_key: 'MY_SECRET_KEY'
        #iamauto: True
        url: 'https://S3-end-point.example.com'
        region: null
        bucket: 'anchorearchive'
        create_bucket: True
    compression:
    ... # Compression config here
```

#### Using Swift:

The swift configuration is basically a pass-thru to the underlying pythonswiftclient so it can take quite a few different
options depending on your swift deployment and config. The best way to configure the swift driver is by using a custom values.yaml

The Swift driver supports three authentication methods:

- Keystone V3
- Keystone V2
- Legacy (username / password)

##### Keystone V3:

```
anchoreCatalog:
  archive:
    storage_driver:
      name: swift
      config:
        auth_version: '3'
        os_username: 'myusername'
        os_password: 'mypassword'
        os_project_name: myproject
        os_project_domain_name: example.com
        os_auth_url: 'foo.example.com:8000/auth/etc'
        container: 'anchorearchive'
        # Optionally
        create_container: True
    compression:
    ... # Compression config here
```

##### Keystone V2:

```
anchoreCatalog:
  archive:
    storage_driver:
      name: swift
      config:
        auth_version: '2'
        os_username: 'myusername'
        os_password: 'mypassword'
        os_tenant_name: 'mytenant'
        os_auth_url: 'foo.example.com:8000/auth/etc'
        container: 'anchorearchive'
        # Optionally
        create_container: True
    compression:
    ... # Compression config here
```

##### Legacy username/password:

```
anchoreCatalog:
  archive:
    storage_driver:
      name: swift
      config:
        user: 'user:password'
        auth: 'http://swift.example.com:8080/auth/v1.0'
        key:  'anchore'
        container: 'anchorearchive'
        # Optionally
        create_container: True
    compression:
    ... # Compression config here
```

#### Postgresql:

This is the default archive driver and requires no additional configuration.

### Prometheus Metrics

Anchore Engine supports exporting prometheus metrics form each container. To enable metrics:

```
anchoreGlobal:
  enableMetrics: True
```

When enabled, each service provides the metrics over the existing service port so your prometheus deployment will need to
know about each pod and the ports it provides to scrape the metrics.

### Event Notifications

Anchore Engine in v0.2.3 introduces a new events subsystem that exposes system-wide events via both a REST api as well
as via webhooks. The webhooks support filtering to ensure only certain event classes result in webhook calls to help limit
the volume of calls if you desire. Events, and all webhooks, are emitted from the core components, so configuration is
done in the coreConfig.

To configure the events:

```
anchoreCatalog:
  events:
    notification:
      enabled:true
    level=error
```

### Scaling Individual Components

As of Chart version 0.9.0, all services can now be scaled-out by increasing the replica counts. The chart now supports
this configuration.

To set a specific number of service containers:

```
anchoreAnalyzer:
  replicaCount: 5

anchorePolicyEngine:
  replicaCount: 3
```

To update the number in a running configuration:

`helm upgrade --set anchoreAnalyzer.replicaCount=2 <releasename> stable/anchore-engine -f anchore_values.yaml`

## Adding Enterprise Components

The following features are available to Anchore Enterprise customers. Please contact the Anchore team for more information about getting a license for the enterprise features. [Anchore Enterprise Demo](https://anchore.com/demo/)

    * Role based access control
    * Graphical User Interface
    * On-prem feeds service
    * Snyk vulnerability data

### Enabling Enterprise Services

Enterprise services require an Anchore Enterprise license, as well as credentials with
permission to the private docker repositories that contain the enterprise images.

To use this Helm chart with the enterprise services enabled, perform these steps.

1. Create a kubernetes secret containing your license file.

   `kubectl create secret generic anchore-enterprise-license --from-file=license.yaml=<PATH/TO/LICENSE.YAML>`

1. Create a kubernetes secret containing dockerhub credentials with access to the private anchore enterprise repositories.

   `kubectl create secret docker-registry anchore-enterprise-pullcreds --docker-server=docker.io --docker-username=<DOCKERHUB_USER> --docker-password=<DOCKERHUB_PASSWORD> --docker-email=<EMAIL_ADDRESS>`

1. Install the helm chart using a custom anchore_values.yaml file (see examples below)

   `helm install --name <release_name> -f /path/to/anchore_values.yaml stable/anchore-engine`

##### Example anchore_values.yaml file for installing Anchore Enterprise

_Note: This installs with chart managed PostgreSQL & Redis databases. This is not a production ready config._

```
## anchore_values.yaml

postgresql:
  postgresPassword: <PASSWORD>
  persistence:
    size: 50Gi

anchoreGlobal:
  defaultAdminPassword: <PASSWORD>
  defaultAdminEmail: <EMAIL>
  enableMetrics: True

anchoreEnterpriseGlobal:
  enabled: True

anchore-feeds-db:
  postgresPassword: <PASSWORD>

anchore-ui-redis:
  password: <PASSWORD>
```
