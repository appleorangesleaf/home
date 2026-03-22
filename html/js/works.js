fetch("data/works.json")
.then(response => response.json())
.then(data => {

const container = document.getElementById("works-container")

data.forEach(work => {

const card = document.createElement("div")
card.className = "card"

card.innerHTML = `
<img src="${work.image}">
<h3>${work.title}</h3>
<p>${work.description}</p>
<a href="${work.link}" target="_blank">Open</a>
`

container.appendChild(card)

})

})