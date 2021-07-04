const BASE_URL = "http://localhost:3000"
const VINYLS_URL = `${BASE_URL}/vinyls`

window.onload = initDivMouseOver;
function initDivMouseOver()   {
   var div = document.getElementById("drop");
   div.mouseIsOver = false;
   div.onmouseover = function()   {
      this.mouseIsOver = true;
      //console.log("over")
   };
   div.onmouseout = function()   {
      this.mouseIsOver = false;
   }
}

var audio = document.createElement('audio');

function Vinyl(vinyl) {
  this.title = vinyl.title;
  this.artist = vinyl.artist; 
  this.cover = encodeURI('./assets/covers/'+vinyl.cover);
  this.song = encodeURI('./assets/songs/'+vinyl.song);
}

var audio_rain = document.createElement('audio');
var audio_city = document.createElement('audio');
var audio_fire = document.createElement('audio');

audio_rain.src = encodeURI('./assets/ambient/rain.wav');
audio_city.src = encodeURI('./assets/ambient/city.wav');
audio_fire.src = encodeURI('./assets/ambient/fire.wav');

audio_rain.setAttribute("allow", "autoplay");
audio_rain.setAttribute("allow", "autoplay");
audio_rain.setAttribute("allow", "autoplay");

var rainIsPlaying = false;
var cityIsPlaying = false;
var fireIsPlaying = false;


// Selecting an image to be replaced with the uploaded one.
const preview = document.getElementById('preview');
// "onUploadComplete" lets you get file info once it has been uploaded.
// "cdnUrl" holds a URL of the uploaded file: to replace a preview with.


var paused = false;
document.addEventListener("DOMContentLoaded", () => {
    fetch(`${VINYLS_URL}`)
    .then(resp => resp.json())
    .then(json => displayVinyls(json));
    let image = document.getElementById("vinyl");
    var rotation = 0;
    
  function rotateArt() {
    rotation = (rotation + 0.3)%360;
    //console.log(rotation)
    image.style.transform = "rotate("+ rotation +"deg)";
    // /console.log(rotation);
  }



  var rotation = setInterval(function() {
    if(!paused) {
      rotateArt();
      
    }
  }, 0.1);

  document.getElementById("play-pause").addEventListener("click", function (e) {
    if(paused) {
      audio.play();
      paused = false;
      this.src = encodeURI('./assets/icons/pause.png');
    }
    else {
      audio.pause();
      paused = true;
      this.src = encodeURI('./assets/icons/play.png');
    }
  })

  document.getElementById("stop").addEventListener("click", function (e) {
    console.log('clicked')
    audio.pause();
    audio.src = "";
      
      const preview = document.getElementById('preview');
      //console.log(encodeURI('./assets/covers/'+vinyl.cover))
      preview.src =  encodeURI('./assets/covers/sample.jpg');
  })
    
  var ambientBar = document.getElementById("ambience")
  for (var i = 0; i < ambientBar.children.length; i++) {
    (function () {
      var node = ambientBar.children[i];
      node.addEventListener("click", function (e) {
        console.log(node)
        switch(node.id) {
          case "rain":
            console.log("rain")
            if(audio_rain.paused) {
              audio_rain.play()
              node.src=encodeURI('./assets/icons/rain.png');
            }
            else {
              audio_rain.pause();
              node.src=encodeURI('./assets/icons/cloud.png');
            }
            audio_rain.loop = true;
            audio_rain.muted = false;
            break;
          case "city":
            if(audio_city.paused) {
              audio_city.play()
              node.src=encodeURI('./assets/icons/city-on.png');
            }
            else {
              audio_city.pause();
              node.src=encodeURI('./assets/icons/city-off.png');
            }
            audio_city.loop = true;
            audio_city.volume = 1;
            audio_city.muted = false;
            break;
          case "fire":
            if(audio_fire.paused) {
              audio_fire.play()
              node.src=encodeURI('./assets/icons/fire-on.png');
            }
            else {
              audio_fire.pause();
              node.src=encodeURI('./assets/icons/fire-off.png');
            }
            audio_fire.loop = true;
            audio_fire.muted = false;
            break;
        }
      })
    }());
    
} 

  function displayVinyls(vinyls) {
        for(vinyl of vinyls) {
          newVinyl = new Vinyl(vinyl)
          createVinylCard(newVinyl)
        }

    }
    
    function createVinylCard(vinyl) {
      const vinyls = document.querySelector('#vinyls');
      let div = document.createElement("div");
      div.className = "card"
      div.setAttribute('data-id', vinyl.id);

      let info = document.createElement("div");
      info.className = "card-info"

      let title = document.createElement("p");
      title.innerText = "     Title: " + vinyl.title;
      info.appendChild(title);

      let artist = document.createElement("p");
      artist.innerText = "     Artist: " + vinyl.artist;
      info.appendChild(artist);

      let button = document.createElement('button');
        button.setAttribute('data-vinyl-id', vinyl.id);
        button.innerHTML = "Play Song";
        button.addEventListener("click", function(e){
            e.preventDefault();
            playVinyl(vinyl);
            //console.log(trainer)
        });
        //info.appendChild(button);
    
        let ul = document.createElement("ul");
        info.appendChild(ul);
    
        div.appendChild(info);
        
        let cd = document.createElement("div");
        cd.className = "card-vinyl-cd"
        cd.addEventListener('dragstart',event => {
          event.preventDefault()
          dragVinyl(event, vinyl)
        });

        var img = document.createElement('img');
        img.className = "vinyl"
        console.log(vinyl)
        img.src =  vinyl.cover;

        cd.appendChild(img)

        div.appendChild(cd);

        vinyls.appendChild(div);
    }

    function playVinyl(vinyl) {
      if(paused) {
        paused = false;
        document.getElementById("play-pause").src = encodeURI('./assets/icons/pause.png');
      }
      audio.src = vinyl.song;
      audio.play();
      const preview = document.getElementById('preview');
      //console.log(encodeURI('./assets/covers/'+vinyl.cover))
      preview.src = vinyl.cover;
      document.getElementById('player').removeEventListener('mouseenter', playVinyl());

    }

  const dragVinyl = function (event, vinyl) {

    let vinylDrag = document.createElement("div")

    const elementDrag = function(e) {
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
  
      vinylDrag.style.top = vinylDrag.offsetTop - pos2  + "px";
      vinylDrag.style.left = vinylDrag.offsetLeft - pos1  + "px";
    }

    function stopElementDrag() {
      document.onpointerup = null;
      document.onpointermove = null;
      deleteself(vinylDrag)
      if (document.getElementById('drop').mouseIsOver ) {
        //console.log("yeahhhhh")
        playVinyl(vinyl)
      }
    }

    vinylDrag.id = "vinylDrag";
    vinylDrag.className = "vinyl-drag"
    vinylDrag.style.left = event.pageX ;
    vinylDrag.style.top = event.pageY ;
    

    
    let img = document.createElement('img');
    img.className = "vinyl"
    img.src =  vinyl.cover;

    vinylDrag.appendChild(img)

    vinylDrag.style.top = vinylDrag.offsetTop - (150/2)  + "px";
    vinylDrag.style.left = vinylDrag.offsetLeft - (150/2)   + "px";
    console.log(img.width)

    document.getElementById("drag").appendChild(vinylDrag);
    let pos1 = 0,
		pos2 = 0,
		pos3 = 0,
		pos4 = 0;
    
    //console.log(event.clientX)

    document.onpointermove = elementDrag;
    document.onpointerup = stopElementDrag;

  };
  
  function deleteself(elm) {
    elm.parentNode.removeChild(elm);
  }
});



