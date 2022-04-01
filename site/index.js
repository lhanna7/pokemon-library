const app = document.querySelector(".pokemon")
const url = "https://pokeapi.co/api/v2/pokemon?limit=50"
const loading = document.querySelector(".loading")

function addPokeImage(pokemon) {
    const div = document.createElement("div")
    div.innerHTML = `
        <a href="pokemon.html?pokemon=${pokemon.name}">
            <img src="${pokemon.sprites.front_shiny}" alt="${pokemon.name}" />
        </a>   
        `
    app.append(div)
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
            addPokeImage(response)
            loading.classList.add("hidden")
        })
    })


