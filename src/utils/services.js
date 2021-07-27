
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
            console.log(response)
            throw new Error(response.statusText);
        }
    })
}
export default getData;