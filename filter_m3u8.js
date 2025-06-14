// ==UserScript==
// @name        filter m3u8
// @namespace   Violentmonkey Scripts
// @match       https://myfans.jp/posts/*
// @match       https://fod.fujitv.co.jp/title/*
// @match       https://tver.jp/episodes/*
// @match       https://candfans.jp/posts/*
// @require   https://cdn.jsdelivr.net/npm/jquery@3/dist/jquery.min.js
// @require   https://cdn.jsdelivr.net/npm/jquery-ui@1/dist/jquery-ui.min.js
// @resource  jquery_ui_css https://cdn.jsdelivr.net/npm/jquery-ui@1/themes/base/jquery-ui.min.css
// @grant     GM.getResourceText
// @grant     GM.addStyle
// ==/UserScript==

// URLの最後のパスを取得する
const path = window.location.pathname;

// パスを "/" で分割して最後の部分を取得する
const lastPathSegment = path.substring(path.lastIndexOf('/') + 1);

(function(open) {
  $(".hlsfill").remove()
  $("body").prepend('<div class="hlsfill"></div>')
  const command = `ffmpeg -movflags faststart -c copy -bsf:a aac_adtstoasc ${lastPathSegment}.mp4 -analyzeduration 50M -probesize 50M -i `
    XMLHttpRequest.prototype.open = function() {
        // arguments[1] がリクエストのURLにあたる (通常、arguments[0] はHTTPメソッド)
        const url = '"' + arguments[1] + '"';
        // URL に '.m3u8' が含まれている場合のみログに表示
        if (url && url.includes('.m3u8')) {
          const tag = '<code>' + command + url + '</code><br />'
            $(".hlsfill").prepend(tag)
        }
        open.apply(this, arguments);
    };
})(XMLHttpRequest.prototype.open);
