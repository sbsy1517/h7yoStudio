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
    }, 1000);
});


// var carousel1 = new bootstrap.Carousel(document.getElementById('bgCarousel1'));
// var carousel2 = new bootstrap.Carousel(document.getElementById('bgCarousel2'));

// var isHovered = false;

// // 滑鼠進入 Carousel 區域
// function handleMouseEnter() {
//     isHovered = true;
//     if (!carousel1._isPaused) {
//         carousel1.pause();
//     }
//     if (!carousel2._isPaused) {
//         carousel2.pause();
//     }
// }

// // 滑鼠離開 Carousel 區域
// function handleMouseLeave() {
//     isHovered = false;
//     if (!carousel1._isPaused) {
//         carousel1.cycle();
//     }
//     if (!carousel2._isPaused) {
//         carousel2.cycle();
//     }
// }

// // 綁定事件處理程序
// document.getElementById('bgCarousel1').addEventListener('mouseenter', handleMouseEnter);
// document.getElementById('bgCarousel1').addEventListener('mouseleave', handleMouseLeave);
// document.getElementById('bgCarousel2').addEventListener('mouseenter', handleMouseEnter);
// document.getElementById('bgCarousel2').addEventListener('mouseleave', handleMouseLeave);
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