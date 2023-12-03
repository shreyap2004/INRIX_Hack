//Author: Avni Rao
const fetch = require('node-fetch');


const waitTimeCalc = async (req, res) => {
    var myHeaders = new Headers();
    myHeaders.append("4fcg10Cphlq1jmEHRAbsBxTFrWYm7ITK", "g9VXBhKbGCy66C0Y");

    const response = await fetch("https://api.flysfo.com/sfo/v1.0/checkpoints/e890e3d4-7a42-11e7-bb31-be2e44b06b34/waittime");

    return response;
}

module.exports = {
    waitTimeCalc
}