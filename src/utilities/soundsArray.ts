const startBellSong = 'https://firebasestorage.googleapis.com/v0/b/pomodoro-app-cf8c3.appspot.com/o/sounds%2Fbell-finish.mp3?alt=media&token=95f2a78a-267f-4ec2-af3c-8601f61a866b'
const endBellSong = 'https://firebasestorage.googleapis.com/v0/b/pomodoro-app-cf8c3.appspot.com/o/sounds%2Fbell-start.mp3?alt=media&token=3662552f-2044-4360-a8a7-20b168fa8477'
const startNotificationSong = 'https://firebasestorage.googleapis.com/v0/b/pomodoro-app-cf8c3.appspot.com/o/sounds%2Fnotification-start.mp3?alt=media&token=54670677-9006-43d1-9a03-b90b81cacd5b'
const endNotificationSong = 'https://firebasestorage.googleapis.com/v0/b/pomodoro-app-cf8c3.appspot.com/o/sounds%2Fnotification-finish.mp3?alt=media&token=0c5ad874-4887-4182-9b72-90792ee11d9d'
const startPinSong = 'https://firebasestorage.googleapis.com/v0/b/pomodoro-app-cf8c3.appspot.com/o/sounds%2Fpin-start.mp3?alt=media&token=97a6451f-1760-4181-bf61-7fd7cfe51e6d'
const endPinSong = 'https://firebasestorage.googleapis.com/v0/b/pomodoro-app-cf8c3.appspot.com/o/sounds%2Fpin-stop.mp3?alt=media&token=1aae7c66-f5dc-46a6-ab83-bd639412e9a2'

export const soundsArray = [
  { name: 'bell', sounds: { start: startBellSong, end: endBellSong } },
  {
    name: 'notification',
    sounds: { start: startNotificationSong, end: endNotificationSong },
  },
  { name: 'pin', sounds: { start: startPinSong, end: endPinSong } },
]
