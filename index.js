const core = require('@actions/core');


// most @actions toolkit packages have async methods
async function run() {
  try { 
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
  } 
  catch (error) {
    core.setFailed(error.message);
  }
}

run()
