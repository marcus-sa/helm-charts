{{- define "pnnlmiscscripts.ipmitool.server" -}}
{{- if and (hasKey . "section") (kindIs "bool" .section) (hasKey .section "server") .section.server -}}
{{ .section.server }}
{{- else -}}
docker.io
{{- end -}}
{{- end -}}

{{- define "pnnlmiscscripts.ipmitool.prefix" -}}
{{- if and (hasKey . "section") (hasKey .section "prefix") .section.prefix -}}
/{{ .section.prefix }}
{{- end -}}
{{- end -}}

{{- define "pnnlmiscscripts.ipmitool.org" -}}
{{- if and (hasKey . "section") (hasKey .section "org") .section.org -}}
{{ .section.org }}
{{- else -}}
pnnlmiscscripts
{{- end -}}
{{- end -}}

{{- define "pnnlmiscscripts.ipmitool.repo" -}}
{{- if and (hasKey . "section") (hasKey .section "repo") .section.repo -}}
{{ .section.repo }}
{{- else -}}
ipmitool
{{- end -}}
{{- end -}}

{{- define "pnnlmiscscripts.ipmitool.tag" -}}
{{- if and (hasKey . "section") (hasKey .section "tag") .section.tag -}}
{{ .section.tag }}
{{- else -}}
1.8.18-3
{{- end -}}
{{- end -}}

{/*
How to use:
  {{ dict "dot" . "section" .Values.ipmitool | include "pnnlmiscscripts.ipmitool.image" }}
*/}}
{{- define "pnnlmiscscripts.ipmitool.image" -}}
{{- include "pnnlmiscscripts.ipmitool.server" . -}}{{- include "pnnlmiscscripts.ipmitool.prefix" . -}}/{{- include "pnnlmiscscripts.ipmitool.org" . -}}/{{- include "pnnlmiscscripts.ipmitool.repo" . -}}:{{- include "pnnlmiscscripts.ipmitool.tag" . -}}
{{- end -}}
