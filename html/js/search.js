function searchItems(){

const input =
document.getElementById("searchInput")
.value
.toLowerCase()

const cards =
document.querySelectorAll(".card")

cards.forEach(card=>{

const text =
card.innerText.toLowerCase()

if(text.includes(input)){

card.style.display="block"

}else{

card.style.display="none"

}

})

}