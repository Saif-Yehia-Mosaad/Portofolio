const body = document.body;
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const themeBtn = document.getElementById("themeBtn");
const topBtn = document.getElementById("topBtn");

menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("show");
    const icon = menuBtn.querySelector("i");
    icon.classList.toggle("fa-bars");
    icon.classList.toggle("fa-xmark");
});

document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("show");
        const icon = menuBtn.querySelector("i");
        icon.classList.add("fa-bars");
        icon.classList.remove("fa-xmark");
    });
});

// Light mode is the default. Dark mode is saved only after the visitor chooses it.
const savedTheme = localStorage.getItem("portfolio-theme");
if (savedTheme === "dark") {
    body.classList.remove("light");
    themeBtn.querySelector("i").classList.replace("fa-moon", "fa-sun");
}

themeBtn.addEventListener("click", () => {
    const isCurrentlyDark = !body.classList.contains("light");
    body.classList.toggle("light", isCurrentlyDark);

    const isLight = body.classList.contains("light");
    localStorage.setItem("portfolio-theme", isLight ? "light" : "dark");

    const icon = themeBtn.querySelector("i");
    icon.classList.toggle("fa-moon", isLight);
    icon.classList.toggle("fa-sun", !isLight);
});

const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        filterButtons.forEach(item => item.classList.remove("active"));
        button.classList.add("active");

        const filter = button.dataset.filter;

        projectCards.forEach(card => {
            const show = filter === "all" || card.dataset.category === filter;
            card.classList.toggle("hide", !show);
        });
    });
});

const sections = document.querySelectorAll("main section[id]");
const navItems = document.querySelectorAll(".nav-link");

const updateActiveLink = () => {
    const y = window.scrollY + 150;

    sections.forEach(section => {
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;

        if (y >= top && y < bottom) {
            navItems.forEach(link => {
                link.classList.toggle(
                    "active",
                    link.getAttribute("href") === `#${section.id}`
                );
            });
        }
    });

    topBtn.classList.toggle("show", window.scrollY > 500);
};

window.addEventListener("scroll", updateActiveLink);
updateActiveLink();

topBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

contactForm.addEventListener("submit", event => {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
        formMessage.textContent = "Please complete all fields.";
        return;
    }

    if (!email.includes("@")) {
        formMessage.textContent = "Please enter a valid email.";
        return;
    }

    const recipient = "saifyehia58@gmail.com";
    const subject = encodeURIComponent(`Portfolio contact from ${name}`);
    const bodyText = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\n${message}`
    );

    const gmailUrl =
        `https://mail.google.com/mail/?view=cm&fs=1&to=${recipient}` +
        `&su=${subject}&body=${bodyText}`;

    formMessage.textContent = "Opening Gmail...";

    window.open(gmailUrl, "_blank", "noopener,noreferrer");

    setTimeout(() => {
        formMessage.textContent = "Gmail opened in a new tab.";
    }, 500);
});
