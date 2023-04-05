const util = require('node:util');
const childProcess = require('node:child_process');
const exec = util.promisify(childProcess.exec);

async function pgCommand(db, command, args) {
  const defaultArgs = [`-U "${db.username}"`, `-d "${db.database}"`];
  const commandArgs = typeof args === 'string' ? [...defaultArgs, args] : [...defaultArgs, ...args];

    const runLocalCommand = [command, `-h "${db.host}"`, `-p "${db.port}"`, `--no-password`, ...commandArgs].join(' ');

    return await exec(runLocalCommand, {
      shell: '/bin/bash',
      env: {
        ...process.env,
        PGPASSWORD: db.password,
      },
    });
}


module.exports = {
  pgCommand
}
