let previous = document.querySelector('#pre');
let play = document.querySelector('#play');
let next = document.querySelector('#next');
let title = document.querySelector('#title');
let recent_volume = document.querySelector('#volume');
let volume_show = document.querySelector('#volume_show');
let slider = document.querySelector('#duration_slider');
let show_duration = document.querySelector('#show_duration');
let track_image = document.querySelector('#track_image');
let auto_play = document.querySelector('#auto');
let present = document.querySelector('#present');
let total = document.querySelector('#total');
let art = document.querySelector('#artist');

let timer;
let autoplay = 0;

let index_no = 0;
let playing_song = false;

//CREATE AN AUDIO ELEMENT
let track = document.createElement('audio');

//ALL SONGS LIST
let All_songs = [
    {
        name:'Awakening',
        path:'src/songs/awakening.mp3',
        img:'src/Image/img1.png',
        singer:'Amanda Lindsey Cook'
    },
    {
        name:'Besttime',
        path:'src/songs/besttime.mp3',
        img:'src/Image/img2.png',
        singer:'Alan Jackson'
    },
    {
        name:'Cradle',
        path:'src/songs/cradle.mp3',
        img:'src/Image/img3.png',
        singer:'Alan Jackson'
    },
    {
        name:'Epic',
        path:'src/songs/epic.mp3',
        img:'src/Image/img4.png',
        singer:'Mike Patton'
    }
];

// ALL FUNCTION

// FUNCTION LOAD THE TRACK
function load_track (index_no) {
    clearInterval(timer);
    reset_slider();
    track.src = All_songs[index_no].path;
    title.innerHTML = All_songs[index_no].name;
    track_image.src = All_songs[index_no].img;
    artist.innerHTML = All_songs[index_no].singer;
    track.load();

// SHOWING SONG NUMBER IN TOP RIGHT 
    total.innerHTML = All_songs.length;
    present.innerHTML = index_no + 1;

// SONG SLIDER 
    timer = setInterval(range_slider , 1000);
} 
load_track(index_no);

// MUTE SOUND
function mute_sound() {
    track.volume = 0;
    volume.value = 0;
    volume_show.innerHTML = 0;
}

// RESET SONG SLIDER
function reset_slider() {
    slider.value = 0; 
}

// CHECKING THE SONG IS PLAYING OR/NOT
function justplay() {
    if(playing_song == false)
        playsong();
    else
        pausesong();    
}

// PLAY SONG
function playsong() {
    track.play();
    playing_song = true;
    play.innerHTML = '<i class = "fa fa-pause"></i>';
}

// PAUSE SONG
function pausesong() {
    track.pause();
    playing_song = false;
    play.innerHTML = '<i class = "fa fa-play"></i>';
}

// NEXT SONG
function next_song(){
    if(index_no < All_songs.length - 1)
    {
        index_no += 1;
        load_track(index_no);
        playsong(); 
    }
    else
    {
        index_no = 0;
        load_track(index_no);
        playsong();
    }
}

// PREVIOUS SONG
function previous_song(){
    if(index_no > 0)
    {
        index_no -= 1;
        load_track(index_no);
        playsong(); 
    }
    else
    {
        index_no = All_songs.length;
        load_track(index_no);
        playsong();
    }
}

// CHANGE VOLUME
function volume_change() {
    volume_show.innerHTML = recent_volume.value;
    track.volume = recent_volume.value / 100;
}

// SLIDER POSITION CHANGE
function change_duration() {
    slider_position = track.duration * (slider.value / 100);
    track.currentTime = slider_position;
}

// AUTOPLAY FUNCTION
function autoplay_switch() {
    if(autoplay == 1)
    {
        autoplay = 0;
        auto_play.style.background = "rgba(255,255,255,0.2)";
    } else {
        autoplay = 1;
        auto_play.style.background = 'orange'; 
    }
}

// MUSIC SLIDER
function range_slider() {
    let position = 0;

    // UPDATE SLIDER POSITION
    if(!isNaN(track.duration))
    {
        position = track.currentTime * (100 / track.duration);
        slider.value = position;
    }

    // FUNCTION WILL RUN WHEN THE SONG IS OVER
    if(track.ended)
    {
        play.innerHTML = '<i class = "fa fa-play"></i>'
        if(autoplay == 1)
        {
            index_no += 1;
            load_track(index_no);
            playsong();
        }
    }
}