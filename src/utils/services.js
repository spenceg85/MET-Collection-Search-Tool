const getData = (url) => {
    return fetch(
        url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }
    )
}
export default getData;