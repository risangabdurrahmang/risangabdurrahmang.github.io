/*=============== Tabs Menu ===============*/
document.getElementById("defaultOpen").click();
function openTab(evt, tabName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}

/*=============== Dark Light Theme ===============*/
const themeButton = document.querySelector("#switch");
const darkMode = "dark-mode";
const moonIcon = "icon--moon";

let themeSelected = localStorage.getItem("theme");
let iconSelected = localStorage.getItem("icon");

const getCurrentTheme = () => (document.body.classList.contains(darkMode) ? "dark" : "light");
const getCurrentIcon = () => (themeButton.classList.contains(moonIcon) ? "icon--moon" : "icon--sun");

if (themeSelected) {
  document.body.classList[themeSelected === "dark" ? "add" : "remove"](darkMode);
  themeButton.classList[iconSelected === "icon--moon" ? "add" : "remove"](moonIcon);
}

themeButton.addEventListener("click", () => {
  document.body.classList.toggle(darkMode);
  themeButton.classList.toggle(moonIcon);
  localStorage.setItem("theme", getCurrentTheme());
  localStorage.setItem("icon", getCurrentIcon());
});

/*=============== Project Desc Accordion ===============*/
let acc = document.getElementsByClassName("project-name");

for (let i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    this.classList.toggle("active");
    let projectDesc = this.parentElement.querySelector(".projectDesc");
    if (projectDesc) {
      projectDesc.style.display = projectDesc.style.display === "block" ? "none" : "block";
    }
  });
}

/*=============== Send Message Form ===============*/
const form = document.getElementById("form");
const spinner = document.querySelector(".fa-circle-notch");
const btnText = document.querySelector(".btn-text");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const formData = new FormData(form);
  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);
  btnText.textContent = "";
  spinner.style.display = "block";
  setTimeout(() => {
    spinner.style.display = "none";
    btnText.textContent = "Kirim";
  }, 2000);

  fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: json,
  })
    .then(async (response) => {
      // let json = await response.json();
      if (response.status == 200) {
        Swal.fire({
          title: "Sukses",
          text: "Pesan Terkirim",
          icon: "success",
        });
      } else {
        console.log(response);
      }
    })
    .catch((error) => {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Pesan Tidak Terkirim",
      });
    })
    .then(function () {
      form.reset();
    });
});
