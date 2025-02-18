let historyPage = document.addEventListener('DOMContentLoaded' , function () {
    getAllDataFromSessionStorage();
})

let i = 0;

export function getAllDataFromSessionStorage() {
    let history = document.getElementById('history-div')
    let historySm = document.getElementById('history-div-sm')
    i++;

    // console.log(sessionStorage.length , i);
   
    // for (let i = sessionStorage.length - 2; i < sessionStorage.length -1; i++) {
      let key = sessionStorage.key(i-1);
      let value = sessionStorage.getItem(key);

      if (key == "IsThisFirstTime_Log_From_LiveServer") {

      }
      else {
      history.innerHTML += `<p class="history-div" ><span>${key}</span>
      <span> = ${value}</span>
      </p>
      `

      historySm.innerHTML += `<p class="history-div" ><span>${key}</span>
      <span> = ${value}</span>
      </p>
      `
      }
      
    // }
    
  }

export default historyPage;