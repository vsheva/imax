//api key
//668a01fc8852e1c4fe98bb335096d80a

//console.log(window.location.pathname);

const global = {
  currentPage: window.location.pathname,
};

const showMoviePopular = async () => {
  let { results } = await fetchApi('movie/popular');
  console.log(results);

  results.map(movie => {
    const div = document.createElement('div');
    div.classList.add('card');

    div.innerHTML = `
          <a href="movie-details.html?id=${movie.id}">
        ${
          movie.poster_path
            ? `
        <img
        src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
        class="card-img-top"
        alt=${movie.title}
      />
         `
            : `  <img
         src="images/no-image.jpg"
         class="card-img-top"
         alt="${movie.title}"
       />
         `
        }
          </a>
  
    <div class="card-body">
      <h5 class="card-title">${movie.title}</h5>
      <p class="card-text">
        <small class="text-muted">Release: ${movie.release_date}</small>
      </p>
      </div>
    `;

    document.getElementById('popular-movies').appendChild(div);
  });
};

const fetchApi = async end => {
  const API_KEY = '668a01fc8852e1c4fe98bb335096d80a';
  const API_URL = 'https://api.themoviedb.org/3/';

  const response = await fetch(`${API_URL}${end}?api_key=${API_KEY}&language=en-US`);
  const data = await response.json();
  return data;
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
      showMoviePopular();
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
