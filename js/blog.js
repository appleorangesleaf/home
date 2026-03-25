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

let posts = []

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

const tags =
doc.querySelector('meta[name="post-tags"]')?.content || ""

tags.split(",").forEach(tag=>{
if(tag.trim()){
allTags.add(tag.trim())
}
})

posts.push({
title,
date,
summary,
tags,
file:file.name
})

renderPosts()

renderTagButtons()

})

})

})

function renderPosts(filter="all"){

container.innerHTML=""

let sorted = [...posts]

/* sort newest first by default */

sorted.sort((a,b)=>
new Date(b.date) - new Date(a.date)
)

sorted.forEach(post=>{

if(filter==="all" || post.tags.includes(filter)){

const card=document.createElement("div")

card.className="card"

card.dataset.date=post.date
card.dataset.title=post.title

card.innerHTML=`

<h3>${post.title}</h3>

<p>${post.date}</p>

<p>${post.summary}</p>

<div class="tags">${post.tags}</div>

<a href="posts/${post.file}">Read</a>

`

container.appendChild(card)

}

})

}

function renderTagButtons(){

if(!tagContainer) return

tagContainer.innerHTML=
`<button class="active" onclick="filterTag('all')">All</button>`

allTags.forEach(tag=>{

tagContainer.innerHTML+=
`<button onclick="filterTag('${tag}')">${tag}</button>`

})

}

function filterTag(tag){

renderPosts(tag)

document
.querySelectorAll(".tag-filter button")
.forEach(btn=>btn.classList.remove("active"))

document
.querySelector(`.tag-filter button[onclick="filterTag('${tag}')"]`)
?.classList.add("active")

}

function sortPosts(type){

let sorted=[...posts]

if(type==="new"){

sorted.sort((a,b)=>
new Date(b.date) - new Date(a.date))

}

if(type==="old"){

sorted.sort((a,b)=>
new Date(a.date) - new Date(b.date))

}

if(type==="title"){

sorted.sort((a,b)=>
a.title.localeCompare(b.title))

}

container.innerHTML=""

sorted.forEach(post=>{

const card=document.createElement("div")

card.className="card"

card.innerHTML=`

<h3>${post.title}</h3>

<p>${post.date}</p>

<p>${post.summary}</p>

<div class="tags">${post.tags}</div>

<a href="posts/${post.file}">Read</a>

`

container.appendChild(card)

})

}
