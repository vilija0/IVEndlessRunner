export function getCustom(elem, prop) {
    return parseFloat(getComputedStyle(elem).getPropertyValue(prop)) || 0
}

export function setCustom(elem, prop, value) {
    elem.style.setProperty(prop, value)
}

export function incrementCustom(elem, prop, inc) {
    setCustom(elem, prop, getCustom(elem, prop) + inc)
}