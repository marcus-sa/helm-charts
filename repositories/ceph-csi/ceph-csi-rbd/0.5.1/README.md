# `@helm-charts/ceph-csi-ceph-csi-rbd`

Container Storage Interface (CSI) driver, provisioner, snapshotter, and attacher for Ceph RBD

| Field               | Value        |
| ------------------- | ------------ |
| Repository Name     | ceph-csi     |
| Chart Name          | ceph-csi-rbd |
| Chart Version       | 0.5.1        |
| NPM Package Version | 0.1.0        |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
---
rbac:
  create: true

serviceAccounts:
  attacher:
    create: true
    name:
  nodeplugin:
    create: true
    name:
  provisioner:
    create: true
    name:

socketDir: /var/lib/kubelet/plugins/rbd.csi.ceph.com
socketFile: csi.sock
registrationDir: /var/lib/kubelet/plugins_registry
volumeDevicesDir: /var/lib/kubelet/plugins/kubernetes.io/csi/volumeDevices
driverName: rbd.csi.ceph.com

attacher:
  name: attacher

  replicaCount: 1

  image:
    repository: quay.io/k8scsi/csi-attacher
    tag: v1.0.1
    pullPolicy: IfNotPresent

  resources: {}

  nodeSelector: {}

  tolerations: []

  affinity: {}

nodeplugin:
  name: nodeplugin

  registrar:
    image:
      repository: quay.io/k8scsi/csi-node-driver-registrar
      tag: v1.0.2
      pullPolicy: IfNotPresent

    resources: {}

  plugin:
    image:
      repository: quay.io/cephcsi/rbdplugin
      tag: v1.0.0
      pullPolicy: IfNotPresent

    resources: {}

  nodeSelector: {}

  tolerations: []

  affinity: {}

provisioner:
  name: provisioner

  replicaCount: 1

  image:
    repository: quay.io/k8scsi/csi-provisioner
    tag: v1.0.1
    pullPolicy: IfNotPresent

  resources: {}

  nodeSelector: {}

  tolerations: []

  affinity: {}

snapshotter:
  image:
    repository: quay.io/k8scsi/csi-snapshotter
    tag: v1.0.1
    pullPolicy: IfNotPresent

  resources: {}
```

</details>

---

# ceph-csi-rbd

The ceph-csi-rbd chart adds rbd volume support to your cluster.

## Install Chart

To install the Chart into your Kubernetes cluster

```bash
helm install --namespace "ceph-csi-rbd" --name "ceph-csi-rbd" ceph-csi/ceph-csi-rbd
```

After installation succeeds, you can get a status of Chart

```bash
helm status "ceph-csi-rbd"
```

If you want to delete your Chart, use this command

```bash
helm delete  --purge "ceph-csi-rbd"
```

If you want to delete the namespace, use this command

```bash
kubectl delete namespace ceph-csi-rbd
```
