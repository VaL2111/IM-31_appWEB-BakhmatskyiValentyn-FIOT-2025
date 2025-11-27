const modal = document.getElementById("productModal");
const closeBtn = document.getElementsByClassName("close-btn")[0];

const mImage = document.getElementById("m-image");
const mTitle = document.getElementById("m-title");
const mPrice = document.getElementById("m-price");
const mBrand = document.getElementById("m-brand");
const mDesc = document.getElementById("m-desc");

const containers = document.querySelectorAll(".pro-container");

containers.forEach(container => {
    container.addEventListener("click", function(event) {
        const card = event.target.closest(".pro");

        if (card) {
            const imageSrc = card.getAttribute("data-image");
            const title = card.getAttribute("data-title");
            const price = card.getAttribute("data-price");
            const brand = card.getAttribute("data-brand");
            const desc = card.getAttribute("data-desc");

            mImage.src = imageSrc;
            mTitle.innerText = title;
            mPrice.innerText = price;
            mBrand.innerText = brand;
            mDesc.innerText = desc;

            modal.style.display = "block";
        }
    });
});

closeBtn.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}