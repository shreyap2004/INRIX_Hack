document.addEventListener('DOMContentLoaded', function () {
    const getTokenLink = document.getElementById('getTokenLink');
    const tokenContainer = document.getElementById('token-container');

    getTokenLink.addEventListener('click', function (event) {
        event.preventDefault();
        tokenContainer.style.display = 'block';

        fetch('/getToken')
            .then(response => response.json())
            .then(data => {
                tokenContainer.innerHTML = `<h4>This is your Auth Token which you can use to fetch real data from INRIX:</h4>\n ${data.message}`;
            })
            .catch(error => console.error('Error fetching API token:', error));
    });
    
        // getTokenLink.addEventListener('click', function (event) {
        //     event.preventDefault();
        //     tokenContainer.style.display = 'block';
    
        //     const authToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhcHBJZCI6IjdudWRic2U1ODEiLCJ0b2tlbiI6eyJpdiI6IjJiYjUwMDUyNmViYTU5ZTc0YzY1YzkxMzQ5YmZmMDk5IiwiY29udGVudCI6ImQ0ZDk0YzFiYmI0Njg3ZGEzY2UzNjRlYWQ3M2VjOTgxOGRhNjVjM2JkNDFlYWI4NjAxZTE3NzM1ZDU3NGMyMzRlNzk3YmM4ZWM0NTVkZjI2N2NhZWJhZDAyNzhkYmMwOGYyZWQxZmMxN2IxMjEyZjhiNmM5ZjBiNjEyNmQxYWVkNzdkZWFiYzBkNmY0ZTdhYzMxNzQ0NDJhZWQxMzUxYjhkMTA1YjBkNTg0ODMxM2NiZjcxNjQ1ZjM1YTNiYjM4MGY4ODdhZGUxZWEzYTJlYmZlZjgyYjRlZmFmOTJlY2Y3ZmZiYjczMDAxOGJlY2M4MDI1MjA0YzIyZDVhZjNkNDNiNDFjMDNmODJhYzkxM2Y2ZjFjOTNlZDZmYzZjOWYxNmIzZDliNDdhNjQ0YzFhNGUxYTIyOTZkYmIzZWExMzhjMjAwZTgzMTE4NWRlNTk4NTFmMjZlMDRjNjBlZGFlMTQwOGNhOGYyZGRiMTQ3MTY4MmVkY2Q3ZDkzYmQ4ODVmMGExZDkyNWVlZGVlNjRlMDY2ZTcyM2VkNTZiYzE5ZGFmYzFkYjM3ZDdmNWJhYTkyZmI1OTQ4NjNkZWRjNzkxNWJiMGY1ZTc5ZjJiOTNkYzQyN2E1MmEyYTViMjQ0M2M3ODFjYWMyZGE4Y2Y3YTJjODA1MDY0MzBmMWNkZTQ0ZDgzNTRmNmQxYjgwMTJkNDVlZjlhNWY0ODgzODkyM2E5ODdiNzg3MDAyNWZmMzc2MDEzMGQwM2ViMTM0NGQwMWM0ODkzOWI3NWY5YmMwMjgyYzA0Zjc2M2JlMGUzM2Q1ZTY1OGVlZDk2NDMzMzY4N2NiMjMzMTE2MzYzY2U3MDExYjY3YjE4N2ZhYzRkZDE2MGI3ZmUwZWJlIn0sInNlY3VyaXR5VG9rZW4iOnsiaXYiOiIyYmI1MDA1MjZlYmE1OWU3NGM2NWM5MTM0OWJmZjA5OSIsImNvbnRlbnQiOiJmOThhN2M0MmEzNDhhZmVhMDlmOTQyOWJiYTA3Yjk4ODhlODg0MDYyYzUzOWFmZTkyNmY1NDY1M2Y3NWFmNTA4Zjc5MWM1ZDA4NjA2ZmUxOTdmZmViZmVlIn0sImp0aSI6IjFjNDIxOWU1LWVmZmYtNDNkZS1hZDJmLTk4YjNiM2VkZDUxOCIsImlhdCI6MTcwMTU1NDI3OSwiZXhwIjoxNzAxNTU3ODc5fQ.FDICVVrEaNBMbiuJaJH2Q5cvzz0-cXOl2kWVRB7rjmk';
        //     const baseUrl = 'https://api.iq.inrix.com/findRoute';

        //     const departureCoordinates = '37.6596548,-122.4398569';
        //     const destinationCoordinates = '37.615223,-122.389977';

        //     const queryParams = new URLSearchParams({
        //         wp_1: departureCoordinates,
        //         wp_2: destinationCoordinates,
        //         format: 'json',
        //     });

        //     const apiUrl = `${baseUrl}?${queryParams}`;

        //     const requestOptions = {
        //         method: 'GET',
        //         headers: {
        //             Authorization: `Bearer ${authToken}`,
        //         },
        //     };
    
        //     fetch(apiUrl, requestOptions)
        //         .then(response => {
        //             console.log("Hiii!!");
        //             if (!response.ok) {
        //                 throw new Error(`HTTP error! Status: ${response.status}`);
        //             }
        //             return response.json(); // Assuming the API returns JSON data
        //         })
        //         .then(data => {
        //             // Handle the API response data here
        //             console.log(data);
        //             console.log("Hiii!!");
        //             tokenContainer.innerHTML = `<h4>API Response:</h4>\n<pre>${JSON.stringify(data, null, 2)}</pre>`;
        //         })
        //         .catch(error => {
        //             console.error('Error fetching API data:', error);
        //             tokenContainer.innerHTML = `<h4>Error:</h4>\n<p>${error.message}</p>`;
        //         });
        // });    
});
