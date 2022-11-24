let label = document.getElementById('label');
let shoopCart = document.getElementById('shopping-cart');

let basket = JSON.parse(localStorage.getItem("data")) || [];

let calculation = () => {
	let CartIcon = document.getElementById('cartAmount');

	CartIcon.innerHTML = basket.map((x) => x.item).reduce((x,y) => (x+y),0);
};

calculation();

let TotalCopias = () => {
  let total = document.getElementById('total');
  total.innerHTML = basket.map((x) => x.item).reduce((x,y) => (x+y),0);
};
TotalCopias();


let generateBtn = () => {
  let divbtn = document.getElementById('div-btn');
  if (basket.length !==0) {
        return divbtn.innerHTML = `
      <button onclick="" class="print">Imprimir</button>                
      <button onclick="clearCart()" class="removeAll">Limpiar lista</button>    
        `
  }else return
}


let generateCartItem = () => {
	if (basket.length !==0) {
    return (shoopCart.innerHTML = basket.map((x) => {
        let { id, item } = x;
        let search = itemData.find((y) => y.id == id) || [];
        return `
      <div class="cart-item">
        <img class ="cart-img" src=${search.img} alt="${search.alt} " />
        <div class="details">
          <div class="title-price-x">
              <h4 class="title-price">
                <p>${search.name}</p>
              </h4>
              <span onclick="removeItem(${id})" class="material-symbols-outlined btnRemove">close</span>              
          </div>
          <div class="buttons">
              <span onclick="increment(${id})" class="material-symbols-outlined btnAdd">add</span>
              <div  id="${id}" class="quantity">${item}</div>
              <span onclick="decrement(${id})" class="material-symbols-outlined btnRemove">remove</span>              
          </div>
          <h3> ${search.price}MB</h3>
        </div>
      </div>
      `;
      })
      .join(""));
	}else{
		shoopCart.innerHTML = ``
		label.innerHTML = `
	    <h2>Sin documentos para imprimir</h2>
	    <a href="index.html">
	      <button class="HomeBtn">Regresar</button>
	    </a>
	    `;
        let divbtn = document.getElementById('div-btn');
      divbtn.innerHTML = "";
	}
}
  generateCartItem();
  generateBtn();

let increment = (ide) => {
  let searchBasket = basket.find((x) => x.id === ide );

  if(searchBasket == undefined){
  basket.push({
    id: ide,
    item:1,
    }); 
}else{
  searchBasket.item += 1;
}
  generateCartItem();
  generateBtn();
  update(ide);  
  localStorage.setItem("data", JSON.stringify(basket));
  TotalCopias();
  };  


let decrement = (ide) => {
  let searchBasket = basket.find((x) => x.id === ide );
  if (searchBasket === undefined) return
  if(searchBasket.item === 0)return;
  else{
    searchBasket.item -= 1;
  }
  update(ide);  
  basket = basket.filter((x) =>x.item !=0);
   generateCartItem();  
   generateBtn();
  localStorage.setItem("data", JSON.stringify(basket));
  TotalCopias();
  };

let update = (ide) => {
  let searchBasket = basket.find((x) => x.id === ide );
  //console.log(searchBasket);
  document.getElementById(ide).innerHTML = searchBasket.item;
  calculation();
  TotalCopias();
  generateBtn();
};

let removeItem = (ide) => {
  basket = basket.filter((x) => x.id !== ide);
  generateCartItem();  
  localStorage.setItem("data", JSON.stringify(basket));
  TotalCopias();
  calculation();
  generateBtn();
};

let clearCart = () => {
  basket = [];
  generateCartItem();
  localStorage.setItem("data", JSON.stringify(basket));
  let total = document.getElementById('total');
  total.innerHTML = 0;
  let CartIcon = document.getElementById('cartAmount');
  CartIcon.innerHTML = 0;
  let divbtn = document.getElementById('div-btn');
  divbtn.innerHTML = "";
};