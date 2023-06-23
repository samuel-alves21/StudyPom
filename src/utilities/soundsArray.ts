import startBellSong from '../sounds/bell-start.mp3'
import endBellSong from '../sounds/bell-finish.mp3'
import startNotificationSong from '../sounds/notification-start.mp3'
import endNotificationSong from '../sounds/notification-finish.mp3'
import startPinSong from '../sounds/pin-start.mp3'
import endPinSong from '../sounds/pin-stop.mp3'

export const soundsArray = [
  { name: 'bell', sounds: { start: startBellSong, end: endBellSong } },
  { name: 'notification', sounds: { start: startNotificationSong, end: endNotificationSong } },
  { name: 'pin', sounds: { start: startPinSong, end: endPinSong } },
]