# `@helm-charts/stable-artifactory`

Universal Repository Manager supporting all major packaging formats, build tools and CI servers.

| Field               | Value       |
| ------------------- | ----------- |
| Repository Name     | stable      |
| Chart Name          | artifactory |
| Chart Version       | 6.2.0       |
| NPM Package Version | 0.1.0       |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for artifactory.
# This is a YAML-formatted file.

# Beware when changing values here. You should know what you are doing!
# Access the values with {{ .Values.key.subkey }}

# Common
initContainerImage: 'busybox:1.26.2'

# Database
database:
  name: postgresql
  replicaCount: 1
  env:
    type: postgresql
    name: artifactory
    user: artifactory
  #    pass: artXifactory1973
  image:
    repository: docker.bintray.io/postgres
    version: 9.5.2
    pullPolicy: IfNotPresent
  service:
    type: ClusterIP
  externalPort: 5432
  internalPort: 5432
  persistence:
    mountPath: '/var/lib/postgresql/data'
    enabled: true
    accessMode: ReadWriteOnce
    size: 10Gi
    ## database data Persistent Volume Storage Class
    ## If defined, storageClassName: <storageClass>
    ## If set to "-", storageClassName: "", which disables dynamic provisioning
    ## If undefined (the default) or set to null, no storageClassName spec is
    ##   set, choosing the default provisioner.  (gp2 on AWS, standard on
    ##   GKE, AWS & OpenStack)
    ##
    # storageClass: "-"

# Artifactory
artifactory:
  name: artifactory
  replicaCount: 1
  image:
    # repository: "docker.bintray.io/jfrog/artifactory-oss"
    repository: 'docker.bintray.io/jfrog/artifactory-pro'
    version: 5.5.2
    pullPolicy: IfNotPresent
  service:
    type: ClusterIP
  externalPort: 8081
  internalPort: 8081
  persistence:
    mountPath: '/var/opt/jfrog/artifactory'
    enabled: true
    accessMode: ReadWriteOnce
    size: 20Gi
    ## artifactory data Persistent Volume Storage Class
    ## If defined, storageClassName: <storageClass>
    ## If set to "-", storageClassName: "", which disables dynamic provisioning
    ## If undefined (the default) or set to null, no storageClassName spec is
    ##   set, choosing the default provisioner.  (gp2 on AWS, standard on
    ##   GKE, AWS & OpenStack)
    ##
    # storageClass: "-"

# Nginx
nginx:
  name: nginx
  replicaCount: 1
  image:
    repository: 'docker.bintray.io/jfrog/nginx-artifactory-pro'
    version: 5.5.2
    pullPolicy: IfNotPresent
  service:
    ## For minikube, set this to NodePort, elsewhere use LoadBalancer
    type: LoadBalancer
  externalPortHttp: 80
  internalPortHttp: 80
  externalPortHttps: 443
  internalPortHttps: 443
  env:
    artUrl: 'http://artifactory:8081/artifactory'
    ssl: true
  persistence:
    mountPath: '/var/opt/jfrog/nginx'
    enabled: true
    accessMode: ReadWriteOnce
    size: 5Gi
    ## nginx data Persistent Volume Storage Class
    ## If defined, storageClassName: <storageClass>
    ## If set to "-", storageClassName: "", which disables dynamic provisioning
    ## If undefined (the default) or set to null, no storageClassName spec is
    ##   set, choosing the default provisioner.  (gp2 on AWS, standard on
    ##   GKE, AWS & OpenStack)
    ##
    # storageClass: "-"
```

</details>

---

# JFrog Artifactory Helm Chart

## Prerequisites Details

- Kubernetes 1.6+
- Artifactory Pro trial license [get one from here](https://www.jfrog.com/artifactory/free-trial/)

## Chart Details

This chart will do the following:

- Deploy Artifactory-Oss
- Deploy Artifactory-Pro

## Installing the Chart

To install the chart with the release name `artifactory`:

```bash
$ helm install --name artifactory stable/artifactory
```

### Deploying Artifactory OSS

By default it will run Artifactory-Pro to run Artifactory-Oss use following command:

```bash
$ helm install --name artifactory --set artifactory.image.repository=docker.bintray.io/jfrog/artifactory-oss stable/artifactory
```

### Accessing Artifactory

**NOTE:** It might take a few minutes for Artifactory's public IP to become available.
Follow the instructions outputted by the install command to get the Artifactory IP to access it.

### Updating Artifactory

Once you have a new chart version, you can update your deployment with

```bash
$ helm upgrade artifactory --namespace artifactory stable/artifactory
```

This will apply any configuration changes on your existing deployment.

### Customizing Database password

You can override the specified database password (set in [values.yaml](values.yaml)), by passing it as a parameter in the install command line

```bash
$ helm install --name artifactory --namespace artifactory --set database.env.pass=12_hX34qwerQ2 stable/artifactory
```

You can customise other parameters in the same way, by passing them on `helm install` command line.

### Deleting Artifactory

```bash
$ helm delete --purge artifactory
```

This will completely delete your Artifactory Pro deployment.  
**IMPORTANT:** This will also delete your data volumes. You will loose all data!

## Configuration

The following tables lists the configurable parameters of the artifactory chart and their default values.

| Parameter                            | Description                                | Default                                         |
| ------------------------------------ | ------------------------------------------ | ----------------------------------------------- |
| `database.name`                      | Database name                              | `postgresql`                                    |
| `database.replicaCount`              | Database replica count                     | `1`                                             |
| `database.env.type`                  | Database type                              | `postgresql`                                    |
| `database.env.name`                  | Database name                              | `artifactory`                                   |
| `database.env.user`                  | Database username                          | `artifactory`                                   |
| `database.env.pass`                  | Database password                          | `Randomly generated`                            |
| `database.image.repository`          | Database container image                   | `docker.bintray.io/postgres`                    |
| `database.image.version`             | Database container image tag               | `9.5.2`                                         |
| `database.image.pullPolicy`          | Container pull policy                      | `IfNotPresent`                                  |
| `database.service.type`              | Database service type                      | `ClusterIP`                                     |
| `database.externalPort`              | Database service external port             | `5432`                                          |
| `database.internalPort`              | Database service internal port             | `5432`                                          |
| `database.persistence.mountPath`     | Database persistence volume mount path     | `"/var/lib/postgresql/data"`                    |
| `database.persistence.enabled`       | Database persistence volume enabled        | `true`                                          |
| `database.persistence.accessMode`    | Database persistence volume access mode    | `ReadWriteOnce`                                 |
| `database.persistence.size`          | Database persistence volume size           | `10Gi`                                          |
| `artifactory.name`                   | Artifactory name                           | `artifactory`                                   |
| `artifactory.replicaCount`           | Replica count for Artifactory deployment   | `1`                                             |
| `artifactory.image.pullPolicy`       | Container pull policy                      | `IfNotPresent`                                  |
| `artifactory.image.repository`       | Container image                            | `docker.bintray.io/jfrog/artifactory-pro`       |
| `artifactory.image.version`          | Container image tag                        | `5.5.2`                                         |
| `artifactory.service.type`           | Artifactory service type                   | `ClusterIP`                                     |
| `artifactory.externalPort`           | Artifactory service external port          | `8081`                                          |
| `artifactory.internalPort`           | Artifactory service internal port          | `8081`                                          |
| `artifactory.persistence.mountPath`  | Artifactory persistence volume mount path  | `"/var/opt/jfrog/artifactory"`                  |
| `artifactory.persistence.enabled`    | Artifactory persistence volume enabled     | `true`                                          |
| `artifactory.persistence.accessMode` | Artifactory persistence volume access mode | `ReadWriteOnce`                                 |
| `artifactory.persistence.size`       | Artifactory persistence volume size        | `20Gi`                                          |
| `nginx.name`                         | Nginx name                                 | `nginx`                                         |
| `nginx.replicaCount`                 | Nginx replica count                        | `1`                                             |
| `nginx.image.repository`             | Container image                            | `docker.bintray.io/jfrog/nginx-artifactory-pro` |
| `nginx.image.pullPolicy`             | Container pull policy                      | `IfNotPresent`                                  |
| `nginx.image.version`                | Container image tag                        | `5.5.2`                                         |
| `nginx.service.type`                 | Nginx service type                         | `LoadBalancer`                                  |
| `nginx.externalPortHttp`             | Nginx service external port                | `80`                                            |
| `nginx.internalPortHttp`             | Nginx service internal port                | `80`                                            |
| `nginx.externalPortHttps`            | Nginx service external port                | `443`                                           |
| `nginx.internalPortHttps`            | Nginx service internal port                | `443`                                           |
| `nginx.env.artUrl`                   | Nginx Environment variable Artifactory URL | `"http://artifactory:8081/artifactory"`         |
| `nginx.env.ssl`                      | Nginx Environment enable ssl               | `true`                                          |
| `nginx.persistence.mountPath`        | Nginx persistence volume mount path        | `"/var/opt/jfrog/nginx"`                        |
| `nginx.persistence.enabled`          | Nginx persistence volume enabled           | `true`                                          |
| `nginx.persistence.accessMode`       | Nginx persistence volume access mode       | `ReadWriteOnce`                                 |
| `nginx.persistence.size`             | Nginx persistence volume size              | `5Gi`                                           |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`.

## Useful links

https://www.jfrog.com
https://www.jfrog.com/confluence/
