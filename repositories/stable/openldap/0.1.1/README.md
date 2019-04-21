# `@helm-charts/stable-openldap`

Community developed LDAP software

| Field               | Value    |
| ------------------- | -------- |
| Repository Name     | stable   |
| Chart Name          | openldap |
| Chart Version       | 0.1.1    |
| NPM Package Version | 0.1.0    |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for openldap.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.

replicas: 1
image:
  # From repository https://github.com/osixia/docker-openldap
  repository: osixia/openldap
  tag: 1.2.0
  pullPolicy: IfNotPresent

containerName: slapd

service:
  type: ClusterIP
  ldapPort: 389
  sslLdapPort: 636

# Default configuration for openldap as environment variables. These get injected directly in the container.
# Use the env variables from https://github.com/osixia/docker-openldap#beginner-guide
env:
  LDAP_ORGANISATION: 'Example Inc.'
  LDAP_DOMAIN: 'example.org'
  LDAP_BACKEND: 'hdb'
  LDAP_TLS: 'true'
  LDAP_TLS_ENFORCE: 'false'
  LDAP_REMOVE_CONFIG_AFTER_SETUP: 'true'

# Default Passwords to use, stored as a secret. If unset, passwords are auto-generated.
# You can override these at install time with
# helm install openldap --set openldap.adminPassword=<passwd>,openldap.configPassword=<passwd>
# adminPassword: admin
# configPassword: config

# Custom openldap configuration files used to override default settings
customLdifFiles:
  # 01-default-users.ldif: |-
  # Predefine users here

## Persist data to a persitent volume
persistence:
  enabled: false
  ## database data Persistent Volume Storage Class
  ## If defined, storageClassName: <storageClass>
  ## If set to "-", storageClassName: "", which disables dynamic provisioning
  ## If undefined (the default) or set to null, no storageClassName spec is
  ##   set, choosing the default provisioner.  (gp2 on AWS, standard on
  ##   GKE, AWS & OpenStack)
  ##
  # storageClass: "-"
  accessMode: ReadWriteOnce
  size: 8Gi

resources:
  {}
  # requests:
  #   cpu: "100m"
  #   memory: "256Mi"
  # limits:
  #   cpu: "500m"
  #   memory: "512Mi"

nodeSelector: {}

tolerations: []

affinity: {}

## test container details
test:
  image:
    repository: dduportal/bats
    tag: 0.4.0
```

</details>

---

# OpenLDAP Helm Chart

## Prerequisites Details

- Kubernetes 1.8+
- PV support on the underlying infrastructure

## Chart Details

This chart will do the following:

- Instantiate an instance of OpenLDAP server

## Installing the Chart

To install the chart with the release name `my-release`:

```bash
$ helm install --name my-release stable/openldap
```

## Configuration

We use the docker images provided by https://github.com/osixia/docker-openldap. The docker image is highly configurable and well documented. Please consult to documentation for the docker image for more information.

The following table lists the configurable parameters of the openldap chart and their default values.

| Parameter                  | Description                                                                                                                               | Default             |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| `replicas`                 | How many replicas to schedule                                                                                                             | `1`                 |
| `image.repository`         | Container image repository                                                                                                                | `osixia/openldap`   |
| `image.tag`                | Container image tag                                                                                                                       | `1.1.10`            |
| `image.pullPolicy`         | Container pull policy                                                                                                                     | `IfNotPresent`      |
| `containerName`            | Name of the container in the Pod                                                                                                          | `slapd`             |
| `service.type`             | Service type                                                                                                                              | `ClusterIP`         |
| `service.ldapPort`         | External service port for LDAP                                                                                                            | `389`               |
| `service.sslLdapPort`      | External service port for SSL+LDAP                                                                                                        | `636`               |
| `env`                      | List of key value pairs as env variables to be sent to the docker image. See https://github.com/osixia/docker-openldap for available ones | `[see values.yaml]` |
| `adminPassword`            | Password for admin user. Unset to auto-generate the password                                                                              | None                |
| `configPassword`           | Password for config user. Unset to auto-generate the password                                                                             | None                |
| `customLdifFiles`          | Custom ldif files to seed the LDAP server. List of filename -> data pairs                                                                 | None                |
| `persistence.enabled`      | Whether to use PersistentVolumes or not                                                                                                   | `false`             |
| `persistence.storageClass` | Storage class for PersistentVolumes.                                                                                                      | `<unset>`           |
| `persistence.accessMode`   | Access mode for PersistentVolumes                                                                                                         | `ReadWriteOnce`     |
| `persistence.size`         | PersistentVolumeClaim storage size                                                                                                        | `8Gi`               |
| `resources`                | Container resource requests and limits in yaml                                                                                            | `{}`                |
| `test.image.repository`    | Test container image requires bats framework                                                                                              | `dduportal/bats`    |
| `test.image.tag`           | Test container tag                                                                                                                        | `0.4.0`             |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`.

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart. For example,

```bash
$ helm install --name my-release -f values.yaml stable/openldap
```

> **Tip**: You can use the default [values.yaml](values.yaml)

## Cleanup orphaned Persistent Volumes

Deleting the Deployment will not delete associated Persistent Volumes if persistence is enabled.

Do the following after deleting the chart release to clean up orphaned Persistent Volumes.

```bash
$ kubectl delete pvc -l app=${RELEASE-NAME}-openldap
```

## Testing

Helm tests are included and they confirm the first three cluster members have quorum.

```bash
helm test <RELEASE_NAME>
RUNNING: foolish-mouse-openldap-service-test-akmms
PASSED: foolish-mouse-openldap-service-test-akmms
```

It will confirm that we can do an ldapsearch with the default credentials
