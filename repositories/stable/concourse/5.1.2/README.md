# `@helm-charts/stable-concourse`

Concourse is a simple and scalable CI system.

| Field               | Value     |
| ------------------- | --------- |
| Repository Name     | stable    |
| Chart Name          | concourse |
| Chart Version       | 5.1.2     |
| NPM Package Version | 0.1.0     |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
## Default values for Concourse Helm Chart.
## This is a YAML-formatted file.
## Declare variables to be passed into your templates.

## Provide a name in place of `concourse` for `app:` labels
##
nameOverride:

## Provide a name to substitute for the full names of resources
##
fullnameOverride:

## Concourse image to use in both Web and Worker containers.
##
image: concourse/concourse

## Concourse image tag.
## ps.: release candidates are published under `concourse/concourse-rc` instead
##      of `concourse/concourse`.
## Ref: https://hub.docker.com/r/concourse/concourse/tags/
##
imageTag: '5.0.1'

## Specific image digest to use in place of a tag.
## Ref: https://kubernetes.io/docs/concepts/configuration/overview/#container-images
##
imageDigest:

## Specify a imagePullPolicy regarding the fetching of container images.
## Ref: https://kubernetes.io/docs/user-guide/images/#pre-pulling-images
##
imagePullPolicy: IfNotPresent

## Array of imagePullSecrets to allow pulling the Concourse image from private registries.
## ps.: secrets must be manually created in the namespace.
## Ref: https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/
##
## Example:
##
##   imagePullSecrets:
##    - myRegistryKeySecretName
##
imagePullSecrets: []

## Configuration values for the Concourse application (worker and web components).
## The values specified here are almost direct references to the flags under the
## `concourse web` and `concourse worker` commands.
##
concourse:
  ## Configurations for the `web` component based on the possible flags configurable
  ## through the `concourse web` command.
  ##
  web:
    ## Enable equivalent resources across pipelines and teams to share a single version history.
    ## Ref: https://concourse-ci.org/global-resources.html
    ##
    enableGlobalResources: true

    ## The number of attempts secret will be retried to be fetched,
    ## in case a retryable error happens.
    ##
    secretRetryAttempts:

    ## The interval between secret retry retieval attempts.
    ##
    secretRetryInterval:

    ## Minimum level of logs to see. Possible options: debug, info, error.
    ##
    logLevel:

    ## IP address on which to listen for HTTP traffic (web UI and API).
    ##
    bindIp:

    ## Port on which to listen for HTTP traffic (web UI and API).
    ##
    bindPort: 8080

    ## TLS configuration for the web component to be able to serve HTTPS traffic.
    ## Once enabled, consumes the certificates set via secrets (`web-tls-cert` and
    ## `web-tls-key`).
    ##
    tls:
      ## Enable serving HTTPS traffic directly through the web component.
      ##
      enabled: false

      ## Port on which to listen for HTTPS traffic.
      ##
      bindPort: 443

    ## URL used to reach any ATC from the outside world.
    ## This is *very* important for a proper authentication workflow as
    ## browser redirects are based on the value set here.
    ##
    ## Example: http://ci.concourse-ci.org
    ##
    externalUrl:

    ## URL used to reach this ATC from other ATCs in the cluster.
    ## By default, this corresponds to `$(POD_IP):$(CONCOURSE_BIND_PORT)`.
    ##
    ## Example: http://127.0.0.1:8080
    ##
    peerUrl:

    encryption:
      ## Enable encryption of pipeline configuration. Encryption keys can be set via secrets
      ## (`encryption-key` and `old-encryption-key` fields).
      ## Ref: https://concourse-ci.org/encryption.html
      ##
      enabled: false

    localAuth:
      ## Enable the use of local authentication (basic auth).
      ## Once enabled, users configured through `local-users` (secret)
      ## are able to authenticate.
      ##
      ## Local users can be individually added to the `main` team by setting
      ## `concourse.web.auth.mainTeam.localUser` with a comma-separated list
      ## of ids.
      ##
      ## Ref: https://concourse-ci.org/install.html#local-auth-config
      ##
      enabled: true

    ## IP address on which to listen for the pprof debugger endpoints.
    ##
    debugBindIp:

    ## Port on which to listen for the pprof debugger endpoints.
    ##
    debugBindPort: 8079

    ## Length of time for a intercepted session to be idle before terminating.
    ##
    interceptIdleTimeout:

    ## Time limit on checking for new versions of resources.
    ##
    globalResourceCheckTimeout:

    ## Interval on which to check for new versions of resources.
    ##
    resourceCheckingInterval:

    ## Interval on which to check for new versions of resource types.
    ##
    resourceTypeCheckingInterval:

    ## Method by which a worker is selected during container placement.
    ## Possible values: volume-locality | random | fewest-build-containers
    containerPlacementStrategy:

    ## How long to wait for Baggageclaim to send the response header.
    ##
    baggageclaimResponseHeaderTimeout:

    ## Directory containing downloadable CLI binaries.
    ## By default, Concourse will try to find the assets
    ## path relative to the executable.
    ##
    cliArtifactsDir:

    ## Log database queries.
    ##
    logDbQueries: false

    ## Interval on which to run build tracking.
    ##
    buildTrackerInterval:

    ## Default number of build logs to retain. 0 means all.
    ##
    defaultBuildLogsToRetain:

    ## Maximum build logs to retain, 0 means not specified. Will override values configured in jobs.
    ##
    maxBuildLogsToRetain:

    ## Default max number of cpu shares per task, 0 means unlimited.
    ##
    defaultTaskCpuLimit:

    ## Default maximum memory per task, 0 means unlimited.
    ##
    defaultTaskMemoryLimit:

    ## Configurations regarding how the web component is able to connect to a postgres
    ## instance.
    ##
    postgres:
      ## The host to connect to.
      ##
      host:

      ## The port to connect to.
      ##
      port:

      ## Path to a UNIX domain socket to connect to.
      ##
      socket:

      ## Whether or not to use SSL.
      ##
      sslmode: disable

      ## Dialing timeout. (0 means wait indefinitely)
      ##
      connectTimeout:

      ## The name of the database to use.
      ##
      database:

    kubernetes:
      ## Enable the use of Kubernetes Secrets as the credential provider for
      ## concourse pipelines.
      ##
      enabled: true

      ## Prefix to use for Kubernetes namespaces under which secrets will be looked up.
      ## Defaults to the Release name hyphen, e.g. "my-release-" produces namespace "my-release-main"
      ## for the "main" Concourse team.
      ##
      namespacePrefix:

      ## Teams to create namespaces for to hold secrets.
      ## This property only has effect if `createTeamNamespaces` is set to `true`.
      ##
      teams:
        - main

      ## Create the Kubernetes namespace for each team listed under `concourse.web.kubernetes.teams`.
      ##
      createTeamNamespaces: true

      ## When true, namespaces are not deleted when the release is deleted.
      ## Irrelevant if the namespaces are not created by this chart.
      ##
      keepNamespaces: true

      ## Path to Kubernetes config when running ATC outside Kubernetes.
      ##
      configPath:

    ## Configuration for using AWS SSM as a credential manager.
    ## Ref: https://concourse-ci.org/creds.html#asm
    ##
    awsSecretsManager:
      ## Enable the use of AWS Secrets Manager for credential management.
      ##
      enabled: false

      ## AWS region to use when reading from Secrets Manager
      ##
      region:

      ## Configure authentication using an access key and secret key. If disabled, IAM role auth is assumed.
      ## Session Token can also be enabled, if required.
      keyAuth:
        enabled: true
        useSessionToken: false

      ## pipeline-specific template for Secrets Manager parameters, defaults to: /concourse/{team}/{pipeline}/{secret}
      ##
      pipelineSecretTemplate:

      ## team-specific template for Secrets Manager parameters, defaults to: /concourse/{team}/{secret}
      ##
      teamSecretTemplate:

    ## Configuration for using AWS SSM as a credential manager.
    ## Ref: https://concourse-ci.org/creds.html#ssm
    ##
    awsSsm:
      ## Enable the use of AWS SSM.
      ##
      enabled: false

      ## AWS region to use when reading from SSM
      ##
      region:

      ## Configure authentication using an access key and secret key. If disabled, IAM role auth is assumed.
      ## Session Token can also be enabled, if required.
      keyAuth:
        enabled: true
        useSessionToken: false

      ## pipeline-specific template for SSM parameters, defaults to: /concourse/{team}/{pipeline}/{secret}
      ##
      pipelineSecretTemplate:

      ## team-specific template for SSM parameters, defaults to: /concourse/{team}/{secret}
      ##
      teamSecretTemplate:

    ## Configuration for using Vault as a credential manager.
    ## Ref: https://concourse-ci.org/creds.html#vault
    ##
    vault:
      ## Enable the use of Vault as a credential manager.
      ##
      enabled: false

      ## URL pointing to vault addr (i.e. http://vault:8200).
      ##
      url:

      ## Vault path under which to namespace credentials lookup.
      ##
      pathPrefix:

      ## if the Vault server is using a self-signed certificate, set this to true,
      ## and provide a value for the cert in secrets (field `vault-ca-cert`).
      ##
      useCaCert: false

      ## Vault authentication backend, leave this blank if using an initial periodic token.
      ## Currently supported backends: token, approle, cert.
      ##
      authBackend: ''

      ## Cache returned secrets for their lease duration in memory
      ##
      cache: false

      ## If the cache is enabled, and this is set, override secrets lease duration with a maximum value
      ##
      maxLease:

      ## Path to a directory of PEMEncoded CA cert files to verify the vault server SSL cert.
      ##
      caPath:

      ## If set, is used to set the SNI host when connecting via TLS.
      ##
      serverName:

      ## Enable insecure SSL verification.
      ##
      insecureSkipVerify: false

      ## Client token for accessing secrets within the Vault server.
      ##
      clientToken:

      ## Time after which to force a reLogin. If not set, the token will just be continuously renewed.
      ##
      authBackendMaxTtl:

      ## The maximum time between retries when logging in or reAuthing a secret.
      ##
      retryMax:

      ## The initial time between retries when logging in or reAuthing a secret.
      ##
      retryInitial:

    ## Don't actually do any automatic scheduling or checking.
    ##
    noop: false

    staticWorker:
      ## Enables the direct registration of a worker that has its properties
      ## hardcoded.
      ##
      enabled: false

      ## A Garden API endpoint to register as a worker.
      ##
      gardenUrl:

      ## A Baggageclaim API endpoint to register with the worker.
      ##
      baggageclaimUrl:

      ## A resource type to advertise for the worker. Can be specified multiple times.
      ##
      resource:

    metrics:
      ## Host string to attach to emitted metrics.
      ##
      hostName:

      ## A key-value attribute to attach to emitted metrics.
      ##
      attribute:

      ## Enable capturing of error log metrics.
      ##
      captureErrorMetrics: false

    datadog:
      enabled: false

      ## Use IP of node the pod is scheduled on, overrides `agentHost`
      ##
      agentHostUseHostIP: false

      ## Datadog agent host to expose dogstatsd metrics
      ##
      agentHost: 127.0.0.1

      ## Datadog agent port to expose dogstatsd metrics
      ##
      agentPort: 8125

      ## Prefix for all metrics to easily find them in Datadog
      ##
      prefix:

    influxdb:
      enabled: false

      ## InfluxDB server address to emit points to.
      ## Example: http://127.0.0.1:8086
      ##
      url:

      ## InfluxDB database to write points to.
      ##
      database: concourse

      ## InfluxDB server username.
      ##
      username:

      ## Skip SSL verification when emitting to InfluxDB.
      ##
      insecureSkipVerify: false

    ## Emit metrics to logs instead of an actual metrics system.
    ##
    emitToLogs: false

    newrelic:
      enabled: false

      ## New Relic Account ID
      ##
      accountId:

      ## New Relic Insights API Key
      ##
      apiKey:

      ## An optional prefix for emitted New Relic events
      ##
      servicePrefix:

    prometheus:
      enabled: false

      ## IP to listen on to expose Prometheus metrics.
      ##
      bindIp: '0.0.0.0'

      ## Port to listen on to expose Prometheus metrics.
      ##
      bindPort: 9391

    riemann:
      enabled: false

      ## Riemann server address to emit metrics to.
      ##
      host:

      ## Port of the Riemann server to emit metrics to.
      ##
      port: 5555

      ## An optional prefix for emitted Riemann services
      ##
      servicePrefix:

      ## Tag to attach to emitted metrics. Can be specified multiple times.
      ##
      tag:

    ## The value to set for X-Frame-Options. If omitted, the header is not set.
    ##
    xFrameOptions:

    gc:
      ## Enables overriding the default values that Concourse sets
      ## for the parameters related to scheduling.
      ##
      ## **Do not change this values unless you're sure about what you're doing**.
      ##
      overrideDefaults: false

      ## Interval on which to perform garbage collection.
      ##
      interval: 30s

      ## Grace period before reaping oneOff task containers
      ##
      oneOffGracePeriod: 5m

      ## Period after which to reap containers and volumes that were created but
      ## went missing from the worker.
      ##
      missingGracePeriod:

    syslog:
      ## Enables the emission of build logs to external log ingesters through
      ## using the syslog protocol.
      ##
      enabled: false

      ## Client hostname with which the build logs will be sent to the syslog server.
      ##
      hostName:

      ## Remote syslog server address with port (Example: 0.0.0.0:514).
      ##
      address:

      ## Transport protocol for syslog messages (Currently supporting tcp, udp & tls).
      ##
      transport:

      ## Interval over which checking is done for new build logs to send to syslog server
      ## (duration measurement units are s/m/h; eg. 30s/30m/1h)
      drainInterval: 30s

      ## If the syslog server is using a self-signed certificate, set this to true,
      ## and provide a value for the cert in secrets (`syslog-ca-cert`).
      ##
      useCaCert: false

    auth:
      ## Force sending secure flag on http cookies
      ##
      cookieSecure: false

      ## Length of time for which tokens are valid. Afterwards, users will have to log back in.
      ## The value must be specified as Go duration values (e.g.: 30m or 24h).
      duration:

      mainTeam:
        ## Configuration file for specifying team params.
        ## Ref: https://concourse-ci.org/managing-teams.html#setting-roles
        ##
        config:

        ## List of local Concourse users to be included as members of the `main` team.
        ## Make sure you have local users support enabled (`concourse.web.localAuth.enabled`) and
        ## that the users were added (`local-users` secret).
        ##
        localUser: 'test'

        ## Authentication (Main Team) (CloudFoundry)
        ##
        cf:
          ## List of whitelisted CloudFoundry users.
          ##
          user:

          ## List of whitelisted CloudFoundry orgs
          ##
          org:

          ## List of whitelisted CloudFoundry spaces
          ##
          space:

          ## (Deprecated) List of whitelisted CloudFoundry space guids
          ##
          spaceGuid:

        ## Authentication (Main Team) (Bitbucket Cloud)
        ##
        bitbucketCloud:
          ## List of whitelisted Bitbucket Cloud users
          ##
          user:

          ## List of whitelisted Bitbucket Cloud teams
          ##
          team:

        ## Authentication (Main Team) (GitHub)
        ##
        github:
          ## List of whitelisted GitHub users
          ##
          user:

          ## List of whitelisted GitHub orgs
          ##
          org:

          ## List of whitelisted GitHub teams
          ##
          team:

        ## Authentication (Main Team) (GitLab)
        ##
        gitlab:
          ## List of whitelisted GitLab users
          ##
          user:

          ## List of whitelisted GitLab groups
          ##
          group:

        ## Authentication (Main Team) (LDAP)
        ##
        ldap:
          ## List of whitelisted LDAP users
          ##
          user:

          ## List of whitelisted LDAP groups
          ##
          group:

        ## Authentication (Main Team) (OAuth2)
        ##
        oauth:
          ## List of whitelisted OAuth2 users
          ##
          user:

          ## List of whitelisted OAuth2 groups
          ##
          group:

        ## Authentication (Main Team) (OIDC)
        ##
        oidc:
          ## List of whitelisted OIDC users
          ##
          user:

          ## List of whitelisted OIDC groups
          ##
          group:

      ## Authentication (CloudFoundry)
      ##
      cf:
        enabled: false

        ## (Required) The base API URL of your CF deployment. It will use this information to discover information
        ## about the authentication provider.
        ##
        ## Example: https://api.run.pivotal.io
        ##
        apiUrl:

        ## CA Certificate
        ##
        useCaCert: false

        ## Skip SSL validation
        ##
        skipSslValidation: false

      ## Authentication (GitHub)
      ##
      github:
        enabled: false

        ## Hostname of GitHub Enterprise deployment (No scheme, No trailing slash)
        ##
        host:

        ## CA certificate of GitHub Enterprise deployment
        ##
        useCaCert: false

      ## Authentication (BitbucketCloud)
      ##
      bitbucketCloud:
        enabled: false

      ## Authentication (GitLab)
      gitlab:
        enabled: false

        ## Hostname of Gitlab Enterprise deployment (Include scheme, No trailing slash)
        ##
        host:

      ## Authentication (LDAP)
      ldap:
        enabled: false

        ## The auth provider name displayed to users on the login page
        ##
        displayName:

        ## (Required) The host and optional port of the LDAP server. If port isn't supplied, it will be guessed
        ## based on the TLS configuration. 389 or 636.
        ##
        host:

        ## (Required) Bind DN for searching LDAP users and groups. Typically this is a readOnly user.
        ##
        bindDn:

        ## (Required) Bind Password for the user specified by 'bindDn'
        ##
        bindPw:

        ## Required if LDAP host does not use TLS.
        ##
        insecureNoSsl:

        ## Skip certificate verification
        ##
        insecureSkipVerify:

        ## Start on insecure port, then negotiate TLS
        ##
        startTls:

        ## CA certificate
        ##
        useCaCert:

        ## BaseDN to start the search from. For example 'cn=users,dc=example,dc=com'
        ##
        userSearchBaseDn:

        ## Optional filter to apply when searching the directory. For example '(objectClass=person)'
        ##
        userSearchFilter:

        ## Attribute to match against the inputted username. This will be translated and combined with the other
        ## filter as '(<attr>=<username>)'.
        ##
        userSearchUsername:

        ## Can either be: 'sub'  search the whole sub tree or 'one' - only search one level. Defaults to 'sub'.
        ##
        userSearchScope:

        ## A mapping of attributes on the user entry to claims. Defaults to 'uid'.
        ##
        userSearchIdAttr:

        ## A mapping of attributes on the user entry to claims. Defaults to 'mail'.
        ##
        userSearchEmailAttr:

        ## A mapping of attributes on the user entry to claims.
        ##
        userSearchNameAttr:

        ## BaseDN to start the search from. For example 'cn=groups,dc=example,dc=com'
        ##
        groupSearchBaseDn:

        ## Optional filter to apply when searching the directory. For example '(objectClass=posixGroup)'
        ##
        groupSearchFilter:

        ## Can either be: 'sub'  search the whole sub tree or 'one' - only search one level. Defaults to 'sub'.
        ##
        groupSearchScope:

        ## Adds an additional requirement to the filter that an attribute in the group match the user's attribute value. The exact filter being added is: (<groupAttr>=<userAttr value>)
        ##
        groupSearchUserAttr:

        ## Adds an additional requirement to the filter that an attribute in the group match the user's attribute value. The exact filter being added is: (<groupAttr>=<userAttr value>)
        ##
        groupSearchGroupAttr:

        ## The attribute of the group that represents its name.
        ##
        groupSearchNameAttr:

      ## Authentication (OAuth2)
      ##
      oauth:
        enabled: false

        ## The auth provider name displayed to users on the login page
        ##
        displayName:

        ## (Required) Authorization URL
        ##
        authUrl:

        ## (Required) Token URL
        ##
        tokenUrl:

        ## UserInfo URL
        ##
        userinfoUrl:

        ## Any additional scopes that need to be requested during authorization
        ##
        scope:

        ## The groups key indicates which claim to use to map external groups to Concourse teams.
        ##
        groupsKey:

        ## CA Certificate
        ##
        useCaCert:

        ## Skip SSL validation
        ##
        skipSslValidation:

      ## Authentication (OIDC)
      oidc:
        enabled: false

        ## The auth provider name displayed to users on the login page
        ##
        displayName:

        ## (Required) An OIDC issuer URL that will be used to discover provider configuration using the .wellKnown/openid-configuration
        ##
        issuer:

        ## Any additional scopes that need to be requested during authorization
        ##
        scope:

        ## The groups key indicates which claim to use to map external groups to Concourse teams.
        ##
        groupsKey:

        ## CA Certificate
        ##
        useCaCert:

        ## Skip SSL validation
        ##
        skipSslValidation:

    tsa:
      ## Minimum level of logs to see. Possible values: debug, info, error.
      ##
      logLevel:

      ## IP address on which to listen for SSH.
      ##
      bindIp:

      ## Port on which to listen for SSH.
      ##
      bindPort: 2222

      ## IP address on which to listen for the pprof debugger endpoints (default: 127.0.0.1)
      ##
      debugBindIp:

      ## Port on which to listen for TSA pprof server.
      ##
      debugBindPort: 2221

      ## IP address of this TSA, reachable by the ATCs. Used for forwarded worker addresses.
      ##
      peerIp:

      ## Path to private key to use for the SSH server.
      ##
      hostKey:

      ## Path to file containing keys to authorize, in SSH authorized_keys format (one public key per line).
      ##
      authorizedKeys:

      ## ATC API endpoints to which workers will be registered.
      ##
      atcUrl:

      ## Path to private key to use when signing tokens in reqests to the ATC during registration.
      ##
      sessionSigningKey:

      ## Interval on which to heartbeat workers to the ATC.
      ##
      heartbeatInterval:

  worker:
    ## Signal to send to the worker container when shutting down.
    ## Possible values:
    ##
    ## - SIGUSR1: land the worker, and
    ## - SIGUSR2: retire the worker.
    ##
    ## Note.: using SIGUSR2 with persistence enabled implies the use of an
    ## initContainer that removes any data the existed previously under
    ## `concourse.worker.workDir` as the action of `retire`ing a worker implies
    ## that no state comes back with it when re-registering.
    ##
    ## Ref: https://concourse-ci.org/concourse-worker.html
    ## Ref: https://concourse-ci.org/worker-internals.html
    ##
    shutdownSignal: SIGUSR2

    ## Duration after which the registration should be swapped to another random SSH gateway.
    ##
    rebalanceInterval:

    ## IP address on which to listen for health checking requests.
    ##
    healthcheckBindIp:

    ## Port on which to listen for health checking requests.
    ##
    healthcheckBindPort: 8888

    ## HTTP timeout for the full duration of health checking.
    ##
    healthcheckTimeout:

    ## The name to set for the worker during registration. If not specified, the hostname will be used.
    ##
    name:

    ## A tag to set during registration. Can be specified multiple times.
    ##
    tag:

    ## The name of the team that this worker will be assigned to.
    ##
    team:

    ## HTTP proxy endpoint to use for containers.
    ##
    http_proxy:

    ## HTTPS proxy endpoint to use for containers.
    ##
    https_proxy:

    ## Blacklist of addresses to skip the proxy when reaching.
    ##
    no_proxy:

    ## If set, the worker will be immediately removed upon stalling.
    ##
    ephemeral:

    ## IP address on which to listen for the pprof debugger endpoints.
    ##
    debugBindIp:

    ## Port on which to listen for beacon pprof server.
    ##
    debugBindPort: 7776

    ## Version of the worker. This is normally baked in to the binary, so this flag is hidden.
    ##
    version:

    ## Directory in which to place container data.
    ##
    workDir: /concourse-work-dir

    ## IP address on which to listen for the Garden server.
    ##
    bindIp:

    ## Port on which to listen for the Garden server.
    ##
    bindPort: 7777

    ## IP used to reach this worker from the ATC nodes.
    ##
    peerIp:

    ## Minimum level of logs to see. Possible options: debug, info, error.
    ##
    logLevel:

    tsa:
      ## TSA host to forward the worker through. Can be specified multiple times.
      ##
      host:

      ## File containing a public key to expect from the TSA.
      ##
      publicKey:

      ## File containing the private key to use when authenticating to the TSA.
      ##
      workerPrivateKey:

    garden:
      ## Path to the 'gdn' executable (or leave as 'gdn' to find it in $PATH)
      ##
      bin:

      ## Path to a config file to use for Garden in INI format.
      ##
      ## For example, in a ConfigMap:
      ##
      ##   [server]
      ##     max-containers = 100
      ##
      ## For information about the possible values:
      ## Ref: https://bosh.io/jobs/garden?source=github.com/cloudfoundry/garden-runc-release
      ##
      config:

      ## Enable a proxy DNS server for Garden
      ##
      dnsProxyEnable:

      ## Use the insecure Houdini Garden backend.
      ##
      useHoudini:

    baggageclaim:
      ## Minimum level of logs to see. Possible values: debug, info, error
      ##
      logLevel:

      ## IP address on which to listen for API traffic.
      ##
      bindIp:

      ## Port on which to listen for API traffic.
      ##
      bindPort: 7788

      ## IP address on which to listen for the pprof debugger endpoints.
      ##
      debugBindIp:

      ## Disable remapping of user/group IDs in unprivileged volumes.
      ##
      disableUserNamespaces:

      ## Port on which to listen for baggageclaim pprof server.
      ##
      debugBindPort: 7787

      ## Directory in which to place volume data.
      ##
      volumes:

      ## Driver to use for managing volumes.
      ## Possible values: detect, naive, btrfs, and overlay.
      ##
      driver: naive

      ## Path to btrfs binary
      ##
      btrfsBin:

      ## Path to mkfs.btrfs binary
      ##
      mkfsBin:

      ## Path to directory in which to store overlay data
      ##
      overlaysDir:

      ## Interval on which to reap expired volumes.
      ##
      reapInterval:

## Configuration values for Concourse Web components.
## For more information regarding the characteristics of
## Concourse Web nodes, see https://concourse-ci.org/concourse-web.html.
##
web:
  ## Override the components name (defaults to web).
  ##
  nameOverride:

  ## Number of replicas.
  ##
  replicas: 1

  ## Array of extra containers to run alongside the Concourse Web
  ## container.
  ##
  ## Example:
  ## - name: myapp-container
  ##   image: busybox
  ##   command: ['sh', '-c', 'echo Hello && sleep 3600']
  ##
  sidecarContainers: []

  ## Configures the liveness probe used to determine if the Web component is up.
  ## ps.: if you're upgrading Concourse from one version  to another, the probe will
  ## probably fail for some time before migrations are finished - in such situations,
  ## consider bumping the values set here.
  ## Ref: https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-probes/
  ##
  livenessProbe:
    failureThreshold: 5
    initialDelaySeconds: 10
    periodSeconds: 15
    timeoutSeconds: 3
    httpGet:
      path: /api/v1/info
      port: atc

  ## Configures the readiness probes.
  ## Ref: https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-probes/
  ##
  readinessProbe:
    httpGet:
      path: /api/v1/info
      port: atc

  ## Configure resource requests and limits.
  ## Ref: https://kubernetes.io/docs/user-guide/compute-resources/
  ##
  resources:
    requests:
      cpu: '100m'
      memory: '128Mi'

  ## Configure additional environment variables for the
  ## web containers.
  ## Example:
  ##
  ##   - name: CONCOURSE_LOG_LEVEL
  ##     value: "debug"
  ##   - name: CONCOURSE_TSA_LOG_LEVEL
  ##     value: "debug"
  ##
  env:

  ## Where secrets should be mounted for the web container.
  ##
  keySecretsPath: '/concourse-keys'
  teamSecretsPath: '/team-authorized-keys'
  authSecretsPath: '/concourse-auth'
  vaultSecretsPath: '/concourse-vault'
  postgresqlSecretsPath: '/concourse-postgresql'
  syslogSecretsPath: '/concourse-syslog'
  tlsSecretsPath: '/concourse-web-tls'

  ## Configure additional volumes for the
  ## web container(s).
  ##
  ## Example:
  ##
  ##   - name: my-team-authorized-keys
  ##     configMap:
  ##       name: my-team-authorized-keys-config
  ##
  ## Ref: https://kubernetes.io/docs/concepts/storage/volumes/
  ##
  additionalVolumes: []

  ## Configure additional volumeMounts for the
  ## web container(s)
  ##
  ## Example:
  ##
  ##  - name: my-team-authorized-keys
  ##    mountPath: /my-team-authorized-keys
  ##
  ## Ref: https://kubernetes.io/docs/concepts/storage/volumes/
  ##
  additionalVolumeMounts:

  ## Additional affinities to add to the web pods.
  ##
  ## Example:
  ##   nodeAffinity:
  ##     preferredDuringSchedulingIgnoredDuringExecution:
  ##       - weight: 50
  ##         preference:
  ##           matchExpressions:
  ##             - key: spot
  ##               operator: NotIn
  ##               values:
  ##                 - "true"
  ##
  ## Ref: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#affinity-and-anti-affinity
  ##
  additionalAffinities:

  ## Annotations for the web nodes.
  ##
  ## Example:
  ##   key1: "value1"
  ##   key2: "value2"
  ##
  ## Ref: https://kubernetes.io/docs/concepts/overview/working-with-objects/annotations/
  ##
  annotations: {}

  ## Node selector for web nodes.
  ## Ref: https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/
  ##
  nodeSelector: {}

  ## Tolerations for the web nodes.
  ##
  ## Example:
  ##   - key: "toleration=key"
  ##     operator: "Equal"
  ##     value: "value"
  ##     effect: "NoSchedule"
  ##
  ## Ref: https://kubernetes.io/docs/concepts/configuration/taint-and-toleration/
  ##
  tolerations: []

  ## Service configuration.
  ## Ref: https://kubernetes.io/docs/user-guide/services/
  ##
  service:
    ## For minikube, set this to ClusterIP, elsewhere use LoadBalancer or NodePort
    ## Ref: https://kubernetes.io/docs/user-guide/services/#publishing-services---service-types
    ##
    type: ClusterIP

    ## When using `web.service.type: LoadBalancer`, sets the user-specified load balancer IP.
    ## Example: 172.217.1.174
    ##
    loadBalancerIP:

    ## Additional Labels to be added to the web service.
    ##
    labels:

    ## Annotations to be added to the web service.
    ##
    ## Example:
    ##
    ##   prometheus.io/probe: "true"
    ##   prometheus.io/probe_path: "/"
    ##
    ## When using `web.service.type: LoadBalancer` in AWS, enable HTTPS with an ACM cert:
    ##
    ##   service.beta.kubernetes.io/aws-load-balancer-ssl-cert: "arn:aws:acm:eu-west-1:123456789:certificate/abc123-abc123-abc123-abc123"
    ##   service.beta.kubernetes.io/aws-load-balancer-backend-protocol: "http"
    ##   service.beta.kubernetes.io/aws-load-balancer-backend-port: "atc"
    ##   service.beta.kubernetes.io/aws-load-balancer-ssl-ports: "443"
    ##
    annotations:

    ## When using `web.service.type: LoadBalancer`, whitelist the load balancer to particular IPs
    ## Example:
    ##   - 192.168.1.10/32
    ##
    loadBalancerSourceRanges:

    ## When using `web.service.type: NodePort`, sets the nodePort for atc
    ##
    atcNodePort:

    ## When using `web.service.type: NodePort`, sets the nodePort for atc tls
    ##
    atcTlsNodePort:

    ## When using `web.service.type: NodePort`, sets the nodePort for tsa
    ##
    tsaNodePort:

  ## Ingress configuration.
  ## Ref: https://kubernetes.io/docs/user-guide/ingress/
  ##
  ingress:
    ## Enable Ingress.
    ##
    enabled: false

    ## Annotations to be added to the web ingress.
    ## Example:
    ##   kubernetes.io/ingress.class: nginx
    ##   kubernetes.io/tls-acme: 'true'
    ##
    annotations:

    ## Hostnames.
    ## Must be provided if Ingress is enabled.
    ## Example:
    ##   - concourse.domain.com
    ##
    hosts:

    ## TLS configuration.
    ## Secrets must be manually created in the namespace.
    ## Example:
    ##   - secretName: concourse-web-tls
    ##     hosts:
    ##       - concourse.domain.com
    ##
    tls:

## Configuration values for Concourse Worker components.
## For more information regarding the characteristics of
## Concourse Workers, see https://concourse-ci.org/concourse-worker.html
##
worker:
  ## Override the components name (defaults to worker).
  ##
  nameOverride:

  ## Removes any previous state created in `concourse.worker.workDir`.
  ##
  cleanUpWorkDirOnStart: true

  ## Number of replicas.
  ##
  replicas: 2

  ## Array of extra containers to run alongside the Concourse worker
  ## container.
  ##
  ## Example:
  ##
  ## - name: myapp-container
  ##   image: busybox
  ##   command: ['sh', '-c', 'echo Hello && sleep 3600']
  ##
  sidecarContainers: []

  ## Minimum number of workers available after an eviction
  ## Ref: https://kubernetes.io/docs/admin/disruptions/
  ##
  minAvailable: 1

  ## Configures the liveness probe used to determine if the Worker component is up.
  ## Ref: https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-probes/
  ##
  livenessProbe:
    failureThreshold: 5
    initialDelaySeconds: 10
    periodSeconds: 15
    timeoutSeconds: 3
    httpGet:
      path: /
      port: worker-hc

  ## Configures the readiness probes.
  ## Ref: https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-probes/
  ##
  readinessProbe: {}

  ## Configure resource requests and limits.
  ## Ref: https://kubernetes.io/docs/user-guide/compute-resources/
  ##
  resources:
    requests:
      cpu: '100m'
      memory: '512Mi'

  ## Configure additional environment variables for the
  ## worker container(s)
  ##
  ## Example:
  ##
  ##   - name: CONCOURSE_NAME
  ##     value: "anything"
  ##
  env: []

  ## For managing where secrets should be mounted for worker agents
  ##
  keySecretsPath: '/concourse-keys'

  ## Configure additional volumeMounts for the
  ## worker container(s)
  ##
  ## Example:
  ##   - name: concourse-baggageclaim
  ##     mountPath: /baggageclaim
  ##
  additionalVolumeMounts: []

  ## Annotations to be added to the worker pods.
  ##
  ## Example:
  ##
  ##   iam.amazonaws.com/role: arn:aws:iam::123456789012:role/concourse
  ##
  annotations: {}

  ## Node selector for the worker nodes.
  ## Ref: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#nodeselector
  ##
  nodeSelector: {}

  ## Additional affinities to add to the worker pods.
  ## Useful if you prefer to run workers on non-spot instances, for example.
  ##
  ## Example:
  ##
  ##   nodeAffinity:
  ##     preferredDuringSchedulingIgnoredDuringExecution:
  ##       - weight: 50
  ##         preference:
  ##           matchExpressions:
  ##             - key: spot
  ##               operator: NotIn
  ##               values:
  ##                 - "true"
  ##
  additionalAffinities: {}

  ## Configure additional volumes for the
  ## worker container(s).
  ## Example:
  ##
  ##  - name: concourse-baggageclaim
  ##    hostPath:
  ##      path: /dev/nvme0n1
  ##      type: BlockDevice
  ##
  ##
  ## As a special exception, this allows taking over the `concourse-work-dir`
  ## volume (from the default emptyDir) if `persistence.enabled` is false:
  ##
  ##   additionalVolumes:
  ##     - name: concourse-work-dir
  ##       hostPath:
  ##         path: /mnt/locally-mounted-fast-disk/concourse
  ##         type: DirectoryOrCreate
  ##
  additionalVolumes: []

  ## Whether the workers should be forced to run on separate nodes.
  ## This is accomplished by setting their AntiAffinity with requiredDuringSchedulingIgnoredDuringExecution as opposed to preferred
  ## Ref: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#inter-pod-affinity-and-anti-affinity-beta-feature
  ##
  hardAntiAffinity: false

  ## Tolerations for the worker nodes.
  ## Ref: https://kubernetes.io/docs/concepts/configuration/taint-and-toleration/
  ##
  ## For example:
  ##
  ##   - key: "toleration=key"
  ##     operator: "Equal"
  ##     value: "value"
  ##     effect: "NoSchedule"
  ##
  tolerations: []

  ## Time to allow the pod to terminate before being forcefully terminated. This should provide time for
  ## the worker to retire, i.e. drain its tasks. See https://concourse-ci.org/worker-internals.html for worker
  ## lifecycle semantics.
  ##
  terminationGracePeriodSeconds: 60

  ## Strategy for StatefulSet updates (requires Kubernetes 1.6+)
  ## Ref: https://kubernetes.io/docs/concepts/workloads/controllers/statefulset
  ##
  updateStrategy: RollingUpdate

  ## Pod Management strategy (requires Kubernetes 1.7+)
  ## Ref: https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/#pod-management-policies
  ##
  ## "OrderedReady" is default. "Parallel" means worker pods will launch or terminate
  ## in parallel.
  ##
  podManagementPolicy: Parallel

  ## When persistance is disabled this value will be used to limit the emptyDir volume size
  ## Ref: https://kubernetes.io/docs/concepts/storage/volumes/#emptydir
  ##
  ## Example: 20Gi
  ##
  emptyDirSize:

## Persistent Volume Storage configuration.
## Ref: https://kubernetes.io/docs/user-guide/persistent-volumes
##
persistence:
  ## Enable persistence using Persistent Volume Claims.
  ##
  enabled: true

  ## Worker Persistence configuration.
  ##
  worker:
    ## concourse data Persistent Volume Storage Class
    ## If defined, storageClassName: <storageClass>
    ## If set to "-", storageClassName: "", which disables dynamic provisioning
    ## If undefined (the default) or set to null, no storageClassName spec is
    ##   set, choosing the default provisioner.  (gp2 on AWS, standard on
    ##   GKE, AWS & OpenStack)
    ##
    storageClass:

    ## Persistent Volume Access Mode.
    ##
    accessMode: ReadWriteOnce

    ## Persistent Volume Storage Size.
    ##
    size: 20Gi

## Configuration values for the postgresql dependency.
## Ref: https://github.com/helm/charts/blob/master/stable/postgresql/README.md
##
postgresql:
  ## Use the PostgreSQL chart dependency.
  ## Set to false if bringing your own PostgreSQL, and set secret value postgresql-uri.
  ##
  enabled: true

  ### PostgreSQL User to create.
  ##
  postgresUser: concourse

  ## PostgreSQL Password for the new user.
  ## If not set, a random 10 characters password will be used.
  ##
  postgresPassword: concourse

  ## PostgreSQL Database to create.
  ##
  postgresDatabase: concourse

  ## Persistent Volume Storage configuration.
  ## Ref: https://kubernetes.io/docs/user-guide/persistent-volumes
  ##
  persistence:
    ## Enable PostgreSQL persistence using Persistent Volume Claims.
    ##
    enabled: true

    ## Concourse data Persistent Volume Storage Class.
    ##
    ## If defined, storageClassName: <storageClass>
    ## If set to "-", storageClassName: "", which disables dynamic provisioning
    ## If undefined (the default) or set to null, no storageClassName spec is
    ##   set, choosing the default provisioner.  (gp2 on AWS, standard on
    ##   GKE, AWS & OpenStack)
    ##
    storageClass:

    ## Persistent Volume Access Mode.
    ##
    accessMode: ReadWriteOnce

    ## Persistent Volume Storage Size.
    ##
    size: 8Gi

## For Kubernetes RBAC support:
##
rbac:
  ## Enable the creation of RBAC resources.
  ##
  create: true

  ## RBAC Version
  ##
  apiVersion: v1beta1

  ## The name of the service account to use for web pods if rbac.create is false
  ##
  webServiceAccountName: default

  ## The name of the service account to use for worker pods if rbac.create is false
  ##
  workerServiceAccountName: default

## For managing secrets using Helm
##
secrets:
  ## Create the secret resource from the following values. Set this to
  ## false to manage these secrets outside Helm.
  ##
  create: true

  ## Array of team names and public keys for team external workers.
  ##
  ## Example:
  ## - team: main
  ##   key: |-
  ##     ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDYBQ9fG6IML+qsFaMh1Pl+81wyUwRilHdfhItAiAsLVQsOwI5+V4pn5aLhHPBuRQqIqYmbkZ7I1VUIN1+90PVJ3X7l9qqanb85AHMtLujw1j9u0zDyH2XHgpUloknUQzUSLIZjjU3Hn3Uo/XikF+vT8104isO7Ym8Xp7sIcRuvOQ3nuRsFVCRogxpLTVHD/k57rwYVqWWLaKLwvx01ZVXOq4GHk/BVaKa9ODC/dNgbZMfwvVVXuf7/NFGmSMyXb49Si4aoP4Gn7jAX6GngBbm/bgKqO0skQy/ggQm/YVF+s5q4EhleMBLVJKD1VpM5LeLDFpiu/y4bVd8wUcgK+QQ9 Concourse
  ##
  ## Make sure to chack the security caveats here: https://concourse-ci.org/teams-caveats.html
  ## Extra Reads: https://github.com/concourse/concourse/issues/1865#issuecomment-464166994
  ## https://concourse-ci.org/global-resources.html#complications-with-reusing-containers
  ##
  teamAuthorizedKeys:

  ## List of `username:password` or `username:bcrypted_password` combinations for all your local concourse users.
  ##
  localUsers: 'test:test'

  ## The TLS certificate and private key for the web component to be able to terminate
  ## TLS connections.
  ##
  webTlsCert:
  webTlsKey:

  ## Concourse Host Keys.
  ## Ref: https://concourse-ci.org/install.html#generating-keys
  ##
  hostKey: |-
    -----BEGIN RSA PRIVATE KEY-----
    MIIEogIBAAKCAQEA2AUPXxuiDC/qrBWjIdT5fvNcMlMEYpR3X4SLQIgLC1ULDsCO
    fleKZ+Wi4RzwbkUKiKmJm5GeyNVVCDdfvdD1Sd1+5faqmp2/OQBzLS7o8NY/btMw
    8h9lx4KVJaJJ1EM1EiyGY41Nx591KP14pBfr0/NdOIrDu2JvF6e7CHEbrzkN57kb
    BVQkaIMaS01Rw/5Oe68GFalli2ii8L8dNWVVzquBh5PwVWimvTgwv3TYG2TH8L1V
    V7n+/zRRpkjMl2+PUouGqD+Bp+4wF+hp4AW5v24CqjtLJEMv4IEJv2FRfrOauBIZ
    XjAS1SSg9VaTOS3iwxaYrv8uG1XfMFHICvkEPQIDAQABAoIBAG87W8jrX6vK2Jm3
    ooJ/OeFmymiXWsCwFi+2/kVCR/2T0tfLyxO/W+NX2WD1F9CP+HaaZeMXPp3HS7up
    V8FT4ZohVYBwXTS0WYyucKApcYThrVQRpzhldnEfClGQmVeVK7Sp/KEyV4Sc1SVA
    L2i/cI142N2Ohm7spquVkLcuFsVINzZ0fXCv25dTqbkEgjTJzNdBzyFXvc4z0Mt9
    gW14M7mz+YKYOfsCxIEm438fC9b16C96yIFBdN+/jaP8pmb2RoIE2D0F8bj5K1hR
    YyGFKMOU4e6cYq59iWfubKuu2WNJEBk/5aO7x7Xu2S0k8wIYlwxFuu4LfR2Kvizu
    +mFVf3kCgYEA9e0+40tJGpOPM8hAB3DwXjYc8lCuyYf3z30T3RqVNCUVSWnlaj/s
    3ENi6+Ng3u+Zs8cR2CFou+jAClTyWLuSnI9yACD0eyW9n4bzYMUbgdC6vneLjpzx
    wWR9Xv5RmZVly7xWuqcgEeEf8RNcYI3oXby0laF3EObvuAx/4ETIkFcCgYEA4N42
    w1UEWGopWBIIXYHkEPHQuF0SxR2CZyh9ExTeSxFphyibkcHRjDW+t91ZLnSm5k1N
    TOdYuc0ApBV3U+TexeFvDI94L/Oze6Ht5MatRQz8kRwMFGJL3TrpbgTmWdfG05Ad
    oiScJzwY16oJXnKusxik7V+gCCNNE0/2UuMnY4sCgYAEf82pvOPef5qcGOrK+A79
    ukG3UTCRcVJgUmp9nhHivVbxW+WdlwPPV9BEfol0KrAGMPsrmBjhbzWsOregVfYt
    tRYh2HiAlEUu2Po06AZDzrzL5UYBWu+1WRBOH5sAk1IkcxKnIY2dph++elszTQVW
    SbCIGEckYQU7ucbRJJECywKBgBb4vHFx8vKxTa3wkagzx7+vZFohL/SxEgxFx5k2
    bYsPqU8kZ9gZC7YeG3CfDShAxHgMd5QeoiLA/YrFop4QaG2gnP6UfXuwkqpTnYDc
    hwDh1b9hNR6z9/oOtaAGoh2VfHtKYqyYvtcHPaZyeWiLoKstHlQdi7SpHouVhJ1t
    FS4HAoGAGy+56+zvdROjJy9A2Mn/4BvWrsu4RSQILBJ6Hb4TpF46p2fn0rwqyhOj
    Occs+xkdEsI9w5phXzIEeOq2LqvWHDPxtdLpxOrrmx4AftAWdM8S1+OqTpzHihK1
    y1ZOrWfvON+XjWFFAEej/CpQZkNUkTzjTtSC0dnfAveZlasQHdI=
    -----END RSA PRIVATE KEY-----

  hostKeyPub: |-
    ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDYBQ9fG6IML+qsFaMh1Pl+81wyUwRilHdfhItAiAsLVQsOwI5+V4pn5aLhHPBuRQqIqYmbkZ7I1VUIN1+90PVJ3X7l9qqanb85AHMtLujw1j9u0zDyH2XHgpUloknUQzUSLIZjjU3Hn3Uo/XikF+vT8104isO7Ym8Xp7sIcRuvOQ3nuRsFVCRogxpLTVHD/k57rwYVqWWLaKLwvx01ZVXOq4GHk/BVaKa9ODC/dNgbZMfwvVVXuf7/NFGmSMyXb49Si4aoP4Gn7jAX6GngBbm/bgKqO0skQy/ggQm/YVF+s5q4EhleMBLVJKD1VpM5LeLDFpiu/y4bVd8wUcgK+QQ9 Concourse

  ## Concourse Session Signing Keys.
  ## Ref: https://concourse-ci.org/install.html#generating-keys
  ##
  sessionSigningKey: |-
    -----BEGIN RSA PRIVATE KEY-----
    MIIEowIBAAKCAQEAwLql/rUIaI+PX7Tl3FWcTee4sQf8/daakALXx955tPwkhqlY
    e4T2V84p/ylFvNWpM4vfcMYKfMY0JLKgAgBvJhCytSkDBhTBoWmN6yE0AB11P9En
    lIZRBWNYqaC2cSge2ZD8qOSnwfFhnQAW8+7pE+ElJAVh7dtdF3A478H50lIigq8I
    zMWp2EGJpFC7/Uu36oIL/03MNGCmrH1jvtTuJiAMQUZYyL1ReBkvvHOzw9i4HXPy
    SMVtcllm4NBs2aVPtwhr2kwSkLt8t1bPdRn6OIyEAw5WktzAKaiZnkTvj6g3xzdp
    zKcrdlBr9aznlNvoSinBUfvtwyFmvFN1HHbA9wIDAQABAoIBAE7G/DrUfI9gvtX7
    90jMpYsigFe8UCjho2PiBZlo0o6r0bJJXiV+/8J8PqZRlHPPUc4EClzqVjcSPRYS
    /VxUGRqSELoD/Xxq14rGvn+xnrO9VsOzFl6bWFq/dOpBCtHN+G4t2VifvgKES8YE
    11z19sdta+UBXjn/RFnkQSGfRCI3QqTaYvjxevt0uWlyPmqkFPQQw8bvHIXzoB+B
    rzeiMa++nMvbX5pAH9XA0BvhyuH3fHidTUwiVBpkMcpLWtjP0A0JTsecDdbinDDq
    un2EIo8zMWRwKQN/JnUxsi8AUEigBTCUqeDgREXtW62uvFkSpcVMXwmVityLYIVy
    qnVLUCECgYEA6IwXkP1qnSfcNeoVI/ypDuz1/kdqcjSPhLYe+jdiLLoFkMW9AlDm
    lzwNaWlTFD9ygo+NjJCo63/A8HCm55sajws5hZ6r20vdZcKFMk9h0qF5oVA7lkQ2
    gvG2WaznuU7KkqhfP+pXhiLgZKoJkst/+g7r6uHpredwDY6hxeBK4vsCgYEA1CqH
    8ywC5qUo/36kQg/TU2adN/YEHdJAAbU23EVrGQSVmnXW08H2NLFk0tsxrwoNnbgp
    PIk2J7BimbJvbND17ibr4GAklDTsR8aJkDl+0JgNCAK9N07qVt1s7FXzhg95jUL9
    EQW55z60GAJpecqNwA4Jsa8P852N0355Obp92TUCgYBkOBvf7JcJ66fHxH4f6D+j
    oxPQ5k5Fsck4VJS9GSlCRVkor09ptBvsiYDuMOoRC9b51YwXTDDAbWplNOd5YSrt
    AtVjdKJz/BoKRO7KY9Owxs54au+DLxqfDDSeKRokjoRW+CE0lnXp5RX3zCAcF3+r
    8MpTi9D9lYSBEzs84BDmCQKBgQCMcH6/K3HcJJVn0fd+tyUGftUw9sswxjySJNbk
    pZrH263/qWMDls+Xf5kire9MU1ZCAWZiaN0NFoed/2wcVpGEDAV0548u/30r4bKr
    YjOcdhmiJNYFJ1qdF0MDib2CDvpB1IbZXrX46RujDO2urbJ435HxKNVhR/had8xc
    tyKYxQKBgCVDhN0MhnlUQJVZfX42APmF4gQg0r3sfL/NGXjEjMIKKFe5a88eZVHr
    L8x1+dp0q7czC8a/l1DUuiwDKl8OEpxLsGCq/J/wAfrSMPifu6EUlbUwlJOPdgha
    +p/KFAelHXJ2w/8yackAcarh35VP7ixhuvxswHNdgvfsBTFcjn30
    -----END RSA PRIVATE KEY-----

  ## Concourse Worker Keys.
  ## Ref: https://concourse-ci.org/install.html#generating-keys
  ##
  workerKey: |-
    -----BEGIN RSA PRIVATE KEY-----
    MIIEpAIBAAKCAQEAuPehUmBXAQCoA7TLAQCYhf+vzcZVyj+VGXnMhLHnWLk7dRjo
    CU8GgNamdS5h7G3ywxOvKA3YjOLr8XyOMLS4c+e8N7tIzlMWdiXhe0lcBH9Z1ai5
    +Bof3/BlDUBksiKdc1A+QcfX6tDwMkOO5re1H4vOK3H/Cype58wCB03HYNgb05ED
    fW1Bj2qvz29VtmyjwEMuDs100iMqwCfPUx9oxXmmX8sUBRmw/Y1Rx/8pdKIjKw3m
    kWIHHBOSCPimO1qC47Aa8v/UH9hERCykyuFHiBiKlnIvZWm9bYvhsRTz4gt5KzRY
    6OI0oVeHlLOHDSK48Da8VWij15lOqO2Nx6WssQIDAQABAoIBADET22UNFOi6MNpS
    5S5N5ypezlnOD0NLnZcV3zMyNQ0wkNsgEakuo64Zxi7/cJIYFjq2hVoeWl//cdUw
    VFYODYcLbMBo3AeKukH9CRf6PgUfeUmcrENtQxnbIiTi+hTd5GMNXod7rAmtCJ59
    mHQVOGS3ZqvWYnKm+mmMktk3RPinynX/A4y3WHPacuAS58HM09Ck43WcHMxbGpsL
    /gZpICyFYZ2DviM+AHyWGcmw7LJrpC0QHo6+BAFMs4xlUecNgVIFUpfOoAcfsdtG
    K9j4AbuZ47iFisbay+1pyg/7O5eRTdGVQRtc7PBMOjea5jGsfmlDmdn1ZS50ykun
    ANfoQ5UCgYEA9Ak73PRy9nLlRkt4OBCF/4fwThUCMedsnWaVjQBMJYim4FB2ivF5
    cKdWt3y/RZI85KKYu0EXhLEoSIEAfz057R8t3QdVK4tZx6B47UFjBjCYeVMtwHDQ
    prxQiOPHIHCplBNFuGzA5VXL9gQLRD+ek0uOy2GJJ0Wu1xyeouI+SW8CgYEAwgkO
    TOtOogqmcAALjWgeeQiZetflSKbJlpQNhmCPAMm0SFI8eF4SpRXLzd41VC2mLIwT
    L3tjc7/8ocXoElFM4L0fo9Lx/SHFH4JEn5FT0PXPmvsF2JRhsXJFLJSihxF/91Xs
    2aBcQILPFzLcrI6OFUakNwGTU/CIxpkzRvQrG98CgYEAzNVnUuo4CNadzagRK3Xr
    E3Yl5VRK+FpY17FAfA6w25xc/dFr/un61e0Po4no/ltmEz7LVfmn5O/ScTEemq5o
    jbjrBShfe+JGpIH0nqiQlqR5hvSjZXEMIbfVHWGbRYZrQGgA0HEwZA7k2QXB8zI3
    R0lXfSzMM5OQ0uwp12xxfa8CgYBHILq1R6zTicPpWprhg0FobNaWSX4rW7iaEjvC
    /rJtP4Nu33Z7SUDcc1j6ZnJ2ISXBPrfpt/mE/OPHCZ1A2bysxadLjpBWkoKIQmCV
    fdiTyQgJb+t8sSf+vDzPUs0hZjDaogzo2ff3TfxMLMDoIHnFItgfsdwn8QyygIZj
    hC4pUQKBgQDqsxnkI6yXFE5gshnW7H8zqKNlzKd/dZEL6e+lRz4R3UY/KcEkRAfq
    Yi3cwo9fE3U3kSmpl5MQwUjWm/BZ7JyueoY/4ndwaFPgc34IKsgJ0wau9pZiQAB1
    DxpOSF+BR71Jx3sxvIdCODNTtm645j5yrZVnJAuMPofo5XFmunDoJA==
    -----END RSA PRIVATE KEY-----

  workerKeyPub: |-
    ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC496FSYFcBAKgDtMsBAJiF/6/NxlXKP5UZecyEsedYuTt1GOgJTwaA1qZ1LmHsbfLDE68oDdiM4uvxfI4wtLhz57w3u0jOUxZ2JeF7SVwEf1nVqLn4Gh/f8GUNQGSyIp1zUD5Bx9fq0PAyQ47mt7Ufi84rcf8LKl7nzAIHTcdg2BvTkQN9bUGPaq/Pb1W2bKPAQy4OzXTSIyrAJ89TH2jFeaZfyxQFGbD9jVHH/yl0oiMrDeaRYgccE5II+KY7WoLjsBry/9Qf2ERELKTK4UeIGIqWci9lab1ti+GxFPPiC3krNFjo4jShV4eUs4cNIrjwNrxVaKPXmU6o7Y3Hpayx Concourse

  ## Secrets for DB access
  ##
  postgresUser:
  postgresPassword:
  postgresCaCert:
  postgresClientCert:
  postgresClientKey:

  ## Secrets for DB encryption
  ##
  encryptionKey:
  oldEncryptionKey:

  ## Secrets for SSM AWS access
  ##
  awsSsmAccessKey:
  awsSsmSecretKey:
  awsSsmSessionToken:

  ## Secrets for Secrets Manager AWS access
  ##
  awsSecretsmanagerAccessKey:
  awsSecretsmanagerSecretKey:
  awsSecretsmanagerSessionToken:

  ## Secrets for CF OAuth
  ##
  cfClientId:
  cfClientSecret:
  cfCaCert:

  ## Secrets for BitbucketCloud OAuth.
  ##
  bitbucketCloudClientId:
  bitbucketCloudClientSecret:

  ## Secrets for GitHub OAuth.
  ##
  githubClientId:
  githubClientSecret:
  githubCaCert:

  ## Secrets for GitLab OAuth.
  ##
  gitlabClientId:
  gitlabClientSecret:

  ## Secrets for LDAP Auth.
  ##
  ldapCaCert:

  ## Secrets for generic OAuth.
  ##
  oauthClientId:
  oauthClientSecret:
  oauthCaCert:

  ## Secrets for oidc OAuth.
  ##
  oidcClientId:
  oidcClientSecret:
  oidcCaCert:

  ## Secrets for using Hashcorp Vault as a credential manager.
  ##
  ## if the Vault server is using a self-signed certificate, provide the CA public key.
  ## the value will be written to /concourse-vault/ca.cert
  ##
  vaultCaCert:

  ## initial periodic token issued for concourse
  ## Ref: https://www.vaultproject.io/docs/concepts/tokens.html#periodic-tokens
  ##
  vaultClientToken:

  ## vault authentication parameters
  ## Parameter to pass when logging in via the backend
  ## Required for "approle" authenication method
  ## e.g. "role_id=x,secret_id=x"
  ## Ref: https://concourse-ci.org/creds.html#vault-auth-param=NAME=VALUE
  ##
  vaultAuthParam:

  ## provide the client certificate for authenticating with the [TLS](https://www.vaultproject.io/docs/auth/cert.html) backend
  ## the value will be written to /concourse-vault/client.cert
  ## make sure to also set credentialManager.vault.authBackend to `cert`
  ##
  vaultClientCert:

  ## provide the client key for authenticating with the [TLS](https://www.vaultproject.io/docs/auth/cert.html) backend
  ## the value will be written to /concourse-vault/client.key
  ## make sure to also set credentialManager.vault.authBackend to `cert`
  ##
  vaultClientKey:

  ## If influxdb metrics are enabled and authentication is required,
  ## provide a password here to authenticate with the influxdb server configured.
  ##
  influxdbPassword:

  ## SSL certificate used to verify the Syslog server for draining build logs.
  ##
  syslogCaCert:
```

</details>

---

# Concourse Helm Chart

[Concourse](https://concourse-ci.org/) is a simple and scalable CI system.

## TL;DR;

```console
$ helm install stable/concourse
```

## Introduction

This chart bootstraps a [Concourse](https://concourse-ci.org/) deployment on a [Kubernetes](https://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites Details

- Kubernetes 1.6 (for [`pod affinity`](https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#affinity-and-anti-affinity) support)
- [`PersistentVolume`](https://kubernetes.io/docs/concepts/storage/persistent-volumes/) support on underlying infrastructure (if persistence is required)

## Installing the Chart

To install the chart with the release name `my-release`:

```console
$ helm install --name my-release stable/concourse
```

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```console
$ helm delete my-release
```

The command removes nearly all the Kubernetes components associated with the chart and deletes the release.

> ps: By default, a [namespace](https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/) is created for the `main` team named after `${RELEASE}-main` and is kept untouched after a `helm delete`.
> See the [Configuration section](#configuration) for how to control the behavior.

### Cleanup orphaned Persistent Volumes

This chart uses [`StatefulSets`](https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/) for Concourse Workers. Deleting a `StatefulSet` does not delete associated `PersistentVolume`s.

Do the following after deleting the chart release to clean up orphaned Persistent Volumes.

```console
$ kubectl delete pvc -l app=${RELEASE-NAME}-worker
```

### Restarting workers

If a [Worker](https://concourse-ci.org/architecture.html#architecture-worker) isn't taking on work, you can recreate it with `kubectl delete pod`. This initiates a graceful shutdown by ["retiring"](https://concourse-ci.org/worker-internals.html#RETIRING-table) the worker, to ensure Concourse doesn't try looking for old volumes on the new worker.

The value`worker.terminationGracePeriodSeconds` can be used to provide an upper limit on graceful shutdown time before forcefully terminating the container.

Check the output of `fly workers`, and if a worker is [`stalled`](https://concourse-ci.org/worker-internals.html#STALLED-table), you'll also need to run [`fly prune-worker`](https://concourse-ci.org/administration.html#fly-prune-worker) to allow the new incarnation of the worker to start.

> **TIP**: you can download `fly` either from https://concourse-ci.org/download.html or the home page of your Concourse installation.

### Worker Liveness Probe

By default, the worker's [`LivenessProbe`](https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/#container-probes) will trigger a restart of the worker container if it detects errors when trying to reach the worker's healthcheck endpoint which takes care of making sure that the [workers' components](https://concourse-ci.org/architecture.html#architecture) can properly serve their purpose.

See [Configuration](#configuration) and [`values.yaml`](./values.yaml) for the configuration of both the `livenessProbe` (`worker.livenessProbe`) and the default healthchecking timeout (`concourse.worker.healthcheckTimeout`).

## Configuration

The following table lists the configurable parameters of the Concourse chart and their default values.

| Parameter                                  | Description                                                                                                  | Default                          |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------ | -------------------------------- |
| `fullnameOverride`                         | Provide a name to substitute for the full names of resources                                                 | `nil`                            |
| `imageDigest`                              | Specific image digest to use in place of a tag.                                                              | `nil`                            |
| `imagePullPolicy`                          | Concourse image pull policy                                                                                  | `IfNotPresent`                   |
| `imagePullSecrets`                         | Array of imagePullSecrets in the namespace for pulling images                                                | `[]`                             |
| `imageTag`                                 | Concourse image version                                                                                      | `5.0.0`                          |
| `image`                                    | Concourse image                                                                                              | `concourse/concourse`            |
| `nameOverride`                             | Provide a name in place of `concourse` for `app:` labels                                                     | `nil`                            |
| `persistence.enabled`                      | Enable Concourse persistence using Persistent Volume Claims                                                  | `true`                           |
| `persistence.worker.accessMode`            | Concourse Worker Persistent Volume Access Mode                                                               | `ReadWriteOnce`                  |
| `persistence.worker.size`                  | Concourse Worker Persistent Volume Storage Size                                                              | `20Gi`                           |
| `persistence.worker.storageClass`          | Concourse Worker Persistent Volume Storage Class                                                             | `generic`                        |
| `postgresql.enabled`                       | Enable PostgreSQL as a chart dependency                                                                      | `true`                           |
| `postgresql.persistence.accessMode`        | Persistent Volume Access Mode                                                                                | `ReadWriteOnce`                  |
| `postgresql.persistence.enabled`           | Enable PostgreSQL persistence using Persistent Volume Claims                                                 | `true`                           |
| `postgresql.persistence.size`              | Persistent Volume Storage Size                                                                               | `8Gi`                            |
| `postgresql.persistence.storageClass`      | Concourse data Persistent Volume Storage Class                                                               | `nil`                            |
| `postgresql.postgresDatabase`              | PostgreSQL Database to create                                                                                | `concourse`                      |
| `postgresql.postgresPassword`              | PostgreSQL Password for the new user                                                                         | `concourse`                      |
| `postgresql.postgresUser`                  | PostgreSQL User to create                                                                                    | `concourse`                      |
| `rbac.apiVersion`                          | RBAC version                                                                                                 | `v1beta1`                        |
| `rbac.create`                              | Enables creation of RBAC resources                                                                           | `true`                           |
| `rbac.webServiceAccountName`               | Name of the service account to use for web pods if `rbac.create` is `false`                                  | `default`                        |
| `rbac.workerServiceAccountName`            | Name of the service account to use for workers if `rbac.create` is `false`                                   | `default`                        |
| `secrets.awsSecretsmanagerAccessKey`       | AWS Access Key ID for Secrets Manager access                                                                 | `nil`                            |
| `secrets.awsSecretsmanagerSecretKey`       | AWS Secret Access Key ID for Secrets Manager access                                                          | `nil`                            |
| `secrets.awsSecretsmanagerSessionToken`    | AWS Session Token for Secrets Manager access                                                                 | `nil`                            |
| `secrets.awsSsmAccessKey`                  | AWS Access Key ID for SSM access                                                                             | `nil`                            |
| `secrets.awsSsmSecretKey`                  | AWS Secret Access Key ID for SSM access                                                                      | `nil`                            |
| `secrets.awsSsmSessionToken`               | AWS Session Token for SSM access                                                                             | `nil`                            |
| `secrets.bitbucketCloudClientId`           | Client ID for the BitbucketCloud OAuth                                                                       | `nil`                            |
| `secrets.bitbucketCloudClientSecret`       | Client Secret for the BitbucketCloud OAuth                                                                   | `nil`                            |
| `secrets.cfCaCert`                         | CA certificate for cf auth provider                                                                          | `nil`                            |
| `secrets.cfClientId`                       | Client ID for cf auth provider                                                                               | `nil`                            |
| `secrets.cfClientSecret`                   | Client secret for cf auth provider                                                                           | `nil`                            |
| `secrets.create`                           | Create the secret resource from the following values. _See [Secrets](#secrets)_                              | `true`                           |
| `secrets.encryptionKey`                    | current encryption key                                                                                       | `nil`                            |
| `secrets.githubCaCert`                     | CA certificate for Enterprise Github OAuth                                                                   | `nil`                            |
| `secrets.githubClientId`                   | Application client ID for GitHub OAuth                                                                       | `nil`                            |
| `secrets.githubClientSecret`               | Application client secret for GitHub OAuth                                                                   | `nil`                            |
| `secrets.gitlabClientId`                   | Application client ID for GitLab OAuth                                                                       | `nil`                            |
| `secrets.gitlabClientSecret`               | Application client secret for GitLab OAuth                                                                   | `nil`                            |
| `secrets.hostKeyPub`                       | Concourse Host Public Key                                                                                    | _See [values.yaml](values.yaml)_ |
| `secrets.hostKey`                          | Concourse Host Private Key                                                                                   | _See [values.yaml](values.yaml)_ |
| `secrets.influxdbPassword`                 | Password used to authenticate with influxdb                                                                  | `nil`                            |
| `secrets.ldapCaCert`                       | CA Certificate for LDAP                                                                                      | `nil`                            |
| `secrets.localUsers`                       | Create concourse local users. Default username and password are `test:test` _See [values.yaml](values.yaml)_ |
| `secrets.oauthCaCert`                      | CA certificate for Generic OAuth                                                                             | `nil`                            |
| `secrets.oauthClientId`                    | Application client ID for Generic OAuth                                                                      | `nil`                            |
| `secrets.oauthClientSecret`                | Application client secret for Generic OAuth                                                                  | `nil`                            |
| `secrets.oidcCaCert`                       | CA certificate for OIDC Oauth                                                                                | `nil`                            |
| `secrets.oidcClientId`                     | Application client ID for OIDI OAuth                                                                         | `nil`                            |
| `secrets.oidcClientSecret`                 | Application client secret for OIDC OAuth                                                                     | `nil`                            |
| `secrets.oldEncryptionKey`                 | old encryption key, used for key rotation                                                                    | `nil`                            |
| `secrets.postgresCaCert`                   | PostgreSQL CA certificate                                                                                    | `nil`                            |
| `secrets.postgresClientCert`               | PostgreSQL Client certificate                                                                                | `nil`                            |
| `secrets.postgresClientKey`                | PostgreSQL Client key                                                                                        | `nil`                            |
| `secrets.postgresPassword`                 | PostgreSQL User Password                                                                                     | `nil`                            |
| `secrets.postgresUser`                     | PostgreSQL User Name                                                                                         | `nil`                            |
| `secrets.sessionSigningKey`                | Concourse Session Signing Private Key                                                                        | _See [values.yaml](values.yaml)_ |
| `secrets.syslogCaCert`                     | SSL certificate to verify Syslog server                                                                      | `nil`                            |
| `secrets.teamAuthorizedKeys`               | Array of team names and worker public keys for external workers                                              | `nil`                            |
| `secrets.vaultAuthParam`                   | Paramter to pass when logging in via the backend                                                             | `nil`                            |
| `secrets.vaultCaCert`                      | CA certificate use to verify the vault server SSL cert                                                       | `nil`                            |
| `secrets.vaultClientCert`                  | Vault Client Certificate                                                                                     | `nil`                            |
| `secrets.vaultClientKey`                   | Vault Client Key                                                                                             | `nil`                            |
| `secrets.vaultClientToken`                 | Vault periodic client token                                                                                  | `nil`                            |
| `secrets.webTlsCert`                       | TLS certificate for the web component to terminate TLS connections                                           | `nil`                            |
| `secrets.webTlsKey`                        | An RSA private key, used to encrypt HTTPS traffic                                                            | `nil`                            |
| `secrets.workerKeyPub`                     | Concourse Worker Public Key                                                                                  | _See [values.yaml](values.yaml)_ |
| `secrets.workerKey`                        | Concourse Worker Private Key                                                                                 | _See [values.yaml](values.yaml)_ |
| `web.additionalAffinities`                 | Additional affinities to apply to web pods. E.g: node affinity                                               | `{}`                             |
| `web.additionalVolumeMounts`               | VolumeMounts to be added to the web pods                                                                     | `nil`                            |
| `web.additionalVolumes`                    | Volumes to be added to the web pods                                                                          | `nil`                            |
| `web.annotations`                          | Concourse Web deployment annotations                                                                         | `nil`                            |
| `web.authSecretsPath`                      | Specify the mount directory of the web auth secrets                                                          | `/concourse-auth`                |
| `web.env`                                  | Configure additional environment variables for the web containers                                            | `[]`                             |
| `web.ingress.annotations`                  | Concourse Web Ingress annotations                                                                            | `{}`                             |
| `web.ingress.enabled`                      | Enable Concourse Web Ingress                                                                                 | `false`                          |
| `web.ingress.hosts`                        | Concourse Web Ingress Hostnames                                                                              | `[]`                             |
| `web.ingress.tls`                          | Concourse Web Ingress TLS configuration                                                                      | `[]`                             |
| `web.keySecretsPath`                       | Specify the mount directory of the web keys secrets                                                          | `/concourse-keys`                |
| `web.livenessProbe.failureThreshold`       | Minimum consecutive failures for the probe to be considered failed after having succeeded                    | `5`                              |
| `web.livenessProbe.httpGet.path`           | Path to access on the HTTP server when performing the healthcheck                                            | `/api/v1/info`                   |
| `web.livenessProbe.httpGet.port`           | Name or number of the port to access on the container                                                        | `atc`                            |
| `web.livenessProbe.initialDelaySeconds`    | Number of seconds after the container has started before liveness probes are initiated                       | `10`                             |
| `web.livenessProbe.periodSeconds`          | How often (in seconds) to perform the probe                                                                  | `15`                             |
| `web.livenessProbe.timeoutSeconds`         | Number of seconds after which the probe times out                                                            | `3`                              |
| `web.nameOverride`                         | Override the Concourse Web components name                                                                   | `nil`                            |
| `web.nodeSelector`                         | Node selector for web nodes                                                                                  | `{}`                             |
| `web.postgresqlSecretsPath`                | Specify the mount directory of the web postgresql secrets                                                    | `/concourse-postgresql`          |
| `web.readinessProbe.httpGet.path`          | Path to access on the HTTP server when performing the healthcheck                                            | `/api/v1/info`                   |
| `web.readinessProbe.httpGet.port`          | Name or number of the port to access on the container                                                        | `atc`                            |
| `web.replicas`                             | Number of Concourse Web replicas                                                                             | `1`                              |
| `web.resources.requests.cpu`               | Minimum amount of cpu resources requested                                                                    | `100m`                           |
| `web.resources.requests.memory`            | Minimum amount of memory resources requested                                                                 | `128Mi`                          |
| `web.service.annotations`                  | Concourse Web Service annotations                                                                            | `nil`                            |
| `web.service.atcNodePort`                  | Sets the nodePort for atc when using `NodePort`                                                              | `nil`                            |
| `web.service.atcTlsNodePort`               | Sets the nodePort for atc tls when using `NodePort`                                                          | `nil`                            |
| `web.service.labels`                       | Additional concourse web service labels                                                                      | `nil`                            |
| `web.service.loadBalancerIP`               | The IP to use when web.service.type is LoadBalancer                                                          | `nil`                            |
| `web.service.loadBalancerSourceRanges`     | Concourse Web Service Load Balancer Source IP ranges                                                         | `nil`                            |
| `web.service.tsaNodePort`                  | Sets the nodePort for tsa when using `NodePort`                                                              | `nil`                            |
| `web.service.type`                         | Concourse Web service type                                                                                   | `ClusterIP`                      |
| `web.sidecarContainers`                    | Array of extra containers to run alongside the Concourse web container                                       | `nil`                            |
| `web.syslogSecretsPath`                    | Specify the mount directory of the web syslog secrets                                                        | `/concourse-syslog`              |
| `web.tlsSecretsPath`                       | Where in the container the web TLS secrets should be mounted                                                 | `/concourse-web-tls`             |
| `web.tolerations`                          | Tolerations for the web nodes                                                                                | `[]`                             |
| `web.vaultSecretsPath`                     | Specify the mount directory of the web vault secrets                                                         | `/concourse-vault`               |
| `worker.additionalAffinities`              | Additional affinities to apply to worker pods. E.g: node affinity                                            | `{}`                             |
| `worker.additionalVolumeMounts`            | VolumeMounts to be added to the worker pods                                                                  | `nil`                            |
| `worker.additionalVolumes`                 | Volumes to be added to the worker pods                                                                       | `nil`                            |
| `worker.annotations`                       | Annotations to be added to the worker pods                                                                   | `{}`                             |
| `worker.cleanUpWorkDirOnStart`             | Removes any previous state created in `concourse.worker.workDir`                                             | `true`                           |
| `worker.emptyDirSize`                      | When persistance is disabled this value will be used to limit the emptyDir volume size                       | `nil`                            |
| `worker.env`                               | Configure additional environment variables for the worker container(s)                                       | `[]`                             |
| `worker.hardAntiAffinity`                  | Should the workers be forced (as opposed to preferred) to be on different nodes?                             | `false`                          |
| `worker.keySecretsPath`                    | Specify the mount directory of the worker keys secrets                                                       | `/concourse-keys`                |
| `worker.livenessProbe.failureThreshold`    | Minimum consecutive failures for the probe to be considered failed after having succeeded                    | `5`                              |
| `worker.livenessProbe.httpGet.path`        | Path to access on the HTTP server when performing the healthcheck                                            | `/`                              |
| `worker.livenessProbe.httpGet.port`        | Name or number of the port to access on the container                                                        | `worker-hc`                      |
| `worker.livenessProbe.initialDelaySeconds` | Number of seconds after the container has started before liveness probes are initiated                       | `10`                             |
| `worker.livenessProbe.periodSeconds`       | How often (in seconds) to perform the probe                                                                  | `15`                             |
| `worker.livenessProbe.timeoutSeconds`      | Number of seconds after which the probe times out                                                            | `3`                              |
| `worker.minAvailable`                      | Minimum number of workers available after an eviction                                                        | `1`                              |
| `worker.nameOverride`                      | Override the Concourse Worker components name                                                                | `nil`                            |
| `worker.nodeSelector`                      | Node selector for worker nodes                                                                               | `{}`                             |
| `worker.podManagementPolicy`               | `OrderedReady` or `Parallel` (requires Kubernetes >= 1.7)                                                    | `Parallel`                       |
| `worker.readinessProbe`                    | Periodic probe of container service readiness                                                                | `{}`                             |
| `worker.replicas`                          | Number of Concourse Worker replicas                                                                          | `2`                              |
| `worker.resources.requests.cpu`            | Minimum amount of cpu resources requested                                                                    | `100m`                           |
| `worker.resources.requests.memory`         | Minimum amount of memory resources requested                                                                 | `512Mi`                          |
| `worker.sidecarContainers`                 | Array of extra containers to run alongside the Concourse worker container                                    | `nil`                            |
| `worker.terminationGracePeriodSeconds`     | Upper bound for graceful shutdown to allow the worker to drain its tasks                                     | `60`                             |
| `worker.tolerations`                       | Tolerations for the worker nodes                                                                             | `[]`                             |
| `worker.updateStrategy`                    | `OnDelete` or `RollingUpdate` (requires Kubernetes >= 1.7)                                                   | `RollingUpdate`                  |

For configurable Concourse parameters, refer to [`values.yaml`](values.yaml)' `concourse` section. All parameters under this section are strictly mapped from the `concourse` binary commands.

For example if one needs to configure the Concourse external URL, the param `concourse` -> `web` -> `externalUrl` should be set, which is equivalent to running the `concourse` binary as `concourse web --external-url`.

For those sub-sections that have `enabled`, one needs to set `enabled` to be `true` to use the following params within the section.

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`.

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart. For example,

```console
$ helm install --name my-release -f values.yaml stable/concourse
```

> **Tip**: You can use the default [values.yaml](values.yaml)

### Secrets

For your convenience, this chart provides some default values for secrets, but it is recommended that you generate and manage these secrets outside the Helm chart.

To do that, set `secrets.create` to `false`, create files for each secret value, and turn it all into a Kubernetes [Secret](https://kubernetes.io/docs/concepts/configuration/secret/).

Be careful with introducing trailing newline characters; following the steps below ensures none end up in your secrets. First, perform the following to create the mandatory secret values:

```sh
# Create a directory to host the set of secrets that are
# required for a working Concourse installation and get
# into it.
#
mkdir concourse-secrets
cd concourse-secrets

# Generate the files for the secrets that are required:
# - web key pair,
# - worker key pair, and
# - the session signing token.
#
ssh-keygen -t rsa -f host-key  -N ''
mv host-key.pub host-key-pub
ssh-keygen -t rsa -f worker-key  -N ''
mv worker-key.pub worker-key-pub
ssh-keygen -t rsa -f session-signing-key  -N ''
rm session-signing-key.pub
printf "%s:%s" "concourse" "$(openssl rand -base64 24)" > local-users
```

You'll also need to create/copy secret values for optional features. See [templates/secrets.yaml](templates/secrets.yaml) for possible values.

In the example below, we are not using the [PostgreSQL](#postgresql) chart dependency, and so we must set `postgresql-user` and `postgresql-password` secrets.

```sh
# Still within the directory where our secrets exist,
# copy a postgres user to clipboard and paste it to file.
#
printf "%s" "$(pbpaste)" > postgresql-user

# Copy a postgres password to clipboard and paste it to file
#
printf "%s" "$(pbpaste)" > postgresql-password

# Copy Github client id and secrets to clipboard and paste to files
#
printf "%s" "$(pbpaste)" > github-client-id
printf "%s" "$(pbpaste)" > github-client-secret

# Set an encryption key for DB encryption at rest
#
printf "%s" "$(openssl rand -base64 24)" > encryption-key
```

Then create a secret called `[release-name]-concourse` from all the secret value files in the current folder:

```console
kubectl create secret generic my-release-concourse --from-file=.
```

Make sure you clean up after yourself.

### Persistence

This chart mounts a Persistent Volume for each Concourse Worker.

The volume is created using dynamic volume provisioning.

If you want to disable it or change the persistence properties, update the `persistence` section of your custom `values.yaml` file:

```yaml
## Persistent Volume Storage configuration.
## ref: https://kubernetes.io/docs/user-guide/persistent-volumes
##
persistence:
  ## Enable persistence using Persistent Volume Claims.
  ##
  enabled: true

  ## Worker Persistence configuration.
  ##
  worker:
    ## Persistent Volume Storage Class.
    ##
    class: generic

    ## Persistent Volume Access Mode.
    ##
    accessMode: ReadWriteOnce

    ## Persistent Volume Storage Size.
    ##
    size: '20Gi'
```

It is highly recommended to use Persistent Volumes for Concourse Workers; otherwise, the Concourse volumes managed by the Worker are stored in an [`emptyDir`](https://kubernetes.io/docs/concepts/storage/volumes/#emptydir) volume on the Kubernetes node's disk. This will interfere with Kubernete's [ImageGC](https://kubernetes.io/docs/concepts/cluster-administration/kubelet-garbage-collection/#image-collection) and the node's disk will fill up as a result.

### Ingress TLS

If your cluster allows automatic creation/retrieval of TLS certificates (e.g. [kube-lego](https://github.com/jetstack/kube-lego)), please refer to the documentation for that mechanism.

To manually configure TLS, first create/retrieve a key & certificate pair for the address(es) you wish to protect. Then create a TLS secret in the namespace:

```console
kubectl create secret tls concourse-web-tls --cert=path/to/tls.cert --key=path/to/tls.key
```

Include the secret's name, along with the desired hostnames, in the `web.ingress.tls` section of your custom `values.yaml` file:

```yaml
## Configuration values for Concourse Web components.
##
web:
  ## Ingress configuration.
  ## ref: https://kubernetes.io/docs/user-guide/ingress/
  ##
  ingress:
    ## Enable ingress.
    ##
    enabled: true

    ## Hostnames.
    ## Must be provided if Ingress is enabled.
    ##
    hosts:
      - concourse.domain.com

    ## TLS configuration.
    ## Secrets must be manually created in the namespace.
    ##
    tls:
      - secretName: concourse-web-tls
        hosts:
          - concourse.domain.com
```

### PostgreSQL

By default, this chart uses a PostgreSQL database deployed as a chart dependency, with default values for username, password, and database name. These can be modified by setting the `postgresql.*` values.

You can also bring your own PostgreSQL. To do so, set `postgresql.enabled` to false, and then configure Concourse's `postgres` values (`concourse.web.postgres.*`).

Note that some values get set in the form of secrets, like `postgresql-user`, `postgresql-password`, and others (see [templates/secrets.yaml](templates/secrets.yaml) for possible values and the [secrets section](#secrets) on this README for guidance on how to set those secrets).

### Credential Management

Pipelines usually need credentials to do things. Concourse supports the use of a [Credential Manager](https://concourse-ci.org/creds.html) so your pipelines can contain references to secrets instead of the actual secret values. You can't use more than one credential manager at a time.

#### Kubernetes Secrets

By default, this chart uses Kubernetes Secrets as a credential manager.

For a given Concourse _team_, a pipeline looks for secrets in a namespace named `[namespacePrefix][teamName]`. The namespace prefix is the release name followed by a hyphen by default, and can be overridden with the value `concourse.web.kubernetes.namespacePrefix`. Each team listed under `concourse.web.kubernetes.teams` will have a namespace created for it, and the namespace remains after deletion of the release unless you set `concourse.web.kubernetes.keepNamespace` to `false`. By default, a namespace will be created for the `main` team.

The service account used by Concourse must have `get` access to secrets in that namespace. When `rbac.create` is true, this access is granted for each team listed under `concourse.web.kubernetes.teams`.

Here are some examples of the lookup heuristics, given release name `concourse`:

In team `accounting-dev`, pipeline `my-app`; the expression `((api-key))` resolves to:

1. the secret value in namespace: `concourse-accounting-dev` secret: `my-app.api-key`, key: `value`
2. and if not found, is the value in namespace: `concourse-accounting-dev` secret: `api-key`, key: `value`

In team accounting-dev, pipeline `my-app`, the expression `((common-secrets.api-key))` resolves to:

1. the secret value in namespace: `concourse-accounting-dev` secret: `my-app.common-secrets`, key: `api-key`
2. and if not found, is the value in namespace: `concourse-accounting-dev` secret: `common-secrets`, key: `api-key`

Be mindful of your team and pipeline names, to ensure they can be used in namespace and secret names, e.g. no underscores.

To test, create a secret in namespace `concourse-main`:

```console
kubectl create secret generic hello --from-literal 'value=Hello world!'
```

Then `fly set-pipeline` with the following pipeline, and trigger it:

```yaml
jobs:
  - name: hello-world
    plan:
      - task: say-hello
        config:
          platform: linux
          image_resource:
            type: docker-image
            source: {repository: alpine}
          params:
            HELLO: ((hello))
          run:
            path: /bin/sh
            args: ['-c', 'echo $HELLO']
```

#### Hashicorp Vault

To use Vault, set `concourse.web.kubernetes.enabled` to false, and set the following values:

```yaml
## Configuration values for the Credential Manager.
## ref: https://concourse-ci.org/creds.html
##
concourse:
  web:
    vault:
      ## Use Hashicorp Vault for the Credential Manager.
      ##
      enabled: false
      ## URL pointing to vault addr (i.e. http://vault:8200).
      ##
      # url:
      ## vault path under which to namespace credential lookup, defaults to /concourse.
      ##
      # pathPrefix:
```

#### AWS Systems Manager Parameter Store (SSM)

To use SSM, set `concourse.web.kubernetes.enabled` to false, and set `concourse.web.awsSsm.enabled` to true.

Authentication can be configured to use an access key and secret key as well as a session token. This is done by setting `concourse.web.awsSsm.keyAuth.enabled` to `true`. Alternatively, if it set to `false`, AWS IAM role based authentication (instance or pod credentials) is assumed. To use a session token, `concourse.web.awsSsm.useSessionToken` should be set to `true`. The secret values can be managed using the values specified in this helm chart or separately. For more details, see https://concourse-ci.org/creds.html#ssm.

For a given Concourse _team_, a pipeline looks for secrets in SSM using either `/concourse/{team}/{secret}` or `/concourse/{team}/{pipeline}/{secret}`; the patterns can be overridden using the `concourse.web.awsSsm.teamSecretTemplate` and `concourse.web.awsSsm.pipelineSecretTemplate` settings.

Concourse requires AWS credentials which are able to read from SSM for this feature to function. Credentials can be set in the `secrets.awsSsm*` settings; if your cluster is running in a different AWS region, you may also need to set `concourse.web.awsSsm.region`.

The minimum IAM policy you need to use SSM with Concourse is:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "kms:Decrypt",
      "Resource": "<kms-key-arn>",
      "Effect": "Allow"
    },
    {
      "Action": "ssm:GetParameter*",
      "Resource": "<...arn...>:parameter/concourse/*",
      "Effect": "Allow"
    }
  ]
}
```

Where `<kms-key-arn>` is the ARN of the KMS key used to encrypt the secrets in Parameter Store, and the `<...arn...>` should be replaced with a correct ARN for your account and region's Parameter Store.

#### AWS Secrets Manager

To use Secrets Manager, set `concourse.web.kubernetes.enabled` to false, and set `concourse.web.awsSecretsManager.enabled` to true.

Authentication can be configured to use an access key and secret key as well as a session token. This is done by setting `concourse.web.awsSecretsManager.keyAuth.enabled` to `true`. Alternatively, if it set to `false`, AWS IAM role based authentication (instance or pod credentials) is assumed. To use a session token, `concourse.web.awsSecretsManger.useSessionToken` should be set to `true`. The secret values can be managed using the values specified in this helm chart or separately. For more details, see https://concourse-ci.org/creds.html#asm.

For a given Concourse _team_, a pipeline looks for secrets in Secrets Manager using either `/concourse/{team}/{secret}` or `/concourse/{team}/{pipeline}/{secret}`; the patterns can be overridden using the `concourse.web.awsSecretsManager.teamSecretTemplate` and `concourse.web.awsSecretsManager.pipelineSecretTemplate` settings.

Concourse requires AWS credentials which are able to read from Secrets Manager for this feature to function. Credentials can be set in the `secrets.awsSecretsmanager*` settings; if your cluster is running in a different AWS region, you may also need to set `concourse.web.awsSecretsManager.region`.

The minimum IAM policy you need to use Secrets Manager with Concourse is:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowAccessToSecretManagerParameters",
      "Effect": "Allow",
      "Action": ["secretsmanager:ListSecrets"],
      "Resource": "*"
    },
    {
      "Sid": "AllowAccessGetSecret",
      "Effect": "Allow",
      "Action": ["secretsmanager:GetSecretValue", "secretsmanager:DescribeSecret"],
      "Resource": ["arn:aws:secretsmanager:::secret:/concourse/*"]
    }
  ]
}
```
