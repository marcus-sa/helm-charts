# `@helm-charts/stable-grafana`

The leading tool for querying and visualizing time series and metrics.

| Field               | Value   |
| ------------------- | ------- |
| Repository Name     | stable  |
| Chart Name          | grafana |
| Chart Version       | 0.4.5   |
| NPM Package Version | 0.1.0   |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
server:
  ## Grafana Pod annotations:
  ##
  # annotations:
  #   iam.amazonaws.com/role: grafana

  ## Grafana Docker image
  ##
  image: 'grafana/grafana:latest'

  nodeSelector: {}
  tolerations: []

  ingress:
    ## If true, Grafana Ingress will be created
    ##
    enabled: false

    ## Grafana Ingress annotations
    ##
    # annotations:
    #   kubernetes.io/ingress.class: nginx
    #   kubernetes.io/tls-acme: 'true'
    ## Grafana Ingress hostnames
    ## Must be provided if Ingress is enabled
    ##
    # hosts:
    #   - grafana.domain.com
    ## Grafana Ingress TLS configuration
    ## Secrets must be manually created in the namespace
    ##
    # tls:
    #   - secretName: grafana-server-tls
    #     hosts:
    #       - grafana.domain.com

  ## Grafana container name
  ##
  name: grafana

  adminUser: 'admin'
  # adminPassword: "admin"

  ## Global imagePullPolicy
  ## Default: 'Always' if image tag is 'latest', else 'IfNotPresent'
  ## Ref: http://kubernetes.io/docs/user-guide/images/#pre-pulling-images
  ##
  # imagePullPolicy:

  # Persist data to a persitent volume
  persistentVolume:
    ## If true, Grafana will create a Persistent Volume Claim
    ## If false, use emptyDir
    ##
    enabled: true

    ## Grafana data Persistent Volume access modes
    ## Must match those of existing PV or dynamic provisioner
    ## Ref: http://kubernetes.io/docs/user-guide/persistent-volumes/
    ##
    accessModes:
      - ReadWriteOnce

    ## Grafana data Persistent Volume annotations
    ##
    annotations: {}

    ## Grafana data Persistent Volume existing claim name
    ## Requires server.persistentVolume.enabled: true
    ## If defined, PVC must be created manually before volume will be bound
    existingClaim: ''

    ## Grafana data Persistent Volume size
    ## Default: 1Gi
    ##
    size: 1Gi

    ## grafana data Persistent Volume Storage Class
    ## If defined, storageClassName: <storageClass>
    ## If set to "-", storageClassName: "", which disables dynamic provisioning
    ## If undefined (the default) or set to null, no storageClassName spec is
    ##   set, choosing the default provisioner.  (gp2 on AWS, standard on
    ##   GKE, AWS & OpenStack)
    ##
    # storageClass: "-"

    ## Subdirectory of data Persistent Volume to mount
    ## Useful if the volume's root directory is not empty
    ##
    subPath: ''

  ## Grafana resource requests and limits
  ## Ref: http://kubernetes.io/docs/user-guide/compute-resources/
  ##
  resources:
    # limits:
    #   cpu: 500m
    #   memory: 512Mi
    requests:
      cpu: 100m
      memory: 100Mi

  ## Grafana service
  service:
    ## Grafana service annotations
    ##
    annotations: {}

    ## Grafana service type
    ##
    type: ClusterIP

    ## Grafana service port
    ##
    httpPort: 80

    ## Load balancer IP address
    ## Is not required, but allows for static address with
    ## serviceType LoadBalancer.
    ## If not supported by cloud provider, this field is ignored.
    ## Default: nil
    ##
    # loadBalancerIP: 130.211.x.x
    ## This will restrict traffic through the cloud-provider load-balancer
    ## to the specified client IPs.
    ## If not supported by cloud provider, this field is ignored.
    ## Default: nil
    ##
    # loadBalancerSourceRanges:
    #   - 0.0.0.0/0
    ## nodePort port number
    ## Is not required, but allows for static port assignment with
    ## serviceType NodePort.
    ## Default: nil
    # nodePort: 30000

  ## Grafana local config path
  ## Default '/etc/grafana'
  ##
  # configLocalPath: /etc/grafana

  ## Grafana local dashboards path
  ## Default: '/var/lib/grafana/dashboards'
  ##
  # dashboardLocalPath: /var/lib/grafana/dashboards

  ## Grafana local data storage path
  ## Default: '/var/lib/grafana/data'
  ##
  # storageLocalPath: /var/lib/grafana/data

  ## Grafana Pod termination grace period
  ## Default: 300s (5m)
  ##
  # terminationGracePeriodSeconds: 300

  ## Pass the plugins you want installed as a comma seperated list.
  ## This will pass each plugin name to `grafana-cli plugins install ${plugin}`.
  ## Ref: https://github.com/grafana/grafana-docker#installing-plugins-for-grafana-3
  ##
  # installPlugins:

  # Set datasource in beginning
  setDatasource:
    ## If true, an initial Grafana Datasource will be set
    ## Default: false
    ##
    enabled: false

    ## How long should it take to commit failure
    ## Default: 300
    ##
    # activeDeadlineSeconds: 300
    ## Curl Docker image
    ## Default: appropriate/curl:latest
    ##
    # image: appropriate/curl:latest
    ## This assembles how curl post into Grafana
    ## Ref1: http://docs.grafana.org/reference/http_api/#create-data-source
    ## Ref2: https://github.com/grafana/grafana/issues/1789
    ##
    # datasource:
    ## The datasource name.
    ## Default: default
    # name: default
    ## Type of datasource
    ## Default: prometheus
    ##
    # type: prometheus
    ## The url of the datasource. To set correctly you need to know
    ## the right datasource name and its port ahead. Check kubernetes
    ## dashboard or describe the service should fulfill the requirements.
    ## Synatx like `http://<release name>-<server name>:<port number>
    ## Default: "http://limping-tiger-server"
    ##
    # url: "http://limping-tiger-server"
    ## The name of the database at the datasource.
    ## Required parameter when used with elasticsearch, which refers to the index_name
    ## Default: <empty>
    # database:
    ## Additional JSON data to be passed to the configuration of the datasource.
    ## The JSON data is passed to curl, therefore it needs proper quoting and
    ## escaping and needs to be on a single line. For example:
    ##  '\"esVersion\": 2, \"interval\": \"Daily\", \"timeField\": \"@timestamp\"'
    # jsonData: null
    ## Specify if Grafana has to go thru proxy to reach datasource
    ## Default: proxy
    ##
    # access: proxy
    ## Specify should Grafana use this datasource as default
    ## Default: true
    ##
    # isDefault: true
    ## Specify the job policy
    ## Default: OnFailure
    ##
    # restartPolicy: OnFailure

## Grafana config file ConfigMap entry
##
serverConfigFile:
  grafana.ini: |
    ; instance_name = ${HOSTNAME}
    [paths]
    data = /var/lib/grafana/data
    logs = /var/log/grafana
    plugins = /var/lib/grafana/plugins

    [server]
    ;protocol = http
    ;http_addr =
    ;http_port = 3000
    ;domain = localhost
    ;enforce_domain = false
    ;root_url = %(protocol)s://%(domain)s:%(http_port)s/
    ;router_logging = false
    ;static_root_path = public
    ;enable_gzip = false
    ;cert_file =
    ;cert_key =

    [database]
    ;type = sqlite3
    ;host = 127.0.0.1:3306
    ;name = grafana
    ;user = root
    ;password =
    ;ssl_mode = disable
    ;path = grafana.db

    [session]
    ;provider = file
    ;provider_config = sessions
    ;cookie_name = grafana_sess
    ;cookie_secure = false
    ;session_life_time = 86400

    [analytics]
    ;reporting_enabled = true
    check_for_updates = true
    ;google_analytics_ua_id =

    [security]
    ;admin_user = admin
    ;admin_password = admin
    ;secret_key = SW2YcwTIb9zpOOhoPsMm
    ;login_remember_days = 7
    ;cookie_username = grafana_user
    ;cookie_remember_name = grafana_remember
    ;disable_gravatar = false
    ;data_source_proxy_whitelist =

    [snapshots]
    ;external_enabled = true
    ;external_snapshot_url = https://snapshots-origin.raintank.io
    ;external_snapshot_name = Publish to snapshot.raintank.io

    [users]
    ;allow_sign_up = true
    ;allow_org_create = true
    ;auto_assign_org = true
    ;auto_assign_org_role = Viewer
    ;login_hint = email or username
    ;default_theme = dark

    [auth.anonymous]
    ;enabled = false
    ;org_name = Main Org.
    ;org_role = Viewer

    [auth.github]
    ;enabled = false
    ;allow_sign_up = false
    ;client_id = some_id
    ;client_secret = some_secret
    ;scopes = user:email,read:org
    ;auth_url = https://github.com/login/oauth/authorize
    ;token_url = https://github.com/login/oauth/access_token
    ;api_url = https://api.github.com/user
    ;team_ids =
    ;allowed_organizations =

    [auth.google]
    ;enabled = false
    ;allow_sign_up = false
    ;client_id = some_client_id
    ;client_secret = some_client_secret
    ;scopes = https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email
    ;auth_url = https://accounts.google.com/o/oauth2/auth
    ;token_url = https://accounts.google.com/o/oauth2/token
    ;api_url = https://www.googleapis.com/oauth2/v1/userinfo
    ;allowed_domains =

    [auth.proxy]
    ;enabled = false
    ;header_name = X-WEBAUTH-USER
    ;header_property = username
    ;auto_sign_up = true

    [auth.basic]
    ;enabled = true

    [auth.ldap]
    ;enabled = false
    ;config_file = /etc/grafana/ldap.toml

    [smtp]
    ;enabled = false
    ;host = localhost:25
    ;user =
    ;password =
    ;cert_file =
    ;key_file =
    ;skip_verify = false
    ;from_address = admin@grafana.localhost

    [emails]
    ;welcome_email_on_sign_up = false

    [log]
    mode = console
    level = info

    [log.console]
    ;level =
    ;format = console

    [event_publisher]
    ;enabled = false
    ;rabbitmq_url = amqp://localhost/
    ;exchange = grafana_events

    [dashboards.json]
    enabled = true
    path = /var/lib/grafana/dashboards

    [metrics]
    ;enabled           = true
    ;interval_seconds  = 10

    ; [metrics.graphite]
    ; address = localhost:2003
    ; prefix = prod.grafana.%(instance_name)s.

    [grafana_net]
    url = https://grafana.net

## Grafana dashboard files ConfigMap entries
## If you'd like to preinstall prometheus dashboard on the same namespace as example, get it from:
##
## https://grafana.net/dashboards/2
##
## and add it below.
##
serverDashboardFiles: {}
```

</details>

---

# Grafana Helm Chart

- Installs the web dashboarding system [Grafana](http://grafana.org/)

## TL;DR;

```console
$ helm install stable/grafana
```

## Installing the Chart

To install the chart with the release name `my-release`:

```console
$ helm install --name my-release stable/grafana
```

## Uninstalling the Chart

To uninstall/delete the my-release deployment:

```console
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

| Parameter                                 | Description                                         | Default                                     |
| ----------------------------------------- | --------------------------------------------------- | ------------------------------------------- |
| `server.image`                            | Container image to run                              | grafana/grafana:latest                      |
| `server.adminUser`                        | Admin user username                                 | admin                                       |
| `server.adminPassword`                    | Admin user password                                 | Randomly generated                          |
| `server.persistentVolume.enabled`         | Create a volume to store data                       | true                                        |
| `server.persistentVolume.size`            | Size of persistent volume claim                     | 1Gi RW                                      |
| `server.persistentVolume.storageClass`    | Type of persistent volume claim                     | `nil` (uses alpha storage class annotation) |
| `server.persistentVolume.accessMode`      | ReadWriteOnce or ReadOnly                           | [ReadWriteOnce]                             |
| `server.persistentVolume.existingClaim`   | Existing persistent volume claim                    | null                                        |
| `server.persistentVolume.subPath`         | Subdirectory of pvc to mount                        | null                                        |
| `server.resources`                        | Server resource requests and limits                 | requests: {cpu: 100m, memory: 100Mi}        |
| `server.tolerations`                      | node taints to tolerate (requires Kubernetes >=1.6) | null                                        |
| `server.service.annotations`              | Service annotations                                 | null                                        |
| `server.service.httpPort`                 | Service port                                        | 80                                          |
| `server.service.loadBalancerIP`           | IP to assign to load balancer                       | null                                        |
| `server.service.loadBalancerSourceRanges` | List of IP CIDRs allowed access                     | null                                        |
| `server.service.nodePort`                 | For service type "NodePort"                         | null                                        |
| `server.service.type`                     | ClusterIP, NodePort, or LoadBalancer                | ClusterIP                                   |
| `server.setDatasource.enabled`            | Creates grafana datasource with job                 | false                                       |