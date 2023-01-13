import {
    incrementCustom,
    setCustom,
    getCustom,
} from "./updateCustomProperty.js"

import { jumping } from "./audio.js"

const humanElem = document.querySelector("[data-human]")
const JUMP_SPEED = 0.42
const GRAVITY = 0.0015
const HUMAN_FRAME_COUNT = 7
const FRAME_TIME = 100

let isJumping
let humanFrame
let currentFrameTime
let velocity
export function setupDino() {
    isJumping = false
    humanFrame = 0
    currentFrameTime = 0
    velocity = 0
    setCustom(humanElem, "--bottom", 0)
    document.removeEventListener("keydown", onJump)
    document.addEventListener("keydown", onJump)
}

export function updateHuman(delta, speedScale) {
    handleRun(delta, speedScale)
    handleJump(delta)
}

export function getHumanRect() {
    return humanElem.getBoundingClientRect()
}

export function setHumanLose() {
    humanElem.src = "imgs/idle.gif"
}

function handleRun(delta, speedScale) {
    if (isJumping) {
        humanElem.src = `imgs/idle.gif`
        return
    }

    if (currentFrameTime >= FRAME_TIME) {
        
        humanFrame = (humanFrame + 1) % HUMAN_FRAME_COUNT
        humanElem.src = `imgs/human-run-${humanFrame}.png`
        currentFrameTime -= FRAME_TIME
    }

    currentFrameTime += delta * speedScale
}

function handleJump(delta) {
    if (!isJumping) return

    incrementCustom(humanElem, "--bottom", velocity * delta)
    humanElem.src = `imgs/jump_outline.png`


    if (getCustom(humanElem, "--bottom") <= 0) {
        setCustom(humanElem, "--bottom", 0)
        isJumping = false
    }

    velocity -= GRAVITY * delta
}

function onJump(e) {
    if (e.code !== "ArrowUp" || isJumping) return

    jumping()
    velocity = JUMP_SPEED
    isJumping = true
}