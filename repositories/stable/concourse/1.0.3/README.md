# `@helm-charts/stable-concourse`

Concourse is a simple and scalable CI system.

| Field               | Value     |
| ------------------- | --------- |
| Repository Name     | stable    |
| Chart Name          | concourse |
| Chart Version       | 1.0.3     |
| NPM Package Version | 0.1.0     |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
## Default values for Concourse Helm Chart.
## This is a YAML-formatted file.
## Declare variables to be passed into your templates.

## Override the name of the Chart.
##
# nameOverride:

## Concourse image.
##
image: concourse/concourse

## Concourse image version.
## ref: https://hub.docker.com/r/concourse/concourse/tags/
##
imageTag: '3.9.0'

## Specify a imagePullPolicy: 'Always' if imageTag is 'latest', else set to 'IfNotPresent'.
## ref: https://kubernetes.io/docs/user-guide/images/#pre-pulling-images
##
imagePullPolicy: IfNotPresent

## Configuration values for Concourse.
## ref: https://concourse.ci/setting-up.html
##
concourse:
  ## ATC listen port.
  ## ref: https://concourse.ci/architecture.html
  ##
  atcPort: 8080

  ## TSA listen port.
  ## ref: https://concourse.ci/architecture.html
  ##
  tsaPort: 2222

  ## Allow self signed certificates.
  ##
  allowSelfSignedCertificates: false

  ## Length of time for which tokens are valid. Afterwards, users will have to log back in.
  ## Use Go duration format (48h = 48 hours).
  ##
  authDuration: 24h

  ## Interval on which to check for new versions of resources.
  ## Use Go duration format (1m = 1 minute).
  ##
  resourceCheckingInterval: 1m

  ## How long to cache the result of a get step after a newer version of the resource is found.
  ## Use Go duration format (1m = 1 minute).
  ##
  oldResourceGracePeriod: 5m

  ## The interval on which to check for and release old caches of resource versions.
  ## Use Go duration format (1m = 1 minute),
  ##
  resourceCacheCleanupInterval: 30s

  ## URL used to reach any ATC from the outside world.
  ##
  # externalURL:

  ## The filesystem driver used by baggageclaim on workers, can be values
  ## "btrfs", "overlay", or "naive". As of 3.9 "btrfs" is recommended, while "naive" is most
  ## supported but least space efficient. For background see
  ## https://github.com/concourse/concourse/issues/1230 and
  ## https://github.com/concourse/concourse/issues/1966
  ##
  baggageclaimDriver: naive

  ## The selection strategy for placing containers onto workers, as of Concourse 3.7 this can be
  ## "volume-locality" or "random". Random can better spread load across workers, see
  ## https://github.com/concourse/atc/pull/219 for background.
  ##
  containerPlacementStrategy: random

  ## An URL pointing to the Docker registry to use to fetch Docker images.
  ## If unset, this will default to the Docker default
  ##
  # dockerRegistry:

  ## Docker registry(ies) (comma separated) to allow connecting to even if not secure.
  ##
  # insecureDockerRegistry:

  ## Enable encryption of pipeline configuration. Encryption keys can be set via secrets.
  ## See https://concourse.ci/encryption.html
  ##
  encryption:
    enabled: false

  ## Enable basic auth for the "main" Concourse team.
  ## See https://concourse.ci/teams.html#basic-auth
  ##
  basicAuth:
    enabled: true

  ## Enable GitHub auth for the "main" Concourse team.
  ## See https://concourse.ci/teams.html#github-auth
  ##
  githubAuth:
    enabled: false
    ## GitHub organizations (comma separated) whose members will have access.
    ##
    # organization:
    ## GitHub teams (comma separated) whose members will have access.
    ##
    # team:
    ## GitHub users (comma separated) to permit access.
    ##
    # user:
    ## Override default endpoint AuthURL for Github Enterprise.
    ##
    # authUrl:
    ## Override default endpoint TokenURL for Github Enterprise.
    ##
    # tokenUrl:
    ## Override default API endpoint URL for Github Enterprise.
    ##
    # apiUrl:

  ## Enable Gitlab auth for the "main" Concourse team.
  ##
  gitlabAuth:
    enabled: false
    ## GitLab Group (comma separated) whose members will have access.
    ##
    # group:
    ## Endpoint AuthURL for Gitlab server.
    ##
    # authUrl:
    ## Endpoint TokenURL for Gitlab server.
    ##
    # tokenUrl:
    ## API endpoint URL for Gitlab server.
    ##
    # apiUrl:

  ## Enable generic OAuth for the "main" Concourse team.
  ## See https://concourse.ci/teams.html#generic-oauth
  ##
  genericOauth:
    enabled: false
    ## Name for this auth method on the web UI.
    ##
    # displayName:
    ## Generic OAuth provider AuthURL endpoint.
    ##
    # authUrl:
    ## Parameters (comma separated) to pass to the authentication server AuthURL.
    ##
    # authUrlParam:
    ## Optional scope required to authorize user.
    ##
    # scope:
    ## Generic OAuth provider TokenURL endpoint.
    ##
    # tokenUrl:

## Configuration values for Concourse Web components.
##
web:
  ## Override the components name (defaults to web).
  ##
  # nameOverride:

  ## Number of replicas.
  ##
  replicas: 1

  ## Configure resource requests and limits.
  ## ref: https://kubernetes.io/docs/user-guide/compute-resources/
  ##
  resources:
    requests:
      cpu: '100m'
      memory: '128Mi'

  ## Additional affinities to add to the web pods.
  ##
  # additionalAffinities:
  #   nodeAffinity:
  #     preferredDuringSchedulingIgnoredDuringExecution:
  #       - weight: 50
  #         preference:
  #           matchExpressions:
  #             - key: spot
  #               operator: NotIn
  #               values:
  #                 - "true"

  ## Tolerations for the web nodes.
  ## Ref: https://kubernetes.io/docs/concepts/configuration/taint-and-toleration/
  tolerations: []
  # tolerations:
  #  - key: "toleration=key"
  #    operator: "Equal"
  #    value: "value"
  #    effect: "NoSchedule"

  ## Service configuration.
  ## ref: https://kubernetes.io/docs/user-guide/services/
  ##
  service:
    ## For minikube, set this to ClusterIP, elsewhere use LoadBalancer or NodePort
    ## ref: https://kubernetes.io/docs/user-guide/services/#publishing-services---service-types
    ##
    type: ClusterIP

    ## Annotations to be added to the web service.
    ##
    # annotations:
    #   prometheus.io/probe: "true"
    #   prometheus.io/probe_path: "/"

  # When using web.service.type: NodePort, sets the nodePort for atc
  #  atcNodePort: 30150
  #
  # When using web.service.type: NodePort, sets the nodePort for tsa
  #  tsaNodePort: 30151

  ## Ingress configuration.
  ## ref: https://kubernetes.io/docs/user-guide/ingress/
  ##
  ingress:
    ## Enable Ingress.
    ##
    enabled: false

    ## Annotations to be added to the web ingress.
    ##
    # annotations:
    #   kubernetes.io/ingress.class: nginx
    #   kubernetes.io/tls-acme: 'true'
    ## Hostnames.
    ## Must be provided if Ingress is enabled.
    ##
    # hosts:
    #   - concourse.domain.com
    ## TLS configuration.
    ## Secrets must be manually created in the namespace.
    ##
    # tls:
    #   - secretName: concourse-web-tls
    #     hosts:
    #       - concourse.domain.com
    #
    #

  ## Metric Configuration
  ## ref: https://concourse.ci/metrics.html
  ##
  metrics:
    ## Enable the prometheus metrics?
    ## Port is per https://github.com/prometheus/prometheus/wiki/Default-port-allocations
    ##
    prometheus:
      enabled: false
      port: 9391

## Configuration values for Concourse Worker components.
##
worker:
  ## Override the components name (defaults to worker).
  ##
  # nameOverride:

  ## Number of replicas.
  ##
  replicas: 2

  ## Minimum number of workers available after an eviction
  ## ref: https://kubernetes.io/docs/admin/disruptions/
  ##
  minAvailable: 1

  ## Configure resource requests and limits.
  ## ref: https://kubernetes.io/docs/user-guide/compute-resources/
  ##
  resources:
    requests:
      cpu: '100m'
      memory: '512Mi'

  ## Configure additional environment variables for the
  ## worker container(s)
  # env:
  #   - name: http_proxy
  #     value: "http://proxy.your-domain.com:3128"
  #   - name: https_proxy
  #     value: "http://proxy.your-domain.com:3128"
  #   - name: no_proxy
  #     value: "your-domain.com"
  #   - name: CONCOURSE_GARDEN_DNS_SERVER
  #     value: "8.8.8.8"
  #   - name: CONCOURSE_GARDEN_DNS_PROXY_ENABLE
  #     value: "true"

  ## Annotations to be added to the worker pods.
  ##
  # annotations:
  #   iam.amazonaws.com/role: arn:aws:iam::123456789012:role/concourse
  #

  ## Node selector for the worker nodes.
  ## Ref: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#nodeselector
  nodeSelector: {}
  # nodeSelector: {type: concourse}

  ## Additional affinities to add to the worker pods.
  ## Useful if you prefer to run workers on non-spot instances, for example
  ##
  # additionalAffinities:
  #   nodeAffinity:
  #     preferredDuringSchedulingIgnoredDuringExecution:
  #       - weight: 50
  #         preference:
  #           matchExpressions:
  #             - key: spot
  #               operator: NotIn
  #               values:
  #                 - "true"

  ## Tolerations for the worker nodes.
  ## Ref: https://kubernetes.io/docs/concepts/configuration/taint-and-toleration/
  tolerations: []
  # tolerations:
  #  - key: "toleration=key"
  #    operator: "Equal"
  #    value: "value"
  #    effect: "NoSchedule"

  ## Time to allow the pod to terminate before being forcefully terminated. This should provide time for
  ## the worker to retire, i.e. drain its tasks. See https://concourse.ci/worker-internals.html for worker
  ## lifecycle semantics.
  terminationGracePeriodSeconds: 60

  ## If any of the strings are found in logs, the worker's livenessProbe will fail and trigger a pod restart.
  ## Specify one string per line, exact matching is used.
  ##
  fatalErrors: |-
    guardian.api.garden-server.create.failed
    baggageclaim.api.volume-server.create-volume-async.failed-to-create

  ## Strategy for StatefulSet updates (requires Kubernetes 1.6+)
  ## Ref: https://kubernetes.io/docs/concepts/workloads/controllers/statefulset
  ##
  updateStrategy: RollingUpdate

  ## Pod Management strategy (requires Kubernetes 1.7+)
  ## Ref: https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/#pod-management-policies
  ##
  ## "OrderedReady" is default. "Parallel" means worker pods will launch or terminate
  ## in parallel.
  podManagementPolicy: Parallel

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
    ## concourse data Persistent Volume Storage Class
    ## If defined, storageClassName: <storageClass>
    ## If set to "-", storageClassName: "", which disables dynamic provisioning
    ## If undefined (the default) or set to null, no storageClassName spec is
    ##   set, choosing the default provisioner.  (gp2 on AWS, standard on
    ##   GKE, AWS & OpenStack)
    ##
    # storageClass: "-"

    ## Persistent Volume Access Mode.
    ##
    accessMode: ReadWriteOnce

    ## Persistent Volume Storage Size.
    ##
    size: 20Gi

## Configuration values for the postgresql dependency.
## ref: https://github.com/kubernetes/charts/blob/master/stable/postgresql/README.md
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
  ## ref: https://kubernetes.io/docs/user-guide/persistent-volumes
  ##
  persistence:
    ## Enable PostgreSQL persistence using Persistent Volume Claims.
    ##
    enabled: true

## Configuration values for using a Credential Manager. Only one can be enabled.
## ref: https://concourse.ci/creds.html
##
credentialManager:
  ## Configuration for Kubernetes Secrets as the Credential Manager. Supported in Concourse 3.7.0.
  ##
  kubernetes:
    ## Enable the use of Kubernetes Secrets.
    ##
    enabled: true

    ## Prefix to use for Kubernetes namespaces under which secrets will be looked up. Defaults to
    ## the Release name hyphen, e.g. "my-release-" produces namespace "my-release-main" for the
    ## "main" Concourse team.
    ##
    ## namespacePrefix:

    ## Teams to create namespaces for to hold secrets.
    teams:
      - main

  ## Configuration for AWS SSM as the Credential Manager. Supported in Concourse 3.9.0.
  ##
  ssm:
    ## Enable the use of AWS SSM.
    ##
    enabled: false

    ## AWS region to use when reading from SSM
    ##
    # region:
    ## pipeline-specific template for SSM parameters, defaults to: /concourse/{team}/{pipeline}/{secret}
    ##
    # pipelineSecretTemplate:
    ## team-specific template for SSM parameters, defaults to: /concourse/{team}/{secret}
    ##
    # teamSecretTemplate: ''

  ## Configuration for Hashicorp Vault as the Credential Manager.
  ##
  vault:
    enabled: false

    ## URL pointing to vault addr (i.e. http://vault:8200).
    ##
    # url:

    ## vault path under which to namespace credential lookup, defaults to /concourse.
    ##
    pathPrefix: /concourse

    ## if the Vault server is using a self-signed certificate, set this to true,
    ## and provide a value for the cert in secrets.
    ##
    # caCert:
    ## vault authentication backend, leave this blank if using an initial periodic token
    ## currently supported backends: token, approle, cert.
    ##
    # authBackend:

## For RBAC support:
rbac:
  # true here enables creation of rbac resources
  create: true

  # rbac version
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

  ## Concourse Host Keys.
  ## ref: https://concourse.ci/binaries.html#generating-keys
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
  ## ref: https://concourse.ci/binaries.html#generating-keys
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
  ## ref: https://concourse.ci/binaries.html#generating-keys
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

  ## Secrets for DB encryption
  ##
  # encryptionKey:
  # oldEncryptionKey:

  ## Secrets for SSM AWS access
  # awsSsmAccessKey:
  # awsSsmSecretKey:
  # awsSsmSessionToken:

  ## Secrets for Concourse basic auth
  ##
  basicAuthUsername: concourse
  basicAuthPassword: concourse
  ## Secrets for GitHub OAuth.
  ##
  # githubAuthClientId:
  # githubAuthClientSecret:
  ## Secrets for GitLab OAuth.
  ##
  # gitlabAuthClientId:
  # gitlabAuthClientSecret:
  ## Secrets for generic OAuth.
  ##
  # genericOauthClientId:
  # genericOauthClientSecret:
  ## If bringing your own PostgreSQL, set this to the full uri to use
  ## e.g. postgres://concourse:changeme@my-postgres.com:5432/concourse?sslmode=disable
  ##
  # postgresqlUri:
  ## Secrets for using Hashcorp Vault as a credential manager.
  ##
  ## if the Vault server is using a self-signed certificate, provide the CA public key.
  ## the value will be written to /concourse-vault/ca.cert
  ##
  # vaultCaCert: |-
  ## initial periodic token issued for concourse
  ## ref: https://www.vaultproject.io/docs/concepts/tokens.html#periodic-tokens
  ##
  # vaultClientToken:
  ## set role_id for [AppRole](https://www.vaultproject.io/docs/auth/approle.html) backend
  ## make sure to also set credentialManager.vault.authBackend to `approle`.
  ##
  # vaultAppRoleId:
  ## set secret_id for [AppRole](https://www.vaultproject.io/docs/auth/approle.html) backend
  ## make sure to also set credentialManager.vault.authBackend to `approle`.
  ##
  # vaultAppRoleSecretId:
  ## provide the client certificate for authenticating with the [TLS](https://www.vaultproject.io/docs/auth/cert.html) backend
  ## the value will be written to /concourse-vault/client.cert
  ## make sure to also set credentialManager.vault.authBackend to `cert`
  ##
  # vaultClientCert: |-
  ## provide the client key for authenticating with the [TLS](https://www.vaultproject.io/docs/auth/cert.html) backend
  ## the value will be written to /concourse-vault/client.key
  ## make sure to also set credentialManager.vault.authBackend to `cert`
  ##
  # vaultClientKey: |-
```

</details>

---

# Concourse Helm Chart

[Concourse](https://concourse.ci/) is a simple and scalable CI system.

## TL;DR;

```console
$ helm install stable/concourse
```

## Introduction

This chart bootstraps a [Concourse](https://concourse.ci/) deployment on a [Kubernetes](https://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites Details

- Kubernetes 1.6 (for `pod affinity` support)
- PV support on underlying infrastructure (if persistence is required)

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

### Cleanup orphaned Persistent Volumes

This chart uses `StatefulSets` for Concourse Workers. Deleting a `StatefulSet` will not delete associated Persistent Volumes.

Do the following after deleting the chart release to clean up orphaned Persistent Volumes.

```console
$ kubectl delete pvc -l app=${RELEASE-NAME}-worker
```

## Scaling the Chart

Scaling should typically be managed via the `helm upgrade` command, but `StatefulSets` don't yet work with `helm upgrade`. In the meantime, until `helm upgrade` works, if you want to change the number of replicas, you can use the kubectl scale as shown below:

```console
$ kubectl scale statefulset my-release-worker --replicas=3
```

### Restarting workers

If a worker isn't taking on work, you can restart the worker with `kubectl delete pod`. This will initiate a graceful shutdown by "retiring" the worker, to ensure Concourse doesn't try looking for old volumes on the new worker. The value`worker.terminationGracePeriodSeconds` can be used to provide an upper limit on graceful shutdown time before forcefully terminating the container. Check the output of `fly workers`, and if a worker is `stalled`, you'll also need to run `fly prune-worker` to allow the new incarnation of the worker to start.

### Worker Liveness Probe

The worker's Liveness Probe will trigger a restart of the worker if it detects unrecoverable errors, by looking at the worker's logs. The set of strings used to identify such errors could change in the future, but can be tuned with `worker.fatalErrors`. See [values.yaml](values.yaml) for the defaults.

## Configuration

The following tables lists the configurable parameters of the Concourse chart and their default values.

| Parameter                                       | Description                                                                               | Default                                      |
| ----------------------------------------------- | ----------------------------------------------------------------------------------------- | -------------------------------------------- |
| `image`                                         | Concourse image                                                                           | `concourse/concourse`                        |
| `imageTag`                                      | Concourse image version                                                                   | `3.8.0`                                      |
| `imagePullPolicy`                               | Concourse image pull policy                                                               | `IfNotPresent`                               |
| `concourse.externalURL`                         | URL used to reach any ATC from the outside world                                          | `nil`                                        |
| `concourse.atcPort`                             | Concourse ATC listen port                                                                 | `8080`                                       |
| `concourse.tsaPort`                             | Concourse TSA listen port                                                                 | `2222`                                       |
| `concourse.allowSelfSignedCertificates`         | Allow self signed certificates                                                            | `false`                                      |
| `concourse.authDuration`                        | Length of time for which tokens are valid                                                 | `24h`                                        |
| `concourse.resourceCheckingInterval`            | Interval on which to check for new versions of resources                                  | `1m`                                         |
| `concourse.oldResourceGracePeriod`              | How long to cache the result of a get step after a newer version of the resource is found | `5m`                                         |
| `concourse.resourceCacheCleanupInterval`        | The interval on which to check for and release old caches of resource versions            | `30s`                                        |
| `concourse.baggageclaimDriver`                  | The filesystem driver used by baggageclaim                                                | `naive`                                      |
| `concourse.containerPlacementStrategy`          | The selection strategy for placing containers onto workers                                | `random`                                     |
| `concourse.dockerRegistry`                      | An URL pointing to the Docker registry to use to fetch Docker images                      | `nil`                                        |
| `concourse.insecureDockerRegistry`              | Docker registry(ies) (comma separated) to allow connecting to even if not secure          | `nil`                                        |
| `concourse.encryption.enabled`                  | Enable encryption of pipeline configuration                                               | `false`                                      |
| `concourse.basicAuth.enabled`                   | Enable basic auth for the "main" Concourse team                                           | `true`                                       |
| `concourse.githubAuth.enabled`                  | Enable Github auth for the "main" Concourse team                                          | `false`                                      |
| `concourse.githubAuth.organization`             | GitHub organizations (comma separated) whose members will have access                     | `nil`                                        |
| `concourse.githubAuth.team`                     | GitHub teams (comma separated) whose members will have access                             | `nil`                                        |
| `concourse.githubAuth.user`                     | GitHub users (comma separated) to permit access                                           | `nil`                                        |
| `concourse.githubAuth.authUrl`                  | Override default endpoint AuthURL for Github Enterprise                                   | `nil`                                        |
| `concourse.githubAuth.tokenUrl`                 | Override default endpoint TokenURL for Github Enterprise                                  | `nil`                                        |
| `concourse.githubAuth.apiUrl`                   | Override default API endpoint URL for Github Enterprise                                   | `nil`                                        |
| `concourse.gitlabAuth.enabled`                  | Enable Gitlab auth for the "main" Concourse team                                          | `false`                                      |
| `concourse.gitlabAuth.group`                    | GitLab groups (comma separated) whose members will have access                            | `nil`                                        |
| `concourse.gitlabAuth.authUrl`                  | Endpoint AuthURL for GitLab server                                                        | `nil`                                        |
| `concourse.gitlabAuth.tokenUrl`                 | Endpoint TokenURL for GitLab server                                                       | `nil`                                        |
| `concourse.gitlabAuth.apiUrl`                   | API endpoint URL for GitLab server                                                        | `nil`                                        |
| `concourse.genericOauth.enabled`                | Enable generic OAuth for the "main" Concourse team                                        | `false`                                      |
| `concourse.genericOauth.displayName`            | Name for this auth method on the web UI                                                   | `nil`                                        |
| `concourse.genericOauth.authUrl`                | Generic OAuth provider AuthURL endpoint                                                   | `nil`                                        |
| `concourse.genericOauth.authUrlParam`           | Parameters (comma separated) to pass to the authentication server AuthURL                 | `nil`                                        |
| `concourse.genericOauth.scope`                  | Optional scope required to authorize user                                                 | `nil`                                        |
| `concourse.genericOauth.tokenUrl`               | Generic OAuth provider TokenURL endpoint                                                  | `nil`                                        |
| `web.nameOverride`                              | Override the Concourse Web components name                                                | `nil`                                        |
| `web.replicas`                                  | Number of Concourse Web replicas                                                          | `1`                                          |
| `web.resources`                                 | Concourse Web resource requests and limits                                                | `{requests: {cpu: "100m", memory: "128Mi"}}` |
| `web.additionalAffinities`                      | Additional affinities to apply to web pods. E.g: node affinity                            | `{}`                                         |
| `web.tolerations`                               | Tolerations for the web nodes                                                             | `[]`                                         |
| `web.service.type`                              | Concourse Web service type                                                                | `ClusterIP`                                  |
| `web.service.annotations`                       | Concourse Web Service annotations                                                         | `nil`                                        |
| `web.service.atcNodePort`                       | Sets the nodePort for atc when using `NodePort`                                           | `nil`                                        |
| `web.service.tsaNodePort`                       | Sets the nodePort for tsa when using `NodePort`                                           | `nil`                                        |
| `web.ingress.enabled`                           | Enable Concourse Web Ingress                                                              | `false`                                      |
| `web.ingress.annotations`                       | Concourse Web Ingress annotations                                                         | `{}`                                         |
| `web.ingress.hosts`                             | Concourse Web Ingress Hostnames                                                           | `[]`                                         |
| `web.ingress.tls`                               | Concourse Web Ingress TLS configuration                                                   | `[]`                                         |
| `web.metrics.prometheus.enabled`                | Enable Prometheus metrics exporter                                                        | `false`                                      |
| `web.metrics.prometheus.port`                   | Port for exporting Prometeus metrics                                                      | `9391`                                       |
| `worker.nameOverride`                           | Override the Concourse Worker components name                                             | `nil`                                        |
| `worker.replicas`                               | Number of Concourse Worker replicas                                                       | `2`                                          |
| `worker.minAvailable`                           | Minimum number of workers available after an eviction                                     | `1`                                          |
| `worker.resources`                              | Concourse Worker resource requests and limits                                             | `{requests: {cpu: "100m", memory: "512Mi"}}` |
| `worker.env`                                    | Configure additional environment variables for the worker container(s)                    | `[]`                                         |
| `worker.anotations`                             | Annotations to be added to the worker pods                                                | `{}`                                         |
| `worker.additionalAffinities`                   | Additional affinities to apply to worker pods. E.g: node affinity                         | `{}`                                         |
| `worker.tolerations`                            | Tolerations for the worker nodes                                                          | `[]`                                         |
| `worker.terminationGracePeriodSeconds`          | Upper bound for graceful shutdown to allow the worker to drain its tasks                  | `60`                                         |
| `worker.fatalErrors`                            | Newline delimited strings which, when logged, should trigger a restart of the worker      | _See [values.yaml](values.yaml)_             |
| `worker.updateStrategy`                         | `OnDelete` or `RollingUpdate` (requires Kubernetes >= 1.7)                                | `RollingUpdate`                              |
| `worker.podManagementPolicy`                    | `OrderedReady` or `Parallel` (requires Kubernetes >= 1.7)                                 | `Parallel`                                   |
| `persistence.enabled`                           | Enable Concourse persistence using Persistent Volume Claims                               | `true`                                       |
| `persistence.worker.storageClass`               | Concourse Worker Persistent Volume Storage Class                                          | `generic`                                    |
| `persistence.worker.accessMode`                 | Concourse Worker Persistent Volume Access Mode                                            | `ReadWriteOnce`                              |
| `persistence.worker.size`                       | Concourse Worker Persistent Volume Storage Size                                           | `20Gi`                                       |
| `postgresql.enabled`                            | Enable PostgreSQL as a chart dependency                                                   | `true`                                       |
| `postgresql.postgresUser`                       | PostgreSQL User to create                                                                 | `concourse`                                  |
| `postgresql.postgresPassword`                   | PostgreSQL Password for the new user                                                      | `concourse`                                  |
| `postgresql.postgresDatabase`                   | PostgreSQL Database to create                                                             | `concourse`                                  |
| `postgresql.persistence.enabled`                | Enable PostgreSQL persistence using Persistent Volume Claims                              | `true`                                       |
| `credentialManager.kubernetes.enabled`          | Enable Kubernetes Secrets Credential Manager                                              | `true`                                       |
| `credentialManager.kubernetes.namespacePrefix`  | Prefix for namespaces to look for secrets in                                              | `.Release.Name-`                             |
| `credentialManager.kubernetes.teams`            | Teams to allow secret access when rbac is enabled                                         | `["main"]`                                   |
| `credentialManager.ssm.enabled`                 | Use AWS SSM as a Credential Manager                                                       | `false`                                      |
| `credentialManager.ssm.region`                  | AWS Region to use for SSM                                                                 | `nil`                                        |
| `credentialManager.ssm.pipelineSecretsTemplate` | Pipeline secrets template                                                                 | `nil`                                        |
| `credentialManager.ssm.teamSecretsTemplate`     | Team secrets template                                                                     | `nil`                                        |
| `credentialManager.vault.enabled`               | Use Hashicorp Vault as a Credential Manager                                               | `false`                                      |
| `credentialManager.vault.url`                   | Vault Server URL                                                                          | `nil`                                        |
| `credentialManager.vault.pathPrefix`            | Vault path to namespace secrets                                                           | `/concourse`                                 |
| `credentialManager.vault.caCert`                | CA public certificate when using self-signed TLS with Vault                               | `nil`                                        |
| `credentialManager.vault.authBackend`           | Vault Authentication Backend to use, leave blank when using clientToken                   | `nil`                                        |
| `rbac.create`                                   | Enables creation of RBAC resources                                                        | `true`                                       |
| `rbac.apiVersion`                               | RBAC version                                                                              | `v1beta1`                                    |
| `rbac.webServiceAccountName`                    | Name of the service account to use for web pods if `rbac.create` is `false`               | `default`                                    |
| `rbac.workerServiceAccountName`                 | Name of the service account to use for workers if `rbac.create` is `false`                | `default`                                    |
| `secrets.create`                                | Create the secret resource from the following values. _See [Secrets](#Secrets)_           | `true`                                       |
| `secrets.hostKey`                               | Concourse Host Private Key                                                                | _See [values.yaml](values.yaml)_             |
| `secrets.hostKeyPub`                            | Concourse Host Public Key                                                                 | _See [values.yaml](values.yaml)_             |
| `secrets.sessionSigningKey`                     | Concourse Session Signing Private Key                                                     | _See [values.yaml](values.yaml)_             |
| `secrets.workerKey`                             | Concourse Worker Private Key                                                              | _See [values.yaml](values.yaml)_             |
| `secrets.workerKeyPub`                          | Concourse Worker Public Key                                                               | _See [values.yaml](values.yaml)_             |
| `secrets.encryptionKey`                         | current encryption key                                                                    | `nil`                                        |
| `secrets.oldEncryptionKey`                      | old encryption key, used for key rotation                                                 | `nil`                                        |
| `secrets.awsSsmAccessKey`                       | AWS Access Key ID for SSM access                                                          | `nil`                                        |
| `secrets.awsSsmSecretKey`                       | AWS Secret Access Key ID for SSM access                                                   | `nil`                                        |
| `secrets.awsSsmSessionToken`                    | AWS Session Token for SSM access                                                          | `nil`                                        |

| `secrets.basicAuthUsername` | Concourse Basic Authentication Username | `concourse` |
| `secrets.basicAuthPassword` | Concourse Basic Authentication Password | `concourse` |
| `secrets.githubAuthClientId` | Application client ID for GitHub OAuth | `nil` |
| `secrets.githubAuthClientSecret` | Application client secret for GitHub OAuth | `nil` |
| `secrets.gitlabAuthClientId` | Application client ID for GitLab OAuth | `nil` |
| `secrets.gitlabAuthClientSecret` | Application client secret for GitLab OAuth | `nil` |
| `secrets.genericOauthClientId` | Application client ID for Generic OAuth | `nil` |
| `secrets.genericOauthClientSecret` | Application client secret for Generic OAuth | `nil` |
| `secrets.postgresqlUri` | PostgreSQL connection URI when `postgres.enabled` is `false` | `nil` |
| `secrets.vaultCaCert` | CA certificate use to verify the vault server SSL cert. | `nil` |
| `secrets.vaultClientToken` | Vault periodic client token | `nil` |
| `secrets.vaultAppRoleId` | Vault AppRole RoleID | `nil` |
| `secrets.vaultAppRoleSecretId` | Vault AppRole SecretID | `nil` |
| `secrets.vaultClientCert` | Vault Client Certificate | `nil` |
| `secrets.vaultClientKey` | Vault Client Key | `nil` |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`.

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart. For example,

```console
$ helm install --name my-release -f values.yaml stable/concourse
```

> **Tip**: You can use the default [values.yaml](values.yaml)

### Secrets

For your convenience, this chart provides some default values for secrets, but it is recommended that you generate and manage these secrets outside the Helm chart. To do this, set `secrets.create` to `false`, create files for each secret value, and turn it all into a k8s secret. Be careful with introducing trailing newline characters; following the steps below ensures none will end up in your secrets. First, perform the following to create the manditory secret values:

```console
mkdir concourse-secrets
cd concourse-secrets
ssh-keygen -t rsa -f host-key  -N ''
mv host-key.pub host-key-pub
ssh-keygen -t rsa -f worker-key  -N ''
mv worker-key.pub worker-key-pub
ssh-keygen -t rsa -f session-signing-key  -N ''
rm session-signing-key.pub
printf "%s" "concourse" > basic-auth-username
printf "%s" "$(openssl rand -base64 24)" > basic-auth-password
```

You'll also need to create/copy secret values for optional features. See [templates/secrets.yaml](templates/secrets.yaml) for possible values. In the example below, we are not using the [PostgreSQL](#PostgreSQL) chart dependency, and so we must set a `postgresql-uri` secret.

```console
# copy a posgres URI to clipboard and paste it to file
printf "%s" "$(pbpaste)" > postgresql-uri
# copy Github client id and secrets to clipboard and paste to files
printf "%s" "$(pbpaste)" > github-auth-client-id
printf "%s" "$(pbpaste)" > github-auth-client-secret
# set an encryption key for DB encryption at rest
printf "%s" "$(openssl rand -base64 24)" > encryption-key
```

Then create a secret called [release-name]-concourse from all the secret value files in the current folder:

```console
kubectl create secret generic my-release-concourse --from-file=.
```

Make sure you clean up after yourself.

### Persistence

This chart mounts a Persistent Volume volume for each Concourse Worker. The volume is created using dynamic volume provisioning. If you want to disable it or change the persistence properties, update the `persistence` section of your custom `values.yaml` file:

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

It is highly recommended to use Persistent Volumes for Concourse Workers; otherwise the container images managed by the Worker are stored in an `emptyDir` volume on the node's disk. This will interfere with k8s ImageGC and the node's disk will fill up as a result. This will be fixed in a future release of k8s: https://github.com/kubernetes/kubernetes/pull/57020

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

By default, this chart will use a PostgreSQL database deployed as a chart dependency, with default values for username, password, and database name. These can be modified by setting the `postgresql.*` values.

You can also bring your own PostgreSQL. To do so, set `postgresql.enabled` to false. You'll then need to specify the full uri to the database, including the username and password, e.g. `postgres://concourse:changeme@my-postgres.com:5432/concourse?sslmode=require`. You can do this one of two ways:

1. Set `secrets.postgresqlUri` in your values

2. Set `postgresql-uri` in your release's secrets as described in [Secrets](#Secrets).

The only way to completely avoid putting secrets in Helm is to bring your own PostgreSQL, and use option 2 above.

### Credential Management

Pipelines ususally need credentials to do things. Concourse supports the use of a [Credential Manager](https://concourse.ci/creds.html) so your pipelines can contain references to secrets instead of the actual secret values. You can't use more than one credential manager at a time.

#### Kubernetes Secrets

By default, this chart will use Kubernetes Secrets as a credential manager. For a given Concourse _team_, a pipeline will look for secrets in a namespace named `[namespacePrefix][teamName]`. The namespace prefix is the release name hyphen by default, and can be overridden with the value `credentialManager.kubernetes.namespacePrefix`. The service account used by Concourse must have `get` access to secrets in that namespace. When `rbac.create` is true, this access is granted for each team listed under `credentialManager.kubernetes.teams`.

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

To use Vault, set `credentialManager.kubernetes.enabled` to false, and set the following values:

```yaml
## Configuration values for the Credential Manager.
## ref: https://concourse.ci/creds.html
##
credentialManager:
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

#### AWS Systems Manager Paramter Store (SSM)

To use SSM, set `credentialManager.kubernetes.enabled` to false, and set `credentialManager.ssm.enabled` to true.

For a given Concourse _team_, a pipeline will look for secrets in SSM using either `/concourse/{team}/{secret}` or `/concourse/{team}/{pipeline}/{secret}`; the patterns can be overridden using the `credentialManager.ssm.teamSecretTemplate` and `credentialManager.ssm.pipelineSecretTemplate` settings.

Concourse requires AWS credentials which are able to read from SSM for this feature to function. Credentials can be set in the `secrets.awsSsm*` settings; if your cluster is running in a different AWS region, you may also need to set `credentialManager.ssm.region`.

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

Where `<kms-key-arn>` is the ARN of the KMS key used to encrypt the secrets in Paraemter Store, and the `<...arn...>` should be replaced with a correct ARN for your account and region's Parameter Store.
