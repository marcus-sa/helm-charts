# `@helm-charts/incubator-kubeless`

Kubeless is a Kubernetes-native serverless framework. It runs on top of your Kubernetes cluster and allows you to deploy small unit of code without having to build container images.

| Field               | Value     |
| ------------------- | --------- |
| Repository Name     | incubator |
| Chart Name          | kubeless  |
| Chart Version       | 2.0.3     |
| NPM Package Version | 0.1.0     |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for kubeless.
## RBAC configuration
rbac:
  create: false

## Controller configuration
controller:
  deployment:
    replicaCount: 1
    functionController:
      image:
        repository: kubeless/function-controller
        tag: v1.0.3
        pullPolicy: IfNotPresent
    httpTriggerController:
      image:
        repository: bitnami/http-trigger-controller
        tag: v1.0.0
        pullPolicy: IfNotPresent
    cronJobTriggerController:
      image:
        repository: bitnami/cronjob-trigger-controller
        tag: v1.0.0
        pullPolicy: IfNotPresent
  ## Kubeless Controller resource requests and limits
  ## Ref: http://kubernetes.io/docs/user-guide/compute-resources/
  ##
  resources:
    {}
    # limits:
    #   cpu: 500m
    #   memory: 512Mi
    # requests:
    #   cpu: 500m
    #   memory: 512Mi

## Kubeless configuration
config:
  functionsNamespace: ''
  builderImage: kubeless/function-image-builder
  builderImagePullSecret: ''
  deploymentTemplate: '{}'
  enableBuildStep: 'false'
  functionRegistryTLSVerify: 'true'
  provisionImage: kubeless/unzip@sha256:f162c062973cca05459834de6ed14c039d45df8cdb76097f50b028a1621b3697
  provisionImagePullSecret: ''
  runtimeImages: '[
    {
    "ID": "ballerina",
    "depName": "",
    "fileNameSuffix": ".bal",
    "versions": [
    {
    "images": [
    {
    "command": "/compile-function.sh $KUBELESS_FUNC_NAME",
    "image": "ballerina/kubeless-ballerina-init@sha256:a04ca9d289c62397d0b493876f6a9ff4cc425563a47aa7e037c3b850b8ceb3e8",
    "phase": "compilation"
    },
    {
    "image": "ballerina/kubeless-ballerina@sha256:a025841010cfdf8136396efef31d4155283770d331ded6a9003e6e55f02db2e5",
    "phase": "runtime"
    }
    ],
    "name": "ballerina0.981.0",
    "version": "0.981.0"
    }
    ]
    },
    {
    "ID": "dotnetcore",
    "depName": "project.csproj",
    "fileNameSuffix": ".cs",
    "versions": [
    {
    "images": [
    {
    "command": "/app/compile-function.sh $KUBELESS_INSTALL_VOLUME",
    "image": "allantargino/aspnetcore-build@sha256:0d60f845ff6c9c019362a68b87b3920f3eb2d32f847f2d75e4d190cc0ce1d81c",
    "phase": "compilation"
    },
    {
    "env": {
    "DOTNETCORE_HOME": "$(KUBELESS_INSTALL_VOLUME)/packages"
    },
    "image": "allantargino/kubeless-dotnetcore@sha256:1699b07d9fc0276ddfecc2f823f272d96fd58bbab82d7e67f2fd4982a95aeadc",
    "phase": "runtime"
    }
    ],
    "name": "dotnetcore2.0",
    "version": "2.0"
    },
    {
    "images": [
    {
    "command": "/app/compile-function.sh $KUBELESS_INSTALL_VOLUME",
    "image": "allantargino/aspnetcore-build@sha256:36123cf0279b87c5d27d69558062678a5353cc6db238af46bd5c0e508109f659",
    "phase": "compilation"
    },
    {
    "env": {
    "DOTNETCORE_HOME": "$(KUBELESS_INSTALL_VOLUME)/packages"
    },
    "image": "allantargino/kubeless-dotnetcore@sha256:6d6c659807881e9dac7adde305867163ced5711ef77a3a76e50112bca1ba14cf",
    "phase": "runtime"
    }
    ],
    "name": "dotnetcore2.1",
    "version": "2.1"
    }
    ]
    },
    {
    "ID": "go",
    "depName": "Gopkg.toml",
    "fileNameSuffix": ".go",
    "versions": [
    {
    "images": [
    {
    "command": "/compile-function.sh",
    "image": "kubeless/go-init@sha256:88104a60bcd4c67fd6aa92fffa46062396c08bc2632529ee435517e7628a2f95",
    "phase": "compilation"
    },
    {
    "command": "cd $GOPATH/src/kubeless && dep ensure > /dev/termination-log 2>&1",
    "image": "kubeless/go-init@sha256:88104a60bcd4c67fd6aa92fffa46062396c08bc2632529ee435517e7628a2f95",
    "phase": "installation"
    },
    {
    "image": "kubeless/go@sha256:f5d449f830ac8727c0b9c05e458b6dd0a0822743cb19a87343e0fd00b041eea9",
    "phase": "runtime"
    }
    ],
    "name": "go1.10",
    "version": "1.10"
    }
    ]
    },
    {
    "ID": "java",
    "depName": "pom.xml",
    "fileNameSuffix": ".java",
    "versions": [
    {
    "images": [
    {
    "command": "/compile-function.sh",
    "image": "kubeless/java-init@sha256:36cc37836437aaa5ac82f49ba20781d45bd5efcd9e2d022fcaae487a058572c2",
    "phase": "compilation"
    },
    {
    "image": "kubeless/java@sha256:2dbc44c0e2467a27558776edb2aed85055361e2f0b74443800851ee658576a88",
    "phase": "runtime"
    }
    ],
    "name": "java1.8",
    "version": "1.8"
    }
    ]
    },
    {
    "ID": "nodejs",
    "depName": "package.json",
    "fileNameSuffix": ".js",
    "versions": [
    {
    "images": [
    {
    "command": "/kubeless-npm-install.sh",
    "image": "kubeless/nodejs@sha256:4d8f5d6ad51676e8faffc0da6fabe8e12cf8cf34ae0ce8e94ee4e510f9876d2e",
    "phase": "installation"
    },
    {
    "env": {
    "NODE_PATH": "$(KUBELESS_INSTALL_VOLUME)/node_modules"
    },
    "image": "kubeless/nodejs@sha256:4d8f5d6ad51676e8faffc0da6fabe8e12cf8cf34ae0ce8e94ee4e510f9876d2e",
    "phase": "runtime"
    }
    ],
    "name": "node6",
    "version": "6"
    },
    {
    "images": [
    {
    "command": "/kubeless-npm-install.sh",
    "image": "kubeless/nodejs@sha256:5c3c21cf29231f25a0d7d2669c6f18c686894bf44e975fcbbbb420c6d045f7e7",
    "phase": "installation"
    },
    {
    "env": {
    "NODE_PATH": "$(KUBELESS_INSTALL_VOLUME)/node_modules"
    },
    "image": "kubeless/nodejs@sha256:5c3c21cf29231f25a0d7d2669c6f18c686894bf44e975fcbbbb420c6d045f7e7",
    "phase": "runtime"
    }
    ],
    "name": "node8",
    "version": "8"
    }
    ]
    },
    {
    "ID": "php",
    "depName": "composer.json",
    "fileNameSuffix": ".php",
    "versions": [
    {
    "images": [
    {
    "command": "composer install -d $KUBELESS_INSTALL_VOLUME",
    "image": "composer:1.6",
    "phase": "installation"
    },
    {
    "image": "kubeless/php@sha256:9b86066b2640bedcd88acb27f43dfaa2b338f0d74d9d91131ea781402f7ec8ec",
    "phase": "runtime"
    }
    ],
    "name": "php72",
    "version": "7.2"
    }
    ]
    },
    {
    "ID": "python",
    "depName": "requirements.txt",
    "fileNameSuffix": ".py",
    "versions": [
    {
    "images": [
    {
    "command": "pip install --prefix=$KUBELESS_INSTALL_VOLUME -r $KUBELESS_DEPS_FILE",
    "image": "python:2.7",
    "phase": "installation"
    },
    {
    "env": {
    "PYTHONPATH": "$(KUBELESS_INSTALL_VOLUME)/lib/python2.7/site-packages:$(KUBELESS_INSTALL_VOLUME)"
    },
    "image": "kubeless/python@sha256:34332f4530508a810f491838a924c36ceac0ec7cab487520e2db2b037800ecda",
    "phase": "runtime"
    }
    ],
    "name": "python27",
    "version": "2.7"
    },
    {
    "images": [
    {
    "command": "pip install --prefix=$KUBELESS_INSTALL_VOLUME -r $KUBELESS_DEPS_FILE",
    "image": "python:3.4",
    "phase": "installation"
    },
    {
    "env": {
    "PYTHONPATH": "$(KUBELESS_INSTALL_VOLUME)/lib/python3.4/site-packages:$(KUBELESS_INSTALL_VOLUME)"
    },
    "image": "kubeless/python@sha256:5c93a60b83dba9324ad8358e66952232746ef9d477266d6a199617d7344c2053",
    "phase": "runtime"
    }
    ],
    "name": "python34",
    "version": "3.4"
    },
    {
    "images": [
    {
    "command": "pip install --prefix=$KUBELESS_INSTALL_VOLUME -r $KUBELESS_DEPS_FILE",
    "image": "python:3.6",
    "phase": "installation"
    },
    {
    "env": {
    "PYTHONPATH": "$(KUBELESS_INSTALL_VOLUME)/lib/python3.6/site-packages:$(KUBELESS_INSTALL_VOLUME)"
    },
    "image": "kubeless/python@sha256:8c49bfa1c6aa5fbcd0f7d99d97280c161247fc94c06d26c04e39ac341c3f75e5",
    "phase": "runtime"
    }
    ],
    "name": "python36",
    "version": "3.6"
    },
    {
    "images": [
    {
    "command": "pip install --prefix=$KUBELESS_INSTALL_VOLUME -r $KUBELESS_DEPS_FILE",
    "image": "python:3.7",
    "phase": "installation"
    },
    {
    "env": {
    "PYTHONPATH": "$(KUBELESS_INSTALL_VOLUME)/lib/python3.7/site-packages:$(KUBELESS_INSTALL_VOLUME)"
    },
    "image": "kubeless/python@sha256:dbf616cb06a262482c00f5b53e1de17571924032e0ad000865ec6b5357ff35bf",
    "phase": "runtime"
    }
    ],
    "name": "python37",
    "version": "3.7"
    }
    ]
    },
    {
    "ID": "ruby",
    "depName": "Gemfile",
    "fileNameSuffix": ".rb",
    "versions": [
    {
    "images": [
    {
    "command": "bundle install --gemfile=$KUBELESS_DEPS_FILE --path=$KUBELESS_INSTALL_VOLUME",
    "image": "bitnami/ruby:2.3",
    "phase": "installation"
    },
    {
    "env": {
    "GEM_HOME": "$(KUBELESS_INSTALL_VOLUME)/ruby/2.3.0"
    },
    "image": "kubeless/ruby@sha256:67870b57adebc4dc749a8a19795da801da2d05fc6e8324168ac1b227bb7c77f7",
    "phase": "runtime"
    }
    ],
    "name": "ruby23",
    "version": "2.3"
    },
    {
    "images": [
    {
    "command": "bundle install --gemfile=$KUBELESS_DEPS_FILE --path=$KUBELESS_INSTALL_VOLUME",
    "image": "bitnami/ruby:2.4",
    "phase": "installation"
    },
    {
    "env": {
    "GEM_HOME": "$(KUBELESS_INSTALL_VOLUME)/ruby/2.4.0"
    },
    "image": "kubeless/ruby@sha256:aaa9c7f3dfd4f866a527c04171c32dae2efa420d770a6af9c517771137ab4011",
    "phase": "runtime"
    }
    ],
    "name": "ruby24",
    "version": "2.4"
    },
    {
    "images": [
    {
    "command": "bundle install --gemfile=$KUBELESS_DEPS_FILE --path=$KUBELESS_INSTALL_VOLUME",
    "image": "bitnami/ruby:2.5",
    "phase": "installation"
    },
    {
    "env": {
    "GEM_HOME": "$(KUBELESS_INSTALL_VOLUME)/ruby/2.5.0"
    },
    "image": "kubeless/ruby@sha256:577e35724996ba340ff0a18366bce99586b0be58e4d27fa3e8038f977caf1559",
    "phase": "runtime"
    }
    ],
    "name": "ruby25",
    "version": "2.5"
    }
    ]
    },
    {
    "ID": "jvm",
    "depName": "",
    "fileNameSuffix": ".jar",
    "versions": [
    {
    "images": [
    {
    "command": "mv /kubeless/* /kubeless/payload.jar && cp /opt/*.jar /kubeless/ > /dev/termination-log 2>&1",
    "image": "caraboides/jvm-init@sha256:e57dbf3f56570a196d68bce1c0695102b2dbe3ae2ca6d1c704476a7a11542f1d",
    "phase": "compilation"
    },
    {
    "image": "caraboides/jvm@sha256:2870c4f48df4feb2ee7478a152b44840d781d4b1380ad3fa44b3c7ff314faded",
    "phase": "runtime"
    }
    ],
    "name": "jvm1.8",
    "version": "1.8"
    }
    ]
    },
    {
    "ID": "nodejs_distroless",
    "depName": "package.json",
    "fileNameSuffix": ".js",
    "versions": [
    {
    "images": [
    {
    "command": "/kubeless-npm-install.sh",
    "image": "kubeless/nodejs@sha256:424add88dc2a7fdc45012593159794d59a6ea4aafadfffb632d21ae53b1d262b",
    "phase": "installation"
    },
    {
    "env": {
    "NODE_PATH": "$(KUBELESS_INSTALL_VOLUME)/node_modules"
    },
    "image": "kubeless/nodejs-distroless@sha256:1fa0469c5520f4e08d89b1fafd2cacf03f098b96ea04997fa52bb9ef2a180fb3",
    "phase": "runtime"
    }
    ],
    "name": "node8",
    "version": "8"
    }
    ]
    },
    {
    "ID": "nodejsCE",
    "depName": "package.json",
    "fileNameSuffix": ".js",
    "versions": [
    {
    "images": [
    {
    "command": "/kubeless-npm-install.sh",
    "image": "kubeless/nodejs@sha256:456d98f6f15588b21f5110facf1cc203065840d4c227afa61d17c6c1fa98b3b6",
    "phase": "installation"
    },
    {
    "env": {
    "NODE_PATH": "$(KUBELESS_INSTALL_VOLUME)/node_modules"
    },
    "image": "andresmgot/nodejs-ce@sha256:708c265d22a8a1599e05da844d26bc63e2f66f859ffecd2fcb541ecac9c66780",
    "phase": "runtime"
    }
    ],
    "name": "node8",
    "version": "8"
    }
    ]
    }]'

## UI configuration
ui:
  enabled: false
  deployment:
    replicaCount: 1
    ui:
      image:
        repository: bitnami/kubeless-ui
        tag: latest
        pullPolicy: IfNotPresent
    proxy:
      image:
        repository: kelseyhightower/kubectl
        tag: 1.4.0
        pullPolicy: IfNotPresent

  service:
    name: ui-port
    type: NodePort
    externalPort: 3000

  ingress:
    enabled: false
    annotations:
      {}
      # kubernetes.io/ingress.class: nginx
      # kubernetes.io/tls-acme: "true"
    path: /
    hosts:
      - chart-example.local
    tls: []
    #  - secretName: chart-example-tls
    #    hosts:
    #      - chart-example.local

## Kafka Trigger configuration Configuration
kafkaTrigger:
  enabled: false
  deployment:
    image:
      repository: bitnami/kafka-trigger-controller
      tag: v1.0.0
      pullPolicy: IfNotPresent
  env:
    kafkaBrokers: localhost:9092
```

</details>

---

# Kubeless

[Kubeless](http://kubeless.io/) is a Kubernetes-native serverless framework. It runs on top of your Kubernetes cluster and allows you to deploy small unit of code without having to build container images. With kubeless you can build advanced applications that tie together services using functions.

## TL;DR;

```bash
$ helm repo add incubator https://kubernetes-charts-incubator.storage.googleapis.com/
$ helm install --namespace kubeless incubator/kubeless
```

## Introduction

This chart bootstraps a [Kubeless](https://github.com/kubeless/kubeless) and a [Kubeless-UI](https://github.com/kubeless/kubeless-ui) deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.7+ with Beta APIs enabled

## Installing the Chart

To install the chart with the release name `my-release`:

```bash
$ helm install --name my-release --namespace kubeless incubator/kubeless
```

> **NOTE**
>
> While the chart supports deploying Kubeless to any namespace, Kubeless expects to be deployed under a namespace named `kubeless`.

The command deploys Kubernetes on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```bash
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Kafka Trigger

Kubeless supports triggering functions via Kafka events. More info here: https://kubeless.io/docs/use-existing-kafka/.
An existing Kafka cluster needs to be accessible to kubeless -- if you like, you may look into setting Kafka up via the [Kafka chart](https://github.com/kubernetes/charts/tree/master/incubator/kafka). Once Kafka is running,
to enable the Kafka trigger you must configure the following values: `rbac.create: true`, `kafkaTrigger.enabled: true`, `kafkaTrigger.env.kafkaBrokers: <your_kafka_brokers>`.

## Configuration

The following table lists the configurable parameters of the Kubeless chart and their default values.

| Parameter                                                         | Description                                | Default                                   |
| ----------------------------------------------------------------- | ------------------------------------------ | ----------------------------------------- |
| `rbac.create`                                                     | Create RBAC backed ServiceAccount          | `false`                                   |
| `config.functionsNamespace`                                       | Functions namespace                        | ""                                        |
| `config.builderImage`                                             | Function builder image                     | `kubeless/function-image-builder`         |
| `config.builderImagePullSecret`                                   | Secret to pull builder image               | ""                                        |
| `config.builderImage`                                             | Provision image                            | `kubeless/unzip`                          |
| `config.builderImagePullSecret`                                   | Secret to pull provision image             | ""                                        |
| `config.deploymentTemplate`                                       | Deployment template for functions          | `{}`                                      |
| `config.enableBuildStep`                                          | Enable builder functionality               | `false`                                   |
| `config.functionRegistryTLSVerify`                                | Enable TLS verification for image registry | `{}`                                      |
| `config.runtimeImages`                                            | Runtimes available                         | python, nodejs, ruby, php and go          |
| `controller.deployment.functionController.image.repository`       | Function Controller image                  | `kubeless/function-controller`            |
| `controller.deployment.functionController.image.pullPolicy`       | Function Controller image pull policy      | `IfNotPresent`                            |
| `controller.deployment.httpTriggerController.image.repository`    | HTTP Controller image                      | `bitnami/bitnami/http-trigger-controller` |
| `controller.deployment.httpTriggerController.image.pullPolicy`    | HTTP Controller image pull policy          | `IfNotPresent`                            |
| `controller.deployment.cronJobTriggerController.image.repository` | CronJob Controller image                   | `bitnami/cronjob-trigger-controller`      |
| `controller.deployment.cronJobTriggerController.image.pullPolicy` | CronJob Controller image pull policy       | `IfNotPresent`                            |
| `controller.deployment.replicaCount`                              | Number of replicas                         | `1`                                       |
| `ui.enabled`                                                      | Kubeless UI component                      | `false`                                   |
| `ui.deployment.ui.image.repository`                               | Kubeless UI image                          | `bitnami/kubeless-ui`                     |
| `ui.deployment.ui.image.pullPolicy`                               | Kubeless UI image pull policy              | `IfNotPresent`                            |
| `ui.deployment.proxy.image.repository`                            | Proxy image                                | `kelseyhightower/kubectl`                 |
| `ui.deployment.proxy.image.pullPolicy`                            | Proxy image pull policy                    | `IfNotPresent`                            |
| `ui.deployment.replicaCount`                                      | Number of replicas                         | `1`                                       |
| `ui.service.name`                                                 | Service name                               | `ui-port`                                 |
| `ui.service.type`                                                 | Kubernetes service name                    | `NodePort`                                |
| `ui.service.externalPort`                                         | Service external port                      | `3000`                                    |
| `ui.ingress.enabled`                                              | Kubeless UI ingress switch                 | `false`                                   |
| `ui.ingress.annotations`                                          | Kubeless UI ingress annotations            | `{}`                                      |
| `ui.ingress.path`                                                 | Kubeless UI ingress path                   | `{}`                                      |
| `ui.ingress.hosts`                                                | Kubeless UI ingress hosts                  | `[chart-example.local]`                   |
| `ui.ingress.tls`                                                  | Kubeless UI ingress TLS                    | `[]`                                      |
| `kafkaTrigger.enabled`                                            | Kubeless Kafka Trigger                     | `false`                                   |
| `kafkaTrigger.env.kafkaBrokers`                                   | Kafka Brokers Environment Variable         | `localhost:9092`                          |
| `kafkaTrigger.deployment.ui.image.repository`                     | Kubeless Kafka Trigger image               | `bitnami/kubeless-ui`                     |
| `kafkaTrigger.deployment.ui.image.pullPolicy`                     | Kubeless Kafka Trigger image pull policy   | `IfNotPresent`                            |
| `kafkaTrigger.deployment.ui.image.tag`                            | Kubeless Kafka Trigger image tag           | `v1.0.0-alpha.3`                          |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```bash
$ helm install --name my-release --set service.name=ui-service,service,externalPort=4000 --namespace kubeless incubator/kubeless
```

The above command sets the Kubeless service name to `ui-service` and the external port to `4000`.

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart. For example,

```bash
$ helm install --name my-release -f values.yaml --namespace kubeless incubator/kubeless
```

> **Tip**: You can use the default [values.yaml](values.yaml)

## Kubeless UI

The [Kubeless UI](https://github.com/kubeless/kubeless-ui) component is disabled by default. In order to enable it set the ui.enabled property to true. For example,

```bash
$ helm install --name my-release --set ui.enabled=true --namespace kubeless incubator/kubeless
```
