const client = require("./consumer");

client.fetchProviderData(new Date().toISOString()).then(
  response => {
    console.log(response);
  },
  error => {
    console.error(error);
  }
);
