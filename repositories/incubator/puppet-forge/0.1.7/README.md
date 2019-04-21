# `@helm-charts/incubator-puppet-forge`

Distribute locally developed Puppet modules and proxy to the official Puppet Forge server

| Field               | Value        |
| ------------------- | ------------ |
| Repository Name     | incubator    |
| Chart Name          | puppet-forge |
| Chart Version       | 0.1.7        |
| NPM Package Version | 0.1.0        |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for puppet_forge.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.
replicaCount: 1
image:
  repository: hickey/puppet_forge
  tag: 1.10.0
  pullPolicy: IfNotPresent
service:
  name: puppet-forge
  type: NodePort
  externalPort: 80
  internalPort: 8080
ingress:
  # Used to create an Ingress record.
  enabled: true
  hosts:
    # Array of host rules
    # - name: HOSTNAME
    #   path: URL_PATH
  annotations:
    # kubernetes.io/ingress.class: nginx
    # kubernetes.io/tls-acme: "true"
  tls:
    # Secrets must be manually created in the namespace.
    # - secretName: chart-example-tls
    #   hosts:
    #     - chart-example.local
resources:
  requests:
    cpu: 100m
    memory: 16Mi
  limits:
    cpu: 200m
    memory: 32Mi

persistence:
  enabled: true
  size: 8Gi
  ## A manually managed Persistent Volume and Claim
  ## Requires Persistence.Enabled: true
  ## If defined, PVC must be created manually before volume will be bound
  # ExistingClaim:
  ## jenkins data Persistent Volume Storage Class
  ## If defined, storageClassName: <storageClass>
  ## If set to "-", storageClassName: "", which disables dynamic provisioning
  ## If undefined (the default) or set to null, no storageClassName spec is
  ##   set, choosing the default provisioner.  (gp2 on AWS, standard on
  ##   GKE, AWS & OpenStack)
  ##
  # storageclass: "-"

puppet_forge:
  url: 'https://forgeapi.puppetlabs.com/'
  cache:
    ttl: '1800'
    size: '250'
  module_dir:
    - /puppet/modules
```

</details>

---

## Helm Chart: puppet-forge

Distribute locally developed Puppet modules and proxy to the official Puppet Forge server.

Container for running the puppet_forge_server project from Github. This
project allow one to serve locally developed Puppet forge modules and
proxy requests to an upstream Puppet forge server (typically the official
server run by Puppetlabs).

## How to use this container

The container when invoked with no arguments will start the Puppet forge
server at port 8080 with local Puppet forge modules locate in /puppet/modules.
If a volume mount is not specified to /puppet/modules, then all modules are
kept within the container and will the modules will be purged upon restarting
the container. In addition, the log files for the service are kept in
/puppet/logs.

The minimal command line to start the service is

```
docker run -d -p 8080:8080 puppet_forge
```

If any arguments are provided after the container name and begin with a dash,
then the arguments are provided as arguments to the Puppet forge server.
Otherwise the arguments are executed as a command within the context of the
container.

In addition there are a couple of meta-commands that the container will
respond to. If readme, info, or help (all case insensitive) are specified
as the first argument, then this README file will be displayed. Also if
the argument is version, then the current Puppet forge server version is
printed.

## Configuration

Configuration of the Puppet forge container is controlled through a number
of environmental variables. This is normally done with the -e argument to
Docker.

| Variable                      | Default Value   | Notes                           |
| ----------------------------- | --------------- | ------------------------------- |
| PUPPET_FORGE_PROXY="URL"      | None            | Enable proxy mode to URL        |
| PUPPET_FORGE_CACHE_TTL="SECS" | 1800            | Specify cache timeout in secs   |
| PUPPET_FORGE_CACHE_SIZE="NUM" | 250             | Number of cache entries to keep |
| PUPPET_FORGE_MODULE_DIR="DIR" | /puppet/modules | Local module storage            |

Multiple directories can be specified for the module directory by setting the
value of the variable the list of directories with a colon (':') as the
delimiter. This can be useful if one has multiple module repositories that
allow module promotion. The server does not provide any access control for
multiple repositories and needs to be controlled through the Puppetfile.
