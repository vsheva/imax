//api key
//668a01fc8852e1c4fe98bb335096d80a

//console.log(window.location.pathname);

const global = {
  currentPage: window.location.pathname,
};

const showMoviePopular = async () => {
  let { results } = await fetchApi('movie/popular');

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

const showShowsPopular = async () => {
  let { results } = await fetchApi('tv/popular');

  results.map(show => {
    const div = document.createElement('div');
    div.classList.add('card');

    div.innerHTML = `
          <a href="tv-details.html?id=${show.id}">
        ${
          show.poster_path
            ? `
     <img
        src="https://image.tmdb.org/t/p/w500${show.poster_path}"
        class="card-img-top"
        alt=${show.name}
      />
         `
            : `  <img
         src="images/no-image.jpg"
         class="card-img-top"
         alt="${show.name}"
       />
         `
        }
          </a>
  
    <div class="card-body">
      <h5 class="card-title">${show.name}</h5>
      <p class="card-text">
        <small class="text-muted">Air Date: ${show.first_air_date}</small>
      </p>
      </div>
    `;

    document.getElementById('popular-shows').appendChild(div);
  });
};

const displayMovieDetails = async () => {
  const movieId = window.location.search.split('=')[1]; // ?id=299054

  const movie = await fetchApi(`movie/${movieId}`);

  //  for background image
  displayBackgroundImage('movie', movie.backdrop_path); //type

  const div = document.createElement('div');

  div.innerHTML = `
    <div class="details-top">
          <div>
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
          </div>
          <div>
            <h2>${movie.title}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${movie.vote_average.toFixed(1)} / 10
            </p>
            <p class="text-muted">Release Date: ${movie.release_date}</p>
            <p>
              ${movie.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
            ${movie.genres.map(genre => `<li>${genre.name}</li>`).join('')} 
            </ul>
            <a href="${movie.homepage}" target="_blank" class="btn">Visit Movie Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Movie Info</h2>
          <ul>
            <li><span class="text-secondary">Budget:</span> $${addCommasToNumber(movie.budget)}</li>
            <li><span class="text-secondary">Revenue:</span> $${addCommasToNumber(
              movie.revenue,
            )}</li>
            <li><span class="text-secondary">Runtime:</span> ${movie.runtime}minutes</li>
            <li><span class="text-secondary">Status:</span> ${movie.status}</li>
          </ul>
          <h4>Production Companies</h4>
          ${movie.production_companies
            .map(company => `<span class="list-group">${company.name}</span>`)
            .join(', ')}
        </div>
    `;

  document.getElementById('movie-details').appendChild(div);
};

const displayShowDetails = async () => {
  const showId = window.location.search.split('=')[1]; // ?id=299054

  const show = await fetchApi(`tv/${showId}`);

  //  for background image
  displayBackgroundImage('tv', show.backdrop_path); //type

  const div = document.createElement('div');

  div.innerHTML = `
    <div class="details-top">
          <div>
          ${
            show.poster_path
              ? `
       <img
          src="https://image.tmdb.org/t/p/w500${show.poster_path}"
          class="card-img-top"
          alt=${show.name}
        />
           `
              : `  <img
           src="images/no-image.jpg"
           class="card-img-top"
           alt="${show.name}"
         />
           `
          }
          </div>
          <div>
            <h2>${show.name}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${show.vote_average.toFixed(1)} / 10
            </p>
            <p class="text-muted">Last Air Date: ${show.last_air_date}</p>
            <p>
              ${show.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
            ${show.genres.map(genre => `<li>${genre.name}</li>`).join('')} 
            </ul>
            <a href="${show.homepage}" target="_blank" class="btn">Visit Show Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Show Info</h2>
          <ul>
            <li><span class="text-secondary">Number of Episodes:</span> ${
              show.number_of_episodes
            }</li>
            <li><span class="text-secondary">Last Episode to Air:</span> ${
              show.last_episode_to_air.name
            }</li>
            <li><span class="text-secondary">Status:</span> ${show.status}</li>
          </ul>
          <h4>Production Companies</h4>
          ${show.production_companies
            .map(company => `<span class="list-group">${company.name}</span>`)
            .join(', ')}
        </div>
    `;

  document.getElementById('show-details').appendChild(div);
};

//backdrop on details pages
const displayBackgroundImage = (type, backgroundPath) => {
  const overlayDiv = document.createElement('div');

  overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${backgroundPath})`;
  overlayDiv.style.backgroundSize = 'cover';
  overlayDiv.style.backgroundPosition = 'center';
  overlayDiv.style.backgroundRepeat = 'no-repeat';
  overlayDiv.style.height = '100vh';
  overlayDiv.style.width = '100vw';
  // overlayDiv.style.position = "absolute";
  overlayDiv.style.position = 'fixed';
  overlayDiv.style.top = '0';
  overlayDiv.style.left = '0';
  // overlayDiv.style.zIndex = "-1";
  overlayDiv.style.opacity = '0.1';

  if (type === 'movie') {
    document.querySelector('#movie-details').appendChild(overlayDiv);
  } else {
    document.querySelector('#show-details').appendChild(overlayDiv);
  }
};

const fetchApi = async end => {
  const API_KEY = '668a01fc8852e1c4fe98bb335096d80a';
  const API_URL = 'https://api.themoviedb.org/3/';

  showSpinner();
  const response = await fetch(`${API_URL}${end}?api_key=${API_KEY}&language=en-US`);
  const data = await response.json();
  hideSpinner();
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

const addCommasToNumber = number => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const showSpinner = () => {
  document.querySelector('.spinner').classList.add('show');
};

const hideSpinner = () => {
  document.querySelector('.spinner').classList.remove('show');
};

const init = () => {
  switch (global.currentPage) {
    case '/':
    case '/index.html':
      showMoviePopular();
      break;
    case '/shows.html':
      showShowsPopular();
      break;
    case '/movie-details.html':
      displayMovieDetails();
      break;
    case '/tv-details.html':
      displayShowDetails();
      break;
    case '/search.html':
      console.log('Search');
      break;
  }
  highlightActiveLink();
};

document.addEventListener('DOMContentLoaded', init);
