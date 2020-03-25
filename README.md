# gae_deploy_action
![Continuous Deployment (CD) working](https://github.com/atRobertoFlores/gae_deploy_action/workflows/Continuous%20Deployment%20(CD)%20working/badge.svg)

This action allows you to Deploy an application to [Google App Engine](https://cloud.google.com/appengine/).

## Usage
```yaml
- name: Deploy to Google App Engine
  uses: atRobertoFlores/gae_deploy_action@master
  with:
    service_account: ${{ secrets.SERVICE_ACCOUNT }}
    project_name: ${{ secrets.PROJECT_NAME }}
```

## Inputs

* `service_account`: (Required) Service Account private key (JSON), you can know how to create one [here](https://cloud.google.com/iam/docs/creating-managing-service-account-keys).

* `project_name`: (Required) project_id in google cloud platform.

## Notes
Google Cloud SDK is provided by default on [GitHub-hosted runners](https://help.github.com/en/actions/automating-your-workflow-with-github-actions/software-installed-on-github-hosted-runners#ubuntu-1804-lts).