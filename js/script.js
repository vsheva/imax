//api key
//668a01fc8852e1c4fe98bb335096d80a

//console.log(window.location.pathname);

const global = {
  currentPage: window.location.pathname,
};

// Highlight active link

const highlightActiveLink = () => {
  const links = document.querySelectorAll('.nav-link');

  Array.from(links).map(link => {
    if (link.getAttribute('href') === global.currentPage) {
      link.classList.add('active');
    }
  });
};

const init = () => {
  switch (global.currentPage) {
    case '/':
    case '/index.html':
      console.log('Home');
      break;
    case '/shows.html':
      console.log('Shows');
      break;
    case '/movie-details.html':
      console.log('Movie Details');
      break;
    case '/tv-details.html':
      console.log('TV Details');
      break;
    case '/search.html':
      console.log('Search');
      break;
  }
  highlightActiveLink();
};

document.addEventListener('DOMContentLoaded', init);
