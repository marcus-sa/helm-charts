# `@helm-charts/banzaicloud-stable-szpeter-test`

SzPeter's test chart

| Field               | Value              |
| ------------------- | ------------------ |
| Repository Name     | banzaicloud-stable |
| Chart Name          | szpeter-test       |
| Chart Version       | 0.0.1              |
| NPM Package Version | 0.1.0              |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# S3 Bucket name exp: my-logging-01
bucketName: ''

# S3 bucket region
region: 'us-west-1'

secret:
  # Kubernetes secret  name of amazon credentials.
  # Use existing secret, If empty it will be created.
  secretName: ''

  # Amazon Access Key Name
  awsAccessKey: AWS_ACCESS_KEY_ID
  # Amazon Access Key
  awsAccessValue: ''

  # Amazon Secret Key Name
  awsSecretKey: AWS_SECRET_ACCESS_KEY
  # Amazon Secret Key
  awsSecretValue: ''
```

</details>
