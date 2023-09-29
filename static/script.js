const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)");
const body = document.querySelector("#body");
const button = document.querySelector("#theme");
const carouselAll = document.querySelectorAll(".carousel");
const previousAll = document.querySelectorAll(".slides-buttons-prev");
const nextAll = document.querySelectorAll(".slides-buttons-next");
const detail = document.querySelector(".detail");

let isClicking = false;
let initialX;
let scrollLeft;

document.querySelectorAll('img').forEach((image) => {
    image.setAttribute("draggable", "false");
})

if (!localStorage.getItem("theme")){
    setTheme(preferredTheme ? "dark" : "light");
} else {
    setTheme(localStorage.getItem("theme"));
}

function setTheme(props){
    body.classList.add("theme--" + props);
    localStorage.setItem("theme", props);
}

button.addEventListener("click", changeTheme)

function changeTheme(){
    if (body.classList.contains("theme--dark")){
        body.classList.replace("theme--dark", "theme--light");
        localStorage.setItem("theme", "light");
    }
    else{
        body.classList.replace("theme--light", "theme--dark");
        localStorage.setItem("theme", "dark");
    }
}

carouselAll.forEach((carousel) => {

    const desktopWidth = document.querySelector(".carousel-desktop").offsetWidth;
    const mobileWidth = document.querySelector(".carousel-mobile").offsetWidth;

    carousel.addEventListener("mousedown", (e) => {
        isClicking = true;
        scrollLeft = carousel.scrollLeft;
        initialX = e.clientX;

        carousel.style.cursor = "grabbing";
        document.body.style.userSelect = "none";
    });

    carousel.addEventListener("mouseup", () => {
        isClicking = false;

        carousel.style.cursor = "grab";
        document.body.style.userSelect = "auto";
    });

    carousel.addEventListener("mouseout", () => {
        isClicking = false;

        carousel.style.cursor = "grab";
        document.body.style.userSelect = "auto";
    });

    carousel.addEventListener("mousemove", (e) => {
        if (isClicking == false){
            return;
        }


        let x = e.clientX - initialX;

        carousel.scrollLeft = scrollLeft - x;
    });

    previousAll.forEach((previous) => {
        if ('ontouchstart' in window){
            previous.addEventListener("touchstart", () => {
                carousel.scrollLeft -= mobileWidth;
            });
        } else{
            previous.addEventListener("click", () => {
                carousel.scrollLeft -= desktopWidth;
            });
        }

    });

    nextAll.forEach((next) => {
        if ('ontouchstart' in window){
            next.addEventListener("touchstart", () => {
                carousel.scrollLeft += mobileWidth;
            });
        } else {
            next.addEventListener("click", () => {
                carousel.scrollLeft += desktopWidth;
            });
        }

    });
});

document.querySelectorAll(".slide").forEach((item) => {
    item.addEventListener("click", (e) => {
        const imageDetail = document.querySelector(".detail-image");

        const src = e.target.getAttribute("src");
        const alt = e.target.getAttribute("alt");

        imageDetail.setAttribute("src", src);
        imageDetail.setAttribute("alt", alt);
        
        detail.classList.add("detail-display");
    });
});

document.querySelector(".detail-button").addEventListener("click", () => {
    detail.classList.remove("detail-display");
});

