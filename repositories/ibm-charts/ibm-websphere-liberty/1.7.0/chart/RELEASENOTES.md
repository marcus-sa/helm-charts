# What’s new...

## Latest: Chart Version 1.7.0

1. Added more configurable parameters to values.yaml, such as environment variables and ingress annotations.

## Breaking Changes

- None

## Fixes

- None

## Prerequisites

- Tiller v2.7.0
- For all others, refer to prerequisites in README.md

## Documentation

Please refer to README.md.

## Known Issues

1. Upgrade from all versions except v1.0.0 is supported.
1. Upgrade from 1.4.0 to 1.5.0 is supported. However, rollback from 1.5.0 to 1.4.0 is not.
1. If upgrading using the ICP console from earlier chart releases, you must re-specify all custom configuration values you specified in the previous deployment.  Otherwise only default values are applied to the upgrade.
1. If your application uses IIOP, you must remove the iiopEndpoint configuration from your server.xml before building the Docker image you intend to deploy via this Helm chart. Failure to do so will prevent port values you specify through this Helm chart from overriding those specified in your server.xml.
1. If your deployment enables IIOP and/or JMS endpoints, they will be erroneously displayed in the Launch button dropdown on the Helm Releases page of the ICP console. The Launch button only works with HTTP/S endpoints, so launching IIOP or JMS endpoints obviously will result in errors.
1. If use enable ingress during deployment _and_ specify a host value, the Launch button will return error 404.
1. If deploying to the IBM Kubernetes Service on the IBM Public Cloud, you can only create one ingress resource per host.
1. The createClusterSSLConfiguration option is not supported on z/Linux. To use the useClusterSSLConfiguration option for a deployment targeting z/Linux, you must first do a deployment on a non-z/Linux node in the same cluster, specifying the createClusterSSLConfiguration option in order to establish the cluster-scope SSL configuration.

## Limitations

The chart does not yet provide an out of the box secure configuration for the /metrics endpoint.  The /metrics endpoint is served only via HTTP without authentication since prometheus in IBM Cloud Private is not able to scrape secured endpoints at this time.

## Version History

| Chart | Date          | IBM Cloud Private Supported | Details                      |
| ----- | ------------- | --------------------------- | ---------------------------- |
| 1.7.0 | Nov 22, 2018  | >=2.1.0.2  |  Added support for more configurable parameters.
| 1.6.0 | Sep 28, 2018  | >=2.1.0.2  |  Added support to serve `/metrics` on HTTP port; New and updated Grafana and Kibana dashboards; IBM Certified Cloud Pak manifest     |
| 1.5.1 | AUG 22, 2018  | >=2.1.0.2  |  Added metering annotations                          |
| 1.5.0 | Jul 11, 2018  | >=2.1.0.2  |  Hazelcast session caching; Host support for Ingress configuration; Protocol support for IIOP and JMS; Multi-architecture support  |
| 1.4.0 | Mar 20, 2018  | >=2.1.0.1  |  Added support for optional JSON format logging    |
| 1.3.0 | Feb 13, 2018  | >=2.1.0.1  |  Added metadata to all the values; Added the ability to persist regular logs   |
| 1.2.0 | Feb 13, 2018  | >=2.1.0.1  |  Enhanced transactional persistence support          |
| 1.1.0 | Dec 10, 2017  | >=2.1.0    |  Added SSL, MP Health and zLinux support             |
| 1.0.1 | Dec 10, 2017  | >=2.1.0    |  Small bug fixes                                     |
| 1.0.0 | Dec 10, 2017  | >=2.1.0    |  Initial release; Supports auto-scaling, ingress and persistence logs |
