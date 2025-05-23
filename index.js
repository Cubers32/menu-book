let cart = [];
let content = "";
let totalBelanja = 0;

function reset () {
    for (let i = 0; i < menus.length; i++) {
        cart.push ([]);
        for (let j = 0; j < menus[i].prices.length; j++) {
            cart[i].push (0);
        }
    }

    for (let i = 0; i < menus.length; i++) {
        let k = ""
        for (let j = 0; j < menus[i].prices.length; j++) {
            k += `
                <div class="subMenu">
                    <div class="subMenuInfo">
                        <p class="subNama">${menus[i].prices[j].label}</p>
                        <p class="subHarga"><b>${menus[i].prices[j].price}</b></p>
                    </div>
                    <div class="buttonMenu">
                        <button class="addSub" onclick="sub (${i} , ${j})">
                            <img src="asset/circle-minus.png">
                        </button>
                        <p id="qty${i}${j}">0</p>
                        <button class="addSub" onclick="add (${i} , ${j})">
                            <img src="asset/circle-plus.png">
                        </button>
                    </div>
                </div>    
            `
        }
        content += `
            <div class="content">
                <img src="${menus[i].photoUrl}">
                <div>
                    <p class="menuTitle">${menus[i].title}</p>
                    <p class="menuInfo">${menus[i].description}</p>
                    ${k}
                </div>
            </div>
        `
    }
}

reset ();

function add (menu , submenu) {
    cart[menu][submenu] += 1;
    totalBelanja += menus[menu].prices[submenu].price;
    document.getElementById("qty" + menu + submenu).innerHTML = cart[menu][submenu];
    document.getElementById("totalBelanja").innerHTML = "Rp " + (totalBelanja * 1000).toLocaleString("id-ID");
}

function sub (menu , submenu) {
    if (cart[menu][submenu] > 0) {
        cart[menu][submenu] -= 1;
        totalBelanja -= menus[menu].prices[submenu].price;
        document.getElementById("qty" + menu + submenu).innerHTML = cart[menu][submenu];
        document.getElementById("totalBelanja").innerHTML = "Rp " + (totalBelanja * 1000).toLocaleString("id-ID");
    }
}

function checkout () {
    if (totalBelanja > 0) {
        let url = `bill/bill.html?`;
        url += `totalBelanja=${totalBelanja}`;
        url += `&cart=${JSON.stringify(cart)}`;

        window.location.href = url;
        reset ();
    }

    else {
        alert ('Pesan dulu minimal 1');
    }
}

document.getElementById("menu").innerHTML = content;