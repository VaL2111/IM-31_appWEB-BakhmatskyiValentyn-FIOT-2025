const mainImg = document.getElementById("mainImg");
const smallImg = document.querySelectorAll(".small-img");

smallImg.forEach(img => {
    img.addEventListener('click', function() {
        mainImg.src = img.src;
    });
});