const axios = require('axios').default;

const refs = {
    form: document.querySelector('.search-form'),
    gallery: document.querySelector('.gallery'),
  }

refs.form.addEventListener('submit', onSearchQuery)

const API_KEY = '32681971-7c4dedd5870704d3ef280ea2e';
const MAIN_URL = `https://pixabay.com/api/?key=${API_KEY}`;
let userRequest = '';
let request = '';

function onSearchQuery(e){
    e.preventDefault();
    userRequest = e.target[0].value;
    getFoto (userRequest)
}

function createRequest (userRequest) {
return request = `${MAIN_URL}&q=${userRequest}&image_type=photo&orientation=horizontal&safesearch=true`;
}

async function getFoto (userRequest) {
    createRequest (userRequest)
    const respons = await axios.get(request)
    return respons.data
}

// function createMurkup () {
// return `
// <div class="photo-card">
//   <img src="" alt="" loading="lazy" />
//   <div class="info">
//     <p class="info-item">
//       <b>Likes</b>
//     </p>
//     <p class="info-item">
//       <b>Views</b>
//     </p>
//     <p class="info-item">
//       <b>Comments</b>
//     </p>
//     <p class="info-item">
//       <b>Downloads</b>
//     </p>
//   </div>
// </div>
// `
// }


// const { height: cardHeight } = document
//   .querySelector(".gallery")
//   .firstElementChild.getBoundingClientRect();

// window.scrollBy({
//   top: cardHeight * 2,
//   behavior: "smooth",
// });