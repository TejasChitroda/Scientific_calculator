document.addEventListener("DOMContentLoaded", function () {
    let main = document.getElementById("main");
    // main.classList.remove();
    let theme = localStorage.getItem('theme');
    console.log(`theme class is : ${theme}`)
    main.className = theme ? theme : 'theme_light';
    // keepFocus();
   
})



function changeTheme() {
    let main = document.getElementById("main");
    let themeClass;
    if (main.classList.contains("theme_light")) {
        main.classList.replace("theme_light", "theme_dark"); // dark mode
        themeClass = "theme_dark";
    } else {
        main.classList.replace("theme_dark", "theme_light"); // light mode
        themeClass = "theme_light";
    }
 
    try {
        // let localTheme = localStorage.getItem('theme');
        localStorage.setItem('theme', themeClass);
        console.log("theme clas is : ", localStorage.getItem('theme'))
    } catch (err) {
        console.error(`error in storing theme: ${err}`)
    }
}