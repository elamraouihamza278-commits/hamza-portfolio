// Tinkercad Carousel Logic
let slideIndex = 0;

function showSlides(n) {
    let slides = document.getElementsByClassName("carousel-slide");
    if (slides.length === 0) return;
    
    if (n >= slides.length) { slideIndex = 0; }
    if (n < 0) { slideIndex = slides.length - 1; }
    
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex].style.display = "block";
}

function moveSlide(n) {
    showSlides(slideIndex += n);
}

// Simple Visitor Counter using CountAPI
function initVisitorCounter() {
    const counterElement = document.getElementById('visitCount');
    if (!counterElement) return;

    // Use CountAPI for anonymous public page counter
    fetch('https://api.countapi.xyz/hit/hamza-portfolio-elamraoui/visits')
        .then(res => res.json())
        .then(data => {
            counterElement.innerText = data.value || '120+';
        })
        .catch(err => {
            // Fallback display if API is offline
            counterElement.innerText = '150+';
        });
}

document.addEventListener('DOMContentLoaded', () => {
    showSlides(slideIndex);
    initVisitorCounter();
});
