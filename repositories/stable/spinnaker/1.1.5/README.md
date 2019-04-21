# `@helm-charts/stable-spinnaker`

Open source, multi-cloud continuous delivery platform for releasing software changes with high velocity and confidence.

| Field               | Value     |
| ------------------- | --------- |
| Repository Name     | stable    |
| Chart Name          | spinnaker |
| Chart Version       | 1.1.5     |
| NPM Package Version | 0.1.0     |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
halyard:
  spinnakerVersion: 1.9.1
  image:
    repository: gcr.io/spinnaker-marketplace/halyard
    tag: 1.9.1
  # Provide a config map with Hal commands that will be run the core config (storage)
  # The config map should contain a script in the config.sh key
  additionalScripts:
    enabled: false
    configMapName: my-halyard-config
    configMapKey: config.sh
    # If you'd rather do an inline script, set create to true and put the content in the data dict like you would a configmap
    create: false
    data: {}
  additionalSecrets:
    create: false
    data: {}
  additionalConfigMaps:
    create: false
    data: {}

# Define which registries and repositories you want available in your
# Spinnaker pipeline definitions
# For more info visit:
#   https://www.spinnaker.io/setup/providers/docker-registry/

# Configure your Docker registries here
dockerRegistries:
  - name: dockerhub
    address: index.docker.io
    repositories:
      - library/alpine
      - library/ubuntu
      - library/centos
      - library/nginx
# - name: gcr
#   address: https://gcr.io
#   username: _json_key
#   password: '<INSERT YOUR SERVICE ACCOUNT JSON HERE>'
#   email: 1234@5678.com

# If you don't want to put your passwords into a values file
# you can use a pre-created secret instead of putting passwords
# (specify secret name in below `dockerRegistryAccountSecret`)
# per account above with data in the format:
# <name>: <password>

# dockerRegistryAccountSecret: myregistry-secrets

kubeConfig:
  # Use this when you want to register arbitrary clusters with Spinnaker
  # Upload your ~/kube/.config to a secret
  enabled: false
  secretName: my-kubeconfig
  secretKey: config
  # List of contexts from the kubeconfig to make available to Spinnaker
  contexts:
    - default
  deploymentContext: default

# Change this if youd like to expose Spinnaker outside the cluster
ingress:
  enabled: false
  # host: spinnaker.example.org
  # annotations:
  # ingress.kubernetes.io/ssl-redirect: 'true'
  # kubernetes.io/ingress.class: nginx
  # kubernetes.io/tls-acme: "true"
  # tls:
  #  - secretName: -tls
  #    hosts:
  #      - domain.com

ingressGate:
  enabled: false
  # host: gate.spinnaker.example.org
  # annotations:
  # ingress.kubernetes.io/ssl-redirect: 'true'
  # kubernetes.io/ingress.class: nginx
  # kubernetes.io/tls-acme: "true"
  # tls:
  #  - secretName: -tls
  #    hosts:
  #      - domain.com

# spinnakerFeatureFlags is a list of Spinnaker feature flags to enable
# Ref: https://www.spinnaker.io/reference/halyard/commands/#hal-config-features-edit
# spinnakerFeatureFlags:
#   - artifacts
#   - pipeline-templates
spinnakerFeatureFlags:
  - artifacts
  - jobs

# Node labels for pod assignment
# Ref: https://kubernetes.io/docs/user-guide/node-selection/
# nodeSelector to provide to each of the Spinnaker components
nodeSelector: {}

# Redis password to use for the in-cluster redis service
# Redis is not exposed publically
redis:
  password: password
  nodeSelector: {}
  cluster:
    enabled: false
# Uncomment if you don't want to create a PVC for redis
#  master:
#    persistence:
#      enabled: false

# Minio access/secret keys for the in-cluster S3 usage
# Minio is not exposed publically
minio:
  enabled: true
  imageTag: RELEASE.2018-06-09T02-18-09Z
  serviceType: ClusterIP
  accessKey: spinnakeradmin
  secretKey: spinnakeradmin
  bucket: 'spinnaker'
  nodeSelector: {}
# Uncomment if you don't want to create a PVC for minio
#  persistence:
#    enabled: false

# Google Cloud Storage
gcs:
  enabled: false
  project: my-project-name
  bucket: '<GCS-BUCKET-NAME>'
  jsonKey: '<INSERT CLOUD STORAGE JSON HERE>'

# AWS Simple Storage Service
s3:
  enabled: false
  bucket: '<S3-BUCKET-NAME>'
  # rootFolder: "front50"
  # region: "us-east-1"
  # endpoint: ""
  # accessKey: ""
  # secretKey: ""

# Azure Storage Account
azs:
  enabled: false
#   storageAccountName: ""
#   accessKey: ""
#   containerName: "spinnaker"

rbac:
  # Specifies whether RBAC resources should be created
  create: true

serviceAccount:
  # Specifies whether a ServiceAccount should be created
  create: true
  # The name of the ServiceAccounts to use.
  # If left blank it is auto-generated from the fullname of the release
  halyardName:
  spinnakerName:
```

</details>

---

# Spinnaker Chart

[Spinnaker](http://spinnaker.io/) is an open source, multi-cloud continuous delivery platform.

## Chart Details

This chart will provision a fully functional and fully featured Spinnaker installation
that can deploy and manage applications in the cluster that it is deployed to.

Redis and Minio are used as the stores for Spinnaker state.

For more information on Spinnaker and its capabilities, see it's [documentation](http://www.spinnaker.io/docs).

## Installing the Chart

To install the chart with the release name `my-release`:

```bash
$ helm install --name my-release stable/spinnaker --timeout 600
```

Note that this chart pulls in many different Docker images so can take a while to fully install.

## Configuration

Configurable values are documented in the `values.yaml`.

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`.

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart. For example,

```bash
$ helm install --name my-release -f values.yaml stable/spinnaker
```

> **Tip**: You can use the default [values.yaml](values.yaml)

## Adding Kubernetes Clusters to Spinnaker

By default, installing the chart only registers the local cluster as a deploy target
for Spinnaker. If you want to add arbitrary clusters need to do the following:

1. Upload your kubeconfig to a secret with the key `config` in the cluster you are installing Spinnaker to.

   ```shell
   $ kubectl create secret generic --from-file=$HOME/.kube/config my-kubeconfig
   ```

1. Set the following values of the chart:

   ```yaml
   kubeConfig:
     enabled: true
     secretName: my-kubeconfig
     secretKey: config
     contexts:
       # Names of contexts available in the uploaded kubeconfig
       - my-context
     # This is the context from the list above that you would like
     # to deploy Spinnaker itself to.
     deploymentContext: my-context
   ```

## Specifying Docker Registries and Valid Images (Repositories)

Spinnaker will only give you access to Docker images that have been whitelisted, if you're using a private registry or a private repository you also need to provide credentials. Update the following values of the chart to do so:

    ```yaml
    dockerRegistries:
    - name: dockerhub
      address: index.docker.io
      repositories:
        - library/alpine
        - library/ubuntu
        - library/centos
        - library/nginx
    # - name: gcr
    #   address: https://gcr.io
    #   username: _json_key
    #   password: '<INSERT YOUR SERVICE ACCOUNT JSON HERE>'
    #   email: 1234@5678.com
    ```

You can provide passwords as a Helm value, or you can use a pre-created secret containing your registry passwords. The secret should have an item per Registry in the format: `<registry name>: <password>`. In which case you'll specify the secret to use in `dockerRegistryAccountSecret` like so:

    ```yaml
    dockerRegistryAccountSecret: myregistry-secrets
    ```

## Specifying persistent storage

Spinnaker supports [many](https://www.spinnaker.io/setup/install/storage/) persistent storage types. Currently, this chart supports the following:

- Azure Storage
- Google Cloud Storage
- Minio (local S3-compatible object store)
- Redis
- AWS S3

## Customizing your installation

### Manual

While the default installation is ready to handle your Kubernetes deployments, there are
many different integrations that you can turn on with Spinnaker. In order to customize
Spinnaker, you can use the [Halyard](https://www.spinnaker.io/reference/halyard/) command line `hal`
to edit the configuration and apply it to what has already been deployed.

Halyard has an in-cluster daemon that stores your configuration. You can exec a shell in this pod to
make and apply your changes. The Halyard daemon is configured with a persistent volume to ensure that
your configuration data persists any node failures, reboots or upgrades.

For example:

```shell
$ helm install -n cd stable/spinnaker
$ kubectl exec -it cd-spinnaker-halyard-0 bash
spinnaker@cd-spinnaker-halyard-0:/workdir$ hal version list
```

### Automated

If you have known set of commands that you'd like to run after the base config steps or if
you'd like to override some settings before the Spinnaker deployment is applied, you can enable
the `halyard.additionalScripts.enabled` flag. You will need to create a config map that contains a key
containing the `hal` commands you'd like to run. You can set the key via the config map name via `halyard.additionalScripts.configMapName` and the key via `halyard.additionalScripts.configMapKey`. The `DAEMON_ENDPOINT` environment variable can be used in your custom commands to
get a prepopulated URL that points to your Halyard daemon within the cluster. The `HAL_COMMAND` environment variable does this for you. For example:

```shell
hal --daemon-endpoint $DAEMON_ENDPOINT config security authn oauth2 enable
$HAL_COMMAND config security authn oauth2 enable
```

If you would rather the chart make the config file for you, you can set `halyard.additionalScripts.create` to `true` and then populate `halyard.additionalScripts.data.SCRIPT_NAME.sh` with the bash script you'd like to run. If you need associated configmaps or secrets you can configure those to be created as well:

```yaml
halyard:
  additionalScripts:
    create: true
    data:
      enable_oauth.sh: |-
        echo "Setting oauth2 security"
        $HAL_COMMAND config security authn oauth2 enable
  additionalSecrets:
    create: true
    data:
      password.txt: aHVudGVyMgo=
  additionalConfigMaps:
    create: true
    data:
      metadata.xml: <xml><username>admin</username></xml>
```
