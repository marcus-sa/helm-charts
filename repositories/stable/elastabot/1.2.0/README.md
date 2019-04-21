# `@helm-charts/stable-elastabot`

A Helm chart for Elastabot - a Slack bot companion for Elasticsearch and ElastAlert

| Field               | Value     |
| ------------------- | --------- |
| Repository Name     | stable    |
| Chart Name          | elastabot |
| Chart Version       | 1.2.0     |
| NPM Package Version | 0.1.0     |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Docker image repository, tag/version and related settings
image:
  repository: jertel/elastabot
  tag: 1.1.0
  pullPolicy: IfNotPresent

# Elasticsearch settings, required.
elasticsearch:
  host: ''
  port: 9200

  # Elasticsearch connection timeout, in seconds
  timeoutSeconds: 10

  # Set sslEnabled to True to use SSL/TLS to connect to Elasticsearch
  sslEnabled: False

  # Set sslStrictEnabled to True to validate SSL/TLS certificate authenticity
  sslStrictEnabled: False

# Elastalert settings. Elastalert chart information is available here:
# https://github.com/kubernetes/charts/tree/master/stable/elastalert
elastalert:
  # Index prefix for elastalert
  index: 'elastalert'

  # How far back in time to search for recently-fired alerts, in Elasticsearch
  recentAlertMinutes: 4320

  # Default silence duration
  defaultSilenceMinutes: 240

# Emails can be sent when a user acks or triages an issue.
smtp:
  host: ''
  port: 25

  # Set secure to True to use SSL/TLS to connect to the SMTP host
  secure: False

  # Set starttls to True to switch to TLS after connecting to the SMTP host (not needed when secure: True)
  starttls: False

  # SMTP host communication timeout
  timeoutSeconds: 4

  # Where triaged SMTP emails should be sent
  to: ''

  # Address that is sending the SMTP emails
  from: ''

  # Optional prefix to prepend to each email's subject
  subjectPrefix: ''

  # Set debug to True to troubleshoot SMTP connectivity problems
  debug: False

# Typically users will interact with this bot via an exclamation point, however
# custom prefixes, such as "!prod " could be used if multiple bots will be listening to a
# single channel, but interacting with different Elasticsearch clusters
commandPrefix: '!'

# Currently only smtp is supported for initiating a triage workflow.
triageTarget: smtp

# Allow all Slack users to search the Elasticsearch cluster for any data.
# CAUTION: Disable this when this bot is exposed to a public Slack community and the cluster contains sensitive data.
searchEnabled: true

resources: {}
nodeSelector: {}
tolerations: []
affinity: {}
```

</details>

---

# Elastabot Helm Chart

[Elastabot](https://github.com/jertel/elastabot): A Slack bot companion to Elasticsearch and [ElastAlert](https://github.com/kubernetes/charts/tree/master/stable/elastalert). Current support includes searching for data, checking the cluster health, acknowledging (and silencing) alerts, and also triggering triage events, which are currently initiated via an smtp email. The emails by default will contain the alert details, but arbitrary triage requests can also be created. The triage email is best used with a ticketing system that is monitoring for such emails, such as Jira.

## Usage

More detailed information can be found at the [Elastabot](https://github.com/jertel/elastabot) project (GitHub) website. However, to get started without reading the details, Send the message `!help` to the bot, after deploying this chart.

## Installing the Chart

To install the chart with the release name `my-release`:

```console
helm install --name my-release stable/elastabot
```

The command deploys Elastabot on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation. The [secrets](#secrets) section lists the required Kubernetes secrets.

## Uninstalling the Chart

To uninstall/delete the my-release deployment:

```console
helm delete my-release --purge
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

| setting                        | description                                                                                                               | default            |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| image.repository               | Docker image repository                                                                                                   | `jertel/elastabot` |
| image.tag                      | Tag, typically the version, of the Docker image                                                                           | `1.1.0`            |
| image.pullPolicy               | Kubernetes image pull policy                                                                                              | `IfNotPresent`     |
| commandPrefix                  | Special character or phrase to trigger the bot, typically an exclamation point, !. Ex: !ack                               | `!`                |
| elasticsearch.host             | Hostname for the Elasticsearch server                                                                                     |
| elasticsearch.port             | Port for the Elasticsearch server                                                                                         | `9200`             |
| elasticsearch.sslEnabled       | If true, uses SSL/TLS to connect to Elasticsearch                                                                         | `false`            |
| elasticsearch.sslStrictEnabled | If true, the SSL/TLS certificates will be validated against known certificate authorities                                 | `false`            |
| elasticsearch.timeoutSeconds   | Number of seconds to wait for an Elasticsearch response                                                                   | `10`               |
| elasticsearch.urlPrefix        | URL prefix for Elasticsearch, typically an empty string                                                                   |
| elastalert.index               | The index prefix used by Elastalert within Elasticsearch, typically elastalert                                            | `elastalert`       |
| elastalert.silenceMinutes      | Number of minutes to silence an acknowledge alert if a silence duration is not explicitly given with the ack command.     | `240`              |
| elastalert.recentMinutes       | Number of minutes to look back through Elasticsearch indices for a matching triggered alert                               | `4320`             |
| smtp.host                      | Hostname for the SMTP server                                                                                              |
| smtp.port                      | Port for the SMTP server                                                                                                  | `25`               |
| smtp.secure                    | If true, will connect to the SMTP host over SSL/TLS                                                                       | `false`            |
| smtp.starttls                  | If true, will send the starttls command (typically not used with smtp.secure=true)                                        | `false`            |
| smtp.timeoutSeconds            | Number of seconds to wait for the SMTP server to respond                                                                  | `10`               |
| smtp.to                        | Email address that will receive the triage email                                                                          |
| smtp.from                      | Sender email address                                                                                                      |
| smtp.subjectPrefix             | If non-empty string, will be prepended to each email subject. Ex: `[prod]`, `[test]`, etc                                 |
| smtp.debug                     | If true, the SMTP connectivity details will be logged to stdout                                                           | `false`            |
| triageTarget                   | How to initiate the triage process, currently only smtp is supported.                                                     | `smtp`             |
| searchEnabled                  | Allow all Slack users to search the Elasticsearch cluster for any data. Disable in public communities with sensitive data | `true`             |

## Secrets

| variable              | required | description                                                                        |
| --------------------- | -------- | ---------------------------------------------------------------------------------- |
| slackBotToken         | true     | The Slack-generated bot token, provided by slack.com                               |
| elasticsearchUsername | true     | Elasticsearch username, provided by your ES admin                                  |
| elasticsearchPassword | true     | Elasticsearch password, provided by your ES admin                                  |
| smtpUsername          | false    | Optional SMTP username, provided by your SMTP admin (used with SMTP triage target) |
| smtpPassword          | false    | Optional SMTP password, provided by your SMTP admin (used with SMTP triage target) |

Below is a sample secrets.yaml file that can be used as a template. Remember that all secrets must be base64-encoded.

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: elastabot-secrets
type: Opaque
data:
  slackBotToken: ''
  elasticsearchUsername: ''
  elasticsearchPassword: ''
  smtpUsername: ''
  smtpPassword: ''
```

Once you have provided the base64-encoded secret values, apply the file to your Kubernetes cluster as follows:

```console
kubectl apply -f secrets.yaml
```
