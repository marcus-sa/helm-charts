# `@helm-charts/stable-openvpn`

A Helm chart to install an openvpn server inside a kubernetes cluster. Certificate generation is also part of the deployment, and this chart will generate client keys as needed.

| Field               | Value   |
| ------------------- | ------- |
| Repository Name     | stable  |
| Chart Name          | openvpn |
| Chart Version       | 2.0.1   |
| NPM Package Version | 0.1.0   |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for openvpn.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.
replicaCount: 1
image:
  repository: jfelten/openvpn-docker
  tag: 1.1.0
  pullPolicy: IfNotPresent
service:
  name: openvpn
  type: LoadBalancer
  externalPort: 443
  internalPort: 443
resources:
  limits:
    cpu: 300m
    memory: 128Mi
  requests:
    cpu: 300m
    memory: 128Mi
persistence:
  enabled: true
  ## A manually managed Persistent Volume and Claim
  ## Requires persistence.enabled: true
  ## If defined, PVC must be created manually before volume will be bound
  # existingClaim:

  ## openvpn data Persistent Volume Storage Class
  ## If defined, storageClassName: <storageClass>
  ## If set to "-", storageClassName: "", which disables dynamic provisioning
  ## If undefined (the default) or set to null, no storageClassName spec is
  ##   set, choosing the default provisioner.  (gp2 on AWS, standard on
  ##   GKE, AWS & OpenStack)
  ##
  # storageClass: "-"
  accessMode: ReadWriteOnce
  size: 2M
openvpn:
  # Network allocated for openvpn clients (default: 10.240.0.0).
  OVPN_NETWORK: 10.240.0.0
  # Network subnet allocated for openvpn client (default: 255.255.0.0).
  OVPN_SUBNET: 255.255.0.0
  # Protocol used by openvpn tcp or udp (default: udp).
  OVPN_PROTO: tcp
  # Kubernetes pod network (optional).
  OVPN_K8S_POD_NETWORK: '10.0.0.0'
  # Kubernetes pod network subnet (optional).
  OVPN_K8S_POD_SUBNET: '255.0.0.0'
  # Arbitrary lines appended to the end of the server configuration file
  # conf: |
  #  max-clients 100
  #  client-to-client
```

</details>

---

# Helm chart for OpenVPN

This chart will install an [OpenVPN](https://openvpn.net/) server inside a kubernetes cluster. New certificates are generated on install, and a script is provided to generate client keys as needed. The chart will automatically configure dns to use kube-dns and route all network traffic to kubernetes pods and services through the vpn. By connecting to this vpn a host is effectively inside a cluster's network.

### Uses

The primary purpose of this chart was to make it easy to access kubernetes services during development. It could also be used for any service that only needs to be accessed through a vpn or as a standard vpn.

## Usage

```bash
helm repo add stable http://storage.googleapis.com/kubernetes-charts
helm install stable/openvpn
```

Wait for the external load balancer IP to become available. Check service status via: `kubectl get svc`

Please be aware that certificate generation is variable and may take some time (minutes).
Check pod status via:

```bash
POD_NAME=$(kubectl get pods -l type=openvpn -o jsonpath='{.items[0].metadata.name}') \
&& kubectl log $POD_NAME --follow
```

When all components of the openvpn chart have started use the following script to generate a client key:

```bash
#!/bin/bash

if [ $# -ne 1 ]
then
  echo "Usage: $0 <CLIENT_KEY_NAME>"
  exit
fi

KEY_NAME=$1
NAMESPACE=$(kubectl get pods --all-namespaces -l type=openvpn -o jsonpath='{.items[0].metadata.namespace}')
POD_NAME=$(kubectl get pods -n $NAMESPACE -l type=openvpn -o jsonpath='{.items[0].metadata.name}')
SERVICE_NAME=$(kubectl get svc -n $NAMESPACE -l type=openvpn  -o jsonpath='{.items[0].metadata.name}')
SERVICE_IP=$(kubectl get svc -n $NAMESPACE $SERVICE_NAME -o go-template='{{range $k, $v := (index .status.loadBalancer.ingress 0)}}{{$v}}{{end}}')
kubectl -n $NAMESPACE exec -it $POD_NAME /etc/openvpn/setup/newClientCert.sh $KEY_NAME $SERVICE_IP
kubectl -n $NAMESPACE exec -it $POD_NAME cat /etc/openvpn/certs/pki/$KEY_NAME.ovpn > $KEY_NAME.ovpn
```

Be sure to change `KEY_NAME` if generating additional keys. Import the .ovpn file into your favorite openvpn tool like tunnelblick and verify connectivity.

## Configuration

All configuration is in the values.yaml file, and can be overwritten via the helm --set flag.

### Certificates

New certificates are generated with each deployment. If persistence is enabled certificate data will be persisted across pod restarts. Otherwise new client certs will be needed after each deployment or pod restart.

### Important values

- service.externalPort: 443 - external LoadBalancer port
- service.internalPort: 443 - port of openVPN port
- openvpn.OVPN_NETWORK: 10.240.0.0 - Network allocated for openvpn clients (default: 10.240.0.0).
- openvpn.OVPN_SUBNET: 255.255.0.0 - Network subnet allocated for openvpn client (default: 255.255.0.0).
- openvpn.OVPN_PROTO: tcp - Protocol used by openvpn tcp or udp (default: tcp).
- openvpn.OVPN_K8S_POD_NETWORK: "10.0.0.0" - Kubernetes pod network (optional).
- openvpn.OVPN_K8S_POD_SUBNET: "255.0.0.0" - Kubernetes pod network subnet (optional).
- openvpn.conf: "" - Arbitrary lines appended to the end of the server configuration file

#### Note: As configured the chart will create a route for a large 10.0.0.0/8 network that may cause issues if that is your local network. If so tweak this value to something more restrictive. This route is added, because GKE generates pods with IPs in this range.
