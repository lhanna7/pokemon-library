const app = document.querySelector(".pokemon-details")
const ul = document.querySelector(".abilities")
const loading = document.querySelector(".loading")

function addPokeImage(pokemon) {
    const div = document.createElement("div")
    div.innerHTML = `
        <figure>
            <img src="${pokemon.sprites.front_shiny}" alt="${pokemon.name}" />
            <figcaption>${pokemon.name}</figcaption>
        </a>   
        </figure>
        `
    app.append(div)
}

function addPokeAbility(pokemon) {
    const li = document.createElement("li")
    const flavor_text = (pokemon.flavor_text_entries)
        .find(flavor_text_entry => flavor_text_entry.language.name === "en")
    li.innerHTML = `
        <span class="ability-name">${pokemon.name}</span>
        <span class="ability-short-description">${flavor_text.flavor_text}</span> 
    `
    ul.append(li)
}

const url = new URL(window.location)
const queryString = new URLSearchParams(url.search)
fetch(`https://pokeapi.co/api/v2/pokemon/${queryString.get("pokemon")}`)
    .then(response => {
        return response.json()
    }).then(response => {
        const showAbilities = response.abilities
            .map(response => response.ability.url)
            .map(url => {
                return fetch(url).then(response => response.json)
            })
        console.log(response)
        return Promise.all(showAbilities)
    }).then(responses => {
        loading.classList.add("hidden")
        responses.forEach(response => {
            addPokeAbility(response)
        })
            .catch((error) => {
                const p = document.createElement("p")
                p.textContent = "Oops! Let's try that again..."
                document.querySelector(app).append(p)
            })
    })
