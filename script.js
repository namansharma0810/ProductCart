const inp=document.querySelector(".sa");
const srcbtn=document.querySelector(".src");
const mainpage=document.querySelector(".mmore");
const banner=document.querySelector(".banner");
const searchresultcont=document.querySelector(".search-results-container")



const API_URL = "https://dummyjson.com/products?limit=300";
const productList = document.querySelector(".productList");
searchresultcont.classList.add("hide");


let products = [];
let filterProducts = [];
let mainProducts=[];

srcbtn.addEventListener("click",(e)=>{
    srcproduct();
})

function displayProducts(products){
    productList.innerHTML = "";
    
    for(let pro of products){
        const div=document.createElement("div");
        div.classList.add("card");
        div.innerHTML=`
               <img src=${pro.images[0]} alt="${pro.title}">
               <p class="category">${pro.category}</p>
               <h2>${pro.title}</h2>
               <p class="desc">${pro.description}</p>
               <p class="price">$${pro.price}</p>
               <p class="rating">⭐${pro.rating} / 5</p>
               <button class="butsignin addcartbut">Add to Cart</button>`

        productList.appendChild(div);
    }
    mainpage.classList.add("hide");
    banner.classList.add("hide");
    searchresultcont.classList.remove("hide");
    
}

async function srcproduct(){
    if(inp.value==""){
        alert("Enter the name of item.")
    }
    else{
        let val=inp.value.trim();
        const url = "https://dummyjson.com/products/search?q=";
        const apiurl=url+val;
        inp.value="";
    
        try{
            let res=await fetch(apiurl);
            const data=await res.json();

            console.log(data);
            products=[...data.products];
            displayProducts(products);
        }
        catch(error){
            console.log(error)
        }
        
        
    }
}
async function allproduct(){
    try{
        const res=await fetch(API_URL);
        const data=await res.json();

        mainProducts=[...data.products];
    }
    catch(error){
        console.log(error);
    }
}
allproduct();

inp.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        srcproduct();
    }
});


const sel = document.querySelector("#sel");

sel.addEventListener("change", () => {
    sortprod(sel.value);
});


function sortprod(val) {

    // Make a copy of current products
    filterProducts = [...products];
    // console.log(filterProducts);


    // Price: High → Low
    if (val === "Price high to low") {

        filterProducts.sort((a, b) => {
            return b.price - a.price;
        });

    }


    // Price: Low → High
    else if (val === "Price low to high") {

        filterProducts.sort((a, b) => {
            return a.price - b.price;
        });

    }


    // Rating: High → Low
    else if (val === "Rating high to low") {

        filterProducts.sort((a, b) => {
            return b.rating - a.rating;
        });

    }


    // Rating: Low → High 
    else if (val === "Rating low to high") {

        filterProducts.sort((a, b) => {
            return a.rating - b.rating;
        });

    }
    else if(val === "sort"){
        filterProducts = [...products];
    }
    else if(val === "all"){
        filterProducts=mainProducts;
     }
    else{
        filterProducts=products;
    }
    

    // Display sorted products
    displayProducts(filterProducts);
}



const categorySelect = document.querySelector(".all");

categorySelect.addEventListener("change", (e) => {
    const selectedValue = e.target.value;
    
    // If "All" is selected, display all main products
    if (selectedValue === "All") {
        products = [...mainProducts]; 
        displayProducts(products);
    } 
    
    else {
        inp.value = selectedValue;
        srcproduct();
    }
});