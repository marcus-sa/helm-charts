# `@helm-charts/stable-dask-distributed`

Distributed computation in Python

| Field               | Value            |
| ------------------- | ---------------- |
| Repository Name     | stable           |
| Chart Name          | dask-distributed |
| Chart Version       | 2.0.0            |
| NPM Package Version | 0.1.0            |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for dask.
# This is a YAML-formatted file.
# Declare name/value pairs to be passed into your templates.
# name: value

# nameOverride: dask

scheduler:
  name: scheduler
  image: 'daskdev/dask'
  imageTag: 'latest'
  replicas: 1
  component: 'dask-scheduler'
  serviceType: 'LoadBalancer'
  servicePort: 8786
  containerPort: 8786
  resources: {}
  # limits:
  #   cpu: 500m
  #   memory: 512Mi
  # requests:
  #   cpu: 500m
  #   memory: 512Mi

webUI:
  name: webui
  servicePort: 80
  containerPort: 8787

worker:
  name: worker
  image: 'daskdev/dask'
  imageTag: 'latest'
  replicas: 3
  component: 'dask-worker'
  containerPort: 8081
  resources: {}
  # limits:
  #   cpu: 500m
  #   memory: 512Mi
  # requests:
  #   cpu: 500m
  #   memory: 512Mi

jupyter:
  name: jupyter
  image: 'jupyter/base-notebook'
  imageTag: '11be019e4079'
  replicas: 1
  component: 'jupyter-notebook'
  serviceType: 'LoadBalancer'
  servicePort: 80
  containerPort: 8888
  password: 'sha1:aae8550c0a44:9507d45e087d5ee481a5ce9f4f16f37a0867318c' # 'dask'
  resources: {}
  # limits:
  #   cpu: 500m
  #   memory: 512Mi
  # requests:
  #   cpu: 500m
  #   memory: 512Mi
```

</details>

---

# Dask Distributed Helm Chart

Dask Distributed allows distributed computation in Python the chart also includes a single user Jupyter Notebook.

- https://github.com/dask/distributed
- http://jupyter.org/

## Chart Details

This chart will do the following:

- 1 x Dask scheduler with port 8786 (scheduler) and 80 (Web UI) exposed on an external LoadBalancer
- 3 x Dask workers that connect to the scheduler
- 1 x Jupyter notebook with port 80 exposed on an external LoadBalancer
- All using Kubernetes Deployments

## Installing the Chart

To install the chart with the release name `my-release`:

```bash
$ helm install --name my-release stable/dask-distributed
```

## Configuration

The following tables lists the configurable parameters of the Dask chart and their default values.

### Dask scheduler

| Parameter                 | Description              | Default          |
| ------------------------- | ------------------------ | ---------------- |
| `scheduler.name`          | Dask master name         | `dask-master`    |
| `scheduler.image`         | Container image name     | `dask2/dask`     |
| `scheduler.imageTag`      | Container image tag      | `latest`         |
| `scheduler.replicas`      | k8s deployment replicas  | `1`              |
| `scheduler.component`     | k8s selector key         | `dask-scheduler` |
| `scheduler.cpu`           | container requested cpu  | `500m`           |
| `scheduler.containerPort` | Container listening port | `8786`           |
| `scheduler.resources`     | Container resources      | `{}`             |

### Dask webUI

| Parameter             | Description              | Default      |
| --------------------- | ------------------------ | ------------ |
| `webUI.name`          | Dask webui name          | `dask-webui` |
| `webUI.servicePort`   | k8s service port         | `8787`       |
| `webUI.containerPort` | Container listening port | `8787`       |

### Dask worker

| Parameter              | Description                     | Default        |
| ---------------------- | ------------------------------- | -------------- |
| `worker.name`          | Dask worker name                | `dask-worker`  |
| `worker.image`         | Container image name            | `daskdev/dask` |
| `worker.imageTag`      | Container image tag             | `1.5.1_v3`     |
| `worker.replicas`      | k8s hpa and deployment replicas | `3`            |
| `worker.replicasMax`   | k8s hpa max replicas            | `10`           |
| `worker.component`     | k8s selector key                | `dask-worker`  |
| `worker.containerPort` | Container listening port        | `7077`         |
| `worker.resources`     | Container resources             | `{}`           |

### jupyter

| Parameter               | Description              | Default                 |
| ----------------------- | ------------------------ | ----------------------- |
| `jupyter.name`          | jupyter name             | `jupyter`               |
| `jupyter.image`         | Container image name     | `jupyter/base-notebook` |
| `jupyter.imageTag`      | Container image tag      | `11be019e4079`          |
| `jupyter.replicas`      | k8s deployment replicas  | `1`                     |
| `jupyter.component`     | k8s selector key         | `jupyter`               |
| `jupyter.servicePort`   | k8s service port         | `80`                    |
| `jupyter.containerPort` | Container listening port | `8888`                  |
| `jupyter.resources`     | Container resources      | `{}`                    |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`.

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart. For example,

```bash
$ helm install --name my-release -f values.yaml stable/dask
```

> **Tip**: You can use the default [values.yaml](values.yaml)
