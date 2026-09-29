/* ==================================
   BIRTHDAY WEBSITE FOR BALQIS
   ================================== */

/* Birthday date: October 1, 2026 */
const birthdayDate = new Date(2026, 9, 1, 0, 0, 0);


/* SCREEN NAVIGATION */

function showScreen(screenId) {
    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.remove("active");
    });

    const target = document.getElementById(screenId);

    if (target) {
        target.classList.add("active");
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* COUNTDOWN */

function updateCountdown() {
    const now = new Date();
    const difference = birthdayDate - now;

    if (difference <= 0) {
        document.getElementById("days").textContent = "00";
        document.getElementById("hours").textContent = "00";
        document.getElementById("minutes").textContent = "00";
        document.getElementById("seconds").textContent = "00";

        document.querySelector(".countdown-title").textContent =
            "HAPPY BIRTHDAY, BALQIS! ♡";

        return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
        (difference / (1000 * 60 * 60)) % 24
    );
    const minutes = Math.floor(
        (difference / (1000 * 60)) % 60
    );
    const seconds = Math.floor(
        (difference / 1000) % 60
    );

    document.getElementById("days").textContent =
        String(days).padStart(2, "0");

    document.getElementById("hours").textContent =
        String(hours).padStart(2, "0");

    document.getElementById("minutes").textContent =
        String(minutes).padStart(2, "0");

    document.getElementById("seconds").textContent =
        String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);


/* HOME AND PASSWORD */

function goToPassword() {
    showScreen("passwordScreen");
}

function togglePassword() {
    const input = document.getElementById("passwordInput");

    input.type = input.type === "password"
        ? "text"
        : "password";
}

function checkPassword() {
    const input = document.getElementById("passwordInput");
    const error = document.getElementById("passwordError");

    /*
       Change this password to your own.
    */
    const correctPassword = "2011/01/10";

    if (input.value.trim().toLowerCase() === correctPassword) {
        error.textContent = "";
        input.value = "";
        showScreen("letterScreen");
    } else {
        error.textContent = "Oops! That's not the right password. ♡";
        input.value = "";
    }
}

document.getElementById("passwordInput").addEventListener(
    "keydown",
    function(event) {
        if (event.key === "Enter") {
            checkPassword();
        }
    }
);


/* LETTER */

let letterOpened = false;

function openLetter() {
    if (letterOpened) return;

    letterOpened = true;

    const envelope = document.getElementById("envelope");
    const message = document.getElementById("letterMessage");
    const hint = document.getElementById("envelopeHint");
    const button = document.getElementById("continueButton");

    envelope.classList.add("open");

    hint.textContent = "A little message from my heart ♡";

    setTimeout(() => {
        message.style.display = "block";
        button.style.display = "inline-block";
    }, 850);
}


/* MEMORIES */

function showMemories() {
    showScreen("memoriesScreen");
}


/* MUSIC */

const audio = document.getElementById("birthdayAudio");
const record = document.getElementById("record");
const playButton = document.getElementById("playButton");
const progressBar = document.getElementById("progressBar");
const currentTimeDisplay = document.getElementById("currentTime");
const durationDisplay = document.getElementById("duration");

function showMusic() {
    showScreen("musicScreen");
}

function formatTime(seconds) {
    if (!Number.isFinite(seconds)) return "0:00";

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    return minutes + ":" + String(remainingSeconds).padStart(2, "0");
}

function toggleMusic() {
    if (audio.paused) {
        audio.play().catch(error => {
            console.log("Audio playback failed:", error);
        });
    } else {
        audio.pause();
    }
}

function restartMusic() {
    audio.currentTime = 0;
    audio.play().catch(error => {
        console.log("Audio playback failed:", error);
    });
}

function toggleMute() {
    audio.muted = !audio.muted;

    document.querySelector(".music-controls button:nth-child(3)")
        .textContent = audio.muted ? "🔇" : "🔊";
}

audio.addEventListener("play", () => {
    record.classList.add("playing");
    playButton.textContent = "❚❚";
});

audio.addEventListener("pause", () => {
    record.classList.remove("playing");
    playButton.textContent = "▶";
});

audio.addEventListener("ended", () => {
    record.classList.remove("playing");
    playButton.textContent = "▶";
});

audio.addEventListener("loadedmetadata", () => {
    durationDisplay.textContent = formatTime(audio.duration);
});

audio.addEventListener("timeupdate", () => {
    if (audio.duration) {
        progressBar.value =
            (audio.currentTime / audio.duration) * 100;

        currentTimeDisplay.textContent =
            formatTime(audio.currentTime);
    }
});

progressBar.addEventListener("input", () => {
    if (audio.duration) {
        audio.currentTime =
            (progressBar.value / 100) * audio.duration;
    }
});
/* WHY I LOVE YOU */

function showLoveReasons() {
    audio.pause();
    playButton.textContent = "▶";
    record.classList.remove("playing");
    showScreen("loveReasonsScreen");
}


/* FINAL MESSAGE */

function showFinalMessage() {
    showScreen("finalScreen");
}


/* FLOATING HEARTS */

function createHeart() {
    const container = document.getElementById("hearts");

    const heart = document.createElement("span");
    heart.className = "floating-heart";
    heart.textContent = Math.random() > 0.5 ? "♡" : "♥";

    heart.style.left = Math.random() * 100 + "%";
    heart.style.fontSize = (12 + Math.random() * 20) + "px";
    heart.style.animationDuration = (6 + Math.random() * 7) + "s";

    container.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 13000);
}

setInterval(createHeart, 700);


/* =================================
   MEMORY GALLERY FUNCTIONS
================================= */

const memoryImages = [
    "images/photo1.jpg",
    "images/photo2.jpg",
    "images/photo3.jpg",
    "images/photo4.jpg",
    "images/photo5.jpg",
    "images/photo6.jpg"
];

const memoryCaptions = [
    "Our beautiful moments ♡",
    "My favorite smile ♡",
    "A moment to remember ♡",
    "My happiness ♡",
    "Forever in my heart ♡",
    "Just you and me ♡"
];

let currentMemory = 0;

function openMemory(index) {
    currentMemory = index;
    updateMemoryViewer();

    document.getElementById("memoryViewer")
        .classList.add("visible");
}

function closeMemory() {
    document.getElementById("memoryViewer")
        .classList.remove("visible");
}

function updateMemoryViewer() {
    document.getElementById("viewerImage").src =
        memoryImages[currentMemory];

    document.getElementById("viewerCaption").textContent =
        memoryCaptions[currentMemory];

    document.getElementById("viewerCounter").textContent =
        (currentMemory + 1) + " / " + memoryImages.length;
}

function nextMemory() {
    currentMemory =
        (currentMemory + 1) % memoryImages.length;

    updateMemoryViewer();
}

function previousMemory() {
    currentMemory =
        (currentMemory - 1 + memoryImages.length)
        % memoryImages.length;

    updateMemoryViewer();
}

/* Close viewer with Escape */
document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        closeMemory();
    }

    if (!document.getElementById("memoryViewer")
        .classList.contains("visible")) {
        return;
    }

    if (event.key === "ArrowRight") {
        nextMemory();
    }

    if (event.key === "ArrowLeft") {
        previousMemory();
    }
});

/* Close viewer when tapping outside the image */
document.getElementById("memoryViewer")
    .addEventListener("click", function(event) {
        if (event.target === this) {
            closeMemory();
        }
    });

/* Swipe support for mobile */
let touchStartX = 0;

document.getElementById("memoryViewer")
    .addEventListener("touchstart", function(event) {
        touchStartX = event.changedTouches[0].screenX;
    }, { passive: true });

document.getElementById("memoryViewer")
    .addEventListener("touchend", function(event) {
        const touchEndX = event.changedTouches[0].screenX;
        const difference = touchEndX - touchStartX;

        if (Math.abs(difference) < 50) return;

        if (difference < 0) {
            nextMemory();
        } else {
            previousMemory();
        }
    }, { passive: true });


/* ROSE INTERACTION */

function showRoses() {
    showScreen("roseScreen");
}

function openRoses() {
    const bouquet = document.getElementById("roseBouquet");
    const message = document.getElementById("roseMessage");
    const hint = document.getElementById("roseHint");

    bouquet.classList.add("opened");
    message.classList.add("show");
    hint.textContent = "A bouquet made with love for you ❤️";
}


/* SECRET GIFT */

function showGift() {
    showScreen("giftScreen");
}

function openGift() {
    const giftBox = document.getElementById("giftBox");
    const giftMessage = document.getElementById("giftMessage");
    const giftHint = document.getElementById("giftHint");

    if (giftBox.classList.contains("opened")) {
        return;
    }

    giftBox.classList.add("opened");
    giftMessage.classList.add("show");
    giftHint.textContent = "A surprise made with love! ❤️";
}



/* FLOATING HEARTS */

function createFloatingHeart() {
    const container = document.getElementById("floating-hearts");

    if (!container) return;

    const heart = document.createElement("span");
    heart.className = "floating-heart";

    const hearts = ["♡", "♥", "💕", "💗", "💖"];
    heart.textContent = hearts[
        Math.floor(Math.random() * hearts.length)
    ];

    heart.style.left = Math.random() * 100 + "%";
    heart.style.fontSize = (16 + Math.random() * 20) + "px";
    heart.style.animationDuration = (5 + Math.random() * 5) + "s";

    container.appendChild(heart);

    heart.addEventListener("animationend", () => {
        heart.remove();
    });
}

setInterval(createFloatingHeart, 2000);
