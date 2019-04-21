# `@helm-charts/jfrog-artifactory`

Universal Repository Manager supporting all major packaging formats, build tools and CI servers.

| Field               | Value       |
| ------------------- | ----------- |
| Repository Name     | jfrog       |
| Chart Name          | artifactory |
| Chart Version       | 7.8.4       |
| NPM Package Version | 0.1.0       |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for artifactory.
# This is a YAML-formatted file.

# Beware when changing values here. You should know what you are doing!
# Access the values with {{ .Values.key.subkey }}

# Common
initContainerImage: 'alpine:3.6'

# For supporting pulling from private registries
imagePullSecrets:

## Role Based Access Control
## Ref: https://kubernetes.io/docs/admin/authorization/rbac/
rbac:
  create: true
  role:
    ## Rules to create. It follows the role specification
    rules:
      - apiGroups:
          - ''
        resources:
          - services
          - endpoints
          - pods
        verbs:
          - get
          - watch
          - list

## Service Account
## Ref: https://kubernetes.io/docs/admin/service-accounts-admin/
##
serviceAccount:
  create: true
  ## The name of the ServiceAccount to use.
  ## If not set and create is true, a name is generated using the fullname template
  name:

ingress:
  enabled: false
  defaultBackend:
    enabled: true
  # Used to create an Ingress record.
  hosts:
    - artifactory.domain.example
  annotations:
  # kubernetes.io/ingress.class: nginx
  # kubernetes.io/tls-acme: "true"
  tls:
  # Secrets must be manually created in the namespace.
  # - secretName: chart-example-tls
  #   hosts:
  #     - artifactory.domain.example

# Artifactory
artifactory:
  name: artifactory
  image:
    # repository: "docker.bintray.io/jfrog/artifactory-oss"
    repository: 'docker.bintray.io/jfrog/artifactory-pro'
    # Note that by default we use appVersion to get image tag
    # version:
    pullPolicy: IfNotPresent

  ## Artifactory license secret.
  ## If artifactory.license.secret is passed, it will be mounted as
  ## ARTIFACTORY_HOME/etc/artifactory.lic and loaded at run time.
  ## The dataKey should be the name of the secret data key created.
  license:
    secret:
    dataKey:
  ## Create configMap with artifactory.config.import.xml and security.import.xml and pass name of configMap in following parameter
  configMapName:
  masterKey: FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF
  ## Alternatively, you can use a pre-existing secret with a key called master-key by specifying masterKeySecretName
  # masterKeySecretName:

  ## Extra pre-start command to install JDBC driver for MySql/MariaDb/Oracle
  # preStartCommand: "curl -L -o /opt/jfrog/artifactory/tomcat/lib/mysql-connector-java-5.1.41.jar https://jcenter.bintray.com/mysql/mysql-connector-java/5.1.41/mysql-connector-java-5.1.41.jar"
  ## Extra post-start command to run extra commands after container starts
  # postStartCommand:

  ## Extra environment variables that can be used to tune Artifactory to your needs.
  ## Uncomment and set value as needed
  extraEnvironmentVariables:
  # - name: SERVER_XML_ARTIFACTORY_PORT
  #   value: "8081"
  # - name: SERVER_XML_ARTIFACTORY_MAX_THREADS
  #   value: "200"
  # - name: SERVER_XML_ACCESS_MAX_THREADS
  #   value: "50"
  # - name: SERVER_XML_ARTIFACTORY_EXTRA_CONFIG
  #   value: ""
  # - name: SERVER_XML_ACCESS_EXTRA_CONFIG
  #   value: ""
  # - name: DB_POOL_MAX_ACTIVE
  #   value: "100"
  # - name: DB_POOL_MAX_IDLE
  #   value: "10"

  annotations: {}

  service:
    name: artifactory
    type: ClusterIP
    annotations: {}
  externalPort: 8081
  internalPort: 8081
  internalPortReplicator: 6061
  externalPortReplicator: 6061
  uid: 1030
  ## The following settings are to configure the frequency of the liveness and readiness probes
  livenessProbe:
    enabled: false
    initialDelaySeconds: 180
    failureThreshold: 10
    timeoutSeconds: 10
    periodSeconds: 10
    successThreshold: 1

  readinessProbe:
    enabled: false
    initialDelaySeconds: 60
    failureThreshold: 10
    timeoutSeconds: 10
    periodSeconds: 10
    successThreshold: 1
  persistence:
    mountPath: '/var/opt/jfrog/artifactory'
    enabled: true
    ## A manually managed Persistent Volume and Claim
    ## Requires persistence.enabled: true
    ## If defined, PVC must be created manually before volume will be bound with the name e.g `artifactory`
    # existingClaim:

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
    ## Annotations for the Persistent Volume Claim
    annotations: {}
  ## Uncomment the following resources definitions or pass them from command line
  ## to control the cpu and memory resources allocated by the Kubernetes cluster
  resources: {}
  #  requests:
  #    memory: "1Gi"
  #    cpu: "500m"
  #  limits:
  #    memory: "2Gi"
  #    cpu: "1"
  ## The following Java options are passed to the java process running Artifactory.
  ## You should set them according to the resources set above
  javaOpts: {}
  #  xms: "1g"
  #  xmx: "2g"
  #  other: ""
  nodeSelector: {}

  tolerations: []

  affinity: {}

  ## Artifactory Replicator is available only for Enterprise Plus
  replicator:
    enabled: false
    publicUrl:

# Nginx
nginx:
  enabled: true
  name: nginx
  replicaCount: 1
  uid: 104
  gid: 107
  image:
    repository: 'docker.bintray.io/jfrog/nginx-artifactory-pro'
    # Note that by default we use appVersion to get image tag
    # version:
    pullPolicy: IfNotPresent
  service:
    ## For minikube, set this to NodePort, elsewhere use LoadBalancer
    type: LoadBalancer
    ## For supporting whitelist on the Nginx LoadBalancer service
    ## Set this to a list of IP CIDR ranges
    ## Example: loadBalancerSourceRanges: ['10.10.10.5/32', '10.11.10.5/32']
    ## or pass from helm command line
    ## Example: helm install ... --set nginx.service.loadBalancerSourceRanges='{10.10.10.5/32,10.11.10.5/32}'
    loadBalancerSourceRanges: []
    annotations: {}
    ## Provide static ip address
    loadBalancerIP:
    ## There are two available options: “Cluster” (default) and “Local”.
    externalTrafficPolicy: Cluster
  externalPortHttp: 80
  internalPortHttp: 80
  externalPortHttps: 443
  internalPortHttps: 443
  internalPortReplicator: 6061
  externalPortReplicator: 6061
  ## The following settings are to configure the frequency of the liveness and readiness probes
  livenessProbe:
    enabled: true
    initialDelaySeconds: 60
    failureThreshold: 10
    timeoutSeconds: 10
    periodSeconds: 10
    successThreshold: 1

  readinessProbe:
    enabled: true
    initialDelaySeconds: 60
    failureThreshold: 10
    timeoutSeconds: 10
    periodSeconds: 10
    successThreshold: 1

  ## The SSL secret that will be used by the Nginx pod
  # tlsSecretName: chart-example-tls
  env:
    # artUrl: "http://artifactory:8081/artifactory"
    ssl: true
    skipAutoConfigUpdate: false
  ## Custom ConfigMap for nginx.conf
  customConfigMap:
  ## Custom ConfigMap for artifactory-ha.conf
  customArtifactoryConfigMap:
  persistence:
    mountPath: '/var/opt/jfrog/nginx'
    enabled: false
    ## A manually managed Persistent Volume and Claim
    ## Requires persistence.enabled: true
    ## If defined, PVC must be created manually before volume will be bound
    # existingClaim:

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
  resources: {}
  #  requests:
  #    memory: "250Mi"
  #    cpu: "100m"
  #  limits:
  #    memory: "250Mi"
  #    cpu: "500m"
  nodeSelector: {}

  tolerations: []

  affinity: {}

## Configuration values for the postgresql dependency
## ref: https://github.com/kubernetes/charts/blob/master/stable/postgresql/README.md
##
postgresql:
  enabled: true
  imageTag: '9.6.11'
  postgresUser: 'artifactory'
  postgresPassword:
  postgresDatabase: 'artifactory'
  postgresConfig:
    maxConnections: '1500'
  persistence:
    enabled: true
    size: 50Gi
  service:
    port: 5432
  resources: {}
  #  requests:
  #    memory: "512Mi"
  #    cpu: "100m"
  #  limits:
  #    memory: "1Gi"
  #    cpu: "500m"

## If NOT using the PostgreSQL in this chart (postgresql.enabled=false),
## specify custom database details here or leave empty and Artifactory will use embedded derby
database:
  type:
  host:
  port:
  ## If you set the url, leave host and port empty
  url:
  ## If you would like this chart to create the secret containing the db
  ## password, use these values
  user:
  password:
  ## If you have existing Kubernetes secrets containing db credentials, use
  ## these values
  secrets: {}
  #  user:
  #    name: "rds-artifactory"
  #    key: "db-user"
  #  password:
  #    name: "rds-artifactory"
  #    key: "db-password"
  #  url:
  #    name: "rds-artifactory"
  #    key: "db-url"
```

</details>

---

# JFrog Artifactory Helm Chart

## Prerequisites Details

- Kubernetes 1.6+
- Artifactory Pro trial license [get one from here](https://www.jfrog.com/artifactory/free-trial/)

## Chart Details

This chart will do the following:

- Deploy Artifactory-Pro/Artifactory-Edge (or OSS if set custom image)
- Deploy a PostgreSQL database using the jfrog/postgresql chart
- Deploy an optional Nginx server
- Optionally expose Artifactory with Ingress [Ingress documentation](https://kubernetes.io/docs/concepts/services-networking/ingress/)

## Installing the Chart

### Add JFrog Helm repository

Before installing JFrog helm charts, you need to add the [JFrog helm repository](https://charts.jfrog.io/) to your helm client

```bash
helm repo add jfrog https://charts.jfrog.io
```

### Install Chart

To install the chart with the release name `artifactory`:

```bash
helm install --name artifactory jfrog/artifactory
```

### Deploying Artifactory OSS

By default it will run Artifactory-Pro to run Artifactory-Oss use following command:

```bash
helm install --name artifactory --set artifactory.image.repository=docker.bintray.io/jfrog/artifactory-oss jfrog/artifactory
```

### Deploying Artifactory with replicator enabled

```bash
## Artifactory replicator is disabled by default. When the replicator is enabled, the replicator.publicUrl parameter is required. To enable it use the following:
helm install --name artifactory --set artifactory.replicator.enabled=true --set artifactory.replicator.publicUrl=<artifactory_url>:<replicator_port> jfrog/artifactory
```

### Accessing Artifactory

**NOTE:** It might take a few minutes for Artifactory's public IP to become available.
Follow the instructions outputted by the install command to get the Artifactory IP to access it.

### Updating Artifactory

Once you have a new chart version, you can update your deployment with

```bash
helm upgrade artifactory --namespace artifactory jfrog/artifactory
```

This will apply any configuration changes on your existing deployment.

### Artifactory memory and CPU resources

The Artifactory Helm chart comes with support for configured resource requests and limits to Artifactory, Nginx and PostgreSQL. By default, these settings are commented out.
It is **highly** recommended to set these so you have full control of the allocated resources and limits.
Artifactory java memory parameters can (and should) also be set to match the allocated resources with `artifactory.javaOpts.xms` and `artifactory.javaOpts.xmx`.

```bash
# Example of setting resource requests and limits to all pods (including passing java memory settings to Artifactory)
helm install --name artifactory \
               --set artifactory.resources.requests.cpu="500m" \
               --set artifactory.resources.limits.cpu="2" \
               --set artifactory.resources.requests.memory="1Gi" \
               --set artifactory.resources.limits.memory="4Gi" \
               --set artifactory.javaOpts.xms="1g" \
               --set artifactory.javaOpts.xmx="4g" \
               --set nginx.resources.requests.cpu="100m" \
               --set nginx.resources.limits.cpu="250m" \
               --set nginx.resources.requests.memory="250Mi" \
               --set nginx.resources.limits.memory="500Mi" \
               jfrog/artifactory
```

Get more details on configuring Artifactory in the [official documentation](https://www.jfrog.com/confluence/).

### Customizing Database password

You can override the specified database password (set in [values.yaml](values.yaml)), by passing it as a parameter in the install command line

```bash
helm install --name artifactory --namespace artifactory --set postgresql.postgresPassword=12_hX34qwerQ2 jfrog/artifactory
```

You can customise other parameters in the same way, by passing them on `helm install` command line.

### Deleting Artifactory

```bash
helm delete --purge artifactory
```

This will completely delete your Artifactory Pro deployment.  
**IMPORTANT:** This will also delete your data volumes. You will lose all data!

### Kubernetes Secret for Artifactory License

You can deploy the Artifactory license as a [Kubernetes secret](https://kubernetes.io/docs/concepts/configuration/secret/).
Prepare a text file with the license written in it and create a Kubernetes secret from it.

```bash
# Create the Kubernetes secret (assuming the local license file is 'art.lic')
kubectl create secret generic artifactory-license --from-file=./art.lic

# Pass the license to helm
helm install --name artifactory --set artifactory.license.secret=artifactory-license,artifactory.license.dataKey=art.lic jfrog/artifactory
```

**NOTE:** This method is relevant for initial deployment only! Once Artifactory is deployed, you should not keep passing these parameters as the license is already persisted into Artifactory's storage (they will be ignored).
Updating the license should be done via Artifactory UI or REST API.

### Bootstrapping Artifactory

**IMPORTANT:** Bootstrapping Artifactory needs license. Pass license as shown in above section.

- User guide to [bootstrap Artifactory Global Configuration](https://www.jfrog.com/confluence/display/RTF/Configuration+Files#ConfigurationFiles-BootstrappingtheGlobalConfiguration)
- User guide to [bootstrap Artifactory Security Configuration](https://www.jfrog.com/confluence/display/RTF/Configuration+Files#ConfigurationFiles-BootstrappingtheSecurityConfiguration)

1. Create `bootstrap-config.yaml` with artifactory.config.import.xml and security.import.xml as shown below:

```
apiVersion: v1
kind: ConfigMap
metadata:
  name: my-release-bootstrap-config
data:
  artifactory.config.import.xml: |
    <config contents>
  security.import.xml: |
    <config contents>
```

2. Create configMap in Kubernetes:

```bash
kubectl apply -f bootstrap-config.yaml
```

3. Pass the configMap to helm

```bash
helm install --name artifactory --set artifactory.license.secret=artifactory-license,artifactory.license.dataKey=art.lic,artifactory.configMapName=my-release-bootstrap-config jfrog/artifactory
```

### Use custom nginx.conf with Nginx

Steps to create configMap with nginx.conf

- Create `nginx.conf` file.

```bash
kubectl create configmap nginx-config --from-file=nginx.conf
```

- Pass configMap to helm install

```bash
helm install --name artifactory --set nginx.customConfigMap=nginx-config jfrog/artifactory
```

### Use an external Database

There are cases where you will want to use a different database and not the enclosed **PostgreSQL**.
See more details on [configuring the database](https://www.jfrog.com/confluence/display/RTF/Configuring+the+Database)

> The official Artifactory Docker images include the PostgreSQL database driver.
> For other database types, you will have to add the relevant database driver to Artifactory's tomcat/lib

This can be done with the following parameters

```bash
# Make sure your Artifactory Docker image has the MySQL database driver in it
...
--set postgresql.enabled=false \
--set artifactory.preStartCommand="curl -L -o /opt/jfrog/artifactory/tomcat/lib/mysql-connector-java-5.1.41.jar https://jcenter.bintray.com/mysql/mysql-connector-java/5.1.41/mysql-connector-java-5.1.41.jar" \
--set database.type=mysql \
--set database.host=${DB_HOST} \
--set database.port=${DB_PORT} \
--set database.user=${DB_USER} \
--set database.password=${DB_PASSWORD} \
...
```

**NOTE:** You must set `postgresql.enabled=false` in order for the chart to use the `database.*` parameters. Without it, they will be ignored!

If you store your database credentials in a pre-existing Kubernetes `Secret`, you can specify them via `database.secrets` instead of `database.user` and `database.password`:

```bash
# Create a secret containing the database credentials
kubectl create secret generic my-secret --from-literal=user=${DB_USER} --from-literal=password=${DB_PASSWORD}
...
--set postgresql.enabled=false \
--set database.secrets.user.name=my-secret \
--set database.secrets.user.key=user \
--set database.secrets.password.name=my-secret \
--set database.secrets.password.key=password \
--set database.secrets.url.name=my-secret \
--set database.secrets.url.key=url \
...
```

### Deleting Artifactory

To delete the Artifactory.

```bash
helm delete --purge artifactory
```

This will completely delete your Artifactory HA cluster.

### Custom Docker registry for your images

If you need to pull your Docker images from a private registry, you need to create a
[Kubernetes Docker registry secret](https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/) and pass it to helm

```bash
# Create a Docker registry secret called 'regsecret'
kubectl create secret docker-registry regsecret --docker-server=<your-registry-server> --docker-username=<your-name> --docker-password=<your-pword> --docker-email=<your-email>
```

Once created, you pass it to `helm`

```bash
helm install --name artifactory --set imagePullSecrets=regsecret jfrog/artifactory
```

## Configuration

The following table lists the configurable parameters of the artifactory chart and their default values.

| Parameter                                        | Description                                                                                                                                                                                                                                                                                                                         | Default                                                            |
| ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| `imagePullSecrets`                               | Docker registry pull secret                                                                                                                                                                                                                                                                                                         |                                                                    |
| `serviceAccount.create`                          | Specifies whether a ServiceAccount should be created                                                                                                                                                                                                                                                                                | `true`                                                             |
| `serviceAccount.name`                            | The name of the ServiceAccount to create                                                                                                                                                                                                                                                                                            | Generated using the fullname template                              |
| `rbac.create`                                    | Specifies whether RBAC resources should be created                                                                                                                                                                                                                                                                                  | `true`                                                             |
| `rbac.role.rules`                                | Rules to create                                                                                                                                                                                                                                                                                                                     | `[]`                                                               |
| `artifactory.name`                               | Artifactory name                                                                                                                                                                                                                                                                                                                    | `artifactory`                                                      |
| `artifactory.replicaCount`                       | Replica count for Artifactory deployment                                                                                                                                                                                                                                                                                            | `1`                                                                |
| `artifactory.image.pullPolicy`                   | Container pull policy                                                                                                                                                                                                                                                                                                               | `IfNotPresent`                                                     |
| `artifactory.image.repository`                   | Container image                                                                                                                                                                                                                                                                                                                     | `docker.bintray.io/jfrog/artifactory-pro`                          |
| `artifactory.image.version`                      | Container tag                                                                                                                                                                                                                                                                                                                       | `.Chart.AppVersion`                                                |
| `artifactory.service.name`                       | Artifactory service name to be set in Nginx configuration                                                                                                                                                                                                                                                                           | `artifactory`                                                      |
| `artifactory.service.type`                       | Artifactory service type                                                                                                                                                                                                                                                                                                            | `ClusterIP`                                                        |
| `artifactory.externalPort`                       | Artifactory service external port                                                                                                                                                                                                                                                                                                   | `8081`                                                             |
| `artifactory.internalPort`                       | Artifactory service internal port                                                                                                                                                                                                                                                                                                   | `8081`                                                             |
| `artifactory.internalPortReplicator`             | Replicator service internal port                                                                                                                                                                                                                                                                                                    | `6061`                                                             |
| `artifactory.externalPortReplicator`             | Replicator service external port                                                                                                                                                                                                                                                                                                    | `6061`                                                             |
| `artifactory.livenessProbe.enabled`              | Enable liveness probe                                                                                                                                                                                                                                                                                                               | `true`                                                             |
| `artifactory.livenessProbe.initialDelaySeconds`  | Delay before liveness probe is initiated                                                                                                                                                                                                                                                                                            | 180                                                                |
| `artifactory.livenessProbe.periodSeconds`        | How often to perform the probe                                                                                                                                                                                                                                                                                                      | 10                                                                 |
| `artifactory.livenessProbe.timeoutSeconds`       | When the probe times out                                                                                                                                                                                                                                                                                                            | 10                                                                 |
| `artifactory.livenessProbe.successThreshold`     | Minimum consecutive successes for the probe to be considered successful after having failed.                                                                                                                                                                                                                                        | 1                                                                  |
| `artifactory.livenessProbe.failureThreshold`     | Minimum consecutive failures for the probe to be considered failed after having succeeded.                                                                                                                                                                                                                                          | 10                                                                 |
| `artifactory.masterKey`                          | master.key to be used on bootstrap                                                                                                                                                                                                                                                                                                  | `FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF` |
| `artifactory.masterKeySecretName`                | Artifactory Master Key secret name                                                                                                                                                                                                                                                                                                  |                                                                    |
| `artifactory.preStartCommand`                    | Command to run before entrypoint starts                                                                                                                                                                                                                                                                                             |                                                                    |
| `artifactory.postStartCommand`                   | Command to run after container starts                                                                                                                                                                                                                                                                                               |                                                                    |
| `artifactory.extraEnvironmentVariables`          | Extra environment variables to pass to Artifactory. See [documentation](https://www.jfrog.com/confluence/display/RTF/Installing+with+Docker#InstallingwithDocker-SupportedEnvironmentVariables)                                                                                                                                     |                                                                    |
| `artifactory.readinessProbe.enabled`             | would you like a readinessProbe to be enabled                                                                                                                                                                                                                                                                                       | `true`                                                             |
| `artifactory.readinessProbe.initialDelaySeconds` | Delay before readiness probe is initiated                                                                                                                                                                                                                                                                                           | 60                                                                 |
| `artifactory.readinessProbe.periodSeconds`       | How often to perform the probe                                                                                                                                                                                                                                                                                                      | 10                                                                 |
| `artifactory.readinessProbe.timeoutSeconds`      | When the probe times out                                                                                                                                                                                                                                                                                                            | 10                                                                 |
| `artifactory.readinessProbe.successThreshold`    | Minimum consecutive successes for the probe to be considered successful after having failed.                                                                                                                                                                                                                                        | 1                                                                  |
| `artifactory.readinessProbe.failureThreshold`    | Minimum consecutive failures for the probe to be considered failed after having succeeded.                                                                                                                                                                                                                                          | 10                                                                 |
| `artifactory.persistence.mountPath`              | Artifactory persistence volume mount path                                                                                                                                                                                                                                                                                           | `"/var/opt/jfrog/artifactory"`                                     |
| `artifactory.persistence.enabled`                | Artifactory persistence volume enabled                                                                                                                                                                                                                                                                                              | `true`                                                             |
| `artifactory.persistence.existingClaim`          | Artifactory persistence volume claim name                                                                                                                                                                                                                                                                                           |                                                                    |
| `artifactory.persistence.accessMode`             | Artifactory persistence volume access mode                                                                                                                                                                                                                                                                                          | `ReadWriteOnce`                                                    |
| `artifactory.persistence.size`                   | Artifactory persistence or local volume size                                                                                                                                                                                                                                                                                        | `20Gi`                                                             |
| `artifactory.resources.requests.memory`          | Artifactory initial memory request                                                                                                                                                                                                                                                                                                  |                                                                    |
| `artifactory.resources.requests.cpu`             | Artifactory initial cpu request                                                                                                                                                                                                                                                                                                     |                                                                    |
| `artifactory.resources.limits.memory`            | Artifactory memory limit                                                                                                                                                                                                                                                                                                            |                                                                    |
| `artifactory.resources.limits.cpu`               | Artifactory cpu limit                                                                                                                                                                                                                                                                                                               |                                                                    |
| `artifactory.javaOpts.xms`                       | Artifactory java Xms size                                                                                                                                                                                                                                                                                                           |                                                                    |
| `artifactory.javaOpts.xmx`                       | Artifactory java Xms size                                                                                                                                                                                                                                                                                                           |                                                                    |
| `artifactory.javaOpts.other`                     | Artifactory additional java options                                                                                                                                                                                                                                                                                                 |                                                                    |
| `artifactory.replicator.enabled`                 | Enable Artifactory Replicator                                                                                                                                                                                                                                                                                                       | `false`                                                            |
| `artifactory.replicator.publicUrl`               | Artifactory Replicator Public URL                                                                                                                                                                                                                                                                                                   |                                                                    |
| `ingress.enabled`                                | If true, Artifactory Ingress will be created                                                                                                                                                                                                                                                                                        | `false`                                                            |
| `ingress.annotations`                            | Artifactory Ingress annotations                                                                                                                                                                                                                                                                                                     | `{}`                                                               |
| `ingress.hosts`                                  | Artifactory Ingress hostnames                                                                                                                                                                                                                                                                                                       | `[]`                                                               |
| `ingress.tls`                                    | Artifactory Ingress TLS configuration (YAML)                                                                                                                                                                                                                                                                                        | `[]`                                                               |
| `ingress.defaultBackend.enabled`                 | If true, the default `backend` will be added using serviceName and servicePort                                                                                                                                                                                                                                                      | `true`                                                             |
| `ingress.annotations`                            | Ingress annotations, which are written out if annotations section exists in values. Everything inside of the annotations section will appear verbatim inside the resulting manifest. See `Ingress annotations` section below for examples of how to leverage the annotations, specifically for how to enable docker authentication. |                                                                    |
| `nginx.name`                                     | Nginx name                                                                                                                                                                                                                                                                                                                          | `nginx`                                                            |
| `nginx.enabled`                                  | Deploy nginx server                                                                                                                                                                                                                                                                                                                 | `true`                                                             |
| `nginx.replicaCount`                             | Nginx replica count                                                                                                                                                                                                                                                                                                                 | `1`                                                                |
| `nginx.uid`                                      | Nginx User Id                                                                                                                                                                                                                                                                                                                       | `104`                                                              |
| `nginx.git`                                      | Nginx Group Id                                                                                                                                                                                                                                                                                                                      | `107`                                                              |
| `nginx.image.repository`                         | Container image                                                                                                                                                                                                                                                                                                                     | `docker.bintray.io/jfrog/nginx-artifactory-pro`                    |
| `nginx.image.version`                            | Container tag                                                                                                                                                                                                                                                                                                                       | `.Chart.AppVersion`                                                |
| `nginx.image.pullPolicy`                         | Container pull policy                                                                                                                                                                                                                                                                                                               | `IfNotPresent`                                                     |
| `nginx.service.type`                             | Nginx service type                                                                                                                                                                                                                                                                                                                  | `LoadBalancer`                                                     |
| `nginx.service.loadBalancerSourceRanges`         | Nginx service array of IP CIDR ranges to whitelist (only when service type is LoadBalancer)                                                                                                                                                                                                                                         |                                                                    |
| `nginx.service.externalTrafficPolicy`            | Nginx service desires to route external traffic to node-local or cluster-wide endpoints.                                                                                                                                                                                                                                            | `Cluster`                                                          |
| `nginx.loadBalancerIP`                           | Provide Static IP to configure with Nginx                                                                                                                                                                                                                                                                                           |                                                                    |
| `nginx.externalPortHttp`                         | Nginx service external port                                                                                                                                                                                                                                                                                                         | `80`                                                               |
| `nginx.internalPortHttp`                         | Nginx service internal port                                                                                                                                                                                                                                                                                                         | `80`                                                               |
| `nginx.externalPortHttps`                        | Nginx service external port                                                                                                                                                                                                                                                                                                         | `443`                                                              |
| `nginx.internalPortHttps`                        | Nginx service internal port                                                                                                                                                                                                                                                                                                         | `443`                                                              |
| `nginx.internalPortReplicator`                   | Replicator service internal port                                                                                                                                                                                                                                                                                                    | `6061`                                                             |
| `nginx.externalPortReplicator`                   | Replicator service external port                                                                                                                                                                                                                                                                                                    | `6061`                                                             |
| `nginx.livenessProbe.enabled`                    | Enable liveness probe                                                                                                                                                                                                                                                                                                               | `true`                                                             |
| `nginx.livenessProbe.initialDelaySeconds`        | Delay before liveness probe is initiated                                                                                                                                                                                                                                                                                            | 60                                                                 |
| `nginx.livenessProbe.periodSeconds`              | How often to perform the probe                                                                                                                                                                                                                                                                                                      | 10                                                                 |
| `nginx.livenessProbe.timeoutSeconds`             | When the probe times out                                                                                                                                                                                                                                                                                                            | 10                                                                 |
| `nginx.livenessProbe.successThreshold`           | Minimum consecutive successes for the probe to be considered successful after having failed.                                                                                                                                                                                                                                        | 10                                                                 |
| `nginx.livenessProbe.failureThreshold`           | Minimum consecutive failures for the probe to be considered failed after having succeeded.                                                                                                                                                                                                                                          | 1                                                                  |
| `nginx.readinessProbe.enabled`                   | would you like a readinessProbe to be enabled                                                                                                                                                                                                                                                                                       | `true`                                                             |
| `nginx.readinessProbe.initialDelaySeconds`       | Delay before readiness probe is initiated                                                                                                                                                                                                                                                                                           | 60                                                                 |
| `nginx.readinessProbe.periodSeconds`             | How often to perform the probe                                                                                                                                                                                                                                                                                                      | 10                                                                 |
| `nginx.readinessProbe.timeoutSeconds`            | When the probe times out                                                                                                                                                                                                                                                                                                            | 10                                                                 |
| `nginx.readinessProbe.successThreshold`          | Minimum consecutive successes for the probe to be considered successful after having failed.                                                                                                                                                                                                                                        | 10                                                                 |
| `nginx.readinessProbe.failureThreshold`          | Minimum consecutive failures for the probe to be considered failed after having succeeded.                                                                                                                                                                                                                                          | 1                                                                  |
| `nginx.tlsSecretName`                            | SSL secret that will be used by the Nginx pod                                                                                                                                                                                                                                                                                       |                                                                    |
| `nginx.env.artUrl`                               | Nginx Environment variable Artifactory URL                                                                                                                                                                                                                                                                                          | `"http://artifactory:8081/artifactory"`                            |
| `nginx.env.ssl`                                  | Nginx Environment enable ssl                                                                                                                                                                                                                                                                                                        | `true`                                                             |
| `nginx.env.skipAutoConfigUpdate`                 | Nginx Environment to disable auto configuration update                                                                                                                                                                                                                                                                              | `false`                                                            |
| `nginx.customConfigMap`                          | Nginx CustomeConfigMap name for `nginx.conf`                                                                                                                                                                                                                                                                                        | ``                                                                 |
| `nginx.customArtifactoryConfigMap`               | Nginx CustomeConfigMap name for `artifactory.conf`                                                                                                                                                                                                                                                                                  | ``                                                                 |
| `nginx.persistence.mountPath`                    | Nginx persistence volume mount path                                                                                                                                                                                                                                                                                                 | `"/var/opt/jfrog/nginx"`                                           |
| `nginx.persistence.enabled`                      | Nginx persistence volume enabled                                                                                                                                                                                                                                                                                                    | `true`                                                             |
| `nginx.persistence.accessMode`                   | Nginx persistence volume access mode                                                                                                                                                                                                                                                                                                | `ReadWriteOnce`                                                    |
| `nginx.persistence.size`                         | Nginx persistence volume size                                                                                                                                                                                                                                                                                                       | `5Gi`                                                              |
| `nginx.resources.requests.memory`                | Nginx initial memory request                                                                                                                                                                                                                                                                                                        |                                                                    |
| `nginx.resources.requests.cpu`                   | Nginx initial cpu request                                                                                                                                                                                                                                                                                                           |                                                                    |
| `nginx.resources.limits.memory`                  | Nginx memory limit                                                                                                                                                                                                                                                                                                                  |                                                                    |
| `nginx.resources.limits.cpu`                     | Nginx cpu limit                                                                                                                                                                                                                                                                                                                     |                                                                    |
| `postgresql.enabled`                             | Use enclosed PostgreSQL as database                                                                                                                                                                                                                                                                                                 | `true`                                                             |
| `postgresql.imageTag`                            | PostgreSQL version                                                                                                                                                                                                                                                                                                                  | `9.6.11`                                                           |
| `postgresql.postgresDatabase`                    | PostgreSQL database name                                                                                                                                                                                                                                                                                                            | `artifactory`                                                      |
| `postgresql.postgresUser`                        | PostgreSQL database user                                                                                                                                                                                                                                                                                                            | `artifactory`                                                      |
| `postgresql.postgresPassword`                    | PostgreSQL database password                                                                                                                                                                                                                                                                                                        |                                                                    |
| `postgresql.persistence.enabled`                 | PostgreSQL use persistent storage                                                                                                                                                                                                                                                                                                   | `true`                                                             |
| `postgresql.persistence.size`                    | PostgreSQL persistent storage size                                                                                                                                                                                                                                                                                                  | `50Gi`                                                             |
| `postgresql.service.port`                        | PostgreSQL database port                                                                                                                                                                                                                                                                                                            | `5432`                                                             |
| `postgresql.resources.requests.memory`           | PostgreSQL initial memory request                                                                                                                                                                                                                                                                                                   |                                                                    |
| `postgresql.resources.requests.cpu`              | PostgreSQL initial cpu request                                                                                                                                                                                                                                                                                                      |                                                                    |
| `postgresql.resources.limits.memory`             | PostgreSQL memory limit                                                                                                                                                                                                                                                                                                             |                                                                    |
| `postgresql.resources.limits.cpu`                | PostgreSQL cpu limit                                                                                                                                                                                                                                                                                                                |                                                                    |
| `database.type`                                  | External database type (`postgresql`, `mysql`, `oracle` or `mssql`)                                                                                                                                                                                                                                                                 |                                                                    |
| `database.host`                                  | External database hostname                                                                                                                                                                                                                                                                                                          |                                                                    |
| `database.port`                                  | External database port                                                                                                                                                                                                                                                                                                              |                                                                    |
| `database.url`                                   | External database connection URL                                                                                                                                                                                                                                                                                                    |                                                                    |
| `database.user`                                  | External database username                                                                                                                                                                                                                                                                                                          |                                                                    |
| `database.password`                              | External database password                                                                                                                                                                                                                                                                                                          |                                                                    |
| `database.secrets.user.name`                     | External database username `Secret` name                                                                                                                                                                                                                                                                                            |                                                                    |
| `database.secrets.user.key`                      | External database username `Secret` key                                                                                                                                                                                                                                                                                             |                                                                    |
| `database.secrets.password.name`                 | External database password `Secret` name                                                                                                                                                                                                                                                                                            |                                                                    |
| `database.secrets.password.key`                  | External database password `Secret` key                                                                                                                                                                                                                                                                                             |                                                                    |
| `database.secrets.url.name`                      | External database url `Secret` name                                                                                                                                                                                                                                                                                                 |                                                                    |
| `database.secrets.url.key`                       | External database url `Secret` key                                                                                                                                                                                                                                                                                                  |                                                                    |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`.

### Ingress and TLS

To get Helm to create an ingress object with a hostname, add these two lines to your Helm command:

```
helm install --name artifactory \
  --set ingress.enabled=true \
  --set ingress.hosts[0]="artifactory.company.com" \
  --set artifactory.service.type=NodePort \
  --set nginx.enabled=false \
  jfrog/artifactory
```

If your cluster allows automatic creation/retrieval of TLS certificates (e.g. [cert-manager](https://github.com/jetstack/cert-manager)), please refer to the documentation for that mechanism.

To manually configure TLS, first create/retrieve a key & certificate pair for the address(es) you wish to protect. Then create a TLS secret in the namespace:

```console
kubectl create secret tls artifactory-tls --cert=path/to/tls.cert --key=path/to/tls.key
```

Include the secret's name, along with the desired hostnames, in the Artifactory Ingress TLS section of your custom `values.yaml` file:

```
  ingress:
    ## If true, Artifactory Ingress will be created
    ##
    enabled: true

    ## Artifactory Ingress hostnames
    ## Must be provided if Ingress is enabled
    ##
    hosts:
      - artifactory.domain.com
    annotations:
      kubernetes.io/tls-acme: "true"
    ## Artifactory Ingress TLS configuration
    ## Secrets must be manually created in the namespace
    ##
    tls:
      - secretName: artifactory-tls
        hosts:
          - artifactory.domain.com
```

### Ingress annotations

This example specifically enables Artifactory to work as a Docker Registry using the Repository Path method. See [Artifactory as Docker Registry](https://www.jfrog.com/confluence/display/RTF/Getting+Started+with+Artifactory+as+a+Docker+Registry) documentation for more information about this setup.

```
ingress:
  enabled: true
  defaultBackend:
    enabled: false
  hosts:
    - myhost.example.com
  annotations:
    ingress.kubernetes.io/force-ssl-redirect: "true"
    ingress.kubernetes.io/proxy-body-size: "0"
    ingress.kubernetes.io/proxy-read-timeout: "600"
    ingress.kubernetes.io/proxy-send-timeout: "600"
    kubernetes.io/ingress.class: nginx
    nginx.ingress.kubernetes.io/configuration-snippet: |
      rewrite ^/(v2)/token /artifactory/api/docker/null/v2/token;
      rewrite ^/(v2)/([^\/]*)/(.*) /artifactory/api/docker/$2/$1/$3;
    nginx.ingress.kubernetes.io/proxy-body-size: "0"
  tls:
    - hosts:
      - "myhost.example.com"
```

## Useful links

https://www.jfrog.com
https://www.jfrog.com/confluence/
