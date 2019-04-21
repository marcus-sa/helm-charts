# @helm-charts

![status: alpha](https://badgen.net/badge/status/alpha/red)
[![CircleCI](https://badgen.net/circleci/github/k8ts/helm-charts)](https://circleci.com/gh/k8ts/helm-charts)
[![npm](https://badgen.net/badge/npm/@helm-charts/blue)](https://npmjs.com/org/helm-charts)

**Status:** Alpha (breaking changes expected)

This repository re-publishes Helm repositories to npm, packaged as JavaScript / TypeScript packages. In addition to providing a distribution mechanism for installing charts, it adds the following features:

- Static typing for chart values (currently auto-detected)
- Using the Node module resolution algorithm to find charts and dependencies
- Using a package manager like Yarn to install Helm dependencies

Future improvements include:

- Manual override types to augment auto-detected types (to narrow from any to specific types)
- Automatic detection of documentation comments (to include next to generated types)
- Integration with the rest of the K8TS ecosystem to allow for importing Helm charts as TypeScript packages

This repository is part of the [K8TS](https://github.com/k8ts) ecosystem of projects, which are designed to provide TypeScript-based tooling for interacting with Kubernetes.

**Table of Contents**

- [Usage](#usage)
  - [Note on Versions](#note-on-versions)
- [Repositories](#repositories)
- [Contributing](#contributing)
- [License](#license)

## Usage

You can `yarn add` particular charts to download them to your projects:

```bash
$ yarn add @helm-charts/stable-nginx-ingress
```

You can also `yarn add` specific versions:

```bash
$ yarn add @helm-charts/stable-nginx-ingress@^1.4.0-0.1.0
```

You can access the auto-generated TypeScript types for the chart values YAML via an import:

```typescript
import {ChartValues} from '@helm-charts/stable-nginx-ingress'

const values: ChartValues = {...}
```

### Note on Versions

The version of any of the TypeScript packages is a compound version, comprised of the Helm chart version followed by the K8TS library version. For instance, for the `nginx-ingress` chart, if you wished to install version `1.4.0` of the Helm chart and version `0.1.0` of K8TS, you would install version `1.4.0-0.1.0`.

**NOTE:** K8TS follows [semver](https://semver.org), meaning that the version number after the dash represents updates to the K8TS library, and may potentially affect your TypeScript/JavaScript using those charts. However, NPM and Yarn will **not** follow semver semantics when suggesting upgrades to this package, since they only apply those checks to what comes _before_ the dash. You will need to be careful with upgrades, making note of whether or not the K8TS library version has been upgraded with breaking changes.

With each release of K8TS, it should publish every version of each Helm chart under the new K8TS version, meaning if you are using `1.2.3-a.a.a` of a chart and K8TS releases `b.b.b`, you should be able to upgrade to `1.2.3-b.b.b`, even if there's a newer Helm chart version.

## Repositories

The list of repositories used to generate the Helm charts is pulled from the [Helm Hub](https://hub.helm.sh/), specifically [`repo-values.yaml`](https://github.com/helm/hub/blob/master/config/repo-values.yaml).

## Contributing

Issues and pull requests are welcome!

## License

K8TS code is licensed as MIT, see `LICENSE`. Charts are licensed by their original authors, see each chart's source.
