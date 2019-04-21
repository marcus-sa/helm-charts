# `@helm-charts/stable-locust`

A modern load testing framework

| Field               | Value  |
| ------------------- | ------ |
| Repository Name     | stable |
| Chart Name          | locust |
| Chart Version       | 0.4.0  |
| NPM Package Version | 0.1.0  |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
Name: locust

image:
  repository: greenbirdit/locust
  tag: 0.9.0
  pullPolicy: IfNotPresent
  pullSecrets: []

service:
  name: master-web
  type: NodePort
  externalPort: 8089
  internalPort: 8089
  nodePort: 0
  annotations: {}
  extraLabels: {}
master:
  config:
    target-host: https://site.example.com
  resources:
    limits:
      cpu: 100m
      memory: 128Mi
    requests:
      cpu: 100m
      memory: 128Mi
worker:
  config:
    # Optional parameter to use an existing configmap instead of deploying one with the Chart
    # configmapName: locust-worker-configs

    # all files from specified configmap (or tasks folder) are mounted under `/locust-tasks`
    locust-script: '/locust-tasks/tasks.py'
  replicaCount: 2
  resources:
    limits:
      cpu: 100m
      memory: 128Mi
    requests:
      cpu: 100m
      memory: 128Mi
```

</details>

---

# Locust Helm Chart

This is a templated deployment of [Locust](http://locust.io) for Distributed Load
testing using Kubernetes.

## Pre Requisites:

- Requires (and tested with) helm `v2.1.2` or above.

## Chart details

This chart will do the following:

- Convert all files in `tasks/` folder into a configmap
- If an existing configmap is specified, it will be used instead of building one from the chart
- Create a Locust master and Locust worker deployment with the Target host
  and Tasks file specified.

### Installing the chart

To install the chart with the release name `locust-nymph` in the default namespace:

```bash
helm install -n locust-nymph --set master.config.target-host=http://site.example.com stable/locust
```

| Parameter                     | Description                            | Default                                                  |
| ----------------------------- | -------------------------------------- | -------------------------------------------------------- |
| `Name`                        | Locust master name                     | `locust`                                                 |
| `image.repository`            | Locust container image name            | `greenbirdit/locust`                                     |
| `image.tag`                   | Locust Container image tag             | `0.9.0`                                                  |
| `image.pullSecrets`           | Locust Container image registry secret | `None`                                                   |
| `service.type`                | k8s service type exposing master       | `NodePort`                                               |
| `service.nodePort`            | Port on cluster to expose master       | `0`                                                      |
| `service.annotations`         | KV containing custom annotations       | `{}`                                                     |
| `service.extraLabels`         | KV containing extra labels             | `{}`                                                     |
| `master.config.target-host`   | locust target host                     | `http://site.example.com`                                |
| `worker.config.locust-script` | locust script to run                   | `/locust-tasks/tasks.py`                                 |
| `worker.config.configmapName` | configmap to mount locust scripts from | `empty, configmap is created from tasks folder in Chart` |
| `worker.replicaCount`         | Number of workers to run               | `2`                                                      |

Specify parameters using `--set key=value[,key=value]` argument to `helm install`

Alternatively a YAML file that specifies the values for the parameters can be provided like this:

```bash
$ helm install --name my-release -f values.yaml stable/locust
```

#### Creating configmap with your Locust task files

You're probably developing your own Locust scripts that you want to run in this distributed setup.
To get those scripts into this deployment you can fork the chart and put them into the `tasks` folder. From there
they will be converted to a configmap and mounted for use in Locust.

Another solution, if you don't want to fork the Chart, is to put your Locust scripts in a configmap and provide the name
as a config parameter in `values.yaml`. You can read more on the use of configmaps as volumes in pods [here](https://kubernetes.io/docs/tasks/configure-pod-container/configure-pod-configmap/).

If you have your Locust task files in a folder named "scripts" you would use something like the following command:

`kubectl create configmap locust-worker-configs --from-file path/to/scripts`

### Interacting with Locust

Get the Locust URL following the Post Installation notes. Using port forwarding you should be able to connect to the
web ui on Locust master node.

You can start the swarm from the command line using port forwarding as follows:

for example:

```bash
export LOCUST_URL=http://127.0.0.1:8089
```

Start / Monitor & Stop the Locust swarm via the web panel or with following commands:

Start:

```bash
curl -XPOST $LOCUST_URL/swarm -d"locust_count=100&hatch_rate=10"
```

Monitor:

```bash
watch -n 1 "curl -s $LOCUST_URL/stats/requests | jq -r '[.user_count, .total_rps, .state] | @tsv'"
```

Stop:

```bash
curl $LOCUST_URL/stop
```
