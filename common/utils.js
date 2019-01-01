import { preferences } from "user-settings"

const zeroPad2 = i => (100 + i).toString().substr(1)

const hours12 = h => preferences.clockDisplay === "12h" ? h % 12 || 12 : zeroPad2(h)

export default {
  zeroPad2,
  hours12,
}
