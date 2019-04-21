REPO_URL := https://jetstack-charts.storage.googleapis.com
GCS_PATH := gs://jetstack-charts

BUILD_DIR := $(CURDIR)/_build
prepare:
	helm init -c

clean:
	rm -rf $(BUILD_DIR)

test:
	helm lint $(CHART_PATH)

package: prepare
	mkdir -p $(BUILD_DIR)
	cd $(BUILD_DIR) && helm package $(CURDIR)

publish:
	# TODO: add some locking, this has a race condition with multiple publishes run at the same time
	cd $(BUILD_DIR) && gsutil cp $(GCS_PATH)/index.yaml $(BUILD_DIR)/index.yaml
	cd $(BUILD_DIR) && helm repo index --url $(REPO_URL) --merge ./index.yaml .
	gsutil -m rsync $(BUILD_DIR) $(GCS_PATH)/
