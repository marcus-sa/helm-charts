# `@helm-charts/stable-selenium`

Chart for selenium grid

| Field               | Value    |
| ------------------- | -------- |
| Repository Name     | stable   |
| Chart Name          | selenium |
| Chart Version       | 0.9.0    |
| NPM Package Version | 0.1.0    |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
global:
  ## NodeSelector to be used in every deployment
  ## hub, chrome, firefox, chromeDebug and firefoxDebug
  ## can also be spceifed at chart level see below
  nodeSelector:
  #  label: value

hub:
  ## The repository and image
  ## ref: https://hub.docker.com/r/selenium/hub/
  image: 'selenium/hub'

  ## The tag for the image
  ## ref: https://hub.docker.com/r/selenium/hub/tags/
  tag: '3.14.0'

  ## Specify an imagePullPolicy
  ## ref: http://kubernetes.io/docs/user-guide/images/#pre-pulling-images
  pullPolicy: 'IfNotPresent'

  ## The port which the hub listens on
  port: 4444

  ## Timeout for probe Hub readiness via HTTP request on Hub console
  readinessTimeout: 1

  ## Timeout for probe Hub liveness via HTTP request on Hub console
  livenessTimeout: 1

  ## Set the JAVA_TOOL_OPTIONS environment variable
  ## If you find your selenium hub is OOMKilled, try adding -XX:+UseSerialGC
  javaOpts: '-Xmx400m'

  ## Set the SE_OPTS environment variable
  ## ref: http://www.seleniumhq.org/docs/07_selenium_grid.jsp#node-configuration
  # seOpts:

  ## Defining a JMX port will open the port on the container, however, it
  ## requires additional javaOpts, ie
  ## javaOpts: >
  ##   -Dcom.sun.management.jmxremote.port=4000
  ##   -Dcom.sun.management.jmxremote.authenticate=false
  ##   -Dcom.sun.management.jmxremote.ssl=false
  ## ref: http://openjdk.java.net/groups/jmx/
  # jmxPort: 4000

  ## Configure resource requests and limits
  ## ref: http://kubernetes.io/docs/user-guide/compute-resources/
  resources:
    limits:
      cpu: '.5'
      memory: '512Mi'

  ## The type of service to create
  ##   Values: ClusterIP, NodePort, LoadBalancer, or ExternalName
  ## ref: https://kubernetes.io/docs/user-guide/services/
  serviceType: 'LoadBalancer'

  ## The LoadBalancer IP Address
  ## ref: https://kubernetes.io/docs/user-guide/services/
  ## serviceLoadBalancerIP: "40.121.183.52"

  ## Control where client requests go, to the same pod or round-robin
  ##   Values: ClientIP or None
  ## ref: https://kubernetes.io/docs/user-guide/services/
  serviceSessionAffinity: 'None'

  ## Define various attributes of the service
  # serviceAnnotations:
  #   # internal AWS ELB
  #   service.beta.kubernetes.io/aws-load-balancer-internal: "0.0.0.0/0"

  ## ref: https://seleniumhq.github.io/docs/grid.html#step_1_start_the_hub
  # gridNewSessionWaitTimeout: -1
  # gridJettyMaxThreads: -1
  ## In milliseconds
  # gridNodePolling: 5000
  ## In milliseconds
  # gridCleanUpCycle: 5000
  ## In milliseconds
  # gridTimeout: 30000
  ## In milliseconds
  # gridBrowserTimeout: 0
  # gridMaxSession: 5
  ## In milliseconds
  # gridUnregisterIfStillDownAfer: 30000
  # timeZone: UTC

  ## NodeSelector to be used for the hub
  nodeSelector:
  #  label: value

chrome:
  ## Enable the creation of a node-chrome pod
  enabled: false

  ## The repository and image
  ## ref: https://hub.docker.com/r/selenium/node-chrome/
  image: 'selenium/node-chrome'

  ## The tag for the image
  ## ref: https://hub.docker.com/r/selenium/node-chrome/tags/
  tag: '3.14.0'

  ## Specify an imagePullPolicy
  ## ref: http://kubernetes.io/docs/user-guide/images/#pre-pulling-images
  pullPolicy: 'IfNotPresent'

  ## The number of pods in the deployment
  replicas: 1

  ## Set the JAVA_TOOL_OPTIONS environment variable
  ## If you find your selenium node is OOMKilled, try adding -XX:+UseSerialGC
  javaOpts: '-Xmx900m'

  ## Set the SE_OPTS environment variable
  ## ref: http://www.seleniumhq.org/docs/07_selenium_grid.jsp#node-configuration
  # seOpts:

  ## Defining a JMX port will open the port on the container, however, it
  ## requires additional javaOpts, ie
  ## javaOpts: >
  ##   -Dcom.sun.management.jmxremote.port=4000
  ##   -Dcom.sun.management.jmxremote.authenticate=false
  ##   -Dcom.sun.management.jmxremote.ssl=false
  ## ref: http://openjdk.java.net/groups/jmx/
  # jmxPort: 4000

  ## User defined volumes
  ## ref: https://kubernetes.io/docs/user-guide/volumes/
  volumes:
    ## https://github.com/kubernetes/kubernetes/pull/34928#issuecomment-277952723
    ## http://stackoverflow.com/questions/39852716/chrome-driver-throwing-org-openqa-selenium-remote-sessionnotfoundexception-whe
    ## Chrome wants more than 64mb of shared memory. Docker/k8s default to 64mb.
    - name: dshm
      emptyDir:
        medium: Memory
  volumeMounts:
    - mountPath: /dev/shm
      name: dshm

  ## Configure resource requests and limits
  ## ref: http://kubernetes.io/docs/user-guide/compute-resources/
  resources:
    limits:
      cpu: '.5'
      memory: '1000Mi'

  ## Characteristics of the browser window
  # screenWidth: 1280
  # screenHeight: 1024
  # screenDepth: 24
  # display: :10

  ## Selenium node options
  # chromeVersion:
  # nodeMaxInstances: 1
  # nodeMaxSession: 1
  ## In milliseconds
  # nodeRegisterCycle: 5000
  # nodePort: 5555
  # timeZone: UTC

  ## NodeSelector to be used for chrome
  nodeSelector:
  #  label: value

chromeDebug:
  ## Enable the creation of a node-chrome-debug pod
  enabled: false

  ## The repository and image
  ## ref: https://hub.docker.com/r/selenium/node-chrome-debug/
  image: 'selenium/node-chrome-debug'

  ## The tag for the image
  ## ref: https://hub.docker.com/r/selenium/node-chrome-debug/tags/
  tag: '3.14.0'

  ## Specify an imagePullPolicy
  ## ref: http://kubernetes.io/docs/user-guide/images/#pre-pulling-images
  pullPolicy: 'IfNotPresent'

  ## The number of pods in the deployment
  replicas: 1

  ## Set the JAVA_TOOL_OPTIONS environment variable
  ## If you find your selenium hub is OOMKilled, try adding -XX:+UseSerialGC
  javaOpts: '-Xmx900m'

  ## Set the SE_OPTS environment variable
  ## ref: http://www.seleniumhq.org/docs/07_selenium_grid.jsp#node-configuration
  # seOpts:

  ## Defining a JMX port will open the port on the container, however, it
  ## requires additional javaOpts, ie
  ## javaOpts: >
  ##   -Dcom.sun.management.jmxremote.port=4000
  ##   -Dcom.sun.management.jmxremote.authenticate=false
  ##   -Dcom.sun.management.jmxremote.ssl=false
  ## ref: http://openjdk.java.net/groups/jmx/
  # jmxPort: 4000

  ## User defined volumes
  ## ref: https://kubernetes.io/docs/user-guide/volumes/
  volumes:
    ## https://github.com/kubernetes/kubernetes/pull/34928#issuecomment-277952723
    ## http://stackoverflow.com/questions/39852716/chrome-driver-throwing-org-openqa-selenium-remote-sessionnotfoundexception-whe
    ## Chrome wants more than 64mb of shared memory. Docker/k8s default to 64mb.
    - name: dshm
      emptyDir:
        medium: Memory
  volumeMounts:
    - mountPath: /dev/shm
      name: dshm

  ## Configure resource requests and limits
  ## ref: http://kubernetes.io/docs/user-guide/compute-resources/
  resources:
    limits:
      cpu: '.5'
      memory: '1500Mi'

  ## Characteristics of the browser window
  # screenWidth: 1280
  # screenHeight: 1024
  # screenDepth: 24
  # display: :10

  ## Selenium node options
  # chromeVersion:
  # nodeMaxInstances: 1
  # nodeMaxSession: 1
  ## In milliseconds
  # nodeRegisterCycle: 5000
  # nodePort: 5555
  # timeZone: UTC

  ## NodeSelector to be used for chromeDebug
  nodeSelector:
  #  label: value

firefox:
  ## Enable the creation of a node-firefox pod
  enabled: false

  ## The repository and image
  ## ref: https://hub.docker.com/r/selenium/node-firefox/
  image: 'selenium/node-firefox'

  ## The tag for the image
  ## ref: https://hub.docker.com/r/selenium/node-firefox/tags/
  tag: '3.14.0'

  ## Specify an imagePullPolicy
  ## ref: http://kubernetes.io/docs/user-guide/images/#pre-pulling-images
  pullPolicy: 'IfNotPresent'

  ## The number of pods in the deployment
  replicas: 1

  ## Set the JAVA_TOOL_OPTIONS environment variable
  ## If you find your selenium hub is OOMKilled, try adding -XX:+UseSerialGC
  javaOpts: '-Xmx900m'

  ## Set the SE_OPTS environment variable
  ## ref: http://www.seleniumhq.org/docs/07_selenium_grid.jsp#node-configuration
  # seOpts:

  ## Defining a JMX port will open the port on the container, however, it
  ## requires additional javaOpts, ie
  ## javaOpts: >
  ##   -Dcom.sun.management.jmxremote.port=4000
  ##   -Dcom.sun.management.jmxremote.authenticate=false
  ##   -Dcom.sun.management.jmxremote.ssl=false
  ## ref: http://openjdk.java.net/groups/jmx/
  # jmxPort: 4000

  ## Configure resource requests and limits
  ## ref: http://kubernetes.io/docs/user-guide/compute-resources/
  resources:
    limits:
      cpu: '.5'
      memory: '1000Mi'

  ## Characteristics of the browser window
  # screenWidth: 1280
  # screenHeight: 1024
  # screenDepth: 24
  # display: :10

  ## Selenium node options
  # firefoxVersion:
  # nodeMaxInstances: 1
  # nodeMaxSession: 1
  ## In milliseconds
  # nodeRegisterCycle: 5000
  # nodePort: 5555
  # timeZone: UTC

  ## NodeSelector to be used for firefox
  nodeSelector:
  #  label: value

firefoxDebug:
  ## Enable the creation of a node-firefox-debug pod
  enabled: false

  ## The repository and image
  ## ref: https://hub.docker.com/r/selenium/node-firefox-debug/
  image: 'selenium/node-firefox-debug'

  ## The tag for the image
  ## ref: https://hub.docker.com/r/selenium/node-firefox-debug/tags/
  tag: '3.14.0'

  ## Specify an imagePullPolicy
  ## ref: http://kubernetes.io/docs/user-guide/images/#pre-pulling-images
  pullPolicy: 'IfNotPresent'

  ## The number of pods in the deployment
  replicas: 1

  ## Set the JAVA_TOOL_OPTIONS environment variable
  ## If you find your selenium hub is OOMKilled, try adding -XX:+UseSerialGC
  javaOpts: '-Xmx900m'

  ## Set the SE_OPTS environment variable
  ## ref: http://www.seleniumhq.org/docs/07_selenium_grid.jsp#node-configuration
  # seOpts:

  ## Defining a JMX port will open the port on the container, however, it
  ## requires additional javaOpts, ie
  ## javaOpts: >
  ##   -Dcom.sun.management.jmxremote.port=4000
  ##   -Dcom.sun.management.jmxremote.authenticate=false
  ##   -Dcom.sun.management.jmxremote.ssl=false
  ## ref: http://openjdk.java.net/groups/jmx/
  # jmxPort: 4000

  ## Configure resource requests and limits
  ## ref: http://kubernetes.io/docs/user-guide/compute-resources/
  resources:
    limits:
      cpu: '.5'
      memory: '1500Mi'

  ## Characteristics of the browser window
  # screenWidth: 1280
  # screenHeight: 1024
  # screenDepth: 24
  # display: :10

  ## Selenium node options
  # firefoxVersion:
  # nodeMaxInstances: 1
  # nodeMaxSession: 1
  ## In milliseconds
  # nodeRegisterCycle: 5000
  # nodePort: 5555
  # timeZone: UTC

  ## NodeSelector to be used for firefoxDebug
  nodeSelector:
  #  label: value
```

</details>

---

# Selenium

## TL;DR;

```console
$ helm install stable/selenium
```

## Introduction

This chart bootstraps a [Selenium](http://www.seleniumhq.org/) deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.5+ with Beta APIs enabled

## Installing the Chart

To install the chart with the release name `my-release`:

```console
$ helm install --name my-release stable/selenium
```

The command deploys Selenium on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```console
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the Selenium chart and their default values.

| Parameter                           | Description                                                                                                      | Default                                             |
| ----------------------------------- | ---------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| `global.nodeselector`               | Node label to be useed globally for scheduling of all images                                                     | `nil`                                               |
| `hub.image`                         | The selenium hub image                                                                                           | `selenium/hub`                                      |
| `hub.tag`                           | The selenium hub image tag                                                                                       | `3.14.0`                                            |
| `hub.pullPolicy`                    | The pull policy for the hub image                                                                                | `IfNotPresent`                                      |
| `hub.port`                          | The port the hub listens on                                                                                      | `4444`                                              |
| `hub.javaOpts`                      | The java options for the selenium hub JVM, default sets the maximum heap size to 1,000 mb                        | `-Xmx1000m`                                         |
| `hub.resources`                     | The resources for the hub container, defaults to minimum half a cpu and maximum 1,000 mb RAM                     | `{"limits":{"cpu":".5", "memory":"1000Mi"}}`        |
| `hub.serviceType`                   | The Service type                                                                                                 | `NodePort`                                          |
| `hub.serviceLoadBalancerIP`         | The Public IP for the Load Balancer                                                                              | `nil`                                               |
| `hub.serviceSessionAffinity`        | The session affinity for the hub service                                                                         | `None`                                              |
| `hub.gridNewSessionWaitTimeout`     |                                                                                                                  | `nil`                                               |
| `hub.gridJettyMaxThreads`           |                                                                                                                  | `nil`                                               |
| `hub.gridNodePolling`               |                                                                                                                  | `nil`                                               |
| `hub.gridCleanUpCycle`              |                                                                                                                  | `nil`                                               |
| `hub.gridTimeout`                   |                                                                                                                  | `nil`                                               |
| `hub.gridBrowserTimeout`            |                                                                                                                  | `nil`                                               |
| `hub.gridMaxSession`                |                                                                                                                  | `nil`                                               |
| `hub.gridUnregisterIfStillDownAfer` |                                                                                                                  | `nil`                                               |
| `hub.seOpts`                        | Command line arguments to pass to hub                                                                            | `nil`                                               |
| `hub.timeZone`                      | The time zone for the container                                                                                  | `nil`                                               |
| `hub.nodeselector`                  | Node label to use for scheduling of the hub if set this takes precedence over the global value                   | `nil`                                               |
| `chrome.enabled`                    | Schedule a chrome node pod                                                                                       | `false`                                             |
| `chrome.image`                      | The selenium node chrome image                                                                                   | `selenium/node-chrome`                              |
| `chrome.tag`                        | The selenium node chrome tag                                                                                     | `3.14.0`                                            |
| `chrome.pullPolicy`                 | The pull policy for the node chrome image                                                                        | `IfNotPresent`                                      |
| `chrome.replicas`                   | The number of selenium node chrome pods                                                                          | `1`                                                 |
| `chrome.javaOpts`                   | The java options for the selenium node chrome JVM, default sets the maximum heap size to 900 mb                  | `-Xmx900m`                                          |
| `chrome.volumeMounts`               | Additional volumes to mount, the default provides a larger shared memory                                         | `[{"mountPath":"/dev/shm", "name":"dshm"}]`         |
| `chrome.volumes`                    | Additional volumes import, the default provides a larger shared memory                                           | `[{"name":"dshm", "emptyDir":{"medium":"Memory"}}]` |
| `chrome.resources`                  | The resources for the node chrome container, defaults to minimum half a cpu and maximum 1,000 mb                 | `{"limits":{"cpu":".5", "memory":"1000Mi"}}`        |
| `chrome.screenWidth`                |                                                                                                                  | `nil`                                               |
| `chrome.screenHeight`               |                                                                                                                  | `nil`                                               |
| `chrome.screenDepth`                |                                                                                                                  | `nil`                                               |
| `chrome.display`                    | The vnc display                                                                                                  | `nil`                                               |
| `chrome.chromeVersion`              | The version of chrome to use                                                                                     | `nil`                                               |
| `chrome.nodeMaxInstances`           | The maximum number of browser instances                                                                          | `nil`                                               |
| `chrome.nodeMaxSession`             | The maximum number of sessions                                                                                   | `nil`                                               |
| `chrome.nodeRegistryCycle`          | The number of milliseconds to wait, registering a node                                                           | `nil`                                               |
| `chrome.nodePort`                   | The port to listen on                                                                                            | `nil`                                               |
| `chrome.seOpts`                     | Command line arguments to pass to node                                                                           | `nil`                                               |
| `chrome.timeZone`                   | The time zone for the container                                                                                  | `nil`                                               |
| `chrome.nodeselector`               | Node label to use for scheduling of chrome images if set this takes precedence over the global value             | `nil`                                               |
| `chromeDebug.enabled`               | Schedule a selenium node chrome debug pod                                                                        | `false`                                             |
| `chromeDebug.image`                 | The selenium node chrome debug image                                                                             | `selenium/node-chrome-debug`                        |
| `chromeDebug.tag`                   | The selenium node chrome debug tag                                                                               | `3.14.0`                                            |
| `chromeDebug.pullPolicy`            | The selenium node chrome debug pull policy                                                                       | `IfNotPresent`                                      |
| `chromeDebug.replicas`              | The number of selenium node chrome debug pods                                                                    | `1`                                                 |
| `chromeDebug.javaOpts`              | The java options for a selenium node chrome debug JVM, default sets the max heap size to 900 mb                  | `-Xmx900m`                                          |
| `chromeDebug.volumeMounts`          | Additional volumes to mount, the default provides a larger shared                                                | `[{"mountPath":"/dev/shm", "name":"dshm"}]`         |
| `chromeDebug.volumes`               | Additional volumes import, the default provides a larger shared                                                  | `[{"name":"dshm", "emptyDir":{"medium":"Memory"}}]` |
| `chromeDebug.resources`             | The resources for the hub container, defaults to minimum half a cpu and maximum 1,000 mb                         | `{"limits":{"cpu":".5", "memory":"1000Mi"}}`        |
| `chromeDebug.screenWidth`           |                                                                                                                  | `nil`                                               |
| `chromeDebug.screenHeight`          |                                                                                                                  | `nil`                                               |
| `chromeDebug.screenDepth`           |                                                                                                                  | `nil`                                               |
| `chromeDebug.display`               | The vnc display                                                                                                  | `nil`                                               |
| `chromeDebug.chromeVersion`         | The version of chrome to use                                                                                     | `nil`                                               |
| `chromeDebug.nodeMaxInstances`      | The maximum number of browser instances                                                                          | `nil`                                               |
| `chromeDebug.nodeMaxSession`        | The maximum number of sessions                                                                                   | `nil`                                               |
| `chromeDebug.nodeRegistryCycle`     | The number of milliseconds to wait, registering a node                                                           | `nil`                                               |
| `chromeDebug.nodePort`              | The port to listen on                                                                                            | `nil`                                               |
| `chromeDebug.seOpts`                | Command line arguments to pass to node                                                                           | `nil`                                               |
| `chromeDebug.timeZone`              | The time zone for the container                                                                                  | `nil`                                               |
| `chromeDebug.nodeselector`          | Node label to use for scheduling of chromeDebug images if set this takes precedence over the global value        | `nil`                                               |
| `firefox.enabled`                   | Schedule a selenium node firefox pod                                                                             | `false`                                             |
| `firefox.image`                     | The selenium node firefox image                                                                                  | `selenium/node-firefox`                             |
| `firefox.tag`                       | The selenium node firefox tag                                                                                    | `3.14.0`                                            |
| `firefox.pullPolicy`                | The selenium node firefox pull policy                                                                            | `IfNotPresent`                                      |
| `firefox.replicas`                  | The number of selenium node firefox pods                                                                         | `1`                                                 |
| `firefox.javaOpts`                  | The java options for a selenium node firefox JVM, default sets the max heap size to 900 mb                       | `-Xmx900m`                                          |
| `firefox.resources`                 | The resources for the hub container, defaults to minimum half a cpu and maximum 1,000 mb                         | `{"limits":{"cpu":".5", "memory":"1000Mi"}}`        |
| `firefox.screenWidth`               |                                                                                                                  | `nil`                                               |
| `firefox.screenHeight`              |                                                                                                                  | `nil`                                               |
| `firefox.screenDepth`               |                                                                                                                  | `nil`                                               |
| `firefox.display`                   | The vnc display                                                                                                  | `nil`                                               |
| `firefox.firefoxVersion`            | The version of firefox to use                                                                                    | `nil`                                               |
| `firefox.nodeMaxInstances`          | The maximum number of browser instances                                                                          | `nil`                                               |
| `firefox.nodeMaxSession`            | The maximum number of sessions                                                                                   | `nil`                                               |
| `firefox.nodeRegistryCycle`         | The number of milliseconds to wait, registering a node                                                           | `nil`                                               |
| `firefox.nodePort`                  | The port to listen on                                                                                            | `nil`                                               |
| `firefox.seOpts`                    | Command line arguments to pass to node                                                                           | `nil`                                               |
| `firefox.timeZone`                  | The time zone for the container                                                                                  | `nil`                                               |
| `firefox.nodeselector`              | Node label to use for scheduling of firefox images if set this takes precedence over the global value            | `nil`                                               |
| `firefoxDebug.enabled`              | Schedule a selenium node firefox debug pod                                                                       | `false`                                             |
| `firefoxDebug.image`                | The selenium node firefox debug image                                                                            | `selenium/node-firefox-debug`                       |
| `firefoxDebug.tag`                  | The selenium node firefox debug tag                                                                              | `3.14.0`                                            |
| `firefoxDebug.pullPolicy`           | The selenium node firefox debug pull policy                                                                      | `IfNotPresent`                                      |
| `firefoxDebug.replicas`             | The numer of selenium node firefox debug pods                                                                    | `1`                                                 |
| `firefoxDebug.javaOpts`             | The java options for a selenium node firefox debug JVM, default sets the max heap size to 900 mb                 | `-Xmx900m`                                          |
| `firefoxDebug.resources`            | The resources for the selenium node firefox debug container, defaults to minimum half a cpu and maximum 1,000 mb | `{"limits":{"cpu":".5", "memory":"1000Mi"}}`        |
| `firefoxDebug.screenWidth`          |                                                                                                                  | `nil`                                               |
| `firefoxDebug.screenHeight`         |                                                                                                                  | `nil`                                               |
| `firefoxDebug.screenDepth`          |                                                                                                                  | `nil`                                               |
| `firefoxDebug.display`              | The vnc display                                                                                                  | `nil`                                               |
| `firefoxDebug.firefoxVersion`       | The version of firefox to use                                                                                    | `nil`                                               |
| `firefoxDebug.nodeMaxInstances`     | The maximum number of browser instances                                                                          | `nil`                                               |
| `firefoxDebug.nodeMaxSession`       | The maximum number of sessions                                                                                   | `nil`                                               |
| `firefoxDebug.nodeRegistryCycle`    | The number of milliseconds to wait, registering a node                                                           | `nil`                                               |
| `firefoxDebug.nodePort`             | The port to listen on                                                                                            | `nil`                                               |
| `firefoxDebug.seOpts`               | Command line arguments to pass to node                                                                           | `nil`                                               |
| `firefoxDebug.timeZone`             | The time zone for the container                                                                                  | `nil`                                               |
| `firefoxDebug.nodeselector`         | Node label to use for scheduling of firefoxDebug images if set this takes precedence over the global value       | `nil`                                               |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```console
$ helm install --name my-release \
  --set chrome.enabled=true \
    stable/selenium
```

Alternatively, a YAML file that specifies the values for the above parameters can be provided while installing the chart. For example,

```console
$ helm install --name my-release -f values.yaml stable/selenium
```

> **Tip**: You can use the default [values.yaml](values.yaml)
