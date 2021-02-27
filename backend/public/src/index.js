var babu;
$(function() {
  // init elements
  const $play = $("#play");
  const $record = $("#record");

  $play.attr("disabled", 1);
 

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
          target: e.target.id,
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
          target: e.target.id,
          value: e.target.value,
          keyCode: e.keyCode,
          time: Date.now()
        });
      }
    }
  ];

  var gumStream; 						//stream from getUserMedia()
  var rec; 							//Recorder.js object
  var input; 							//MediaStreamAudioSourceNode we'll be recording
  var au = document.createElement('audio');

  // shim for AudioContext when it's not avb. 
  var AudioContext = window.AudioContext || window.webkitAudioContext;
  var audioContext //audio context to help us record

  // Attach recording button
  $record.toggle(
    function startRecording() {
      // start recording
      $record.text("Recording (Click again to Stop)");
      $play.attr("disabled", 1);
      recording.startTime = Date.now();
      recording.events = [];
      recording.htmlCopy = $(document.documentElement).html();
      recording.height = $(window).height();
      recording.width = $(window).width();
      recording.creator = "User"
      handlers.map(x => listen(x.eventName, x.handler));

        console.log("recordButton clicked");
        
        var constraints = { audio: true, video:false }

        navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
          console.log("getUserMedia() success, stream created, initializing Recorder.js ...");

          audioContext = new AudioContext();

          //update the format 
          document.getElementById("formats").innerHTML="Format: 1 channel pcm @ "+audioContext.sampleRate/1000+"kHz"

          /*  assign to gumStream for later use  */
          gumStream = stream;
          
          /* use the stream */
          input = audioContext.createMediaStreamSource(stream);

          rec = new Recorder(input,{numChannels:1})

          //start the recording process
          rec.record()

          console.log("Recording started ");

        }).catch(function(err) {
          
        });

    },
    function stopRecording() {
      // stop recording
      $record.text("Record Again");
      $play.removeAttr("disabled");
      handlers.map(x => removeListener(x.eventName, x.handler));

      console.log("stopButton clicked");
      
      //tell the recorder to stop the recording
      rec.stop();
      console.log(rec);
      //stop microphone access
      gumStream.getAudioTracks()[0].stop();
      console.log(rec);
      rec.exportWAV(createDownloadLink);

    }
  );

  var newWindow;
 
  $play.click(function() {
    function displayWindow() {
      newWindow = window.open("", "newWindow", "width=1693, height=1441");
      newWindow.document.write(recording.htmlCopy);
      newWindow.rec = Object.assign({},recording);
      newWindow.blob = babu;
      // newWindow.document.write(`<script src="https://code.jquery.com/jquery-1.8.3.js"></script>`);
      newWindow.document.write(`
      <script>
      var cur_prog = 0,html,css,js;
      console.log(blob);
      var au = document.createElement('audio');        
        var url = window.URL.createObjectURL(blob);
        var li = document.createElement('div');
        var link = document.createElement('a');
        var recordingsList = document.getElementById('recording');
        //name of .wav file to use during upload and download (without extendion)
        var filename = new Date().toISOString();
        //add controls to the <audio> element
        au.controls = false;
        au.src = url;
        //save to disk link
        link.href = url;
        //add the new audio element to li
        li.appendChild(au);
        
        //add the li element to the ol
        recordingsList.appendChild(li);
  
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
       
       function run(){
        modal4.style.display = 'block';
        modal_container_4.className = 'modal-container modal-container-four animate__animated animate__zoomIn';
        iframe.srcdoc = area[0].value + "<style>" +
                    area[1].value + "</style>";
       }
       
       au.style.display = "block";
       recordingsList.appendChild(li);

       var progress = document.createElement("div");
       recordingsList.appendChild(progress);
         var timer;
         var percent = 0;
         var audio = au;
         audio.addEventListener("playing", function(_event) {
           var duration = _event.target.duration;
           advance(duration, audio);
         });
         audio.addEventListener("pause", function(_event) {
           clearTimeout(timer);
         });
         var advance = function(duration, element) {
          
           increment = 10/duration
           percent = Math.min(increment * element.currentTime * 10, 100);
           progress.style.width = percent+'%'
           startTimer(duration, element);
         }
         var startTimer = function(duration, element){ 
           if(percent < 100) {
             timer = setTimeout(function (){advance(duration, element)}, 100);
           }
         }
         progress.setAttribute("id","progress");
         recording.setAttribute("id","recording");
         recording.style.background = "#000";
         progress.style.width = "0%";




      var pause = document.getElementById("pause")
      var paused = false;
      pause.addEventListener("click",function(){
        paused=true;
        au.pause();
        pause.disabled = true;
        play.disabled = false;
        play.style.display = "block";
        pause.style.display = "none";
      })
      let i = 0;
      console.log(rec);
      var SPEED = 1;
      var play = document.getElementById("pa");
      
      var openvideoplayer = document.getElementById("play");
      play.style.display = "block";
      pause.style.display = "none";
      openvideoplayer.style.visibility = "hidden";
      record.style.visibility = "hidden";
      const modal4 = document.getElementById('modal-four');
      const modal_container_4 = document.querySelector('.modal-container-four');
      play.addEventListener("click",function(){
        au.play();
        pause.disabled = false;
        play.disabled = true;
        play.style.display = "none";
        pause.style.display = "block";
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
        console.log(document.documentElement);
        (function draw() {
          if(cur_prog > 0){
            i = cur_prog;
            cur_prog = 0
            var h = document.getElementById("htmltext");
            h.value = html;
            var c = document.getElementById("csstext");
            c.value = css;
            var j = document.getElementById("jstext");
            j.value = js;
          }
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
            cur_prog = i;
            rec.startTime = event.time;
            var h = document.getElementById("htmltext");
            html = h.value;
            var c = document.getElementById("csstext");
            css = c.value;
            var j = document.getElementById("jstext");
            js = j.value;
            rec.startTime = event.time;
            var cursor = document.getElementsByClassName("cursor");
            for(var j = 0; j < cursor.length; j++){
              cursor[j].remove();
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
            console.log("mouse");
            fakeCursor.style.top = event.y,
            fakeCursor.style.left = event.x  
        }
    
        if (event.type === "click") {
          console.log("mouseclick");
          flashClass(fakeCursor, "click");
          console.log(event.target);
          if(event.target == "compile_img"){
            run();
          }
          else{
            modal4.style.display = 'none';
          } 
          var tar = document.getElementById(event.target);
          flashClass(tar, "clicked");
        }
    
        if (event.type === "keypress") {
          console.log("keypress");
          const path = event.target;
          var tar = document.getElementById(path);
          tar.focus();
          tar.value = event.value;
        } 
      }
      function flashClass(el, className) {
        el.classList.add(className);
        setTimeout(function(){ el.classList.remove(className); }, 200);
      }
       
     </script>`)
    }
    console.log(babu)

    var result;
    getData(babu) 
    var creator = "User"
    localStorage.setItem("event",recording)
    console.log(recording);
    var k = JSON.stringify(recording)
    const id = 1;
    function getData(babu) {
      console.log("WORKS")
      let reader = new FileReader();
      reader.onload = function(event) {
          result = reader.result.split(",").pop() 
          recording.audio = result
          const res = axios.post('https://one111111.herokuapp.com/save',recording)
          //alert(reader.result.split(",").pop());
        };

      reader.readAsDataURL(babu);
      // console.log(result);
      // result = reader
    } 
      displayWindow();

      
  });




  function listen(eventName, handler) {
   return document.documentElement.addEventListener(eventName, handler, true);
  }

  function removeListener(eventName, handler) {
    return document.documentElement.removeEventListener(
      eventName,
      handler,
      true
    );
  }

  function createDownloadLink(blob) {
        babu = blob;
        var url = URL.createObjectURL(blob);
        var au = document.createElement('audio');
        var li = document.createElement('li');
        var link = document.createElement('a');

        //name of .wav file to use during upload and download (without extendion)
        var filename = new Date().toISOString();

        //add controls to the <audio> element
        au.controls = true;
        au.src = url;

        //save to disk link
        link.href = url;

        //add the new audio element to li
        li.appendChild(au);
        
        //add the filename to the li
        li.appendChild(document.createTextNode(filename+".wav "))

        //add the save to disk link to li
        li.appendChild(link);
        
        
        li.appendChild(document.createTextNode (" "))//add a space in between
        

        //add the li element to the ol
        recordingsList.appendChild(li);
      } 

    });

    //   function getData(babu) {
    //     console.log("WORKS")
    //     let reader = new FileReader();
    //     reader.onload = function(event) {
    //         var data = event.target.result.split(',');                    // the actual conversion of data from binary to base64 format
    //         //callback(decodedImageData);        
    //     };
    //     reader.readAsDataURL(babu);
    //     console.log(reader)
    //     console.log(FileReader)
    // }
