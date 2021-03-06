{{/* vim: set filetype=mustache: */}}

{{/*
###############################################################################
# Licensed Materials - Property of IBM.
# Copyright IBM Corporation 2019. All Rights Reserved.
# U.S. Government Users Restricted Rights - Use, duplication or disclosure
# restricted by GSA ADP Schedule Contract with IBM Corp.
#
# Contributors:
#  IBM Corporation
###############################################################################
*/}}


{{- /*
Chart specific config file for SCH (Shared Configurable Helpers)

_sch-chart-config.tpl is a config file for the chart to specify additionalÂ 
values and/or override values defined in the sch/_config.tpl file.
*/ -}}

{{- define "isamruntime.sch.chart.config.values" -}}
sch:
  chart:
    appName: "isamruntime"
    config:
      servicename: "isamrt"
      adminservicename: "isamrt-admin"
    metering:
      productName: "IBM Security Access Manager"
      productID: "5725-V90"
      productVersion: "9.0.6.0"
    nodeAffinity:
      nodeAffinityRequiredDuringScheduling:
        operator: In
        values:
        - amd64
{{- end -}}

