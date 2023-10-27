// Create an object to store like counts for each artwork
var artworkLikes = {};

// Function to perform the search
function searchArtwork() {
  var searchTerm = document.getElementById("search-input").value.toLowerCase();
  var artworks = document.querySelectorAll(".artwork");

  var found = false; // Flag to check if a matching artwork is found

  artworks.forEach(function (artwork) {
    var artworkTitle = artwork.getAttribute('data-title').toLowerCase(); // Use the data-title attribute
    var img = artwork.querySelector("img");

    if (artworkTitle.includes(searchTerm)) {
      artwork.style.display = "block";
      img.style.display = "block"; // Show the associated image
      found = true; // Set the flag to true if a matching artwork is found
    } else {
      artwork.style.display = "none";
      img.style.display = "none"; // Hide the associated image
    }
  });

  // Scroll to the first matching artwork if found
  if (found) {
    var firstMatchingArtwork = document.querySelector(".artwork[data-title*='" + searchTerm + "']");
    if (firstMatchingArtwork) {
      smoothScrollToTarget(firstMatchingArtwork);
    }
  } else {
    // Display "Artwork not found" message in red
    var notFoundMessage = document.getElementById("not-found-message");
    notFoundMessage.style.color = "red";
    notFoundMessage.textContent = "Artwork not found";
  }
}

function preloadImages() {
  const images = document.querySelectorAll('.artwork img');
  images.forEach((img) => {
    if (img.hasAttribute('src')) {
      const src = img.getAttribute('src');
      const image = new Image();
      image.src = src;

      image.onload = () => {
        img.classList.add('image-fade-in');
      };
    }
  });
}

window.addEventListener('load', preloadImages);

function smoothScrollToTarget(targetElement) {
  window.scrollTo({
    top: targetElement.offsetTop,
    behavior: 'smooth',
  });
}

document.querySelectorAll('nav a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const targetId = this.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      smoothScrollToTarget(targetElement);
    }
  });
});

var backToTopButton = document.getElementById("back-to-top");

window.addEventListener("scroll", function () {
  if (window.pageYOffset > 200) {
    backToTopButton.style.display = "block";
  } else {
    backToTopButton.style.display = "none";
  }
});

backToTopButton.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

const scrollReveal = ScrollReveal({
  origin: 'bottom',
  distance: '20px',
  duration: 1000,
  reset: true,
});

scrollReveal.reveal('.artwork img');

particlesJS('particles-js', {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 800,
      },
    },
  },
});

const artworkImages = document.querySelectorAll('.artwork img');

artworkImages.forEach((img) => {
  img.addEventListener('click', function () {
    const parentArticle = this.parentElement;
    const artworkInfo = parentArticle.querySelector('.artwork-info');
    artworkInfo.style.display = artworkInfo.style.display === 'none' ? 'block' : 'none';
  });
});

// Function to handle liking artwork

// Add event listeners to all like buttons
var likeButtons = document.querySelectorAll('.like-button');

likeButtons.forEach(function (likeButton) {
  likeButton.addEventListener('click', function () {
    likeArtwork(this); // Call the likeArtwork function with the clicked button
  });
});
