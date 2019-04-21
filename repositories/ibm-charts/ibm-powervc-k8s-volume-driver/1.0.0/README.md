# `@helm-charts/ibm-charts-ibm-powervc-k8s-volume-driver`

IBM PowerVC FlexVolume Driver

| Field               | Value                         |
| ------------------- | ----------------------------- |
| Repository Name     | ibm-charts                    |
| Chart Name          | ibm-powervc-k8s-volume-driver |
| Chart Version       | 1.0.0                         |
| NPM Package Version | 0.1.0                         |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# The configuration properties to specify which PowerVC management server to use for creating/attaching volumes.  Unless you have changed these values, they can be found in /opt/ibm/powervc/powervcrc on the PowerVC management server.
openstack:
  # The authentication URL to PowerVC in the format of https://POWERVC_ADDR:5000/v3/.  In almost all cases, this format should be left as-is, except for substituting your PowerVC IP address or hostname in for POWERVC_ADDR.
  authURL: 'https://POWERVC_ADDRESS:5000/v3/'
  # (Optional) The certificate contents for PowerVC to use for client-side verification.  Copy and paste the entire PEM format contents from the /etc/pki/tls/certs/powervc.crt file.  If this value is left blank, certificate verification will not be done, which is insecure.
  certData: ''
  # The name of a PowerVC admin user.
  userName: 'root'
  # The password of the PowerVC admin user.
  password: ''
  # The name of the project for the PowerVC admin user.
  projectName: 'ibm-default'
  # The name of the project domain for the PowerVC admin user.
  domainName: 'Default'

# The configuration properties to tell how the PowerVC volume driver should be installed and configured.
driver:
  # The directory that Kubernetes is configured to use for the Flex Volume Driver.  If you have not overriden the --flex-volume-plugin-dir flag on the controller manager or kubelet, leave this as the default value.
  flexPluginDir: '/usr/libexec/kubernetes/kubelet-plugins/volume/exec/'
  # The name or id of the volume type (called Storage Template in PowerVC) to use in the default storage class created.  This can be used to specify which storage backend and which pool will be used by default when creating persistent volumes.
  volumeType: ''
  # Whether or not to make the pre-defined storage class for this volume driver the default storage class.  The default storage class is the one that is used when no storage class is specified when creating a persistent volume claim.
  dfltStgClass: true

# The repository, tag and pull policy for the PowerVC Provisioner and FlexVolume driver docker images.
image:
  # Name and location of the provisioner docker image repository.
  provisionerRepo: 'ibmcom/power-openstack-k8s-volume-provisioner'
  # Tag or label for the provisioner docker image.
  provisionerTag: '1.0.0'
  # Name and location of the flexvolume docker image repository.
  flexVolumeRepo: 'ibmcom/power-openstack-k8s-volume-flex'
  # Tag or label for the flexvolume docker image.
  flexVolumeTag: '1.0.0'
  # Pull policy for the provisioner docker image (Always, Never, IfNotPresent).
  provisionerPull: 'IfNotPresent'
  # Pull policy for the flexvolume docker image (Always, Never, IfNotPresent).
  flexVolumePull: 'IfNotPresent'
```

</details>

---

# IBM PowerVC FlexVolume Driver

&nbsp;

![IDG Logo](https://raw.githubusercontent.com/IBM/charts/master/logo/powervc-logo-01.png)
![IDG Logo](https://raw.githubusercontent.com/IBM/charts/master/logo/powervc-logo-02.png)

[IBM® PowerVC](https://www.ibm.com/systems/power/software/virtualization-management/) Virtualization Center is an advanced virtualization and cloud management offering, built on OpenStack, that provides simplified virtualization management and cloud deployments for IBM AIX®, IBM i and Linux virtual machines (VMs) running on IBM Power Systems.

PowerVC can be used as the cloud provider that is hosting the virtual machines for the IBM Cloud Private master and worker nodes. This volume driver can also be used to provision storage volumes and mount storage for containers.

## Introduction

This chart installs the volume driver that communicates with PowerVC to provision persistent volumes in Kubernetes and attach those volumes to worker nodes for mounting containers.

Once the chart is installed, you may use any storage class that uses the _**ibm/powervc-k8s-volume-provisioner**_ provisioner in the persistent volume claim to provision and attach volumes. The pre-defined storage class, _**ibm-powervc-k8s-volume-default**_, is created as part of this chart installation. It is set as the default storage class unless you specify otherwise. The default storage class is used in persistent volume claims if no storage class is specified.

You can specify the _**type**_ parameter in the storage class to specify which volume type (called the 'storage template' in PowerVC) to use when provisioning volumes. This volume type allows you to choose which storage backend and pool to use, along with other volume options. When installing the chart, you can specify the volume type to use in the pre-defined storage class. If the volume type is not specified at either point, no volume type is used.

## Chart Details

This chart will create the following Kubernetes resources:

- **ibm-powervc-k8s-volume-provisioner** - Deploys a container that runs the external storage provisioner on the master node
- **ibm-powervc-k8s-volume-flex** - DaemonSet responsible for configuring the FlexVolume driver on each of the master and worker nodes
- **ibm-powervc-config** - ConfigMap containing the PowerVC configuration information specified on the Helm chart installation
- **ibm-powervc-credentials** - Secret object containing the user name and password for the PowerVC configuration
- **ibm-powervc-k8s-volume-default** - StorageClass defining the pre-defined default storage class to be used in persistent volume claims

## Prerequisites

- IBM Cloud Private 2.1.0.2 or later (or Kubernetes 1.9.1 or later)
- PowerVC 1.4.1 or later (PowerVC 1.4.0 may be used if using Fibre Channel attached storage)
- Flex volume directory mounted in the controller manager container

The controller manager container on the master node needs to have access to the flex volume driver directory to pick up the PowerVC FlexVolume driver. Prior to the IBM Cloud Private 2.1.0.3 release, the flex volume directory was not mounted by default. Verify that the following lines are in the _**/etc/cfc/pods/master.json**_ file and if not, add these lines to the file.

```console
    "containers":[
       ...
        "name": "controller-manager",
        ...
        "volumeMounts": [
          ...
          {
            "name": "flexvolume-dir",
            "mountPath": "/usr/libexec/kubernetes/kubelet-plugins/volume/exec"
          }
          ...
    "volumes": [
      ...
      {
        "name": "flexvolume-dir",
        "hostPath": {
          "path": "/usr/libexec/kubernetes/kubelet-plugins/volume/exec",
          "type": "DirectoryOrCreate"
        }
      }
```

## Resources Required

There are no artificially set minimum or maximum required resources defined for any resource in this Helm chart. The resource usage will vary based on how many concurrent volumes are being provisioned and attached, but during steady state there should be minimal CPU usage and less than 50 MB used by the volume provisioner.

## Installing the Chart

To install the chart with the release name `my-release`:

```console
$ helm install --name my-release -f <powervc-config.yaml> ibm-powervc-k8s-volume-driver
```

Where `<powervc-config.yaml>` is a yaml file that contains the required parameters described below.

## Uninstalling the Chart

To uninstall/delete the my-release deployment:

```console
$ helm delete --purge my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters for the PowerVC management server and their default values. Unless you have changed these values, they can be found in /opt/ibm/powervc/powervcrc on the PowerVC mamagement system.

| Parameter               | Description                                              | Default                                       |
| ----------------------- | -------------------------------------------------------- | --------------------------------------------- |
| `openstack.authURL`     | The authentication URL to the PowerVC management server  | https://POWERVC_ADDR:5000/v3/                 |
| `openstack.certData`    | The contents of the PowerVC certificate in PEM format    | (optional - insecure if not set)              |
| `openstack.userName`    | The PowerVC administrator user                           | root                                          |
| `openstack.password`    | The password for the PowerVC administrator user          | N/A (required)                                |
| `openstack.projectName` | The PowerVC project; the specified user must be an admin | ibm-default                                   |
| `openstack.domainName`  | The domain for the PowerVC admin user                    | Default                                       |
| `driver.flexPluginDir`  | Directory specified by --flex-volume-plugin-dir          | .../kubelet-plugins/volume/exec/              |
| `driver.volumeType`     | Volume type to use in the default storage class          | (optional)                                    |
| `driver.dfltStgClass`   | Whether to make this driver the default storage class    | true                                          |
| `image.provisionerRepo` | Name and location of the provisioner docker repository   | ibmcom/power-openstack-k8s-volume-provisioner |
| `image.provisionerTag`  | Tag or label for the provisioner docker image            | 1.0.0                                         |
| `image.flexVolumeRepo`  | Name and location of the flexvolume docker repository    | ibmcom/power-openstack-k8s-volume-flex        |
| `image.flexVolumeTag`   | Tag or label for the flexvolume docker image             | 1.0.0                                         |
| `image.provisionerPull` | Pull policy for the provisioner docker image             | IfNotPresent                                  |
| `image.flexVolumePull`  | Pull policy for the flexvolume docker image              | IfNotPresent                                  |

## Limitations

- This Helm chart will only install on ppc64le worker nodes and ppc64le and x86_64 master nodes.
- A node can have only one installation of this Helm chart. Any subsequent install attempts will fail.
- This Helm chart creates a storage class. Therefore, to install this Helm chart, the user needs authorization to create storage classes.
- The persistent volumes cannot be resized by using powervc-k8s-volume-provisioner. Volumes must be resized manually through PowerVC to be expanded.
