//api key
//668a01fc8852e1c4fe98bb335096d80a

//console.log(window.location.pathname);

const global = {
  currentPage: window.location.pathname,
  search: {
    term: '',
    type: '',
    page: 1,
    totalPages: 1,
    totalResults: 0,
  },
  api: {
    apiKey: '668a01fc8852e1c4fe98bb335096d80a',
    apiUrl: 'https://api.themoviedb.org/3/',
  },
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
  const movieId = window.location.search.split('=')[1];

  const movie = await fetchApi(`movie/${movieId}`);
  console.log(movie);

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
            <a href=${movie.homepage} target="_blank" class="btn">Visit Movie Homepage</a>
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
  overlayDiv.style.position = 'absolute';
  //overlayDiv.style.position = 'fixed';
  overlayDiv.style.top = '0';
  overlayDiv.style.left = '0';
  overlayDiv.style.zIndex = '-1';
  overlayDiv.style.opacity = '0.1';

  if (type === 'movie') {
    document.querySelector('#movie-details').appendChild(overlayDiv);
  } else {
    document.querySelector('#show-details').appendChild(overlayDiv);
  }
};

const fetchApi = async end => {
  const API_KEY = global.api.apiKey;
  const API_URL = global.api.apiUrl;

  showSpinner();
  const response = await fetch(
    `${API_URL}${end}?api_key=${API_KEY}&language=en-US&page=${global.search.page}`,
  );
  const data = await response.json();
  hideSpinner();
  return data;
};

//request to search
const searchAPIData = async () => {
  const API_KEY = global.api.apiKey;
  const API_URL = global.api.apiUrl;

  showSpinner();

  const response = await fetch(
    `${API_URL}search/${global.search.type}?api_key=${API_KEY}&query=${global.search.term}&language=en-US&page=${global.search.page}`,
  );
  const data = await response.json();
  hideSpinner();
  return data;
};

//search movies and shows

const search = async () => {
  const queryString = window.location.search;

  const urlParams = new URLSearchParams(queryString);
  //console.log(urlParams.get('type'));
  global.search.type = urlParams.get('type'); //movie or tv
  global.search.term = urlParams.get('search-term'); //entered

  if (global.search.term !== '' && global.search.type !== null) {
    const { results, total_pages, page, total_results } = await searchAPIData();

    global.search.page = page;
    global.search.totalPages = total_pages;
    global.search.totalResults = total_results;

    if (results.length === 0) {
      showAlert('No results found');
      return;
    }
    displaySearchResults(results);
    document.getElementById('search-term').value = '';
  } else {
    showAlert('Please enter a search term');
  }
};

const displaySearchResults = results => {
  //Clear previous results
  document.querySelector('#search-results').innerHTML = '';
  document.querySelector('#search-results-heading').innerHTML = '';
  document.querySelector('#pagination').innerHTML = '';

  results.map(result => {
    const div = document.createElement('div');
    div.classList.add('card');

    div.innerHTML = `
          <a href="${global.search.type}-details.html?id=${result.id}">
        ${
          result.poster_path
            ? `
     <img
        src="https://image.tmdb.org/t/p/w500/${result.poster_path}"
        class="card-img-top"
        alt=${global.search.type === 'movie' ? result.title : result.name}
      />
         `
            : `  <img
         src="images/no-image.jpg"
         class="card-img-top"
         alt="${global.search.type === 'movie' ? result.title : result.name}"
       />
         `
        }
          </a>
  
    <div class="card-body">
      <h5 class="card-title">${global.search.type === 'movie' ? result.title : result.name}</h5>
      <p class="card-text">
        <small class="text-muted">Release: ${
          global.search.type === 'movie' ? result.release_date : result.first_air_date
        }</small>
      </p>
      </div>
    `;
    document.getElementById('search-results-heading').innerHTML = `
    <h2>${results.length} of ${global.search.totalResults}
    Results for ${global.search.term}</h2>
    `;

    document.getElementById('search-results').appendChild(div);
  });
  displayPagination();
};

const displayPagination = () => {
  const div = document.createElement('div');
  div.classList.add('pagination');

  div.innerHTML = `
          <button class="btn btn-primary" id="prev">Prev</button>
          <button class="btn btn-primary" id="next">Next</button>
          <div class="page-counter">Page ${global.search.page} of ${global.search.totalPages}</div>
  `;
  document.getElementById('pagination').appendChild(div);

  //Disable prev button on first page
  if (global.search.page === 1) {
    document.querySelector('#prev').disabled = true;
  }
  //Disable next button on last page
  if (global.search.page === global.search.totalPages) {
    document.querySelector('#next').disabled = true;
  }

  //next page

  document.querySelector('#next').addEventListener('click', async () => {
    global.search.page++;
    const { results, total_pages } = await searchAPIData();
    displaySearchResults(results);
  });

  //prev page

  document.querySelector('#prev').addEventListener('click', async () => {
    global.search.page--;
    const { results, total_pages } = await searchAPIData();
    displaySearchResults(results);
  });
};

//pagiantion for search

//slider slider swiper for Movies
const displaySlider = async () => {
  const { results } = await fetchApi('movie/now_playing');

  results.forEach(movie => {
    const div = document.createElement('div');
    div.classList.add('swiper-slide');

    div.innerHTML = `
  <a href="movie-details.html?id=${movie.id}">
    <img src="https://tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
  </a>
  <h4 class="swiper-rating">
    <i class="fas fa-star text-secondary"></i> ${movie.vote_average} /10
  </h4>
  `;

    document.querySelector('.swiper-wrapper').appendChild(div);
    initSwiper();
  });
};

const initSwiper = () => {
  const swiper = new Swiper('.swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    freeMode: true,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    breakpoints: {
      500: {
        slidesPerView: 2,
      },
      700: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 4,
      },
    },
  });
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

//error alert !!!!!!!!!!!!!!!!!!!!!!!!! УБРАТЬ className

const showAlert = (message, className = 'error') => {
  const alertEl = document.createElement('div');
  alertEl.classList.add('alert', className);
  alertEl.appendChild(document.createTextNode(message));
  document.querySelector('#alert').appendChild(alertEl);

  setTimeout(() => alertEl.remove(), 3000);
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
      displaySlider();
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
      search();
      break;
  }
  highlightActiveLink();
};

document.addEventListener('DOMContentLoaded', init);
