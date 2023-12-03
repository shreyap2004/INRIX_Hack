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

    const authToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhcHBJZCI6IjdudWRic2U1ODEiLCJ0b2tlbiI6eyJpdiI6ImFiZjE0MTdjM2NmZTMyY2YwNTQwZjcxZTlmYTg3MDc0IiwiY29udGVudCI6IjllZDg5N2ExOTcxNmJkZmQ0MGVhNjAwNThiYTNjMGNhZTZhNmI1NTZhZGQ5MWFlOWI1YTczM2FiNGM0MDYwOWJiNDYzNGQ0MTJhMjViMmM5NWQwZmJhZTE5MDk1MjgzMGVjOTI5MmM1MjA1OWRmM2JhOTY4MDg4OWVkMDA2M2FhMDE0Zjk4NWQwMzY0NDkzZDZkY2NkYzhkNWI1NDViZmY3N2Y4Nzg3YTNiN2ViNDM5YTY3MWI2ZjA5NTFjYjg1Yzk2MjljNTg3MDA5OTVmZTZiMGM0NzRmMzc4OTI3NDM2MGYzZDNjNjRlMTkxMjZlMzFiODQ4MDM3OTFmYTdhMTFkZDg0Y2E4YjBjZTE5M2JiYmJmMTU4MWVkNDZmYTlmZGVhOWUwNzljNWU2YjFlYTAzYjZjMjM3NjU5MWU5Y2U0ZWI1Yzc5ZGJiNWQyNzIyNThlZTBkMzJiNDBjOGJkM2UzZjA0ODgzODY2ZTFmZmI1Y2IxYTZhZThjZDM1NGVlOWJhYzAzOTE0ODM4NDg3YmU3NDAwZjA2NzdkMTFhYzQxNDZjODEzNzc0NWY3Mjk3NjVkOGYwMjVmMGJlNTAwNmQxOTBhMzc5NWNiOWIwNjU1YWU1YTJmMzYzZTViNTA2M2IxOTUyODA4NDUxYTBhZWQ3YTdhOTNjNGRjNjJkMzViM2MyMDgzNmUwYmQ0M2UwYzQ4OWI2ZmJmZDQxMTNjZDU0ZGYxNTQzYmI2MjlmNzM0Y2JkMWQ3NmZiOThiOTQ2MjdhYzMzZDI5N2E5ZGNlZjgyNzY2YTVlMzdjMTRlN2VjM2E4NWZlODA4MTZiNGE3NDNmYTUxMzRkMWExMjZhZjA5ZGFlOWE0MmE2Y2UzYzhjZDdmYzhmIn0sInNlY3VyaXR5VG9rZW4iOnsiaXYiOiJhYmYxNDE3YzNjZmUzMmNmMDU0MGY3MWU5ZmE4NzA3NCIsImNvbnRlbnQiOiI5MGQzYTU5MTgyMzk5NGY1NzhjZjRjMDdiMWUxZDk4ODlhODViNzZhYmM4NjcwOTU5MzkxNGJlNDc3NDgyNWY3ODk0Yzc1MmM2YzM3YjllMjAyMjFiM2RmIn0sImp0aSI6ImQ4NzQ4MjRlLTUxZjUtNDE2NC05M2QyLWM3MDFhNDczOGQxNyIsImlhdCI6MTcwMTU3MjM1MCwiZXhwIjoxNzAxNTc1OTQ5fQ.YwQhcJOP3IYQ3LUCEs4EGZFTnIFOGke8IMzvw5YtHPc';
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

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
