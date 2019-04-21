# `@helm-charts/stable-spinnaker`

Open source, multi-cloud continuous delivery platform for releasing software changes with high velocity and confidence.

| Field               | Value     |
| ------------------- | --------- |
| Repository Name     | stable    |
| Chart Name          | spinnaker |
| Chart Version       | 0.3.15    |
| NPM Package Version | 0.1.0     |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Define which registries and repositories you want available in your
# Spinnaker pipeline definitions
# For more info visit:
#   https://www.spinnaker.io/setup/providers/docker-registry/

# Configure your Docker registries here
accounts:
  - name: dockerhub
    address: https://index.docker.io
    repositories:
      - library/alpine
      - library/ubuntu
      - library/centos
      - library/nginx
# - name: gcr
#   address: https://gcr.io
#   username: _json_key
#   password: '<INSERT YOUR SERVICE ACCOUNT JSON HERE>'
#   email: 1234@5678.com

# Settings for notifications via email
# For more info visit:
#   https://www.spinnaker.io/setup/features/notifications/#email
mail:
  enabled: false
  host: smtp.example.org
  username: admin
  password: admin
  fromAddress: spinnaker@example.org
  port: 25

slack:
  enabled: false
  token:
  botName: 'spinnakerbot'

# Images for each component
images:
  clouddriver: gcr.io/spinnaker-marketplace/clouddriver:0.5.0-72
  echo: gcr.io/spinnaker-marketplace/echo:0.4.0-72
  deck: gcr.io/spinnaker-marketplace/deck:1.3.0-72
  igor: gcr.io/spinnaker-marketplace/igor:0.4.0-72
  orca: gcr.io/spinnaker-marketplace/orca:0.5.0-72
  gate: gcr.io/spinnaker-marketplace/gate:0.5.0-72
  front50: gcr.io/spinnaker-marketplace/front50:0.4.1-72
  rosco: gcr.io/spinnaker-marketplace/rosco:0.4.0-72

# Change this if youd like to expose Spinnaker outside the cluster
deck:
  host: localhost
  port: 9000
  protocol: http
  ingress:
    enabled: false
    # annotations:
    # ingress.kubernetes.io/ssl-redirect: 'true'
    # kubernetes.io/ingress.class: nginx
    # kubernetes.io/tls-acme: "true"
    # tls:
    #  - secretName: -tls
    #    hosts:
    #      - domain.com

gate:
  allowedOriginsPattern: '^https?://(?:localhost|127.0.0.1|[^/]+\.example\.com)(?::[1-9]\d*)?/?$'

# Bucket to use when storing config data in S3 compatible storage
storageBucket: spinnaker

# Change service type for UI service
serviceType: ClusterIP

# Resources to provide to each of
# the Spinnaker components
resources:
  limits:
    cpu: 1000m
    memory: 1280Mi
  requests:
    cpu: 1000m
    memory: 1280Mi

# Node labels for pod assignment
# Ref: https://kubernetes.io/docs/user-guide/node-selection/
# nodeSelector to provide to each of the Spinnaker components
nodeSelector: {}

# Redis password to use for the in-cluster redis service
# Redis is not exposed publically
redis:
  redisPassword: password
  nodeSelector: {}

# Minio access/secret keys for the in-cluster S3 usage
# Minio is not exposed publically
minio:
  enabled: true
  imageTag: RELEASE.2016-11-26T02-23-47Z
  serviceType: ClusterIP
  accessKey: spinnakeradmin
  secretKey: spinnakeradmin
  nodeSelector: {}

gcs:
  enabled: false
  project: my-project-name
  jsonKey: '<INSERT CLOUD STORAGE JSON HERE>'

# Configuration for the Jenkins instance that is attached to the
# igor component of Spinnaker. For more info about the Jenkins integration
# with Spinnaker, visit:
#   https://www.spinnaker.io/setup/ci/jenkins/
jenkins:
  enabled: true
  Master:
    Cpu: '500m'
    Memory: '512Mi'
    ServiceType: ClusterIP
    CustomConfigMap: true
    NodeSelector: {}

  Agent:
    Cpu: '500m'
    Memory: '512Mi'
    NodeSelector: {}
```

</details>

---

# Spinnaker Chart

[Spinnaker](http://spinnaker.io/) is an open source, multi-cloud continuous delivery platform.

## Chart Details

This chart will provision a fully functional and fully featured Spinnaker installation
that can deploy and manage applications in the cluster that it is deployed to.

Redis and Minio are used as the stores for Spinnaker state.

For more information on Spinnaker and its capabilities, see it's [documentation](http://www.spinnaker.io/docs).

## Installing the Chart

To install the chart with the release name `my-release`:

```bash
$ helm install --name my-release stable/spinnaker
```

Note that this chart pulls in many different Docker images so can take a while to fully install.

## Configuration

Configurable values are documented in the `values.yaml`.

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`.

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart. For example,

```bash
$ helm install --name my-release -f values.yaml stable/spinnaker
```

> **Tip**: You can use the default [values.yaml](values.yaml)
