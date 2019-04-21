# `@helm-charts/reactiveops-stable-aws-iam-authenticator`

Install and configure aws-iam-authenticator on your cluster.

| Field               | Value                 |
| ------------------- | --------------------- |
| Repository Name     | reactiveops-stable    |
| Chart Name          | aws-iam-authenticator |
| Chart Version       | v1.1.1                |
| NPM Package Version | 0.1.0                 |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for aws-iam-authenticator.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.

volumes:
  output:
    mountPath: /etc/kubernetes/aws-iam-authenticator/
    hostPath: /srv/kubernetes/aws-iam-authenticator/
  state:
    mountPath: /var/aws-iam-authenticator/
    hostPath: /srv/kubernetes/aws-iam-authenticator/
  config:
    mountPath: /etc/aws-iam-authenticator/
## Use this to specify the entire configmap as an override if you don't want the default templated configmap.  Allows for more advanced configuration

# configMap:
#   clusterID: my-dev-cluster.example.com
#   defaultRole: arn:aws:iam::000000000000:role/KubernetesAdmin
#   server:
#     ec2DescribeInstancesRoleARN: arn:aws:iam::000000000000:role/DescribeInstancesRole
#     mapRoles:
#     - roleARN: arn:aws:iam::000000000000:role/KubernetesAdmin
#       username: kubernetes-admin
#       groups:
#       - system:masters
#     - roleARN: arn:aws:iam::000000000000:role/KubernetesNode
#       username: aws:{{AccountID}}:instance:{{SessionName}}
#       groups:
#       - system:bootstrappers
#       - aws:instances
#     - roleARN: arn:aws:iam::000000000000:role/KubernetesNode
#       username: system:node:{{EC2PrivateDNSName}}
#       groups:
#       - system:nodes
#       - system:bootstrappers
#     - roleARN: arn:aws:iam::000000000000:role/KubernetesAdmin
#       username: admin:{{SessionName}}
#       groups:
#       - system:masters
#     mapUsers:
#     - userARN: arn:aws:iam::000000000000:user/Alice
#       username: alice
#       groups:
#       - system:masters
#     mapAccounts:
#     - "012345678901"
#     - "456789012345"
```

</details>

---

# aws-iam-authenticator

Runs the AWS Iam Authenticator as a daemonset on master nodes in order to authenticate your users with AWS IAM. This requires additional setup on your cluster to work. See the [docs](https://github.com/kubernetes-sigs/aws-iam-authenticator) for more information.

## Configuration

### Configuration

Please change the values.yaml according to your setup

| Parameter                  | Description                                       | Default                                  | Required |
| -------------------------- | ------------------------------------------------- | ---------------------------------------- | -------- |
| `configMap`                | The configmap that the authenticator will use.    | see [values.yaml](values.yaml)           | no       |
| `volumes.output.mountPath` | Place to mount the host dir for output.           | `/etc/kubernetes/aws-iam-authenticator/` | yes      |
| `volumes.output.hostPath`  | Place on the host that the output files will live | `/srv/kubernetes/aws-iam-authenticator/` | yes      |
| `volumes.state.mountPath`  | Place to mount the host dir for state.            | `/var/aws-iam-authenticator/`            | yes      |
| `volumes.state.hostPath`   | Place on the host that the state lives.           | `/srv/kubernetes/aws-iam-authenticator/` | yes      |
| `config.mountPath`         | Where to mount the config                         | `/etc/aws-iam-authenticator/`            | yes      |
