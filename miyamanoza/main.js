
document.addEventListener('DOMContentLoaded', () => {

    // スクロールに合わせたスライドインアニメーション（下・左右など）IntersectionObserver使用
    $(document).ready(function () {
        const targets = $('.slide-in, .slide-in-left, .slide-in-right, .slide-in-top, .slide-in-bottom');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const $el = $(entry.target);

                if (entry.isIntersecting) {
                    $el.addClass('active');

                    if ($el.hasClass('repeatable')) {
                        // 960px以下ならactiveを外す処理はスキップする
                        if (window.innerWidth > 960) {
                            setTimeout(() => {
                                $el.removeClass('active');
                                console.log(window.innerWidth);
                            }, 10000);
                        }
                    } else {
                        // repeatableじゃなければ一度だけなのでobserver解除
                        observer.unobserve(entry.target);
                    }
                }
            });
        }, {
            threshold: 0.1
        });

        targets.each(function () {
            observer.observe(this);
        });
    });

    // ② フェードイン（じわっと表示）
    const fadeElements = document.querySelectorAll('.fade-up');
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active'); // .fade-up.active で透明度や位置をアニメーション
            }
        });
    }, {
        threshold: 0.1
    });
    fadeElements.forEach(el => fadeObserver.observe(el));


    // ④ スライドショー（メイン画像切り替え）.slide に .active を付けて切り替え
    $(document).ready(function () {
        const images = [
            'url(./img/温泉２.jpg)',
            'url(./img/温泉３.jpg)',
            'url(./img/温泉６.jpg)'
        ];

        const $container = $('#main-visual');

        // div 要素2つを作成してクラス付与
        const $div1 = $('<div>').addClass('bg-image active').css('background-image', images[0]);
        const $div2 = $('<div>').addClass('bg-image');

        $container.append($div1, $div2);

        let currentIndex = 0;
        let currentDiv = $div1;
        let nextDiv = $div2;

        let intervalId = null;

        function switchBackground() {
            nextDiv.css('background-image', images[(currentIndex + 1) % images.length]);
            nextDiv.addClass('active');
            currentDiv.removeClass('active');

            // divを入れ替え
            [currentDiv, nextDiv] = [nextDiv, currentDiv];
            currentIndex = (currentIndex + 1) % images.length;
        }

        // スライドショー開始関数
        function startSlideshow() {
            if (intervalId === null) {  // すでに動いている場合は何もしない
                intervalId = setInterval(switchBackground, 4000);
            }
        }

        // スライドショー停止関数
        function stopSlideshow() {
            if (intervalId !== null) {
                clearInterval(intervalId);
                intervalId = null;

                // スライドショー停止時は最初の画像だけ表示
                currentDiv.addClass('active');
                nextDiv.removeClass('active');
                currentIndex = 0;
                currentDiv.css('background-image', images[0]);
            }
        }

        // 幅に応じてスライドショー開始・停止を切り替え
        function checkWidth() {
            if (window.innerWidth > 960) {
                startSlideshow();
            } else {
                stopSlideshow();
            }
        }

        // 初回実行
        checkWidth();

        // リサイズ時に判定し直す（負荷軽減のため遅延をつけることも可能）
        $(window).on('resize', checkWidth);
    });

    $(function () {
        $('#nav-toggle').click(function () {
            $('header').toggleClass('open');
        });
    });

});