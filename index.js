const core = require('@actions/core');
const execSync = require('child_process').execSync;

// most @actions toolkit packages have async methods
async function run() {
  try {
    execSync(`echo "deb [signed-by=/usr/share/keyrings/cloud.google.gpg] https://packages.cloud.google.com/apt cloud-sdk main" | sudo tee -a /etc/apt/sources.list.d/google-cloud-sdk.list`, {stdio: 'inherit'});
    execSync(`sudo apt-get install apt-transport-https ca-certificates gnupg`, {stdio: 'inherit'});
    execSync(`curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key --keyring /usr/share/keyrings/cloud.google.gpg add -`, {stdio: 'inherit'});
    /*
    const sa = core.getInput('service_account');
    const pn = core.getInput('project_name');
    core.debug('Service Account');
    console.log(`SA: ${sa}`);
    core.debug('Project Name');
    console.log(`PN: ${pn}`);
    core.startGroup('Group S1');
    core.debug('S1 - debug');
    console.log(`S1 - log`);
    core.endGroup();
    core.startGroup('Group S2');
    core.debug('S2 - debug');
    console.log(`S2 - log`);
    core.endGroup();
    core.setOutput('time', 'test time is' + new Date().toTimeString());
    */
  } 
  catch (error) {
    core.setFailed(error.message);
  }
}

run()
