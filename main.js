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
    res.sendFile(__dirname + '/views/index.html');

    const authToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhcHBJZCI6IjdudWRic2U1ODEiLCJ0b2tlbiI6eyJpdiI6Ijc4MzdmYzU4NmNhNzYwMTcwNzZiZDYxOGE4ODg3NWU0IiwiY29udGVudCI6ImMyYjc1NzA5NmQxYzgwM2IxMjllOGViZTNhNzViNjk5YmEzYjM3YjY1MGU5Nzc5NjdmZjFkYWI2NDZhZTg1NjQ3YjhiMmFkYzFlYTg0NGRiMzg3MTgzOTExZjVmZDNkYjIyZGE5YjNlZDZkNzhhYjhiZDU3NjIwYzBjNTc2NWY0NTg4YzljMmZjYTA2YmQ1MGNjMDI4Mzk5YjQ2ZjAzYTMzOTgxM2FlNGYzYmVlMGRlMmNiNDkzMGQ1NzljYjFjZmU2ZDA0OTUzNGRhOTg3NjM4NjkxMjkwNTdiMTM0OTBkZTg0N2M3MDg2NzFkOWE1MjM0Y2EyMjNlMzcwMjg0ZTk5Yjg4YWNiMGEwODBiYzBlY2Y0ZGJjMzQ1MDY1YmFjYmE3NzE2ZWQ3NjA4NzNmZGIxZTkwZjkwODdkYmI1ZjQ1Y2ZmY2U1NTZlMGZhMDZhOWQzODI1MzY5YTE4NjE1YmEyYTY2YTMxOGRlYWIyOTIyM2VkMmZkMzYxZGU1NTJlZmI4ZmIyNzBlY2Y5Mjk0NmY2N2FiZjY0YjA4YWJkZTljNTIxMWE5NTJmMjMzZDhmMzEyN2E4ODIwNzY4Y2MyZjM3NGJhOWM3ZTJmMjk0Yjk1MDk4YmQ2NWZjOGIxOGYxN2UwMjIxMWYzNDI0N2Y5NDBlMmU4MjI5YzMyZWU2YmRlYzQzNGNmZWIxMTIxZjI3Njg3NGRhNTVkYzRjOGUyNThiMDg5ZTRiOGQ0MjRlNjZlZmJmZTY4NGVlZGI5ZWViZGIyZjhkZTBmMjFkZWIyODQ0OTkxYzUxNWUxNGM5ZmZjZTM2YTlkY2I3ZjU5M2FiMzk5NzBiMmQ3YzdiNmI4M2IyZjA2ZWM3YmI5MjQ2ZGQ4NzIifSwic2VjdXJpdHlUb2tlbiI6eyJpdiI6Ijc4MzdmYzU4NmNhNzYwMTcwNzZiZDYxOGE4ODg3NWU0IiwiY29udGVudCI6ImM4OWYyODBmNDQyYWQyMjUxNDlmZjVhMTBlNDFiOWZiYmIyNjE3OWQ1OGFhNDFkNDU5YzRjNGYyNDk5MmEwNTM0ZjliNTRiMDdlODU2Y2RlMmE2NjgyYWYifSwianRpIjoiN2EzOWY1YTEtZjYxZS00NmZiLWEyYmQtYzhlOTFmMjM3NTJlIiwiaWF0IjoxNzAxNTc4MTc2LCJleHAiOjE3MDE1ODE3NzV9.Pr7FfTWt48cJwvJhMycTao90_74FE0IhuA2aUPvbAng';
    const baseUrl = 'https://api.iq.inrix.com/findRoute';

    const departureCoordinates = '37.770581,-122.442550';
    const destinationCoordinates = '37.765297,-122.442527';

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
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json(); // Assuming the API returns JSON data
        })
        .then(data => {
            // Handle the API response data here
            console.log(data);
         
        })
        .catch(error => {
            console.error('Error fetching API data:', error);
            
        });
});  

app.get("/waittime", async (req, res) => {
    var myHeaders = new Headers();
    myHeaders.append("4fcg10Cphlq1jmEHRAbsBxTFrWYm7ITK", "g9VXBhKbGCy66C0Y");
    const response = await fetch("https://api.flysfo.com/sfo/v1.0/checkpoints/e890e3d4-7a42-11e7-bb31-be2e44b06b34/waittime");
    let output = await response.json()
    console.log(output)
    res.status(200).json(output);

});

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
