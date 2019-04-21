# `@helm-charts/stable-external-dns`

Configure external DNS servers (AWS Route53, Google CloudDNS and others) for Kubernetes Ingresses and Services

| Field               | Value        |
| ------------------- | ------------ |
| Repository Name     | stable       |
| Chart Name          | external-dns |
| Chart Version       | 0.1.0        |
| NPM Package Version | 0.1.0        |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
## Details about the image to be pulled.
image:
  name: registry.opensource.zalan.do/teapot/external-dns
  tag: v0.4.2
  pullPolicy: IfNotPresent

## This controls which types of resource external-dns should 'watch' for new
## DNS entries.
sources:
  - service
  - ingress

## The DNS provider where the DNS records will be created (options: aws, google, inmemory, azure )
provider: aws

## Limit possible target zones by domain suffixes (optional)
domainFilters: []

## Modify how DNS records are sychronized between sources and providers (options: sync, upsert-only )
policy: upsert-only

## Annotations to be added to pods
##
podAnnotations: {}

extraArgs: {}

## CPU and Memory limit and request for external-dns
resources: {}
#  limits:
#    memory: 50Mi
#  requests:
#    memory: 50Mi
#    cpu: 10m

rbac:
  ## If true, create & use RBAC resources
  ##
  create: false

  ## Ignored if rbac.create is true
  ##
  serviceAccountName: default
```

</details>

---

# external-dns

## Chart Details

This chart will do the following:

- Create a deployment of [external-dns] within your Kubernetes Cluster.

Currently this uses the [Zalando] hosted container, if this is a concern follow the steps in the [external-dns] documentation to compile the binary and make a container. Where the chart pulls the image from is fully configurable.

## Notes

You probably want to make sure the nodes have IAM permissions to modify the R53 entries. More on this later.

## Installing the Chart

To install the chart with the release name `my-release`:

```bash
$ helm install --name my-release stable/external-dns
```

## Configuration

The following tables lists the configurable parameters of the external-dns chart and their default values.

| Parameter                 | Description                                                                                                                | Default                                            |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| `domainFilters`           | Limit possible target zones by domain suffixes (optional).                                                                 | `[]`                                               |
| `extraArgs`               | Optional object of extra args, as `name`: `value` pairs. Where the name is the command line arg to external-dns.           | `{}`                                               |
| `image.name`              | Container image name (Including repository name if not `hub.docker.com`).                                                  | `registry.opensource.zalan.do/teapot/external-dns` |
| `image.pullPolicy`        | Container pull policy.                                                                                                     | `IfNotPresent`                                     |
| `image.tag`               | Container image tag.                                                                                                       | `v0.4.2`                                           |
| `podAnnotations`          | Additional annotations to apply to the pod.                                                                                | `{}`                                               |
| `policy`                  | Modify how DNS records are sychronized between sources and providers (options: sync, upsert-only ).                        | `upsert-only`                                      |
| `provider`                | The DNS provider where the DNS records will be created (options: aws, google, azure, cloudflare, digitalocean, inmemory ). | `aws`                                              |
| `rbac.create`             | If true, create & use RBAC resources                                                                                       | `false`                                            |
| `rbac.serviceAccountName` | existing ServiceAccount to use (ignored if rbac.create=true)                                                               | `default`                                          |
| `resources`               | CPU/Memory resource requests/limits.                                                                                       | `{}`                                               |
| `sources`                 | List of resource types to monitor, possible values are fake, service or ingress.                                           | `[service, ingress]`                               |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`.

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart. For example,

```bash
$ helm install --name my-release -f values.yaml stable/external-dns
```

> **Tip**: You can use the default [values.yaml](values.yaml)

[external-dns]: https://github.com/kubernetes-incubator/external-dns
[zalando]: https://zalando.github.io/
[getting-started]: https://github.com/kubernetes-incubator/external-dns/blob/master/README.md#getting-started
