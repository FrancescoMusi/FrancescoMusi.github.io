function readMore() {
  let more = document.getElementById("more");
  let button = document.getElementById("readMore");

  if (more.style.display === "inline") {
    button.innerHTML = "Leggi di più";
    more.style.display = "none";
  } else {
    button.innerHTML = "Leggi meno";
    more.style.display = "inline";
  }
}

