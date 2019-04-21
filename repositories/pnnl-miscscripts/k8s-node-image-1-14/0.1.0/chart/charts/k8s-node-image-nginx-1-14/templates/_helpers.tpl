{{- define "pnnlmiscscripts.k8s-node-image-nginx-1-14.server" -}}
{{- if and (hasKey . "section") (kindIs "bool" .section) (hasKey .section "server") .section.server -}}
{{ .section.server }}
{{- else -}}
docker.io
{{- end -}}
{{- end -}}

{{- define "pnnlmiscscripts.k8s-node-image-nginx-1-14.prefix" -}}
{{- if and (hasKey . "section") (hasKey .section "prefix") .section.prefix -}}
/{{ .section.prefix }}
{{- end -}}
{{- end -}}

{{- define "pnnlmiscscripts.k8s-node-image-nginx-1-14.org" -}}
{{- if and (hasKey . "section") (hasKey .section "org") .section.org -}}
{{ .section.org }}
{{- else -}}
pnnlmiscscripts
{{- end -}}
{{- end -}}

{{- define "pnnlmiscscripts.k8s-node-image-nginx-1-14.repo" -}}
{{- if and (hasKey . "section") (hasKey .section "repo") .section.repo -}}
{{ .section.repo }}
{{- else -}}
k8s-node-image
{{- end -}}
{{- end -}}

{{- define "pnnlmiscscripts.k8s-node-image-nginx-1-14.tag" -}}
{{- if and (hasKey . "section") (hasKey .section "tag") .section.tag -}}
{{ .section.tag }}
{{- else -}}
1.14.1-nginx-1
{{- end -}}
{{- end -}}

{{- /*
How to use:
  {{ dict "dot" . "section" (index .Values "k8s-node-image-nginx-1-14") | include "pnnlmiscscripts.k8s-node-image-nginx-1-14.image" }}
*/ -}}
{{- define "pnnlmiscscripts.k8s-node-image-nginx-1-14.image" -}}
{{- include "pnnlmiscscripts.k8s-node-image-nginx-1-14.server" . -}}{{- include "pnnlmiscscripts.k8s-node-image-nginx-1-14.prefix" . -}}/{{- include "pnnlmiscscripts.k8s-node-image-nginx-1-14.org" . -}}/{{- include "pnnlmiscscripts.k8s-node-image-nginx-1-14.repo" . -}}:{{- include "pnnlmiscscripts.k8s-node-image-nginx-1-14.tag" . -}}
{{- end -}}
