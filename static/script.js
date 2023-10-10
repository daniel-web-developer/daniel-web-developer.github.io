const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)");
const body = document.querySelector("#body");
const button = document.querySelector("#theme");
const carouselAll = document.querySelectorAll(".carousel");
const previousAll = document.querySelectorAll(".slides-buttons-prev");
const nextAll = document.querySelectorAll(".slides-buttons-next");
const detail = document.querySelector(".detail");
const slides = document.querySelectorAll(".slide");
    const desktopWidth = document.querySelector(".carousel-desktop").offsetWidth;
    const mobileWidth = document.querySelector(".carousel-mobile").offsetWidth;

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

    carousel.addEventListener("mousedown", (e) => {
        isClicking = true;
        scrollLeft = carousel.scrollLeft;
        initialX = e.clientX;

        slides.forEach((slide) => {
            slide.style.cursor = "grabbing";
        });

        document.body.style.userSelect = "none";
    });

    carousel.addEventListener("mouseup", () => {
        isClicking = false;

        slides.forEach((slide) => {
            slide.style.cursor = "grab";
        });
        
        document.body.style.userSelect = "auto";
    });

    carousel.addEventListener("mouseout", () => {
        isClicking = false;

        slides.forEach((slide) => {
            slide.style.cursor = "grab";
        });

        document.body.style.userSelect = "auto";
    });

    carousel.addEventListener("mousemove", (e) => {
        if (isClicking == false){
            return;
        }

        let x = e.clientX - initialX;

        carousel.scrollLeft = scrollLeft - x;
    });
});

previousAll.forEach((previous) => {
    if ('ontouchstart' in window){
        previous.addEventListener("touchstart", {passive: true}, () => {
            previous.closest(".carousel").scrollLeft -= desktopWidth;
        });
    } else{
        previous.addEventListener("click", () => {
            previous.closest(".carousel").scrollLeft -= desktopWidth;
        });
    }
});

nextAll.forEach((next) => {
    if ('ontouchstart' in window){
        next.addEventListener("touchstart", {passive: true}, () => {
            next.closest(".carousel").scrollLeft += desktopWidth;
        });
    } else {
        next.addEventListener("click", () => {
            next.closest(".carousel").scrollLeft += desktopWidth;
        });
    }
});

slides.forEach((item) => {
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

