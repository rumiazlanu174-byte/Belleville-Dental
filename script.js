$(document).ready(function () {
    // --- 1. MOBILE MENU TOGGLE ---
    $("#menuBtn").on("click", function () {
        $("#navbar").toggleClass("active");
    });

    // Close mobile menu when clicking any nav link
    $("#navbar a").on("click", function () {
        $("#navbar").removeClass("active");
    });

    // --- 2. DYNAMIC VISITOR COUNTER ---
    let visits = localStorage.getItem("bellevilleVisitors");
    if (!visits) {
        visits = 1420; // Starting base number
    } else {
        visits = parseInt(visits) + 1;
    }
    localStorage.setItem("bellevilleVisitors", visits);
    $("#visitorCount").text(visits.toLocaleString());

    // --- 3. SMOOTH SCROLLING FOR INTERNAL LINKS ---
    $('a[href^="#"]').on("click", function (event) {
        let target = $(this.getAttribute("href"));
        if (target.length) {
            event.preventDefault();
            $("html, body").animate({
                scrollTop: target.offset().top - 70
            }, 500);
        }
    });

    // --- 4. LIVE TICKER CLOCK & LOCATION SCRIPT ---
    function updateLiveTicker() {
        const now = new Date();
        let dateStr = now.toLocaleDateString();
        let timeStr = now.toLocaleTimeString();

        let tickerText = `🏥 Welcome to Belleville Dental Clinic | 📅 Date: ${dateStr} | ⏰ Time: ${timeStr} | 📍 Location: Karachi, Pakistan | ✨ Healthy Smiles, Happier Lives!`;

        $("#liveTickerText").text(tickerText);
    }

    updateLiveTicker();
    setInterval(updateLiveTicker, 1000);

    // --- 5. CHAT WIDGET LOGIC ---
    const chatToggleBtn = $("#chatToggleBtn");
    const chatBox = $("#chatBox");
    const chatCloseBtn = $("#chatCloseBtn");
    const chatSendBtn = $("#chatSendBtn");
    const chatInput = $("#chatInput");
    const chatBody = $("#chatBody");
    const chatQuickBtns = $(".chat-quick-btn");

    const chatReplies = {
        welcome: "👋 <strong>Welcome to Belleville Dental Clinic!</strong><br>We are here to care for your healthy smile. Ask about appointments, services, timings, doctors, or WhatsApp contact.",
        appointment: "📅 <strong>Appointment Booking:</strong><br>You can book directly on our <a href='appoinment.html'>Book Appointment</a> page, or share your <strong>Name, Phone Number, and Preferred Date/Time</strong> here and our team will assist you.",
        services: "🦷 <strong>Our Dental Services:</strong><br>• General Dentistry<br>• Teeth Whitening<br>• Orthodontics (Braces)<br>• Root Canal Treatment<br>• Kids Dentistry<br>• Dental Implants<br>See full details on <a href='services.html'>Services</a>.",
        timing: "⏰ <strong>Clinic Timings:</strong><br>• <strong>Mon – Fri:</strong> 10:00 AM – 9:00 PM<br>• <strong>Saturday:</strong> 11:00 AM – 7:00 PM<br>• <strong>Sunday:</strong> Closed",
        doctors: "👨‍⚕️ <strong>Doctors Information:</strong><br>Meet our experienced dental specialists on our <a href='doctors.html'>Doctors</a> page for general care, orthodontics, root canal, implants, and kids dentistry.",
        contact: "📞 <strong>Contact & WhatsApp Rep:</strong><br>• <strong>WhatsApp Rep:</strong> <a href='https://wa.me/923001234567' target='_blank'>Chat on WhatsApp (+92 300 1234567)</a><br>• <strong>Phone:</strong> +92 300 0000000<br>• <strong>Instagram:</strong> <a href='https://instagram.com/belleville_dental' target='_blank'>@belleville_dental</a><br>• <strong>Location:</strong> Karachi, Pakistan"
    };

    const quickLabels = {
        appointment: "I want to book an appointment",
        services: "Tell me about your services",
        timing: "What are the clinic timings?",
        doctors: "Doctors information please",
        contact: "Connect with WhatsApp / Contact"
    };

    function appendChatHtml(htmlText, sender) {
        if (!chatBody.length) return;
        let msgDiv = $("<div></div>")
            .addClass("chat-message " + (sender === "user" ? "user" : "bot"))
            .html(htmlText);
        chatBody.append(msgDiv);
        chatBody.scrollTop(chatBody[0].scrollHeight);
    }

    function getBotReply(userText) {
        const q = userText.toLowerCase();
        if (q.includes("hello") || q.includes("hi") || q.includes("hey") || q.includes("salam") || q.includes("welcome")) {
            return chatReplies.welcome;
        }
        if (q.includes("appoint") || q.includes("book") || q.includes("slot") || q.includes("visit")) {
            return chatReplies.appointment;
        }
        if (q.includes("service") || q.includes("treatment") || q.includes("whiten") || q.includes("brace") || q.includes("ortho") || q.includes("root") || q.includes("implant") || q.includes("kid")) {
            return chatReplies.services;
        }
        if (q.includes("time") || q.includes("timing") || q.includes("hour") || q.includes("open") || q.includes("close") || q.includes("sunday")) {
            return chatReplies.timing;
        }
        if (q.includes("doctor") || q.includes("dr") || q.includes("dentist") || q.includes("specialist")) {
            return chatReplies.doctors;
        }
        if (q.includes("whatsapp") || q.includes("contact") || q.includes("phone") || q.includes("number") || q.includes("rep") || q.includes("call")) {
            return chatReplies.contact;
        }
        return "Thank you for messaging <strong>Belleville Dental Clinic</strong>! You can tap a quick option above or ask about <strong>Appointment</strong>, <strong>Services</strong>, <strong>Clinic Timing</strong>, <strong>Doctors</strong>, or <strong>WhatsApp</strong>.";
    }

    chatToggleBtn.on("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        chatBox[0].style.setProperty("display", "flex", "important");
        chatToggleBtn[0].style.setProperty("display", "none", "important");
        chatInput.focus();
    });

    chatCloseBtn.on("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        chatBox[0].style.setProperty("display", "none", "important");
        chatToggleBtn[0].style.setProperty("display", "flex", "important");
    });

    chatQuickBtns.on("click", function () {
        const topic = $(this).attr("data-topic");
        if (quickLabels[topic]) {
            appendChatHtml(quickLabels[topic], "user");
        }
        if (chatReplies[topic]) {
            setTimeout(function () {
                appendChatHtml(chatReplies[topic], "bot");
            }, 300);
        }
    });

    function sendMessage() {
        let messageText = chatInput.val().trim();
        if (messageText === "") return;

        appendChatHtml($("<div></div>").text(messageText).html(), "user");
        chatInput.val("");

        setTimeout(function () {
            appendChatHtml(getBotReply(messageText), "bot");
        }, 400);
    }

    chatSendBtn.on("click", sendMessage);
    chatInput.on("keypress", function (e) {
        if (e.key === "Enter") {
            e.preventDefault();
            sendMessage();
        }
    });

    // --- 6. ADD NEW REVIEW LOGIC ---
    const reviewForm = $("#reviewForm");
    const reviewsGrid = $("#reviewsGrid");

    function getStarIcons(rating) {
        let starsHtml = "";
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                starsHtml += '<i class="fa-solid fa-star"></i> ';
            } else {
                starsHtml += '<i class="fa-regular fa-star"></i> ';
            }
        }
        return starsHtml;
    }

    function renderReviewCard(name, service, rating, comment) {
        let initials = name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase();
        let card = $("<div></div>").addClass("review-card").html(`
            <div class="review-stars">${getStarIcons(rating)}</div>
            <p class="review-text">"${comment}"</p>
            <div class="reviewer-info">
                <div class="reviewer-avatar" style="background:#0d4a38;">${initials}</div>
                <div>
                    <h4>${name}</h4>
                    <span>${service}</span>
                </div>
            </div>
        `);
        reviewsGrid.append(card);
    }

    let savedReviews = JSON.parse(localStorage.getItem("bellevilleReviews")) || [];
    savedReviews.forEach(r => renderReviewCard(r.name, r.service, r.rating, r.comment));

    reviewForm.on("submit", function (e) {
        e.preventDefault();

        let name = $("#reviewerName").val().trim();
        let service = $("#reviewerService").val();
        let rating = parseInt($("#reviewerRating").val());
        let comment = $("#reviewerComment").val().trim();

        if (!name || !comment) return;

        renderReviewCard(name, service, rating, comment);

        savedReviews.push({ name, service, rating, comment });
        localStorage.setItem("bellevilleReviews", JSON.stringify(savedReviews));

        reviewForm[0].reset();
        alert("Thank you! Your review has been posted.");
    });

    // --- LIGHTBOX OPTIONS (Optional) ---
    if (typeof lightbox !== "undefined") {
        lightbox.option({
            'resizeDuration': 200,
            'wrapAround': true,
            'fadeDuration': 300
        });
    }
});
