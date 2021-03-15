import { useState, useRef,useEffect } from 'react'
import song from './Suncrown - Legend of the Forgotten Centuries.mp3'
import Slider from './components/slider/Slider'
import ControlPanel from './components/controls/ControlPanel'
import MicRecorder from 'mic-recorder-to-mp3';

const Mp3Recorder = new MicRecorder({ bitRate: 128 });

function App() {

    const [audio,startRecording] = useState({
    isRecording: false,
    blobURL: '',
    isBlocked: false,
  })

  const [percentage, setPercentage] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)


useEffect(() => {
  navigator.getUserMedia({ audio: true },
    () => {
      console.log('Permission Granted');
      startRecording({ isBlocked: false });
    },
    () => {
      console.log('Permission Denied');
      startRecording({ isBlocked: true })
    },
  );
},[])


   const start = () => {
    if (audio.isBlocked) {
      console.log('Permission Denied');
    } else {
      Mp3Recorder
        .start()
        .then(() => {
          startRecording({ isRecording: true});
        }).catch((e) => console.error(e));
    }
  };

 const stop = () => {
    Mp3Recorder
      .stop()
      .getMp3()
      .then(([buffer, blob]) => {
        const blobURL = URL.createObjectURL(blob)
        startRecording({ blobURL: blobURL, isRecording: false});
      }).catch((e) => console.log(e));
  };

  const audioRef = useRef()

  const onChange = (e) => {
    const audio = audioRef.current
    audio.currentTime = (audio.duration / 100) * e.target.value
    setPercentage(e.target.value)
  }

  const play = () => {
    const audio = audioRef.current
    audio.volume = 0.1

    if (!isPlaying) {
      setIsPlaying(true)
      audio.play()
    }

    if (isPlaying) {
      setIsPlaying(false)
      audio.pause()
    }
  }

  const getCurrDuration = (e) => {
    const percent = ((e.currentTarget.currentTime / e.currentTarget.duration) * 100).toFixed(2)
    const time = e.currentTarget.currentTime

    setPercentage(+percent)
    setCurrentTime(time.toFixed(2))
  }

  return (
    <>
     <button onClick={start} disabled={audio.isRecording}>
      Record
    </button>
    <button onClick={stop} disabled={!audio.isRecording}>
      Stop
    </button>
    <audio src={audio.blobURL}/>
    <div className='app-container'>
      <h1>Audio Player</h1>
      <Slider percentage={percentage} onChange={onChange} />
      <audio
        ref={audioRef}
        onTimeUpdate={getCurrDuration}
        onLoadedData={(e) => {
          setDuration(e.currentTarget.duration.toFixed(2))
        }}
        src={audio.blobURL}
      ></audio>
      <ControlPanel
        play={play}
        isPlaying={isPlaying}
        duration={duration}
        currentTime={currentTime}
      />
    </div>
    </>
  )
}

export default App
