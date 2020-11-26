//tablica obiektów user

var users = [
    { id: 1, log: "AAA", pass: "pass1", wiek: 10, uczen: "checked", plec: "m" },
    { id: 2, log: "BBB", pass: "pass2", wiek: 16, uczen: "", plec: "k" },
    { id: 3, log: "CCC", pass: "pass3", wiek: 12, uczen: "checked", plec: "m" },
    { id: 4, log: "DDD", pass: "pass4", wiek: 20, uczen: "", plec: "k" },
    { id: 5, log: "EEE", pass: "pass5", wiek: 14, uczen: "checked", plec: "m" },
]

// strony show, gender, sort

let show1 = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Document</title><link rel="stylesheet" href="css/style.css" /></head><body><div class="table-main"><div class="header2"><a href="/sort" class="a2"><u>sort</u></a><a href="/gender" class="a2"><u>gender</u></a><a href="/show" class="a2"><u>show</u></a></div><table>'

let gender1 = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Document</title><link rel="stylesheet" href="css/style.css" /></head><body><div class="table-main"><div class="header2"><a href="/sort" class="a2"><u>sort</u></a><a href="/gender" class="a2"><u>gender</u></a><a href="/show" class="a2"><u>show</u></a></div><table>'

let sort1 = '<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Document</title><link rel="stylesheet" href="css/style.css" /></head><body><div class="table-main"><div class="header2"><a href="/sort" class="a2"><u>sort</u></a><a href="/gender" class="a2"><u>gender</u></a><a href="/show" class="a2"><u>show</u></a></div>'

//logowanie się

let loginVar = false

//zmienna pomocnicza sortowanie

let pomo

//zmienne, stałe

var express = require("express")
var app = express()
var PORT = process.env.PORT || 3000;
var path = require("path")
let t = 5

//funkcje na serwerze, obsługujące konkretne adresy w preglądarce

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname + "/static/main.html"))
})

app.get("/register", function (req, res) {
    res.sendFile(path.join(__dirname + "/static/register.html"))
})

app.get("/login", function (req, res) {
    res.sendFile(path.join(__dirname + "/static/login.html"))
})

app.get("/admin", function (req, res) {
    if (loginVar) {
        res.sendFile(path.join(__dirname + "/static/adminlogin.html"))
        app.get("/logout", function (req, res) {
            loginVar = false
            res.redirect("/")
        })
    } else {
        res.sendFile(path.join(__dirname + "/static/adminlogout.html"))
    }
})
app.get("/show", function (req, res) {
    let show = show1
    if (loginVar) {
        users.sort(function (a, b) {
            return parseFloat(a.id) - parseFloat(b.id)
        })
        for (let i = 0; i < t; i++) {
            show += '<tr><td>id: ' + users[i].id + '</td><td>user: ' + users[i].log + ' - ' + users[i].pass + '</td>'
            if (users[i].uczen == 'checked') {
                show += '<td>uczeń <input type="checkbox" checked disable></td>'
            } else {
                show += '<td>uczeń <input type="checkbox" disable></td>'
            }
            show += '<td>wiek: ' + users[i].wiek + '</td><td>płeć: ' + users[i].plec + '</td></tr>'
        }
        show += '</table></div></body></html>'
        res.send(show)
    } else {
        res.send("zaloguj sie")
    }
})
app.get("/gender", function (req, res) {
    let gender = gender1
    if (loginVar) {
        for (let i = 0; i < t; i++) {
            if (users[i].plec == "k") {
                gender += '<tr><td>id: ' + users[i].id + '</td><td>płeć: ' + users[i].plec + '</td></tr>'
            } else {
                gender += ''
            }
        }
        gender += '</table><table>'
        for (let j = 0; j < t; j++) {
            if (users[j].plec == "m") {
                gender += '<tr><td>id: ' + users[j].id + '</td><td>płeć: ' + users[j].plec + '</td></tr>'
            } else {
                gender += ''
            }
        }
        gender += '</table></div></body></html>'
        res.send(gender)
    } else {
        res.send("zaloguj się")
    }
})
app.all("/sort", function (req, res) {
    if (loginVar) {
        let sort = sort1
        if (req.query.sort == "ros") {
            pomo = 2
        } else {
            pomo = 1
        }
        if (pomo == 2) {
            sort += '<form onchange="this.submit()" method="GET"><input type="radio" name="sort" value="ros" checked /><label style="color: white;">rosnąco</label><input type="radio" name="sort" value="mal" /><label style="color: white;">malejąco</label>'
            users.sort(function (a, b) {
                return parseFloat(a.wiek) - parseFloat(b.wiek)
            })
            sort += '<table>'
            for (let i = 0; i < t; i++) {
                sort += '<tr><td>id: ' + users[i].id + '</td><td>user: ' + users[i].log + ' - ' + users[i].pass + '</td><td>wiek: ' + users[i].wiek + '</td>'
            }
            sort += '</table></div></body>'

        }
        else if (pomo == 1) {
            sort += '<form onchange="this.submit()" method="GET"><input type="radio" name="sort" value="ros" /><label style="color: white;">rosnąco</label><input type="radio" name="sort" value="mal" checked /><label style="color: white;">malejąco</label>'
            users.sort(function (a, b) {
                return parseFloat(b.wiek) - parseFloat(a.wiek)
            })
            sort += '<table>'
            for (let i = 0; i < t; i++) {
                sort += '<tr><td>id: ' + users[i].id + '</td><td>user: ' + users[i].log + ' - ' + users[i].pass + '</td><td>wiek: ' + users[i].wiek + '</td>'
            }
            sort += '</table></div></body>'
        }
        res.send(sort)
    } else {
        res.send("zaloguj się")
    }
})




// register form
app.get("/handleForm", function (req, res) {
    let k = 0
    for (let i = 0; i < t; i++) {
        if (req.query.log != users[i].log) {
            k += 1
        } else {
            k -= 1
        }
    }
    if (k == t) {
        if (req.query.uczen == "on") {
            if (req.query.plec == "k") {
                users[t] = { id: (t + 1), log: req.query.log, pass: req.query.pass, wiek: req.query.wiek, uczen: "checked", plec: "k" }
            } else {
                users[t] = { id: (t + 1), log: req.query.log, pass: req.query.pass, wiek: req.query.wiek, uczen: "checked", plec: "m" }
            }
        } else {
            if (req.query.plec == "k") {
                users[t] = { id: (t + 1), log: req.query.log, pass: req.query.pass, wiek: req.query.wiek, uczen: "", plec: "k" }
            } else {
                users[t] = { id: (t + 1), log: req.query.log, pass: req.query.pass, wiek: req.query.wiek, uczen: "", plec: "m" }
            }
        }
        res.send("Witaj " + req.query.log + "!!!")
        t += 1
    } else {
        res.send("istnieje podany login")
    }
})
//login form
app.get("/handleForm1", function (req, res) {
    let pom = -1
    for (let i = 0; i < t; i++) {
        if (req.query.log == users[i].log) {
            pom = i
        }
    }
    if (pom >= 0) {
        if (users[pom].pass == req.query.pass) {
            res.redirect("/admin")
            loginVar = true
        } else {
            res.send("złe hasło")
        }
    } else {
        res.send("zły login")
    }



})

//nasłuch na określonym porcie

app.use(express.static("static"))

app.listen(PORT, function () {
    console.log("to jest start serwera na porcie " + PORT)
})
