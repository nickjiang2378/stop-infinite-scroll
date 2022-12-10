/* This runs after a web page loads */

let targetClass = "x1lliihq"
let lastClass = "x1xzczws"
let firstPost = document.querySelector("div[class='x1lliihq']")
let parentElement = firstPost.parentElement
const config = { attributes: false, childList: true, subtree: false };
let upperLimit = 10
let waitTime = 60
let lastElementRemoved = false
let transitionInProgress = false
console.log(parentElement)

let waitingElement = document.createElement("div")
waitingElement.style.textAlign = "center"
waitingElement.style.backgroundColor = "white"
waitingElement.style.borderRadius = "max(0px, min(8px, calc((100vw - 4px - 100%) * 9999))) / 8px"
waitingElement.style.marginBottom = "20px"
waitingElement.style.padding = "10px"

// Manage modal

const modal = document.createElement("div")
const overlay = document.createElement("div")

modal.className = "modal"
overlay.className = "overlay"

const callback = (mutationList, observer) => {
  for (let mutation of mutationList) {
    if (mutation.type == "childList") {

      let children = mutation.target.children
      let childLength = children.length
      // console.log(childLength)
      // console.log(children)
      // console.log(transitionInProgress)
      if (!lastElementRemoved) {
        let lastElement = children[childLength - 1]
        if (lastElement && lastElement.className == lastClass) {
          removeElement(lastElement)
          lastElementRemoved = true
        }
      }

      if (childLength > upperLimit) {
        for (let node of children) {
          node.style.opacity = "0"
        }
        for (let node of mutation.addedNodes) {
          node.style.display = "none"
        }
        if (!transitionInProgress) {
          transitionInProgress = true
          document.body.appendChild(modal)
          document.body.appendChild(overlay)
          countdown()
        }
        
      }
    }
  }
}

// Removes elements, but never a post
const removeElement = (element) => {
  console.log("Removing Element")
  console.log(element)
  if (element && element.className != targetClass) {
    console.log("Removed!")
    element.remove()
  } else {
    console.log("Invalid element")
  }
}

// Manage transition between rounds
const countdown = () => {
  console.log("Initiating countdown")
  let time = waitTime
  modal.innerHTML = timerMsg(time)
  let timer = setInterval(() => {
    if (time <= 0) {
      clearInterval(timer)
      transitionInProgress = false
      modal.remove()
      overlay.remove()
      restartRound()
      upperLimit += 10
    }
    modal.innerHTML = timerMsg(time)
    time -= 1
  }, 1000)
}

const timerMsg = (time) => {
  return `Take a break: Resuming in ${time}s`
}

// Restarts round after a sufficient amount of time has passed
const restartRound = () => {
  for (let node of parentElement.children) {
    node.style.display = null
    node.style.opacity = null
  }
}

const observer = new MutationObserver(callback);
observer.observe(parentElement, config)


