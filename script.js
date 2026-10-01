const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");

if (searchForm && searchInput) {

    searchForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const query = searchInput.value.trim().toLowerCase();

        if (query === "") {
            return;
        }

        const sections = document.querySelectorAll(
            ".learning-card, .discovery-card, .lab-card, .practice-card"
        );

        let matchFound = false;

        sections.forEach(function (section) {

            const text =
                section.textContent.toLowerCase();

            if (text.includes(query)) {

                section.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

                matchFound = true;
            }

        });

        if (!matchFound) {

            alert(
                "No matching topics found. Try Physics, Calculus, Stars, or Chemistry."
            );

        }

    });

}


/* =====================================
   2. ASK NOVA
===================================== */

const askForm =
    document.getElementById("ask-form");

const askInput =
    document.getElementById("ask-input");

if (askForm && askInput) {

    askForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            const question =
                askInput.value.trim();

            if (question === "") {
                return;
            }

            alert(
                "Your question:\n\n" +
                question +
                "\n\nYour NOVA AI tutor is not connected yet. " +
                "We'll build this feature in a later version!"
            );

            askInput.value = "";

        }
    );

}


/* =====================================
   3. CREATE A LEARNING NOTE
===================================== */

const createButton =
    document.getElementById("create-button");

if (createButton) {

    createButton.addEventListener(
        "click",
        function () {

            const note = prompt(
                "Create a learning note. What do you want to remember?"
            );

            if (
                note === null ||
                note.trim() === ""
            ) {
                return;
            }

            const noteCard =
                document.createElement("article");

            noteCard.className =
                "practice-card";

            const content =
                document.createElement("div");

            const title =
                document.createElement("h3");

            title.textContent =
                "Your Learning Note";

            const paragraph =
                document.createElement("p");

            paragraph.textContent =
                note;

            content.appendChild(title);
            content.appendChild(paragraph);

            noteCard.appendChild(content);

            const dashboard =
                document.querySelector(".dashboard");

            if (dashboard) {

                dashboard.insertBefore(
                    noteCard,
                    document.querySelector(".footer")
                );

                noteCard.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

            }

        }
    );

}


/* =====================================
   4. SIDEBAR NAVIGATION
===================================== */

const navItems =
    document.querySelectorAll(".nav-item");

navItems.forEach(function (item) {

    item.addEventListener(
        "click",
        function () {

            navItems.forEach(function (link) {

                link.classList.remove("active");

            });

            item.classList.add("active");

        }
    );

});


/* =====================================
   5. KEYBOARD SHORTCUT FOR SEARCH
===================================== */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "/" &&
            searchInput &&
            document.activeElement.tagName !== "INPUT" &&
            document.activeElement.tagName !== "TEXTAREA"
        ) {

            event.preventDefault();

            searchInput.focus();

        }

    }
);


/* =====================================
   6. NOVA APPEARANCE SETTINGS
===================================== */

const settingsButton =
    document.getElementById("settings-button");

const settingsOverlay =
    document.getElementById("settings-overlay");

const settingsClose =
    document.getElementById("settings-close");

const resetAppearance =
    document.getElementById("reset-appearance");

const backgroundUpload =
    document.getElementById("background-upload");

const useThemeBackground =
    document.getElementById("use-theme-background");

const customAccentColor =
    document.getElementById("custom-accent-color");

const root =
    document.documentElement;


/* =====================================
   DEFAULT SETTINGS
===================================== */

const defaultAppearance = {
    theme: "nova",
    mode: "dark",
    accent: "#9b8cff",
    background: null
};


/* =====================================
   LOAD SAVED SETTINGS
===================================== */

let savedAppearance = null;

try {

    savedAppearance = JSON.parse(
        localStorage.getItem("novaAppearance")
    );

} catch (error) {

    savedAppearance = null;

}


let appearance = {
    ...defaultAppearance,
    ...(savedAppearance || {})
};


/* =====================================
   AVAILABLE OPTIONS
===================================== */

const availableThemes = [
    "nova",
    "ocean",
    "midnight",
    "forest",
    "solar"
];

const availableModes = [
    "dark",
    "light"
];

const availableAccents = [
    "#9b8cff",
    "#43c6f5",
    "#61d6a0",
    "#ff9565",
    "#f071b8"
];


/* =====================================
   CHECK VALUES
===================================== */

if (
    !availableThemes.includes(
        appearance.theme
    )
) {

    appearance.theme = "nova";

}


if (
    !availableModes.includes(
        appearance.mode
    )
) {

    appearance.mode = "dark";

}


/* =====================================
   APPLY APPEARANCE
===================================== */

function applyAppearance() {

    /* Theme */

    root.dataset.theme =
        appearance.theme;


    /* Light / Dark */

    root.dataset.mode =
        appearance.mode;


    /* Accent */

    root.style.setProperty(
        "--accent",
        appearance.accent
    );

    root.style.setProperty(
        "--purple",
        appearance.accent
    );


    /* Custom background */

    if (appearance.background) {

        root.style.setProperty(
            "--custom-background",
            `url("${appearance.background}")`
        );

    } else {

        root.style.removeProperty(
            "--custom-background"
        );

    }


    /* Save settings */

    try {

        localStorage.setItem(
            "novaAppearance",
            JSON.stringify(appearance)
        );

    } catch (error) {

        console.warn(
            "Could not save appearance settings."
        );

    }


    /* Selected theme */

    document.querySelectorAll(
        ".theme-option"
    ).forEach(function (button) {

        button.classList.toggle(
            "selected",
            button.dataset.theme ===
            appearance.theme
        );

    });


    /* Selected mode */

    document.querySelectorAll(
        ".mode-option"
    ).forEach(function (button) {

        button.classList.toggle(
            "selected",
            button.dataset.mode ===
            appearance.mode
        );

    });


    /* Selected preset accent */

    document.querySelectorAll(
        ".accent-option"
    ).forEach(function (button) {

        button.classList.toggle(
            "selected",
            button.dataset.accent ===
            appearance.accent
        );

    });


    /* Custom colour picker */

    if (customAccentColor) {

        customAccentColor.value =
            appearance.accent;

    }

}


/* =====================================
   OPEN SETTINGS
===================================== */

function openSettings() {

    if (!settingsOverlay) {
        return;
    }

    settingsOverlay.classList.add("open");

    settingsOverlay.style.display =
        "flex";

    document.body.style.overflow =
        "hidden";

}


/* =====================================
   CLOSE SETTINGS
===================================== */

function closeSettings() {

    if (!settingsOverlay) {
        return;
    }

    settingsOverlay.classList.remove("open");

    settingsOverlay.style.display =
        "";

    document.body.style.overflow =
        "";

}


/* =====================================
   SETTINGS BUTTON
===================================== */

if (settingsButton) {

    settingsButton.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            openSettings();

        }
    );

}


/* =====================================
   CLOSE BUTTON
===================================== */

if (settingsClose) {

    settingsClose.addEventListener(
        "click",
        closeSettings
    );

}


/* =====================================
   CLICK OUTSIDE
===================================== */

if (settingsOverlay) {

    settingsOverlay.addEventListener(
        "click",
        function (event) {

            if (
                event.target ===
                settingsOverlay
            ) {

                closeSettings();

            }

        }
    );

}


/* =====================================
   ESCAPE KEY
===================================== */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape" &&
            settingsOverlay &&
            settingsOverlay.classList.contains(
                "open"
            )
        ) {

            closeSettings();

        }

    }
);


/* =====================================
   SELECT THEME
===================================== */

document.querySelectorAll(
    ".theme-option"
).forEach(function (button) {

    button.addEventListener(
        "click",
        function () {

            const selectedTheme =
                button.dataset.theme;

            if (
                !availableThemes.includes(
                    selectedTheme
                )
            ) {
                return;
            }


            const defaultAccents = {

                nova: "#9b8cff",
                ocean: "#43c6f5",
                midnight: "#a0a0b5",
                forest: "#61d6a0",
                solar: "#ff9565"

            };


            appearance.theme =
                selectedTheme;

            appearance.accent =
                defaultAccents[selectedTheme];

            applyAppearance();

        }
    );

});


/* =====================================
   LIGHT / DARK MODE
===================================== */

document.querySelectorAll(
    ".mode-option"
).forEach(function (button) {

    button.addEventListener(
        "click",
        function () {

            const selectedMode =
                button.dataset.mode;

            if (
                !availableModes.includes(
                    selectedMode
                )
            ) {
                return;
            }

            appearance.mode =
                selectedMode;

            applyAppearance();

        }
    );

});


/* =====================================
   PRESET ACCENT COLOUR
===================================== */

document.querySelectorAll(
    ".accent-option"
).forEach(function (button) {

    button.addEventListener(
        "click",
        function () {

            const selectedAccent =
                button.dataset.accent;

            appearance.accent =
                selectedAccent;

            applyAppearance();

        }
    );

});


/* =====================================
   CUSTOM ACCENT COLOUR
===================================== */

if (customAccentColor) {

    customAccentColor.addEventListener(
        "input",
        function () {

            appearance.accent =
                customAccentColor.value;

            applyAppearance();

        }
    );

}


/* =====================================
   CUSTOM BACKGROUND UPLOAD
===================================== */

if (backgroundUpload) {

    backgroundUpload.addEventListener(
        "change",
        function () {

            const file =
                backgroundUpload.files[0];

            if (!file) {
                return;
            }


            if (
                !file.type.startsWith("image/")
            ) {

                alert(
                    "Please choose an image file."
                );

                return;

            }


            if (
                file.size >
                2 * 1024 * 1024
            ) {

                alert(
                    "Please choose an image smaller than 2 MB."
                );

                return;

            }


            const reader =
                new FileReader();


            reader.onload =
                function () {

                    appearance.background =
                        reader.result;

                    applyAppearance();

                };


            reader.readAsDataURL(file);

        }
    );

}


/* =====================================
   USE THEME BACKGROUND
===================================== */

if (useThemeBackground) {

    useThemeBackground.addEventListener(
        "click",
        function () {

            appearance.background =
                null;

            if (backgroundUpload) {

                backgroundUpload.value =
                    "";

            }

            applyAppearance();

        }
    );

}


/* =====================================
   RESET APPEARANCE
===================================== */

if (resetAppearance) {

    resetAppearance.addEventListener(
        "click",
        function () {

            appearance = {
                ...defaultAppearance
            };

            applyAppearance();

        }
    );

}


/* =====================================
   INITIALISE
===================================== */

applyAppearance();

/* =====================================
   7. TODAY'S DISCOVERY CAROUSEL
===================================== */

const discoveries = [
    {
        subject: "ASTROPHYSICS",
        title: "Could you survive<br>falling into a<br>black hole?",
        description:
            "Explore event horizons, tidal forces, and the strange nature of spacetime.",
        image: "images/discoveries/black-hole.jpg",
        accent: "#8b7cff"
    },

    {
        subject: "PHYSICS",
        title: "Why does a skater<br>spin faster when<br>they pull in?",
        description:
            "Discover conservation of angular momentum through rotational motion.",
        image: "images/discoveries/skater.jpg",
        accent: "#42c7e8"
    },

    {
        subject: "CHEMISTRY",
        title: "Why does copper<br>turn green<br>over time?",
        description:
            "Explore oxidation, corrosion, and the chemistry behind copper surfaces.",
        image: "images/discoveries/copper.jpg",
        accent: "#59c98b"
    },

    {
        subject: "MATHEMATICS",
        title: "Can infinity<br>have a<br>finite answer?",
        description:
            "Explore infinite series and the surprising behaviour of infinity.",
        image: "images/discoveries/infinity.jpg",
        accent: "#f2a84b"
    }
];


const discoveryTrack =
    document.getElementById("discovery-track");

const discoveryCarousel =
    document.getElementById("discovery-carousel");

const discoveryCounter =
    document.getElementById("discovery-counter");

const discoveryPrev =
    document.getElementById("discovery-prev");

const discoveryNext =
    document.getElementById("discovery-next");


/* =====================================
   CREATE CARD
===================================== */

function createDiscoveryCard(discovery) {

    const card =
        document.createElement("article");

    card.className =
        "discovery-card";

    card.style.setProperty(
        "--discovery-accent",
        discovery.accent
    );

    card.innerHTML = `
        <div class="discovery-content">

            <span class="discovery-tag">
                ✦ ${discovery.subject}
            </span>

            <h3>${discovery.title}</h3>

            <p>${discovery.description}</p>

            <a href="#" class="primary-button">
                Explore ${discovery.subject.toLowerCase()}
                <span>→</span>
            </a>

        </div>

        <div class="discovery-visual">

            <img
                class="discovery-image"
                src="${discovery.image}"
                alt="${discovery.subject}"
                draggable="false"
            >

        </div>
    `;

    return card;
}


/* =====================================
   BUILD 3 COPIES
===================================== */

if (discoveryTrack) {

    for (let copy = 0; copy < 3; copy++) {

        discoveries.forEach(function (discovery) {

            discoveryTrack.appendChild(
                createDiscoveryCard(discovery)
            );

        });

    }

}


/* =====================================
   CAROUSEL STATE
===================================== */

const DISCOVERY_COUNT = discoveries.length;

let currentIndex = DISCOVERY_COUNT;
let isDragging = false;

let startX = 0;
let startScroll = 0;

let autoplayTimer = null;
let snapTimer = null;


/* =====================================
   CARDS
===================================== */

function getCards() {
    return Array.from(
        discoveryTrack.querySelectorAll(".discovery-card")
    );
}


/* =====================================
   UPDATE COUNTER
===================================== */

function updateCounter() {

    if (!discoveryCounter) {
        return;
    }

    const realIndex =
        ((currentIndex % DISCOVERY_COUNT) + DISCOVERY_COUNT)
        % DISCOVERY_COUNT;

    discoveryCounter.textContent =
        `${String(realIndex + 1).padStart(2, "0")} / 04`;
}


/* =====================================
   UPDATE CARD STYLES
===================================== */

function updateCards() {

    const cards = getCards();

    cards.forEach(function (card, index) {

        card.classList.remove(
            "is-active",
            "is-prev",
            "is-next",
            "is-far"
        );

        if (index === currentIndex) {

            card.classList.add("is-active");

        } else if (index === currentIndex - 1) {

            card.classList.add("is-prev");

        } else if (index === currentIndex + 1) {

            card.classList.add("is-next");

        } else {

            card.classList.add("is-far");

        }

    });

    updateCounter();
}


/* =====================================
   GET CENTER POSITION
===================================== */

function getCenterPosition(index) {

    const cards = getCards();
    const card = cards[index];

    if (!card) {
        return 0;
    }

    return (
        card.offsetLeft -
        (
            discoveryCarousel.clientWidth -
            card.offsetWidth
        ) / 2
    );
}


/* =====================================
   MOVE TO CARD
===================================== */

function moveTo(index, smooth = true) {

    const cards = getCards();

    if (!cards[index]) {
        return;
    }

    currentIndex = index;

    updateCards();

    discoveryCarousel.scrollTo({
        left: getCenterPosition(index),
        behavior: smooth ? "smooth" : "auto"
    });
}


/* =====================================
   SILENT LOOP RESET
===================================== */

function loopReset() {

    const cards = getCards();

    if (!cards.length) {
        return;
    }

    /*
        We have 3 copies:

        1 2 3 4 | 1 2 3 4 | 1 2 3 4
                  MIDDLE

        The user always sees the middle copy.

        If we move into the third copy,
        silently jump back to the matching
        card in the middle copy.

        If we move into the first copy,
        silently jump forward to the matching
        card in the middle copy.
    */

    if (currentIndex >= DISCOVERY_COUNT * 2) {

        currentIndex -= DISCOVERY_COUNT;

        const card = cards[currentIndex];

        if (card) {

            discoveryCarousel.scrollTo({
                left: getCenterPosition(currentIndex),
                behavior: "auto"
            });

        }

        updateCards();

    } else if (currentIndex < DISCOVERY_COUNT) {

        currentIndex += DISCOVERY_COUNT;

        const card = cards[currentIndex];

        if (card) {

            discoveryCarousel.scrollTo({
                left: getCenterPosition(currentIndex),
                behavior: "auto"
            });

        }

        updateCards();
    }
}


/* =====================================
   WAIT FOR SCROLL TO FINISH
===================================== */

function scheduleLoopReset() {

    clearTimeout(snapTimer);

    /*
        scrollend is supported by modern browsers
        and fires when the smooth scroll has actually
        finished.
    */

    if ("onscrollend" in discoveryCarousel) {

        return;

    }

    /*
        Fallback for browsers without scrollend.
        This timer is ONLY a fallback.
    */

    snapTimer = setTimeout(function () {

        if (!isDragging) {
            loopReset();
        }

    }, 500);
}


/* =====================================
   SCROLL END
===================================== */

if (discoveryCarousel) {

    discoveryCarousel.addEventListener(
        "scrollend",
        function () {

            if (!isDragging) {
                loopReset();
            }

        }
    );

}


/* =====================================
   MOVE ONE CARD
===================================== */

function moveOne(direction) {

    const cards = getCards();

    if (!cards.length) {
        return;
    }

    const nextIndex =
        currentIndex + direction;

    /*
        Stay inside our 3-copy buffer.
    */

    if (
        nextIndex < 0 ||
        nextIndex >= cards.length
    ) {
        return;
    }

    clearTimeout(snapTimer);

    moveTo(nextIndex, true);

    /*
        IMPORTANT:

        We DO NOT immediately call loopReset().

        The browser finishes the smooth scroll first.
        Then the scrollend event performs the invisible
        reset.

        This fixes the weird backwards scrolling.
    */

    scheduleLoopReset();
}


/* =====================================
   FIND CLOSEST CARD
===================================== */

function closestCard() {

    const cards = getCards();

    const centre =
        discoveryCarousel.scrollLeft +
        discoveryCarousel.clientWidth / 2;

    let closest = currentIndex;
    let distance = Infinity;

    cards.forEach(function (card, index) {

        const cardCentre =
            card.offsetLeft +
            card.offsetWidth / 2;

        const difference =
            Math.abs(centre - cardCentre);

        if (difference < distance) {

            distance = difference;
            closest = index;

        }

    });

    return closest;
}


/* =====================================
   DRAGGING
===================================== */

if (discoveryCarousel) {

    /* ---------------------------------
       POINTER DOWN
    --------------------------------- */

    discoveryCarousel.addEventListener(
        "pointerdown",
        function (event) {

            clearTimeout(snapTimer);

            isDragging = true;

            startX = event.clientX;

            startScroll =
                discoveryCarousel.scrollLeft;

            discoveryCarousel.classList.add(
                "is-dragging"
            );

            discoveryCarousel.setPointerCapture(
                event.pointerId
            );

            stopAutoplay();

        }
    );


    /* ---------------------------------
       POINTER MOVE
    --------------------------------- */

    discoveryCarousel.addEventListener(
        "pointermove",
        function (event) {

            if (!isDragging) {
                return;
            }

            const distance =
                event.clientX - startX;

            discoveryCarousel.scrollLeft =
                startScroll - distance;

        }
    );


    /* ---------------------------------
       POINTER UP
    --------------------------------- */

    discoveryCarousel.addEventListener(
        "pointerup",
        function (event) {

            if (!isDragging) {
                return;
            }

            isDragging = false;

            discoveryCarousel.classList.remove(
                "is-dragging"
            );

            try {

                discoveryCarousel.releasePointerCapture(
                    event.pointerId
                );

            } catch (error) {
                // Pointer capture may already be released.
            }


            /*
                Find whichever card the user dragged
                closest to.
            */

            const closest = closestCard();

            currentIndex = closest;

            /*
                Snap to that card.
            */

            moveTo(closest, true);

            /*
                Wait until the snap is finished,
                THEN perform the invisible loop reset.
            */

            scheduleLoopReset();

            restartAutoplay();

        }
    );


    /* ---------------------------------
       POINTER CANCEL
    --------------------------------- */

    discoveryCarousel.addEventListener(
        "pointercancel",
        function () {

            isDragging = false;

            discoveryCarousel.classList.remove(
                "is-dragging"
            );

            restartAutoplay();

        }
    );

}


/* =====================================
   PREVIOUS BUTTON
===================================== */

if (discoveryPrev) {

    discoveryPrev.addEventListener(
        "click",
        function () {

            stopAutoplay();

            moveOne(-1);

            restartAutoplay();

        }
    );

}


/* =====================================
   NEXT BUTTON
===================================== */

if (discoveryNext) {

    discoveryNext.addEventListener(
        "click",
        function () {

            stopAutoplay();

            moveOne(1);

            restartAutoplay();

        }
    );

}


/* =====================================
   AUTOPLAY
===================================== */

function startAutoplay() {

    stopAutoplay();

    autoplayTimer = setInterval(
        function () {

            if (!isDragging) {
                moveOne(1);
            }

        },
        5000
    );
}


/* =====================================
   STOP AUTOPLAY
===================================== */

function stopAutoplay() {

    if (autoplayTimer) {

        clearInterval(autoplayTimer);

        autoplayTimer = null;

    }
}


/* =====================================
   RESTART AUTOPLAY
===================================== */

function restartAutoplay() {

    stopAutoplay();

    autoplayTimer = setTimeout(
        function () {

            startAutoplay();

        },
        3000
    );
}


/* =====================================
   INITIALISE CAROUSEL
===================================== */

if (discoveryCarousel) {

    requestAnimationFrame(
        function () {

            /*
                Start on the FIRST card of the
                MIDDLE copy.

                Copies:

                0 1 2 3
                4 5 6 7  <-- start here
                8 9 10 11
            */

            currentIndex =
                DISCOVERY_COUNT;

            moveTo(
                currentIndex,
                false
            );

            updateCards();

            startAutoplay();

        }
    );

}