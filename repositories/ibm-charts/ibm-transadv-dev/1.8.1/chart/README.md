## Introduction

[Transformation Advisor](https://developer.ibm.com/recipes/tutorials/deploying-transformation-advisor-into-ibm-cloud-private/) has the capability to quickly evaluate your on-premise applications for rapid deployment on WebSphere Application Server and Liberty on Public and/or Private Cloud environments. 

Transformation Advisor will:
 - Gather your preferences regarding your current and desired target environments
 - Via a downloaded agent it will analyse your existing applications and upload the results to a single location
 - Provide recommendations for migration and development cost estimates to undertake the migrations across different platforms
 - Automatically create the necessary images and deploy your application directly into [IBM Cloud Private](https://www.ibm.com/support/knowledgecenter/en/SSBS6K_2.1.0.2/featured_applications/transformation_advisor.html) 

## Chart Details
The Transformation Advisor is delivered as an interconnected set of pods and kubernetes services. It consists of three pods: server, ui and database.

## Dynamic Provisioning

By default Transformation Advisor is configured to use dynamic provisioning. We strongly recommend that you use this option for your data storage.

## Static Provisioning

If you choose not to use dynamic provisioning you can change the default settings for a Persistence Volume (PV), an existing claim (PVC), or no storage at all. Please see below for the different options:

Use following code to create a host path PV (only suitable for single worker systems and should not be used in production)

```bash
kind: PersistentVolume
apiVersion: v1
metadata:
  name: transadv-pv
  labels:
    type: local
spec:
  persistentVolumeReclaimPolicy: Recycle
  capacity:
    storage: 8Gi
  accessModes:
    - ReadWriteMany
  hostPath:
    path: "/usr/data"
```

In case NFS PV is used one needs to make sure this folder exists on a disk where the data is stored and that it has enough permissions. This is to avoid "permission for changing ownership" error:
```bash
mkdir -p /opt/couchdb/data
```
```bash
chmod -R 777 /opt/couchdb/data
```
In case a group is set up:
```bash
chmod -R 770 /opt/couchdb/data
```

- Persistent storage using a predefined PersistentVolumeClaim or PersistentVolume setup prior to the deployment of this chart
  - Set global values to:
    - couchdb.persistence.enabled: true (default)
    - couchdb.persistence.useDynamicProvisioning: false (non-default)
  - Specify an existingClaimName per volume or leave the value empty and let the kubernetes binding process select a pre-existing volume based on the accessMode and size.  
  

- Persistent storage using kubernetes dynamic provisioning. Uses the default storageclass defined by the kubernetes admin or by using a custom storageclass which will override the default.
  - Set global values to:
    - couchdb.persistence.enabled: true (default)
    - couchdb.persistence.useDynamicProvisioning: true (default)
  - Specify a custom storageClassName per volume or leave the value empty to use the default storageClass. 


- No persistent storage (This option is not recommended). 
  - You may install Transformation Advisor without using a Persistence Volume, however this has a number of limitations:
    - If the couchDB container is restarted for any reason then **all of your data will be lost**
    - If the couchDB container is restarted for any reason you will then need to **restart the server container** to re-initialize the couchDB
  - Enable this mode by setting the global values to:
    - couchdb.persistence.enabled: false (non-default)
    - couchdb.persistence.useDynamicProvisioning: false (non-default)

## Resources Required

### Minimum Configuration

| Subsystem  | CPU Minimum | Memory Minimum (GB) | Disk Space Minimum (GB) |
| ---------- | ----------- | ------------------- | ----------------------- |
| CouchDB    | 1           | 2                   | 8                       |
| Server     | 1           | 2                   |                         |
| UI         | 1           | 2                   |                         |

## PodSecurityPolicy Requirements

* If you have [pod security policy control](https://kubernetes.io/docs/concepts/policy/pod-security-policy/#enabling-pod-security-policies) enabled, you must have a [PodSecurityPolicy](https://kubernetes.io/docs/concepts/policy/pod-security-policy/) that supports the following [securityContext](https://kubernetes.io/docs/concepts/policy/security-context/) settings:
  * capabilities:
    * CHOWN
    * DAC_OVERRIDE
    * FOWNER
    * FSETID
    * KILL
    * SETGID
    * SETUID
    * SETPCAP
    * NET_BIND_SERVICE
    * NET_RAW
    * SYS_CHROOT
    * AUDIT_WRITE
    * SETFCAP
  * allowPrivilegeEscalation: true
  * readOnlyRootFilesystem: false
  * runAsNonRoot: false
  * runAsUser: 0
  * privileged: false
> We are targeting to reduce the list above in future releases of this helm chart.  

> **Note**: If you are deploying to an IBM Cloud Private environment that does not support these security settings by default. Follow these [instructions](https://www.ibm.com/support/knowledgecenter/SSBS6K_3.1.0/app_center/nd_helm.html) to enable your deployment.

Here is an example setup for a non-default namespace installation:
```bash
kubectl create namespace ta

kubectl create serviceaccount -n ta ta-sa

kubectl -n ta create -f- <<EOF
apiVersion: policy/v1beta1
kind: PodSecurityPolicy
metadata:
  name: ta-psp
spec:
  allowPrivilegeEscalation: true
  readOnlyRootFilesystem: false
  allowedCapabilities:
  - CHOWN
  - DAC_OVERRIDE
  - FOWNER
  - FSETID
  - KILL
  - SETGID
  - SETUID
  - SETPCAP
  - NET_BIND_SERVICE
  - NET_RAW
  - SYS_CHROOT
  - AUDIT_WRITE
  - SETFCAP
  seLinux:
    rule: RunAsAny
  supplementalGroups:
    rule: RunAsAny
  runAsUser:
    rule: RunAsAny
  fsGroup:
    rule: RunAsAny
  volumes:
  - '*'
EOF

kubectl -n ta create role psp:unprivileged \
    --verb=use \
    --resource=podsecuritypolicy \
    --resource-name=ta-psp

kubectl -n ta create rolebinding ta-sa:psp:unprivileged \
    --role=psp:unprivileged \
    --serviceaccount=ta:ta-sa
```    

## Prerequisites

* If persistence is enabled but no dynamic provisioning is used, Persistent Volumes must be created.
    
### Secret

As of TA 1.8.0, you need to create a secret on ICP. e.g. on ICP version 2.1.0.2, go to left menu side bar > Configuration > Secrets > Create Secret.

In the Secret, 
1. You need to enter a name, which will be asked in the TA helm installation page. e.g. you can create a name called `transformation-advisor-secret`
2. Select the namespace to the same one which your TA will be installed to. You may need to create a namespace of your choice first.
3. Add two entries of data with names called `db_username` and `secret` respectively. The value of these values must be base64 encoded, and the raw values must have no space.
There are many ways to get base64 encoded. e.g. In bash

```bash
$ echo -n 'admin' | base64
# output: YWRtaW4=

echo -n "this-will-be-my-secret-without-space" | base64
# output: dGhpcy13aWxsLWJlLW15LXNlY3JldC13aXRob3V0LXNwYWNl
# Please you user own secret value
```

## Installing the Chart

To install the chart via helm with the release name `my-release`:

```bash
helm install --name my-release --set authentication.icp.edgeIp=<edgeIP> --set authentication.icp.secretName=<my-secret> stable/ibm-transadv-dev --tls
```

The command deploys `ibm-transadv-dev` on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Note**: Those parameters are required for install `authentication.icp.edgeIp`, `authentication.icp.secretName`

## Open Transformation Advisor UI
- From Menu navigate to Workloads -> Deployments
- Click "ibm-transadv-dev-ui" deployment
- Click on Endpoint "access 3000"

If ingress is used in ICP 2.1.0.1 or 2.1.0.2
- From Menu navigate to Workloads -> Deployments
- Click "ibm-transadv-dev-ui" deployment
- Manually construct the URL of that form https://`<Ingress IP`>/`<Release name`>-ui
- "Release name" can be taken from the **Expose details** section in the "ibm-transadv-dev-ui" deployment page

## Configuration

The following tables lists the configurable parameters of the Transformation Advisor helm chart and their default values.

| Parameter                                           | Description                                                  | Default                                                 |
| --------------------------------------------------- | -------------------------------------------------------------| --------------------------------------------------------|
| arch.amd64                                          | Amd64 worker node scheduler preference in a hybrid cluster   | 3 - Most preferred                                      |
| arch.ppc64le                                        | Ppc64le worker node scheduler preference in a hybrid cluster | 2 - No preference                                       |
| arch.s390x                                          | S390x worker node scheduler preference in a hybrid cluster   | 2 - No preference                                       |
| ingress.enabled                                     | enable ingress to reach the service                          | true                                                    |
| authentication.icp.edgeIp                           | edge node IP                                                 | ""                                                      | 
| authentication.icp.endpointPort                     | edge node login port                                         | 8443                                                    |
| authentication.icp.secretName                       | The name of the secret in the Configuration in the same namespace of this release to be installed to| ""               |
| authentication.oidc.endpointPort ?? ?? ?? ?? ?? ?? ?? ?? ??  | OIDC authentication endpoint port    ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? | 9443   ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ??  |
| authentication.oidc.clientId.clientId               | a OIDC registry will be created with this id                 | ca5282946fac07867fbc937548cb35d3ebbace7e                |
| authentication.oidc.clientSecret                    | a OIDC registry will be created with this secret             | 94b6cbce793d0606c0df9e8d656a159f0c06631b                |
| security.serviceAccountName                         | name of the service account to use                           | default                                                 |
| couchdb.image.repository                            | couchdb image repository                                     | ibmcom/transformation-advisor-db                        |
| couchdb.image.tag                                   | couchdb image tag                                            | 1.8.1                                                   |
| couchdb.image.pullPolicy   ?? ?? ???? ?? ?? ?? ?? ?? ??       | couchdb image pull policy ?? ?? ?? ??                            | IfNotPresent ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ??                |
| couchdb.resources.requests.memory                   | requests memory                                              | 2Gi                                                     |
| couchdb.resources.requests.cpu                      | requests cpu                                                 | 1000m                                                   |
| couchdb.resources.limits.memory                     | limits memory                                                | 8Gi                                                     |
| couchdb.resources.limits.cpu                        | limits cpu                                                   | 16000m                                                  |
| couchdb.persistence.enabled                         | persistence enabled                                          | true                                                    |
| couchdb.persistence.accessMode                      | couchdb access mode                                          | ReadWriteMany                                           |
| couchdb.persistence.size                            | couchdb storage size                                         | 8Gi                                                     |
| couchdb.persistence.useDynamicProvisioning          | use dynamic provisioning                                     | true                                                    |
| couchdb.persistence.existingClaim ??   ?? ?? ?? ??       | existing pv claim       ??  ?? ?? ??                             | ""    ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ??               |
| couchdb.persistence.storageClassName  ?? ?? ?? ??       | couchdb storage class name ?? ?? ??                             | "" ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ??                |
| transadv.image.repository                           | transadv server image                                        | ibmcom/transformation-advisor-server                    |
| transadv.image.tag                                  | transadv server image tag                                    | 1.8.1                                                   |
| transadv.image.pullPolicy                           | image pull policy                                            | IfNotPresent                                            |
| transadv.resources.requests.memory                  | requests memory                                              | 2Gi                                                     |
| transadv.resources.requests.cpu                     | requests cpu                                                 | 1000m                                                   |
| transadv.resources.limits.memory                    | limits memory                                                | 4Gi                                                     |
| transadv.resources.limits.cpu                       | limits cpu                                                   | 16000m                                                  |
| transadv.service.nodePort                           | transadv sevice node port                                    | 30111                                                   |
| transadvui.image.repository  ?? ?? ?? ?? ?? ?? ?? ?? ??      | transadv ui image ?? ?? ?? ?? ?? ?? ?? ??                            | ibmcom/transformation-advisor-ui    ?? ?? ??               |
| transadvui.image.tag                                | transadv ui image tag                                        | 1.8.1                                                   |
| transadvui.image.pullPolicy                         | image pull policy                                            | IfNotPresent                                            |
| transadvui.resources.requests.memory                | requests memory                                              | 2Gi                                                     |
| transadvui.resources.requests.cpu                   | requests cpu                                                 | 1000m                                                   |
| transadvui.resources.limits.memory                  | limits memory                                                | 4Gi                                                     |
| transadvui.resources.limits.cpu                     | limits cpu                                                   | 16000m                                                  |
| transadvui.service.nodePort                         | transadv sevice node port                                    | 30222                                                   |
| transadvui.inmenu                                   | add to Tools menu                                            | true                                                    |

## Limitations

- Prior to TA 1.8, Transformation Advisor must be deployed in to the ```default``` namespace.

- This chart should only use the default image tags provided with the chart. Different image versions might not be compatible with different versions of this chart.

## Copyright

?? Copyright IBM Corporation 2017. All Rights Reserved.
