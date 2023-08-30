function syncCarousels(event) {
    event.preventDefault();

    var targetCarousel = $(event.currentTarget).data('bs-target');
    var slideDirection = $(event.currentTarget).data('bs-slide');

    $('#bgCarousel').carousel(slideDirection);
    $('#position').carousel(slideDirection);
}

$(document).ready(function() {
    $('.sync-btn').on('click', syncCarousels);
});

$('.menu_icon').click(function(){
    $(this).toggleClass('open');
    $(this).siblings('.menu_sp').toggleClass('open_sp');
});

window.addEventListener('load', function() {
    const loadingScreen = document.querySelector('.loading-screen');
    const body = document.querySelector('body');

    setTimeout(function() {
        loadingScreen.classList.add('fade-out');
        body.classList.add('disable-scroll');

        setTimeout(function() {
            loadingScreen.style.display = 'none';
            body.classList.remove('disable-scroll');
      }, 500); // 或者您認為合適的時間
    }, 1500);
});

// window.addEventListener('scroll', function() {
//     var scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
//     var windowHeight = window.innerHeight;
//     var background = document.getElementById('home_bg');
//     var imageSize = 500; // 初始圖片大小

//     // 當圖片高度超過100vh時，計算新的圖片大小
//     if (background.offsetHeight > windowHeight) {
//         imageSize = 100 - (scrollPosition * 0.1); // 根據捲動位置計算新的圖片大小
//     }

//     // 設定新的圖片大小
//     background.style.backgroundSize = imageSize + 'px';
// });