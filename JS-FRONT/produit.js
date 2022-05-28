//RECUPERATION DE L URL
let params = (new URL(document.location)).searchParams;
let dataGolbal = []
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
//la fonction getdata va permettre de récupérer de façon asynchrone les donnéesde l'API avec la méthode fetch
async function getdata() {
  try {
      let reponse = await fetch("http://localhost:3000/api/teddies/" + id);
      let data = await reponse.json();
      console.table(data)
      dataGolbal = data;
      produit(data);
  } catch (error) {
      teddies.textContent = "il y a un problème"
      console.log(erreur)
  }
}

//la fonction addproduct permet de rajouter des produits dans le panier
function addproduct(name, price, id) {
  /* Variable */
  let quantity = document.getElementById("quantity").value;
  quantity = parseInt(quantity)
  if (isNaN(quantity)  || quantity < 1) {
    alert("Veuillez entrer une quantité valide")
    return
  }
  const color = document.getElementById("color").value;
  let product = {
    quantity: quantity,
    name: name,
    price: price,
    id: id,
    color: color,
  };
  console.log("product", product);
  let panier = localStorage.getItem("panier");

  /* Algorithme */
  if (panier == null) {
    //"Panier vide on le remplis pour la 1ere fois"
    panier = [product]
    localStorage.setItem("panier", JSON.stringify(panier));
  }
  else {
    panier = JSON.parse(panier);
    //Panier déjà existant on rajoute des items
    let elemFind = false;
    panier.forEach((produitPanier, index) => {
      console.log("On vérifie si le nom de notre produit :> " + product.name + " Match avec un nom de produit dans le pannier :> " + produitPanier.name + " test numero :> " +  index)
      if (product.name == produitPanier.name && product.color == produitPanier.color && elemFind == false) {
        // si le produit existe déjà ajouté la qte choisis
        produitPanier.quantity = produitPanier.quantity + product.quantity;
        elemFind = true
        //localStorage.setItem("panier", JSON.stringify(panier))
        //alert('La quantité de ce produit a été mise à jour');
      }
    })
    if (elemFind == false) { //si le produit n'est pas déjà dans le panier on l'ajoute dans l'array panier
      panier.push(product);
      //localStorage.setItem("panier", JSON.stringify(panier))
      //alert('Le produit a été ajouté au panier');
    }

    localStorage.setItem("panier", JSON.stringify(panier))
  }
  alert('Le produit a été ajouté au panier');
}
//fonction qui affiche le produit et les informations liées à celui-ci
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
        <input class="quantite" id="quantity"  type ="number" min="1" value="1" onFocus="this.value='1';" ><br>
        <div class="btnsubmit"><button onclick="addproduct('${data.name}', ${data.price/100}, '${data._id}')" type ="submit" id="paniers" value="submit"> Ajouter au panier</button></div>
      </div>
    </div>
  `;
  teddies.innerHTML = htmlStrpeluche;
}
getdata()

function isInputValid(input) {
  let testInput = new RegExp("[1-9]").test(input);
}