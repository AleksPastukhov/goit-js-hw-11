const axios = require('axios').default;

export default class NewsApiService {
  constructor() {
    this.userRequest = '';
    this.page = 1;
  }

  createRequest() {
    const KEY = '32681971-7c4dedd5870704d3ef280ea2e';
    const MAIN_URL = `https://pixabay.com/api/`;

    return `${MAIN_URL}?key=${KEY}&q=${this.userRequest}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`;
  }

  async getFoto() {
    const respons = await axios.get(this.createRequest());
    this.page += 1;
    return respons.data;
  }

  resetPage() {
    this.page = 1;
  }

  get request() {
    return this.userRequest;
  }

  set request(newUserRequest) {
    this.userRequest = newUserRequest;
  }
}
