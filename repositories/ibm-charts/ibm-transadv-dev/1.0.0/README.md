# `@helm-charts/ibm-charts-ibm-transadv-dev`

IBM Cloud Product Insights Transformation Advisor

| Field               | Value            |
| ------------------- | ---------------- |
| Repository Name     | ibm-charts       |
| Chart Name          | ibm-transadv-dev |
| Chart Version       | 1.0.0            |
| NPM Package Version | 0.1.0            |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# © Copyright IBM Corporation 2017
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
# http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# This is a YAML-formatted file.
# Declare variables to be passed into your templates.

# Default values for couchdb.
couchdb:
  #replica count of more than one is not supported yet
  #replicaCount: 1

  image:
    repository: 'klaemo/couchdb'
    tag: '2.0.0'
    ## Specify a imagePullPolicy
    ## ref: http://kubernetes.io/docs/user-guide/images/#pre-pulling-images
    ##
    pullPolicy: 'IfNotPresent'

  ## Configure resource requests and limits
  ## ref: http://kubernetes.io/docs/user-guide/compute-resources/
  resources:
    requests:
      memory: 2Gi
      cpu: 1000m
    limits:
      memory: 8Gi
      cpu: 16000m

  service:
    name: couchdb
    internalPort: 5984

  ## Create a database user
  user: 'admin'

  ## Password for database user
  ## Defaults to a random 10-character alphanumeric string if not set
  password: 'admindbpass'

  ## Enable persistence using Persistent Volume Claims
  ## ref: http://kubernetes.io/docs/user-guide/persistent-volumes/
  ##
  persistence:
    enabled: true
    #dynamic provisioning is not soupported yet
    accessMode: 'ReadWriteMany'
    size: 8Gi
    useDynamicProvisioning: false

    ## A manually managed Persistent Volume and Claim
    ## Requires persistence.enabled: true
    ## If defined, PVC must be created manually before volume will be bound
    ##
    existingClaim: ''

    ##incase of minikube hostpath volume set to MANUAL
    storageClassName: ''

# Default values for transformation advisor.
transadv:
  #replica count of more than one is not supported yet
  #replicaCount: 1

  image:
    repository: 'ibmcom/icp-transformation-advisor-dc'
    tag: '1.1.0'
    pullPolicy: 'IfNotPresent'
  service:
    name: server
    internalPort: 9080
    nodePort: 30111

  ## Configure resource requests and limits
  ## ref: http://kubernetes.io/docs/user-guide/compute-resources/
  resources:
    requests:
      memory: 2Gi
      cpu: 1000m
    limits:
      memory: 4Gi
      cpu: 16000m

# Default values for transformation advisor ui.
transadvui:
  #replica count of more than one is not supported yet
  #replicaCount: 1

  image:
    repository: 'ibmcom/icp-transformation-advisor-ui'
    tag: '1.1.0'
    pullPolicy: 'IfNotPresent'

  ## Configure resource requests and limits
  ## ref: http://kubernetes.io/docs/user-guide/compute-resources/
  resources:
    requests:
      memory: 2Gi
      cpu: 1000m
    limits:
      memory: 4Gi
      cpu: 16000m

  service:
    name: ui
    internalPort: 3000
```

</details>

---

## Introduction

Transformation Advisor has the capability to quickly evaluate your on-premise applications for rapid deployment on WebSphere Application Server and Liberty on Public and/or Private Cloud environments.

Transformation Advisor will:

- Gather your preferences regarding your current and desired target environments
- Via a downloaded agent it will analyse your existing applications and upload the results to a single location
- Provide recommendations for migration and development cost estimates to undertake the migrations across different platforms

The Transformation Advisor is delivered as an interconnected set of pods and kubernetes services. It consists of three pods - a server, a ui and a database.

## Persistence

By default Transformation Advisor expects a Persistence Volume (PV) to be available. You can change the default value to use an existing claim, or to not use any storage. Please see below for the different options:

### Create a Persistence Volume:

Complete the following steps to add the Persistent Volume

1. Navigate to **Platform** > **Storage**
1. Click **Create PersistentVolume**
1. Set the following values:
   - Name: transdev-pv-volume
   - Capacity: 8
   - Unit: Gi
   - Access mode: Read write many
   - Reclaim policy: Recycle
   - Storage type: Host path
1. On the left menu select **Labels** and enter the following values:
   - Label: type
   - Value: local
1. On the left menu select **Parameters** and enter the following values: - Key: path - Value: /tmp/data3  
   **Note**: _Value here should be a value appropriate to your system_

### Using an existing Persistence Volume Claim

If you already have a suitable claim available then you can use that as follows:

- During the install you will be prompted with a list of parameter values
- Set the value of **couchdb.persistence.existingClaim** to the claim that you already have

### No Persistence Volumes

_This option is not recommended_

You may install Transformation Advisor without using a Persistence Volume, however this has a number of limitations:

- If the couchDB container is restarted for any reason then **all of your data will be lost**
- If the couchDB container is restarted for any reason you will then need to **restart the server container** to re-initialize the couchDB

To use no Persistence Volumes complete the following steps:

- During the install you will be prompted with a list of parameter values
- Untick the following option **couchdb.persistence.enabled**

## Open Transformation Advisor UI

- From Menu navigate to Workloads -> Deployments
- Click "ibm-transadv-dev-ui" deployment
- Click on Endpoint "access 3000"

## Configuration

The following tables lists the configurable parameters of the Transformation Advisor helm chart and their default values.

| Parameter                                     | Description                       | Default                                                                     |
| --------------------------------------------- | --------------------------------- | --------------------------------------------------------------------------- |
| couchdb.image.repository                      | couchdb image repository          | klaemo/couchdb                                                              |
| couchdb.image.tag                             | couchdb image tag                 | 2.0.0                                                                       |
| couchdb.image.pullPolicy                      | couchdb image pull policy         | IfNotPresent                                                                |
| couchdb.resources.requests.memory             | requests memory                   | 2Gi                                                                         |
| couchdb.resources.requests.cpu                | requests cpu                      | 1000m                                                                       |
| couchdb.resources.limits.memory               | limits memory                     | 8Gi                                                                         |
| couchdb.resources.limits.cpu                  | limits cpu                        | 16000m                                                                      |
| couchdb.service.name                          | couchdb service name              | couchdb                                                                     |
| couchdb.service.internalPort                  | couchdb internal port             | 5984                                                                        |
| couchdb.user                                  | couchdb user                      | admin                                                                       |
| couchdb.password                              | couchdb password                  | admindbpass                                                                 |
| couchdb.persistence.enabled                   | persistence enabled               | true                                                                        |
| couchdb.persistence.accessMode                | couchdb access mode               | ReadWriteMany                                                               |
| couchdb.persistence.size                      | couchdb storage size              | 8Gi                                                                         |
| couchdb.persistence.useDynamicProvisioning    | use dynamic provisioning          | false                                                                       |
| couchdb.persistence.existingClaim             | use existing pv claim             | false                                                                       |
| couchdb.persistence.storageClassName          | couchdb storage class name        |                                                                             |
| transadv.image.repository                     | transadv server image             | ibmcom/icp-transformation-advisor-dc                                        |
| transadv.image.tag                            | transadv server image tag         | 1.1.0                                                                       |
| transadv.image.pullPolicy                     | image pull policy                 | IfNotPresent                                                                |
| transadv.resources.requests.memory            | requests memory                   | 2Gi                                                                         |
| transadv.resources.requests.cpu               | requests cpu                      | 1000m                                                                       |
| transadv.resources.limits.memory              | limits memory                     | 4Gi                                                                         |
| transadv.resources.limits.cpu                 | limits cpu                        | 16000m                                                                      |
| transadv.service.name                         | transadv service name             | transadv                                                                    |
| transadv.service.internalPort                 | transadv sevice internal port     | 9080                                                                        |
| transadv.service.nodePort                     | transadv sevice node port         | 30111                                                                       |
| transadvui.image.repository                   | transadv ui image                 | ibmcom/icp-transformation-advisor-ui                                        |
| transadvui.image.tag                          | transadv ui image tag             | 1.1.0                                                                       |
| transadvui.image.pullPolicy                   | image pull policy                 | IfNotPresent                                                                |
| transadvui.resources.requests.memory          | requests memory                   | 2Gi                                                                         |
| transadvui.resources.requests.cpu             | requests cpu                      | 1000m                                                                       |
| transadvui.resources.limits.memory            | limits memory                     | 4Gi                                                                         |
| transadvui.resources.limits.cpu               | limits cpu                        | 16000m                                                                      |
| transadvui.service.name                       | transadv ui service name          | ui                                                                          |
| transadvui.service.internalPort               | transadv sevice internal port     | 3000                                                                        |

# For those who use Kubectl CLI

## Prerequisites

- Ensure kubectl points to your ICP
  https://github.com/IBM/charts
- Ensure `helm` is installed

### Create a Persistence Volume:

Create pv.yaml file with following content

```
kind: PersistentVolume
apiVersion: v1
metadata:
  name: transadv-pv-volume
  labels:
    type: local
spec:
  persistentVolumeReclaimPolicy: Recycle
  capacity:
    storage: 8Gi
  accessModes:
    - ReadWriteMany
  hostPath:
    path: "/tmp/data"
```

Create pv

```
kubectl create -f pv.yaml
```

## Installing the Chart

```
helm install -n ibm-transadv-dev ./ --debug
```

## Verifying the installation

Go to the URL displayed in Notes.txt and ensure application is running

## Uninstalling the Chart

```
helm delete --purge ibm-transadv-dev
```

## Open Transformation Advisor UI

Go to the URL displayed in Notes.txt

Alternatively follow these instructions :
From a browser, use http://<**NodeIP**>:<**NodePort**> to access the application.

In order to do this you will need to know the Node IP and the nodeport for the UI deployment.

To find out the value for <**NodePort**> you can use the `kubectl get svc` command line command as shown below

```
kubectl get svc

couchdb               10.0.0.152   <nodes>       5984:32049/TCP   37m
                                                      ^^^^^
                                                      32049 is the NodePort in this instance
```

To find out the value for <**NodeIP**>

```
kubectl cluster-info

Kubernetes master is running at https://9.162.177.182:8001
                                        ^^^^^^^^^^^^^
                                        9.162.177.182 is the NodeIP in this instance
```

## Copyright

© Copyright IBM Corporation 2017. All Rights Reserved.