const ul = document.querySelector(".pokemon")
const loading = document.querySelector(".loading")

function addPokeImage(pokemon) {
    const div = document.createElement("div")
    div.classList.add("pokemon-details")
    div.innerHTML = `
        <figure class="sprite">
            <img src="${pokemon.sprites.front_shiny}" alt="${pokemon.name}" />
        </a>   
        </figure>
        <figure class="sprite">
            <img src="${pokemon.sprites.back_shiny}" alt="${pokemon.name}" />
            <figcaption>${pokemon.name}</figcaption>
        </a>   
        </figure>
        `
    ul.append(div)
}

function addPokeAbility(ability) {
    const li = document.createElement("li")
    const flavor_text = (ability.flavor_text_entries)
        .find(flavor_text_entry => flavor_text_entry.language.name === "en")
    li.innerHTML = `
        <span class="ability-name">${ability.name}</span>
        <span class="ability-short-description">${flavor_text.flavor_text}</span> 
    `
    ul.append(li)
}

const queryString = new URLSearchParams(window.location.search)
fetch(`https://pokeapi.co/api/v2/pokemon/${queryString.get("pokemon")}`)
    .then(response => {
        return response.json()
    }).then(pokemon => {
        const abilitiesRequests = pokemon.abilities
            .map(ability => ability.ability.url)
            .map(url => {
                return fetch(url).then(response => response.json())
            })
        Promise.all(abilitiesRequests).then(abilities => {
            abilities.forEach(ability => {
                addPokeAbility(ability)
            })
        })
        addPokeImage(pokemon)
    })

