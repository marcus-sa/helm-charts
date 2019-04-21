# `@helm-charts/kanister-profile`

A helm chart to create profile custom resource for kanister

| Field               | Value    |
| ------------------- | -------- |
| Repository Name     | kanister |
| Chart Name          | profile  |
| Chart Version       | 0.8.0    |
| NPM Package Version | 0.1.0    |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for kanister-profile.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.
defaultProfile: true
defaultProfileName: default-profile
profileName:
# s3 properties
s3:
  bucket:
  endpoint:
  prefix:
  region:
  accessKey:
  secretKey:
verifySSL: true
```

</details>
