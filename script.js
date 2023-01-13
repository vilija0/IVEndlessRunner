import { updateGround, setupGround } from "./ground.js"
import { updateHuman, setupDino, getHumanRect, setHumanLose } from "./human.js"
import { updateFire, setupFire, getFireRects, updateTreasure, getTreasereRects } from "./fire.js"
import { startAudio, stopAudio } from "./audio.js"

const WORLD_WIDTH = 100
const WORLD_HEIGHT = 40
const DODAVANJE_BRZINE = 0.00001

const worldElem = document.querySelector("[data-world]")
const scoreElem = document.querySelector("[data-score]")
const startScreenElem = document.querySelector("[data-start-screen-one]")
const title = document.querySelector('[data-title]')
const gameScreen = document.querySelector('[data-first-time]')
const totalScore = document.querySelector('[data-total-score]')


setPixelToWorldScale()
window.addEventListener("resize", setPixelToWorldScale)


startScreenElem.addEventListener("click", handleStart, { once: true })

let lastTime
let speedScale
let score
let life = 0
let prethodni = 0
function update(time) {
  if (lastTime == null) {
    lastTime = time
    window.requestAnimationFrame(update)
    return
  }
  const delta = time - lastTime

  updateGround(delta, speedScale)
  updateHuman(delta, speedScale)
  updateFire(delta, speedScale)
  updateTreasure(delta,speedScale)
  updateSpeedScale(delta)
  updateScore(delta)
  if (collectTreasure()) scoreIncrement()
  if (checkLose()) return handleLose()

  lastTime = time
  window.requestAnimationFrame(update)
}

function checkLose() {
  const humanRect = getHumanRect()
  return getFireRects().some(rect => isCollision(rect, humanRect))
}

function isCollision(rect1, rect2) {
  let rightHuman = rect2.right -17
  let rightFire = rect1.right -20

    return (
      rect1.left < rightHuman &&
      rect1.top < rect2.bottom &&
      rightFire > rect2.left &&
      rect1.bottom > rect2.top
  )

}

function collectTreasure(){
  const humanRect = getHumanRect()
  return getTreasereRects().some(rect => isCollision(rect,humanRect))
}

function updateSpeedScale(delta) {
  speedScale += delta * DODAVANJE_BRZINE
}

function updateScore(delta) {
  score += delta * 0.009
  scoreElem.textContent = Math.floor(score)
}

export function handleStart() {
  lastTime = null
  speedScale = 1
  score = 0
  setupGround()
  setupDino()
  setupFire()
  startAudio()
  title.textContent='IV ENDLESS RUNNER'
  scoreElem.classList.remove('hide')
  totalScore.classList.add('hide')
  gameScreen.classList.remove("hide")
  startScreenElem.classList.add("hide")
  window.requestAnimationFrame(update)
}

let number = 0
function scoreIncrement(){
  number++;
  let treasure = document.querySelector("[data-treasure]")

  document.querySelector("[data-treasete-score]").innerText = `${number}`
  treasure.classList.add('hide')
  
}

function handleLose() {
  setHumanLose()
  setTimeout(() => {
    const treasure = document.querySelector("[data-treasure]")
    //game over
    life=0
    prethodni=0
    stopAudio()
    title.textContent='GAME OVER'
    if(treasure){
      treasure.classList.add('hide')
    }
    scoreElem.classList.add('hide')
    totalScore.classList.remove('hide')
    totalScore.classList.add('index')
    totalScore.innerHTML = `Total Score: ${Math.round(score)}
                              <p>Total treasure: ${number} </p>`
    startScreenElem.addEventListener("click", handleStart, { once: true })
    startScreenElem.classList.remove("hide")
  }, 200)
}


function setPixelToWorldScale() {
  let worldToPixelScale
  if (window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT) {
    worldToPixelScale = window.innerWidth / WORLD_WIDTH
  } else {
    worldToPixelScale = window.innerHeight / WORLD_HEIGHT
  }

  worldElem.style.width = `${(WORLD_WIDTH * worldToPixelScale)-100}px`
  worldElem.style.height = `${WORLD_HEIGHT * worldToPixelScale}px`
}