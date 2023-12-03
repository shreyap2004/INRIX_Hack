const express = require('express');
const cors = require('cors');
const authUtils = require('./utils/authUtils.js');
const calculations = require('./calculations/calculations.js');

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

    const authToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhcHBJZCI6IjdudWRic2U1ODEiLCJ0b2tlbiI6eyJpdiI6IjY5ZGIzMjY3ZTg1OTk4MWIwNjk5ODFlYjBhMDdjZGVkIiwiY29udGVudCI6ImJhYTRlNDRmYTIxMzdjOTNhNDUyZWZhYzEwNGRkZWI2ZmVmODZjZTNkMzdjZGFmNDkzODQ4YWFhYWJkZGUyMDk2M2JhY2FiY2JiODNiMjA4NGIyZjkwMDcwYTdlNTRjZGQ5MDExODZkYWJiNzczZGY5YmJmZTk4NTdmNTdmZWI3MzYxMzE4YzRkYWIzNzg2NmM2MGY4Zjc2ZmRhMjljMzE1NzgyNTZhYWQ3ZTFlYzRkYzc5MzBkODA4ODQxNmU5MTkxYjg2NzNmMjQzMzA0ZjlmNGNmZGFlOTc4N2YzYzRkOTNhMDMyYjY5NzI2NGJhMWMwNDBjNWMzNzhkMDJiZWQzZGZlMmQzNzVkNjU5NmJjY2RmMGI1MWFjN2EzM2UzYWRhMmEzMTZjNDkyMDFkMDI3ODIwNjExMTNhZmRlZThiMTUxNmZlNjc3YTI2MWRjOTUzYmU0MjQ3MDQyZGU1YTYzZmI4OWY0ZTE4ZjYzMGMyMTg2ODY3NDgxMTgzYmZiZDA0ZGRhZTNiZDViZWVhMzc1MmJkOTI2YTU0OTNiNGQxMGY3Y2YwNTFjYWQ1YTJjZjk3NTdiODg0MDI1YjUzOWE0NThiNTE5YTJlNmNjZWE1NTJiZTdmYjQyNTQ0ZjU0ZGE4MWQxMTVmNjBjNmJmYWU0NmU1NmIyNDU2M2VkN2Q0OTBkOGI5MWQwOWZkZmI0ZTJhOTJjYjMxYTRiMmQ2OTU3OGJmZjk5NzBmYTg4M2FkZDhjMTM3ZTQyMDU1MTU4NWNjMDY0MDFmMDEzODUzMWFiYzg3NzRiOGMwZGY3MTEyMjYxZjg3MzZlZTY4YTYyYzJkZWFkOWMyMmY3ZDhlNzBhZWQwYTllZTNmYTQxNTAyYWM2OTAxIn0sInNlY3VyaXR5VG9rZW4iOnsiaXYiOiI2OWRiMzI2N2U4NTk5ODFiMDY5OTgxZWIwYTA3Y2RlZCIsImNvbnRlbnQiOiI4N2FmY2M3ZGI5M2E3YmI4YWUwM2Q1OWQ2ODQzZmZlMWM1YTc0MmQ3Y2QyYWJiYjdiZmVhOTdmOGM4ZWVhNTYxNjM5YmNlYjBmNmE4YWE2ZjQyMWM4OTM5In0sImp0aSI6IjIxZGVkMDc5LWQ3MGItNDBkNy04MGRhLTllOGExOTI2NzRmNyIsImlhdCI6MTcwMTU4MjEwMywiZXhwIjoxNzAxNTg1NzAzfQ.B39WP0-mXDrbXTdXwuaLMht9FiwhYZ7Nr2A8Jzt_L9I';
    const baseUrl = 'https://api.iq.inrix.com/findRoute';

    const departureCoordinates = '37.75961056112695,-122.45156188050721';
    const destinationCoordinates = '37.76417378028334, -122.45249927923439';

    const queryParams = new URLSearchParams({
        wp_1: departureCoordinates,
        wp_2: destinationCoordinates,
        format: 'json',
    });

    const apiUrl = `${baseUrl}?${queryParams}`;

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
            res.send(data);
        }).catch(err=>{
            console.error('Error Message: ', err);
        })
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
