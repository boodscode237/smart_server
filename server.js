const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')

const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(cors())

const database = {
    users: [{
            id: '123',
            name: 'john',
            email: 'john@mail.ru',
            password: 'cookies',
            entries: 0,
            joined: new Date()
        },
        {
            id: '223',
            name: 'johnny',
            email: 'johnny@mail.ru',
            password: 'cookieess',
            entries: 0,
            joined: new Date()
        }
    ],
    login: [{
        id: '129',
        hash: '',
        email: 'john@mail.ru'
    }]
}

app.get('/', (req, res) => {
    res.send(database.users)
})


app.post('/signin', cors(), (req, res) => {
    // Load hash from your password DB.
    // bcrypt.compare("oranges", '$2a$10$9IsPhj9mtnhtuznbTJmGr.HdWJT7JP8hMepMmPwaRQNN836Kp1dny', function(err, res) {
    //     console.log('guessed', res)
    // });
    // bcrypt.compare("veggies", '$2a$10$9IsPhj9mtnhtuznbTJmGr.HdWJT7JP8hMepMmPwaRQNN836Kp1dny', function(err, res) {
    //     console.log('non-guessed', res)
    // });
    if (req.body.email === database.users[0].email &&
        req.body.password === database.users[0].password) {
        res.json('success')
    } else {
        res.status(400).json('error logging in')
    }
})

app.post('/register', (req, res) => {
    const { email, name, password } = req.body
    bcrypt.hash(password, null, null, function(err, hash) {
        console.log(hash)
    });
    database.users.push({
        id: '126',
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date()
    })
    res.json(database.users[database.users.length - 1])
})

app.get('/profile/:id', (req, res) => {
    const { id } = req.params
    let found = false
    database.users.forEach(user => {
        if (user.id === id) {
            found = true
            return res.json(user)
        }
    })
    if (!found) {
        res.status(404).json("no such user")
    }
})

app.put('/image', (req, res) => {
    const { id } = req.body
    let found = false
    database.users.forEach(user => {
        if (user.id === id) {
            found = true
            user.entries++
                return res.json(user.entries)
        }
    })
    if (!found) {
        res.status(404).json("no such user")
    }
})

// bcrypt.hash("bacon", null, null, function(err, hash) {
//     // Store hash in your password DB.
// });



app.listen(3002, () => {
    console.log("app is running on port 3002");
})