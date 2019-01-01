import document from "document"

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
const days2 = days.map(d => d.substring(0, 2))

const date = document.getElementById("date")
const weekday = document.getElementById("weekday")

export default d => {
  const dow = d.getDay()
  const dom = d.getDate()

  date.text = dom
  weekday.text = days2[dow]
}
