# `@helm-charts/banzaicloud-stable-keel`

Open source, tool for automating Kubernetes deployment updates. Keel is stateless, robust and lightweight.

| Field               | Value              |
| ------------------- | ------------------ |
| Repository Name     | banzaicloud-stable |
| Chart Name          | keel               |
| Chart Version       | 0.7.2              |
| NPM Package Version | 0.1.0              |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for keel.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.

image:
  repository: keelhq/keel
  tag: 0.12.0
  pullPolicy: IfNotPresent

# Enable insecure registries
insecureRegistry: false

# Polling is enabled by default,
# you can disable it setting value below to false
polling:
  enabled: true

# Helm provider support
helmProvider:
  enabled: true
  tillerAddress: 'tiller-deploy.kube-system.svc.cluster.local:44134'

# Google Container Registry
# GCP Project ID
gcr:
  enabled: false
  projectId: ''
  pubSub:
    enabled: false

# Notification level (debug, info, success, warn, error, fatal)
notificationLevel: info

# AWS Elastic Container Registry
# https://keel.sh/v1/guide/documentation.html#Polling-with-AWS-ECR
ecr:
  enabled: false
  accessKeyId: ''
  secretAccessKey: ''
  region: ''

# Webhook Notification
# Remote webhook endpoint for notification delivery
webhook:
  enabled: false
  endpoint: ''

# Slack Notification
# bot name (default keel) must exist!
slack:
  enabled: false
  botName: ''
  token: ''
  channel: ''
  approvalsChannel: ''

# Hipchat notification and approvals
hipchat:
  enabled: false
  token: ''
  channel: ''
  approvalsChannel: ''
  botName: ''
  userName: ''
  password: ''

mattermost:
  enabled: false
  endpoint: ''

# Keel service
# Enable to receive webhooks from Docker registries
service:
  enabled: false
  type: LoadBalancer
  externalPort: 9300
  clusterIP: ''

# Webhook Relay service
# If you don’t want to expose your Keel service, you can use https://webhookrelay.com/
# which can deliver webhooks to your internal Keel service through Keel sidecar container.
webhookRelay:
  enabled: false
  bucket: ''
  # webhookrelay.com credentials
  # Set the key and secret values here to create the keel-webhookrelay secret with this
  # chart -or- leave key and secret blank and create the keel-webhookrelay secret separately.
  key: ''
  secret: ''
  # webhookrelay docker image
  image:
    repository: webhookrelay/webhookrelayd
    tag: latest
    pullPolicy: IfNotPresent

# Keel self-update
# uncomment lines below if you want Keel to automaticly
# self-update to the latest release version
keel:
  # keel policy (all/major/minor/patch/force)
  policy: all
  # trigger type, defaults to events such as pubsub, webhooks
  trigger: poll
  # polling schedule
  pollSchedule: '@every 3m'
  # images to track and update
  images:
    - repository: image.repository
      tag: image.tag

# RBAC manifests management
rbac:
  enabled: true

# Resources
resources:
  limits:
    cpu: 100m
    memory: 128Mi
  requests:
    cpu: 50m
    memory: 64Mi

# NodeSelector
nodeSelector: {}

affinity: {}

tolerations: {}

# base64 encoded json of GCP service account
# more info available here: https://cloud.google.com/kubernetes-engine/docs/tutorials/authenticating-to-cloud-platform
# e.g. --set googleApplicationCredentials=$(cat <JSON_KEY_FIEL> | base64)
googleApplicationCredentials: ''

# Enable DEBUG logging
debug: false

# This is used by the static manifest generator in order to create a static
# namespace manifest for the namespace that keel is being installed
# within. It should **not** be used if you are using Helm for deployment.
createNamespaceResource: false

podAnnotations: {}

aws:
  region: null

podDisruptionBudget:
  enabled: false
  maxUnavailable: 1
  minAvailable: null
```

</details>

---

# Keel - automated Kubernetes deployments for the rest of us

- Website [https://keel.sh](https://keel.sh)
- User Guide [https://keel.sh/user-guide/](https://keel.sh/user-guide/)

Keel is a tool for automating [Kubernetes](https://kubernetes.io/) deployment updates. Keel is stateless, robust and lightweight.

Keel provides several key features:

- **[Kubernetes](https://kubernetes.io/) and [Helm](https://helm.sh) providers** - Keel has direct integrations with Kubernetes and Helm.

- **No CLI/API** - tired of `***ctl` for everything? Keel doesn't have one. Gets job done through labels, annotations, charts.

- **Semver policies** - specify update policy for each deployment/Helm release individually.

- **Automatic [Google Container Registry](https://cloud.google.com/container-registry/) configuration** - Keel automatically sets up topic and subscriptions for your deployment images by periodically scanning your environment.

- **[Native, DockerHub and Quay webhooks](https://keel.sh/user-guide/triggers/#webhooks) support** - once webhook is received impacted deployments will be identified and updated.

- **[Polling](https://keel.sh/user-guide/#polling-deployment-example)** - when webhooks and pubsub aren't available - Keel can still be useful by checking Docker Registry for new tags (if current tag is semver) or same tag SHA digest change (ie: `latest`).

- **Notifications** - out of the box Keel has Slack and standard webhook notifications, more info [here](https://keel.sh/user-guide/#notifications)

## Installing

Docker image _polling_, _Kubernetes provider_ and _Helm provider_ support are set by default, then Kubernetes _deployments_ can be upgraded when new Docker image is available:

```console
$ helm upgrade --install keel --namespace keel keel/
```

### Setting up Helm release to be automatically updated by Keel

Add the following to your app's `values.yaml` file and do `helm upgrade ...`:

```
keel:
  # keel policy (all/major/minor/patch/force)
  policy: all
  # trigger type, defaults to events such as pubsub, webhooks
  trigger: poll
  # polling schedule
  pollSchedule: "@every 3m"
  # images to track and update
  images:
    - repository: image.repository # it must be the same names as your app's values
      tag: image.tag # it must be the same names as your app's values
```

The same can be applied with `--set` flag without using `values.yaml` file:

```console
$ helm upgrade --install whd webhookdemo --namespace keel --reuse-values \
  --set keel.policy="all",keel.trigger="poll",keel.pollSchedule="@every 3m" \
  --set keel.images[0].repository="image.repository" \
  --set keel.images[0].tag="image.tag"
```

You can read in more details about supported policies, triggers and etc in the [User Guide](https://keel.sh/user-guide/).

Also you should check the [Webhooh demo app](https://github.com/webhookrelay/webhook-demo) and it's chart to have more clear
idea how to set automatic updates.

## Uninstalling the Chart

To uninstall/delete the `keel` deployment:

```console
$ helm delete --purge keel
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists has the main configurable parameters (polling, triggers, notifications, service) of the _Keel_ chart and they apply to both Kubernetes and Helm providers:

| Parameter                      | Description                             | Default        |
| ------------------------------ | --------------------------------------- | -------------- |
| `polling.enabled`              | Docker registries polling               | `true`         |
| `helmProvider.enabled`         | Enable/disable Helm provider            | `true`         |
| `gcr.enabled`                  | Enable/disable GCR Registry             | `false`        |
| `gcr.projectID`                | GCP Project ID GCR belongs to           |                |
| `gcr.pubsub.enabled`           | Enable/disable GCP Pub/Sub trigger      | `false`        |
| `ecr.enabled`                  | Enable/disable AWS ECR Registry         | `false`        |
| `ecr.accessKeyId`              | AWS_ACCESS_KEY_ID for ECR Registry      |                |
| `ecr.secretAccessKey`          | AWS_SECRET_ACCESS_KEY for ECR Registry  |                |
| `ecr.region`                   | AWS_REGION for ECR Registry             |                |
| `webhook.enabled`              | Enable/disable Webhook Notification     | `false`        |
| `webhook.endpoint`             | Remote webhook endpoint                 |                |
| `slack.enabled`                | Enable/disable Slack Notification       | `false`        |
| `slack.token`                  | Slack token                             |                |
| `slack.channel`                | Slack channel                           |                |
| `slack.approvalsChannel`       | Slack channel for approvals             |                |
| `service.enable`               | Enable/disable Keel service             | `false`        |
| `service.type`                 | Keel service type                       | `LoadBalancer` |
| `service.externalPort`         | Keel service port                       | `9300`         |
| `webhookRelay.enabled`         | Enable/disable WebhookRelay integration | `false`        |
| `webhookRelay.key`             | WebhookRelay key                        |                |
| `webhookRelay.secret`          | WebhookRelay secret                     |                |
| `webhookRelay.bucket`          | WebhookRelay bucket                     |                |
| `rbac.enabled`                 | Enable/disable RBAC installation        | `false`        |
| `hipchat.enabled`              | Enable/disable hipchat integration      | `false`        |
| `hipchat.token`                | Hipchat token                           |                |
| `hipchat.channel`              | Hipchat channel                         |                |
| `hipchat.approvalsChannel`     | Hipchat channel for approvals           |                |
| `hipchat.botName`              | Name of the Hipchat bot                 |                |
| `hipchat.userName`             | Hipchat username in Jabber format       |                |
| `hipchat.password`             | Hipchat password for approvals user     |                |
| `googleApplicationCredentials` | GCP Service account key configurable    |                |
| `notificationLevel`            | Keel notification level                 | `info`         |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`.

Alternatively, a YAML file that specifies the values for the above parameters can be provided while installing the chart. For example,

```console
$ helm install --name keel --namespace keel -f values.yaml keel/
```

> **Tip**: You can use the default [values.yaml](values.yaml)
