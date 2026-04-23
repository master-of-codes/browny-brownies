// --- PWA Service Worker Registration ---
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then((registration) => {
                console.log('Service Worker registered with scope:', registration.scope);
            })
            .catch((error) => {
                console.log('Service Worker registration failed:', error);
            });
    });
}

// --- PWA Installation Logic ---
let deferredPrompt;
const installDialog = document.getElementById('install-dialog');
const installConfirm = document.getElementById('install-confirm');
const installCancel = document.getElementById('install-cancel');

// Listen for beforeinstallprompt event
window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Store the event for later use
    deferredPrompt = e;
    // Show our custom dialog
    showInstallDialog();
});

function showInstallDialog() {
    if (installDialog) {
        installDialog.classList.add('active');
    }
}

function hideInstallDialog() {
    if (installDialog) {
        installDialog.classList.remove('active');
    }
}

// Install button click
if (installConfirm) {
    installConfirm.addEventListener('click', async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            console.log('User response to install prompt:', outcome);
            deferredPrompt = null;
        }
        hideInstallDialog();
    });
}

// Cancel button click
if (installCancel) {
    installCancel.addEventListener('click', () => {
        hideInstallDialog();
    });
}

// --- Double-click on footer to show install dialog ---
const footerLogo = document.querySelector('.footer-logo');
if (footerLogo) {
    footerLogo.addEventListener('dblclick', () => {
        showInstallDialog();
    });
}

// --- Product Data ---
// FIRST define imageUrls array
const imageUrls = [
    "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1621303837174-89787a7d4729?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1535141192574-5d4897c12636?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1506459225024-1428097a7e18?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1569864358642-9d1684040f43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1519671569435-08e16fd46f5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1557925923-33b2512ea2aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
];

// THEN define products (Brownie products)
const products = [
    {
        id: 1,
        title: "Ultimate Fudgy Brownie",
        category: "Classic Brownies",
        price: "₹250",
        description: "Rich, fudgy chocolate brownie with crackly top and molten center.",
        images: [imageUrls[0], imageUrls[1]],
        plans: [
            {feature: "Half Tray (12 pcs)", price: "₹250"},
            {feature: "Full Tray (24 pcs)", price: "₹500"},
            {feature: "Gift Box (16 pcs)", price: "₹650"}
        ]
    },
    {
        id: 2,
        title: "Walnut Crunch Brownie",
        category: "Classic Brownies",
        price: "₹280",
        description: "Fudgy brownie loaded with crunchy California walnuts.",
        images: [imageUrls[6]],
        plans: [
            {feature: "Half Tray (12 pcs)", price: "₹280"},
            {feature: "Full Tray (24 pcs)", price: "₹550"},
            {feature: "Gift Box (16 pcs)", price: "₹700"}
        ]
    },
    {
        id: 3,
        title: "Oreo Stuffed Brownie",
        category: "Flavor Fusion",
        price: "₹350",
        description: "Fudgy brownie with whole Oreo cookies stuffed in the center.",
        images: [imageUrls[2], imageUrls[7]],
        plans: [
            {feature: "Half Tray (12 pcs)", price: "₹350"},
            {feature: "Full Tray (24 pcs)", price: "₹700"},
            {feature: "Gift Box (16 pcs)", price: "₹850"}
        ]
    },
    {
        id: 4,
        title: "Biscoff Bliss Brownie",
        category: "Flavor Fusion",
        price: "₹380",
        description: "Caramelized Biscoff cookie brownie with lotus spread swirl.",
        images: [imageUrls[8]],
        plans: [
            {feature: "Half Tray (12 pcs)", price: "₹380"},
            {feature: "Full Tray (24 pcs)", price: "₹750"},
            {feature: "Premium Box (16 pcs)", price: "₹900"}
        ]
    },
    {
        id: 5,
        title: "Triple Chocolate Overload",
        category: "Gourmet Brownies",
        price: "₹300",
        description: "Three types of chocolate: dark, milk, and white in one fudgy bite.",
        images: [imageUrls[1]],
        plans: [
            {feature: "Half Tray (12 pcs)", price: "₹300"},
            {feature: "Full Tray (24 pcs)", price: "₹600"},
            {feature: "Gift Box (16 pcs)", price: "₹750"}
        ]
    },
    {
        id: 6,
        title: "Nutella Stuffed Brownie",
        category: "Gourmet Brownies",
        price: "₹380",
        description: "Gooey Nutella core surrounded by fudgy chocolate brownie.",
        images: [imageUrls[3]],
        plans: [
            {feature: "Half Tray (12 pcs)", price: "₹380"},
            {feature: "Full Tray (24 pcs)", price: "₹750"},
            {feature: "Lovers Box (12 pcs)", price: "₹850"}
        ]
    },
    {
        id: 7,
        title: "Brownie Ferrero Rocher",
        category: "Gourmet Brownies",
        price: "₹400",
        description: "Luxury brownie topped with whole Ferrero Rocher chocolates.",
        images: [imageUrls[9]],
        plans: [
            {feature: "Half Tray (12 pcs)", price: "₹400"},
            {feature: "Full Tray (24 pcs)", price: "₹800"},
            {feature: "Premium Gift Box", price: "₹950"}
        ]
    },
    {
        id: 8,
        title: "Salted Caramel Dream",
        category: "Flavor Fusion",
        price: "₹380",
        description: "Fudgy brownie with house-made salted caramel swirl.",
        images: [imageUrls[4]],
        plans: [
            {feature: "Half Tray (12 pcs)", price: "₹380"},
            {feature: "Full Tray (24 pcs)", price: "₹750"},
            {feature: "Gift Box (16 pcs)", price: "₹850"}
        ]
    },
    {
        id: 9,
        title: "Red Velvet Blondie",
        category: "Flavor Fusion",
        price: "₹350",
        description: "Chewy blondie with red velvet cake mix and cream cheese icing.",
        images: [imageUrls[9]],
        plans: [
            {feature: "Half Tray (12 pcs)", price: "₹350"},
            {feature: "Full Tray (24 pcs)", price: "₹700"},
            {feature: "Gift Box (16 pcs)", price: "₹850"}
        ]
    },
    {
        id: 10,
        title: "Loaded Brookie",
        category: "Gourmet Brownies",
        price: "₹380",
        description: "Brownie + cookie hybrid loaded with chocolate chips and M&Ms.",
        images: [imageUrls[5]],
        plans: [
            {feature: "Half Tray (12 pcs)", price: "₹380"},
            {feature: "Full Tray (24 pcs)", price: "₹750"},
            {feature: "Party Box (24 pcs)", price: "₹900"}
        ]
    },
    {
        id: 11,
        title: "Peanut Butter Swirl",
        category: "Classic Brownies",
        price: "₹300",
        description: "Fudgy brownie with creamy peanut butter swirls throughout.",
        images: [imageUrls[1], imageUrls[6]],
        plans: [
            {feature: "Half Tray (12 pcs)", price: "₹300"},
            {feature: "Full Tray (24 pcs)", price: "₹600"},
            {feature: "Gift Box (16 pcs)", price: "₹750"}
        ]
    },
    {
        id: 12,
        title: "Matcha Green Tea",
        category: "Flavor Fusion",
        price: "₹350",
        description: "Unique matcha infused white chocolate brownie with earthy notes.",
        images: [imageUrls[2]],
        plans: [
            {feature: "Half Tray (12 pcs)", price: "₹350"},
            {feature: "Full Tray (24 pcs)", price: "₹700"}
        ]
    }
];

// --- Variables & Elements ---
let currentCategory = "All";
let visibleItems = 8;
const productsGrid = document.getElementById("products-grid");
const showMoreBtn = document.getElementById("show-more-btn");
const filterBtns = document.querySelectorAll(".filter-btn");
const searchBar = document.querySelector(".search-bar");
const searchClear = document.querySelector(".search-clear");
const searchIcon = document.querySelector(".search-icon");
const mobileSearchToggle = document.querySelector(".mobile-search-toggle");
const searchContainer = document.querySelector(".search-container");
let searchQuery = "";

// --- Render Cards ---
function renderCards() {
    if (!productsGrid) {
        console.error('products-grid element not found');
        return;
    }
    
    productsGrid.innerHTML = "";
    
    // Filter products
    let filteredProducts = currentCategory === "All" 
        ? products 
        : products.filter(p => p.category === currentCategory);
        
    // Apply search query filter
    if (searchQuery) {
        filteredProducts = filteredProducts.filter(p => 
            p.title.toLowerCase().includes(searchQuery) ||
            p.description.toLowerCase().includes(searchQuery)
        );
    }
        
    // Show "No matching items" message if no results
    if (filteredProducts.length === 0) {
        productsGrid.innerHTML = `
            <div class="no-results">
                <p>No matching items found</p>
            </div>
        `;
        if (showMoreBtn) showMoreBtn.style.display = "none";
        return;
    }
    
    // Slice for pagination
    const productsToShow = filteredProducts.slice(0, visibleItems);
    
    productsToShow.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card reveal";
        card.innerHTML = `
            <div class="card-img-wrapper">
                <img src="${product.images[0]}" alt="${product.title}" class="card-img" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjhmNWZmIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzRhNGFiYyIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIGxvYWRpbmc8L3RleHQ+PC9zdmc+'" loading="lazy">
            </div>
            <div class="card-body">
                <h3 class="card-title">${product.title}</h3>
                <p class="card-desc">${product.description}</p>
                <p class="card-price">${product.price}</p>
            </div>
        `;
        
        // Add click listener for modal
        card.addEventListener("click", () => openModal(product));
        
        productsGrid.appendChild(card);
    });
    
    // Add revealed class to make cards visible
    setTimeout(() => {
        const newCards = document.querySelectorAll(".product-card.reveal");
        newCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add("revealed");
                card.style.opacity = "1";
            }, index * 50);
        });
    }, 10);

    // Hide/Show 'Show More' button
    if (visibleItems >= filteredProducts.length) {
        if (showMoreBtn) showMoreBtn.style.display = "none";
    } else {
        if (showMoreBtn) showMoreBtn.style.display = "inline-block";
    }
}

// --- Search Logic ---
if (searchBar) {
    searchBar.addEventListener("input", (e) => {
        searchQuery = e.target.value.toLowerCase().trim();
        visibleItems = 8; // Reset pagination on search
        
        // Show/hide clear button and search icon based on input
        if (searchQuery) {
            if (searchClear) searchClear.classList.add("visible");
            if (searchIcon) searchIcon.style.display = "none";
        } else {
            if (searchClear) searchClear.classList.remove("visible");
            if (searchIcon) searchIcon.style.display = "block";
        }
        
        renderCards();
    });
}

// Clear search button
if (searchClear) {
    searchClear.addEventListener("click", () => {
        if (searchBar) searchBar.value = "";
        searchQuery = "";
        searchClear.classList.remove("visible");
        if (searchIcon) searchIcon.style.display = "block";
        visibleItems = 8;
        renderCards();
        if (searchBar) searchBar.focus();
    });
}

// Mobile search toggle
if (mobileSearchToggle && searchContainer) {
    mobileSearchToggle.addEventListener("click", () => {
        searchContainer.classList.toggle("active");
        if (searchContainer.classList.contains("active") && searchBar) {
            searchBar.focus();
        }
    });
}

// --- Filter Logic ---
if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            // Update active class
            filterBtns.forEach(b => b.classList.remove("active"));
            e.target.classList.add("active");
            
            // Reset variables and render
            currentCategory = e.target.getAttribute("data-filter");
            visibleItems = 8;
            renderCards();
        });
    });
}

// --- Show More Logic ---
if (showMoreBtn) {
    showMoreBtn.addEventListener("click", () => {
        visibleItems += 8;
        renderCards();
    });
}

// --- Product Modal Logic ---
const modal = document.getElementById("product-modal");
const modalClose = document.getElementById("modal-close");
const modalTitle = document.getElementById("modal-title");
const modalDesc = document.getElementById("modal-desc");
const modalPlansList = document.getElementById("modal-plans-list");
const modalImageContainer = document.getElementById("modal-image-container");

function openModal(product) {
    if (!modalTitle || !modalDesc || !modalPlansList || !modalImageContainer) return;
    
    modalTitle.textContent = product.title;
    modalDesc.textContent = product.description;
    
    // Render Plans
    modalPlansList.innerHTML = "";
    product.plans.forEach(plan => {
        const li = document.createElement("li");
        li.className = "plan-item";
        li.innerHTML = `
            <span class="plan-feature">${plan.feature}</span>
            <span class="plan-price">${plan.price}</span>
        `;
        modalPlansList.appendChild(li);
    });
    
    // Render Images (Static vs Carousel)
    modalImageContainer.innerHTML = "";
    if (product.images.length === 1) {
        modalImageContainer.innerHTML = `<img src="${product.images[0]}" alt="${product.title}" style="width:100%; height:100%; object-fit:cover;" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjhmNWZmIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzRhNGFiYyIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIGxvYWRpbmc8L3RleHQ+PC9zdmc+'">`;
    } else {
        // Build Carousel
        let carouselHTML = `
            <div class="carousel">
                <div class="carousel-inner" id="modal-carousel-inner">
                    ${product.images.map((img, idx) => `
                        <div class="carousel-item ${idx === 0 ? 'active' : ''}">
                            <img src="${img}" alt="${product.title} image ${idx + 1}" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjhmNWZmIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzRhNGFiYyIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIGxvYWRpbmc8L3RleHQ+PC9zdmc+'" style="width:100%; height:100%; object-fit:cover;">
                        </div>
                    `).join('')}
                </div>
                <button class="carousel-control prev" onclick="moveModalCarousel(-1)"><ion-icon name="chevron-back-outline"></ion-icon></button>
                <button class="carousel-control next" onclick="moveModalCarousel(1)"><ion-icon name="chevron-forward-outline"></ion-icon></button>
                <div class="carousel-dots" id="modal-carousel-dots">
                    ${product.images.map((_, idx) => `
                        <span class="dot ${idx === 0 ? 'active' : ''}" onclick="setModalCarousel(${idx})"></span>
                    `).join('')}
                </div>
            </div>
        `;
        modalImageContainer.innerHTML = carouselHTML;
        window.currentModalImageIndex = 0;
        window.modalImageCount = product.images.length;
    }
    
    if (modal) {
        modal.classList.add("active");
        document.body.style.overflow = "hidden";
    }
}

function closeModal() {
    if (modal) {
        modal.classList.remove("active");
        document.body.style.overflow = "auto";
    }
}

if (modalClose) {
    modalClose.addEventListener("click", closeModal);
}

if (modal) {
    modal.addEventListener("click", (e) => {
        if (e.target === modal) closeModal();
    });
}

// Modal Carousel Controls
window.moveModalCarousel = function(dir) {
    const newIdx = (window.currentModalImageIndex + dir + window.modalImageCount) % window.modalImageCount;
    setModalCarousel(newIdx);
};

window.setModalCarousel = function(idx) {
    window.currentModalImageIndex = idx;
    const items = document.querySelectorAll("#modal-carousel-inner .carousel-item");
    const dots = document.querySelectorAll("#modal-carousel-dots .dot");
    
    items.forEach(item => item.classList.remove("active"));
    dots.forEach(dot => dot.classList.remove("active"));
    
    if (items[idx] && dots[idx]) {
        items[idx].classList.add("active");
        dots[idx].classList.add("active");
    }
};

// --- Main Hero Carousel Logic ---
let currentHeroImg = 0;
const heroItems = document.querySelectorAll(".hero .carousel-item");
const heroDots = document.querySelectorAll(".hero .dot");
const heroPrev = document.querySelector(".hero .prev");
const heroNext = document.querySelector(".hero .next");

function updateHeroCarousel() {
    if (heroItems.length === 0) return;
    heroItems.forEach(item => item.classList.remove("active"));
    heroDots.forEach(dot => dot.classList.remove("active"));
    
    heroItems[currentHeroImg].classList.add("active");
    if (heroDots[currentHeroImg]) heroDots[currentHeroImg].classList.add("active");
}

function moveHeroCarousel(dir) {
    if (heroItems.length === 0) return;
    currentHeroImg = (currentHeroImg + dir + heroItems.length) % heroItems.length;
    updateHeroCarousel();
}

if (heroPrev) {
    heroPrev.addEventListener("click", () => moveHeroCarousel(-1));
}

if (heroNext) {
    heroNext.addEventListener("click", () => moveHeroCarousel(1));
}

if (heroDots.length > 0) {
    heroDots.forEach((dot, idx) => {
        dot.addEventListener("click", () => {
            currentHeroImg = idx;
            updateHeroCarousel();
        });
    });
}

// Auto slide hero carousel
setInterval(() => {
    moveHeroCarousel(1);
}, 5000);

// --- FAQ Accordion Logic ---
const accordionHeaders = document.querySelectorAll(".accordion-header");
accordionHeaders.forEach(header => {
    header.addEventListener("click", () => {
        const content = header.nextElementSibling;
        const isActive = header.classList.contains("active");
        
        // Close all
        accordionHeaders.forEach(h => {
            h.classList.remove("active");
            if (h.nextElementSibling) {
                h.nextElementSibling.style.maxHeight = null;
            }
        });
        
        // Open clicked if it wasn't active
        if (!isActive && content) {
            header.classList.add("active");
            content.style.maxHeight = content.scrollHeight + "px";
        }
    });
});

// --- Scroll Reveal Animations & Sticky Header ---
const header = document.querySelector(".header");

const revealOnScroll = () => {
    const winHeight = window.innerHeight;
    const revealPoint = 150;
    
    // Check for reveals that need to be shown
    const allReveals = document.querySelectorAll(".reveal:not(.revealed)");
    allReveals.forEach(reveal => {
        const revealTop = reveal.getBoundingClientRect().top;
        if (revealTop < winHeight - revealPoint) {
            reveal.classList.add("revealed");
        }
    });

    // Sticky Header Styling
    if (header) {
        if (window.scrollY > 50) {
            header.style.boxShadow = "0 4px 15px rgba(0,0,0,0.1)";
            header.style.padding = "10px 0";
        } else {
            header.style.boxShadow = "0 2px 10px rgba(0,0,0,0.05)";
            header.style.padding = "15px 0";
        }
    }
};

window.addEventListener("scroll", revealOnScroll);

// --- Form Validation ---
const contactForm = document.getElementById("contact-form");
if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("name")?.value.trim();
        const mobile = document.getElementById("mobile")?.value.trim();
        if (name && mobile) {
            alert("Thanks, " + name + "! Your message has been sent successfully.");
            contactForm.reset();
        } else {
            alert("Please fill in the required fields.");
        }
    });
}

// --- Mobile Bottom Nav Active State & Smooth Scroll ---
const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".mobile-navbar .nav-item");

window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 150)) {
            current = section.getAttribute("id");
        }
    });

    navItems.forEach(item => {
        item.classList.remove("active");
        const href = item.getAttribute("href");
        if (href && href.includes(current)) {
            item.classList.add("active");
        }
    });
});

// Initialize First Render
document.addEventListener("DOMContentLoaded", () => {
    console.log('DOM loaded, rendering cards...');
    renderCards();
    revealOnScroll();
    console.log('Products count:', products.length);
});