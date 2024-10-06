// ==UserScript==
// @name        filter m3u8
// @namespace   Violentmonkey Scripts
// @match       https://myfans.jp/posts/*
// @match       https://fod.fujitv.co.jp/title/*
// @match       https://tver.jp/episodes/*
// @grant       none
// ==/UserScript==

(function(open) {
    XMLHttpRequest.prototype.open = function() {
        // console.log(arguments);
        // arguments[1] がリクエストのURLにあたる (通常、arguments[0] はHTTPメソッド)
        const url = arguments[1];
        // URL に '.m3u8' が含まれている場合のみログに表示
        if (url && url.includes('.m3u8')) {
            console.log(url);
        }
        open.apply(this, arguments);
    };
})(XMLHttpRequest.prototype.open);