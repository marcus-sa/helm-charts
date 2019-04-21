# `@helm-charts/stable-kuberos`

An OIDC authentication helper for Kubernetes

| Field               | Value   |
| ------------------- | ------- |
| Repository Name     | stable  |
| Chart Name          | kuberos |
| Chart Version       | 0.1.0   |
| NPM Package Version | 0.1.0   |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for kuberos.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.

replicaCount: 1

# You probably want to change the values under `kuberos` and `ingress`

# `kuberos` describes the config for the app
kuberos:
  oidcClientURL: https://accounts.google.com
  # `oidcClientURL` is the endpoint that is used to quesry OIDC info
  oidcClientID: REDACTED.apps.googleusercontent.com
  # `oidcClientID` is typically a long alpha numeric string.
  #   For G Suite the 'REDACTED' part is about 45 alphanumeric characters
  oidcSecret: super-secret-value-here
  # `oidcSecret` is typically a long alpha numeric string.
  #   For G Suite it's about 25 alphanumeric characters
  #   For security reasons it's best to set this at deployment time with
  #     `--set kuberos.oidcSecret=mySuper-secretPassPhrase`
  clusters:
    # The clusters below must all use the same OIDC details above
    #   The config snippet that is generated for a user will default
    #   to the first cluster
    - name: dev-cluster
      # `name` is a label to apply to the cluster. It would normally be
      #   the fqdn of the cluster eg dev-cluster.example.com
      #   it can be something a little more friendly eg dev-cluster
      apiServer: https://api.dev-cluster.example.com
      # `apiServer` is the url for kubectl
      #   This is typically  https://api.fqdn
      caCrt: |-
        -----BEGIN CERTIFICATE-----
        cert data here
        -----END CERTIFICATE-----
      # `caCrt` is the public / CA cert for the cluster

ingress:
  enabled: false
  # Set `enabled` to true to create an ingress and get external traffic to kuberos
  annotations: {}
  # Add your ingress annotations here. Most common ones are given below
  # kubernetes.io/ingress.class: nginx
  # certmanager.k8s.io/cluster-issuer:      prod-acme
  # certmanager.k8s.io/acme-challenge-type: http01
  # nginx.ingress.kubernetes.io/force-ssl-redirect: true
  path: /
  # `path` can stay as-is
  hosts:
    # Add host headers and cert names below
    - chart-example.local
  tls: []
  #  - secretName: chart-example-tls
  #    hosts:
  #      - chart-example.local

image:
  repository: negz/kuberos
  tag: ede4085
  pullPolicy: IfNotPresent

service:
  type: ClusterIP
  port: 80

resources:
  {}
  # We usually recommend not to specify default resources and to leave this as a conscious
  # choice for the user. This also increases chances charts run on environments with little
  # resources, such as Minikube. If you do want to specify resources, uncomment the following
  # lines, adjust them as necessary, and remove the curly braces after 'resources:'.
  # limits:
  #  cpu: 100m
  #  memory: 128Mi
  # requests:
  #  cpu: 100m
  #  memory: 128Mi

nodeSelector: {}

tolerations: []

affinity: {}
```

</details>

---

# Kuberos OIDC Helper

This is a config snippet generator for a k8s cluster

## TL;DR;

Sorry you will need to look at the [configuration](#configuration) values below for this one.

```console
$ helm install incubator/kuberos -f custom-values.yaml
```

## Warning

The config snippets that are generated from this chart include OIDC connection details in clear text.
These include content that would normally be in secrets.

## Introduction

This chart deploys the [kuberos](https://github.com/negz/kuberos) code
snippet generator for clusters using both

- OIDC - OpenID Connect, an authentication layer on top of OAuth 2.0
- RBAC - Role Based Access Controlls (in your k8s cluster)

It provides a quick and easy way for an authenticated user to generate
and download config for kubectl.

This work is [inspired from step 7 of the work](https://medium.com/@noqcks/secure-your-kubernetes-cluster-with-google-oidc-e1905c923522)
@noqcks did using other tooling.

## Prerequisites

- Kubernetes 1.8+ with RBAC enabled
- An OIDC provider eg G Suite
- RBAC on your cluster configured to use OIDC

## Configuration

The following table lists the configurable parameters of the kuberos chart

## Config params which probably need changing

These ones will be site specific and may contain sensitive information

| Parameter       | Description                                        | Default                                         |
| --------------- | -------------------------------------------------- | ----------------------------------------------- |
| `kuberos`       | App Specific config options                        | See below                                       |
| `oidcClientURL` | URL of OIDC provider endpoint                      | `https://accounts.google.com`                   |
| `oidcClientID`  | Your unique client ID                              | `REDACTED.apps.googleusercontent.com`           |
| `oidcSecret`    | The password for the Client ID above.              | Junk [See Provider below](#oidc-provider-setup) |
| `clusters`      | List of clusters to generate config for            | See below                                       |
| `name`          | The friendly name of the cluster                   | `dev-cluster`                                   |
| `apiServer`     | The endpoint for kubectl to use                    | `'https://api.dev-cluster.example.com`          |
| `caCrt`         | The Public CA cert for the cluster                 | See values.yaml                                 |
| `ingress`       | A standard ingress block                           | See below                                       |
| `enabled`       | Enables or Disables the ingress block              | `false`                                         |
| `annotations`   | Ingress annotations                                | `{}`                                            |
| `hosts`         | List of FQDN's the be browsed to                   | Not Set                                         |
| `tls`           | List of SSL certs to use                           | Empty list                                      |
| `secretName`    | Name of the secret to use                          | Not Set                                         |
| `hosts`         | List of FQDN's the above secret is associated with | Not Set                                         |

### Other Config params can be left alone

In some conditions you might want to set `image.tag` to `latest` and then `image.pullPolicy` to `Always`
this is generally advised against for stability reasons.

In general config params not listed above can be ignored / left alone.
The rest of the params are standard enough the google and other charts will be better at explaining them than me

## OIDC (Provider) Setup

You will need to obtain the OIDC details of the provider you need to use. This will contain the Issuer URL, Client ID and the Client Secret.
In the case of Google (The provider which was used when initially creating this) go to the [Developer / Credentials](https://console.developers.google.com/apis/credentials) console. You will need to add the ingress url to both

- _Authorised JavaScript origins_ - https://kuberos.example.com
- _Authorised redirect URIs_ - https://kuberos.example.com/ui

If you used kops the credentials you're after are

```
apiVersion: kops/v1alpha2
kind: Cluster
  authorization:
    rbac: {}
  kubeAPIServer:
    authorizationRbacSuperUser: admin
    oidcClientID: UNIQUE_ID_REDACTED.apps.googleusercontent.com
    oidcIssuerURL: https://accounts.google.com
    oidcUsernameClaim: email
```

For G Suite :
The redacted part of a ClientID is about 45 alphanumeric characters long (may also contain a hyphen or two)
The client secret will be about 25 alphanumeric chacters (may also contain a hyphen or two)
