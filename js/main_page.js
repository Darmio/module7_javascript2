let scrollPosition;
const containerEl = document.querySelector('#certificates-wrapper');
let isScroll;

function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }
  
  function returnToScrollPosition() { 
    scrollPosition = localStorage.getItem("scrollPosition");
    window.scrollTo(0, scrollPosition);
    localStorage.setItem("isScroll", false);
  }

  function saveScrollPosition(scrollPos) {
    setTimeout(
        function () {
              localStorage.setItem("scrollPosition", scrollPos);
              localStorage.setItem("isScroll", true);
        //    }
        }, 4000);
  }

  function export2json() {
    originalData = JSON.parse(localStorage.getItem('certificates'));
    originalData = originalData.slice(1, 200);
    let i = 1;
    originalData.forEach(item => {
      var dat = new Date;
      dat.setDate(Math.floor(Math.random() * (1 - 30 + 1)) + 1);
      dat.setMonth(Math.floor(Math.random() * (1 - 12)) + 1);
      dat.setFullYear(2023);
      item['id'] = i;
      item['description'] = item.name;
      item["image"] = "img" + i + ".jpg";
      item['duration'] = getRnd(1, 100);
      item['price'] = getRnd(1.2, 999.9);
      item['createDate'] = dat;
      item['lastUpdateDate'] = new Date(Date.now());
      i++;
    });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([JSON.stringify(originalData, null, 2)], {
      type: "text/plain"
    }));
    a.setAttribute("download", "certif.json");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } 

  function getRnd(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }