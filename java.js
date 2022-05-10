const container=document.querySelector(".container");
content=container.querySelector(".content");
loc=content.querySelector("input");
locationbtn=content.querySelector("button");
// WIcon=document.querySelector(".weather img");
arrowBack=container.querySelector(".weather i");
let api={
    key: "1db97ad9a602230b5432eb99c84e0f9e"
   // base:"https://api.openweathermap.org/data/2.5/"
}
loc.addEventListener("keyup",e=>
{
    if(e.key=="Enter"&& loc.value !=" "){
        requestApi(loc.value);
    }
});
locationbtn.addEventListener("click",()=>{
    if(navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(onSuccess,onError)
    }
    else{
        alert("Your browser do not support geolocation api");
    }
});
function onSuccess(position)
 {
     const{latitude,longitude}=position.coords;
//      api={
//         key:"1db97ad9a602230b5432eb99c84e0f9e",
//         base:"https://api.openweathermap.org/data/2.5/"
//     }
//     fetchData1();

fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${api.key}`)
.then(response => response.json()).then(result=>weatherDetails(result));
 }
function onError(error)
{
    console.log("error");
}


function requestApi(city){
   //    let api={`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${"1db97ad9a602230b5432eb99c84e0f9e"}` ;   }
         
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${api.key}`)
   .then(response => response.json()).then(result=>weatherDetails(result));
}
function weatherDetails(info)
{    if(info.cod=="404")
     console.log("error");
     else{
         const city=info.name;
         const country=info.sys.country;
         const {description,id}=info.weather[0];
         const{ humidity,temp}=info.main;

//          if(id==800){
//          WIcon.src=   "icons/clear.svg";}
// else if(id >= 200 && id <= 232){
//          WIcon.src=   "icons/strom.svg";}
// else if(id >= 600 && id <= 622){
//          WIcon.src=   "icons/snow.svg";}
// else if(id >= 701 && id <= 781){
//            WIcon.src= "icons/haze.svg";}
// else if(id >= 801 && id <= 804){
//           WIcon.src=  "icons/cloud.svg";}
           
// else if((id >= 300 && id <= 321) || (id >= 500 && id <= 531)){
// WIcon.src="icons/rain.svg";}


         container.querySelector(".temp .t").innerText = Math.floor(temp);
         container.querySelector(".hal").innerText = description;
         container.querySelector(".location span ").innerText= `${city},${country}`;
        container.querySelector(".per").innerText=`${humidity}%`;
         container.classList.add("active");
    console.log(info);

}}

// function fetchData()
// {
//     fetch(`${api.base}weather?q=${city}&APPID=${api.key}`)
//     .then(response => response.json()).then(result=>weatherDetails(result));
// }
// function fetchData1()
// {
//     fetch(`${api.base}weather?lat=${latitude}&lon=${longitude}&APPID=${api.key}`)
//     .then(response => response.json()).then(result=>weatherDetails(result));
// }

arrowBack.addEventListener("click",()=>{
    container.classList.remove("active");
    
});