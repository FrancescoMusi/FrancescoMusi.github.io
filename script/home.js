const more = document.getElementById("more");
const button = document.getElementById("readMore");

function readMore() {
  if (more.style.display === "inline") {
    button.innerHTML = "Leggi di più";
    more.style.display = "none";
  } else {
    button.innerHTML = "Leggi meno";
    more.style.display = "inline";
  }
}

