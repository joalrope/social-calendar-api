//import puppeteer from "puppeteer-core";
import { spawn } from "child_process";

// npm i chrome-launcher
// yarn add chrome-launcher

//import { platform } from "os";
// const getChromeTabs = require('get-chrome-tabs');
//const osPlatform = platform();

// interface ITab {
//     windowIndex: number;
//     windowVisible: boolean;
//     url: string;
//     title: string;
//     active: boolean;
//     loading: boolean;
// }

// const getTabs = async ()=> {
//   try {
//     return await getChromeTabs()
//   } catch (error) {

//     return null;

//   }
// }

export const swaggerStart = async () => {
  const serverAddr = `http://localhost:${process.env.PORT}`;
  const url = `${serverAddr}/api-doc/`;
  const chrome = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

  try {
    // let command: string;

    // if (osPlatform === "win32") {
    //   command = `start "Google Chrome" ${url} --remote-debugging-port=9222`;
    // } else if (osPlatform === "darwin") {
    //   command = `open -a "Google Chrome" ${url}`;
    // } else {
    //   command = `google-chrome --no-sandbox ${url}`;
    // }

    spawn(chrome, ["--remote-debugging-port=9222", url]);

    //const ws = String());

    // const browser = await puppeteer.connect({
    //   browserWSEndpoint: Object(
    //     await fetch("http://127.0.0.1:9222/json/version")
    //   ).webSocketDebuggerUrl, // ws
    //   ignoreHTTPSErrors: false,
    //   defaultViewport: null,
    // });

    // const newPage = await browser.newPage();

    // await newPage.goto(url);

    // const pages = await browser.pages();

    // pages.map((page) => {
    //   console.log(page.url());
    // });

    // const ws = await fetch("http://127.0.0.1:9222/json/version");

    // console.log(ws);
  } catch (error) {
    console.log(error);
  }
};
