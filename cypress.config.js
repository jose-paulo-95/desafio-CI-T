const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "",
  retries: {
    runMode: 2,
    openMode: 0,
  },
  viewportWidth: 1280,
  viewportHeight: 720,
  e2e: {
    setupNodeEvents(on, config) {
  
    },
    baseUrl: "https://front.serverest.dev",
    watchForFileChanges: false,
    pageLoadTimeout: 60000,
    defaultCommandTimeout: 10000,
    responseTimeout: 10000,
    requestTimeout: 10000,
    viewportWidth: 1280,
    viewportHeight: 720,
    ensureScrollable: false,
    failOnStatusCode: false,
    chromeWebSecurity: false,
    video: true,
    videosFolder: "cypress/videos",
    retries: {
      runMode: 2,
      openMode: 0,
    },
  },
  env: {
    apiUrl: "https://serverest.dev",
  },
});
