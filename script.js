let previous=document.getElementById('previous');
let playNow=document.getElementById('playNow');
let next=document.getElementById('next');
let now=document.getElementById('now');
let total=document.getElementById('total');
let title=document.getElementById('title');
let artist=document.getElementById('artist');
let volumeButton=document.getElementById('vol_btn');
let volumeNum=document.getElementById('volume_num');
let durationRange=document.getElementById('durationRange');
let autoP=document.getElementById('autoP');
let autoPM=document.getElementById('autoPM');
let auto=document.getElementById('auto');
let trackImg=document.getElementById('img_track');
let vol=document.getElementById('volume');

let timer;
let autoplay = 0;
var isMute = 0;
let iNo = 0;
let isPlaying = false;

//audio element
let track = document.createElement('audio');
//songList object to provide all the songs we have.(for now)
let songList = [
  {
    name: "_song1 Name_",
    path: "music/song1.mp3",
    img: "img/img1.jpg",
    artistName: "_Artist Name 1_"
  },
  {
    name: "_song2 Name_",
    path: "music/song2.mp3",
    img: "img/img2.jpg",
    artistName: "_Artist Name 2_"
  },
  {
    name: "_song3 Name_",
    path: "music/song3.mp3",
    img: "img/img3.jpg",
    artistName: "_Artist Name 3_"
  },
  {
    name: "_song4 Name_",
    path: "music/song4.mp3",
    img: "img/img4.jpg",
    artistName: "_Artist Name 4_"
  },
  {
    name: "_song5 Name_",
    path: "music/song5.mp3",
    img: "img/img5.jpg",
    artistName: "_Artist Name 5_"
  }
];

function autoPlayToggle(){
  if(autoplay===1)
  {
    let auto=document.getElementById('auto');
    autoplay=0;
    auto.style.background = "rgba(51 ,71, 71, 0.2)";
  }
  else{
    let auto=document.getElementById('auto');
    autoplay=1;
    auto.style.background = "coral";
  }
}

if(screen.width<=375)
{
  var addbtn=document.createElement('button');
  autoPM.appendChild(addbtn);
  var btn=autoPM.firstChild;
  btn.setAttribute('id','auto');
  btn.setAttribute('onClick','autoPlayToggle()');
  btn.setAttribute('onresize', 'resize()');
  btn.innerHTML='<i class="fa fa-magic" aria-hidden="true"></i>';
}

if(screen.width>375)
{
  var addbtn=document.createElement('button');
  autoP.appendChild(addbtn);
  var btn=autoP.firstChild;
  btn.setAttribute('id','auto');
  btn.setAttribute('onClick','autoPlayToggle()');
  btn.innerHTML='Auto Play<i class="fa fa-magic" aria-hidden="true"></i>';

}
//function to load the track
function loadTrack(iNo){
  clearInterval(timer);
  zeroDurationLine();
  track.src = songList[iNo].path;
  title.innerHTML = songList[iNo].name;
  trackImg.src = songList[iNo].img;
  artist.innerHTML = songList[iNo].artistName;
  track.load();
  total.innerHTML=songList.length;
  now.innerHTML=iNo+1;

  timer=setInterval(durationLine,1000);
}

loadTrack(iNo);

//is the song is playing 

function zeroDurationLine()
{
  durationRange.value=0;
}

function muteToggle(){
  if(isMute===0){
    track.volume = 0;
    vol.value =0;
    volumeNum.innerHTML = 0;
    isMute=1;
  }
  else{
    track.volume=0.5;
    vol.value=50;
    volumeNum.innerHTML=50;
    isMute=0;
  }
}

function playit()
{
  if(isPlaying === false)
  {
    playTrack();
  }
  else
  {
    pauseTrack();
  }
}

// function to pslay the song
function playTrack()
{
  track.play();
  isPlaying = true;
  playNow.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>'
}

//function to pause the song
function pauseTrack()
{
  track.pause();
  isPlaying= false;
  playNow.innerHTML= '<i class="fa fa-play" aria-hidden="true"></i>'
}

//function to move to next song
function nextTrack()
{
  if(iNo < songList.length-1)
  {
    iNo = iNo + 1;
    loadTrack(iNo);
    playTrack();
  }
  else
  {
    iNo=0;
    loadTrack(iNo);
    playTrack();
  }
}

//function to move to previous song
function preTrack()
{
  if(iNo > 0)
  {
    iNo=iNo-1;
    loadTrack(iNo);
    playTrack();
  }
  else
  {
    iNo= songList.length-1;
    loadTrack(iNo);
    playTrack();
  }
}

//function to change volume 
function vol_ch(){
  volumeNum.innerHTML=vol.value;
  track.volume=vol.value /  100;
}

// function to jump to certain moment duration and give duration done.
function jumpTo()
{
  durationRange_position = track.duration * (durationRange.value / 100);
  track.currentTime = durationRange_position;
}

function durationLine(){
  let position = 0;
  if(!isNaN(track.duration)){
    position = track.currentTime * (100 / track.duration);
    durationRange.value = position;
  }


  if(track.ended)
  {
    playNow.innerHTML = '<i class="fa fa-play" aria hidder="true" ></i>';
    if(autoplay===1)
    {
      if(iNo<songList.length-1)
        iNo=iNo+1;
      else
        iNo=0;
      loadTrack(iNo);
      playTrack();
    }
  }
}

window.onresize = resize;

function resize()
{
 if(window.innerWidth<=375)
 {
  if(!autoPM.firstChild){
  var addbtn=document.createElement('button');
  autoPM.appendChild(addbtn);
  var btn=autoPM.firstChild;
  btn.setAttribute('id','auto');
  btn.setAttribute('onClick','autoPlayToggle()');
  btn.setAttribute('onresize', 'resize()');
  btn.innerHTML='<i class="fa fa-magic" aria-hidden="true"></i>';
  autoP.removeChild(autoP.firstChild);
  }
 }
 else
 {
  if(!autoP.firstChild){
    var addbtn=document.createElement('button');
    autoP.appendChild(addbtn);
    var btn=autoP.firstChild;
    btn.setAttribute('id','auto');
    btn.setAttribute('onClick','autoPlayToggle()');
    btn.innerHTML='Auto Play<i class="fa fa-magic" aria-hidden="true"></i>';
    autoPM.removeChild(autoPM.firstChild);
    }
  }
}






