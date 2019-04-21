{{- define "pnnlmiscscripts.dhcpd.server" -}}
{{- if and (hasKey . "section") (kindIs "bool" .section) (hasKey .section "server") .section.server -}}
{{ .section.server }}
{{- else -}}
docker.io
{{- end -}}
{{- end -}}

{{- define "pnnlmiscscripts.dhcpd.prefix" -}}
{{- if and (hasKey . "section") (hasKey .section "prefix") .section.prefix -}}
/{{ .section.prefix }}
{{- end -}}
{{- end -}}

{{- define "pnnlmiscscripts.dhcpd.org" -}}
{{- if and (hasKey . "section") (hasKey .section "org") .section.org -}}
{{ .section.org }}
{{- else -}}
pnnlmiscscripts
{{- end -}}
{{- end -}}

{{- define "pnnlmiscscripts.dhcpd.repo" -}}
{{- if and (hasKey . "section") (hasKey .section "repo") .section.repo -}}
{{ .section.repo }}
{{- else -}}
dhcpd
{{- end -}}
{{- end -}}

{{- define "pnnlmiscscripts.dhcpd.tag" -}}
{{- if and (hasKey . "section") (hasKey .section "tag") .section.tag -}}
{{ .section.tag }}
{{- else -}}
4.4.1-3
{{- end -}}
{{- end -}}

{/*
How to use:
  {{ dict "dot" . "section" .Values.dhcpd | include "pnnlmiscscripts.dhcpd.image" }}
*/}}
{{- define "pnnlmiscscripts.dhcpd.image" -}}
{{- include "pnnlmiscscripts.dhcpd.server" . -}}{{- include "pnnlmiscscripts.dhcpd.prefix" . -}}/{{- include "pnnlmiscscripts.dhcpd.org" . -}}/{{- include "pnnlmiscscripts.dhcpd.repo" . -}}:{{- include "pnnlmiscscripts.dhcpd.tag" . -}}
{{- end -}}
