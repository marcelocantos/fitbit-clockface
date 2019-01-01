import { me } from "appbit"
import document from "document"
import { HeartRateSensor } from "heart-rate"
import { range } from "scientific"

export default () => {
  if (me.permissions.granted("access_heart_rate")) {
    const degPerMinute = 360 / 60
    const hearts = range(8).map(h => document.getElementById(`heart${h}`))

    const hrm = new HeartRateSensor()

    hrm.onreading = () => {
      console.log(`Heartrate reading: ${hrm.heartRate}`)
      const angle = hrm.heartRate * degPerMinute
      for (const heart of hearts) {
        heart.sweepAngle = Math.max(0, Math.min(angle, 180))
        angle -= 180
      }
    }

    return ({ display, bodyPresent }) => {
      if (display && bodyPresent) {
        hrm.start()
      } else {
        hrm.stop()
      }
    }
  } else {
    console.warn('No permission to access heartrate')
  }
}
