import { platform } from "os";
import { exec } from "child_process";

const getChromeTabs = require('get-chrome-tabs');
const osPlatform = platform();

interface ITab {
    windowIndex: number; 
    windowVisible: boolean;
    url: string;
    title: string;
    active: boolean;
    loading: boolean;
}

const getTabs = async ()=> {
  try {
    return await getChromeTabs()
  } catch (error) {

    return null;
    
  }
}

export const swaggerStart = async () => {
  const url = `http://localhost:${process.env.PORT}/api-doc/`;

  let command: string;

  if (osPlatform === "win32") {
    command = `start "Google Chrome" ${url}`;
  } else if (osPlatform === "darwin") {
    command = `open -a "Google Chrome" ${url}`;
  } else {
    command = `google-chrome --no-sandbox ${url}`;
  }

  const tabs: ITab[] = await getTabs()

  if (tabs) {
    let isClose = true;

    tabs.map((tab: ITab) => {
      if(tab.url == url) {
        console.log("Refreshing browser")
        isClose = false
      } 
    })

    if (isClose) {
      exec(command);
    }
  } else {
    exec(command);
  }
};
