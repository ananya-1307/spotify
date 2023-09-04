console.log("welcome to spotify");
//initialize the variables
let songIndex = 0;
let audioElement = new Audio('song/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let progress = 0;
let masterSong=document.getElementById('masterSong');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songItemPlay=Array.from(document.getElementsByClassName('songItemPlay'));
let songs = [
    { songName: "Dhundhala", filePath: "song/1.mp3", coverPath: "covers/abc.jpeg" },
    { songName: "Heeriye", filePath: "song/2.mp3", coverPath: "covers/2.jpg" },
    { songName: "Let me love you", filePath: "song/3.mp3", coverPath: "covers/3.jpg" },
    { songName: "Phir aur kya chahiye", filePath: "song/4.mp3", coverPath: "covers/4.jpg" },
    { songName: "Maan meri jaan", filePath: "song/5.mp3", coverPath: "covers/5.jpg" },
    { songName: "Tere havale", filePath: "song/6.mp3", coverPath: "covers/6.jpg" },
]

songItems.forEach((element, i) => {
    //console.log(element, i);
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText= songs[i].songName;
})
//listen to events
//handle play pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else {
        audioElement.pause();
        makeAllPlays();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})

audioElement.addEventListener('timeupdate', () => {
    //console.log("timeupdate");
    //update seekbar
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    //progress=parseInt(audioElement.currentTime);
    //console.log(progress);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
})

const makeAllPlays = ()=>{
     Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
     })

}



Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e) =>{
        makeAllPlays();
        songIndex= parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src=`song/${songIndex+1}.mp3`;
        masterSong.innerText= songs[songIndex].songName;
        audioElement.currentTime=0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');

    })   
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>5){
        songIndex=0;
    }
    else{
        songIndex+=1;
    }
    audioElement.src=`song/${songIndex+1}.mp3`;
    masterSong.innerText= songs[songIndex].songName;
        audioElement.currentTime=0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    
})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex=0;
    }
    else{
        songIndex-=1;
    }
    audioElement.src=`song/${songIndex+1}.mp3`;
    masterSong.innerText= songs[songIndex].songName;
        audioElement.currentTime=0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    
})

