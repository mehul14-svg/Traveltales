// ========================================
// TravelTales - JavaScript
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
// DESTINATION CATEGORY FILTER
// ========================================

const filterButtons =
    document.querySelectorAll(".filter-btn");

filterButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        // Remove active class from all buttons
        filterButtons.forEach(function (btn) {
            btn.classList.remove("active");
        });

        // Add active class to clicked button
        button.classList.add("active");

        // Get selected category
        const selectedCategory =
            button.getAttribute("data-category");

        // Show or hide destination cards
        destinationCards.forEach(function (card) {

            const cardCategory =
                card.getAttribute("data-category");

            if (
                selectedCategory === "all" ||
                cardCategory === selectedCategory
            ) {

                card.style.display = "block";

            } else {

                card.style.display = "none";

            }

        });

    });

});

// ========================================
// FAVORITE DESTINATIONS
// ========================================

const favoriteButtons =
    document.querySelectorAll(".favorite-btn");


// Get saved favorites
let favorites =
    JSON.parse(localStorage.getItem("favorites")) || [];


// Check saved favorites when page loads
favoriteButtons.forEach(function (button) {

    const destinationName =
        button.getAttribute("data-name");

    if (favorites.includes(destinationName)) {

        button.classList.add("favorited");

        button.textContent = "♥ Favorited";
    }

});


// Add / Remove favorite
favoriteButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const destinationName =
            button.getAttribute("data-name");


        if (favorites.includes(destinationName)) {

            // Remove from favorites
            favorites =
                favorites.filter(function (item) {
                    return item !== destinationName;
                });

            button.classList.remove("favorited");

            button.textContent = "♡ Favorite";

        } else {

            // Add to favorites
            favorites.push(destinationName);

            button.classList.add("favorited");

            button.textContent = "♥ Favorited";
        }


        // Save to localStorage
        localStorage.setItem(
            "favorites",
            JSON.stringify(favorites)
        );

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
        image: "Images/goa-blog.jpg",
        text: "Goa is one of the most popular travel destinations in India. It is famous for its beautiful beaches, delicious food, colorful markets and relaxing atmosphere. Visitors can enjoy beaches, explore historical places and experience the local culture."
    },

    manali: {
        title: "My Trip to Manali",
        date: "Travel Guide • Manali",
        image: "Images/manali-blog.jpg",
        text: "Manali is a beautiful mountain destination surrounded by the Himalayas. It is known for peaceful valleys, scenic views and pleasant weather. Travelers can enjoy trekking, sightseeing and exploring local markets."
    },

    jaipur: {
        title: "Discover Jaipur",
        date: "Travel Guide • Jaipur",
        image: "Images/jaipur-blog.jpg",
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