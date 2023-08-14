products = [
    {
        id: 1,
        image: "./images/the_brilliant_life.jpeg",
        name: "The brilliant life"
    },
    {
        id: 2,
        image: "./images/the_adventures_of_huckleberry_finn.jpg",
        name: "The Adventures of Huckleberry Finn"
    },
    {
        id: 3,
        image: "./images/53dc8653-6184-4fd4-8c0c-0e8a7f25f9ed.jpg",
        name: "The Adventures of Robin Hood"
    },
    {
        id: 4,
        image: "./images/22387034-2dc0-4ced-8ba5-705d4f72ec11.jpg",
        name: "Anna Karenina"
    },
    {
        id: 5,
        image: "./images/2f510320-c886-4292-b4ea-8ac5fd11f4e7.jpg",
        name: "Antony and Cleopatra "
    },
    {
        id: 6,
        image: "./images/4c12a7d2-5878-4536-9b8b-1c2282530a59.jpg",
        name: "Ben-Hur"
    },
    {
        id: 7,
        image: "./images/551b369e-ca3d-4594-88d2-010a2acf82af.jpg",
        name: "Beowulf"
    },
    {
        id: 8,
        image: "./images/eb03b3ce-f42e-4f53-b0dd-5b4352b81bab.jpg",
        name: "Candide"
    },
    {
        id: 9,
        image: "./images/6322c13e-0484-48e8-80a9-577fb86b0dab.jpg",
        name: "Charlotte's Web"
    },
    {
        id: 10,
        image: "./images/532b89f9-f16a-4ee2-bba2-a169b480c8be.jpg",
        name: "Dracula"
    },
    {
        id: 11,
        image: "./images/d4ec2e69-518c-4fda-8e7c-fcd877cbcab0.jpg",
        name: "Don Juan"
    },
    {
        id: 12,
        image: "./images/adb49e58-f2c8-4e22-8fed-d59b11ebff73.jpg",
        name: "Emma"
    }

]

const productTemplate = document.getElementById("product-template");
const productListDiv = document.getElementById("catalog-list");

showHidden = getShowHidden()
if (showHidden) {
    document.getElementById('hiddenCheckbox').checked = true;
}
hiddenProducts = getHiddenProducts()
likedProducts = getLikedProducts()
comparedProducts = getComparedProducts()

currentIncludeOnly = undefined

showProducts(currentIncludeOnly, showHidden)

function getShowHidden() {
    let fromStorage = localStorage.getItem("showHidden")
    if (fromStorage == null) {
        return false;
    }
    return fromStorage === 'true';
}

function getHiddenProducts() {
    let fromStorage = localStorage.getItem("hiddenProducts")
    if (fromStorage == null) {
        return new Set();
    }
    return new Set(fromStorage.split(','));
}

function getLikedProducts() {
    let fromStorage = localStorage.getItem("likedProducts")
    if (fromStorage == null) {
        return new Set();
    }
    return new Set(fromStorage.split(','));
}

function getComparedProducts() {
    let fromStorage = localStorage.getItem("comparedProducts")
    if (fromStorage == null) {
        return new Set();
    }
    return new Set(fromStorage.split(','));
}

function showProducts(includeOnly, showHidden) {
    products.forEach(product => {
        let id = "product-" + product.id
        let isHidden = hiddenProducts.has(id)
        let toAddOpacity = []

        let include = includeOnly === undefined || includeOnly.has(id)

        if (include && (showHidden || !isHidden)) {
            let productClone = productTemplate.content.cloneNode(true);

            productClone.querySelector("#photo").src = product.image;
            productClone.querySelector("#name").textContent = product.name;
            productClone.querySelector("#badge-hidden").value = id
            productClone.querySelector("#badge-like").value = id
            productClone.querySelector("#badge-compare").value = id

            productClone.querySelector(".root").id = id

            if (isHidden) {
                toAddOpacity.push(id)
            }
            productListDiv.appendChild(productClone);
        }

        toAddOpacity.forEach(id => {
            window.document.getElementById(id).style = "opacity: 0.5";
        })
    })
}

function clearProducts() {
    const myNode = document.getElementById("catalog-list");
    myNode.innerHTML = '';
}

function clickedBadgeHidden(val) {
    if (hiddenProducts.has(val)) {
        hiddenProducts.delete(val)
    } else {
        hiddenProducts.add(val)
    }

    localStorage.setItem('hiddenProducts', Array.from(hiddenProducts))

    clearProducts()
    showProducts(currentIncludeOnly, showHidden)

    console.log(val);
}

function clickedBadgeLike(val) {
    if (likedProducts.has(val)) {
        likedProducts.delete(val)
    } else {
        likedProducts.add(val)
    }
    likedProducts.push(val)
    localStorage.setItem('likedProducts', Array.from(likedProducts))

    clearProducts()
    showProducts(currentIncludeOnly, showHidden)
}

function clickedBadgeCompare(val) {
    if (comparedProducts.has(val)) {
        comparedProducts.delete(val)
    } else {
        comparedProducts.add(val)
    }
    comparedProducts.push(val)
    localStorage.setItem('comparedProducts', Array.from(comparedProducts))
}

function clickedShowHidden() {
    showHidden = document.getElementById('hiddenCheckbox').checked;
    localStorage.setItem('showHidden', showHidden)

    clearProducts()
    showProducts(currentIncludeOnly, showHidden)
}

function buttonAll() {
    clearProducts()
    currentIncludeOnly = undefined
    showProducts(undefined, true)
}

function buttonLiked() {
    clearProducts()
    currentIncludeOnly = likedProducts
    showProducts(currentIncludeOnly, true)
}

function buttonCompare() {
    clearProducts()
    currentIncludeOnly = comparedProducts
    showProducts(currentIncludeOnly, true)
}