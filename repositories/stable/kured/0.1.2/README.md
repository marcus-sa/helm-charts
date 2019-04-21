# `@helm-charts/stable-kured`

A Helm chart for kured

| Field               | Value  |
| ------------------- | ------ |
| Repository Name     | stable |
| Chart Name          | kured  |
| Chart Version       | 0.1.2  |
| NPM Package Version | 0.1.0  |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
image:
  repository: quay.io/weaveworks/kured
  # Appears to be without numbered numbered tags, so using this instead
  tag: 1.1.0
  pullPolicy: IfNotPresent

extraArgs: {}

rbac:
  create: true

serviceAccount:
  create: true
  name:

updateStrategy: OnDelete

tolerations:
  - key: node-role.kubernetes.io/master
    effect: NoSchedule

podAnnotations: {}
```

</details>

---

# Kured (KUbernetes REboot Daemon)

See https://github.com/weaveworks/kured

| Config                  | Description                                                                 | Default                                                               |
| ----------------------- | --------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| `image.repository`      | Image repository                                                            | `quay.io/weaveworks/kured`                                            |
| `image.tag`             | Image tag                                                                   | `master-c42fff3`                                                      |
| `image.pullPolicy`      | Image pull policy                                                           | `IfNotPresent`                                                        |
| `extraArgs`             | Extra arguments to pass to `/usr/bin/kured`. See below.                     | `{}`                                                                  |
| `rbac.create`           | Create RBAC roles                                                           | `true`                                                                |
| `serviceAccount.create` | Create service account roles                                                | `true`                                                                |
| `serviceAccount.name`   | Service account name to create (or use if `serviceAccount.create` is false) | (chart fullname)                                                      |
| `updateStrategy`        | Daemonset update strategy                                                   | `OnDelete`                                                            |
| `tolerations`           | Tolerations to apply to the daemonset (eg to allow running on master)       | `[{"key": "node-role.kubernetes.io/master", "effect": "NoSchedule"}]` |
| `podAnnotations`        | Annotations to apply to pods (eg to add Prometheus annotations)             | `{}`                                                                  |

See https://github.com/weaveworks/kured#configuration for values for `extraArgs`. Note that

```yaml
extraArgs:
  foo: 1
  bar-baz: 2
```

becomes `/usr/bin/kured ... --foo=1 --bar-baz=2`.
