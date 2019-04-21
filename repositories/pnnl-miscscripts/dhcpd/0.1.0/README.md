# `@helm-charts/pnnl-miscscripts-dhcpd`

Super simple dhcp setup

| Field               | Value            |
| ------------------- | ---------------- |
| Repository Name     | pnnl-miscscripts |
| Chart Name          | dhcpd            |
| Chart Version       | 0.1.0            |
| NPM Package Version | 0.1.0            |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
dhcpd:
  imagePullPolicy: IfNotPresent

resources: {}
interfaces: []

config:
  manage: true

  defaultLeaseTime: 600
  maxLeaseTime: 7200
  ddnsUpdateStyle: none

  subnets:
    - start: 172.22.0.0
      netmask: 255.255.255.0
  #FIXME rangeStart/End should not be used until pv support is added.
  #   rangeStart: 192.168.0.100
  #   rangeEnd: 192.168.0.254
  groups:
    - domainName: example.com
      domainNameServers: [172.22.0.1]
      routers: [172.22.0.1]
      subnetMask: 255.255.255.0
      hosts:
        - name: c1
          mac: 00:01:02:aa:bb:cc
          ip: 172.22.0.3

nodeSelector: {}

tolerations: []
#- key: node-role.kubernetes.io/master
#  operator: Exists
#  effect: NoSchedule

affinity: {}
```

</details>

---

# DHCPD

The DHCPD chart launches a simple dhcpd server for your bare metal cluster.

## Install Chart

To install the Chart into your Kubernetes cluster :

```bash
helm install --namespace "dhcpd" --name "dhcpd" pnnl-miscscripts/dhcpd -f dhcpd-values.yaml
```

After installation succeeds, you can get a status of Chart

```bash
helm status "dhcpd"
```

If you want to delete your Chart, use this command:

```bash
helm delete  --purge "dhcpd"
```

### DHCPD configuration

Set your interface(s) like:

```yaml
interfaces: ['eth0']
```

Add your subnets to the subnets list like:

```yaml
config:
  subnets:
    - start: 172.22.0.0
      netmask: 255.255.255.0
```

Setup a group and add your hosts like:

```yaml
config:
  groups:
    - domainName: example.com
      domainNameServers: [172.22.0.1]
      routers: [172.22.0.1]
      subnetMask: 255.255.255.0
      hosts:
        - name: c1
          mac: 00:01:02:aa:bb:cc
          ip: 172.22.0.3
```
