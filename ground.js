import {
  getCustom,
  incrementCustom,
  setCustom,
} from "./updateCustomProperty.js"

const SPEED = 0.035
const groundElems = document.querySelectorAll("[data-ground]")

export function setupGround() {
  setCustom(groundElems[0], "--left", 0)
  setCustom(groundElems[1], "--left", 300)
}

export function updateGround(delta, speedScale) {
  groundElems.forEach(ground => {
    incrementCustom(ground, "--left", delta * speedScale * SPEED * -1)

    if (getCustom(ground, "--left") <= -300) {
      incrementCustom(ground, "--left", 600)
    }
  })
}