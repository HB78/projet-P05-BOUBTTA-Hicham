//On récupère l'orderid dans stocker dans l'URL
let params = (new URL(document.location)).searchParams;
let orderid = params.get("orderId");
console.log("orderid", orderid);
//Une fonction qui met au clic d'effacer le panier dans le localStorage
function clearend() {
    sessionStorage.removeItem("sommeTotal")
    localStorage.removeItem("panier")
    localStorage.removeItem("orderId")
    localStorage.removeItem("contact")
    localStorage.removeItem("arraysend")
    window.location.href = "index.html"
} 
//  Une fonction qui va afficher les informations du localStorage dans la page panier après avoir parsé les données
function main() {
    let sommeTotal = JSON.parse(sessionStorage.getItem("sommeTotal"));
    let arraysend = JSON.parse(localStorage.getItem("arraysend"));
    let confirms = document.getElementById("confirm");
    let thanks = `<div>
    <h1>Nous vous remercions pour votre commande ${arraysend.contact.firstName}</h1>
    <p>Votre numéro de commande est le ${orderid}</p>
    <p>Vous avez payé ${sommeTotal}.00€</p>
    <button id="btnback" onClick = "clearend()">Retour à la page d'accuei</button>
    </div>`;
    confirms.innerHTML += thanks;
}
main()