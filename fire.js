import {
    setCustom,
    incrementCustom,
    getCustom,
} from "./updateCustomProperty.js"

const SPEED = 0.035
const FIRE_INTERVAL_MIN = 800
const FIRE_INTERVAL_MAX = 2000
const worldElem = document.querySelector("[data-world]")



let nextFire
let position = 1
let positionTreasure = 1
let vatra=0

export function setupFire() {
    nextFire = FIRE_INTERVAL_MIN
    document.querySelectorAll("[data-fire]").forEach(fire => {
        fire.remove()
    })
}

export function updateFire(delta, speedScale) {
    document.querySelectorAll("[data-fire]").forEach(fire => {
        incrementCustom(fire, "--left", delta * speedScale * SPEED * -1)
        if (getCustom(fire, "--left") <= -100) {
            fire.remove()
        }
    })
    
    if (nextFire <= 0) {
        vatra++
        createFire()
        if(vatra % 5 === 0) createTreasure()
        nextFire =
            randomNumber(FIRE_INTERVAL_MIN, FIRE_INTERVAL_MAX) / speedScale
    }
    nextFire -= delta
}

export function updateTreasure(delta, speedScale){
    document.querySelectorAll("[data-treasure]").forEach(treasure=>{
        incrementCustom(treasure, "--left", delta * speedScale * SPEED * -1)


        console.log("5")

        if(getCustom(treasure,"--left") <= -100){
            treasure.remove()
        }

    })
}


export function getFireRects() {
    return [...document.querySelectorAll("[data-fire]")].map(fire => {
        return fire.getBoundingClientRect()
    })
}

export function getTreasereRects() {
    return [...document.querySelectorAll("[data-treasure]")].map(treasure =>{
        return treasure.getBoundingClientRect()  
    })
}

function createTreasure(){
    const treasure = document.createElement("img")
    treasure.dataset.treasure = true
    treasure.src = "imgs/treasure.png"
    treasure.classList.add("treasure")
    treasure.dataset.positionTreasure = positionTreasure
    positionTreasure++
    setCustom(treasure, "--left", 120)
    worldElem.append(treasure)
}

function createFire() {
    const fire = document.createElement("img")
    fire.dataset.fire = true
    fire.src = "imgs/fire.gif"
    fire.classList.add("fire")
    fire.dataset.position = position
    position++
    setCustom(fire, "--left", 100)
    worldElem.append(fire)
}

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
} 