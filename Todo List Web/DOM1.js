// let button = document.createElement("button");
// button.innerText="click me";
// button.style.backgroundColor="red";
// button.style.color="white";
// let body = document.querySelector("body")
// body.prepend(button);

// let paragraph = document.querySelector(".para")
// paragraph.classList.add("para1")
// let div = document.querySelector("div")
// div.onmouseover = (e)=>{
//   console.log(e)9
//   console.log("YOu are inside div");
// }

// button.addEventListener(onclick,()=>{
//   console.log("Button 1 was clicked")
// })
let button = document.querySelector("body")
let mode = "light"

button.addEventListener("click",()=>{
  if(mode === 'light'){
    mode = "dark"
    document.querySelector('body').style.backgroundColor= "black"
  }
  else{
    mode = "light"
    document.querySelector('body').style.backgroundColor = "white"
  }
})