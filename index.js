let galleryImages = document.querySelectorAll(".gallery-img");
let getLatestOpenedImg;
let windowWidth = window.innerWidth;

if (galleryImages) {
  // select all the images and get the url
  galleryImages.forEach(function (image, index) {
    image.onclick = function () {
      const link = window.location.href.split("gallery.html")[0];
      getLatestOpenedImg = index + 1;
      let container = document.body;

      // create new div element
      let newImgWindow = document.createElement("div");
      container.appendChild(newImgWindow);
      newImgWindow.setAttribute("class", "img-window");
      newImgWindow.setAttribute("onclick", "closeImg()");

      // create new img element,add attributes and append
      let newImg = document.createElement("img");
      newImgWindow.appendChild(newImg);
      newImg.setAttribute("src", `${link}img/img${getLatestOpenedImg}.jpg`);
      newImg.setAttribute("id", "current-img");

      // calculate the width of the image and add buttons
      newImg.onload = function () {
        let imgWidth = this.width;
        console.log(imgWidth);
        let calcImgToEdge = (windowWidth - imgWidth) / 2 - 80;
        let newNextBtn = document.createElement("a");
        let btnNextText = document.createTextNode("Next");
        newNextBtn.appendChild(btnNextText);
        container.appendChild(newNextBtn);
        newNextBtn.setAttribute("class", "img-btn-next");
        newNextBtn.setAttribute("onclick", "changeImg(1)");
        newNextBtn.style.cssText = `right:${calcImgToEdge}px`;

        let newPrevBtn = document.createElement("a");
        let btnPrevText = document.createTextNode("Prev");
        newPrevBtn.appendChild(btnPrevText);
        container.appendChild(newPrevBtn);
        newPrevBtn.setAttribute("class", "img-btn-prev");
        newPrevBtn.setAttribute("onclick", "changeImg(0)");
        newPrevBtn.style.cssText = `left:${calcImgToEdge}px`;
      };
    };
  });
}

function closeImg() {
  document.querySelector(".img-window").remove();
  document.querySelector(".img-btn-prev").remove();
  document.querySelector(".img-btn-next").remove();
}

//  based on the index get the next or prev image

function changeImg(changeDirection) {
  document.querySelector("#current-img").remove();

  let getImgWindow = document.querySelector(".img-window");
  let newImg = document.createElement("img");
  getImgWindow.appendChild(newImg);

  let calcNewImg;
  if (changeDirection === 1) {
    calcNewImg = getLatestOpenedImg + 1;
    if (calcNewImg > galleryImages.length) {
      calcNewImg = 1;
    }
  } else if (changeDirection === 0) {
    calcNewImg = getLatestOpenedImg - 1;
    if (calcNewImg < 1) {
      calcNewImg = galleryImages.length;
    }
  }

  newImg.setAttribute("src", `img/img${calcNewImg}.jpg`);
  newImg.setAttribute("id", "current-img");
  getLatestOpenedImg = calcNewImg;

  newImg.onload = function () {
    let imgWidth = this.width;
    let calcImgToEdge = (windowWidth - imgWidth) / 2 - 80;

    let nextBtn = document.querySelector(".img-btn-next");
    nextBtn.style.cssText = `right: ${calcImgToEdge}px`;

    let prevBtn = document.querySelector(".img-btn-prev");
    prevBtn.style.cssText = `left: ${calcImgToEdge}px`;
  };
}
