
var parent = document.querySelector(".lsForm");

// password show/hide helper function
function showHide(input, showText) {
  if (input.getAttribute("type") === "password") {
    input.setAttribute("type", "text");
    showText.classList = "hide";
  } else {
    input.setAttribute("type", "password");
    showText.classList = "show";
  }
}

// event delegation on event target match
if(parent) {
  parent.addEventListener("click", event => {
    if (event.target.matches("button")) {
      var spanElm = event.target;
      var inputElm = spanElm.previousElementSibling;
      showHide(inputElm, spanElm);
    }
  })
}

// Header Search Toggle //
const div = document.getElementById('searchBox');
const addBtn = document.getElementById('searchBtn');

addBtn.addEventListener('click',()=>{
    div.classList.toggle('searchOpen');
})

// Header Sticky //
function myFunction1() {
  var t = document.getElementById("header"),
      n = t.offsetTop;
  window.pageYOffset > n ? t.classList.add("sticky") : t.classList.remove("sticky")
}
window.onscroll = function() {
  myFunction1()
};

// Select Menu Toggle Class //
const selectMenu = document.querySelector(".selectMenu"),
      smParent = document.querySelector(".customSelect");

if(selectMenu) {
selectMenu.addEventListener("click", () =>
  smParent.classList.toggle("active")
);
selectMenu.addEventListener("blur", () =>
  smParent.classList.remove("active")
);
}

// User Dropdown Toggle Class //
const userBtn = document.querySelector(".user"),
      userParent = document.querySelector(".headerRight");

if(userBtn) {
userBtn.addEventListener("click", () =>
  userParent.classList.toggle("userDDOpen")
);
userBtn.addEventListener("blur", () =>
  userParent.classList.remove("userDDOpen")
);
}

// Menu Toggle Class //
const menuToggle = document.querySelector(".menuToggle"),
      menuParent = document.querySelector("body");

if(menuToggle) {
menuToggle.addEventListener("click", () =>
  menuParent.classList.toggle("menuOpen")
);
// menuToggle.addEventListener("blur", () =>
//   menuParent.classList.remove("menuOpen")
// );
}


// ssSlider1 //
    var swiper1 = new Swiper(".ssSlider1", {
      slidesPerView: 4,
      slidesPerGroup: 1,
      spaceBetween: 24,
      loop: true,
      mousewheel: false,
      freeMode: false,
      navigation: true,
      pagination: false,
      pagination: {
        el: ".swiper-pagination1",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next1",
        prevEl: ".swiper-button-prev1",
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 12,
        },
        568: {
          slidesPerView: 2,
          spaceBetween: 16,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        1200: {
          slidesPerView: 4,
          spaceBetween: 24,
        },
      },
      
    });

// ssSlider2 //
    var swiper2 = new Swiper(".ssSlider2", {
      slidesPerView: 3,
      slidesPerGroup: 1,
      spaceBetween: 24,
      loop: true,
      mousewheel: false,
      freeMode: false,
      navigation: true,
      pagination: false,
      pagination: {
        el: ".swiper-pagination2",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next2",
        prevEl: ".swiper-button-prev2",
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        568: {
          slidesPerView: 2,
          spaceBetween: 15,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        1200: {
          slidesPerView: 3,
          spaceBetween: 24,
        },
      },
      
    });

// ssSlider3 //
    var swiper3 = new Swiper(".ssSlider3", {
      slidesPerView: 4,
      slidesPerGroup: 1,
      spaceBetween: 24,
      loop: true,
      mousewheel: false,
      freeMode: false,
      navigation: true,
      pagination: false,
      pagination: {
        el: ".swiper-pagination3",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next3",
        prevEl: ".swiper-button-prev3",
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 12,
        },
        568: {
          slidesPerView: 2,
          spaceBetween: 16,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        1200: {
          slidesPerView: 4,
          spaceBetween: 24,
        },
      },
      
    });

