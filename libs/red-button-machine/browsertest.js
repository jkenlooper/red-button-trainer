#!/usr/bin/env node

import assert from "assert";
import puppeteer from "puppeteer";
import express from "express";

// Set this to true if needing to debug the test.
const debugTests = false;

const defaultOpts = {
  headless: !debugTests,
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
};
const opts = Object.assign(
  {},
  defaultOpts,
  process.env.D ? { headless: false, slowMo: 250 } : {}
);

let browser;
let page;
let server;

(async function () {
  const app = express();

  app.use(
    express.static(".", {
      setHeaders: (res, path, stat) => {
        if (path.endsWith(".mjs")) {
          res.set("Content-Type", "text/javascript");
        }
      },
    })
  );

  server = await app.listen(3001);

  // Launch Puppeteer and navigate to the Express server
  browser = await puppeteer.launch(opts);
  page = await browser.newPage();
  await page.goto("http://localhost:3001/unit-tests.html", {
    waitUntil: "networkidle2",
  });

  // Check the Mocha stats to see if any test failures.
  await page.waitFor("#mocha-stats");
  const testFailure = await page.$eval(
    "#mocha-stats .failures",
    (failuresEl) => {
      return failuresEl.textContent.search(/\s0$/) === -1 ? true : false;
    }
  );
  try {
    assert.equal(testFailure, false, "Mocha stats should show 0 failures");
    console.log("Mocha stats show 0 failures");
  } catch (error) {
    console.error(error);
  } finally {
    // Clean up
    // Leave it open if needing to debug the tests.
    if (!debugTests) {
      await browser.close();
      await server.close();
      process.exit(testFailure ? 1 : 0);
    }
  }
})();
