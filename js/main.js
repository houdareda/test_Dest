document.addEventListener('DOMContentLoaded', function() {
    const toursSwiper = new Swiper('.more_tours_swiper', {
        slidesPerView: 3,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 2000000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
        },
        speed: 400,
 
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
 
        breakpoints: {
            // Mobile (up to 767px): 1 slide
            0: {
                slidesPerView: 2,
                spaceBetween: 15,
                speed: 300,
            },
            // Tablet (768px and up): 2 slides
            768: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            // Desktop (1024px and up): 3 slides
            1024: {
                slidesPerView: 3,
                spaceBetween: 30,
            },
            // Large screens (1200px and up): 3 slides with more space
            1200: {
                slidesPerView: 3,
                spaceBetween: 30,
            }
        },

    });
});