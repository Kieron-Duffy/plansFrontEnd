# Deploying a journey from a container

By default, running `BASE_PATH=/starter-kit yarn build` creates static HTML content and script bundles within a folder called `dist`. A bundle of HTML and Javascript files are created for each brand. These static files served from an NGINX web server.

The included Dockerfile proves this capability. For use on a GCP environment, it copies brand specific content from the generated `dist` folder to an NGINX container. Ideally, there will be an image per brand however this can vary depending on your requirements.

These set of images can then be deployed to the desired enviroments.

## In `docker-compose.yml`

A `docker-compose.yml` file is provided to show off running the container images locally.

- Update the `BASE_PATH` build arg to the desired root path of your journey

## On GCP

For GCP, a custom helm chart has been provided to autogenerate ingress and path values.

If the [vbp-channels-interstellar-playground](https://github.com/lbg-gcp-foundation/vbp-channels-interstellar-playground) repository is used to test deployments

- Brands are deployed based of file name. If a particular brand should not be deployed, delete the overrides file for it.

The following changes are required to the helm chart values

- For each overrides file
  1. Edit the `journeyName` field to the new journey name. This is what the path will be
  2. Edit the `valuestream` field to your GCP valuestream. The GCP URL will be constructed using this `.${valuestream}-bld.oncp.dev`
  3. Edit the `namespace` field to the deployment namespace (for the playground repository, set it to `ns-kcl-vbp-chf-is-pg`).
  4. Edit the `image.baseRepository` field to the GCP docker registry base path. The docker registry path will be constructed using `${image.baseRepository}/${journeyName}-${brand}`
  5. Edit `ingress.rootSubdomain` to the required subdomain. The GCP URL will be constructed using this `${ingress.prSubdomain}.${brand}.${ingress.rootSubdomain}.${valuestream}-bld.oncp.dev` (for the playground repository, set it to `interstellar-pg`)
  6. Edit `ingress.tlsSecretName` to the K8S secret within the namespace containing the TLS certificate details (for the playground repository, set it to `secret-kcl-vbp-chf-tls-lloyds.interstellar-pg`)

## On Azure

On Azure, the Cloud Services team have provided a CI/CD template to build out containers on the platform. Interstellar can be built using this process, however some changes are required

- Create a file called `./pipelines/ci/.npmrc` and add the below to it. This is required as DNS Resolution for the NexusRM service does not exist within the CI/CD environment, so the registry is referenced using its IP address within pipelines

  ```
  registry=https://100.64.0.248:8443/repository/npm-proxied/
  @constellation:registry=https://100.64.0.248:8443/repository/constellation/
  @interstellar:registry=https://100.64.0.248:8443/repository/interstellar/
  @lbg_vbp:registry=https://100.64.0.248:8443/repository/interstellar/
  always-auth=true
  strict-ssl=true
  ```

- Update `Dockerfile` contents to a multi-brand build as Azure requires all build steps to be done within the Dockerfile

  ```
  FROM uksadmgmtacr.azurecr.io/node:16.15-buster-slim as build-stage
  # Uncomment the following for local build without access to az acr
  # FROM node:16.15-buster-slim as build-stage

  # create application folder
  RUN mkdir -p /app
  WORKDIR /app

  # Comment below two lines if not running locally
  # ARG AZ_NPM_TOKEN=''
  # ENV AZ_NPM_TOKEN=${AZ_NPM_TOKEN}
  COPY cne.crt .
  ENV NODE_EXTRA_CA_CERTS="/app/cne.crt"

  # install dependencies
  COPY pipelines/ci/.npmrc .npmrc
  # RUN cat .npmrc
  COPY package.json yarn.lock .env.example .
  # patch yarn.lock file with Nexus IP and DNS is not present in app-dev environment
  RUN sed -i 's,https://nexusrm.ad.cne-connect.com:8443,https://100.64.0.248:8443,g' yarn.lock && \
      yarn --frozen-lockfile

  # copy over everything else and build
  COPY . .
  # ensure npmrc is ci
  COPY pipelines/ci/.npmrc .npmrc
  ARG BASE_PATH='/'
  RUN BASE_PATH=${BASE_PATH} yarn build

  # runtime image
  FROM uksadmgmtacr.azurecr.io/nginxinc/nginx-unprivileged:1.23-alpine
  # Uncomment the following for local build without access to az acr
  # FROM nginxinc/nginx-unprivileged:1.23-alpine

  USER root
  RUN apk del curl
  USER nginx

  # copy nginx conf and config
  RUN rm -f /etc/nginx/conf.d/default.conf
  COPY nginx/healthz.html /usr/share/nginx/html${BASE_PATH}/healthz.html
  COPY --chown=nginx:0 nginx/default.template /etc/nginx/templates/

  ARG BASE_PATH='/'
  ENV BASE_PATH=${BASE_PATH}
  RUN envsubst "\${BASE_PATH}" < /etc/nginx/templates/default.template > /etc/nginx/conf.d/default.conf

  # copy brand dist from builder image
  ARG BRAND_TO_BUILD='.'
  COPY --from=build-stage /app/dist/${BRAND_TO_BUILD} /usr/share/nginx/html${BASE_PATH}
  ```

- Create a file called `cne.crt` at the root of the repo with the below contents. This is required as Azure CNE signs services off the Azure Pre Prod certificate, which is not included in the Node container by default

  ```
  -----BEGIN CERTIFICATE-----
  MIIDRzCCAi+gAwIBAgIQIAFAgNwqj79IHxQlWRh/nDANBgkqhkiG9w0BAQsFADA2
  MTQwMgYDVQQDEytMbG95ZHMgQmFua2luZyBHcm91cCBQcmUtUHJvZHVjdGlvbiBS
  b290IENBMB4XDTE0MDcyNDExMDIxN1oXDTM0MDcyNDExMTE0NVowNjE0MDIGA1UE
  AxMrTGxveWRzIEJhbmtpbmcgR3JvdXAgUHJlLVByb2R1Y3Rpb24gUm9vdCBDQTCC
  ASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAOPutBw5SRxEc9os8k56TgHK
  4zm4VpoYdAHncBuPLJrnWwG1240TmqzPBAyag65fyHk6e8816NBc5xi8yKsyNaZ2
  8CNY07EEDx+4D7/rBYp9m/OrufYxkmSh5p+iL5dzampeZIZ4tHTT+IdrrnAVuTql
  3DjDNRTGBbILDCSb7ep6wnYvgxk/wC9unnTY63GgWxd2LQtQ8MO+5ZIbUed/6DFs
  9eauCPxuYcyutTZTzxcck1rkkdc+mT2KaMF93egSpbImgK6ImqqAPjJQjPlduVLl
  048F1Mciz9t/XRMR1D2lBT/RObxsl3DhUGVpl60xecVX9aqlRr+8MBvAc8uGNJUC
  AwEAAaNRME8wCwYDVR0PBAQDAgGGMA8GA1UdEwEB/wQFMAMBAf8wHQYDVR0OBBYE
  FPLyCeYPVsyf/5ic7Q/c9yjjHy/kMBAGCSsGAQQBgjcVAQQDAgEAMA0GCSqGSIb3
  DQEBCwUAA4IBAQCpbbzCZQnyDYTJ4vBFsDs4ITpMnJolGopx7SiKu0ZhnW2bGKc3
  0hi7cEFAV5Ufp7N8O29SJ5MwbC7jzUmXtiF2I21+8/JeHu8S5OyWY6AZhQpHZ4Un
  QBCPsmhTFA9Xgoej1esHX2dkMjUG773cQL9He/BkYzH8K73DIx/jOZ++UWCaIdDL
  Y41LHhy0v1FK6jO3D0wRgRQIzSoPvrsdN1pfCS5eOv9pl0KBX/gyyTr62fDfu/qO
  bVaVxh8clUMiXZ4Bn0Y4A0GGxGzm06+OQvZ4mEM7dCwMZT+sGsZVTCGg5Hw1pZKC
  FlfIAJvohsKvMr27M1yq5m8hpt+OC3vwHzwm
  -----END CERTIFICATE-----
  ```

- For continuous integration (CI), each brand requires pipeline definition files within `./pipelines/ci`
  - `<brand>-variables.yaml`

    ```
    # full config for file is here
    variables:
      build.env: ad
      build.vs: platform
      build.lab: <lab>

      build.dockerfile: Dockerfile --build-arg=BASE_PATH=/<base-path> --build-arg=BRAND_TO_BUILD=<brand>
      build.name: $(Build.Repository.Name)-$(Build.SourceBranchName)-<brand>

      # https://confluence.devops.lloydsbanking.com/display/LBGCCOE/CNE%3A+Customer+install+Hello+World+test+app+guide
      build.type: buildah
      build.npmrc: pipelines/ci/.npmrc

      # warn on aqua scan failure until new base image is created
      aqua.warn: true

      # nexus rm auth
      nexusrm.npmmanaged-auth: true
      nexusrm.npmhosted-auth: true                                   # To be used when wanting to auth to NexusRM, to consume RAW binaries after having had a Service Connection deployed
      nexusrm.npmproxied-auth: true                                  # To be used when wanting to auth to NexusRM, to consume NPM Proxied binaries after having had a Service Connection deployed
      # nexusrm.raw-auth: true                                         # To be used when wanting to auth to NexusRM, to consume NPM hosted binaries after having had a Service Connection deployed

      # skip zap scanning as it relies on the docker socker which isn't open in our agent
      zap.run: false

      jmeter.run: false
      newman.run: false
    ```

  - `build-<brand>-pipeline.yaml`

    ```
    name: starter-kit-<brand>-ci
    trigger:
      - master
      - main
      - latest
      - next

    resources:
      repositories:
        - repository: libraries
          type: git
          name: CloudFirst/azure-devops-libraries
          ref: refs/heads/master

    variables:
      - template: shared/build/image/v1/config.yaml@libraries
      - template: <brand>-variables.yaml

    stages:
      - template: shared/build/image/v1/pipeline.yaml@libraries
        parameters:
          vars: ${{ variables }}
    ```

    Replace:
    - `<lab>` - with the name of the azure lab
    - `<base-path>` - with the base path of the build journey (e.g. `/starter-kit`)
    - `<brand>` - content brand to build out (e.g. `lloyds`, `bos`, `halifax`, `mbna`, `sw`)
