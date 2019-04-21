# `@helm-charts/incubator-riemann`

Riemann monitors distributed systems. Riemann aggregates events from your servers and applications with a powerful stream processing language.

| Field               | Value     |
| ------------------- | --------- |
| Repository Name     | incubator |
| Chart Name          | riemann   |
| Chart Version       | 0.1.0     |
| NPM Package Version | 0.1.0     |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# replicaCount is expected to be 1 right now. Riemann
# does not support horizontal scaling out of the box.
replicaCount: 1
image:
  repository: raykrueger/riemann
  tag: 0.2.14
  pullPolicy: IfNotPresent
service:
  type: ClusterIP
  ports:
    udp: 5555
    tcp: 5555
    websocket: 5556
resources: {}
# This is close to the default config. It has been modified to log to console.
# Customize as needed, just make sure you indent correctly.
riemann:
  config: |
    ;Init Logging
    (logging/init {:console true})

    ; Listen on the local interface over TCP (5555), UDP (5555), and websockets
    ; (5556)
    (let [host "0.0.0.0"]
      (tcp-server {:host host})
      (udp-server {:host host})
      (ws-server  {:host host}))

    ; Expire old events from the index every 5 seconds.
    (periodically-expire 5 {:keep-keys [:host :service :tags]})

    (let [index (index)]
      ; Inbound events will be passed to these streams:
      (streams
        (default :ttl 60
          ; Index all events immediately.
          index
          #(info %)
    )))
```

</details>

---

# Riemann Helm Chart

Riemann is an event stream processor for monitoring distributed systems. The
heart of Riemann is in it's clojure based stream configurations. Read more about Riemann at [http://riemann.io/](http://riemann.io/).

Riemann was created by [Kyle Kingsbury](https://github.com/aphyr) with help
from many others.

## Install

    helm repo add incubator http://storage.googleapis.com/kubernetes-charts-incubator
    helm install incubator/riemann

## Configuration

The following configurations may be set. It is recommended to use values.yaml for overwriting the Riemann config.

| Parameter               | Description                                                      | Default                                                            |
| ----------------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------ |
| replicaCount            | How many replicas to run. Riemann can really only work with one. | 1                                                                  |
| image.repository        | Name of the image to run, without the tag.                       | [raykrueger/riemann](https://github.com/raykrueger/riemann-docker) |
| image.tag               | The image tag to use.                                            | 0.2.14                                                             |
| image.pullPolicy        | The kubernetes image pull policy.                                | IfNotPresent                                                       |
| service.type            | The kubernetes service type to use.                              | ClusterIP                                                          |
| service.ports.udp       | The udp port the servie should listen on.                        | 5555                                                               |
| service.ports.tcp       | The tcp port the service should listen on.                       | 5555                                                               |
| service.ports.websocket | The port the service should listen on for use with websockets.   | 5556                                                               |
| resources               | Any resource constraints to apply.                               | None                                                               |
| riemann.config          | The actual configuration loaded into the Riemann application.    | (See values.yaml)                                                  |

For more information see http://riemann.io/howto.html#changing-the-config

## Logging

The riemann engine is configured, by default, to log to stdout. Also, all
events are logged to stdout as they are received. Users may want to tune this
down depending on their needs.
