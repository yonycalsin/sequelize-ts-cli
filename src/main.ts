const { exec } = require('child_process');

exec('npx sequelize init --options-path ./scripts', (error, stdout, stderr) => {
   if (error) {
      console.log(`error: ${error.message}`);
      return;
   }
   if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
   }
});
