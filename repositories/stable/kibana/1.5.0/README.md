# `@helm-charts/stable-kibana`

Kibana is an open source data visualization plugin for Elasticsearch

| Field               | Value  |
| ------------------- | ------ |
| Repository Name     | stable |
| Chart Name          | kibana |
| Chart Version       | 1.5.0  |
| NPM Package Version | 0.1.0  |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
image:
  repository: 'docker.elastic.co/kibana/kibana-oss'
  tag: '6.6.0'
  pullPolicy: 'IfNotPresent'

commandline:
  args: []

env:
  {}
  # All Kibana configuration options are adjustable via env vars.
  # To adjust a config option to an env var uppercase + replace `.` with `_`
  # Ref: https://www.elastic.co/guide/en/kibana/current/settings.html
  #
  # ELASTICSEARCH_URL: http://elasticsearch-client:9200
  # SERVER_PORT: 5601
  # LOGGING_VERBOSE: "true"
  # SERVER_DEFAULTROUTE: "/app/kibana"

files:
  kibana.yml:
    ## Default Kibana configuration from kibana-docker.
    server.name: kibana
    server.host: '0'
    elasticsearch.url: http://elasticsearch:9200

    ## Custom config properties below
    ## Ref: https://www.elastic.co/guide/en/kibana/current/settings.html
    # server.port: 5601
    # logging.verbose: "true"
    # server.defaultRoute: "/app/kibana"

deployment:
  annotations: {}

service:
  type: ClusterIP
  # clusterIP: None
  # portName: kibana-svc
  externalPort: 443
  internalPort: 5601
  # authProxyPort: 5602 To be used with authProxyEnabled and a proxy extraContainer
  ## External IP addresses of service
  ## Default: nil
  ##
  # externalIPs:
  # - 192.168.0.1
  #
  ## LoadBalancer IP if service.type is LoadBalancer
  ## Default: nil
  ##
  # loadBalancerIP: 10.2.2.2
  annotations:
    {}
    # Annotation example: setup ssl with aws cert when service.type is LoadBalancer
    # service.beta.kubernetes.io/aws-load-balancer-ssl-cert: arn:aws:acm:us-east-1:EXAMPLE_CERT
  labels:
    {}
    ## Label example: show service URL in `kubectl cluster-info`
    # kubernetes.io/cluster-service: "true"
  ## Limit load balancer source ips to list of CIDRs (where available)
  # loadBalancerSourceRanges: []

ingress:
  enabled: false
  # hosts:
  # - kibana.localhost.localdomain
  # - localhost.localdomain/kibana
  # annotations:
  #   kubernetes.io/ingress.class: nginx
  #   kubernetes.io/tls-acme: "true"
  # tls:
  # - secretName: chart-example-tls
  #   hosts:
  #     - chart-example.local

serviceAccount:
  # Specifies whether a service account should be created
  create: false
  # The name of the service account to use.
  # If not set and create is true, a name is generated using the fullname template
  # If set and create is false, the service account must be existing
  name:

livenessProbe:
  enabled: false
  initialDelaySeconds: 30
  timeoutSeconds: 10

readinessProbe:
  enabled: false
  initialDelaySeconds: 30
  timeoutSeconds: 10
  periodSeconds: 10
  successThreshold: 5

# Enable an authproxy. Specify container in extraContainers
authProxyEnabled: false

extraContainers: |
# - name: proxy
#   image: quay.io/gambol99/keycloak-proxy:latest
#   args:
#     - --resource=uri=/*
#     - --discovery-url=https://discovery-url
#     - --client-id=client
#     - --client-secret=secret
#     - --listen=0.0.0.0:5602
#     - --upstream-url=http://127.0.0.1:5601
#   ports:
#     - name: web
#       containerPort: 9090

extraVolumeMounts: []

extraVolumes: []

resources:
  {}
  # limits:
  #   cpu: 100m
  #   memory: 300Mi
  # requests:
  #   cpu: 100m
  #   memory: 300Mi

priorityClassName: ''

# Affinity for pod assignment
# Ref: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#affinity-and-anti-affinity
# affinity: {}

# Tolerations for pod assignment
# Ref: https://kubernetes.io/docs/concepts/configuration/taint-and-toleration/
tolerations: []

# Node labels for pod assignment
# Ref: https://kubernetes.io/docs/user-guide/node-selection/
nodeSelector: {}

podAnnotations: {}
replicaCount: 1
revisionHistoryLimit: 3

# To export a dashboard from a running Kibana 6.3.x use:
# curl --user <username>:<password> -XGET https://kibana.yourdomain.com:5601/api/kibana/dashboards/export?dashboard=<some-dashboard-uuid> > my-dashboard.json
# A dashboard is defined by a name and a string with the json payload or the download url
dashboardImport:
  timeout: 60
  xpackauth:
    enabled: false
    username: myuser
    password: mypass
  dashboards:
    {}
    # k8s: https://raw.githubusercontent.com/monotek/kibana-dashboards/master/k8s-fluentd-elasticsearch.json

# List of plugins to install using initContainer
# NOTE : We notice that lower resource constraints given to the chart + plugins are likely not going to work well.
plugins:
  # set to true to enable plugins installation
  enabled: false
  # set to true to remove all kibana plugins before installation
  reset: false
  # Use <plugin_name,version,url> to add/upgrade plugin
  values:
    # - elastalert-kibana-plugin,1.0.1,https://github.com/bitsensor/elastalert-kibana-plugin/releases/download/1.0.1/elastalert-kibana-plugin-1.0.1-6.4.2.zip
    # - logtrail,0.1.30,https://github.com/sivasamyk/logtrail/releases/download/v0.1.30/logtrail-6.4.2-0.1.30.zip
    # - other_plugin

persistentVolumeClaim:
  # set to true to use pvc
  enabled: false
  # set to true to use you own pvc
  existingClaim: false
  annotations: {}

  accessModes:
    - ReadWriteOnce
  size: '5Gi'
  ## If defined, storageClassName: <storageClass>
  ## If set to "-", storageClassName: "", which disables dynamic provisioning
  ## If undefined (the default) or set to null, no storageClassName spec is
  ##   set, choosing the default provisioner.  (gp2 on AWS, standard on
  ##   GKE, AWS & OpenStack)
  ##
  # storageClass: "-"

# default security context
securityContext:
  enabled: false
  allowPrivilegeEscalation: false
  runAsUser: 1000
  fsGroup: 2000

extraConfigMapMounts:
  []
  # - name: logtrail-configs
  #   configMap: kibana-logtrail
  #   mountPath: /usr/share/kibana/plugins/logtrail/logtrail.json
  #   subPath: logtrail.json

# Add your own init container or uncomment and modify the given example.
initContainers:
  {}
  ## Don't start kibana till Elasticsearch is reachable.
  ## Ensure that it is available at http://elasticsearch:9200
  ##
  # es-check:  # <- will be used as container name
  #   image: "appropriate/curl:latest"
  #   imagePullPolicy: "IfNotPresent"
  #   command:
  #     - "/bin/sh"
  #     - "-c"
  #     - |
  #       is_down=true
  #       while "$is_down"; do
  #         if curl -sSf --fail-early --connect-timeout 5 http://elasticsearch:9200; then
  #           is_down=false
  #         else
  #           sleep 5
  #         fi
  #       done
```

</details>

---

# kibana

[kibana](https://github.com/elastic/kibana) is your window into the Elastic Stack. Specifically, it's an open source (Apache Licensed), browser-based analytics and search dashboard for Elasticsearch.

## TL;DR;

```console
$ helm install stable/kibana
```

## Introduction

This chart bootstraps a kibana deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Installing the Chart

To install the chart with the release name `my-release`:

```console
$ helm install stable/kibana --name my-release
```

The command deploys kibana on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

NOTE : We notice that lower resource constraints given to the chart + plugins are likely not going to work well.

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```console
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the kibana chart and their default values.

| Parameter                                  | Description                                                                                                              | Default                               |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------ | ------------------------------------- |
| `affinity`                                 | node/pod affinities                                                                                                      | None                                  |
| `env`                                      | Environment variables to configure Kibana                                                                                | `{}`                                  |
| `files`                                    | Kibana configuration files                                                                                               | None                                  |
| `livenessProbe.enabled`                    | livenessProbe to be enabled?                                                                                             | `false`                               |
| `livenessProbe.initialDelaySeconds`        | number of seconds                                                                                                        | 30                                    |
| `livenessProbe.timeoutSeconds`             | number of seconds                                                                                                        | 10                                    |
| `image.pullPolicy`                         | Image pull policy                                                                                                        | `IfNotPresent`                        |
| `image.repository`                         | Image repository                                                                                                         | `docker.elastic.co/kibana/kibana-oss` |
| `image.tag`                                | Image tag                                                                                                                | `6.6.0`                               |
| `image.pullSecrets`                        | Specify image pull secrets                                                                                               | `nil`                                 |
| `commandline.args`                         | add additional commandline args                                                                                          | `nil`                                 |
| `ingress.enabled`                          | Enables Ingress                                                                                                          | `false`                               |
| `ingress.annotations`                      | Ingress annotations                                                                                                      | None:                                 |
| `ingress.hosts`                            | Ingress accepted hostnames                                                                                               | None:                                 |
| `ingress.tls`                              | Ingress TLS configuration                                                                                                | None:                                 |
| `nodeSelector`                             | node labels for pod assignment                                                                                           | `{}`                                  |
| `podAnnotations`                           | annotations to add to each pod                                                                                           | `{}`                                  |
| `replicaCount`                             | desired number of pods                                                                                                   | `1`                                   |
| `revisionHistoryLimit`                     | revisionHistoryLimit                                                                                                     | `3`                                   |
| `serviceAccountName`                       | DEPRECATED: use serviceAccount.name                                                                                      | `nil`                                 |
| `serviceAccount.create`                    | create a serviceAccount to run the pod                                                                                   | `false`                               |
| `serviceAccount.name`                      | name of the serviceAccount to create                                                                                     | `kibana.fullname`                     |
| `authProxyEnabled`                         | enables authproxy. Create container in extracontainers                                                                   | `false`                               |
| `extraContainers`                          | Sidecar containers to add to the kibana pod                                                                              | `{}`                                  |
| `extraVolumeMounts`                        | additional volumemounts for the kibana pod                                                                               | `[]`                                  |
| `extraVolumes`                             | additional volumes to add to the kibana pod                                                                              | `[]`                                  |
| `resources`                                | pod resource requests & limits                                                                                           | `{}`                                  |
| `priorityClassName`                        | priorityClassName                                                                                                        | `nil`                                 |
| `service.externalPort`                     | external port for the service                                                                                            | `443`                                 |
| `service.internalPort`                     | internal port for the service                                                                                            | `4180`                                |
| `service.portName`                         | service port name                                                                                                        | None:                                 |
| `service.authProxyPort`                    | port to use when using sidecar authProxy                                                                                 | None:                                 |
| `service.externalIPs`                      | external IP addresses                                                                                                    | None:                                 |
| `service.loadBalancerIP`                   | Load Balancer IP address                                                                                                 | None:                                 |
| `service.loadBalancerSourceRanges`         | Limit load balancer source IPs to list of CIDRs (where available))                                                       | `[]`                                  |
| `service.nodePort`                         | NodePort value if service.type is NodePort                                                                               | None:                                 |
| `service.type`                             | type of service                                                                                                          | `ClusterIP`                           |
| `service.clusterIP`                        | static clusterIP or None for headless services                                                                           | None:                                 |
| `service.annotations`                      | Kubernetes service annotations                                                                                           | None:                                 |
| `service.labels`                           | Kubernetes service labels                                                                                                | None:                                 |
| `tolerations`                              | List of node taints to tolerate                                                                                          | `[]`                                  |
| `dashboardImport.timeout`                  | Time in seconds waiting for Kibana to be in green overall state                                                          | `60`                                  |
| `dashboardImport.xpackauth.enabled`        | Enable Xpack auth                                                                                                        | `false`                               |
| `dashboardImport.xpackauth.username`       | Optional Xpack username                                                                                                  | `myuser`                              |
| `dashboardImport.xpackauth.password`       | Optional Xpack password                                                                                                  | `mypass`                              |
| `dashboardImport.dashboards`               | Dashboards                                                                                                               | `{}`                                  |
| `plugins.enabled`                          | Enable installation of plugins.                                                                                          | `false`                               |
| `plugins.reset`                            | Optional : Remove all installed plugins before installing all new ones                                                   | `false`                               |
| `plugins.values`                           | List of plugins to install. Format <pluginName,version,URL> with URLs pointing to zip files of Kibana plugins to install | None:                                 |
| `persistentVolumeClaim.enabled`            | Enable PVC for plugins                                                                                                   | `false`                               |
| `persistentVolumeClaim.existingClaim`      | Use your own PVC for plugins                                                                                             | `false`                               |
| `persistentVolumeClaim.annotations`        | Add your annotations for the PVC                                                                                         | `{}`                                  |
| `persistentVolumeClaim.accessModes`        | Acces mode to the PVC                                                                                                    | `ReadWriteOnce`                       |
| `persistentVolumeClaim.size`               | Size of the PVC                                                                                                          | `5Gi`                                 |
| `persistentVolumeClaim.storageClass`       | Storage class of the PVC                                                                                                 | None:                                 |
| `readinessProbe.enabled`                   | readinessProbe to be enabled?                                                                                            | `false`                               |
| `readinessProbe.initialDelaySeconds`       | number of seconds                                                                                                        | 30                                    |
| `readinessProbe.timeoutSeconds`            | number of seconds                                                                                                        | 10                                    |
| `readinessProbe.periodSeconds`             | number of seconds                                                                                                        | 10                                    |
| `readinessProbe.successThreshold`          | number of successes                                                                                                      | 5                                     |
| `securityContext.enabled`                  | Enable security context (should be true for PVC)                                                                         | `false`                               |
| `securityContext.allowPrivilegeEscalation` | Allow privilege escalation                                                                                               | `false`                               |
| `securityContext.runAsUser`                | User id to run in pods                                                                                                   | `1000`                                |
| `securityContext.fsGroup`                  | fsGroup id to run in pods                                                                                                | `2000`                                |
| `extraConfigMapMounts`                     | Additional configmaps to be mounted                                                                                      | `[]`                                  |
| `deployment.annotations`                   | Annotations for deployment                                                                                               | `{}`                                  |
| `initContainers`                           | Init containers to add to the kibana deployment                                                                          | `{}`                                  |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

- The Kibana configuration files config properties can be set through the `env` parameter too.
- All the files listed under this variable will overwrite any existing files by the same name in kibana config directory.
- Files not mentioned under this variable will remain unaffected.

```console
$ helm install stable/kibana --name my-release \
  --set=image.tag=v0.0.2,resources.limits.cpu=200m
```

Alternatively, a YAML file that specifies the values for the above parameters can be provided while installing the chart. For example :

```console
$ helm install stable/kibana --name my-release -f values.yaml
```

> **Tip**: You can use the default [values.yaml](values.yaml)

## Dasboard import

- A dashboard for dashboardImport.dashboards can be a JSON or a download url to a JSON file.
