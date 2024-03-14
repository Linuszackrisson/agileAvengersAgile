const navToggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".links");




navToggle.addEventListener("click", function () {

  links.classList.toggle("show-links");
});

renderNavLinks()

function renderNavLinks() {
 

  const navObject = [
    [
      {
        text : `Meny`,
        href : `menu.html`
      },
      {
        text : `Vårt Kaffe`,
        href : `about.html`
      },
      {
        text : `Min profil`,
        href : `profil.html`
      },
      {
        text : `Orderstatus`,
        href : `status.html`
      }
    ],
    [
      {
        text : `Meny`,
        href : `menu.html`
      },
      {
        text : `Vårt Kaffe`,
        href : `about.html`
      },
      {
        text : `Login`,
        href : `login.html`
      },
      {
        text : `Registrera`,
        href : `register.html`
      },
      {
        text : `Orderstatus`,
        href : `status.html`
      }
    ],
    [
      {
        text : `Admin`,
        href : `admin.html`
      }
    ],
  ]

 
  const login = JSON.parse(localStorage.getItem('loginValue'))
 // To make this code work we need the loginValue from the
 // loginfoorm . You can test this function if you with this code:
 // const test =`user`. Change the login to test.
  if (login === `user`) {
    navObject[0].forEach(link => {
      const liRef = document.createElement(`li`)

      const aRef = document.createElement(`a`) 
      aRef.href = link.href
      aRef.textContent = link.text

      liRef.appendChild(aRef)
      document.querySelector(`.links`).appendChild(liRef)
    })
  } else if (login === `guest`) {
    navObject[1].forEach(link => {
      const liRef = document.createElement(`li`)

      const aRef = document.createElement(`a`) 
      aRef.href = link.href
      aRef.textContent = link.text

      liRef.appendChild(aRef)
      document.querySelector(`.links`).appendChild(liRef)
     })
  } else if (login === `admin`) {
    navObject[2].forEach(link => {
      const liRef = document.createElement(`li`)

      const aRef = document.createElement(`a`) 
      aRef.href = link.href
      aRef.textContent = link.text

      liRef.appendChild(aRef)
      document.querySelector(`.links`).appendChild(liRef)
     })
  }
}


