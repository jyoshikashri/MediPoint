document.getElementById('uploadBtn').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('image', file);

    fetch('http://127.0.0.1:8000/api/upload/', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        if (data.message) {
            document.querySelector('input[type="search"]').value = data.message;
        } else {
            alert('Error: ' + data.error);
        }

        // Clear the file input element so that it can accept new files
        document.getElementById('uploadBtn').value = '';
    })
    .catch(error => {
        console.error('Error:', error);
        // Clear the file input element even if there's an error
        document.getElementById('uploadBtn').value = '';
    });
});

var swiper = new Swiper(".mySwiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    initialSlide: 1,
    loop: true,
    autoplay: {
        delay: 1500,
        disableOnInteraction: true,
    },
    coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
    },
    pagination: {
        el: ".swiper-pagination",
    },
});

document.addEventListener('DOMContentLoaded', function () {
    const slider = document.getElementById('slider');
    const nextButton = document.getElementById('next');
    const prevButton = document.getElementById('prev');
    let currentIndex = 0;
    const items = document.querySelectorAll('.carousel-item');
    const itemWidth = items[0].offsetWidth + 16; // 16px margin-right

    function updateCarousel() {
        slider.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    }

    nextButton.addEventListener('click', () => {
        if (currentIndex < items.length - 1) {
            currentIndex++;
            updateCarousel();
        }
    });

    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });
});

var searchOverlay = document.querySelector(".search-overlay");
var popupSearch = document.querySelector(".popup-search");
var loginPopup = document.querySelector(".login-popup");
var searchButton = document.querySelector(".search-box");
var closeButton = document.querySelector(".close-button");
var closeButton2 = document.querySelector(".close-button2");
var loginButton = document.querySelector(".login-box");
var demoheader = document.querySelector(".demoheader");

searchButton.addEventListener("click", function() {
    searchOverlay.classList.add("visible");
    popupSearch.classList.add("visible");
    demoheader.style.display = "none";
});

closeButton.addEventListener("click", function() {
    searchOverlay.classList.remove("visible");
    popupSearch.classList.remove("visible");
    demoheader.style.display = "block";
    document.getElementById('searchInput').value = ''; // Clear the search input
    document.getElementById('searchResults').innerHTML = ''; // Clear the search results
});

loginButton.addEventListener("click", function() {
    searchOverlay.classList.add("visible");
    loginPopup.classList.add("visible");
    demoheader.style.display = "none";
});

closeButton2.addEventListener("click", function() {
    searchOverlay.classList.remove("visible");
    loginPopup.classList.remove("visible");
    demoheader.style.display = "block";
});

// Create a new IntersectionObserver instance
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry);
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('hidden1')) {
                entry.target.classList.add('show1');
            } else if (entry.target.classList.contains('hidden2')) {
                entry.target.classList.add('show2');
            } else if (entry.target.classList.contains('hidden3')) {
                entry.target.classList.add('show3');
            }
        } else {
            if (entry.target.classList.contains('hidden1')) {
                entry.target.classList.remove('show1');
            } else if (entry.target.classList.contains('hidden2')) {
                entry.target.classList.remove('show2');
            } else if (entry.target.classList.contains('hidden3')) {
                entry.target.classList.remove('show3');
            }
        }
    });
});

// Select all elements with the class 'hidden1'
const hiddenElements1 = document.querySelectorAll('.hidden1');
hiddenElements1.forEach((el) => observer.observe(el));

// Select all elements with the class 'hidden2'
const hiddenElements2 = document.querySelectorAll('.hidden2');
hiddenElements2.forEach((el) => observer.observe(el));

// Select all elements with the class 'hidden3'
const hiddenElements3 = document.querySelectorAll('.hidden3');
hiddenElements3.forEach((el) => observer.observe(el));

document.getElementById('searchButton').addEventListener('click', function(event) {
    event.preventDefault();
    const query = document.getElementById('searchInput').value.toLowerCase().split(' ');

    // Sample product data
    const products = [
        { name: 'sugar free natura', price: '$3', image: 'images/sugar free.jpg' },
        { name: 'mothers horlicks', price: '$5', image: 'images/mothers horlicks.jpg' },
        { name: 'diabetic care', price: '$10', image: 'images/ensure.jpg' },
        { name: 'whey protein', price: '$10', image: 'images/whey.jpg' },
        { name: 'isolate whey', price: '$10', image: 'images/isolate.png' },
        { name: 'Amlip-10', price: '$2', image: 'images/Amlip-10.png' },
        { name: 'Asulina-D', price: '$2.39', image: 'images/Asulina-D.jpg'},
        { name: 'Dart', price: '$1.22', image: 'images/dart.jpg'},
        { name: 'okacet', price: '$0.67', image: 'images/okcet.jpg'},
        { name: 'wikoryl', price: '$0.67', image: 'images/wikoryl.jpg'}
    ];

    const resultsContainer = document.getElementById('searchResults');
    resultsContainer.innerHTML = ''; // Clear previous results

    const minMatchLength = 2; // Minimum characters to match
    const threshold = 0.5; // Percentage of characters to match

    const filteredProducts = products.filter(product => {
        const productName = product.name.toLowerCase();
        let matchCount = 0;

        for (const word of query) {
            if (productName.includes(word) && word.length >= minMatchLength) {
                matchCount++;
            }
        }

        return matchCount > 0;
    });

    if (filteredProducts.length > 0) {
        filteredProducts.forEach(product => {
            const productElement = document.createElement('div');
            productElement.classList.add('product-result', 'flex', 'flex-col', 'items-center', 'border', 'border-gray-300', 'shadow-xl', 'bg-gray-100', 'p-4', 'm-2', 'rounded', 'w-64'); // Use a fixed width
            productElement.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="max-h-44 mb-2">
                <div class="text-center">
                    <h1 class="text-xl font-bold">${product.name}</h1>
                    <p class="text-lg">${product.price}</p>
                </div>
                <button class="my-3 p-2 bg-blue-500 text-white rounded cursor-pointer">Add To Cart</button>
            `;
            resultsContainer.appendChild(productElement);
        });
    } else {
        resultsContainer.innerHTML = '<p class="text-gray-800 text-2xl flex justify-center">No products found.</p>';
    }
});

