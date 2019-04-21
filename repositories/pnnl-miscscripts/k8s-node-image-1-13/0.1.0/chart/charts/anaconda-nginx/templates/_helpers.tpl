{{- define "pnnlmiscscripts.anaconda-nginx.server" -}}
{{- if and (hasKey . "section") (kindIs "bool" .section) (hasKey .section "server") .section.server -}}
{{ .section.server }}
{{- else -}}
docker.io
{{- end -}}
{{- end -}}

{{- define "pnnlmiscscripts.anaconda-nginx.prefix" -}}
{{- if and (hasKey . "section") (hasKey .section "prefix") .section.prefix -}}
/{{ .section.prefix }}
{{- end -}}
{{- end -}}

{{- define "pnnlmiscscripts.anaconda-nginx.org" -}}
{{- if and (hasKey . "section") (hasKey .section "org") .section.org -}}
{{ .section.org }}
{{- else -}}
pnnlmiscscripts
{{- end -}}
{{- end -}}

{{- define "pnnlmiscscripts.anaconda-nginx.repo" -}}
{{- if and (hasKey . "section") (hasKey .section "repo") .section.repo -}}
{{ .section.repo }}
{{- else -}}
anaconda
{{- end -}}
{{- end -}}

{{- define "pnnlmiscscripts.anaconda-nginx.tag" -}}
{{- if and (hasKey . "section") (hasKey .section "tag") .section.tag -}}
{{ .section.tag }}
{{- else -}}
20181125-1500-nginx-2
{{- end -}}
{{- end -}}

{{- /*
How to use:
  {{ dict "dot" . "section" (index .Values "anaconda-nginx") | include "pnnlmiscscripts.anaconda-nginx.image" }}
*/ -}}
{{- define "pnnlmiscscripts.anaconda-nginx.image" -}}
{{- include "pnnlmiscscripts.anaconda-nginx.server" . -}}{{- include "pnnlmiscscripts.anaconda-nginx.prefix" . -}}/{{- include "pnnlmiscscripts.anaconda-nginx.org" . -}}/{{- include "pnnlmiscscripts.anaconda-nginx.repo" . -}}:{{- include "pnnlmiscscripts.anaconda-nginx.tag" . -}}
{{- end -}}
