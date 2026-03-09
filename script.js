// Global Cart State
let cartCount = 0;
let cartDetails = [];

// Global addToCart function for dynamic elements
window.addToCart = function (name, price) {
    cartCount++;
    const cartCounter = document.getElementById("cart-counter");
    if (cartCounter) cartCounter.textContent = cartCount;

    cartDetails.push({ name: name, price: price });
    alert(`Added ${name} to cart!`);
};

document.addEventListener("DOMContentLoaded", function () {
    // Make the logo and name clickable
    const logo = document.querySelector(".logo");
    if (logo) {
        logo.addEventListener("click", function () {
            window.location.href = "index.html";
        });
    }

    const brandName = document.querySelector(".brand-name");
    if (brandName) {
        brandName.addEventListener("click", function () {
            window.location.href = "index.html";
        });
    }

    // Redirect to products page on "Buy Now"
    const buyBtn = document.querySelector(".buy-btn");
    if (buyBtn) {
        buyBtn.addEventListener("click", function () {
            window.location.href = "products.html";
        });
    }

    // Search functionality
    const searchBtn = document.querySelector(".search-btn");
    if (searchBtn) {
        searchBtn.addEventListener("click", function () {
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
    }

    // Display cart items when clicked
    const cartIcon = document.getElementById("cart-icon");
    if (cartIcon) {
        cartIcon.addEventListener("click", function (e) {
            e.preventDefault(); // Prevent jump to top
            let cartPopup = document.getElementById("cart-popup");
            if (!cartPopup) {
                console.error("Cart popup container not found in HTML!");
                return;
            }

            let cartContent = "<h2>Cart Items</h2><ul style='list-style: none; padding: 0;'>";
            let total = 0;

            if (cartDetails.length === 0) {
                cartContent += "<li>Your cart is empty</li>";
            } else {
                cartDetails.forEach((item, index) => {
                    cartContent += `
                        <li style="margin-bottom: 10px; display: flex; align-items: center;">
                            <input type="checkbox" id="cart-item-${index}" class="cart-item-checkbox" data-index="${index}" data-name="${item.name}" data-price="${item.price}" checked style="margin-right: 10px; cursor: pointer;">
                            <label for="cart-item-${index}" style="cursor: pointer; flex-grow: 1;">${item.name} - KES ${item.price.toLocaleString()}</label>
                        </li>`;
                    total += item.price;
                });
            }

            cartContent += `</ul><h3 id='cart-total'>Total: KES ${total.toLocaleString()}</h3>`;

            if (cartDetails.length > 0) {
                cartContent += `<button id='place-order' style='width: 100%; margin-top: 10px; padding: 10px; background: #25D366; color: white; border: none; border-radius: 5px; cursor: pointer; font-weight: bold;'>Place Order on WhatsApp</button>`;
            }

            // Add a close button
            cartContent += `<button id='close-cart' style='width: 100%; margin-top: 10px; padding: 10px; background: #333; color: white; border: none; border-radius: 5px; cursor: pointer;'>Close Cart</button>`;

            cartPopup.innerHTML = cartContent;
            cartPopup.style.display = "block";

            // Add event listeners to checkboxes to update total dynamically
            const checkboxes = cartPopup.querySelectorAll('.cart-item-checkbox');
            const totalDisplay = document.getElementById('cart-total');

            checkboxes.forEach(checkbox => {
                checkbox.addEventListener('change', function () {
                    let newTotal = 0;
                    checkboxes.forEach(cb => {
                        if (cb.checked) {
                            newTotal += parseFloat(cb.getAttribute('data-price'));
                        }
                    });
                    if (totalDisplay) {
                        totalDisplay.innerText = `Total: KES ${newTotal.toLocaleString()}`;
                    }
                });
            });

            const placeOrderBtn = document.getElementById("place-order");
            if (placeOrderBtn) {
                placeOrderBtn.addEventListener("click", function () {
                    // Gather selected items
                    const selectedItems = [];
                    let orderTotal = 0;

                    checkboxes.forEach(cb => {
                        if (cb.checked) {
                            selectedItems.push({
                                name: cb.getAttribute('data-name'),
                                price: parseFloat(cb.getAttribute('data-price'))
                            });
                            orderTotal += parseFloat(cb.getAttribute('data-price'));
                        }
                    });

                    if (selectedItems.length === 0) {
                        alert("Please select at least one item to purchase.");
                        return;
                    }

                    // Create a WhatsApp message with the order details
                    let orderMessage = "Hello Mandi Trendz! I would like to place an order for the following items:%0A%0A";
                    selectedItems.forEach((item, index) => {
                        orderMessage += `${index + 1}. ${item.name} - KES ${item.price.toLocaleString()}%0A`;
                    });
                    orderMessage += `%0A*Total: KES ${orderTotal.toLocaleString()}*%0A%0APlease let me know how to proceed with payment and delivery.`;

                    window.open(`https://wa.me/254742439040?text=${orderMessage}`, "_blank");
                });
            }

            const closeCartBtn = document.getElementById("close-cart");
            if (closeCartBtn) {
                closeCartBtn.addEventListener("click", function () {
                    cartPopup.style.display = "none";
                });
            }
        });
    }

    // View More button functionality
    const viewMoreBtn = document.querySelector(".view-more-btn");
    if (viewMoreBtn) {
        viewMoreBtn.addEventListener("click", function () {
            window.location.href = "all-products.html";
        });
    }

    // Subscription email using EmailJS
    const subscribeForm = document.getElementById("subscribe-form");
    if (subscribeForm) {
        subscribeForm.addEventListener("submit", function (event) {
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
    }

    // Back to top button functionality
    let backToTopBtn = document.getElementById("backToTop");
    if (backToTopBtn) {
        window.onscroll = function () {
            if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
                backToTopBtn.style.display = "block";
            } else {
                backToTopBtn.style.display = "none";
            }
        };

        backToTopBtn.addEventListener("click", function () {
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


    // Dynamic Product Loading from Supabase
    async function fetchProducts(selectedCategory = 'All Bags') {
        const grid = document.getElementById('products-grid');
        if (!grid) {
            return; // Not on a page with products grid
        }

        console.log(`Fetching products for category: ${selectedCategory}...`);
        grid.innerHTML = '<p style="color: #888; text-align: center; width: 100%;">Loading latest collection...</p>';

        try {
            let query = supabaseClient
                .from('products')
                .select('*')
                .order('created_at', { ascending: false });

            // Apply category filter if not "All Bags"
            if (selectedCategory && selectedCategory !== 'All Bags') {
                query = query.eq('category', selectedCategory);
            }

            const { data: products, error } = await query;

            if (error) {
                console.error("Supabase fetch error:", error);
                grid.innerHTML = '<p style="color: red;">Error loading products. Please try again later.</p>';
                return;
            }

            console.log("Products fetched:", products);

            if (!products || products.length === 0) {
                grid.innerHTML = '<p style="color: #888; text-align: center; width: 100%;">Check back soon for new arrivals in this category!</p>';
                return;
            }

            grid.innerHTML = '';
            products.forEach(product => {
                const outOfStockLabel = product.in_stock ? '' : '<span class="out-of-stock-label" style="display:block; text-align:center; color:red; font-weight:bold; margin-top:5px;">Out of Stock</span>';
                const cartButton = product.in_stock ? `<button class="cart-btn" onclick="addToCart('${product.name}', ${product.price})"><i class='bx bx-cart-add'></i></button>` : `<button class="cart-btn" disabled style="background:#ccc; cursor:not-allowed;"><i class='bx bx-cart-add'></i></button>`;

                grid.innerHTML += `
                <div class="product-card" data-category="${product.category}">
                    <img src="${product.image_url}" alt="${product.name}" ${!product.in_stock ? 'style="opacity: 0.6;"' : ''}>
                    <div class="product-info">
                        <p>${product.name}</p>
                        ${outOfStockLabel}
                    </div>
                    <div class="product-footer">
                        <span class="price">KES ${product.price.toLocaleString()}</span>
                        ${cartButton}
                    </div>
                </div>
            `;
            });
        } catch (err) {
            console.error("Unexpected fetch error:", err);
            grid.innerHTML = '<p style="color: red;">Unexpected error. Please try again later.</p>';
        }
    }

    // Initialize products fetch on load
    fetchProducts();

    // Setup Category Click Listeners
    const categoryItems = document.querySelectorAll('.category-item');
    if (categoryItems.length > 0) {
        categoryItems.forEach(item => {
            item.addEventListener('click', function () {
                // Remove active class from all
                categoryItems.forEach(c => c.classList.remove('active'));

                // Add active class to clicked item
                this.classList.add('active');

                // Fetch products for this category
                const categoryName = this.textContent.trim();
                fetchProducts(categoryName);
            });
        });
    }
});
