# `@helm-charts/stable-satisfy`

Composer repo hosting with Satisfy

| Field               | Value   |
| ------------------- | ------- |
| Repository Name     | stable  |
| Chart Name          | satisfy |
| Chart Version       | 0.1.0   |
| NPM Package Version | 0.1.0   |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for Satisfy.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.

image:
  repository: docker.io/anapsix/satisfy
  # image.digest takes precedence:
  # i.e. if both image.tag and image.digest are present digest will be used
  # tag: v3.0.4
  digest: sha256:b590aced3074cdb1e09b4e9432fd69afccfa807e50a3ad8168960572128f4fbd
  pullPolicy: Always
  pullSecrets:
    []
    # - secret1
    # - secret2

service:
  type: ClusterIP
  port: 80

ingress:
  enabled: false
  annotations:
    {}
    # kubernetes.io/ingress.class: nginx
    # kubernetes.io/tls-acme: "true"
    # certmanager.k8s.io/cluster-issuer: self-signed
    # ingress.kubernetes.io/force-ssl-redirect: "true"
  labels:
    []
    # traffic-type: external
  hosts:
    []
    # - composer.local
  tls:
    []
    # - secretName: composer-cert
    #   hosts:
    #     - composer.local

terminationGracePeriodSeconds: 15

livenessProbe:
  enabled: true

readinessProbe:
  enabled: true

resources:
  {}
  # If you do want to specify resources, uncomment the following
  # lines, adjust them as necessary, and remove the curly braces after 'resources:'.
  # limits:
  #   cpu: 100m
  #   memory: 64Mi
  # requests:
  #   cpu: 100m
  #   memory: 64Mi

nodeSelector: {}
tolerations: []
affinity: {}

persistence:
  enabled: true
  accessMode: ReadWriteOnce
  size: 8Gi
  storageClass: ~ # set your PV storage class here
  ## A manually managed Persistent Volume and Claim
  ## Requires persistence.enabled: true
  ## If defined, PVC must be created manually before volume will be bound
  # existingClaim:

## Application settings
## For more details see Satis documentaion
## https://getcomposer.org/doc/articles/handling-private-packages-with-satis.md#setup
satisfy:
  repoName: myrepo
  homepage: http://composer.local # set it to FQDN of your ingress
  sshPrivateKey:
    ~ # set it via CLI
    # for example: `--set satisfy.sshPrivateKey="$(<~/.ssh/id_rsa)"`
```

</details>

---

# Satisfy Helm Chart

## Installing the Chart

To install the chart with the release name `my-release`:

```console
$ helm install --name my-release stable/satisfy
```

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```console
$ helm delete my-release
```

The command removes nearly all the Kubernetes components associated with the
chart and deletes the release.

## Configuration

| Parameter                       | Description                           | Default                                                                   |
| ------------------------------- | ------------------------------------- | ------------------------------------------------------------------------- |
| `image.pullPolicy`              | Image pull policy                     | `Always`                                                                  |
| `image.repository`              | Image repository                      | `docker.io/anapsix/satisfy`                                               |
| `image.tag`                     | Image tag                             | `v3.0.4`                                                                  |
| `image.digest`                  | Image digest                          | `sha256:b590aced3074cdb1e09b4e9432fd69afccfa807e50a3ad8168960572128f4fbd` |
| `image.pullSecrets`             | Specify image pull secrets            | `[]`                                                                      |
| `service.type`                  | Type of service                       | `ClusterIP`                                                               |
| `service.port`                  | Service port                          | `80`                                                                      |
| `ingress.enabled`               | Enables Ingress                       | `false`                                                                   |
| `ingress.annotations`           | Ingress annotations                   | `{}`                                                                      |
| `ingress.labels`                | Ingress labels                        | `[]`                                                                      |
| `ingress.hosts`                 | Ingress accepted hostnames            | `[]`                                                                      |
| `ingress.tls`                   | Ingress TLS configuration             | `[]`                                                                      |
| `terminationGracePeriodSeconds` | Termination grace period (in seconds) | `15`                                                                      |
| `livenessProbe.enabled`         | Enables LivenessProbe                 | `true`                                                                    |
| `readinessProbe.enabled`        | Enables readinessProbe                | `true`                                                                    |
| `affinity`                      | Node/pod affinities                   | `{}`                                                                      |
| `nodeSelector`                  | Node labels for pod assignment        | `{}`                                                                      |
| `resources`                     | Pod resource requests & limits        | `{}`                                                                      |
| `tolerations`                   | List of node taints to tolerate       | `[]`                                                                      |
| `persistence.enabled`           | Use a PVC to persist data             | `true`                                                                    |
| `persistence.existingClaim`     | Use an existing PVC to persist data   | `nil`                                                                     |
| `persistence.storageClass`      | Storage class of backing PVC          | `nil`                                                                     |
| `persistence.accessMode`        | Use volume as ReadOnly or ReadWrite   | `ReadWriteOnce`                                                           |
| `persistence.size`              | Size of data volume                   | `8Gi`                                                                     |
| `satisfy.repoName`              | Satis repository name                 | `myrepo`                                                                  |
| `satisfy.homepage`              | Satis repository URL                  | `http://composer.local`                                                   |
| `satisfy.sshPrivateKey`         | SSH Private key used with GIT repos   | `nil`                                                                     |

> When both `image.tag` and `image.digest` are present, `image.digest` will be used. See [Docker docs][1] for more details about using image digest.

FQDN to access the service should be used as `satisfy.homepage` value, whether via Ingress, or LoadBalancer-type service with DNS records matching `satisfy.homepage`, or some other method.

[## link reference ##]: :
[1]: https://docs.docker.com/engine/reference/commandline/pull/#pull-an-image-by-digest-immutable-identifier
