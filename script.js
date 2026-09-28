const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");

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
        const text = section.textContent.toLowerCase();

        if (text.includes(query)) {
            section.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
            matchFound = true;
        }
    });
    if (!matchFound) {
        alert("No matching topics found. Try Physics, Calculus, Stars, or Chemistry.");
    }
});

const askForm = document.getElementById("ask-form");
const askInput = document.getElementById("ask-input");

askForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const question = askInput.value.trim();

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
});

/* =====================================
   3. CREATE A LEARNING NOTE
===================================== */

const createButton = document.getElementById("create-button");

createButton.addEventListener("click", function () {

    const note = prompt(
        "Create a learning note. What do you want to remember?"
    );

    if (note === null || note.trim() === "") {
        return;
    }

    const noteCard = document.createElement("article");

    noteCard.className = "practice-card";

    const content = document.createElement("div");

    const title = document.createElement("h3");
    title.textContent = "Your Learning Note";

    const paragraph = document.createElement("p");
    paragraph.textContent = note;

    content.appendChild(title);
    content.appendChild(paragraph);

    noteCard.appendChild(content);

    const dashboard = document.querySelector(".dashboard");

    dashboard.insertBefore(
        noteCard,
        document.querySelector(".footer")
    );

    noteCard.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

});


/* =====================================
   4. SIDEBAR NAVIGATION
===================================== */

const navItems = document.querySelectorAll(".nav-item");

navItems.forEach(function (item) {

    item.addEventListener("click", function () {

        // Remove the active style from every link
        navItems.forEach(function (link) {
            link.classList.remove("active");
        });

        // Highlight the clicked link
        item.classList.add("active");

    });

});


/* =====================================
   5. KEYBOARD SHORTCUT FOR SEARCH
===================================== */

document.addEventListener("keydown", function (event) {

    if (
        event.key === "/" &&
        document.activeElement.tagName !== "INPUT" &&
        document.activeElement.tagName !== "TEXTAREA"
    ) {
        event.preventDefault();
        searchInput.focus();
    }

});
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

const root = document.documentElement;


/* DEFAULT SETTINGS */

const defaultAppearance = {
    theme: "nova",
    mode: "dark",
    accent: "#9b8cff"
};


/* LOAD SAVED SETTINGS */

let savedAppearance;

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


/* AVAILABLE THEMES */

const availableThemes = [
    "nova",
    "ocean",
    "midnight",
    "forest",
    "solar"
];


/* AVAILABLE MODES */

const availableModes = [
    "dark",
    "light"
];


/* AVAILABLE ACCENTS */

const availableAccents = [
    "#9b8cff",
    "#43c6f5",
    "#61d6a0",
    "#ff9565",
    "#f071b8"
];


/* =====================================
   APPLY APPEARANCE
===================================== */

function applyAppearance() {
    root.dataset.theme = appearance.theme;
    root.dataset.mode = appearance.mode;

    root.style.setProperty("--accent", appearance.accent);
    root.style.setProperty("--purple", appearance.accent);

    try {
        localStorage.setItem(
            "novaAppearance",
            JSON.stringify(appearance)
        );
    } catch (error) {
        console.warn("Could not save appearance settings.");
    }

    document.querySelectorAll(".theme-option").forEach(function (button) {
        button.classList.toggle(
            "selected",
            button.dataset.theme === appearance.theme
        );
    });

    document.querySelectorAll(".mode-option").forEach(function (button) {
        button.classList.toggle(
            "selected",
            button.dataset.mode === appearance.mode
        );
    });

    document.querySelectorAll(".accent-option").forEach(function (button) {
        button.classList.toggle(
            "selected",
            button.dataset.accent === appearance.accent
        );
    });
}


/* =====================================
   OPEN AND CLOSE SETTINGS
===================================== */

function openSettings() {
    if (!settingsOverlay) return;

    settingsOverlay.classList.add("open");
    settingsOverlay.style.display = "flex";
    document.body.style.overflow = "hidden";

    if (settingsClose) {
        settingsClose.focus();
    }
}

function closeSettings() {
    if (!settingsOverlay) return;

    settingsOverlay.classList.remove("open");
    settingsOverlay.style.display = "";

    document.body.style.overflow = "";

    if (settingsButton) {
        settingsButton.focus();
    }
}

// Open settings
if (settingsButton) {
    settingsButton.addEventListener("click", function (event) {
        event.preventDefault();
        openSettings();
    });
}

// Close button
if (settingsClose) {
    settingsClose.addEventListener("click", closeSettings);
}

// Click outside the panel
if (settingsOverlay) {
    settingsOverlay.addEventListener("click", function (event) {
        if (event.target === settingsOverlay) {
            closeSettings();
        }
    });
}

// Escape key
document.addEventListener("keydown", function (event) {
    if (
        event.key === "Escape" &&
        settingsOverlay &&
        settingsOverlay.classList.contains("open")
    ) {
        closeSettings();
    }
});


/* =====================================
   SELECT A THEME
===================================== */

document.querySelectorAll(".theme-option").forEach(function (button) {
    button.addEventListener("click", function () {
        const selectedTheme = button.dataset.theme;

        if (!availableThemes.includes(selectedTheme)) return;

        const defaultAccents = {
            nova: "#9b8cff",
            ocean: "#43c6f5",
            midnight: "#a0a0b5",
            forest: "#61d6a0",
            solar: "#ff9565"
        };

        appearance.theme = selectedTheme;
        appearance.accent = defaultAccents[selectedTheme];

        applyAppearance();
    });
});


/* =====================================
   LIGHT AND DARK MODE
===================================== */

document.querySelectorAll(".mode-option").forEach(function (button) {
    button.addEventListener("click", function () {
        const selectedMode = button.dataset.mode;

        if (!availableModes.includes(selectedMode)) return;

        appearance.mode = selectedMode;

        applyAppearance();
    });
});


/* =====================================
   ACCENT COLOUR
===================================== */

document.querySelectorAll(".accent-option").forEach(function (button) {
    button.addEventListener("click", function () {
        const selectedAccent = button.dataset.accent;

        if (!availableAccents.includes(selectedAccent)) return;

        appearance.accent = selectedAccent;

        applyAppearance();
    });
});


/* =====================================
   RESET APPEARANCE
===================================== */

if (resetAppearance) {
    resetAppearance.addEventListener("click", function () {
        appearance = { ...defaultAppearance };
        applyAppearance();
    });
}


/* =====================================
   LOAD SAVED SETTINGS
===================================== */

if (!availableThemes.includes(appearance.theme)) {
    appearance.theme = "nova";
}

if (!availableModes.includes(appearance.mode)) {
    appearance.mode = "dark";
}

if (!availableAccents.includes(appearance.accent)) {
    appearance.accent = "#9b8cff";
}

applyAppearance();
