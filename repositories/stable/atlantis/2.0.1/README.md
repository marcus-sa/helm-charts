# `@helm-charts/stable-atlantis`

A Helm chart for Atlantis https://www.runatlantis.io

| Field               | Value    |
| ------------------- | -------- |
| Repository Name     | stable   |
| Chart Name          | atlantis |
| Chart Version       | 2.0.1    |
| NPM Package Version | 0.1.0    |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
## -------------------------- ##
# Values to override for your instance.
## -------------------------- ##

## An option to override the atlantis url,
##   if not using an ingress, set it to the external IP.
# atlantisUrl: http://10.0.0.0

# Replace this with your own repo whitelist:
orgWhitelist: <replace-me>
# logLevel: "debug"

# If using GitHub, specify like the following:
# github:
#   user: foo
#   token: bar
#   secret: baz
# GitHub Enterprise only:
#   hostname: github.your.org
# (The chart will perform the base64 encoding for you for values that are stored in secrets.)

# If using GitLab, specify like the following:
# gitlab:
#   user: foo
#   token: bar
#   secret: baz
# GitLab Enterprise only:
#   hostname: gitlab.your.org
# (The chart will perform the base64 encoding for you for values that are stored in secrets.)

# If using Bitbucket, specify like the following:
# bitbucket:
#   user: foo
#   token: bar
# Bitbucket Server only:
#   secret: baz
#   base_url: https://bitbucket.yourorganization.com
# (The chart will perform the base64 encoding for you for values that are stored in secrets.)

# When referencing Terraform modules in private repositories, it may be helpful
# (necessary?) to use redirection in a .gitconfig like so:
# gitconfig: |
# [url "https://YOUR_GH_TOKEN@github.com"]
#   insteadOf = https://github.com
# [url "https://YOUR_GH_TOKEN@github.com"]
#   insteadOf = ssh://git@github.com
# [url "https://oauth2:YOUR_GITLAB_TOKEN@gitlab.com"]
#   insteadOf = https://gitlab.com
# [url "https://oauth2:YOUR_GITLAB_TOKEN@gitlab.com"]
#   insteadOf = ssh://git@gitlab.com
# Source: https://stackoverflow.com/questions/42148841/github-clone-with-oauth-access-token

# To specify AWS credentials to be mapped to ~/.aws:
# aws:
#   credentials: |
#     [default]
#     aws_access_key_id=YOUR_ACCESS_KEY_ID
#     aws_secret_access_key=YOUR_SECRET_ACCESS_KEY
#     region=us-east-1
#   config: |
#     [profile a_role_to_assume]
#     role_arn = arn:aws:iam::123456789:role/service-role/roleToAssume
#     source_profile = default

## To be used for mounting credential files (when using google provider).
serviceAccountSecrets:
  # credentials: <json file as base64 encoded string>
  # credentials-staging: <json file as base64 encoded string>

## -------------------------- ##
# Default values for atlantis (override as needed).
## -------------------------- ##

image:
  repository: runatlantis/atlantis
  tag: v0.6.0
  pullPolicy: IfNotPresent

## Optionally specify an array of imagePullSecrets.
## Secrets must be manually created in the namespace.
## ref: https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/
##
# imagePullSecrets:
# - myRegistryKeySecretName

## enable using atlantis.yaml file
allowRepoConfig: false

# Require all pull requests be approved prior to apply.
requireApproval: false

# Require all pull requests to meet repository mergeability requirements prior to apply.
requireMergeable: false

# We only need to check every 60s since Atlantis is not a high-throughput service.
livenessProbe:
  enabled: true
  periodSeconds: 60
  initialDelaySeconds: 5
  timeoutSeconds: 5
  successThreshold: 1
  failureThreshold: 5
  scheme: HTTP
readinessProbe:
  enabled: true
  periodSeconds: 60
  initialDelaySeconds: 5
  timeoutSeconds: 5
  successThreshold: 1
  failureThreshold: 5
  scheme: HTTP

service:
  type: NodePort
  port: 80

podTemplate:
  annotations:
    {}
    # kube2iam example:
    # iam.amazonaws.com/role: role-arn

statefulSet:
  annotations: {}

ingress:
  enabled: true
  annotations:
    {}
    # kubernetes.io/ingress.class: nginx
    # kubernetes.io/tls-acme: "true"
  path: /
  host: chart-example.local
  tls: []
  #  - secretName: chart-example-tls
  #    hosts:
  #      - chart-example.local

resources:
  requests:
    memory: 1Gi
    cpu: 100m
  limits:
    memory: 1Gi
    cpu: 100m

# Disk space for Atlantis to check out repositories
dataStorage: 5Gi

replicaCount: 1

## test container details
test:
  image: lachlanevenson/k8s-kubectl
  imageTag: v1.4.8-bash

nodeSelector: {}

tolerations: []

affinity: {}

serviceAccount:
  # Specifies whether a ServiceAccount should be created
  create: true
  # The name of the ServiceAccount to use.
  # If not set and create is true, a name is generated using the fullname template
  name:
# tlsSecretName: tls
```

</details>

---

# Atlantis

[Atlantis](https://www.runatlantis.io/) is a tool for safe collaboration on [Terraform](https://www.terraform.io/) repositories.

## Introduction

This chart creates a single pod in a StatefulSet running Atlantis. Atlantis persists Terraform [plan files](https://www.terraform.io/docs/commands/plan.html) and [lock files](https://www.terraform.io/docs/state/locking.html) to disk for the duration of a Pull/Merge Request. These files are stored in a PersistentVolumeClaim to survive Pod failures.

## Prerequisites

- Kubernetes 1.9+
- PersistentVolume support

## Required Configuration

In order for Atlantis to start and run successfully:

1. At least one of the following sets of credentials must be defined:

   - `github`
   - `gitlab`
   - `bitbucket`

   Refer to [values.yaml](values.yaml) for detailed examples.

1. Supply a value for `orgWhitelist`, e.g. `github.org/myorg/*`.

## Customization

The following options are supported. See [values.yaml](values.yaml) for more detailed documentation and examples:

| Parameter                                   | Description                                                                                                                                                                                                                                                                                               | Default |
| ------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `allowRepoConfig`                           | Whether to allow the use of [atlantis.yaml files](https://www.runatlantis.io/docs/atlantis-yaml-reference.html).                                                                                                                                                                                          | `false` |
| `dataStorage`                               | Amount of storage available for Atlantis' data directory (mostly used to check out git repositories).                                                                                                                                                                                                     | `5Gi`   |
| `aws.config`                                | Contents of a file to be mounted to `~/.aws/config`.                                                                                                                                                                                                                                                      | n/a     |
| `aws.credentials`                           | Contents of a file to be mounted to `~/.aws/credentials`.                                                                                                                                                                                                                                                 | n/a     |
| `bitbucket.user`                            | Name of the Atlantis Bitbucket user.                                                                                                                                                                                                                                                                      | n/a     |
| `bitbucket.token`                           | Personal access token for the Atlantis Bitbucket user.                                                                                                                                                                                                                                                    | n/a     |
| `bitbucket.secret`                          | Webhook secret for Bitbucket repositories (Bitbucket Server only).                                                                                                                                                                                                                                        | n/a     |
| `bitbucket.baseURL`                         | Base URL of Bitbucket Server installation.                                                                                                                                                                                                                                                                | n/a     |
| `environment`                               | Map of environment variables for the container.                                                                                                                                                                                                                                                           | `{}`    |
| `imagePullSecrets`                          | List of secrets for pulling images from private registries.                                                                                                                                                                                                                                               | `[]`    |
| `gitconfig`                                 | Contents of a file to be mounted to `~/.gitconfig`. Use to allow redirection for Terraform modules in private git repositories.                                                                                                                                                                           | n/a     |
| `github.user`                               | Name of the Atlantis GitHub user.                                                                                                                                                                                                                                                                         | n/a     |
| `github.token`                              | Personal access token for the Atlantis GitHub user.                                                                                                                                                                                                                                                       | n/a     |
| `github.secret`                             | Repository or organization-wide webhook secret for the Atlantis GitHub integration. All repositories in GitHub that are to be integrated with Atlantis must share the same value.                                                                                                                         | n/a     |
| `github.hostname`                           | Hostname of your GitHub Enterprise installation.                                                                                                                                                                                                                                                          | n/a     |
| `gitlab.user`                               | Repository or organization-wide secret for the Atlantis GitLab,integration. All repositories in GitLab that are to be integrated with Atlantis must share the same value.                                                                                                                                 | n/a     |
| `gitlab.token`                              | Personal access token for the Atlantis GitLab user.                                                                                                                                                                                                                                                       | n/a     |
| `gitlab.secret`                             | Webhook secret for the Atlantis GitLab integration. All repositories in GitLab that are to be integrated with Atlantis must share the same value.                                                                                                                                                         | n/a     |
| `gitlab.hostname`                           | Hostname of your GitLab Enterprise installation.                                                                                                                                                                                                                                                          | n/a     |
| `podTemplate.annotations`                   | Additional annotations to use for the StatefulSet.                                                                                                                                                                                                                                                        | n/a     |
| `logLevel`                                  | Level to use for logging. Either debug, info, warn, or error.                                                                                                                                                                                                                                             | n/a     |
| `orgWhiteList`                              | Whitelist of repositories from which Atlantis will accept webhooks. **This value must be set for Atlantis to function correctly.** Accepts wildcard characters (`*`). Multiple values may be comma-separated.                                                                                             | none    |
| `requireApproval`                           | Whether to require pull request approval prior to applies. See [Approved Requirement](https://www.runatlantis.io/docs/apply-requirements.html#approved).                                                                                                                                                  | `false` |
| `requireMergeable`                          | Whether to require pull request to be mergeable prior to applies. See [Mergeable Requirement](https://www.runatlantis.io/docs/apply-requirements.html#mergeable).                                                                                                                                         | `false` |
| `serviceAccount.create`                     | Whether to create a Kubernetes ServiceAccount if no account matching `serviceAccount.name` exists.                                                                                                                                                                                                        | `true`  |
| `serviceAccount.name`                       | Name of the Kubernetes ServiceAccount under which Atlantis should run. If no value is specified and `serviceAccount.create` is `true`, Atlantis will be run under a ServiceAccount whose name is the FullName of the Helm chart's instance, else Atlantis will be run under the `default` ServiceAccount. | n/a     |
| `serviceAccountSecrets.credentials`         | JSON string representing secrets for a Google Cloud Platform production service account. Only applicable if hosting Atlantis on GKE.                                                                                                                                                                      | n/a     |
| `serviceAccountSecrets.credentials-staging` | JSON string representing secrets for a Google Cloud Platform staging service account. Only applicable if hosting Atlantis on GKE.                                                                                                                                                                         | n/a     |
| `service.port`                              | Port of the `Service`.                                                                                                                                                                                                                                                                                    | `80`    |
| `service.loadBalancerSourceRanges`          | Array of whitelisted IP addresses for the Atlantis Service. If no value is specified, the Service will allow incoming traffic from all IP addresses (0.0.0.0/0).                                                                                                                                          | n/a     |
| `storageClassName`                          | Storage class of the volume mounted for the Atlantis data directory.                                                                                                                                                                                                                                      | n/a     |
| `tlsSecretName`                             | Name of a Secret for Atlantis' HTTPS certificate containing the following data items `tls.crt` with the public certificate and `tls.key` with the private key.                                                                                                                                            | n/a     |

## Upgrading

### From 1._ to 2._

- The following value names have changed:
  - `allow_repo_config` => `allowRepoConfig`
  - `atlantis_data_storage` => `dataStorage` **NOTE: more than just a snake_case change**
  - `atlantis_data_storageClass` => `storageClassName` **NOTE: more than just a snake_case change**
  - `bitbucket.base_url` => `bitbucket.baseURL`

## Testing the Deployment

To perform a smoke test of the deployment (i.e. ensure that the Atlantis UI is up and running):

1. Install the chart. Supply your own values file or use `test-values.yaml`, which has a minimal set of values required in order for Atlantis to start.

   ```bash
   helm install -f test-values.yaml --name my-atlantis stable/atlantis --debug
   ```

1. Run the tests:
   ```bash
   helm test my-atlantis
   ```
