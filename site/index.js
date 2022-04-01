const app = document.querySelector(".pokemon")
const url = "https://pokeapi.co/api/v2/pokemon?limit=50"

function addPokeImage(url) {
    const img = document.createElement("img")
    img.src = url
    app.append(img)
}

fetch(url)
    .then(response => {
        return response.json()
    }).then(parsedResponse => {
        const urls = parsedResponse.results.map(result => result.url)
        const fetches = urls.map(url => fetch(url).then(response => response.json()))
        return Promise.all(fetches)
    }).then(responses => {
        responses.forEach(response => {
            addPokeImage(response.sprites.front_shiny)
        })
    })

