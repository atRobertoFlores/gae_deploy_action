"use strict";

const core = require('@actions/core');
const execSync = require('child_process').execSync;
const fs = require('fs');

// most @actions toolkit packages have async methods
async function run() {
  try {
    const serviceAccountFile = `/tmp/${(new Date()).getTime()}.json`;
    const projectName = core.getInput('project_name');
    core.startGroup('Processing SERVICE_ACCOUNT');
    console.log('Copy SERVICE_ACCOUNT');
    fs.writeFileSync(serviceAccountFile, core.getInput('service_account'));
    console.log('Activate SERVICE_ACCOUNT');
    execSync(`gcloud auth activate-service-account --key-file ${serviceAccountFile}`, {stdio: 'inherit'});
    core.endGroup();
    core.startGroup('Set GCP Project');
    execSync(`gcloud config set project ${projectName}`, {stdio: 'inherit'});
    core.endGroup();
    if(core.getInput('test')) {
      core.startGroup('GAE project info');
      execSync(`gcloud info`, {stdio: 'inherit'});
      core.endGroup();
    }
    else {
      core.startGroup('Deploy GAE project');
      execSync(`gcloud app deploy`, {stdio: 'inherit'});
      core.endGroup();
    }
    core.startGroup(' SERVICE_ACCOUNT');
    console.log('Remove SERVICE_ACCOUNT');
    fs.unlinkSync(serviceAccountFile);
    core.endGroup();
  } 
  catch (error) {
    core.setFailed(error.message);
  }
}

run();