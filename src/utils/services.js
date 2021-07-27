
const getData = (url) => {
    return fetch(
        url,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }
    ).then(response => {
        if(response.ok) {
            return response.clone().json();
        }
        else {
            throw new Error(response.statusText);
        }
    }).catch(error => {
        alert(error.message);
    });
}
export default getData;