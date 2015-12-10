var navElements = document.getElementsByClassName('nav_element');
for(var x = 0; x < navElements.length; ++x){
    var nav = navElements[x];
    if (nav.children[0].innerText.toLowerCase() === window.location.pathname.substring(1)){
        // nav.style.backgroundColor = 'rgba(95, 95, 95, 0.64)';
        nav.classList.add('selected_nav');
    }
}
