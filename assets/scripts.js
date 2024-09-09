// for viewport
var metas = document.getElementsByTagName('meta');
var i;
if (navigator.userAgent.match(/iPhone/i)) {
  for (i=0; i<metas.length; i++) {
    if (metas[i].name == "viewport") {
      metas[i].content = "width=device-width, minimum-scale=1.0, maximum-scale=1.0";
    }
  }
  document.addEventListener("gesturestart", gestureStart, false);
}
function gestureStart() {
  for (i=0; i<metas.length; i++) {
    if (metas[i].name == "viewport") {
      metas[i].content = "width=device-width, minimum-scale=0.25, maximum-scale=1.6";
    }
  }
}

// for typing animation
const content = "Making AI knowledgeable and trustworthy"
/*
    "MAKER: Making AI knowledgeable, Explainable, and Reliable"
    "Because there are no meaningless challenges in the world!"
*/

const txt = document.querySelector(".txt");
let n = 0;

// normal typing
function typing(){
    if (n < content.length) {
    let char = content.charAt(n);
    txt.innerHTML += char === "\n" ? "<br/>": char;
    n++;
    }
}
setInterval(typing, 50)

// loop typing
/*
function typing() {
    txt.innerHTML += content[n++];
    if(n > content.length) {
        txt.innerHTML = "";
        n = 0;
    }
};
setInterval(typing, 30);
*/

// Get the button
let mybutton = document.getElementById("btn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
/*
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
*/

// smooth scroll
function topFunction() {
    window.scrollTo({top: 0, behavior: 'smooth'});
}