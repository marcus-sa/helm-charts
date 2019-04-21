{{- /*
`"sch.affinity.nodeAffinity"` constrain your pod to only be able to run on particular nodes
based on specified rules. Specify one or both of nodeAffinityRequiredDuringScheduling and
nodeAffinityPreferredDuringScheduling to set your node affinity.

For more information, see https://kubernetes.io/docs/concepts/configuration/assign-pod-node/

Note: the 'key' parameter in the config values map is optional and will default to 'beta.kubernetes.io/arch'
if not specified.


__Config Values Used:__
- passed as argument

__Parameters input as an list of values:__
- the root context (required)
- config values map of annotations (required)

__Usage:__
example chart config values. See _config.tpl for the default values if you do not define sch.chart.nodeAffinity
```
{{- define "sch.chart.nodeAffinity" -}}
sch:
  chart:
    nodeAffinity:
      nodeAffinityRequiredDuringScheduling:
        key: beta.kubernetes.io/arch
        operator: In
        values:
          - amd64
          - ppc64le
          - s390x
      nodeAffinityPreferredDuringScheduling
        amd64:
          key: beta.kubernetes.io/arch
          operator: In
          weight: 3
{{- end -}}
```
used in template as follows:
```
      annotations:
{{- include "sch.affinity.nodeAffinity" (list .) | indent 8 }}
```
{{/* affinity - https://kubernetes.io/docs/concepts/configuration/assign-pod-node/ */}}
*/}}

{{- define "sch.affinity.nodeAffinity" -}}
  {{- $params := . }}
  {{- $root := first $params }}
  {{- $defaultRoot := fromYaml (include "sch.chart.default.config.values" .) }}
  {{- $defaultNodeAffinity := $defaultRoot.sch.chart.nodeAffinity }}
  {{- $nodeAffinity := $root.sch.chart.nodeAffinity | default $defaultNodeAffinity }}
nodeAffinity:
  {{- if (gt (len $nodeAffinity) 0) -}}
    {{- if (hasKey $nodeAffinity "nodeAffinityRequiredDuringScheduling") }}
  {{ include "sch.affinity.nodeAffinityRequiredDuringScheduling" $nodeAffinity.nodeAffinityRequiredDuringScheduling }}
    {{- end }}
    {{- if hasKey $nodeAffinity "nodeAffinityPreferredDuringScheduling" }}
  {{ include "sch.affinity.nodeAffinityPreferredDuringScheduling" $nodeAffinity.nodeAffinityPreferredDuringScheduling }}
    {{- end }}
  {{- end }}
{{- end }}

{{- define "sch.affinity.nodeAffinityRequiredDuringScheduling" -}}
    {{- $params := . -}}
    {{- $operator := $params.operator -}}
    {{- $values := $params.values -}}
requiredDuringSchedulingIgnoredDuringExecution:
    nodeSelectorTerms:
    - matchExpressions:
      - key: {{ default "beta.kubernetes.io/arch" $params.key }}
        operator: {{ $operator }}
        values:
    {{- range $key := $values }}
        - {{ $key }}
    {{- end -}}
{{- end }}

{{- define "sch.affinity.nodeAffinityPreferredDuringScheduling" -}}
  {{- $params := . -}}
preferredDuringSchedulingIgnoredDuringExecution:
  {{ range $key, $value := $params -}}
    {{- $weight := $value.weight | int64 -}}
    {{- $operator := $value.operator -}}
  - weight: {{ $weight }}
    preference:
      matchExpressions:
      - key: {{ default "beta.kubernetes.io/arch" $value.key }}
        operator: {{ $operator }}
        values:
        - {{ $key }}
  {{ end -}}
{{- end }}
