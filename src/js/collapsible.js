function toggleCollapsible(event){
    const button = event.target;
    const div = button.nextElementSibling;

    if(div.classList.contains("expanded")){
        div.style.maxHeight = "0px";
        button.textContent = div.dataset.title + "\u23F5";
    }
    else{
        div.style.maxHeight = "";
        button.textContent = div.dataset.title + "\u23F7";
    }
    div.classList.toggle("expanded");
}

function createCollapsible(){
    const divs = document.querySelectorAll(`div#collapsible`);

    divs.forEach(div => {
        const button = document.createElement('button');

        if(div.classList.contains("expanded")){
            button.textContent = div.dataset.title + "\u23F7";
        }
        else{
            div.style.maxHeight = "0px";
            button.textContent = div.dataset.title + "\u23F5";
        }
        
        button.classList.add("collapsibleButton");
        button.addEventListener("click", toggleCollapsible);
        div.parentNode.insertBefore(button, div);
    });
}
