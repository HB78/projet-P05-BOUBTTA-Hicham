let products = document.querySelector("#products");

async function getdata() {
    try {
        let reponse = await fetch("http://localhost:3000/api/teddies")
        let data = await reponse.json()
        datacards(data)
    } catch (error) {
        products.textContent = "il y a un problème"
        console.log(erreur)
    }
}
function datacards(data) {
    for (let i = 0; i < data.length; i++) {
        products.innerHTML += `
                <div class="productCard">
                    <a
                        href="product.html?id=${data[i]._id}"
                        class="productLink"
                    >
                        <img class="img" src="${
                            data[i].imageUrl
                        }"  alt="Un joli nounours !" />
                        <div class="card-title">
                            <h5 class="card-title">${data[i].name}</h5>
                            <p class="price">${
                                data[i].price / 100
                            }.00 &euro;</p>
                        </div>
                        <p class="description"> ${
                            data[i].description
                        }</p>
                    </a>
                </div>
            `;
    }
}
getdata()