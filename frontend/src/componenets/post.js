import React, { Component } from 'react'
import axios from 'axios';
class Posts extends Component {
    
    componentWillMount(){
        var newWindow;
        async function display() {
            console.log("WORKS")
            console.log(window.location.host)
            console.log(window.location.href)
            await axios.get('/getevents').then(res => {
               console.log(res.data[0]);
               //function displayWindow() {
                newWindow = window.open("", "newWindow", "width=1693, height=1441");
                console.log(newWindow)
                newWindow.document.write(res.data[0].htmlCopy)
                newWindow.rec = Object.assign({},res.data[0]);
                var snd = new Audio("data:audio/wav;base64," + res.data[0].audio);
                console.log(snd)
                newWindow.blob = snd
                newWindow.document.write(`
                <script>
                var cur_prog = 0,html,css,js;
                var au = document.createElement('audio');        
                  var url = "#";
                  console.log("url:",url);
                  var li = document.createElement('div');
                  var link = document.createElement('a');
                  var recordingsList = document.getElementById('recording');
                  //name of .wav file to use during upload and download (without extendion)
                  var filename = new Date().toISOString();
                  //add controls to the <audio> element
                  au = blob;
                  au.controls = false;
                  au = blob;
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
           
            })
        }
    display();
   }
    render() {
        return (
            <div>
                
            </div>
        )
    }
}

export default Posts;