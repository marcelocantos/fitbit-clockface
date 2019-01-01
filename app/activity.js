import { goals, today } from "user-activity";
import document from "document"

const updater = name => {
  const goal = goals[name] || 0
  console.log(`${name} goal: ${goal}`);

  const element = document.getElementById(name)

  return () => {
    const actual = today.adjusted[name] || 0
    console.log(`${name}: ${actual}/${goal}`)
    element.sweepAngle = 360 * actual / goal
  }
}

export default () => {
  const updateSteps = updater("steps")
  const updateCalories = updater("calories")

  const update = () => {
    updateSteps()
    updateCalories()
  }
  
  let interval

  return ({ display, bodyPresent }) => {
    if (interval) {
      clearInterval(interval)
      interval = null
    }
    if (display && bodyPresent) {
      update()
      interval = setInterval(update, 1000)
    }
  }
}
