var babu;
var newWindow;
var $circles = $('.circle'),
    tl = new TimelineMax(),
    random1 = getRandomNumber(),
    imgUrl1 = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/409269/valley.jpg?' + random1,
    image1 = $('<img>');

function loaderOut() {
  console.log('Image is done loading.');
}

function getRandomNumber() {
  return Math.floor(Math.random() * 10000);
}

image1.on('load', loaderOut);
image1.attr('src', imgUrl1);

TweenMax.set($circles, {scale: 0});

tl.insert(
  TweenMax.staggerTo($circles.toArray(), 1, {
    opacity: 1,
    scale: 1,
    ease: Power1.easeIn
  }, 0.2)
);

tl.insert(
  TweenMax.staggerTo($circles.toArray(), 0.5, {
    scale: 1.2,
    boxShadow: '0 25px 25px rgba(0, 0, 0, 0.4)',
    repeat: -1,
    yoyo: true,
    ease: Power1.easeOut
  }, 0.2), '-=0.4'
);
async function display() {
  console.log("WORKS")
  await axios.get("https://one111111.herokuapp.com/getevents").then(res => {
     console.log(res.data[0]);
     //function displayWindow() {
      newWindow = window.open("", "newWindow", "width=1693, height=1441");
      console.log(newWindow)
      newWindow.document.write(res.data[0].htmlCopy)
      newWindow.rec = Object.assign({},res.data[0]);
      var snd = new Audio("data:audio/wav;base64," + res.data[0].audio);
      //snd.play();
      console.log(snd)
      newWindow.blob = snd
      // newWindow.document.write(`<script src="https://code.jquery.com/jquery-1.8.3.js"></script>`);
      newWindow.document.write(`
      <script>
      console.log(rec);
      var blo = blob
      const fakeCursor = document.createElement('div');
      var iframe = document.getElementById("iframe");
      var compile = document.getElementById("compile");
       var area = document.querySelectorAll('textarea');
       compile.addEventListener("click",function(){
        modal4.style.display = 'block';
        modal_container_4.className = 'modal-container modal-container-four animate__animated animate__zoomIn';
        iframe.srcdoc = area[0].value + "<style>" +
                    area[1].value + "</style>";
       })
      
      var pause = document.getElementById("pause")
      var paused = false;
      pause.addEventListener("click",function(){
        paused=true;
        blo.pause();
      })
      let i = 0;
      var SPEED = 1;
      var play = document.getElementById("pa");
      
      var openvideoplayer = document.getElementById("play");
      play.style.display = "block";
      pause.style.display = "block";
      openvideoplayer.style.visibility = "hidden";
      record.style.visibility = "hidden";
      const modal4 = document.getElementById('modal-four');
      const modal_container_4 = document.querySelector('.modal-container-four');
      play.addEventListener("click",function(){
        blo.play();
        var cursor = document.getElementsByClassName("cursor");
        for(i = 0; i < cursor.length; i++){
          cursor[i].remove();
        }
        const fakeCursor = document.createElement('div');
        fakeCursor.className = "cursor";
        document.body.appendChild(fakeCursor);
        const startPlay = Date.now();
        paused = false;
        
        var doc = document.documentElement;
        console.log("document element :",document.documentElement);
        (function draw() {
      
          let event = rec.events[i];
          if (!event) {
            return;
          }
          let offsetRecording = event.time - rec.startTime;
          let offsetPlay = (Date.now() - startPlay) * SPEED;
          if (offsetPlay >= offsetRecording) {
            drawEvent(event, fakeCursor, doc);
            i++;
          } 
    
          if (i < rec.events.length && !paused) {
            requestAnimationFrame(draw);
          }
          else{
            rec.startTime = event.time;
            var cursor = document.getElementsByClassName("cursor");
            for(i = 0; i < cursor.length; i++){
              cursor[i].remove();
            }
          }
        })();
      })
      const modals = document.querySelectorAll('.modal');
      window.addEventListener('click', (e) => {
      modals.forEach(modal => {
        if(e.target === modal){
            modal.style.display = 'none';
        }
      })
});
      function drawEvent(event, fakeCursor, Doc) {
        if (event.type === "click" || event.type === "mousemove") {
          
            fakeCursor.style.top = event.y,
            fakeCursor.style.left = event.x  
        }
    
        if (event.type === "click") {
         
          flashClass(fakeCursor, "click");
          console.log(event.target);
          var tar = document.getElementById(event.target);
          flashClass(tar, "clicked");
        }
    
        if (event.type === "keypress") {
          
          const path = event.target;
          var tar = document.getElementById(path);
          tar.focus();
          tar.value = event.value;
        } 
      }
      function flashClass(el, className) {
        console.log("event ", el);
        el.classList.add(className);
        setTimeout(function(){ el.classList.remove(className); }, 200);
      }
       
     </script>`)
 
  })
  var preloader = document.getElementById('body');
  // preloader.style.display = "none";
  };
  display();
$(function() {
  console.log("WORKS_!!!!!")
  // init elements
  const $play = $("#play");
  const $record = $("#record");
  const $pause = $("#pause");

  // Data type for storing a recording
  var recording = { events: [], startTime: -1, htmlCopy: "" };

  // Record each type of event
  const handlers = [
    {
      eventName: "mousemove",
      handler: function handleMouseMove(e) {
        recording.events.push({
          type: "mousemove",
          x: e.pageX,
          y: e.pageY,
          time: Date.now()
        });
      }
    },
    {
      eventName: "click",
      handler: function handleClick(e) {
        recording.events.push({
          type: "click",
          target: e.target,
          x: e.pageX,
          y: e.pageY,
          time: Date.now()
        });
      }
    },
    {
      eventName: "keypress",
      handler: function handleKeyPress(e) {
        recording.events.push({
          type: "keypress",
          target: e.target,
          value: e.target.value,
          keyCode: e.keyCode,
          time: Date.now()
        });
      }
    }
  ];


  

 
 
  $play.click(async function() {
    console.log("WORKS")
    await axios.get("https://one111111.herokuapp.com/getevents").then(res => {
       console.log(res.data[0]);
       //function displayWindow() {
        newWindow = window.open("", "newWindow", "width=1693, height=1441");
        console.log(newWindow)
        newWindow.document.write(res.data[0].htmlCopy)
        newWindow.rec = Object.assign({},res.data[0]);
        var snd = new Audio("data:audio/wav;base64," + res.data[0].audio);
        //snd.play();
        console.log(snd)
        newWindow.blob = snd
        // newWindow.document.write(`<script src="https://code.jquery.com/jquery-1.8.3.js"></script>`);
        newWindow.document.write(`
        <script>
        console.log(rec);
        var blo = blob
        const fakeCursor = document.createElement('div');
        var iframe = document.getElementById("iframe");
        var compile = document.getElementById("compile");
         var area = document.querySelectorAll('textarea');
         compile.addEventListener("click",function(){
          modal4.style.display = 'block';
          modal_container_4.className = 'modal-container modal-container-four animate__animated animate__zoomIn';
          iframe.srcdoc = area[0].value + "<style>" +
                      area[1].value + "</style>";
         })
        
        var pause = document.getElementById("pause")
        var paused = false;
        pause.addEventListener("click",function(){
          paused=true;
          blo.pause();
        })
        let i = 0;
        var SPEED = 1;
        var play = document.getElementById("pa");
        
        var openvideoplayer = document.getElementById("play");
        play.style.display = "block";
        pause.style.display = "block";
        openvideoplayer.style.visibility = "hidden";
        record.style.visibility = "hidden";
        const modal4 = document.getElementById('modal-four');
        const modal_container_4 = document.querySelector('.modal-container-four');
        play.addEventListener("click",function(){
          blo.play();
          var cursor = document.getElementsByClassName("cursor");
          for(i = 0; i < cursor.length; i++){
            cursor[i].remove();
          }
          const fakeCursor = document.createElement('div');
          fakeCursor.className = "cursor";
          document.body.appendChild(fakeCursor);
          const startPlay = Date.now();
          paused = false;
          
          var doc = document.documentElement;
          console.log("document element :",document.documentElement);
          (function draw() {
        
            let event = rec.events[i];
            if (!event) {
              return;
            }
            let offsetRecording = event.time - rec.startTime;
            let offsetPlay = (Date.now() - startPlay) * SPEED;
            if (offsetPlay >= offsetRecording) {
              drawEvent(event, fakeCursor, doc);
              i++;
            } 
      
            if (i < rec.events.length && !paused) {
              requestAnimationFrame(draw);
            }
            else{
              rec.startTime = event.time;
              var cursor = document.getElementsByClassName("cursor");
              for(i = 0; i < cursor.length; i++){
                cursor[i].remove();
              }
            }
          })();
        })
        const modals = document.querySelectorAll('.modal');
        window.addEventListener('click', (e) => {
        modals.forEach(modal => {
          if(e.target === modal){
              modal.style.display = 'none';
          }
        })
  });
        function drawEvent(event, fakeCursor, Doc) {
          if (event.type === "click" || event.type === "mousemove") {
            
              fakeCursor.style.top = event.y,
              fakeCursor.style.left = event.x  
          }
      
          if (event.type === "click") {
           
            flashClass(fakeCursor, "click");
            console.log(event.target);
            var tar = document.getElementById(event.target);
            flashClass(tar, "clicked");
          }
      
          if (event.type === "keypress") {
            
            const path = event.target;
            var tar = document.getElementById(path);
            tar.focus();
            tar.value = event.value;
          } 
        }
        function flashClass(el, className) {
          console.log("event ", el);
          el.classList.add(className);
          setTimeout(function(){ el.classList.remove(className); }, 200);
        }
         
       </script>`)
   
    })
    
    })

    });

    
