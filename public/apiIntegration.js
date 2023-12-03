//Author: Avni Rao
export default async function waitTimeCalc() {
    var myHeaders = new Headers();
    myHeaders.append("4fcg10Cphlq1jmEHRAbsBxTFrWYm7ITK", "g9VXBhKbGCy66C0Y");

    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };

    const response = await fetch("https://api.flysfo.com/sfo/v1.0/checkpoints/e890e3d4-7a42-11e7-bb31-be2e44b06b34/waittime", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

    return response;
}