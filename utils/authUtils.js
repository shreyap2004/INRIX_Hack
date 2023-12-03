const express = require('express');
const router = express.Router();
const axios = require('axios');

const HASH_TOKEN = 'N251ZGJzZTU4MXxsaGJHUlFIN2FaNmxQNzA3U3ZtdnI5cFJ6OThuWWN2QzNvQ3NZdzg0';
const APP_ID = '7nudbse581';
const TOKEN_URL = 'https://api.iq.inrix.com/auth/v1/appToken';

// Define a route for the '/getToken' endpoint
router.get('/', async (req, res) => {
    try {
        // Make a GET request to the INRIX token endpoint
        const response = await axios.get(TOKEN_URL, {
            params: {
                appId: APP_ID,
                hashToken: HASH_TOKEN,
            },
        });
        // Extract the token from the response
        const token = response.data.result.token;
        // Send the token in the JSON response
        res.status(response.status).json({ message: token });
    } catch (error) {
        // Handle errors and send an error message in the JSON response
        res.status(500).json({ message: `Request failed with error: ${error.message}` });
    }
});


// Export the router to be used in the main Express app
module.exports = router;
