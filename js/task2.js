import data from '../certificates_data.json' assert {type: 'json'};

let certificateData;
let pageData;
let countPerRow = document.getElementById("countPerRow").value;
let rowsPerPage = document.getElementById("rowsPerPage").value;
let container = document.querySelector('#certificates-wrapper');
let rows = parseInt(rowsPerPage);
let btnScrollTop = document.getElementById("btnScrollTop");

init();

function init(){
  certificateData = data.sort((a, b) => new Date(b.createDate)-new Date(a.createDate));
  localStorage.setItem('certificates', JSON.stringify(certificateData));
  scrollTop();
  loadData(0);
}


function loadData(numberPage) {
  let numPage = parseInt(numberPage);
  let size = parseInt(rowsPerPage)*parseInt(countPerRow);
  pageData = numPage * size >= certificateData.length ? [] :
  certificateData.slice(numPage * size, Math.min((numPage + 1) * size, certificateData.length));
  loadPage();
}

function loadPage(){
  pageData.forEach(item => {
    createProduct(item);
  });
}

function loadRow(rows){
  let curEl = rows * countPerRow;
  pageData = curEl >= certificateData.length ? [] :
  certificateData.slice(curEl, Math.min(curEl + countPerRow, certificateData.length));
  pageData.forEach(item => {
    createProduct(item);
  });
}

 function checkImage(src, divEl) {
  var img = new Image();
  img.onload = function() {
      divEl.src = src;
    return true;
  };
  img.onerror = function() {
   return false;
  };

  img.src = src; 
}

async function createProduct(product) {
  let productCert = document.createElement('div');
  productCert.className = 'certificate';

  let productDivImg = document.createElement('div');
  productDivImg.className = 'certificate-image';

  let productImg = document.createElement('img');
  productImg.alt = product.name;
  var imgUrl = "../images/"+product.image;
  let isExist = await checkImage(imgUrl, productImg);
  /*if(isExist==true){
    console.log("load "+imgUrl);
    productImg.src = imgUrl;
  }*/

  productDivImg.appendChild(productImg);

  let productInfo = document.createElement('div');
  productInfo.className = 'certificate-description';

  let productTitle= document.createElement('div');
  productTitle.className = 'certificate-title';

  let productTitleText= document.createElement('div');
  productTitleText.className = 'certificate-title-text';
  productTitleText.textContent = "" +product.id + "" +product.name;


  let productBrief= document.createElement('div');
  productBrief.className = 'certificate-brief';

  let productBriefText= document.createElement('div');
  productBriefText.className = 'certificate-brief-text';
  productBriefText.textContent = product.description;

  let aFavorite = document.createElement('a');
  aFavorite.href = "favorites.html";
  let imgFavorite = document.createElement('img');
  imgFavorite.src = "../img/favorite_black_24dp.svg";
  imgFavorite.alt = "favorite";
  imgFavorite.title = "favorite";

  aFavorite.appendChild(imgFavorite);

  // Create 'product-expires-in' p
  let productExpiresIn = document.createElement('span');
  productExpiresIn.className = 'certificate-brief-expires';
  productExpiresIn.textContent = 'Expires in ' + product.duration + ' days';

  // Create 'product-footer' div
  let productDetails = document.createElement('div');
  productDetails.className = 'certificate-details';

  // Create 'product-price' span
  let productPrice = document.createElement('div');
  productPrice.className = 'certificate-details-price';
  productPrice.textContent = '$' + product.price;

  // Create 'add-to-cart-btn' button
  let addToCartBtn = document.createElement('button');
  addToCartBtn.className = 'certificate-details-button';
  addToCartBtn.textContent = 'Add to Cart';

  productBrief.appendChild(productBriefText);
  productBrief.appendChild(productExpiresIn);

  // Append children to 'product-footer' div
  productDetails.appendChild(productPrice);
  productDetails.appendChild(addToCartBtn);
  productTitle.appendChild(productTitleText);
  productTitle.appendChild(aFavorite);

  // Append children to 'product-info' div
  productInfo.appendChild(productTitle);
  productInfo.appendChild(productBrief);
  productInfo.appendChild(productDetails); 

  // Append children to 'product-container' div
  productCert.appendChild(productDivImg);
  productCert.appendChild(productInfo);

  // Append children to 'page-content' div
  container.appendChild(productCert);
}

/*async function checkIfImageExists(url) {
  try{
   await fetch(url)
  .then(function(response) {
      if(response.status == 200){
           return url;
        }
         
     })
    }catch(err){
        return "";
    }
   return ""; 
 
}*/

function reload(){
  clear();
  scrollTop();
  certificateData = JSON.parse(localStorage.getItem('certificates'));
  let filter = document.getElementById("search").value;
  
  if(filter!=null && filter!=""){
  certificateData = filterItems(filter);
  }
  loadData(0);
}

function filterItems(filterStr) {
  let filterStrLc = filterStr.toLowerCase();
  return certificateData.filter(item => item.name.toLowerCase().includes(filterStrLc)
  || item.description.toLowerCase().includes(filterStrLc));
}

function clear() {
  while (container.lastElementChild) {
    container.removeChild(container.lastElementChild);
  }
}

function debounce(callback, wait) {
  let timeout;
  return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(function () {
          callback.apply(this, args);
      }, wait);
  };
}

document.getElementById("search").addEventListener("keyup", debounce(() => {
  reload();
},100));

window.addEventListener('scroll', debounce(()=>{
  if(window.scrollY + window.innerHeight >= 
  document.documentElement.scrollHeight){
    loadRow(rows++);
  }
  scrollFunction();
})
)



// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    btnScrollTop.style.display = "block";
  } else {
    btnScrollTop.style.display = "none";
  }

 if(document.documentElement.scrollTop>(document.documentElement.clientHeight)){
  localStorage.setItem("isScroll", false);
 saveScrollPosition(document.documentElement.scrollTop);
 }

  if(localStorage.getItem("isScroll")){
    btnScrollReturn.style.display = "block";
  }else{
    btnScrollReturn.style.display = "none";
  }
  
}

function scrollTop() {
  document.body.scrollTop = 0; 
  document.documentElement.scrollTop = 0;
}

/*container.addEventListener("scroll", event => {

                      
}, { passive: false }); */


