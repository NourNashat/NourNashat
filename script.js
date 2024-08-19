const navMenu = document.getElementById("nav-menu"),
      navToggle = document.getElementById("nav-toggle"),
      navClose = document.getElementById("nav-close");

/* ============= TESTIMONIAL SWIPER ========= */
var swiper = new Swiper(".testimonial-wrapper", {
  loop: true,  // Set loop as a boolean, not a string
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});
/* ============= THEME/DISPLAY CUSTOMIZATION ========= */
const theme = document.querySelector("#theme-button");
const themeModal = document.querySelector(".customize-theme");
const fontSizes = document.querySelectorAll('.choose-size span');
const colorPallette = document.querySelectorAll(".choose-color span");
var root = document.querySelector(":root");
const Bg1 = document.querySelector(".bg-1");
const Bg2 = document.querySelector(".bg-2");
const Bg3 = document.querySelector(".bg-3");
// Open modal
const openThemeModal = () => {
  themeModal.style.display = 'grid';
}

// Close modal
const closeThemeModal = (e) => {
  if (e.target.classList.contains('customize-theme')) {
    themeModal.style.display = 'none';
  }
}
// Event listeners
theme.addEventListener("click", openThemeModal);
themeModal.addEventListener("click", closeThemeModal); // This is the missing event listener
/* ============= FONTS ========= */
//remove active class from spans pr font size selectors
const removeSizeSelector = () => {
  fontSizes.forEach(size => {
    size.classList.remove('active');
  });
}
fontSizes.forEach(size => {
  size.addEventListener('click', () => {

    removeSizeSelector();
    let fontSize;
    size.classList.toggle('active')
    if(size.classList.contains('font-size-1')) {
      fontSize = '12px';
    }
    else if(size.classList.contains('font-size-2')) {
      fontSize = '14px';
    }
    else if(size.classList.contains('font-size-3')) {
      fontSize = '16px';
    }
    else if(size.classList.contains('font-size-4')) {
      fontSize = '18px';
    }
    // Apply the fontSize to the root html element
    document.querySelector('html').style.fontSize = fontSize;
  });
});
/* ============= SHOW MENU ========= */
/* validate if constant exists */
if(navToggle)
{
  navToggle.addEventListener('click', () => {
    navMenu.classList.add("show-menu")
  })
}
/* ============= MENU SHOW ========= */

/* ============= MENU HIDDEN ========= */
/* validate if constant exists */
if(navClose)
  {
    navClose.addEventListener('click', () => {
      navMenu.classList.remove("show-menu")
    })
  }
/* ============= REMOVE MENU MOBILE ========= */
const navLinks = document.querySelectorAll(".nav-link")

function linkAction()
{
  const navMenu = document.getElementById("nav-menu")
  //when we click on each nav link. we remove the show menu class
  navMenu.classList.remove("show-menu")
}
navLinks.forEach(n => n.addEventListener('click', linkAction))
/* ============= CHANGE BACKGROUND HEADER ========= */
function scrollHeader() {
  const header = document.getElementById("header");
  // When the scroll is greater than 80 viewport height, add the class scroll-header to the tag header
  if (window.scrollY >= 80) {
    header.classList.add("scroll-header");
  } else {
    header.classList.remove("scroll-header");
  }
}

window.addEventListener("scroll", scrollHeader);


/* ============= SCROLL SECTIONS ACTIVE LINK ========= */

//get all sections that have an id defined
const sections = document.querySelectorAll("section[id]");

//add an event listener listening for scroll
window.addEventListener("scroll", navHighlighter)

function navHighlighter()
{
  //get current scroll postion
  let scrollY = window.pageYOffset;
  //now we loop through sections to get height, top and ID values for each
  sections.forEach(current => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 100; // -100 to give a bit of buffer
    sectionId = current.getAttribute("id");
    /* if our current scroll postion enters the space where current section on screen is, add .active class to 
    corresponding navigation link, else remove it
    -to know which link needs an active class, we use sectionId variable we are getting while looping through
    sections as an selector */
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.add("active-link");
    } else {
      document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.remove("active-link");
    }
  });
}

/* ============= PORTFOLIO ITEM FILTER ========= */
const filterContainer = document.querySelector(".portfolio-filter-inner");
const filterBtns = filterContainer.children;
const totalFilterBtn = filterBtns.length;
const portfolioItems = document.querySelectorAll(".portfolio-item");
const totalPortfolioItem = portfolioItems.length;

for (let i = 0; i < totalFilterBtn; i++) {
  filterBtns[i].addEventListener("click", function () {
    filterContainer.querySelector(".active").classList.remove("active");
    this.classList.add("active");

    const filterValue = this.getAttribute("data-filter");
    console.log(filterValue);

    // Logic to filter portfolio items based on filterValue
    for (let j = 0; j < totalPortfolioItem; j++) {
      if (filterValue === portfolioItems[j].getAttribute("data-category")) 
        {
          portfolioItems[j].classList.remove("hide");
        portfolioItems[j].classList.add("show");
      } else
      {
        portfolioItems[j].classList.add("hide");
        portfolioItems[j].classList.remove("show");
      }
      if(filterValue === "all")
      {
        portfolioItems[j].classList.remove("hide");
        portfolioItems[j].classList.add("show");
      }
    }
  });
}





/* ============= PRIMARY COLORS ========= */

// Remove active class from colors
const changeActiveColorClass = () => {
  colorPallette.forEach(colorPicker => {
    colorPicker.classList.remove("active");
  });
};

colorPallette.forEach(color => {
  color.addEventListener('click', () => {
    let primaryHue;

    // Remove active class from all colors
    changeActiveColorClass();

    // Determine the primary hue based on the selected color
    if (color.classList.contains('color-1')) {
      primaryHue = 252;
    } else if (color.classList.contains('color-2')) {
      primaryHue = 52;
    } else if (color.classList.contains('color-3')) {
      primaryHue = 352;
    } else if (color.classList.contains('color-4')) {
      primaryHue = 152;
    } else if (color.classList.contains('color-5')) {
      primaryHue = 202;
    }

    // Add the active class to the selected color
    color.classList.add("active");

    // Ensure 'root' is defined correctly
    const root = document.documentElement;
    root.style.setProperty('--primary-color-hue', primaryHue);
  });
});

/* ============= THEME BACKGROUNDS ========= */
let lightColorLightness;
let WhiteColorLightness;
let darkColorLightness;
//change background color
const changeBG = () => {
  root.style.setProperty('--light-color-lightness', lightColorLightness);
  root.style.setProperty('--white-color-lightness', whiteColorLightness);
  root.style.setProperty('--dark-color-lightness', darkColorLightness);
};
Bg1.addEventListener('click', () => {
  //add active class
  Bg1.classList.add('active');
  //remove active class from others
  Bg2.classList.remove('active');
  Bg3.classList.remove('active');
  //remove customized changes from local storage
  window.location.reload();
})
Bg2.addEventListener('click',() => {
  darkColorLightness = '95%';
  whiteColorLightness = '20%';
  lightColorLightness = '15%';

  //add active class
  Bg2.classList.add('active');
  //remove active class from others
  Bg1.classList.remove('active');
  Bg3.classList.remove('active');
  changeBG();
});
Bg3.addEventListener('click',() => {
  darkColorLightness = '95%';
  whiteColorLightness = '10%';
  lightColorLightness = '0%';

  //add active class
  Bg3.classList.add('active');
  //remove active class from others
  Bg2.classList.remove('active');
  Bg1.classList.remove('active');
  changeBG();
});



