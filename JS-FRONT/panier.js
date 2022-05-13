/* On récupere le panier de l'utilisateur dans le local storage */
let panier = JSON.parse(localStorage.getItem("panier"));
let form = document.getElementById("form");
let id = JSON.parse(localStorage.getItem("id"));
console.log("id", id)
/*ajout des input du formulaire pour faire fonctionner les regex et la validation des input*/
let prenom = document.getElementById("firstname");
let nom = document.getElementById("lastname");
let lieu = document.getElementById("adress");
let ville = document.getElementById("city");
let mail = document.getElementById("mail");
let phone = document.getElementById("phone"); 

/*fonction pour envoyer les info avec fetch-post*/
function postapi() {
let firstname = document.getElementById("firstname").value
let lastname = document.getElementById("lastname").value
let adress = document.getElementById("adress").value
let city = document.getElementById("city").value
let email = document.getElementById("mail").value
let products = [id]

const contact = {
    firstName: firstname,
    lastName: lastname,
    address: adress,
    city: city,
    email: email
  }

    //envoie du panier et du formulaire dans le serveur avec fecth et post//
    const arraysend = {
      contact,
      products
    }
    console.log("array", arraysend)
    localStorage.setItem("arraysend", JSON.stringify(arraysend))
    let sendpost = {
      method: 'POST',
      headers: {'Content-Type': "application/json"},
      mode: "cors",
      body: JSON.stringify(arraysend)
    }
    fetch ("http://localhost:3000/api/teddies/order", sendpost) 
    .then(res => res.json())
    .then(data => {
      orderId = data.orderId;
      JSON.stringify(orderId)
      console.log(orderId)
      localStorage.setItem("orderId", orderId)
      window.location.href = "confirmation.html"
    })
    .catch( (err) => {
      console.log("fetch Error",err);
    });
}

/* Fonction validation du formulaire */
function isFromValid() {
  let testNom = new RegExp("[a-zA-Z]").test(nom.value);
  let testPrenom = new RegExp("[a-zA-Z]").test(prenom.value);
  let testLieu = new RegExp("[a-zA-Z0-9.-]").test(lieu.value);
  let testVille = new RegExp("[a-zA-Z]").test(ville.value);
  let testMail = new RegExp("^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-zA-Z]{2,10}$").test(mail.value);
  let testPhone = new RegExp("^[0-9]{10}$").test(phone.value);
  
  if (testPrenom && testNom && testLieu && testVille && testMail && testPhone) {
    return true;
  }
  return false;
}

/*un groupe de fonction pour effacer les produits du panier*/
function delIndexPanier(index) {
  panier.splice(index, 1);
  localStorage.setItem("panier", JSON.stringify(panier));
  window.location.href = "panier.html";
  if(index == 0) {
    viderPanier()
  }
}

function viderPanier() {
  localStorage.removeItem("panier");
  alert('le panier a été vidé');
  window.location.href = "panier.html";
}
/* DEBUT : un groupe de fonction qui verifie la validité des input du formulaire*/
function validName(nom){
  let nameRegex = new RegExp("[a-zA-Z]")
  let testname =  nameRegex.test(nom.value)
  let smallname = document.getElementById("smallname");
  if(testname == true) {
    smallname.textContent = "ce champs est valide"
    smallname.style.color = "green"
    nom.classList.remove('badox')
    nom.classList.add('goodbox')
    console.log('c super')
  }else {
    console.log("zut")
    smallname.textContent = "ce champs ne doit contenir des lettres"
    smallname.style.color = "red"
    nom.classList.remove('goodbox')
    nom.classList.add('badbox')
  }
}
function validPrenom(prenom) {
  let prenomRegex = new RegExp("[a-zA-Z]")
  let testprenom = prenomRegex.test(prenom.value)
  let smallprenom = document.getElementById("smallprenom")
  if(testprenom == true) {
    console.log('je suis chaud')
    smallprenom.textContent = "ce champs est valide"
    smallprenom.style.color = "green"
    prenom.classList.remove('badox')
    prenom.classList.add('goodbox')
  }else {
    smallprenom.textContent = "ce champs ne doit contenir des lettres"
    smallprenom.style.color = "red"
    prenom.classList.remove('goodbox')
    prenom.classList.add('badbox')
  }
}

function validAdress (lieu) {
  let adressRegex = new RegExp("[a-zA-Z0-9.-]")
  let testadress = adressRegex.test(lieu.value)
  let smalladress = document.getElementById("smalladress")
  if(testadress == true){
    smalladress.textContent = "ce champs est valide"
    smalladress.style.color = "green"
    lieu.classList.remove('badbox')
    lieu.classList.add('goodbox')
  }else {
    smalladress.textContent = "ce champs ne doit contenir des lettres et des chiffres"
    smalladress.style.color = "red"
    lieu.classList.remove('goodbox')
    lieu.classList.add('badbox')
  }
}

function validCity(ville) {
  let cityRegex = new RegExp("[a-zA-Z]")
  let testcity = cityRegex.test(ville.value)
  let smallcity =  document.getElementById("smallcity")
  if(testcity) {
    smallcity.textContent = "ce champs est valide"
    smallcity.style.color = "green"
    ville.classList.remove('badbox')
    ville.classList.add('goodbox')
  }else {
    smallcity.textContent = "ce champs ne doit contenir quedes lettres et non des chiffres"
    smallcity.style.color = "red"
    ville.classList.remove('goodbox')
    ville.classList.add('badbox')
  }
}

function validEmail(mail) {
  let mailRegex = new RegExp("^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-zA-Z]{2,10}$")
  let testmail = mailRegex.test(mail.value)
  let smallmail = document.getElementById("smallmail")
  if(testmail) {
    smallmail.textContent = "ce champs est valide"
    smallmail.style.color = "green"
    mail.classList.remove('badbox')
    mail.classList.add('goodbox')
  }else {
    smallmail.textContent = "ce champs est invalide"
    smallmail.style.color = "red"
    mail.classList.remove('goodbox')
    mail.classList.add('badbox')
  }
}
function validPhone(phone) {
  let phoneRegex = new RegExp("^[0-9]{10}$")
  let testphone = phoneRegex.test(phone.value)
  let smallphone = document.getElementById("smallphone")
  if(testphone == true && phone.value.length == 10) {
    smallphone.style.color = "green"
    smallphone.textContent = "ce champs est valide"
    phone.classList.add("goodbox")
    phone.classList.remove("badbox")
  }else {
    smallphone.textContent = "Veuillez entrer au moins 10 chiffres"
    smallphone.style.color = "red"
    phone.classList.add("badbox")
    phone.classList.remove("goodbox")
  }
  if(isNaN(phone.value)) {
    smallphone.textContent = "ce champs ne doit contenir que des chiffres"
    smallphone.style.color = "red"
    phone.classList.add("badbox")
    phone.classList.remove("goodbox")
}
}
/* FIN : un groupe de fonction qui verifie la validité des input du formulaire*/

if(panier !=null) {
  function main() {
    let sommeTotal = 0;
    let facture = document.getElementById('facture');
    let tableproduct = document.getElementById("tableproduct");
    console.log("panier", panier);
    /* On remplis le html avec les données du panier et on calcule le total*/
    panier.forEach((produitPanier, index) => {
      produitPanier.totalPrice = produitPanier.quantity * produitPanier.price;
      tableproduct.innerHTML += `
        <tr id="info">
          <td>${produitPanier.name}</td>
          <td>${produitPanier.quantity}</td>
          <td>${produitPanier.price}.00 €</td>
          <td>${produitPanier.totalPrice}.00 €</td>
          <td><button id="supprimer" onClick="delIndexPanier(${index})"> <i class="fas fa-trash-alt"></i></button></td>
        </tr>
      `;
      /* On ajoute le prix de l'objet (le prix total) au prix total */
      sommeTotal += produitPanier.totalPrice;
      localStorage.setItem("sommeTotal", JSON.stringify(sommeTotal))
    });
    facture.innerHTML = "<div class='centerprice' >Le montant total est de : </div>" + sommeTotal + ".00 €";
  
    /* LA PARTIE FORMULAIRE*/
    //on test la validité des input avec les regex//
    nom.addEventListener("blur", () => {
      validName(nom)
    })
    prenom.addEventListener("blur", () => {
      validPrenom(prenom)
    })
    lieu.addEventListener("blur", () => {
      validAdress(lieu)
    })
    ville.addEventListener("blur", () => {
      validCity(ville)
    })
    mail.addEventListener("blur", () => {
      validEmail(mail)
    })
    phone.addEventListener("blur", () => {
      validPhone(phone)
    })
      //recuperation du formulaire pour les mettre dans le local storage au clic sur le bouton envoie//
        const envoieFomulaire = document.getElementById("commander")
        envoieFomulaire.addEventListener('click', (e) => {
        e.preventDefault();
        if (isFromValid()) {
          postapi()
          return;
        }
        alert("Merci de remplir le formulaire corectement");
      })
  }
  
  main();
} else {
let pan = document.getElementById("panier")
let livraison = document.getElementById("livraison")
 form.style.display = "none";
 livraison.style.display = "none";
 let attention = `<div>
<h1>Rajoutez des produits au panier pour pouvoir commander</h1>
</div>`
pan.innerHTML += attention;
pan.style.height = "88vh"
}