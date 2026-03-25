const owner = "appleorangesleaf"
const repo = "home"

const postsPath = "posts"

const apiURL =
`https://api.github.com/repos/${owner}/${repo}/contents/${postsPath}`

const container =
document.getElementById("blog-container")

const tagContainer =
document.getElementById("tag-filter")

const allTags = new Set()

fetch(apiURL)

.then(res => res.json())

.then(files => {

const htmlFiles =
files.filter(file => file.name.endsWith(".html"))

let loadedCount = 0

htmlFiles.forEach(file => {

fetch(file.download_url)

.then(res => res.text())

.then(html => {

const parser = new DOMParser()

const doc =
parser.parseFromString(html,"text/html")

const title =
doc.querySelector('meta[name="post-title"]')?.content || file.name

const date =
doc.querySelector('meta[name="post-date"]')?.content || ""

const summary =
doc.querySelector('meta[name="post-summary"]')?.content || ""

const tags =
doc.querySelector('meta[name="post-tags"]')?.content || ""

tags.split(",").forEach(tag=>{
if(tag.trim()){
allTags.add(tag.trim())
}
})

const card = document.createElement("div")

card.className = "card"

card.innerHTML = `

<h3>${title}</h3>

<p>${date}</p>

<p>${summary}</p>

<div class="tags">${tags}</div>

<a href="posts/${file.name}">Read</a>

`

container.appendChild(card)

loadedCount++

if(loadedCount === htmlFiles.length){

renderTagButtons()

}

})

})

})

function renderTagButtons(){

if(!tagContainer) return

tagContainer.innerHTML =
`<button onclick="filterTag('all')">All</button>`

allTags.forEach(tag => {

tagContainer.innerHTML +=
`<button onclick="filterTag('${tag}')">${tag}</button>`

})

}

function filterTag(tag){

const cards =
document.querySelectorAll(".card")

cards.forEach(card => {

const tagText =
card.querySelector(".tags")?.textContent || ""

if(tag === "all" || tagText.includes(tag)){
card.style.display = "block"
}else{
card.style.display = "none"
}

})

}
