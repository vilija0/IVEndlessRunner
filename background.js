import {
    getCustom,
    incrementCustom,
    setCustom,
} from "./updateCustomProperty.js"

const SPEED = 0.001
const SPEED2 = 0.003
const groundElems = document.querySelectorAll("[data-background]")
const groundElems2 = document.querySelectorAll("[data-background2]")

export function setupBackground() {
    setCustom(groundElems[0], "--left", 0)
    setCustom(groundElems[1], "--left", 100)
    setCustom(groundElems2[0], "--left", 0)
    setCustom(groundElems2[1], "--left", 100)
}

export function updateBackground(delta, speedScale) {
    groundElems.forEach(ground => {
        incrementCustom(ground, "--left", delta * speedScale * SPEED * -1)

        if (getCustom(ground, "--left") <= -100) {
            incrementCustom(ground, "--left", 200)
        }
    })
}

export function updateBackgroundSame(delta, speedScale){
    groundElems2.forEach(ground => {
        incrementCustom(ground, "--left", delta * speedScale * SPEED2 * -1)

        if (getCustom(ground, "--left") <= -100) {
            incrementCustom(ground, "--left", 200)
        }
    })
}