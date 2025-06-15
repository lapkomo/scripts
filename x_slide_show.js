// ==UserScript==
// @name      X スライドショー
// @include   https://x.com/*
// @require   https://cdn.jsdelivr.net/npm/jquery@3/dist/jquery.min.js
// @require   https://cdn.jsdelivr.net/npm/jquery-ui@1/dist/jquery-ui.min.js
// @grant     GM.getResourceText
// @grant     GM.addStyle
// ==/UserScript==
const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));

(function () {
    'use strict';

    let imageUrls = new Set();

    // Create and inject a button to start the slideshow
    const button = document.createElement('button');
    button.innerText = '▶ スライドショー開始';
    button.style.position = 'fixed';
    button.style.bottom = '20px';
    button.style.right = '20px';
    button.style.zIndex = 9999;
    button.style.padding = '10px 20px';
    button.style.fontSize = '16px';
    button.style.background = '#000';
    button.style.color = '#fff';
    button.style.border = 'none';
    button.style.borderRadius = '5px';
    button.style.cursor = 'pointer';
    button.style.boxShadow = 'rgba(255, 255, 255, 0.2) 0px 0px 15px, rgba(255, 255, 255, 0.15) 0px 0px 3px 1px';
    document.body.appendChild(button);

    // Scan the DOM for images
    function collectImages() {
        document.querySelectorAll('img[src*="pbs.twimg.com/media/"]').forEach(img => {
            const url = img.src.replace(/&name=[^&]+/, '&name=large'); // Use high-quality if possible
            imageUrls.add(url);
        });
    }

    // Observe for dynamically loaded content
    const observer = new MutationObserver(() => collectImages());
    observer.observe(document.body, { childList: true, subtree: true });

    // Slideshow logic
    function startSlideshow(images) {
        if (images.length === 0) {
            alert('画像が見つかりません。');
            return;
        }

        let index = 0;

        const overlay = document.createElement('div');
        overlay.id = 'x-slideshow-overlay';
        overlay.innerHTML = `
            <div style="position:fixed;top:0;left:0;width:100vw;height:100vh;background:black;z-index:10000;display:flex;align-items:center;justify-content:center;">
                <img id="x-slideshow-image" src="${images[index]}" style="max-width:100vw; max-height:100vh; object-contain; transition: opacity 0.3s;">
                <div id="x-slideshow-counter" style="position:fixed;top:20px;right:40px;color:white;font-size:22px;background:rgba(0,0,0,0.5);padding:6px 16px;border-radius:16px;z-index:10001;pointer-events:none;">
                    ${index + 1} / ${images.length}
                </div>
            </div>
        `;
        document.body.appendChild(overlay);

        const img = overlay.querySelector('img');
        const counter = overlay.querySelector('#x-slideshow-counter');

        function updateCounter() {
            counter.textContent = `${index + 1} / ${images.length}`;
        }

        function showImage(i) {
            img.style.opacity = 0;
            setTimeout(() => {
                img.src = images[i];
                img.onload = () => (img.style.opacity = 1);
                updateCounter();
            }, 150);
        }

        function handleKey(e) {
            if (e.key === 'ArrowRight') {
                if (index === images.length - 1) {
                    // 最後の画像ならEscapeと同じ挙動
                    document.removeEventListener('keydown', handleKey);
                    overlay.remove();
                } else {
                    index = index + 1;
                    showImage(index);
                }
            } else if (e.key === 'ArrowLeft') {
                index = (index - 1 + images.length) % images.length;
                showImage(index);
            } else if (e.key === 'Escape') {
                document.removeEventListener('keydown', handleKey);
                overlay.remove();
            }
        }

        document.addEventListener('keydown', handleKey);
    }

    button.addEventListener('click', () => {
        collectImages(); // Ensure we have the latest
        startSlideshow([...imageUrls]);
    });

})();
