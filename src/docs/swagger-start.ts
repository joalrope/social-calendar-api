//const path = require('path');
import { platform } from "os";
import { exec } from "child_process";

const osPlatform = platform();

export const swaggerStart = () => {
  const url = `http://localhost:${process.env.PORT}/api-doc`;

  let command;

  if (osPlatform === "win32") {
    //command = `start microsoft-edge:${url}`;
    command = `start "Google Chrome" ${url}`;
  } else if (osPlatform === "darwin") {
    command = `open -a "Google Chrome" ${url}`;
  } else {
    command = `google-chrome --no-sandbox ${url}`;
  }

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  });
};
