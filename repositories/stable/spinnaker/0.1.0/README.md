# `@helm-charts/stable-spinnaker`

A Helm chart for Kubernetes

| Field               | Value     |
| ------------------- | --------- |
| Repository Name     | stable    |
| Chart Name          | spinnaker |
| Chart Version       | 0.1.0     |
| NPM Package Version | 0.1.0     |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Define which registries and repositories you want available in your
# Spinnaker pipeline definitions
# For more info visit:
#   http://www.spinnaker.io/v1.0/docs/target-deployment-configuration#section-docker-registry
accounts:
  - name: dockerhub
    address: https://index.docker.io
    repositories:
      - library/alpine
      - library/ubuntu
      - library/centos
      - library/nginx

# Settings for notifications via email
# For more info visit:
#   http://www.spinnaker.io/docs/notifications-and-events-guide#section-email
mail:
  enabled: false
  host: smtp.example.org
  username: admin
  password: admin
  fromAddress: spinnaker@example.org
  port: 25

# Images for each component
images:
  clouddriver: quay.io/spinnaker/clouddriver:v1.489.0
  echo: quay.io/spinnaker/echo:v1.127.0
  deck: quay.io/spinnaker/deck:v2.956.0
  igor: quay.io/spinnaker/igor:v1.61.0
  orca: quay.io/spinnaker/orca:v1.302.0
  gate: quay.io/spinnaker/gate:v2.109.0
  front50: quay.io/spinnaker/front50:v1.69.0
  rosco: quay.io/spinnaker/rosco:v0.78.0

# Bucket to use when storing config data in S3 compatible storage
storageBucket: spinnaker

# Resources to provide to each of
# the Spinnaker components
resources:
  limits:
    cpu: 1000m
    memory: 1280Mi
  requests:
    cpu: 1000m
    memory: 1280Mi

# Redis password to use for the in-cluster redis service
# Redis is not exposed publically
redis:
  redisPassword: password

# Minio access/secret keys for the in-cluster S3 usage
# Minio is not exposed publically
minio:
  AccessKey: spinnakeradmin
  SecretKey: spinnakeradmin

# Configuration for the Jenkins instance that is attached to the
# igor component of Spinnaker. For more info about the Jenkins integration
# with Spinnaker, visit:
#   http://www.spinnaker.io/docs/jenkins-script-execution-stage
jenkins:
  Master:
    Name: jenkins-master
    Image: 'gcr.io/kubernetes-charts-ci/jenkins-master-k8s'
    ImageTag: 'v0.6.0'
    ImagePullPolicy: 'Always'
    Component: 'jenkins-master'
    Cpu: '500m'
    Memory: '512Mi'
    ServicePort: 8080
    ServiceType: ClusterIP
    ContainerPort: 8080
    SlaveListenerPort: 50000

  Agent:
    Image: viglesiasce/spinnaker-jenkins-agent
    ImageTag: v0.2.0
    Cpu: '500m'
    Memory: '512Mi'
```

</details>

---

# Spinnaker Chart

[Spinnaker](http://spinnaker.io/) is a resilient service mesh for cloud native apps

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
