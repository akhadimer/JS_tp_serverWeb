const http = require('http')
const PORT = process.env.PORT || 8080

function whichURL(req, res) {
    if (req.url == '/url1') {
        res.end('Première URL')
    }
    else if (req.url == '/url2') {
        res.end('Deuxième URL')
    }
    else {
        res.statusCode = 404
        res.statusMessage = 'Not Found'
        res.end()
    }
}
function body(req, res) {
    let body = ""

    req.on('data', (data) => {
        body += data
    })

    req.on('end', () => {
        req.body = body
        res.end(req.body)
    })
}

const app = http.createServer((req, res) => {
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    whichURL(req, res)
    body(req, res)
})

app.listen(PORT, () => {
    console.log('Serveur sur port :', PORT)
})
