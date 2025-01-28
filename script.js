const themeToggleButton = document.querySelector('.theme-toggle');
const canvases = document.querySelectorAll('.paintbrushCanvas');
const intervals = new Map();
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    document.body.classList.add(currentTheme);
} else {
    
    document.body.classList.add('dark-mode');
}
function triggerUnderlineAnimation() {
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.classList.remove('underline'); 
        void logo.offsetWidth; 
        logo.classList.add('underline'); 
    }
}
function clearCanvas(canvas, ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
function drawContinuousStroke(canvas, ctx) {
    const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    const startX = getRandomInt(0, canvas.width);
    const startY = getRandomInt(0, canvas.height);
    const endX = getRandomInt(0, canvas.width);
    const endY = getRandomInt(0, canvas.height);
    const brushThickness = getRandomInt(10, 20);
    const opacity = Math.random() * 0.5 + 0.3;
    const hue = getRandomInt(0, 360);
    const saturation = getRandomInt(60, 100);
    const lightness = getRandomInt(40, 70);
    const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    ctx.lineWidth = brushThickness;
    ctx.strokeStyle = color;
    ctx.globalAlpha = opacity;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    const controlX = getRandomInt(0, canvas.width);
    const controlY = getRandomInt(0, canvas.height);
    ctx.quadraticCurveTo(controlX, controlY, endX, endY);
    ctx.stroke();
}
function startDrawing(canvas, ctx) {
    
    if (intervals.has(canvas)) {
        clearInterval(intervals.get(canvas));
        intervals.delete(canvas);
    }
    
    const interval = setInterval(() => drawContinuousStroke(canvas, ctx), 100);
    intervals.set(canvas, interval);
    
    setTimeout(() => {
        clearInterval(interval);
        intervals.delete(canvas);
    }, 500);
}
function initializeCanvas(canvas) {
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        console.error('Canvas context not found');
        return;
    }
    const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    startDrawing(canvas, ctx);
    
    themeToggleButton.addEventListener('click', () => {
        clearCanvas(canvas, ctx); 
        startDrawing(canvas, ctx); 
    });
}
canvases.forEach((canvas) => initializeCanvas(canvas));
window.addEventListener('load', triggerUnderlineAnimation);
themeToggleButton.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    document.body.classList.toggle('dark-mode');
    const theme = document.body.classList.contains('light-mode') ? 'light-mode' : 'dark-mode';
    localStorage.setItem('theme', theme);
    triggerUnderlineAnimation();
});
function showPopup(title, description, iconClass) {
    document.getElementById('popup-title').textContent = title;
    document.getElementById('popup-description').textContent = description;
    document.getElementById('popup-icon').className = iconClass; 
    const popup = document.getElementById('service-popup');
    const overlay = document.getElementById('overlay');
    
    popup.style.display = 'flex';
    overlay.style.display = 'block';
    
    setTimeout(() => { 
        popup.style.opacity = 1;
        overlay.style.opacity = 1;
    }, 10);
}
function closePopup() {
    const popup = document.getElementById('service-popup');
    const overlay = document.getElementById('overlay');
    
    popup.style.opacity = 0;
    overlay.style.opacity = 0;
    setTimeout(() => { 
        popup.style.display = 'none'; 
        overlay.style.display = 'none'; 
    }, 300); 
}
function initMap() {
    var officeLocation = { lat: 19.076090, lng: 72.877426 };  
 
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: officeLocation
    });

    
    var marker = new google.maps.Marker({
        position: officeLocation,
        map: map,
        title: "Our Office"
    });
}
function loadGoogleMapsScript() {
    var script = document.createElement("script");
    script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyClZzZ55rK8-1N4koHu0OjoWcszQHUNksI&callback=initMap";  
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
}
window.onload = function () {
    loadGoogleMapsScript();
};
document.getElementById("contactForm").addEventListener("submit", function (event) {
    event.preventDefault();  
    
    var formData = new FormData(event.target);
    var name = formData.get("name");
    var email = formData.get("email");
    var message = formData.get("message");

    
    console.log("Form Submitted:");
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Message:", message);

    
    alert("Thank you for contacting us, " + name + "!");
    window.location.href = `thank-you.html`;  
});