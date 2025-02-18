document.addEventListener("DOMContentLoaded", function () {
  getAllDataFromSessionStorage();
});

export function getAllDataFromSessionStorage() {
  let history = document.getElementById("history-div");
  let historySm = document.getElementById("history-div-sm");
  let historyDelete = document.getElementById("delete");
  let content = "";
  let contentSm = "";

  for (let i = 0; i < sessionStorage.length; i++) {
    let key = sessionStorage.key(i);
    let value = sessionStorage.getItem(key);

    if (
      key === "IsThisFirstTime_Log_From_LiveServer" ||
      key === "Error" ||
      value === "Error"
    )
      continue;

    content += `<p class="history-div"><span>${key}</span>
                  <span> = ${value}</span></p>`;

    contentSm += `<p class="history-div"><span>${key}</span>
                    <span> = ${value}</span></p>`;
  }

  history.innerHTML = content;
  historySm.innerHTML = contentSm;

  historyDelete.addEventListener("click", function () {
    sessionStorage.clear();
    history.innerHTML = "";
  });
}

export default getAllDataFromSessionStorage;
