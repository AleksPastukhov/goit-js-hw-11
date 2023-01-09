import Notiflix from 'notiflix';
import NewsApiService from './js/news-service';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  form: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

refs.form.addEventListener('submit', onFormSubmitSearchQuery);
refs.loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);

const newsApiService = new NewsApiService();

function scroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

function startSimpleLightbox() {
  const simpleLightboxOptions = {
    captionsData: 'alt',
    captionDelay: 250,
  };

  const gallerySet = new SimpleLightbox('.gallery a', simpleLightboxOptions);
  return gallerySet;
}

async function onFormSubmitSearchQuery(e) {
  e.preventDefault();

  clearGalleryContainer();
  refs.loadMoreBtn.classList.add('is-hidden');

  newsApiService.request = e.currentTarget.elements.searchQuery.value;

  newsApiService.resetPage();

  const data = await newsApiService.getFoto();

  const galleryItems = await data.hits;

  if (galleryItems.length !== 0) {
    Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
    appendGalleryMurkup(galleryItems);
    startSimpleLightbox();
    refs.loadMoreBtn.classList.remove('is-hidden');
  } else {
    Notiflix.Notify.failure(
      `❌ "Sorry, there are no images matching your search query. Please try again."`
    );
  }
}

async function onLoadMoreBtnClick() {
  const data = await newsApiService.getFoto();
  const galleryItems = await data.hits;
  appendGalleryMurkup(galleryItems);
  startSimpleLightbox().refresh();

  if (
    data.totalHits === refs.gallery.children.length ||
    data.totalHits < refs.gallery.children.length
  ) {
    Notiflix.Notify.failure(`We're sorry, but you've reached the end of search results.`);
    refs.loadMoreBtn.classList.add('is-hidden');
  }
  scroll();
}

function appendGalleryMurkup(galleryItems) {
  refs.gallery.insertAdjacentHTML('beforeend', createMurkup(galleryItems));
}

function clearGalleryContainer() {
  refs.gallery.innerHTML = '';
}

function createMurkup(galleryItems) {
  return galleryItems
    .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
      return `
<div class="photo-card">
<a href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}" loading="lazy" title="" width="290px" height="190px"/></a>
  <div class="info">
    <p class="info-item">
      <b>Likes</b><span>${likes}</span>
    </p>
    <p class="info-item">
      <b>Views</b><span>${views}</span>
    </p>
    <p class="info-item">
      <b>Comments</b><span>${comments}</span>
    </p>
    <p class="info-item">
      <b>Downloads</b><span>${downloads}</span>
    </p>
  </div>
</div>
`;
    })
    .join('');
}
