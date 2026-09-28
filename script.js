// ========================================
// TravelTales - JavaScript
// ========================================

// Toast notification helper for non-blocking UI feedback
function showToast(message) {
    if (typeof document === "undefined") return;
    try {
        let toast = document.getElementById("custom-toast-notification");
        if (!toast) {
            toast = document.createElement("div");
            toast.id = "custom-toast-notification";
            toast.style.position = "fixed";
            toast.style.bottom = "24px";
            toast.style.right = "24px";
            toast.style.backgroundColor = "#1e293b";
            toast.style.color = "#ffffff";
            toast.style.padding = "14px 22px";
            toast.style.borderRadius = "8px";
            toast.style.boxShadow = "0 8px 24px rgba(0,0,0,0.25)";
            toast.style.zIndex = "999999";
            toast.style.fontSize = "15px";
            toast.style.maxWidth = "360px";
            toast.style.transition = "all 0.3s ease";
            document.body.appendChild(toast);
        }
        toast.textContent = message;
        toast.style.display = "block";
        toast.style.opacity = "1";
        clearTimeout(window.__toastTimer);
        window.__toastTimer = setTimeout(() => {
            toast.style.opacity = "0";
            setTimeout(() => {
                toast.style.display = "none";
            }, 300);
        }, 3500);
    } catch (e) {
        console.log(message);
    }
}

// Safe notification fallback for iframe environment (replaces blocking window.alert)
if (typeof window !== "undefined") {
    window.alert = showToast;
}

// Mobile Navigation Menu
// ========================================

const menuButton = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

// Open and close mobile menu
menuButton.addEventListener("click", function () {
    navLinks.classList.toggle("active");
});


// Close mobile menu after clicking a link

const navItems = document.querySelectorAll(".nav-links a");

navItems.forEach(function (item) {

    item.addEventListener("click", function () {

        navLinks.classList.remove("active");

    });

});
// ========================================
// DARK / LIGHT MODE
// ========================================

const themeButton = document.getElementById("themeButton");

themeButton.addEventListener("click", function () {

    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {

        themeButton.textContent = "☀️";

        localStorage.setItem("theme", "dark");

    } else {

        themeButton.textContent = "🌙";

        localStorage.setItem("theme", "light");

    }

});
// ========================================
// DESTINATION SEARCH
// ========================================

const searchInput = document.getElementById("destinationSearch");
const searchButton = document.getElementById("searchButton");

const destinationCards =
    document.querySelectorAll(".destination-card");


function searchDestinations() {

    const searchValue =
        searchInput.value.toLowerCase().trim();

    let found = false;

    destinationCards.forEach(function (card) {

        const destinationName =
            card.querySelector("h3").textContent.toLowerCase();

        if (destinationName.includes(searchValue)) {

            card.style.display = "block";

            found = true;

        } else {

            card.style.display = "none";

        }

    });

    console.log("Search completed:", found);

}


searchButton.addEventListener(
    "click",
    searchDestinations
);
// ========================================
// HERO & ABOUT EXPLORE BUTTONS
// ========================================

const heroExploreBtn = document.querySelector(".explore-btn");
if (heroExploreBtn) {
    heroExploreBtn.addEventListener("click", function () {
        const destSection = document.getElementById("destinations");
        if (destSection) {
            destSection.scrollIntoView({ behavior: "smooth" });
        }
    });
}

const aboutExploreBtn = document.querySelector(".about-btn");
if (aboutExploreBtn) {
    aboutExploreBtn.addEventListener("click", function () {
        const destSection = document.getElementById("destinations");
        if (destSection) {
            destSection.scrollIntoView({ behavior: "smooth" });
        }
    });
}

// ========================================
// FAVORITES SYSTEM & STORAGE
// ========================================

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

function updateFavoritesUI() {
    // Update count badges
    const favCountBadge = document.getElementById("favCountBadge");
    const navFavBadge = document.getElementById("navFavBadge");
    if (favCountBadge) favCountBadge.textContent = favorites.length;
    if (navFavBadge) navFavBadge.textContent = favorites.length;

    // Update all favorite buttons across page (cards & modal)
    const allFavBtns = document.querySelectorAll(".favorite-btn");
    allFavBtns.forEach(function (btn) {
        const name = btn.getAttribute("data-name");
        if (name && favorites.includes(name)) {
            btn.classList.add("favorited");
            btn.textContent = "♥ Favorited";
        } else if (name) {
            btn.classList.remove("favorited");
            btn.textContent = "♡ Favorite";
        }
    });

    // If currently viewing favorites filter, re-apply filter view
    const activeFilterBtn = document.querySelector(".filter-btn.active");
    if (activeFilterBtn && activeFilterBtn.getAttribute("data-category") === "favorites") {
        applyCategoryFilter("favorites");
    }
}

function toggleFavorite(destinationName) {
    if (!destinationName) return;

    if (favorites.includes(destinationName)) {
        favorites = favorites.filter(function (item) {
            return item !== destinationName;
        });
        showToast("Removed " + destinationName + " from favorites.");
    } else {
        favorites.push(destinationName);
        showToast("Added " + destinationName + " to your favorites! ❤️");
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
    updateFavoritesUI();
}

// Event delegation for all favorite buttons
document.addEventListener("click", function (event) {
    const favBtn = event.target.closest(".favorite-btn");
    if (!favBtn) return;
    event.preventDefault();
    const destName = favBtn.getAttribute("data-name");
    if (destName) {
        toggleFavorite(destName);
    }
});

// ========================================
// DESTINATION CATEGORY & FAVORITES FILTER
// ========================================

const filterButtons = document.querySelectorAll(".filter-btn");

function applyCategoryFilter(selectedCategory) {
    const noFavsMsg = document.getElementById("noFavoritesMsg");
    let visibleCount = 0;

    destinationCards.forEach(function (card) {
        const cardCategory = card.getAttribute("data-category");
        const titleEl = card.querySelector("h3");
        const cardName = titleEl ? titleEl.textContent.trim() : "";

        if (selectedCategory === "all") {
            card.style.display = "block";
            visibleCount++;
        } else if (selectedCategory === "favorites") {
            if (favorites.includes(cardName)) {
                card.style.display = "block";
                visibleCount++;
            } else {
                card.style.display = "none";
            }
        } else if (cardCategory === selectedCategory) {
            card.style.display = "block";
            visibleCount++;
        } else {
            card.style.display = "none";
        }
    });

    if (selectedCategory === "favorites") {
        if (visibleCount === 0) {
            if (noFavsMsg) noFavsMsg.style.display = "block";
        } else {
            if (noFavsMsg) noFavsMsg.style.display = "none";
        }
    } else {
        if (noFavsMsg) noFavsMsg.style.display = "none";
    }
}

filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        filterButtons.forEach(function (btn) {
            btn.classList.remove("active");
        });
        button.classList.add("active");
        const selectedCategory = button.getAttribute("data-category");
        applyCategoryFilter(selectedCategory);
    });
});

// Navigation Bar Favorites Shortcut
const navFavoritesLink = document.getElementById("navFavoritesLink");
if (navFavoritesLink) {
    navFavoritesLink.addEventListener("click", function (e) {
        e.preventDefault();
        const destSection = document.getElementById("destinations");
        if (destSection) {
            destSection.scrollIntoView({ behavior: "smooth" });
        }
        const favFilterBtn = document.getElementById("favoritesFilterBtn");
        if (favFilterBtn) {
            favFilterBtn.click();
        }
    });
}

// Initial sync of favorites on page load
updateFavoritesUI();

// ========================================
// DESTINATION DETAILS MODAL & EXPLORE BUTTONS
// ========================================

const destinationDetailsData = {
    manali: {
        name: "Manali",
        state: "Himachal Pradesh, India",
        category: "Mountains",
        image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80",
        desc: "Nestled in the breathtaking Beas River valley, Manali is India's beloved mountain haven. Surrounded by majestic snow-capped Himalayan peaks, fragrant cedar forests, and crystal mountain streams, it is a haven for both adventure and tranquil rest.",
        bestTime: "October - June (Snow: Dec-Feb)",
        duration: "4 - 6 Days",
        type: "Alpine & Adventure",
        highlights: [
            "Solang Valley - Epic paragliding, zorbing, and skiing slopes",
            "Rohtang Pass - High-altitude pass at 13,058 ft with eternal snow landscapes",
            "Old Manali - Bohemian riverside cafes, apple orchards, and wooden bridges",
            "Hadimba Devi Temple - Historic pagoda cedar wood forest sanctuary"
        ],
        activities: ["Trekking", "Paragliding", "River Rafting", "Skiing", "Camping", "Cafe Hopping"],
        blogKey: "manali"
    },
    goa: {
        name: "Goa",
        state: "Goa Coast, India",
        category: "Beaches",
        image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80",
        desc: "Famous for sun-kissed golden shores, swaying coconut palms, 450-year-old Portuguese heritage, and relaxed susegad lifestyle. Goa offers serene southern coves, lively northern beach shacks, and delicious coastal seafood.",
        bestTime: "November - March",
        duration: "3 - 5 Days",
        type: "Coastal & Leisure",
        highlights: [
            "Baga & Calangute Beaches - Watersports, beach shacks, and seaside dining",
            "Aguada & Chapora Forts - Historic ramparts with Arabian Sea sunset vistas",
            "Old Goa Basilicas - UNESCO World Heritage colonial architecture",
            "Dudhsagar Falls - Roaring 4-tiered waterfall in lush Western Ghats"
        ],
        activities: ["Water Sports", "Scuba Diving", "Sunset Cruises", "Beach Shacks", "Heritage Walks", "Flea Markets"],
        blogKey: "goa"
    },
    kashmir: {
        name: "Kashmir",
        state: "Jammu & Kashmir, India",
        category: "Mountains",
        image: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1200&q=80",
        desc: "Celebrated across centuries as 'Paradise on Earth', the Kashmir Valley captivates travelers with tranquil Dal Lake houseboats, traditional wooden shikaras, snow-draped Pir Panjal mountains, and world-class alpine meadows.",
        bestTime: "March - October (Snow Season: Dec-Feb)",
        duration: "5 - 7 Days",
        type: "Scenic & Tranquil",
        highlights: [
            "Dal Lake & Shikara Rides - Floating flower markets and houseboats in Srinagar",
            "Gulmarg Gondola - Asia's highest operational cable car and winter ski resort",
            "Pahalgam & Betaab Valley - Emerald meadows along the crystal Lidder River",
            "Mughal Gardens - Royal terraced lawns of Nishat Bagh and Shalimar Bagh"
        ],
        activities: ["Shikara Ride", "Houseboat Stay", "Gondola Ride", "Snow Skiing", "Photography", "Pashmina Shopping"],
        blogKey: null
    },
    jaipur: {
        name: "Jaipur",
        state: "Rajasthan, India",
        category: "Historical",
        image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80",
        desc: "The fabled Pink City of Rajasthan blends royal Rajput architecture with vibrant bazaars. Marvel at monumental hill forts, carved sandstone palaces, and astronomical marvels steeped in heritage.",
        bestTime: "October - March",
        duration: "3 - 4 Days",
        type: "Heritage & Culture",
        highlights: [
            "Amber Fort - Sprawling sandstone citadel featuring the dazzling Sheesh Mahal",
            "Hawa Mahal - The iconic 5-story Palace of Winds with 953 ornate latticed windows",
            "City Palace & Jantar Mantar - Royal astronomical observatory and museum",
            "Nahargarh Fort - Perched atop the Aravalli hills with panorama over the city"
        ],
        activities: ["Fort Tours", "Heritage Walk", "Bazaar Shopping", "Rajasthani Dining", "Block Printing", "Hot Air Balloon"],
        blogKey: "jaipur"
    }
};

const destinationModal = document.getElementById("destinationModal");
const closeDestModal = document.getElementById("closeDestModal");
const closeDestModalOverlay = document.getElementById("closeDestModalOverlay");
const destModalBtnClose = document.getElementById("destModalBtnClose");

const destModalImage = document.getElementById("destModalImage");
const destModalCategory = document.getElementById("destModalCategory");
const destModalTitle = document.getElementById("destModalTitle");
const destModalLocation = document.getElementById("destModalLocation");
const destModalFavBtn = document.getElementById("destModalFavBtn");
const destModalDesc = document.getElementById("destModalDesc");
const destModalBestTime = document.getElementById("destModalBestTime");
const destModalDuration = document.getElementById("destModalDuration");
const destModalType = document.getElementById("destModalType");
const destModalHighlights = document.getElementById("destModalHighlights");
const destModalActivities = document.getElementById("destModalActivities");
const destModalExploreBlogBtn = document.getElementById("destModalExploreBlogBtn");

function openDestinationDetails(destKey) {
    const data = destinationDetailsData[destKey];
    if (!data || !destinationModal) return;

    if (destModalImage) {
        destModalImage.src = data.image;
        destModalImage.alt = data.name;
    }
    if (destModalCategory) destModalCategory.textContent = data.category;
    if (destModalTitle) destModalTitle.textContent = data.name;
    if (destModalLocation) destModalLocation.textContent = "📍 " + data.state;
    if (destModalDesc) destModalDesc.textContent = data.desc;
    if (destModalBestTime) destModalBestTime.textContent = data.bestTime;
    if (destModalDuration) destModalDuration.textContent = data.duration;
    if (destModalType) destModalType.textContent = data.type;

    // Highlights
    if (destModalHighlights) {
        destModalHighlights.innerHTML = "";
        data.highlights.forEach(function (item) {
            const li = document.createElement("li");
            li.textContent = item;
            destModalHighlights.appendChild(li);
        });
    }

    // Activities
    if (destModalActivities) {
        destModalActivities.innerHTML = "";
        data.activities.forEach(function (act) {
            const span = document.createElement("span");
            span.className = "dest-tag";
            span.textContent = act;
            destModalActivities.appendChild(span);
        });
    }

    // Favorite button inside modal
    if (destModalFavBtn) {
        destModalFavBtn.setAttribute("data-name", data.name);
        if (favorites.includes(data.name)) {
            destModalFavBtn.classList.add("favorited");
            destModalFavBtn.textContent = "♥ Favorited";
        } else {
            destModalFavBtn.classList.remove("favorited");
            destModalFavBtn.textContent = "♡ Favorite";
        }
    }

    // Related blog story button
    if (destModalExploreBlogBtn) {
        if (data.blogKey) {
            destModalExploreBlogBtn.style.display = "inline-block";
            destModalExploreBlogBtn.onclick = function () {
                closeDestinationDetailsModal();
                const blogBtn = document.querySelector(`.read-more-btn[data-blog="${data.blogKey}"]`);
                if (blogBtn) {
                    blogBtn.click();
                } else {
                    const blogSec = document.getElementById("blogs");
                    if (blogSec) blogSec.scrollIntoView({ behavior: "smooth" });
                }
            };
        } else {
            destModalExploreBlogBtn.style.display = "none";
        }
    }

    destinationModal.classList.add("show");
    document.body.style.overflow = "hidden";
}

function closeDestinationDetailsModal() {
    if (destinationModal) {
        destinationModal.classList.remove("show");
        document.body.style.overflow = "";
    }
}

if (closeDestModal) closeDestModal.addEventListener("click", closeDestinationDetailsModal);
if (closeDestModalOverlay) closeDestModalOverlay.addEventListener("click", closeDestinationDetailsModal);
if (destModalBtnClose) destModalBtnClose.addEventListener("click", closeDestinationDetailsModal);

window.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
        closeDestinationDetailsModal();
    }
});

// Wire all Explore buttons on destination cards
const exploreCardButtons = document.querySelectorAll(".explore-btn-card");
exploreCardButtons.forEach(function (button) {
    button.addEventListener("click", function (e) {
        e.preventDefault();
        let destKey = button.getAttribute("data-destination");
        if (!destKey) {
            const card = button.closest(".destination-card");
            if (card) {
                destKey = card.getAttribute("data-destination") ||
                    card.querySelector("h3").textContent.toLowerCase().trim();
            }
        }
        if (destKey) {
            openDestinationDetails(destKey.toLowerCase());
        }
    });
});

// ========================================
// TRAVEL GALLERY MODAL
// ========================================

const galleryImages =
    document.querySelectorAll(".gallery-item img");

const imageModal =
    document.getElementById("imageModal");

const modalImage =
    document.getElementById("modalImage");

const closeModal =
    document.getElementById("closeModal");


// Open image
galleryImages.forEach(function (image) {

    image.addEventListener("click", function () {

        modalImage.src = image.src;

        modalImage.alt = image.alt;

        imageModal.classList.add("show");

    });

});


// Close using X
closeModal.addEventListener("click", function () {

    imageModal.classList.remove("show");

});


// Close by clicking outside image
imageModal.addEventListener("click", function (event) {

    if (event.target === imageModal) {

        imageModal.classList.remove("show");

    }

});

// ========================================
// REVIEW SYSTEM
// ========================================

const reviewForm = document.getElementById("reviewForm");
const reviewsContainer = document.getElementById("reviewsContainer");


// Get reviews from localStorage
let savedReviews = JSON.parse(
    localStorage.getItem("travelReviews")
) || [];


// Function to display review
function addReviewToPage(review) {

    const reviewCard = document.createElement("div");

    reviewCard.className = "review-card";

    const stars = "⭐".repeat(Number(review.rating));

    reviewCard.innerHTML = `
        <div class="review-rating">
            ${stars}
        </div>

        <h3>${review.name}</h3>

        <p class="review-place">
            ${review.destination}
        </p>

        <p>
            "${review.text}"
        </p>
    `;

    reviewsContainer.appendChild(reviewCard);
}


// Display old reviews
savedReviews.forEach(function (review) {
    addReviewToPage(review);
});


// Submit Review
reviewForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const name = document
        .getElementById("reviewName")
        .value
        .trim();

    const destination = document
        .getElementById("reviewDestination")
        .value;

    const rating = document
        .getElementById("reviewRating")
        .value;

    const text = document
        .getElementById("reviewText")
        .value
        .trim();


    // Check empty fields
    if (
        name === "" ||
        destination === "" ||
        rating === "" ||
        text === ""
    ) {

        alert("Please fill all fields.");

        return;
    }


    // Create review
    const newReview = {
        name: name,
        destination: destination,
        rating: Number(rating),
        text: text
    };


    // Save review
    savedReviews.push(newReview);

    localStorage.setItem(
        "travelReviews",
        JSON.stringify(savedReviews)
    );


    // Show review immediately
    addReviewToPage(newReview);


    // Clear form
    reviewForm.reset();


    alert("Review submitted successfully!");

});
// ========================================
// CONTACT FORM
// ========================================

const contactForm =
    document.getElementById("contactForm");


contactForm.addEventListener("submit", function (event) {

    event.preventDefault();


    const name =
        document.getElementById("contactName")
        .value
        .trim();

    const email =
        document.getElementById("contactEmail")
        .value
        .trim();

    const subject =
        document.getElementById("contactSubject")
        .value
        .trim();

    const message =
        document.getElementById("contactMessage")
        .value
        .trim();


    // Check empty fields

    if (
        name === "" ||
        email === "" ||
        subject === "" ||
        message === ""
    ) {

        alert("Please fill all fields.");

        return;
    }


    // Email validation

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (!emailPattern.test(email)) {

        alert("Please enter a valid email address.");

        return;
    }


    // Success message

    alert(
        "Thank you, " +
        name +
        "! Your message has been submitted successfully."
    );


    // Clear form

    contactForm.reset();

});
// ========================================
// BLOG DETAILS
// ========================================

// ========================================
// BLOG DETAILS
// ========================================

const blogData = {

    goa: {
        title: "Exploring Goa",
        date: "Travel Guide • Goa",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
        text: "Goa is one of the most popular travel destinations in India. It is famous for its beautiful beaches, delicious food, colorful markets and relaxing atmosphere. Visitors can enjoy beaches, explore historical places and experience the local culture."
    },

    manali: {
        title: "My Trip to Manali",
        date: "Travel Guide • Manali",
        image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
        text: "Manali is a beautiful mountain destination surrounded by the Himalayas. It is known for peaceful valleys, scenic views and pleasant weather. Travelers can enjoy trekking, sightseeing and exploring local markets."
    },

    jaipur: {
        title: "Discover Jaipur",
        date: "Travel Guide • Jaipur",
        image: "https://images.unsplash.com/photo-1600100397608-f010f443b745?auto=format&fit=crop&w=800&q=80",
        text: "Jaipur, also known as the Pink City, is famous for its forts, palaces and rich cultural heritage. Visitors can explore historical landmarks, traditional markets and local food."
    }

};


// Get Read More links
const readMoreButtons =
    document.querySelectorAll(".read-more-btn");


// Blog details elements
const blogDetails =
    document.getElementById("blogDetails");

const detailImage =
    document.getElementById("detailImage");

const detailTitle =
    document.getElementById("detailTitle");

const detailDate =
    document.getElementById("detailDate");

const detailText =
    document.getElementById("detailText");

const closeBlog =
    document.getElementById("closeBlog");


// Read More click
readMoreButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const blogName =
            button.getAttribute("data-blog");

        const blog =
            blogData[blogName];

        if (!blog) {
            return;
        }

        detailImage.src = blog.image;

        detailImage.alt = blog.title;

        detailTitle.textContent = blog.title;

        detailDate.textContent = blog.date;

        detailText.textContent = blog.text;

        blogDetails.classList.add("show");

        blogDetails.scrollIntoView({
            behavior: "smooth"
        });

    });

});


// Back to Blogs
closeBlog.addEventListener("click", function () {

    blogDetails.classList.remove("show");

});
// ========================================
// LOGIN / REGISTER
// ========================================

const loginBox =
    document.getElementById("loginBox");

const registerBox =
    document.getElementById("registerBox");

const showRegister =
    document.getElementById("showRegister");

const showLogin =
    document.getElementById("showLogin");


// Show Register

showRegister.addEventListener("click", function (event) {

    event.preventDefault();

    loginBox.classList.add("hidden");

    registerBox.classList.remove("hidden");

});


// Show Login

showLogin.addEventListener("click", function (event) {

    event.preventDefault();

    registerBox.classList.add("hidden");

    loginBox.classList.remove("hidden");

});


// Register

const registerForm =
    document.getElementById("registerForm");

registerForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const name =
        document.getElementById("registerName")
        .value
        .trim();

    const email =
        document.getElementById("registerEmail")
        .value
        .trim();

    const password =
        document.getElementById("registerPassword")
        .value;

    const confirmPassword =
        document.getElementById("confirmPassword")
        .value;


    if (password !== confirmPassword) {

        alert("Passwords do not match.");

        return;
    }


    if (password.length < 6) {

        alert("Password must contain at least 6 characters.");

        return;
    }


    const user = {

        name: name,

        email: email,

        password: password

    };


    localStorage.setItem(
        "travelUser",
        JSON.stringify(user)
    );


    alert("Registration successful!");


    registerForm.reset();

    registerBox.classList.add("hidden");

    loginBox.classList.remove("hidden");

});
// Login

const loginForm =
    document.getElementById("loginForm");

loginForm.addEventListener("submit", function (event) {

    event.preventDefault();


    const email =
        document.getElementById("loginEmail")
        .value
        .trim();

    const password =
        document.getElementById("loginPassword")
        .value;


    const savedUser =
        JSON.parse(
            localStorage.getItem("travelUser")
        );


    if (!savedUser) {

        alert("No account found. Please register first.");

        return;
    }


    if (
        email === savedUser.email &&
        password === savedUser.password
    ) {

        localStorage.setItem(
            "isLoggedIn",
            "true"
        );


        alert(
            "Welcome back, " +
            savedUser.name +
            "!"
        );


        loginForm.reset();

    } else {

        alert("Invalid email or password.");

    }

});
// ========================================
// BACK TO TOP BUTTON
// ========================================

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", function () {

    if (window.scrollY > 300) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

});


backToTop.addEventListener("click", function () {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});