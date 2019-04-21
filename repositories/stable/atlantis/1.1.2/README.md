# `@helm-charts/stable-atlantis`

A Helm chart for Atlantis https://www.runatlantis.io

| Field               | Value    |
| ------------------- | -------- |
| Repository Name     | stable   |
| Chart Name          | atlantis |
| Chart Version       | 1.1.2    |
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
orgWhitelist: github.com/yourorg/*
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
# gitconfig:
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
  tag: v0.4.13
  pullPolicy: IfNotPresent

## enable using atlantis.yaml file
allowRepoConfig: false

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
atlantis_data_storage: 5Gi

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

In order for Atlantis to start and run successfully, all of the following must be true:

1. At least one of the following sets of credentials must be defined:

   - `github`
   - `gitlab`
   - `bitbucket`

   Refer to [values.yaml](values.yaml) for detailed examples.

1. Supply a value for `orgWhitelist`, e.g. `github.org/my_company/*`.

## Customization

The following options are supported. See [values.yaml](values.yaml) for more detailed documentation and examples:

| Parameter                                   | Description                                                                                                                                                                                                                                                                                                                                                                                      | Default                |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------- |
| `allow_repo_config`                         | Whether to allow the use of [atlantis.yaml files](https://www.runatlantis.io/docs/atlantis-yaml-reference.html).                                                                                                                                                                                                                                                                                 | `false`                |
| `atlantis_data_storage`                     | The amount of storage available for Atlantis' data directory (mostly used to check out git repositories).                                                                                                                                                                                                                                                                                        | `5Gi`                  |
| `aws.config`                                | Contents of a file to be mounted to `~atlantis/.aws/config`.                                                                                                                                                                                                                                                                                                                                     | n/a                    |
| `aws.credentials`                           | Contents of a file to be mounted to `~atlantis/.aws/credentials`.                                                                                                                                                                                                                                                                                                                                | n/a                    |
| `bitbucket.user`                            | The name of the Atlantis Bitbucket user.,This value should not be defined if Atlantis is not working against Bitbucket repositories.                                                                                                                                                                                                                                                             | n/a                    |
| `bitbucket.token`                           | The personal access token for the Atlantis Bitbucket user.,This value should not be defined if Atlantis is not integrated with Bitbucket repositories.                                                                                                                                                                                                                                           | n/a                    |
| `bitbucket.secret`                          | Bitbucket Server only: The webhook secret for Bitbucket repositories.                                                                                                                                                                                                                                                                                                                            | n/a                    |
| `bitbucket.base_url`                        | Bitbucket Server only: The hostname of your Bitbucket Server installation.                                                                                                                                                                                                                                                                                                                       | n/a                    |
| `environment`                               | Additional environment variables for the container.                                                                                                                                                                                                                                                                                                                                              | n/a                    |
| `gitconfig`                                 | Contents of a file to be mounted to `~atlantis/.gitconfig`. Use to allow redirection for Terraform modules in private git repositories.                                                                                                                                                                                                                                                          | n/a                    |
| `github.user`                               | The name of the Atlantis GitHub user. This value should defined if Atlantis is not working against GitHub repositories.                                                                                                                                                                                                                                                                          | n/a                    |
| `github.token`                              | The personal access token for the Atlantis GitHub user.,This value should not be defined if Atlantis is not integrated with GitHub repositories.                                                                                                                                                                                                                                                 | n/a                    |
| `github.secret`                             | The repository or organization-wide secret for the Atlantis GitHub integration.,All repositories in GitHub that are to be integrated with Atlantis must share the same value.,For this reason, the Atlantis maintainers recommend an organization-scoped webhook.,This value should not be defined if Atlantis is not integrated with GitHub repositories.                                       | n/a                    |
| `github.hostname`                           | GitHub Enterprise only: The hostname of your GitHub Enterprise installation.                                                                                                                                                                                                                                                                                                                     | n/a                    |
| `gitlab.user`                               | The repository or organization-wide secret for the Atlantis GitLab,integration.,All repositories in GitHub that are to be integrated with,Atlantis must share the same value.,For this reason, the Atlantis,maintainers recommend an organization-scoped webhook.,This value should,not be defined if Atlantis is not integrated with GitLab repositories.                                       | n/a                    |
| `gitlab.token`                              | The personal access token for the Atlantis GitHub user.,This value should not be defined if Atlantis is not integrated with GitHub repositories.                                                                                                                                                                                                                                                 | n/a                    |
| `gitlab.secret`                             | The repository secret for the Atlantis GitLab integration.,All repositories in GitLab that are to be integrated with,Atlantis must share the same value.,(Unlike GitHub, GitLab does not support organization-wide integrations.)                                                                                                                                                                | n/a                    |
| `gitlab.hostname`                           | GitLab Enterprise only: The hostname of your GitLab Enterprise installation.                                                                                                                                                                                                                                                                                                                     | n/a                    |
| `podTemplate.annotations`                   | Specifies additional annotations to use for the StatefulSet                                                                                                                                                                                                                                                                                                                                      | n/a                    |
| `logLevel`                                  | The level to use for logging.                                                                                                                                                                                                                                                                                                                                                                    | n/a                    |
| `orgWhiteList`                              | A whitelist of repositories from which Atlantis will accept webhooks. **This value must be changed for Atlantis to function correctly.** Accepts wildcard characters (`*`). Multiple values may be comma-separated.                                                                                                                                                                              | `github.com/yourorg/*` |
| `serviceAccount.create`                     | Whether to create a Kubernetes ServiceAccount if no account matching `serviceAccount.name` exists.                                                                                                                                                                                                                                                                                               | `true`                 |
| `serviceAccount.name`                       | The name of the Kubernetes ServiceAccount under which Atlantis should run.<br /><br />If no value is specified and `serviceAccount.create` is `true`, Atlantis will be run under a ServiceAccount whose name is the FullName of the Helm chart's instance. <br /><br />If no value is specified and `serviceAccount.create` is `false`, Atlantis will be run under the `default` ServiceAccount. | n/a                    |
| `serviceAccountSecrets.credentials`         | JSON object representing secrets for a Google Cloud Platform production service account. Only applicable if hosting Atlantis on GKE.                                                                                                                                                                                                                                                             | n/a                    |
| `serviceAccountSecrets.credentials-staging` | JSON object representing secrets for a Google Cloud Platform staging,service account. Only applicable if hosting Atlantis on GKE.                                                                                                                                                                                                                                                                | n/a                    |
| `service.port`                              | Specifies the port of the service.                                                                                                                                                                                                                                                                                                                                                               | `80`                   |
| `service.loadBalancerSourceRanges`          | An array of whitelisted IP addresses for the Atlantis Service in Kubernetes. If no value is specified, the Service will allow incoming traffic from all IP addresses (0.0.0.0/0).                                                                                                                                                                                                                | n/a                    |
| `tlsSecretName`                             | The name of a Kubernetes Secret for Atlantis' HTTPS certificate containing the following data items `tls.crt` with the public certificate and `tls.key` with the private key.                                                                                                                                                                                                                    | n/a                    |

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
