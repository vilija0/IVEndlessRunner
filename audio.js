
let audioPlay = new Audio("./audio/JungleTrance.wav")
let audioLosse = new Audio("./audio/mixkit-funny-fail-low-tone-2876.wav")
let audioJump = new Audio("./audio/mixkit-player-jumping-in-a-video-game-2043.wav")

export function startAudio(){
    audioPlay.play()
    audioPlay.loop = true
}

export function stopAudio(){
    audioLosse.volume = 0.3
    audioLosse.play()
    audioPlay.pause()
    audioPlay.load()
}

export function jumping(){
    audioJump.volume = 0.5
    audioJump.load()
    audioJump.play()
    
}