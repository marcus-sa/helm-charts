SHELL := /bin/bash

CHART_DIRS := $(wildcard ./repositories/*/*/*)
CHARTS := $(addsuffix /chart/Chart.yaml,$(CHART_DIRS))
PACKAGES := $(addsuffix /package.json,$(CHART_DIRS))

# Download and extract all charts
all: $(CHARTS) $(PACKAGES)

# Download and extract charts to directories
$(CHARTS):
	./scripts/download-chart.sh $@

$(PACKAGES):
	yarn generate-package $@

clean-js:
	rm -f charts/*/*/*.js charts/*/*/*.js.map charts/*/*/*.d.ts
