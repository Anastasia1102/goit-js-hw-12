import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import axios from 'axios';
import { GalleryMarkup } from './render-functions.js';
import { lightbox } from '../main.js';

const API_KEY = '42560540-fd525388af9cdf4135c592592';
let totalHits = 0;
let imagesShown = 0;


function debounce(func, delay) {
    let debounceTimer;
    return function (...args) {
        const context = this;
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
}

function scrollGallery() {
    const galleryCard = document.querySelector('.photo-card');
    const cardHeight = galleryCard.getBoundingClientRect().height;
    window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth'
    });
}

const debouncedScrollGallery = debounce(scrollGallery, 100);

export async function fetchImages(query, page) {
    const loader = document.querySelector('.loader');
    const loadMoreButton = document.querySelector('#load-more');
    loadMoreButton.style.display = 'none';
    loader.style.display = 'block';
    
    try {
        const perPage = 15;
        const response = await axios.get(`https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${perPage}&page=${page}`);
        totalHits = response.data.totalHits;
        imagesShown += response.data.hits.length;
        console.log(response.data);
        loader.style.display = 'none';
        if (response.data.hits.length === 0 && totalHits === 0) {
                iziToast.error({
                    message: 'Sorry, there are no images matching your search query. Please try again!',
                    position: "topRight"
                });
        } else {
            GalleryMarkup(response.data.hits);
            lightbox.refresh();
            debouncedScrollGallery();
            if (imagesShown >= totalHits) {
                loadMoreButton.style.display = 'none';
                iziToast.info({
                    message: 'We are sorry, but you have reached the end of search results.',
                    position: "center"
                });
            } else {
                loadMoreButton.style.display = 'block';
            }
        }
        }catch (error) {
        console.error('Error fetching images:', error);
        loader.style.display = 'none';
        iziToast.error({
            message: 'Failed to fetch images. Please try again later.'
        });
    }
}