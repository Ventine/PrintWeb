let shop = document.getElementById("shap");

let basket = JSON.parse(localStorage.getItem("data")) || [];



let generateShop = () => {
	return (shop.innerHTML = itemData.map((x) => {
		let {id, name, price, desc, img, alt} = x;
		let search = basket.find((y) => y.id == id) || [];	
		return `
		<div class="item" id="document-${id}">
				<img src="${img}"  alt="${alt}">
				<div class="details">
					<h3>${name}</h3>
					<p>${desc}</p>
					<div class="price-quantity">
						<h2>${price} MB</h2>
						<div class="buttons">
							<span onclick="increment(${id})" class="material-symbols-outlined btnAdd">add</span>
							<div  id="${id}" class="quantity">${search.item === undefined ? 0: search.item}</div>
							<span onclick="decrement(${id})" class="material-symbols-outlined btnRemove">remove</span>
						</div>
					</div>
				</div>
			</div>`;
	}).join(""));
};

generateShop();

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
	localStorage.setItem("data", JSON.stringify(basket));
	update(ide);	
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
	localStorage.setItem("data", JSON.stringify(basket));

	};

let update = (ide) => {
	let searchBasket = basket.find((x) => x.id === ide );
	//console.log(searchBasket);
	document.getElementById(ide).innerHTML = searchBasket.item;
	calculation();
};

let calculation = () => {
	let CartIcon = document.getElementById('cartAmount');

	CartIcon.innerHTML = basket.map((x) => x.item).reduce((x,y) => (x+y),0);
};

calculation();