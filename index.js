const core = require('@actions/core');
const execSync = require('child_process').execSync;
const fs = require('fs');

// most @actions toolkit packages have async methods
async function run() {
  try {
    const serviceAccountFile = `/tmp/${(new Date()).getTime()}.json`;
    const projectName = core.getInput('project_name');
    core.startGroup('Add Cloud SDK distribution URI as a package source');
    execSync(`echo "deb [signed-by=/usr/share/keyrings/cloud.google.gpg] https://packages.cloud.google.com/apt cloud-sdk main" | sudo tee -a /etc/apt/sources.list.d/google-cloud-sdk.list`, {stdio: 'inherit'});
    core.endGroup();
    core.startGroup('Install apt-transport-https ca-certificates gnupg');
    execSync(`sudo apt-get install apt-transport-https ca-certificates gnupg`, {stdio: 'inherit'});
    core.endGroup();
    core.startGroup('Import Google Cloud public key');
    execSync(`curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key --keyring /usr/share/keyrings/cloud.google.gpg add -`, {stdio: 'inherit'});
    core.endGroup();
    core.startGroup('Update and install Google Cloud SDK');
    execSync(`sudo apt-get update && sudo apt-get install google-cloud-sdk -y`, {stdio: 'inherit'});
    core.endGroup();
    core.startGroup('Working with SERVICE_ACCOUNT');
    console.log('Copy SERVICE_ACCOUNT');
    fs.writeFileSync(serviceAccountFile, core.getInput('service_account'));
    console.log('Activate SERVICE_ACCOUNT');
    execSync(`gcloud auth activate-service-account --key-file ${serviceAccountFile}`, {stdio: 'inherit'});
    core.endGroup();
    core.startGroup('Set GCP Project');
    execSync(`gcloud config set project ${projectName}`, {stdio: 'inherit'});
    core.endGroup();
    core.startGroup('Depoy GCP project');
    execSync(`gcloud app deploy`, {stdio: 'inherit'});
    core.endGroup();
    core.startGroup('Working with SERVICE_ACCOUNT');
    console.log('Remove SERVICE_ACCOUNT');
    fs.unlinkSync(serviceAccountFile);
    core.endGroup();
  } 
  catch (error) {
    core.setFailed(error.message);
  }
}

run()
