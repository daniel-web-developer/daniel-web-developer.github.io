const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)");
const body = document.querySelector("#body");
const button = document.querySelector("#theme");
const carouselAll = document.querySelectorAll(".carousel");

let isClicking = false;
let initialX;
let scrollLeft;

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

        console.log(initialX);

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

        console.log(scrollLeft - x);

        carousel.scrollLeft = scrollLeft - x;
    });
});

