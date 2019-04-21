# `@helm-charts/ceph-csi-ceph-csi-cephfs`

Container Storage Interface (CSI) driver, provisioner, and attacher for Ceph cephfs

| Field               | Value           |
| ------------------- | --------------- |
| Repository Name     | ceph-csi        |
| Chart Name          | ceph-csi-cephfs |
| Chart Version       | 0.5.0           |
| NPM Package Version | 0.1.0           |

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

socketDir: /var/lib/kubelet/plugins/csi-cephfsplugin
socketFile: csi.sock
registrationDir: /var/lib/kubelet/plugins_registry
volumeDevicesDir: /var/lib/kubelet/plugins/kubernetes.io/csi/volumeDevices

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
      repository: quay.io/cephcsi/cephfsplugin
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
```

</details>

---

# ceph-csi-cephfs

The ceph-csi-cephfs chart adds cephfs volume support to your cluster.

## Install Chart

To install the Chart into your Kubernetes cluster

```bash
helm install --namespace "ceph-csi-cephfs" --name "ceph-csi-cephfs" ceph-csi/ceph-csi-cephfs
```

After installation succeeds, you can get a status of Chart

```bash
helm status "ceph-csi-cephfs"
```

If you want to delete your Chart, use this command

```bash
helm delete --purge "ceph-csi-cephfs"
```
