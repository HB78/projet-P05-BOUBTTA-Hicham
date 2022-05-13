//RECUPERATION DE L URL
let params = (new URL(document.location)).searchParams;

//STOCK L ID
const id = params.get("id");
 
//EMPLACEMENT HTML
let teddies = document.querySelector("#teddies")
/*iteration sur les options couleurs*/
function coloroption(data) {
  console.log("data.colors.length", data.colors.length)
  let res = "";
  for (let i = 0; i < data.colors.length; i++) {
    res = res + `<option value=${data.colors[i]}>${data.colors[i]}</option>`
  }
  return res;
}

async function getdata() {
  try {
      let reponse = await fetch("http://localhost:3000/api/teddies/" + id);
      let data = await reponse.json();
      console.table(data)
      produit(data)
  } catch (error) {
      teddies.textContent = "il y a un problème"
      console.log(erreur)
  }
}
//la fonction addproduct permet de rajouter des produits dans le panier
function addproduct(name, price) {
  /* Variable */
  let quantity = document.getElementById("quantity").value;
  quantity = parseInt(quantity)
  // const color = document.getElementById("color").value;
  let product = {
    quantity: quantity,
    name: name,
    price: price,
  };
  let panier = localStorage.getItem("panier");

  /* Algorithme */
  if (panier == null) {
    console.log("Panier vide on le remplis pour la 1ere fois");
    panier = [product]
    localStorage.setItem("panier", JSON.stringify(panier));
  }
  else {
    panier = JSON.parse(panier);
    console.log("Panier déjà existant on rajoute des items")
    let elemFind = false;
    panier.forEach((produitPanier, index) => {
      console.log("On vérifie si le nom de notre produit :> " + product.name + " Match avec un nom de produit dans le pannier :> " + produitPanier.name + " test numero :> " +  index)
      if (product.name == produitPanier.name && elemFind == false) { 
        // si le produit existe déjà ajouté la qte choisis
        console.log("ça match on ajoute la qte")
        console.log("produitPanier.quantity = produitPanier.quantity + product.quantity;")
        produitPanier.quantity = produitPanier.quantity + product.quantity;
        console.log(" produitPanier.name :>",  produitPanier.quantity , "nouvelle qte produitPanier.quantity :>", produitPanier.quantity)
        elemFind = true
      }
    })
    if (elemFind == false) { //si le produit n'est pas déjà dans le panier on l'ajoute dans l'array panier
      console.log("Le produite est pas dans le pannier on le push");
      console.log('taille panier avant :>> ', panier.length);
      panier.push(product);
      console.log('taille panier apres :>> ', panier.length);
    }
    localStorage.setItem("panier", JSON.stringify(panier))
  }
  alert('Le produit a été ajouté au panier');
}
function produit(data) {
    let htmlStrpeluche = `
    <div class="peluche" id="cardsProduct">
      <img class="img2" src=${data.imageUrl} alt="une belle peluche haut de gamme">
      <div class="description">
        <p class="nom">${data.name}</p>
        <span class="peluche-description">
          ${data.description}
        </span>
        <br><br><span class="choix">Personnalisez votre peluche :</span>
        <select class="options" id ="color">`;
        htmlStrpeluche += coloroption(data);
        htmlStrpeluche += `
        </select>
        <p class="prix"> Prix Unitaire: ${data.price/ 100}€</p>
        <span class="quantityx">Quantité</span>
        <select class="quantite" id="quantity">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select><br>
        <div class="btnsubmit"><button onclick="addproduct('${data.name}', ${data.price/100})" type ="submit" id="paniers" value="submit"> Ajouter au panier</button></div>
      </div>
    </div>
  `;
  teddies.innerHTML = htmlStrpeluche;
}

getdata()