const container=document.querySelector(".container");
const selectseat=document.querySelectorAll(".row .seat:not(.occupied)");
const count=document.querySelector("#count");
const total=document.querySelector("#total");
const movieselect=document.querySelector("#select");
let ticketprice=+movieselect.value;

populateUI();



function updateseatcount() {
const selectedseat=document.querySelectorAll(".seat.selected");
const selectseatcount=selectedseat.length;

const selectseatindex=[...selectedseat].map(function(seat){
  return [...selectseat].indexOf(seat);
})

localStorage.setItem("selectseatindex",JSON.stringify(selectseatindex));
count.innerText=selectseatcount;
total.innerText=selectseatcount*ticketprice;
}

function populateUI(){
const selectedseats=JSON.parse(localStorage.getItem("selectseatindex"));

if(selectedseats!==null && selectedseats.length>0){

selectseat.forEach((seat, index) => {
if(selectedseats.indexOf(index)>-1){
  seat.classList.add("selected");
}
});
}

const selectmovieindex=localStorage.getItem("movieindex");

if(selectmovieindex!==null) {
  movieselect.selectedIndex=selectmovieindex;
}
}



function setmovieindex(movieindex,movieprice) {
localStorage.setItem("movieindex",movieindex);
localStorage.setItem("movieprice",movieprice);

}


//select event

movieselect.addEventListener("change", (e)=> {
  ticketprice=e.target.value;
  setmovieindex(e.target.selectedIndex,e.target.value);
  updateseatcount();
})



//seat event
container.addEventListener("click",(e)=>{
if(e.target.classList.contains("seat") && !e.target.classList.contains("occupied")) {
e.target.classList.toggle("selected");
}
updateseatcount();
})

updateseatcount();
