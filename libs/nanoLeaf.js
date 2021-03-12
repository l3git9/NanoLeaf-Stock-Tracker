const fetch = require("node-fetch");
let config = require('../config');



function NanoLeaf() {
this.authToken = config.authToken
this.nanoLeafIp = config.nanoLeafIp

}

NanoLeaf.prototype.turnOnOffLights = function (state) {
    let data = {
      on: {
        value: state,
      },
    };
    fetch(`http://${this.nanoLeafIp}/api/v1/${this.authToken}/state/on`, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    }).catch((err) => {
      console.log(err);
    });
  }
  
  NanoLeaf.prototype.changeLight = function (color) {
    let data = { select: color };
    fetch(`http://${this.nanoLeafIp}/api/v1/${this.authToken}/effects`, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
  }

  module.exports = NanoLeaf
  