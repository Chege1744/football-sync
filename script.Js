// HERO BACKGROUND TRANSITIONS
const hero = document.querySelector('.hero');
const bgColors = [
  'linear-gradient(to right, #1e3a8a, #0f172a)',
  'linear-gradient(to right, #0d9488, #134e4a)',
  'linear-gradient(to right, #6d28d9, #312e81)',
  'linear-gradient(to right, #2563eb, #1e40af)',
  'linear-gradient(to right, #f59e0b, #b45309)'
];
let currentColor = 0;
function changeHeroBackground() {
  hero.style.background = bgColors[currentColor];
  currentColor = (currentColor + 1) % bgColors.length;
}
setInterval(changeHeroBackground, 5000);

// TESTIMONIAL SLIDER
let aboutCurrent = 0;
const aboutTestimonials = document.querySelectorAll('.about-testimonials .testimonial');

function showAboutTestimonial(index) {
  aboutTestimonials.forEach(t => t.classList.remove('active'));
  aboutCurrent = (index + aboutTestimonials.length) % aboutTestimonials.length;
  aboutTestimonials[aboutCurrent].classList.add('active');
}
document.getElementById('about-prev').addEventListener('click', () => showAboutTestimonial(aboutCurrent - 1));
document.getElementById('about-next').addEventListener('click', () => showAboutTestimonial(aboutCurrent + 1));
setInterval(() => showAboutTestimonial(aboutCurrent + 1), 6000);
showAboutTestimonial(aboutCurrent);

// SCROLL ANIMATIONS
function revealOnScroll(elements, className = 'visible') {
  elements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 60) {
      el.classList.add(className);
    }
  });
}
window.addEventListener('scroll', () => {
  revealOnScroll(document.querySelectorAll('.about-card'));
  revealOnScroll(document.querySelectorAll('.training-card'));
  revealOnScroll(document.querySelectorAll('.resource-card'));
});
window.addEventListener('load', () => {
  revealOnScroll(document.querySelectorAll('.about-card'));
  revealOnScroll(document.querySelectorAll('.training-card'));
  revealOnScroll(document.querySelectorAll('.resource-card'));
});

// RESOURCE CARD EXPAND
function toggleExpand(button) {
  const card = button.closest('.resource-card');
  card.classList.toggle('expanded');
}

// TRAINING PROGRAM MODAL
function viewProgram(type) {
  const modal = document.getElementById("modal");
  const modalBody = document.getElementById("modal-body");
  let content = "";

  switch (type) {
    case "foundation":
      content = "<h3>Foundation Drills</h3><p>Footwork basics, close control, dribble cones, wall passes, and target shooting drills.</p>";
      break;
    case "tactics":
      content = "<h3>Tactical Mastery</h3><p>Learn positioning, transition play, defensive zones, and pressing structure with guided videos.</p>";
      break;
    case "agility":
      content = "<h3>Speed & Agility</h3><p>Sprint ladders, shuttle runs, turning drills, and explosive starts for elite performance.</p>";
      break;
    default:
      content = "<p>Training content not found.</p>";
  }

  modalBody.innerHTML = content;
  modal.classList.remove("hidden");
}
function closeModal() {
  document.getElementById("modal").classList.add("hidden");
}

// REGISTRATION MODAL OPEN/CLOSE
function openRegistration() {
  document.getElementById("register-modal").classList.remove("hidden");
}
function closeRegistration() {
  document.getElementById("register-modal").classList.add("hidden");

  // Reset form and messages
  const form = document.getElementById("registration-form");
  form.classList.remove("hidden");
  form.reset();
  document.getElementById("registration-success").classList.add("hidden");
  document.getElementById("already-registered").classList.add("hidden");
}

// REGISTRATION FORM SUBMISSION
document.getElementById("registration-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const emailInput = this.email.value.trim().toLowerCase();
  const registeredEmails = JSON.parse(localStorage.getItem("registeredEmails") || "[]");

  // Hide all messages first
  document.getElementById("registration-success").classList.add("hidden");
  document.getElementById("already-registered").classList.add("hidden");

  if (registeredEmails.includes(emailInput)) {
    // Already registered
    this.classList.add("hidden");
    document.getElementById("already-registered").classList.remove("hidden");
  } else {
    // Save and confirm
    registeredEmails.push(emailInput);
    localStorage.setItem("registeredEmails", JSON.stringify(registeredEmails));

    this.classList.add("hidden");
    document.getElementById("registration-success").classList.remove("hidden");
  }
});
