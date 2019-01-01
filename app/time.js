import clock from "clock"
import document from "document"
import { me as device } from "device"

const screen = device.screen || { width: 348, height: 250 }

const epsilon = 1e-5
const on60 = 1/60
const degPerHour = 360 / 12
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
const days2 = days.map(d => d.substring(0, 2))

const face = document.getElementById("face")
const [hDim, mDim, sDim] = ["h", "m", "s"].map(dim => ({
  segs: [0, 1, 2].map(i =>
    document.getElementById(`${dim}Seg${i}`)
  ),
  colorGroup: document.getElementById(`${dim}ColorGroup`),
  group: document.getElementById(`${dim}Group`),
  hand: document.getElementById(`${dim}Hand`),
}))

const faceSize = Math.min(screen.width, screen.height)
face.groupTransform.scale.x = faceSize / 250

const updateDim = ({segs: [before, current, after], group, hand}, value, range) => {
  const hourAngle = 12 * (value + epsilon) / range
  const hour = Math.floor(hourAngle)
  const fraction = hourAngle - hour
  const opacity = current.style.fillOpacity
  group.groupTransform.rotate.angle = hour * degPerHour
  before.style.fillOpacity = opacity * (1 - fraction)
  after.style.fillOpacity = opacity * fraction
  hand.groupTransform.rotate.angle = hourAngle * degPerHour
}

export default date => {
  const h = date.getHours()
  const m = date.getMinutes()
  const s = date.getSeconds()
  const ms = m + s*on60
  const hms = h + ms*on60
  hDim.colorGroup.style.fill = 6 <= h && h < 18 ? "orange" : "brown"

  updateDim(sDim, s, 60)
  updateDim(mDim, ms, 60)
  updateDim(hDim, hms, 12)
}
