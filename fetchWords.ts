import fs from 'fs'

import { channels } from './src/settings.json'
import { getWordsFromRss } from './src/util'

getWordsFromRss(channels, 5).then(words => {
  fs.writeFile('./static/words.json', JSON.stringify(words), error => {
    if (error) throw error
  })
})
