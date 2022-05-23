let params = (new URL(document.location)).searchParams;
let orderid = params.get("orderId");
console.log("orderid", orderid);
function clearend() {
    sessionStorage.removeItem("sommeTotal")
    localStorage.removeItem("panier")
    localStorage.removeItem("orderId")
    localStorage.removeItem("contact")
    localStorage.removeItem("arraysend")
    window.location.href = "index.html"
} 
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