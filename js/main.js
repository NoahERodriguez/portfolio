// Typing Effect ----------------------------------------------------
const TypeWriter = function(txtElement, words, wait = 3000){
    this.txtElement = txtElement;
    this.words = words;
    this.txt = "";
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
}

// Type method
TypeWriter.prototype.type = function(){
    // Current index of word
    const i = this.wordIndex % this.words.length;

    // Get full text of current word
    const fullTxt = this.words[i];

    // Check if deleting
    if(this.isDeleting){
        // Remove character
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    }else{
        // Add char
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    // Insert txt into element
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

    // Type speed
    let typeSpeed = 300;
    if(this.isDeleting){
        typeSpeed /= 2;
    }

    // If word is complete
    if(!this.isDeleting && this.txt === fullTxt){
        // Pause
        typeSpeed = this.wait;
        // Set delete to true
        this.isDeleting = true;
    }else if(this.isDeleting && this.txt === ""){
        this.isDeleting = false;
        // Move to next index
        this.wordIndex++;
        // Pause
        typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed)
}

// Init on DOM load
document.addEventListener("DOMContentLoaded", init);

// Init app
function init(){
    const txtElement = document.querySelector(".txt-type");
    const words = JSON.parse(txtElement.getAttribute("data-words"));
    const wait = txtElement.getAttribute("data-wait");

    // Init type writer
    new TypeWriter(txtElement, words, wait);
}

// Smooth Scroll ----------------------------------------------------
var scrollLink = $(".scroll");

// Smooth scrolling
scrollLink.on("click", function(e) {
    if(this.hash != ""){
        e.preventDefault();
        const hash = this.hash;

        $('body,html').animate({
        scrollTop: $(hash).offset().top
        }, 1000 );
    }
});

// Sticky nav ----------------------------------------------------
$(document).ready(function(){
    $(window).scroll(function(){
        if(this.scrollY > 20)
            $(".navbar").addClass("sticky");
        else
            $(".navbar").removeClass("sticky");
    });
    // Media Navbar ----------------------------------------------------
    $(".menu-toggler").click(function(){
        $(this).toggleClass("active");
        $(".navbar-menu").toggleClass("active");
    });
});