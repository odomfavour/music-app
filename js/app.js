// function

function _(query) {
    return document.querySelector(query);
}

function _all(query) {
    return document.querySelectorAll(query);
}

let songList = [
    {
        thumbnail: "pic1.jpg",
        audio: "Fireboy-DML-Scatter-(JustNaija.com).mp3",
        songname: "Scatter",
        artistname: "Dml"
    },
    {
        thumbnail: "pic2.jpg",
        audio: "Fireboy-DML-Vibration-(JustNaija.com).mp3",
        songname: "Vibration",
        artistname: "Dml"
    }
];
// console.log('me')

let currentSongIndex = 0;

let player = _(".player .player-list");
let toggleSongList = _(".player .toggle-list");
console.log(player)
console.log(toggleSongList)

let main = {
    audio:_(".player .main audio"),
    thumbnail: _(".player .main img"),
    seekbar: _(".player .main input"),
    songname: _(".player .main .details h2"),
    artistname: _(".player .main .details p"),
    prevControl: _(".player .main .controls .prev-control"),
    playPauseControl: _(".player .main .controls .play-pause-control"),
    nextControl: _(".player .main .controls .next-control")
}

toggleSongList.addEventListener("click", function () {
    player.classList.toggle("activeSongList");
});

_(".player .player-list .list").innerHTML = (songList.map((song, songIndex) => {
    return `

        <div class="item" songIndex="${songIndex}">
        <div class="thumbnail">
            <img src="img/${song.thumbnail}" alt="">
        </div>
        <div class="details">
            <h2>${song.songname}</h2>
            <p>${song.artistname}</p>
        </div>
    </div>
    
    `
}).join(''));

let songListItems = _all(".player .player-list .list .item");
songListItems.forEach((song) => {
    song.addEventListener('click', () => {
        currentSongIndex = song.getAttribute('songIndex')
        loadSong(currentSongIndex)
        player.classList.remove('activeSongList');
    })
})

function loadSong(songIndex) {
    let song = songList[songIndex];
    main.thumbnail.setAttribute("src", "img/"+song.thumbnail);
    document.body.style.background = `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.8)), url("../img/${song.thumbnail}") center no-repeat`;
    document.body.style.backgroundSize = 'cover';
    main.songname.innerText = song.songname
    main.artistname.innerText = song.artistname;
    main.audio.setAttribute("src", "audio/" + song.audio);
    main.seekbar.setAttribute("value", 0);
    main.seekbar.setAttribute("min", 0);
    main.seekbar.setAttribute("max", 0);
    main.audio.addEventListener('canplay', () => {
        main.audio.play();
        if (main.audio.paused) {
            main.playPauseControl.classList.remove('paused')
        }
        main.seekbar.setAttribute('max', parseInt(main.audio.duration));
        main.audio.onended = function () {
            main.nextControl.click();
        }
    })
}


setInterval(() => {
    main.seekbar.value = parseInt(main.audio.currentTime);
}, 1000)

main.prevControl.addEventListener("click", () => {
    currentSongIndex--;
    if (currentSongIndex < 0) {
        currentSongIndex = songList.length + currentSongIndex 
    }
    loadSong(currentSongIndex);
})

main.nextControl.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex + 1) % songList.length;
    loadSong(currentSongIndex);
})

main.playPauseControl.addEventListener("click", () => {
  if (main.audio.paused) {
    main.playPauseControl.classList.remove("paused");
    main.audio.play();
  } else {
    main.playPauseControl.classList.add("paused");
    main.audio.pause();
  }
});

main.seekbar.addEventListener("change", () => {
    main.audio.currentTime = main.seekbar.value;
})