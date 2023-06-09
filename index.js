const express = require('express')
const fs = require('fs')
const app = express()
const port = 3000

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.post('/send', (req, res) => {
    const filename = req.body.filename

    if (!filename) {
        res.redirect('/')
        return
    }

    if (fs.existsSync(filename)) {
        res.render('result.ejs', { message: 'File already exists.' })
        return
      }
    
      fs.writeFile(`data/files/${filename}`, 'You are awesome', (err) => {
        if (err) {
          res.render('result.ejs', { message: 'Error writing to file.' })

        } else {
          fs.appendFile('./data/filenames.txt', `files${filename}\n`, (err) => {
            if (err) {
              console.log('Error saving filename:', err)

            }
          })
          res.render('result.ejs', { message : filename })

        }
      })

})



app.listen(port, () => console.log(`Example app listening on port ${port}!`))