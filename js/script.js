document.addEventListener("DOMContentLoaded", function () {
    if (typeof gsap !== "undefined") {
        console.log("GSAP is loaded successfully!");

        gsap.to(".envelop", { duration: 1, y: -20, repeat: -1, yoyo: true }); // Simple animation
    } else {
        console.error("GSAP failed to load!");
    }
});
document.addEventListener("DOMContentLoaded", function () {
    if (typeof gsap !== "undefined") {
        console.log("GSAP is loaded successfully!");
    } else {
        console.error("GSAP failed to load!");
    }

    const sticker = document.querySelector(".js-sticker");

    function cutSticker() {
        console.log("Cutting sticker...");

        // Create a cutting effect by scaling the sticker into two halves
        gsap.to(sticker, {
            scaleY: 0,  // Shrinks vertically like being cut
            duration: 0.4,
            ease: "power2.inOut",
            onComplete: function () {
                sticker.style.display = "none"; // Hide the sticker after the cut effect
            }
        });
    }

    sticker.addEventListener("click", cutSticker);
});

function createHeart() {
    const heart = document.createElement("div");
    heart.classList.add("floating-heart");
    document.body.appendChild(heart);

    // Set initial position randomly at bottom
    gsap.set(heart, {
        x: Math.random() * window.innerWidth,  // Random X position
        y: window.innerHeight, // Start from bottom
        scale: Math.random() * 0.8 + 0.2, // Random sizes
        opacity: 1
    });

    // Animate heart floating upwards
    gsap.to(heart, {
        y: -50, // Move up
        opacity: 0, // Fade out
        duration: Math.random() * 3 + 2, // Random duration
        ease: "power1.out",
        onComplete: () => heart.remove() // Remove from DOM after animation
    });
}

// Generate hearts every second
setInterval(createHeart, 1000);


document.addEventListener("DOMContentLoaded", function () {
    let mobile_media_query = window.matchMedia("(max-width: 400px)");
    let tablet_media_query = window.matchMedia("(min-width: 400px) and (max-width: 600px)");
    const notes = document.querySelectorAll(".js-note");

    function resize_notes() {
        notes.forEach(note => {
            note.classList.remove("active");
            gsap.to(note, { height: "30%", opacity: 1, duration: 0.3, clearProps: "all" });
        });
    }

    function notes_ready() {
        gsap.to(".js-envelop-content", {
            height: "110%",
            duration: 0.5
        });

        notes.forEach(note => {
            note.style.display = "block"; // Make sure it's visible
            note.addEventListener("click", function () {
                if (this.classList.contains("active")) {
                    this.classList.remove("active");
                    gsap.to(this, { height: "30%", opacity: 1, duration: 0.3, clearProps: "all" });
                } else {
                    resize_notes();
                    this.classList.add("active");
                    gsap.to(this, { height: "70%", opacity: 1, duration: 0.3 });
                }
            });
        });
    }

    function set_up_paper() {
        gsap.to(".js-up-paper", {
            bottom: "97%", // Move UP instead of down
            rotation: 180,
            duration: 0.5,
            ease: "power2.inOut",
            zIndex: 200,
            clipPath: "polygon(0% 0%, 100% 0%, 50% 61%)",
            onComplete: notes_ready
        });
    }

    function envelop_transition() {
        gsap.to(".js-up-paper", {
            bottom: "97%",
            duration: 0.25,
            ease: "power1.inOut",
            onComplete: set_up_paper
        });

        document.querySelector(".js-up-paper").removeEventListener("click", envelop_transition);
        document.querySelector(".js-up-paper").classList.remove("cursor");
    }

    // Add event listener to open the envelope
    document.querySelector(".js-up-paper").addEventListener("click", envelop_transition);

    // Debugging Sticker Click
    const sticker = document.querySelector(".js-sticker");
    sticker.addEventListener("click", function () {
        console.log("Sticker clicked!"); // Debugging log
    });

});
