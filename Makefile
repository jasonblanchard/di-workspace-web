.PHONY: build tag push deploy

IMAGE_NAME=di-workspace-web
GIT_SHA = $(shell git rev-parse HEAD)
IMAGE_REPO=jasonblanchard/${IMAGE_NAME}
LOCAL_TAG = ${IMAGE_REPO}
LATEST_TAG= ${IMAGE_REPO}:latest
SHA_TAG = ${IMAGE_REPO}:${GIT_SHA}

build:
	docker build -t ${LOCAL_TAG} .

tag: build
	docker tag ${LOCAL_TAG} ${SHA_TAG}

push: tag
	docker push ${LATEST_TAG}
	docker push ${SHA_TAG}

deploy:
	cd ./deploy/base; kustomize edit set image ${SHA_TAG}; \
	cd ..; \
	kubectl apply -k ./overlays/development; \
	cd base; \
	kustomize edit set image ${LATEST_TAG}

swap:
	telepresence --swap-deployment workspace-web --namespace di --expose 8080 --docker-run -v $(shell pwd)/build:/usr/src/app/public -p 8080:8080 -e PORT=8080 -e JS_BUNDLE_PATH=app.js -e PAGE_TITLE="App Dev" jasonblanchard/di-fe-server

mockserver:
	prism mock -d https://raw.githubusercontent.com/jasonblanchard/di-apis/main/gen/pb-go/notebook.swagger.json