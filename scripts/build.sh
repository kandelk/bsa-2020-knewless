#/bin/bash

docker build -f .docker/api.Dockerfile -t api .
docker build -f .docker/fileprocessor.Dockerfile -t fileprocessor .
docker build -f .docker/client.Dockerfile -t client .

docker login -u $docker_user -p $docker_pass

docker tag api:latest bsa2020knewless/dockerhub:api
docker tag fileprocessor:latest bsa2020knewless/dockerhub:fileprocessor
docker tag client:latest bsa2020knewless/dockerhub:client

docker push bsa2020knewless/dockerhub:api
docker push bsa2020knewless/dockerhub:fileprocessor
docker push bsa2020knewless/dockerhub:client