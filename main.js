const express = require('express');
const cors = require('cors');
const authUtils = require('./utils/authUtils.js');

// Create an Express application
const app = express();
const port = 5000;

// By adding CORS(app), you are telling express to include CORS headers in responses. The cors() extension will add headers such as Access-Control-Allow-Origin: *, allowing requests from any origin.
//This way, when your frontend makes requests to your nodeJS server, the server will respond with the appropriate CORS headers, and the browser will permit the requests. Since the frontend and backend are on the same origin (domain), you won't encounter CORS issues.
//For more info on CORS goto: https://www.bannerbear.com/blog/what-is-a-cors-error-and-how-to-fix-it-3-ways/
// Enable CORS (Cross-Origin Resource Sharing) for all routes
app.use(cors());

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Use the authUtils router for the '/getToken' route
app.use('/getToken', authUtils);

// Define a route to serve the index.html file
app.get('/', (req, res) => {
    //res.sendFile(__dirname + '/views/index.html');

    const authToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhcHBJZCI6IjdudWRic2U1ODEiLCJ0b2tlbiI6eyJpdiI6IjE5M2Y3NjljMzM4NTYwYjJmNzQzZTc3YTlkNWY4NjRmIiwiY29udGVudCI6IjFjYzg3YWUzMWFjOTQ0OWM0ZTE4MDgyYTYzZTQ4NDY3OWU5ODhhZmIwMzQ2MjVmZmQ1YWE5OWRiMzI4YTc5N2ViMjZjMDNiYWYyNzYyNTQ3NmZiNmY2ZWY4N2VmOGQyZGNhOTAwOTM5MjBlNTBhNDI2OTY1OWNkNjU5NTIwMjE1NTA2Mjc3YWQ0ZGZjYjU4NjcxNmZmODJiNjczZGIwM2FkMTA0ZmRiNGZhMTcxOGZlYWNjYmIyODVjZDUxMTBkMDgyMjEyYjNlNzEzMDY0ZTQwMWU2ODQ0MjY1NDcyYzMzNGQyMTNiMjA2OGFjNTc5MTFiNTNiYTNlMzdjYmM0NTY2ZmM2YTU1M2MwNjllNzVkMTdkZjFjOWM5YTIzNGIyNDM2OThkMzI4YzE2ODAwMDVhNzMyMTQ0MjNmODNmZDA5NmE2NmJmYjI0Nzg3MjJkMmI5NzU4ZTRhYjQ5MzlkOTQ0MDM4ZjE2NzgwM2U2NGIxMmZhMjZiNzNjNjViNTA4ZWMyM2FjYmYxYzUzYTdmOTgwYjYzODAzNzBhOGUyYzVjOGNkZjVjMGM5Mjg1M2E1NGZiZWQxN2JiNzVmZTU3ZTM4MDMxMzY0NmZiN2NjMjEyODY1NDRkNTNmOWQzOTVlM2U4YjExMjc0N2QzMjRhYThiMGQ3NzEzNjAyZDA5YTdkMmI1YmIyNWE4MDE1N2VlNjRmNTkxMGJmYWRkY2M5MzgzN2RjYzViMjc3NDQzNjQzNDgzZTY2ZThmODU5ZGVhMzZlNWMyMWVhODY2ZmE4ZDU4OTQxYmIyZjE0ZjgzYTI0ODZjYjhlNWJmMzA5NTVkYjNkZTg4OGY1NWIzMTU3NjY1ZWZlMmRkMDJhZmQ5ZWZiZmFmMzIwIn0sInNlY3VyaXR5VG9rZW4iOnsiaXYiOiIxOTNmNzY5YzMzODU2MGIyZjc0M2U3N2E5ZDVmODY0ZiIsImNvbnRlbnQiOiIzNmZlNjRlZDRiZmExZmI5MzUzNDM1MTM0ZWFhODczZDliOWNmYmUyMjQ0OTQ1ODhkM2JiODhhNzJiODc0YTcwYmQ3ZTEzYzRhYzYwM2E3ZDVkYjJjZGQxIn0sImp0aSI6Ijc4YzRhODA5LThkNDEtNDFlNS1hNTE5LTRjMTQxOTUxNjkzNiIsImlhdCI6MTcwMTU4NjA1MCwiZXhwIjoxNzAxNTg5NjUwfQ.RFXH801BOP9ZooOM8JpVF5u4UOilm-E-NFPcXXOQC34';
    const baseUrl = 'https://api.iq.inrix.com/findRoute';

    const departureCoordinates = '37.740741,-122.458371';
    const destinationCoordinates = '37.700273738769454,-122.45555743979743';

    const queryParams = new URLSearchParams({
        wp_1: departureCoordinates,
        wp_2: destinationCoordinates,
        format: 'json',
    });

    const apiUrl = `${baseUrl}?${queryParams}`;
    console.log(apiUrl);

    const requestOptions = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${authToken}`,
        },
    };

    fetch(apiUrl, requestOptions)
        .then(response => response.json())
        .then(data => {
            // Store the fetched data in a variable
            const minutes = JSON.stringify(data.result.trip.routes[0].travelTimeMinutes);
            res.status(200).send(minutes);
        }).catch(err=>{
            console.error('Error Message: ', err);
        })
});  

app.get("/waittime", async (req, res) => {
    var myHeaders = new Headers();
    myHeaders.append("4fcg10Cphlq1jmEHRAbsBxTFrWYm7ITK", "g9VXBhKbGCy66C0Y");
    const response = await fetch("https://api.flysfo.com/sfo/v1.0/checkpoints/e890e3d4-7a42-11e7-bb31-be2e44b06b34/waittime");
    let output = await response.json();
    var screenMinutes0= JSON.stringify(output.prescreening_queues[0].estimated_waittime);
    var screenMinutes1= JSON.stringify(output.prescreening_queues[1].estimated_waittime);
    var screenMinutes2= JSON.stringify(output.prescreening_queues[2].estimated_waittime);
    var screenMinutes3= JSON.stringify(output.prescreening_queues[3].estimated_waittime);
    var maxMinutes = 0;
    if (screenMinutes0 > maxMinutes) {
        maxMinutes = screenMinutes0;
    } else if (screenMinutes1 > maxMinutes) {
        maxMinutes = screenMinutes1;
    } else if (screenMinutes2 > maxMinutes) {
        maxMinutes = screenMinutes2;
    } else if (screenMinutes3 > maxMinutes) {
        maxMinutes = screenMinutes3;
    }
    console.log(screenMinutes0);
    console.log(screenMinutes1);
    console.log(screenMinutes2);
    console.log(screenMinutes3);
    console.log('final result: ' +maxMinutes);
    res.status(200).json(maxMinutes);

});

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
