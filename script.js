const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)");
const body = document.querySelector("#body");
const button = document.querySelector("#theme");

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

