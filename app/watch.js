import clock from "clock"

import date from "./date"
import time from "./time"

clock.granularity = "seconds"

export default () => {
  const tick = evt => {
    const d = evt.date
    console.log(`tick: ${d.toString()}`)
    date(d)
    time(d)
  }

  return ({ display }) => {
    if (display) {
      clock.ontick = tick
    } else {
      clock.ontick = null
    }
  }
}
