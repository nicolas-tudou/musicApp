var $ = window.Zepto;
//在window下创建player对象表示自己的播放器APP
// window.player = {};
//喜欢的歌曲列表
// var loveSongsList = [];
//当前播放的音乐在列表里的索引index
player.curIndex = 0;
//上次的搜索词，存储在cookie里，用于初次打开网页时加载音乐
// var lastKey = '';
var myAudio = document.getElementsByTagName('audio')[0];
player.getDate();
var timer = setInterval(player.renderAudioTime, 100);
