# `@helm-charts/stable-airflow`

Airflow is a platform to programmatically author, schedule and monitor workflows

| Field               | Value   |
| ------------------- | ------- |
| Repository Name     | stable  |
| Chart Name          | airflow |
| Chart Version       | 0.17.2  |
| NPM Package Version | 0.1.0   |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Duplicate this file and put your customization here

##
## common settings and setting for the webserver
airflow:
  ##
  ## secretsMapping can be overridden in values.yaml as such:
  ## secretsMapping:
  ## - envVar: AIRFLOW__LDAP__BIND_PASSWORD
  ##   secretName: ldapBindPassword
  ## - envVar: AIRFLOW__ATLAS__PASSWORD
  ##   secretName: atlasPassword
  ## - envVar: AIRFLOW__SMTP__PASSWORD
  ##   secretName: smtpPassword
  ## - envVar: AIRFLOW__KUBERNETES__GIT_PASSWORD
  ##   secretName: kubernetesGitPassword
  ## - envVar: POSTGRES_USER
  ##   secretName: postgresUser
  ## - envVar: POSTGRES_PASSWORD
  ##   secretName: postgresPassword
  ## - envVar: REDIS_PASSWORD
  ##   secretName: redisPassword
  secretsMapping:

  ## used only when existingAirflowSecrets is false
  defaultSecretsMapping:
    - envVar: POSTGRES_USER
      secretKey: postgresUser
    - envVar: POSTGRES_PASSWORD
      secretKey: postgresPassword
    - envVar: REDIS_PASSWORD
      secretKey: redisPassword

  ##
  ## You will need to define your fernet key:
  ## Generate fernetKey with:
  ##    python -c "from cryptography.fernet import Fernet; FERNET_KEY = Fernet.generate_key().decode(); print(FERNET_KEY)"
  ## fernetKey: ABCDABCDABCDABCDABCDABCDABCDABCDABCDABCD
  fernetKey: ''
  service:
    type: ClusterIP
  ##
  ## The executor to use.
  ##
  executor: Celery
  ##
  ## set the max number of retries during container initialization
  initRetryLoop:
  ##
  ## base image for webserver/scheduler/workers
  ## Note: If you want to use airflow HEAD (2.0dev), use the following image:
  # image
  #   repository: stibbons31/docker-airflow-dev
  #   tag: 2.0dev
  ## Airflow 2.0 allows changing the value ingress.web.path and ingress.flower.path (see bellow).
  ## In version < 2.0, changing these paths won't have any effect.
  image:
    ##
    ## docker-airflow image
    repository: puckel/docker-airflow
    ##
    ## image tag
    tag: 1.10.0-4
    ##
    ## Image pull policy
    ## values: Always or IfNotPresent
    pullPolicy: IfNotPresent
    ##
    ## image pull secret for private images
    pullSecret:
  ##
  ## Set schedulerNumRuns to control how the schduler behaves:
  ##   -1 will let him looping indefinitively but it will never update the DAG
  ##   1 will have the scheduler quit after each refresh, but kubernetes will restart it.
  ##
  ## A long running scheduler process, at least with the CeleryExecutor, ends up not scheduling
  ## some tasks. We still don’t know the exact cause, unfortunately. Airflow has a built-in
  ## workaround in the form of the `num_runs` flag.
  ## Airflow runs with num_runs set to 5.
  ##
  ## If set to a value != -1, you will see your scheduler regularly restart. This is its normal
  ## behavior under these conditions.
  schedulerNumRuns: '-1'
  ##
  ## Set schedulerDoPickle to toggle whether to have the scheduler
  ## attempt to pickle the DAG object to send over to the workers,
  ## instead of letting workers run their version of the code.
  ## See the Airflow documentation for the --do_pickle argument: https://airflow.apache.org/cli.html#scheduler
  schedulerDoPickle: true
  ##
  ## Number of replicas for web server.
  ## For the moment, we recommend to leave this value to 1, since the webserver instance performs
  ## the 'initdb' operation, starting more replicas will cause all the web containers to execute
  ## it, which may cause unwanted issues on the database.
  webReplicas: 1
  ##
  ## Custom airflow configuration environment variables
  ## Use this to override any airflow setting settings defining environment variables in the
  ## following form: AIRFLOW__<section>__<key>.
  ## See the Airflow documentation: http://airflow.readthedocs.io/en/latest/configuration.html?highlight=__CORE__#setting-configuration-options)
  ## Example:
  ##   config:
  ##     AIRFLOW__CORE__EXPOSE_CONFIG: "True"
  ##     HTTP_PROXY: "http://proxy.mycompany.com:123"
  config: {}
  ##
  ## Configure pod disruption budget for the scheduler
  podDisruptionBudget:
    maxUnavailable: 1
  ## Add custom connections
  ## Use this to add Airflow connections for operators you use
  ## For each connection - the id and type have to be defined.
  ## All the other parameters are optional
  ## Connections will be created with a script that is stored
  ## in a K8s secret and mounted into the scheduler container
  ## Example:
  ##   connections:
  ##   - id: my_aws
  ##     type: aws
  ##     extra: '{"aws_access_key_id": "**********", "aws_secret_access_key": "***", "region_name":"eu-central-1"}'
  connections: {}
##
## Workers configuration
workers:
  enabled: true
  ##
  ## Number of workers pod to launch
  replicas: 1
  ##
  ## Custom resource configuration
  resources:
    {}
    # limits:
    #   cpu: "1"
    #   memory: "2G"
    # requests:
    #   cpu: "0.5"
    #   memory: "512Mi"
  ##
  ## Annotations for the Worker pods
  pod:
    annotations:
      ## Example:
      ## iam.amazonaws.com/role: airflow-worker-Role
  ##
  ## Celery worker configuration
  celery:
    ##
    ## number of parallel celery tasks per worker
    instances: 1
  ##
  ## Directory in which to mount secrets on worker nodes.
  secretsDir: /var/airflow/secrets
  ##
  ## Secrets which will be mounted as a file at `secretsDir/<secret name>`.
  secrets: []

##
## Ingress configuration
ingress:
  ##
  ## enable ingress
  ## Note: If you want to change url prefix for web ui or flower even if you do not use ingress,
  ## you can still change ingress.web.path and ingress.flower.path
  enabled: false
  ##
  ## Configure the webserver endpoint
  web:
    ## NOTE: This requires an airflow version > 1.9.x
    ## For the moment (March 2018) this is **not** available on official package, you will have
    ## to use an image where airflow has been updated to its current HEAD.
    ## You can use the following one:
    ##  stibbons31/docker-airflow-dev:2.0dev
    ##
    ## if path is '/airflow':
    ##  - UI will be accessible at 'http://mycompany.com/airflow/admin'
    ##  - Healthcheck is at 'http://mycompany.com/airflow/health'
    ##  - api is at 'http://mycompany.com/airflow/api'
    ## NOTE: do NOT keep trailing slash. For root configuration, set and empty string
    path: ''
    ##
    ## hostname for the webserver
    host: ''
    ##
    ## Annotations for the webserver
    ## Airflow webserver handles relative path completely, just let your load balancer give the HTTP
    ## header like the requested URL (no special configuration neeed)
    annotations:
      ##
      ## Example for Traefik:
      # traefik.frontend.rule.type: PathPrefix
      # kubernetes.io/ingress.class: traefik
    tls:
      ## Set to "true" to enable TLS termination at the ingress
      enabled: false
      ## If enabled, set "secretName" to the secret containing the TLS private key and certificate
      ## Example:
      ## secretName: example-com-crt
  ##
  ## Configure the flower endpoind
  flower:
    ##
    ## If flower is '/airflow/flower':
    ##  - Flower UI is at 'http://mycompany.com/airflow/flower'
    ## NOTE: you need to have a reverse proxy/load balancer able to do URL rewrite in order to have
    ## flower mounted on other path than root. Flower only does half the job in url prefixing: it
    ## only generates the right URL/relative paths in the **returned HTML files**, but expects the
    ## request to have been be at the root.
    ## That's why we need a reverse proxy/load balancer that is able to strip the path
    ## NOTE: do NOT keep trailing slash. For root configuration, set and empty string
    path: ''
    ##
    ## Configure the liveness path. Keep to "/" for Flower >= jan 2018.
    ## For previous version, enter the same path than in the 'path' key
    ## NOTE: keep the trailing slash.
    livenessPath: /
    ##
    ## hostname for flower
    host: ''
    ##
    ## Annotation for the Flower endpoint
    ##
    ## ==== SKIP THE FOLLOWING BLOCK IF YOU HAVE FLOWER > JANUARY 2018 =============================
    ## Please note their is a small difference between the way Airflow Web server and Flower handles
    ## URL prefixes in HTTP requests:
    ## Flower wants HTTP header to behave like there was no URL prefix, and but still generates
    ## the right URL in html pages thanks to its `--url-prefix` parameter
    ##
    ##    Extracted from the Flower documentation:
    ##    (https://github.com/mher/flower/blob/master/docs/config.rst#url_prefix)
    ##
    ##        To access Flower on http://example.com/flower run it with:
    ##            flower --url-prefix=/flower
    ##
    ##        Use the following nginx configuration:
    ##            server {
    ##              listen 80;
    ##              server_name example.com;
    ##
    ##              location /flower/ {
    ##                rewrite ^/flower/(.*)$ /$1 break;
    ##                proxy_pass http://example.com:5555;
    ##                proxy_set_header Host $host;
    ##              }
    ##            }
    ## ==== IF YOU HAVE FLOWER > JANUARY 2018, NO MORE NEED TO STRIP THE PREFIX ====================
    annotations:
      ##
      ## NOTE: it is important here to have your reverse proxy strip the path/rewrite the URL
      ## Example for Traefik:
      # traefik.frontend.rule.type: PathPrefix       ## Flower >= Jan 2018
      # traefik.frontend.rule.type: PathPrefixStrip  ## Flower < Jan 2018
      # kubernetes.io/ingress.class: traefik
    tls:
      ## Set to "true" to enable TLS termination at the ingress
      enabled: false
      ## If enabled, set "secretName" to the secret containing the TLS private key and certificate
      ## Example:
      ## secretName: example-com-crt

##
## Storage configuration for DAGs
persistence:
  ##
  ## enable persistance storage
  enabled: false
  ##
  ## Existing claim to use
  # existingClaim: nil
  ##
  ## Persistent Volume Storage Class
  ## If defined, storageClassName: <storageClass>
  ## If set to "-", storageClassName: "", which disables dynamic provisioning
  ## If undefined (the default) or set to null, no storageClassName spec is
  ##   set, choosing the default provisioner.  (gp2 on AWS, standard on
  ##   GKE, AWS & OpenStack)
  # storageClass: default
  accessMode: ReadWriteOnce
  ##
  ## Persistant storage size request
  size: 1Gi

##
## Storage configuration for logs
logsPersistence:
  ##
  ## enable persistance storage
  enabled: false
  ##
  ## Existing claim to use
  # existingClaim: nil
  ##
  ## Persistent Volume Storage Class
  ## If defined, storageClassName: <storageClass>
  ## If set to "-", storageClassName: "", which disables dynamic provisioning
  ## If undefined (the default) or set to null, no storageClassName spec is
  ##   set, choosing the default provisioner.  (gp2 on AWS, standard on
  ##   GKE, AWS & OpenStack)
  ##
  ## A configuration for shared log storage requires a `storageClass` that
  ## supports the `ReadWriteMany` accessMode, such as NFS or AWS EFS.
  # storageClass: default
  accessMode: ReadWriteOnce
  ##
  ## Persistant storage size request
  size: 1Gi

##
## Configure DAGs deployment and update
dags:
  ##
  ## mount path for persistent volume.
  ## Note that this location is referred to in airflow.cfg, so if you change it, you must update airflow.cfg accordingly.
  path: /usr/local/airflow/dags
  ##
  ## Set to True to prevent pickling DAGs from scheduler to workers
  doNotPickle: false
  ##
  ## Configure Git repository to fetch DAGs
  git:
    ##
    ## url to clone the git repository
    url:
    ##
    ## branch name, tag or sha1 to reset to
    ref: master
  initContainer:
    ## Fetch the source code when the pods starts
    enabled: false
    ## Image for the init container (any image with git will do)
    image:
      ## docker-airflow image
      repository: alpine/git
      ## image tag
      tag: 1.0.4
      ## Image pull policy
      ## values: Always or IfNotPresent
      pullPolicy: IfNotPresent
    ## install requirements.txt dependencies automatically
    installRequirements: true

##
## Configure logs
logs:
  path: /usr/local/airflow/logs

##
##  Enable RBAC
rbac:
  ##
  ## Specifies whether RBAC resources should be created
  create: true

##
## Create or use ServiceAccount
serviceAccount:
  ##
  ## Specifies whether a ServiceAccount should be created
  create: true
  ## The name of the ServiceAccount to use.
  ## If not set and create is true, a name is generated using the fullname template
  name:

##
## Define existing secret for postgresql and redis
## If not specified, creates secret with postgres and redis values
existingAirflowSecret: ''

##
## Configuration values for the postgresql dependency.
## ref: https://github.com/kubernetes/charts/blob/master/stable/postgresql/README.md
postgresql:
  ##
  ## Use the PostgreSQL chart dependency.
  ## Set to false if bringing your own PostgreSQL.
  enabled: true
  ##
  ## If you are bringing your own PostgreSQL, you should set postgresHost and
  ## also probably service.port, postgresUser, postgresPassword, and postgresDatabase
  ## postgresHost:
  ##
  ## PostgreSQL port
  service:
    port: 5432
  ## PostgreSQL User to create.
  postgresUser: postgres
  ##
  ## PostgreSQL Password for the new user.
  ## If not set, a random 10 characters password will be used.
  postgresPassword: airflow
  ##
  ## PostgreSQL Database to create.
  postgresDatabase: airflow
  ##
  ## Persistent Volume Storage configuration.
  ## ref: https://kubernetes.io/docs/user-guide/persistent-volumes
  persistence:
    ##
    ## Enable PostgreSQL persistence using Persistent Volume Claims.
    enabled: true
    ##
    ## Persistant class
    # storageClass: classname
    ##
    ## Access mode:
    accessMode: ReadWriteOnce

## Configuration values for the Redis dependency.
## ref: https://github.com/kubernetes/charts/blob/master/stable/redis/README.md
redis:
  ##
  ## Use the redis chart dependency.
  ## Set to false if bringing your own redis.
  enabled: true
  ##
  ## If you are bringing your own redis, you can set the host in redisHost.
  ## redisHost:
  ##
  ## Redis password
  ##
  password: airflow
  ##
  ## Master configuration
  master:
    ##
    ## Image configuration
    # image:
    ##
    ## docker registry secret names (list)
    # pullSecrets: nil
    ##
    ## Configure persistance
    persistence:
      ##
      ## Use a PVC to persist data.
      enabled: false
      ##
      ## Persistant class
      # storageClass: classname
      ##
      ## Access mode:
      accessMode: ReadWriteOnce
  ##
  ## Disable cluster management by default.
  cluster:
    enabled: false
```

</details>

---

# Airflow / Celery

[Airflow](https://airflow.apache.org/) is a platform to programmatically author, schedule and
monitor workflows.

## Install Chart

To install the Airflow Chart into your Kubernetes cluster :

```bash
helm install --namespace "airflow" --name "airflow" stable/airflow
```

After installation succeeds, you can get a status of Chart

```bash
helm status "airflow"
```

If you want to delete your Chart, use this command:

```bash
helm delete  --purge "airflow"
```

### Helm ingresses

The Chart provides ingress configuration to allow customization the installation by adapting
the `values.yaml` depending on your setup.
Please read the comments in the `values.yaml` file for more details on how to configure your reverse
proxy or load balancer.

### Chart Prefix

This Helm automatically prefixes all names using the release name to avoid collisions.

### URL prefix

This chart exposes 2 endpoints:

- Airflow Web UI
- Flower, a debug UI for Celery

Both can be placed either at the root of a domain or at a sub path, for example:

```
http://mycompany.com/airflow/
http://mycompany.com/airflow/flower
```

NOTE: Mounting the Airflow UI under a subpath requires an airflow version >= 2.0.x. For the moment
(June 2018) this is **not** available on official package, you will have to use an image where
airflow has been updated to its current HEAD. You can use the following image:
`stibbons31/docker-airflow-dev:2.0dev`. It is rebase regularly on top of the `puckel/docker-airflow`
image.

Please also note that the Airflow UI and Flower do not behave the same:

- Airflow Web UI behaves transparently, to configure it one just needs to specify the
  `ingress.web.path` value.
- Flower cannot handle this scheme directly and requires a URL rewrite mechanism in front
  of it. In short, it is able to generate the right URLs in the returned HTML file but cannot
  respond to these URL. It is commonly found in software that wasn't intended to work under
  something else than a root URL or localhost port. To use it, see the `values.yaml` for how
  to configure your ingress controller to rewrite the URL (or "strip" the prefix path).

  Note: unreleased Flower (as of June 2018) does not need the prefix strip feature anymore. It is
  integrated in `docker-airflow-dev:2.0dev` image.

### Airflow configuration

`airflow.cfg` configuration can be changed by defining environment variables in the following form:
`AIRFLOW__<section>__<key>`.

See the
[Airflow documentation for more information](http://airflow.readthedocs.io/en/latest/configuration.html?highlight=__CORE__#setting-configuration-options)

This helm chart allows you to add these additional settings with the value key `airflow.config`.
You can also add generic environment variables such as proxy or private pypi:

```yaml
airflow:
  config:
    AIRFLOW__CORE__EXPOSE_CONFIG: True
    PIP_INDEX_URL: http://pypi.mycompany.com/
    PIP_TRUSTED_HOST: pypi.mycompany.com
    HTTP_PROXY: http://proxy.mycompany.com:1234
    HTTPS_PROXY: http://proxy.mycompany.com:1234
```

If you are using a private image for your dags (see [Embedded Dags](#embedded-dags))
or for use with the KubernetesPodOperator (available in version 1.10.0), then add
an image pull secret to the airflow config:

```yaml
airflow:
  image:
    pullSecret: my-docker-repo-secret
```

### Airflow connections

Connections define how your Airflow instance connects to environment and 3rd party service providers.
This helm chart allows you to define your own connections at the time of Airflow initialization.
For each connection the id and the type has to be defined. All other properties are optional.

Example:

```yaml
airflow:
  connections:
    - id: my_aws
      type: aws
      extra: '{"aws_access_key_id": "**********", "aws_secret_access_key": "***", "region_name":"eu-central-1"}'
```

Note: As connections may require to include sensitive data - the resulting script is stored encrypted in a kubernetes secret and mounted into the airflow scheduler container. It is probably wise not to put connection data in the default values.yaml and instead create an encrypted my-secret-values.yaml. this way it can be decrypted before the installation and passed to helm with -f <my-secret-values.yaml>

### Worker Statefulset

Celery workers uses StatefulSet.
It is used to freeze their DNS using a Kubernetes Headless Service, and allow the webserver to
requests the logs from each workers individually.
This requires to expose a port (8793) and ensure the pod DNS is accessible to the web server pod,
which is why StatefulSet is for.

#### Worker secrets

You can add kubernetes secrets which will be mounted as volumes on the worker nodes
at `secretsDir/<secret name>`.

```yaml
workers:
  secretsDir: /var/airflow/secrets
  secrets:
    - redshift-user
    - redshift-password
    - elasticsearch-user
    - elasticsearch-password
```

With the above configuration, you could read the `redshift-user` password
from within a dag or other function using:

```python
import os
from pathlib import Path

def get_secret(secret_name):
    secrets_dir = Path('/var/airflow/secrets')
    secret_path = secrets_dir / secret_name
    assert secret_path.exists(), f'could not find {secret_name} at {secret_path}'
    secret_data = secret_path.read_text().strip()
    return secret_data

redshift_user = get_secret('redshift-user')
```

To create a secret, you can use:

```bash
$ kubectl create secret generic redshift-user --from-file=redshift-user=~/secrets/redshift-user.txt
```

Where `redshift-user.txt` contains the user secret as a single text string.

### Use precreated secret for airflow secrets or environment variables

You can use a precreated secret for the connection credentials, or general environment variables. To do
so specify in values.yaml `existingAirflowSecret`, where the value is the name of the secret which has
postgresUser, postgresPassword, and redisPassword etc. is defined. If not specified, it will fall back to using
`secrets.yaml` to store the connection credentials by default.

Map each specific secret to specific environment variables in your values.yaml. Where envVar is the airflow environment
variable to populate and secretKey is the key that contains your secret value in your kubernetes secret:

```yaml
existingAirflowSecret: my-airflow-secrets
airflow:
  secretsMapping:
    - envVar: AIRFLOW__LDAP__BIND_PASSWORD
      secretKey: ldapBindPassword

    - envVar: POSTGRES_USER
      secretKey: airflowPostgresUser

    - envVar: POSTGRES_PASSWORD
      secretKey: airflowPostgresPassword

    - envVar: REDIS_PASSWORD
      secretKey: airflowRedisPassword
```

### Local binaries

Please note a folder `~/.local/bin` will be automatically created and added to the PATH so that
Bash operators can use command line tools installed by `pip install --user` for instance.

## Installing dependencies

Add a `requirements.txt` file at the root of your DAG project (`dags.path` entry at `values.yaml`) and they will be automatically installed. That works for both shared persistent volume and init-container deployment strategies (see below).

## DAGs Deployment

Several options are provided for synchronizing your Airflow DAGs.

### Mount a Shared Persistent Volume

You can store your DAG files on an external volume, and mount this volume into the relevant Pods
(scheduler, web, worker). In this scenario, your CI/CD pipeline should update the DAG files in the
PV.

Since all Pods should have the same collection of DAG files, it is recommended to create just one PV
that is shared. This ensures that the Pods are always in sync about the DagBag.

This is controlled by setting `persistence.enabled=true`. You will have to ensure yourself the
PVC are shared properly between your pods:

- If you are on AWS, you can use [Elastic File System (EFS)](https://aws.amazon.com/efs/).
- If you are on Azure, you can use
  [Azure File Storage (AFS)](https://docs.microsoft.com/en-us/azure/aks/azure-files-dynamic-pv).

To share a PV with multiple Pods, the PV needs to have accessMode 'ReadOnlyMany' or 'ReadWriteMany'.

### Use init-container

If you enable set `dags.init_container.enabled=true`, the pods will try upon startup to fetch the
git repository defined by `dags.git_repo`, on branch `dags.git_branch` as DAG folder.

This is the easiest way of deploying your DAGs to Airflow.

If you are using a private Git repo, you can set `dags.gitSecret` to the name of a secret you created containing private keys and a `known_hosts` file.

For example, this will create a secret named `my-git-secret` from your ed25519 key and known_hosts file stored in your home directory: `kubectl create secret generic my-git-secret --from-file=id_ed25519=~/.ssh/id_ed25519 --from-file=known_hosts=~/.ssh/known_hosts --from-file=id_id_ed25519.pub=~/.ssh/id_ed25519.pub`

### Embedded DAGs

If you want more control on the way you deploy your DAGs, you can use embedded DAGs, where DAGs
are burned inside the Docker container deployed as Scheduler and Workers.

Be aware this requires more tooling than using shared PVC, or init-container:

- your CI/CD should be able to build a new docker image each time your DAGs are updated.
- your CI/CD should be able to control the deployment of this new image in your kubernetes cluster

Example of procedure:

- Fork the [puckel/docker-airflow](https://github.com/puckel/docker-airflow) repository
- Place your DAG inside the `dags` folder of the repository, and ensure your Python dependencies
  are well installed (for example consuming a `requirements.txt` in your `Dockerfile`)
- Update the value of `airflow.image` in your `values.yaml` and deploy on your Kubernetes cluster

## Logs

You can store Airflow logs on an external volume and mount this volume inside Airflow pods.

This is useful when running the Kubernetes executor to centralize logs across the
Airflow UI, scheduler, and kubernetes worker pods, which allows for viewing worker log output
in the airflow UI.

This is controlled by the `logsPersistence.enabled` setting.

Refer to the `Mount a Shared Persistent Volume` section above for details on using persistent volumes.

## Helm chart Configuration

The following table lists the configurable parameters of the Airflow chart and their default values.

| Parameter                                | Description                                             | Default                   |
| ---------------------------------------- | ------------------------------------------------------- | ------------------------- |
| `airflow.fernetKey`                      | Ferney key (see `values.yaml` for example)              | (auto generated)          |
| `airflow.service.type`                   | services type                                           | `ClusterIP`               |
| `airflow.executor`                       | the executor to run                                     | `Celery`                  |
| `airflow.initRetryLoop`                  | max number of retries during container init             |                           |
| `airflow.image.repository`               | Airflow docker image                                    | `puckel/docker-airflow`   |
| `airflow.image.tag`                      | Airflow docker tag                                      | `1.10.0-4`                |
| `airflow.image.pullPolicy`               | Image pull policy                                       | `IfNotPresent`            |
| `airflow.image.pullSecret`               | Image pull secret                                       |                           |
| `airflow.schedulerNumRuns`               | -1 to loop indefinitively, 1 to restart after each exec |                           |
| `airflow.webReplicas`                    | how many replicas for web server                        | `1`                       |
| `airflow.config`                         | custom airflow configuration env variables              | `{}`                      |
| `airflow.podDisruptionBudget`            | control pod disruption budget                           | `{'maxUnavailable': 1}`   |
| `airflow.secretsMapping`                 | override any environment variable with a secret         |                           |
| `workers.enabled`                        | enable workers                                          | `true`                    |
| `workers.replicas`                       | number of workers pods to launch                        | `1`                       |
| `workers.resources`                      | custom resource configuration for worker pod            | `{}`                      |
| `workers.celery.instances`               | number of parallel celery tasks per worker              | `1`                       |
| `workers.pod.annotations`                | annotations for the worker pods                         | `{}`                      |
| `workers.secretsDir`                     | directory in which to mount secrets on worker nodes     | /var/airflow/secrets      |
| `workers.secrets`                        | secrets to mount as volumes on worker nodes             | []                        |
| `existingAirflowSecret`                  | secret to use for postgres and redis connection         |                           |
| `ingress.enabled`                        | enable ingress                                          | `false`                   |
| `ingress.web.host`                       | hostname for the webserver ui                           | ""                        |
| `ingress.web.path`                       | path of the werbserver ui (read `values.yaml`)          | ``                        |
| `ingress.web.annotations`                | annotations for the web ui ingress                      | `{}`                      |
| `ingress.web.tls.enabled`                | enables TLS termination at the ingress                  | `false`                   |
| `ingress.web.tls.secretName`             | name of the secret containing the TLS certificate & key | ``                        |
| `ingress.flower.host`                    | hostname for the flower ui                              | ""                        |
| `ingress.flower.path`                    | path of the flower ui (read `values.yaml`)              | ``                        |
| `ingress.flower.livenessPath`            | path to the liveness probe (read `values.yaml`)         | `/`                       |
| `ingress.flower.annotations`             | annotations for the web ui ingress                      | `{}`                      |
| `ingress.flower.tls.enabled`             | enables TLS termination at the ingress                  | `false`                   |
| `ingress.flower.tls.secretName`          | name of the secret containing the TLS certificate & key | ``                        |
| `persistence.enabled`                    | enable persistence storage for DAGs                     | `false`                   |
| `persistence.existingClaim`              | if using an existing claim, specify the name here       | `nil`                     |
| `persistence.storageClass`               | Persistent Volume Storage Class                         | (undefined)               |
| `persistence.accessMode`                 | PVC access mode                                         | `ReadWriteOnce`           |
| `persistence.size`                       | Persistant storage size request                         | `1Gi`                     |
| `logsPersistence.enabled`                | enable persistent storage for logs                      | `false`                   |
| `logsPersistence.existingClaim`          | if using an existing claim, specify the name here       | `nil`                     |
| `logsPersistence.storageClass`           | Persistent Volume Storage Class                         | (undefined)               |
| `logsPersistence.accessMode`             | PVC access mode                                         | `ReadWriteOnce`           |
| `logsPersistence.size`                   | Persistant storage size request                         | `1Gi`                     |
| `dags.doNotPickle`                       | should the scheduler disable DAG pickling               | `false`                   |
| `dags.path`                              | mount path for persistent volume                        | `/usr/local/airflow/dags` |
| `dags.initContainer.enabled`             | Fetch the source code when the pods starts              | `false`                   |
| `dags.initContainer.image.repository`    | Init container Docker image.                            | `alpine/git`              |
| `dags.initContainer.image.tag`           | Init container Docker image tag.                        | `1.0.4`                   |
| `dags.initContainer.installRequirements` | auto install requirements.txt deps                      | `true`                    |
| `dags.git.url`                           | url to clone the git repository                         | nil                       |
| `dags.git.ref`                           | branch name, tag or sha1 to reset to                    | `master`                  |
| `dags.git.secret`                        | name of a secret containing an ssh deploy key           | nil                       |
| `logs.path`                              | mount path for logs persistent volume                   | `/usr/local/airflow/logs` |
| `rbac.create`                            | create RBAC resources                                   | `true`                    |
| `serviceAccount.create`                  | create a service account                                | `true`                    |
| `serviceAccount.name`                    | the service account name                                | ``                        |
| `postgresql.enabled`                     | create a postgres server                                | `true`                    |
| `postgresql.uri`                         | full URL to custom postgres setup                       | (undefined)               |
| `postgresql.portgresHost`                | PostgreSQL Hostname                                     | (undefined)               |
| `postgresql.postgresUser`                | PostgreSQL User                                         | `postgres`                |
| `postgresql.postgresPassword`            | PostgreSQL Password                                     | `airflow`                 |
| `postgresql.postgresDatabase`            | PostgreSQL Database name                                | `airflow`                 |
| `postgresql.persistence.enabled`         | Enable Postgres PVC                                     | `true`                    |
| `postgresql.persistance.storageClass`    | Persistant class                                        | (undefined)               |
| `postgresql.persistance.accessMode`      | Access mode                                             | `ReadWriteOnce`           |
| `redis.enabled`                          | Create a Redis cluster                                  | `true`                    |
| `redis.redisHost`                        | Redis Hostname                                          | (undefined)               |
| `redis.password`                         | Redis password                                          | `airflow`                 |
| `redis.master.persistence.enabled`       | Enable Redis PVC                                        | `false`                   |
| `redis.cluster.enabled`                  | enable master-slave cluster                             | `false`                   |

Full and up-to-date documentation can be found in the comments of the `values.yaml` file.
