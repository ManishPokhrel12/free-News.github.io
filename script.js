let currentPage = 1;
let newsContainer = document.querySelector(".newsContainer");
let previous = document.getElementById('previous');
let next = document.getElementById('next');
let url;
let pagesize = 5;
let category = 'tesla';

// https://newsapi.org/v2/everything?q=tesla&from=2022-02-16&sortBy=publishedAt&apiKey=9ad590cfaabc4b07903eea472c5e090d
async function fetchNews(){
		if(currentPage == 1){
				previous.setAttribute("disabled", "true")
				previous.style.cssText += "cursor: not-allowed; background: black;color: white"

		}
		else{
			previous.removeAttribute("disabled", "")
			previous.style.cssText += "cursor: pointer; background: red;color: white"
		}
	url = `https://newsapi.org/v2/everything?q=${category}&from=2022-02-16&sortBy=publishedAt&apiKey=adeb9b98391f4c08bc8b2272ee997533&page=${currentPage}&pagesize=${pagesize}`;
	loadingAnimation.classList.add("loader")
	let news = await fetch(url);
	let url2 = await news.json();
	console.log(url2)
	loadingAnimation.classList.remove("loader");
	if(url2.status != "error"){
	createElem(url2);
	next.style.cssText += "cursor: pointer; background: red;color: white"
	next.removeAttribute("disabled","")
}
else{
	next.setAttribute("disabled","")
	next.style.cssText += "cursor: not-allowed; background: black ;color: white";
	}

}
function createElem(val){
	let articleLength = val.articles.length;
for(let i = 0; i < articleLength; i++){
	let div = document.createElement("div");
	div.classList.add("newsItem");
	let image = document.createElement("img");
	image.src  = val.articles[i].urlToImage
	let h1 = document.createElement("h1");
	h1.innerHTML = val.articles[i].title.slice(0, 60) + "...";
	let p = document.createElement("p");
	p.innerHTML = val.articles[i].description.slice(0, 120) + "...";
	let urlElem = document.createElement("a");
	urlElem.innerHTML = "Show More";
	urlElem.setAttribute("href" , val.articles[i].url);
	urlElem.setAttribute("target" , "blank")
	let newsItem = document.querySelector(".newsItem");
	div.appendChild(image)
	div.appendChild(h1)
	div.appendChild(p)
	div.appendChild(urlElem)
	newsContainer.appendChild(div)

}
}


// for removing child and make mainContainer Blank to avoid the page reload..
function remove(){
	let newsItem = document.querySelectorAll(".newsItem");
	for(let i of newsItem){
		newsContainer.removeChild(i);
		}
}


function controller(val){
	
	currentPage = currentPage + val
	url = `https://newsapi.org/v2/everything?q=${category}&from=2022-02-16&sortBy=publishedAt&apiKey=adeb9b98391f4c08bc8b2272ee997533&page=${currentPage}&pagesize=${pagesize}`;
		remove()
		fetchNews();
}

// Change the category of news
function changeTopic(topicName){
remove()
category = topicName;
fetchNews();
}
fetchNews()

let nav = document.querySelector("nav")
let close = document.querySelector("#close")
menu.addEventListener("click" , () => {
	nav.style.left = 0;
})
close.addEventListener("click" , () => {
	nav.style.left = "-50%";
})