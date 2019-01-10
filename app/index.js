import { BodyPresenceSensor } from "body-presence"
import { display } from "display"

import activity from "./activity"
import heart from "./heart"
import watch from "./watch"

const listeners = [
  heart(),
  watch(),
  activity(),
]

const state = {
  display: true,
  bodyPresent: true,
}

const updateListeners = () => {
  for (const listener of listeners) {
    listener(state)
  }
}

updateListeners()

display.onchange = function() {
  state.display = display.on
  updateListeners()
}

const body = new BodyPresenceSensor()
body.onreading = () => {
  state.bodyPresent = body.present
  updateListeners()
}
body.start()
