# @helm-charts

This repository re-publishes Helm repositories to npm, packaged as JavaScript / TypeScript packages. In addition to providing a distribution mechanism for installing charts, it adds the following features:

- Static typing for chart values (currently auto-detected)
- Using the Node module resolution algorithm to find charts and dependencies
- Using a package manager like Yarn to install Helm dependencies

Future improvements include:

- Manual override types to augment auto-detected types (to narrow from any to specific types)
- Automatic detection of documentation comments (to include next to generated types)
- Integration with the rest of the K8TS ecosystem to allow for importing Helm charts as TypeScript packages
