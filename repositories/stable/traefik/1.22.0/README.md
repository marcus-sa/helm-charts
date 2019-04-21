# `@helm-charts/stable-traefik`

A Traefik based Kubernetes ingress controller with Let's Encrypt support

| Field               | Value   |
| ------------------- | ------- |
| Repository Name     | stable  |
| Chart Name          | traefik |
| Chart Version       | 1.22.0  |
| NPM Package Version | 0.1.0   |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
## Default values for Traefik
image: traefik
imageTag: 1.5.2
## can switch the service type to NodePort if required
serviceType: LoadBalancer
loadBalancerIP:
# loadBalancerSourceRanges: []
replicas: 1
cpuRequest: 100m
memoryRequest: 20Mi
cpuLimit: 100m
memoryLimit: 30Mi
debug:
  enabled: false
nodeSelector:
  {}
  # key: value
tolerations: []
# - key: "key"
#   operator: "Equal|Exists"
#   value: "value"
#   effect: "NoSchedule|PreferNoSchedule|NoExecute(1.6 only)"
## Kubernetes ingress filters
# kubernetes:
# namespaces:
# - default
# labelSelector:
proxyProtocol:
  enabled: false
  # trustedIPs is required when enabled
  trustedIPs:
  # - 10.0.0.0/8
ssl:
  enabled: false
  enforced: false
  defaultCert: LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSUVtekNDQTRPZ0F3SUJBZ0lKQUpBR1FsTW1DMGt5TUEwR0NTcUdTSWIzRFFFQkJRVUFNSUdQTVFzd0NRWUQKVlFRR0V3SlZVekVSTUE4R0ExVUVDQk1JUTI5c2IzSmhaRzh4RURBT0JnTlZCQWNUQjBKdmRXeGtaWEl4RkRBUwpCZ05WQkFvVEMwVjRZVzF3YkdWRGIzSndNUXN3Q1FZRFZRUUxFd0pKVkRFV01CUUdBMVVFQXhRTktpNWxlR0Z0CmNHeGxMbU52YlRFZ01CNEdDU3FHU0liM0RRRUpBUllSWVdSdGFXNUFaWGhoYlhCc1pTNWpiMjB3SGhjTk1UWXgKTURJME1qRXdPVFV5V2hjTk1UY3hNREkwTWpFd09UVXlXakNCanpFTE1Ba0dBMVVFQmhNQ1ZWTXhFVEFQQmdOVgpCQWdUQ0VOdmJHOXlZV1J2TVJBd0RnWURWUVFIRXdkQ2IzVnNaR1Z5TVJRd0VnWURWUVFLRXd0RmVHRnRjR3hsClEyOXljREVMTUFrR0ExVUVDeE1DU1ZReEZqQVVCZ05WQkFNVURTb3VaWGhoYlhCc1pTNWpiMjB4SURBZUJna3EKaGtpRzl3MEJDUUVXRVdGa2JXbHVRR1Y0WVcxd2JHVXVZMjl0TUlJQklqQU5CZ2txaGtpRzl3MEJBUUVGQUFPQwpBUThBTUlJQkNnS0NBUUVBdHVKOW13dzlCYXA2SDROdUhYTFB6d1NVZFppNGJyYTFkN1ZiRUJaWWZDSStZNjRDCjJ1dThwdTNhVTVzYXVNYkQ5N2pRYW95VzZHOThPUHJlV284b3lmbmRJY3RFcmxueGpxelUyVVRWN3FEVHk0bkEKNU9aZW9SZUxmZXFSeGxsSjE0VmlhNVFkZ3l3R0xoRTlqZy9jN2U0WUp6bmg5S1dZMnFjVnhEdUdEM2llaHNEbgphTnpWNFdGOWNJZm1zOHp3UHZPTk5MZnNBbXc3dUhUKzNiSzEzSUloeDI3ZmV2cXVWcENzNDFQNnBzdStWTG4yCjVIRHk0MXRoQkN3T0wrTithbGJ0ZktTcXM3TEFzM25RTjFsdHpITHZ5MGE1RGhkakpUd2tQclQrVXhwb0tCOUgKNFpZazErRUR0N09QbGh5bzM3NDFRaE4vSkNZK2RKbkFMQnNValFJREFRQUJvNEgzTUlIME1CMEdBMVVkRGdRVwpCQlJwZVc1dFhMdHh3TXJvQXM5d2RNbTUzVVVJTERDQnhBWURWUjBqQklHOE1JRzVnQlJwZVc1dFhMdHh3TXJvCkFzOXdkTW01M1VVSUxLR0JsYVNCa2pDQmp6RUxNQWtHQTFVRUJoTUNWVk14RVRBUEJnTlZCQWdUQ0VOdmJHOXkKWVdSdk1SQXdEZ1lEVlFRSEV3ZENiM1ZzWkdWeU1SUXdFZ1lEVlFRS0V3dEZlR0Z0Y0d4bFEyOXljREVMTUFrRwpBMVVFQ3hNQ1NWUXhGakFVQmdOVkJBTVVEU291WlhoaGJYQnNaUzVqYjIweElEQWVCZ2txaGtpRzl3MEJDUUVXCkVXRmtiV2x1UUdWNFlXMXdiR1V1WTI5dGdna0FrQVpDVXlZTFNUSXdEQVlEVlIwVEJBVXdBd0VCL3pBTkJna3EKaGtpRzl3MEJBUVVGQUFPQ0FRRUFjR1hNZms4TlpzQit0OUtCemwxRmw2eUlqRWtqSE8wUFZVbEVjU0QyQjRiNwpQeG5NT2pkbWdQcmF1SGI5dW5YRWFMN3p5QXFhRDZ0YlhXVTZSeENBbWdMYWpWSk5aSE93NDVOMGhyRGtXZ0I4CkV2WnRRNTZhbW13QzFxSWhBaUE2MzkwRDNDc2V4N2dMNm5KbzdrYnIxWVdVRzN6SXZveGR6OFlEclpOZVdLTEQKcFJ2V2VuMGxNYnBqSVJQNFhac25DNDVDOWdWWGRoM0xSZTErd3lRcTZoOVFQaWxveG1ENk5wRTlpbVRPbjJBNQovYkozVktJekFNdWRlVTZrcHlZbEpCemRHMXVhSFRqUU9Xb3NHaXdlQ0tWVVhGNlV0aXNWZGRyeFF0aDZFTnlXCnZJRnFhWng4NCtEbFNDYzkzeWZrL0dsQnQrU0tHNDZ6RUhNQjlocVBiQT09Ci0tLS0tRU5EIENFUlRJRklDQVRFLS0tLS0K
  defaultKey: LS0tLS1CRUdJTiBSU0EgUFJJVkFURSBLRVktLS0tLQpNSUlFb3dJQkFBS0NBUUVBdHVKOW13dzlCYXA2SDROdUhYTFB6d1NVZFppNGJyYTFkN1ZiRUJaWWZDSStZNjRDCjJ1dThwdTNhVTVzYXVNYkQ5N2pRYW95VzZHOThPUHJlV284b3lmbmRJY3RFcmxueGpxelUyVVRWN3FEVHk0bkEKNU9aZW9SZUxmZXFSeGxsSjE0VmlhNVFkZ3l3R0xoRTlqZy9jN2U0WUp6bmg5S1dZMnFjVnhEdUdEM2llaHNEbgphTnpWNFdGOWNJZm1zOHp3UHZPTk5MZnNBbXc3dUhUKzNiSzEzSUloeDI3ZmV2cXVWcENzNDFQNnBzdStWTG4yCjVIRHk0MXRoQkN3T0wrTithbGJ0ZktTcXM3TEFzM25RTjFsdHpITHZ5MGE1RGhkakpUd2tQclQrVXhwb0tCOUgKNFpZazErRUR0N09QbGh5bzM3NDFRaE4vSkNZK2RKbkFMQnNValFJREFRQUJBb0lCQUhrTHhka0dxNmtCWWQxVAp6MkU4YWFENnhneGpyY2JSdGFCcTc3L2hHbVhuQUdaWGVWcE81MG1SYW8wbHZ2VUgwaE0zUnZNTzVKOHBrdzNmCnRhWTQxT1dDTk1PMlYxb1MvQmZUK3Zsblh6V1hTemVQa0pXd2lIZVZMdVdEaVVMQVBHaWl4emF2RFMyUnlQRmEKeGVRdVNhdE5pTDBGeWJGMG5Zd3pST3ZoL2VSa2NKVnJRZlZudU1melFkOGgyMzZlb1UxU3B6UnhSNklubCs5UApNc1R2Wm5OQmY5d0FWcFo5c1NMMnB1V1g3SGNSMlVnem5oMDNZWUZJdGtDZndtbitEbEdva09YWHBVM282aWY5ClRIenBleHdubVJWSmFnRG85bTlQd2t4QXowOW80cXExdHJoU1g1U2p1K0xyNFJvOHg5bytXdUF1VnVwb0lHd0wKMWVseERFRUNnWUVBNzVaWGp1enNJR09PMkY5TStyYVFQcXMrRHZ2REpzQ3gyZnRudk1WWVJKcVliaGt6YnpsVQowSHBCVnk3NmE3WmF6Umxhd3RGZ3ljMlpyQThpM0F3K3J6d1pQclNJeWNieC9nUVduRzZlbFF1Y0FFVWdXODRNCkdSbXhKUGlmOGRQNUxsZXdRalFjUFJwZVoxMzlYODJreGRSSEdma1pscHlXQnFLajBTWExRSEVDZ1lFQXcybkEKbUVXdWQzZFJvam5zbnFOYjBlYXdFUFQrbzBjZ2RyaENQOTZQK1pEekNhcURUblZKV21PeWVxRlk1eVdSSEZOLwpzbEhXU2lTRUFjRXRYZys5aGlMc0RXdHVPdzhUZzYyN2VrOEh1UUtMb2tWWEFUWG1NZG9xOWRyQW9INU5hV2lECmRSY3dEU2EvamhIN3RZV1hKZDA4VkpUNlJJdU8vMVZpbDBtbEk5MENnWUVBb2lsNkhnMFNUV0hWWDNJeG9raEwKSFgrK1ExbjRYcFJ5VEg0eldydWY0TjlhYUxxNTY0QThmZGNodnFiWGJHeEN6U3RxR1E2cW1peUU1TVpoNjlxRgoyd21zZEpxeE14RnEzV2xhL0lxSzM0cTZEaHk3cUNld1hKVGRKNDc0Z3kvY0twZkRmeXZTS1RGZDBFejNvQTZLCmhqUUY0L2lNYnpxUStQREFQR0YrVHFFQ2dZQmQ1YnZncjJMMURzV1FJU3M4MHh3MDBSZDdIbTRaQVAxdGJuNk8KK0IvUWVNRC92UXBaTWV4c1hZbU9lV2Noc3FCMnJ2eW1MOEs3WDY1NnRWdGFYay9nVzNsM3ZVNTdYSFF4Q3RNUwpJMVYvcGVSNHRiN24yd0ZncFFlTm1XNkQ4QXk4Z0xiaUZhRkdRSDg5QWhFa0dTd1d5cWJKc2NoTUZZOUJ5OEtUCkZaVWZsUUtCZ0V3VzJkVUpOZEJMeXNycDhOTE1VbGt1ZnJxbllpUTNTQUhoNFZzWkg1TXU0MW55Yi95NUUyMW4KMk55d3ltWGRlb3VJcFZjcUlVTXl0L3FKRmhIcFJNeVEyWktPR0QyWG5YaENNVlRlL0FQNDJod294Nm02QkZpQgpvemZFa2wwak5uZmREcjZrL1p2MlQ1TnFzaWxaRXJBQlZGOTBKazdtUFBIa0Q2R1ZMUUJ4Ci0tLS0tRU5EIFJTQSBQUklWQVRFIEtFWS0tLS0tCg==
acme:
  enabled: false
  email: admin@example.com
  staging: true
  logging: false
  ## ACME challenge type: "tls-sni-01", "http-01" or "dns-01"
  ## Note the chart's default of tls-sni-01 has been DEPRECATED and (except in
  ## certain circumstances) DISABLED by Let's Encrypt. It remains as a default
  ## value in this chart to preserve legacy behavior and avoid a breaking
  ## change. Users of this chart should strongly consider making the switch to
  ## the dns-01 or http-01 (available since v1.5) challenge.
  challengeType: tls-sni-01
  ## Configure dnsProvider to perform domain verification using dns challenge
  ## Applicable only if using the dns-01 challenge type
  dnsProvider:
    name: nil
    auroradns:
      AURORA_USER_ID: ''
      AURORA_KEY: ''
      AURORA_ENDPOINT: ''
    azure:
      AZURE_CLIENT_ID: ''
      AZURE_CLIENT_SECRET: ''
      AZURE_SUBSCRIPTION_ID: ''
      AZURE_TENANT_ID: ''
      AZURE_RESOURCE_GROUP: ''
    cloudflare:
      CLOUDFLARE_EMAIL: ''
      CLOUDFLARE_API_KEY: ''
    digitalocean:
      DO_AUTH_TOKEN: ''
    dnsimple:
      DNSIMPLE_OAUTH_TOKEN: ''
      DNSIMPLE_BASE_URL: ''
    dnsmadeeasy:
      DNSMADEEASY_API_KEY: ''
      DNSMADEEASY_API_SECRET: ''
      DNSMADEEASY_SANDBOX: ''
    dnspod:
      DNSPOD_API_KEY: ''
    dyn:
      DYN_CUSTOMER_NAME: ''
      DYN_USER_NAME: ''
      DYN_PASSWORD: ''
    exoscale:
      EXOSCALE_API_KEY: ''
      EXOSCALE_API_SECRET: ''
      EXOSCALE_ENDPOINT: ''
    gandi:
      GANDI_API_KEY: ''
    godaddy:
      GODADDY_API_KEY: ''
      GODADDY_API_SECRET: ''
    gcloud:
      GCE_PROJECT: ''
      GCE_SERVICE_ACCOUNT_FILE: ''
    linode:
      LINODE_API_KEY: ''
    namecheap:
      NAMECHEAP_API_USER: ''
      NAMECHEAP_API_KEY: ''
    ns1:
      NS1_API_KEY: ''
    otc:
      OTC_DOMAIN_NAME: ''
      OTC_USER_NAME: ''
      OTC_PASSWORD: ''
      OTC_PROJECT_NAME: ''
      OTC_IDENTITY_ENDPOINT: ''
    pdns:
      PDNS_API_URL: ''
    rackspace:
      RACKSPACE_USER: ''
      RACKSPACE_API_KEY: ''
    rfc2136:
      RFC2136_NAMESERVER: ''
      RFC2136_TSIG_ALGORITHM: ''
      RFC2136_TSIG_KEY: ''
      RFC2136_TSIG_SECRET: ''
      RFC2136_TIMEOUT: ''
    route53:
      AWS_REGION: ''
      AWS_ACCESS_KEY_ID: ''
      AWS_SECRET_ACCESS_KEY: ''
    vultr:
      VULTR_API_KEY: ''
  ## Save ACME certs to a persistent volume. WARNING: If you do not do this, you will re-request
  ## certs every time a pod (re-)starts and you WILL be rate limited!
  persistence:
    enabled: true
    ## acme data Persistent Volume Storage Class
    ## If defined, storageClassName: <storageClass>
    ## If set to "-", storageClassName: "", which disables dynamic provisioning
    ## If undefined (the default) or set to null, no storageClassName spec is
    ##   set, choosing the default provisioner.  (gp2 on AWS, standard on
    ##   GKE, AWS & OpenStack)
    ##
    # storageClass: "-"
    accessMode: ReadWriteOnce
    size: 1Gi
dashboard:
  enabled: false
  domain: traefik.example.com
  service:
    # annotations:
    #   key: value
  ingress:
    # annotations:
    #   key: value
    # labels:
    #   key: value
  auth:
    # basic:
    #   username: password
  statistics:
    ## Number of recent errors to show in the ‘Health’ tab
    # recentErrors:
service:
  # annotations:
  #   key: value
  # labels:
  #   key: value
  ## Further config for service of type NodePort
  ## Default config with empty string "" will assign a dynamic
  ## nodePort to http and https ports
  nodePorts:
    http: ''
    https: ''
  ## If static nodePort configuration is required it can be enabled as below
  ## Configure ports in allowable range (eg. 30000 - 32767 on minikube)
  # nodePorts:
  #   http: 30080
  #   https: 30443
gzip:
  enabled: true
accessLogs:
  enabled: false
  ## Path to the access logs file. If not provided, Traefik defaults it to stdout.
  # filePath: ""
  format: common # choices are: common, json
rbac:
  enabled: false
## Enable the /metrics endpoint, for now only supports prometheus
## set to true to enable metric collection by prometheus
metrics:
  prometheus:
    enabled: false
    # buckets: [0.1,0.3,1.2,5]
  datadog:
    enabled: false
    # address: localhost:8125
    # pushinterval: 10s
  statsd:
    enabled: false
    # address: localhost:8125
    # pushinterval: 10s
deployment:
  # podAnnotations:
  #   key: value
  hostPort:
    httpEnabled: false
    httpsEnabled: false
    dashboardEnabled: false
sendAnonymousUsage: false
```

</details>

---

# Traefik

[Traefik](http://traefik.io/) is a modern HTTP reverse proxy and load balancer made to deploy
microservices with ease.

## Introduction

This chart bootstraps Traefik as a Kubernetes ingress controller with optional support for SSL and
Let's Encrypt.

**NOTE:** Operators will typically wish to install this component into the `kube-system` namespace
where that namespace's default service account will ensure adequate privileges to watch `Ingress`
resources _cluster-wide_.

## Prerequisites

- Kubernetes 1.4+ with Beta APIs enabled
- Kubernetes 1.6+ if you want to enable RBAC
- You are deploying the chart to a cluster with a cloud provider capable of provisioning an
  external load balancer (e.g. AWS or GKE)
- You control DNS for the domain(s) you intend to route through Traefik
- **Suggested:** PV provisioner support in the underlying infrastructure

## A Quick Note on Versioning

Up until version 1.2.1-b of this chart, the semantic version of the chart was
kept in-sync with the semantic version of the (default) version of Traefik
installed by the chart. A dash and a letter were appended to Traefik's
semantic version to indicate incrementally improved versions of the chart
itself. For example, chart version 1.2.1-a and 1.2.1-b _both_ provide Traefik
1.2.1, but 1.2.1-b is a chart that is incrementally improved in some way from
its immediate predecessor-- 1.2.1-a.

This convention, in practice, suffered from a few problems, not the least of
which was that it defied what was permitted by
[semver 2.0.0](http://semver.org/spec/v2.0.0.html). This, in turn, lead to some
difficulty in Helm understanding the versions of this chart.

Beginning with version 1.3.0 of this chart, the version references _only_
the revision of the chart itself. The `appVersion` field in `chart.yaml` now
conveys information regarding the revision of Traefik that the chart provides.

## Installing the Chart

To install the chart with the release name `my-release`:

```bash
$ helm install stable/traefik --name my-release --namespace kube-system
```

After installing the chart, create DNS records for applicable domains to direct inbound traffic to
the load balancer. You can use the commands below to find the load balancer's IP/hostname:

**NOTE:** It may take a few minutes for this to become available.

You can watch the status by running:

```bash
$ kubectl get svc my-release-traefik --namespace kube-system -w
```

Once `EXTERNAL-IP` is no longer `<pending>`:

```bash
$ kubectl describe service my-release-traefik -n kube-system | grep Ingress | awk '{print $3}'
```

**NOTE:** If ACME support is enabled, it is only _after_ this step is complete that Traefik will be
able to successfully use the ACME protocol to obtain certificates from Let's Encrypt.

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```bash
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the
release.

## Configuration

The following tables lists the configurable parameters of the Traefik chart and their default values.

| Parameter                              | Description                                                                                                                                                                                                        | Default                                                         |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------- |
| `fullnameOverride`                     | Override the full resource names                                                                                                                                                                                   | `{release-name}-traefik (or traefik if release-name is traefik` |
| `image`                                | Traefik image name                                                                                                                                                                                                 | `traefik`                                                       |
| `imageTag`                             | The version of the official Traefik image to use                                                                                                                                                                   | `1.5.2`                                                         |
| `serviceType`                          | A valid Kubernetes service type                                                                                                                                                                                    | `LoadBalancer`                                                  |
| `loadBalancerIP`                       | An available static IP you have reserved on your cloud platform                                                                                                                                                    | None                                                            |
| `loadBalancerSourceRanges`             | list of IP CIDRs allowed access to load balancer (if supported)                                                                                                                                                    | None                                                            |
| `replicas`                             | The number of replicas to run; **NOTE:** Full Traefik clustering with leader election is not yet supported, which can affect any configured Let's Encrypt setup; see Clustering section                            | `1`                                                             |
| `cpuRequest`                           | Initial share of CPU requested per Traefik pod                                                                                                                                                                     | `100m`                                                          |
| `memoryRequest`                        | Initial share of memory requested per Traefik pod                                                                                                                                                                  | `20Mi`                                                          |
| `cpuLimit`                             | CPU limit per Traefik pod                                                                                                                                                                                          | `200m`                                                          |
| `memoryLimit`                          | Memory limit per Traefik pod                                                                                                                                                                                       | `30Mi`                                                          |
| `rbac.enabled`                         | Whether to enable RBAC with a specific cluster role and binding for Traefik                                                                                                                                        | `false`                                                         |
| `nodeSelector`                         | Node labels for pod assignment                                                                                                                                                                                     | `{}`                                                            |
| `tolerations`                          | List of node taints to tolerate                                                                                                                                                                                    | `[]`                                                            |
| `proxyProtocol.enabled`                | Enable PROXY protocol support.                                                                                                                                                                                     | `false`                                                         |
| `proxyProtocol.trustedIPs`             | List of proxy IPs (CIDR ranges) trusted to accurately convey the end-user IP.                                                                                                                                      | `[]`                                                            |
| `debug.enabled`                        | Turn on/off Traefik's debug mode. Enabling it will override the logLevel to `DEBUG` and provide `/debug/vars` endpoint that allows Go runtime stats to be inspected, such as number of Goroutines and memory stats | `false`                                                         |
| `ssl.enabled`                          | Whether to enable HTTPS                                                                                                                                                                                            | `false`                                                         |
| `ssl.enforced`                         | Whether to redirect HTTP requests to HTTPS                                                                                                                                                                         | `false`                                                         |
| `ssl.defaultCert`                      | Base64 encoded default certificate                                                                                                                                                                                 | A self-signed certificate                                       |
| `ssl.defaultKey`                       | Base64 encoded private key for the certificate above                                                                                                                                                               | The private key for the certificate above                       |
| `acme.enabled`                         | Whether to use Let's Encrypt to obtain certificates                                                                                                                                                                | `false`                                                         |
| `acme.challengeType`                   | Type of ACME challenge to perform domain validation. `tls-sni-01`, `http-01` or `dns-01`                                                                                                                           | `tls-sni-01`                                                    |
| `acme.dnsProvider.name`                | Which DNS provider to use. See [here](https://github.com/xenolf/lego/tree/master/providers/dns) for the list of possible values.                                                                                   | `nil`                                                           |
| `acme.dnsProvider.$name`               | The configuration environment variables (encoded as a secret) needed for the DNS provider to do DNS challenge. See [here](#example-aws-route-53).                                                                  | `{}`                                                            |
| `acme.email`                           | Email address to be used in certificates obtained from Let's Encrypt                                                                                                                                               | `admin@example.com`                                             |
| `acme.staging`                         | Whether to get certs from Let's Encrypt's staging environment                                                                                                                                                      | `true`                                                          |
| `acme.logging`                         | display debug log messages from the acme client library                                                                                                                                                            | `false`                                                         |
| `acme.persistence.enabled`             | Create a volume to store ACME certs (if ACME is enabled)                                                                                                                                                           | `true`                                                          |
| `acme.persistence.storageClass`        | Type of `StorageClass` to request-- will be cluster-specific                                                                                                                                                       | `nil` (uses alpha storage class annotation)                     |
| `acme.persistence.accessMode`          | `ReadWriteOnce` or `ReadOnly`                                                                                                                                                                                      | `ReadWriteOnce`                                                 |
| `acme.persistence.size`                | Minimum size of the volume requested                                                                                                                                                                               | `1Gi`                                                           |
| `dashboard.enabled`                    | Whether to enable the Traefik dashboard                                                                                                                                                                            | `false`                                                         |
| `dashboard.domain`                     | Domain for the Traefik dashboard                                                                                                                                                                                   | `traefik.example.com`                                           |
| `dashboard.service.annotations`        | Annotations for the Traefik dashboard Service definition, specified as a map                                                                                                                                       | None                                                            |
| `dashboard.ingress.annotations`        | Annotations for the Traefik dashboard Ingress definition, specified as a map                                                                                                                                       | None                                                            |
| `dashboard.ingress.labels`             | Labels for the Traefik dashboard Ingress definition, specified as a map                                                                                                                                            | None                                                            |
| `dashboard.auth.basic`                 | Basic auth for the Traefik dashboard specified as a map, see Authentication section                                                                                                                                | unset by default; this means basic auth is disabled             |
| `dashboard.statistics.recentErrors`    | Number of recent errors to show in the ‘Health’ tab                                                                                                                                                                | None                                                            |
| `service.annotations`                  | Annotations for the Traefik Service definition, specified as a map                                                                                                                                                 | None                                                            |
| `service.labels`                       | Additional labels for the Traefik Service definition, specified as a map                                                                                                                                           | None                                                            |
| `service.nodePorts.http`               | Desired nodePort for service of type NodePort used for http requests                                                                                                                                               | blank ('') - will assign a dynamic node port                    |
| `service.nodePorts.https`              | Desired nodePort for service of type NodePort used for https requests                                                                                                                                              | blank ('') - will assign a dynamic node port                    |
| `gzip.enabled`                         | Whether to use gzip compression                                                                                                                                                                                    | `true`                                                          |
| `kubernetes.namespaces`                | List of Kubernetes namespaces to watch                                                                                                                                                                             | All namespaces                                                  |
| `kubernetes.labelSelector`             | Valid Kubernetes ingress label selector to watch (e.g `realm=public`)                                                                                                                                              | No label filter                                                 |
| `accessLogs.enabled`                   | Whether to enable Traefik's access logs                                                                                                                                                                            | `false`                                                         |
| `accessLogs.filePath`                  | The path to the log file. Logs to stdout if omitted                                                                                                                                                                | None                                                            |
| `accessLogs.format`                    | What format the log entries should be in. Either `common` or `json`                                                                                                                                                | `common`                                                        |
| `metrics.prometheus.enabled`           | Whether to enable the `/metrics` endpoint for metric collection by Prometheus.                                                                                                                                     | `false`                                                         |
| `metrics.prometheus.buckets`           | A list of response times (in seconds) - for each list element, Traefik will report all response times less than the element.                                                                                       | `[0.1,0.3,1.2,5]`                                               |
| `metrics.datadog.enabled`              | Whether to enable pushing metrics to Datadog.                                                                                                                                                                      | `false`                                                         |
| `metrics.datadog.address`              | Datadog host in the format <hostname>:<port>                                                                                                                                                                       | `localhost:8125`                                                |
| `metrics.datadog.pushInterval`         | How often to push metrics to Datadog.                                                                                                                                                                              | `10s`                                                           |
| `metrics.statsd.enabled`               | Whether to enable pushing metrics to Statsd.                                                                                                                                                                       | `false`                                                         |
| `metrics.statsd.address`               | Statsd host in the format <hostname>:<port>                                                                                                                                                                        | `localhost:8125`                                                |
| `metrics.statsd.pushInterval`          | How often to push metrics to Statsd.                                                                                                                                                                               | `10s`                                                           |
| `deployment.podAnnotations`            | Annotations for the Traefik pod definition                                                                                                                                                                         | None                                                            |
| `deployment.hostPort.httpEnabled`      | Whether to enable hostPort binding to host for http.                                                                                                                                                               | `false`                                                         |
| `deployment.hostPort.httpsEnabled`     | Whether to enable hostPort binding to host for https.                                                                                                                                                              | `false`                                                         |
| `deployment.hostPort.dashboardEnabled` | Whether to enable hostPort binding to host for dashboard.                                                                                                                                                          | `false`                                                         |
| `sendAnonymousUsage`                   | Send anonymous usage statistics.                                                                                                                                                                                   | `false`                                                         |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example:

```bash
$ helm install --name my-release --namespace kube-system \
  --set dashboard.enabled=true,dashboard.domain=traefik.example.com stable/traefik
```

The above command enables the Traefik dashboard on the domain `traefik.example.com`.

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm install --name my-release --namespace kube-system --values values.yaml stable/traefik
```

### Clustering / High Availability

Currently it is possible to specify the number of `replicas` but the implementation is naive.

**Full Traefik clustering with leader election is not yet supported.**

It is heavily advised to not set a value for `replicas` if you also have Let's Encrypt configured. While setting `replicas` will work for many cases, since no leader is elected it has the consequence that each node will end up requesting Let's Encrypt certificates if this is also configured. This will quickly cut into the very modest rate limit that Let's Encrypt enforces.

[Basic auth](https://docs.traefik.io/toml/#api-backend) can be specified via `dashboard.auth.basic` as a map of usernames to passwords as below.
See the linked Traefik documentation for accepted passwords encodings.
It is advised to single quote passwords to avoid issues with special characters:

```bash
$ helm install --name my-release --namespace kube-system \
  --set dashboard.enabled=true,dashboard.auth.basic.test='$apr1$H6uskkkW$IgXLP6ewTrSuBkTrqE8wj/' \
  stable/traefik
```

Alternatively in YAML form:

```yaml
dashboard:
  enabled: true
  domain: traefik.example.com
  auth:
    basic:
      test: $apr1$H6uskkkW$IgXLP6ewTrSuBkTrqE8wj/
```

### Let's Encrypt domain verification using DNS challenge

When obtaining an ACME (Let's Encrypt) certificate, sometimes it's more desirable to do DNS challenge, for example, if the
server you want to obtain a certificate for does not have a public IP address.

First, check if your DNS provider is supported by [lego](https://github.com/xenolf/lego/tree/master/providers/dns)(the ACME library that Traefik is using).
Next, you will need to configure the Traefik chart to use DNS challenge. In the ACME section:

```yaml
acme:
  enabled: true
  challengeType: 'dns-01'
  dnsProvider:
    name: # name of the dns provider to use
    $name:# the configuration of the dns provider. See the following section for an example
      # variables that the specific dns provider requires
```

#### Example: AWS Route 53

Route 53 requires the [following configuration variables to be set](values.yaml#L98-L101):

- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_REGION`

The configuration for the DNS provider would look like this:

```yaml
acme:
  enabled: true
  dnsProvider:
    name: route53
    route53:
      AWS_ACCESS_KEY_ID: ...
      AWS_SECRET_ACCESS_KEY: ...
      AWS_REGION: us-east-1
```

### Proxy Protocol

In situations where Traefik lives behind an Internet-facing loadbalancer (like an AWS ELB) and you still want it to see the actual source IP of the visitor instead of the internal IP of the loadbalancer, you can enable the loadbalancer to use the Proxy protocol to talk to Traefik. This effectively makes the loadbalancer transparant, as Traefik will still get the actual visitor IP address for each request. This only works if Traefik knows it's receiving traffic via the Proxy Protocol and the loadbalancer IP addresses need to be whitelisted as well.

How to set this up on AWS is described in the Kubernetes documentation [here](https://kubernetes.io/docs/concepts/services-networking/service/#proxy-protocol-support-on-aws), it can easily be done by adding an annotation to the Service definition.

**Caution**

If only one of the components (either the loadbalancer or traefik) is set to use the Proxy protocol and the other is not, this will break badly as they will not be able to communicate with each other.
