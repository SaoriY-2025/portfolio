const nav = document.querySelector('header nav');

// bodyに class="top" が付いている場合のみアニメーションを実行
if (document.body.classList.contains('top')) {
  let targetOffset = 0;
  let currentOffset = 0;
  let lastScrollY = window.scrollY;
  let isScrolling = false;
  let hasScrolledDown = false;

  function animate() {
    const scrollY = window.scrollY;
    const delta = scrollY - lastScrollY;

    if (isScrolling && delta > 0) {
      targetOffset = Math.min(delta * 4, 300);
      hasScrolledDown = true;
    } else if (!hasScrolledDown) {
      targetOffset += (0 - targetOffset) * 0.05;
    }

    currentOffset += (targetOffset - currentOffset) * 0.05;
    nav.style.transform = `translateY(${currentOffset}px)`;

    lastScrollY = scrollY;
    requestAnimationFrame(animate);
  }

  let scrollTimeout;
  window.addEventListener('scroll', () => {
    isScrolling = true;
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      isScrolling = false;
    }, 100);
  });

  animate();
// } else {
//   // 下層ページでは位置を固定し、transformを初期化
//   nav.style.transform = 'none';
//   nav.style.position = 'fixed';
//   nav.style.top = '0';
}


$(document).ready(function () {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const $el = $(entry.target);

      if (entry.isIntersecting) {
        // 画像トリガー（疑似要素のふわっと）対応
        if ($el.hasClass('image-trigger')) {
          const $section = $el.closest('section');
          $section.addClass('active');
          // 繰り返し再生したいなら observer をそのままに
        }
        // 通常のスライドイン系
        else {
          $el.addClass('active');

          // 960px以上かつ .repeatable の場合のみ active を消す
          if ($el.hasClass('repeatable') && window.innerWidth > 960) {
            setTimeout(() => {
              $el.removeClass('active');
            }, 10000); // 10秒後にクラス削除（CSSのdurationに合わせて）
          } else {
            observer.unobserve(entry.target); // 一度だけの表示なら監視解除
          }
        }
      }
    });
  }, {
    threshold: 0.2
  });

  // 観察対象をすべてまとめる
  const targets = $('.slide-in, .slide-in-left, .slide-in-right, .slide-in-top, .slide-in-bottom, .image-trigger');
  targets.each(function () {
    observer.observe(this);
  });
});



const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});
