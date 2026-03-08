document.addEventListener("DOMContentLoaded", function() {
    // Make the logo and name clickable
    document.querySelector(".logo").addEventListener("click", function() {
        window.location.href = "index.html";
    });

    document.querySelector(".brand-name").addEventListener("click", function() {
        window.location.href = "index.html";
    });

    // Scroll to products section on "Buy Now"
    document.querySelector(".buy-btn").addEventListener("click", function() {
        document.getElementById("products").scrollIntoView({ behavior: "smooth" });
    });

    // Search functionality
    document.querySelector(".search-btn").addEventListener("click", function() {
        let query = document.querySelector(".search-input").value.toLowerCase();
        let products = document.querySelectorAll(".product-item");
        let found = false;
        
        products.forEach(product => {
            let name = product.querySelector(".product-name").textContent.toLowerCase();
            if (name.includes(query)) {
                product.style.display = "block";
                found = true;
            } else {
                product.style.display = "none";
            }
        });
        
        if (!found) {
            alert("Sorry, try again");
        }
    });

    // Add to cart functionality
    let cartCount = 0;
    const cartCounter = document.getElementById("cart-counter");
    const cartDetails = [];
    
    document.querySelectorAll(".cart-btn").forEach(button => {
        button.addEventListener("click", function() {
            let productName = this.closest(".product-item").querySelector(".product-name").textContent;
            let productPrice = this.closest(".product-item").querySelector(".product-price").textContent;
            
            cartCount++;
            cartCounter.textContent = cartCount;
            
            cartDetails.push({ name: productName, price: parseFloat(productPrice.replace(/[^0-9]/g, '')) });
            alert("Item added to cart!");
        });
    });

    // Display cart items when clicked
    document.getElementById("cart-icon").addEventListener("click", function() {
        let cartPopup = document.getElementById("cart-popup");
        let cartContent = "<h2>Cart Items</h2><ul>";
        let total = 0;
        
        cartDetails.forEach(item => {
            cartContent += `<li>${item.name} - KES ${item.price}</li>`;
            total += item.price;
        });
        
        cartContent += `</ul><h3>Total: KES ${total}</h3><button id='place-order'>Place Order</button>`;
        cartPopup.innerHTML = cartContent;
        cartPopup.style.display = "block";
        
        document.getElementById("place-order").addEventListener("click", function() {
            window.location.href = "tel:*334*2*0742439040#";
        });
    });

    // View More button functionality
    document.querySelector(".view-more-btn").addEventListener("click", function() {
        window.location.href = "all-products.html";
    });

    // Subscription email using EmailJS
    document.getElementById("subscribe-form").addEventListener("submit", function(event) {
        event.preventDefault();
        let email = document.getElementById("email").value;
        
        emailjs.send("service_xxx", "template_xxx", {
            to_email: email,
            subject: "🎉 Welcome to Mandi Trendz – Your Style Journey Begins!",
            message: `Dear Customer, \n\nWelcome to Mandi Trendz! 🎀✨ We're thrilled to have you join our community of fashion lovers.\n\n✅ Exclusive first access to new arrivals\n✅ Special discounts & promotions 💰\n✅ Styling tips and fashion inspiration\n\n👜 Shop Now → [Insert Website Link]\n\nWhere Class Meets Convenience!\nMandi Trendz Team\n📩 emmahmumoh@gmail.com | 📞 +254 742439040 | 🌍 [Website]`,
        }).then(() => {
            alert("Thank you for subscribing! Check your email.");
        });
    });

    // Back to top button functionality
    let backToTopBtn = document.getElementById("backToTop");
    if (backToTopBtn) {
        window.onscroll = function() {
            if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
                backToTopBtn.style.display = "block";
            } else {
                backToTopBtn.style.display = "none";
            }
        };

        backToTopBtn.addEventListener("click", function() {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    // Mobile Menu Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });

        // Close menu when clicking a link
        document.querySelectorAll('.nav-links li a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileMenu.classList.remove('active');
            });
        });
    }
});

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const successMessage = document.getElementById("form-success");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get form values
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    // Simple validation
    if (!name || !email || !message) {
      successMessage.textContent = "Please fill in all fields.";
      successMessage.style.color = "red";
      return;
    }

    // Simulate sending message (for demo)
    successMessage.textContent = `Thank you, ${name}! Your message has been sent.`;
    successMessage.style.color = "orange";

    // Clear form
    form.reset();
  });
});
