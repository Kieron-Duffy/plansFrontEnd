{{/*
Expand the name of the chart.
*/}}
{{- define "app.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Create a default fully qualified app name.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
Full name will be truncated release name
*/}}
{{- define "app.fullname" -}}
{{- if .Values.fullnameOverride }}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- $name := default .Release.Name .Values.nameOverride }}
{{- $name | trunc 63 | trimSuffix "-" }}
{{- end }}
{{- end }}

{{/*
Create chart name and version as used by the chart label.
*/}}
{{- define "app.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Common labels
*/}}
{{- define "app.labels" -}}
helm.sh/chart: {{ include "app.chart" . }}
{{ include "app.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

{{/*
Selector labels
*/}}
{{- define "app.selectorLabels" -}}
app.kubernetes.io/name: {{ include "app.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}

{{/*
Generate the ingress path used for rewrites and path matching (without capture group)
*/}}
{{- define "app.ingressPath" -}}
{{- $path := .Values.journeyName | trimPrefix "/" | trimSuffix "/" }}
{{- if .Values.ingress.pathPrefix }}
{{- $pathPrefix := .Values.ingress.pathPrefix | trimPrefix "/" | trimSuffix "/" }}
{{- print "/" $pathPrefix "/" $path }}
{{- else }}
{{- print "/" $path }}
{{- end }}
{{- end }}

{{/*
Construct hostname with optional brand subdomain
*/}}
{{- define "app.hostName" -}}
{{ $unused := required "A valid rootSubdomain option is required to construct the URL!" .Values.ingress.rootSubdomain }}
{{- $constructedHostname := print .Values.valuestream "-bld.oncp.dev" }}
{{- $hostname := ternary $constructedHostname .Values.ingress.hostNameOverride (empty .Values.ingress.hostNameOverride) }}
{{- if .Values.ingress.prSubdomain }}
{{- print .Values.ingress.prSubdomain "." .Values.brand "." .Values.ingress.rootSubdomain "." $hostname | lower }}
{{- else }}
{{- print .Values.brand "." .Values.ingress.rootSubdomain "." $hostname | lower }}
{{- end }}
{{- end }}