const URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024-03-06/v1/currencies";

/*const getFacts= async() => {
    let response = await fetch(URL);
    console.log(response);
    let data = await response.json();
    console.log("Values are",data["date"]);
    for(let currCode in data){
        console.log(currCode);
    }
}*/

const dropdowns= document.querySelectorAll(".dropdown select");

const btn= document.querySelector("button");

const fromCurr=document.querySelector("#FROM select");
const toCurr=document.querySelector("#TO select");

let para=document.querySelector("#getExchange p");

for(let selects of dropdowns){
    for(let currCode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
        if(selects.name==="to" && currCode==="INR")
            newOption.selected="select";
        if(selects.name==="from" && currCode==="USD")
            newOption.selected="select";
        selects.append(newOption);
    }

    selects.addEventListener("change",(evt) => {
        changeFlag(evt.target);
    })
}

const changeFlag=(evnt) => {
    let currCode=evnt.value;
    let countryCode= countryList[currCode];
    let sym= `https://flagsapi.com/${countryCode}/shiny/64.png`;
    let img= evnt.parentElement.querySelector("img");
    img.src=sym;
}

btn.addEventListener("click", (evt)=>{
    evt.preventDefault();
    currencyConversion();
});

const currencyConversion= async () => {
    let amt=document.querySelector(".input-val input");
    let amtVal= amt.value;
    if(amtVal === "" || Number(amtVal) < 1){
        amtVal=1;
        amt.value="1";
    }
    const url= `${URL}/${fromCurr.value.toLowerCase()}.json`;
    let response= await fetch(url);
    let val= await response.json();
    let output= val[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    para.innerText= `${amtVal} ${fromCurr.value} = ${amtVal*output} ${toCurr.value}`; 
}

window.addEventListener("load",()=>{
    currencyConversion();
})