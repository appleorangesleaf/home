const owner = "appleorangesleaf"
const repo = "home"

const postsPath = "posts"

const apiURL =
`https://api.github.com/repos/${owner}/${repo}/contents/${postsPath}`

const container =
document.getElementById("blog-container")

fetch(apiURL)

.then(res => res.json())

.then(files => {

files
.filter(file => file.name.endsWith(".html"))

.forEach(file => {

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

const card = document.createElement("div")

card.className = "card"

card.innerHTML = `

<h3>${title}</h3>

<p>${date}</p>

<p>${summary}</p>

<a href="posts/${file.name}">Read</a>

`

container.appendChild(card)

})

})

})