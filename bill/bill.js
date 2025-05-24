const params = new URLSearchParams(window.location.search);
const totalBelanja = parseInt(params.get('totalBelanja'));
const cart = JSON.parse(params.get('cart'));

let content = "";

let totalQty = 0;
let servise = totalBelanja / 20;
let pb1 = totalBelanja / 10;

let date = new Date().toLocaleString("id-ID");

for (let i = 0; i < cart.length; i++) {
    for (let j = 0; j < cart[i].length; j++) {
        if (cart[i][j] != 0) {
            totalQty += cart[i][j];

            let test = "";

            if (menus[i].prices[j].label != "") {
                test += `(${menus[i].prices[j].label})`;
            }

            content += `
                <div class="namaHarga">
                    <p class="infoNama">${cart[i][j]} ${menus[i].title} ${test}</p>
                    <p class="infoHarga">${(cart[i][j] * menus[i].prices[j].price * 1000).toLocaleString("id-ID")}</p>
                </div>
            `;
        }
    }
}

document.getElementById("menu").innerHTML = content;

document.getElementById("subTotal").innerHTML = (totalBelanja * 1000).toLocaleString("id-ID");
document.getElementById("serv").innerHTML = (servise * 1000).toLocaleString("id-ID");
document.getElementById("pb").innerHTML = (pb1 * 1000).toLocaleString("id-ID");

document.getElementById("totalQty").innerHTML = `${totalQty} Total`;
document.getElementById("totalHarga").innerHTML = ((totalBelanja + servise + pb1) * 1000).toLocaleString("id-ID");

document.getElementById("date").innerHTML = date;