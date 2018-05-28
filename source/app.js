var express = require('express');
var app = express();
var request = require('request');
var cookieParser = require('cookie-parser');

var FormData = require('form-data');
var bodyParser = require('body-parser');

var session = require('express-session')
app.use(session({
  secret: 'fimo',
  cookie: { maxAge: 3600000 },
  resave: false,
  saveUninitialized: true
}))
const checkAuth = require('./checkAuth')


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false })) 
app.use(cookieParser());
app.use(bodyParser.json());
//059f6d07db

var os_cokkie = ''
var lms_cokkie = ''
var cms_cokkie = ''

app.get('/login', (req, res) => {
    res.render('login')
})

app.post('/login', (req, res) => {
    var user = req.body.user
    var pass = req.body.pass
    // console.log(user, pass)
    if(user == 'admin' && pass == '123456'){
        req.session.user = {user:user, pass:pass}

        request({
            url: 'http://localhost:8081/os/login',
            method: 'GET',
        }, (err, response, body) => {
            request({
                url: 'http://localhost:8081/lms/login',
                method: 'GET',
            }, (err, response, body) => {
                request({
                    url: 'http://localhost:8081/cms/login',
                    method: 'GET',
                }, (err, response, body) => {
                    res.send({success: true})
                })
            })
        })
    }
    else {
        res.send({success: false})
    }
})

app.get('/logout',checkAuth, (req, res) => {
    request({
        url: 'http://localhost:8081/os/logout',
        method: 'GET',
    }, (err, response, body) => {
        request({
            url: 'http://localhost:8081/lms/logout',
            method: 'GET',
        }, (err, response, body) => {
            request({
                url: 'http://localhost:8081/cms/logout',
                method: 'GET',
            }, (err, response, body) => {
                req.session.destroy()
                res.redirect('/login')
            })
        })
    })
    
})

app.get('/os/login', (req, res) => {
    // var username = req.body.username
    // var pass = req.body.pass
    var username = 'admin'
    var pass = '059f6d07db'
    request({
        url: 'http://localhost/os/index.php?r=user/login',
        method: 'POST',
        formData: {
            'UserLogin[username]': username,
            'UserLogin[password]': pass,
        },
        headers: {'content-type':'application/x-www-form-urlencoded'}
    }, (err, response, body) => {
        var cokie = response.headers['set-cookie']
        var tmp1 = cokie[1].split(';')
        var tmp2 = tmp1[0].split('=')[1]
        res.cookie('PHPSESSID', tmp2)
        // console.log(cokie)
        os_cokkie = tmp2
        res.send({success: true})
    })
})


app.get('/os/index',checkAuth,(req, res) => {
    res.cookie('PHPSESSID', os_cokkie)
    res.render('os/index')
})


app.get('/os/student/create',checkAuth, (req, res) => {
    res.cookie('PHPSESSID', os_cokkie)
    res.render('os/create')
})

app.get('/os/logout',checkAuth, (req, res) => {
    request({
        method: 'GET',
        url: 'http://localhost/os2/index.php?r=user/logout',
        headers: {'Cookie': 'PHPSESSID=' + os_cokkie},
    }, (err, response, body) => {
        os_cokkie = ''
        res.cookie('PHPSESSID', os_cokkie)
        res.send({success: true})
    })
})

app.post('/os/student/create',checkAuth, function (req, res) {

    var admission_no = req.body.admission_no
    var admission_date = req.body.admission_date
    var first_name = req.body.first_name
    var last_name = req.body.last_name
    var date_of_birth = req.body.date_of_birth
    var gender = req.body.gender
    var nationality_id = req.body.nationality_id
    var address_line1 = req.body.address_line1
    var address_line2 = req.body.address_line2
    var city = req.body.city
    var state = req.body.state
    var pin_code = req.body.pin_code
    var country_id = req.body.country_id
    var phone1 = req.body.phone1
    var email = req.body.email
    var is_active = req.body.is_active
    var is_deleted = req.body.is_deleted
    var created_at = req.body.created_at
    var updated_at = req.body.updated_at
    
    request({
        url: 'http://localhost/os/index.php?r=students/students/create',
        method: 'POST',
        formData: {
            'Students[admission_no]': admission_no,
            'Students[admission_date]': admission_date,
            'Students[first_name]': first_name,
            'Students[last_name]': last_name,
            'Students[date_of_birth]': date_of_birth,
            'Students[gender]': gender,
            'Students[nationality_id]': nationality_id,
            'Students[address_line1]': address_line1,
            'Students[address_line2]': address_line2,
            'Students[city]': city,
            'Students[state]': state,
            'Students[pin_code]': pin_code,
            'Students[country_id]': country_id,
            'Students[phone1]': phone1,
            'Students[email]': email,
            'Students[is_active]': is_active,
            'Students[is_deleted]': is_deleted,
            'Students[created_at]': created_at,
            'Students[updated_at]': updated_at,
        },
        headers: {'content-type':'application/x-www-form-urlencoded', 'Cookie': 'PHPSESSID=' + os_cokkie},
    }, (err, response, body) => {
        res.send({success:true, body: body, res:response, err: err})
    })
})

app.get('/os/student/list',checkAuth, function(req, res){
    name = req.query.name
    if(name == undefined) url = 'http://localhost/os/index.php?r=students/students/list'
    else url = 'http://localhost/os/index.php?r=students/students/list&name=' + name

    request({
        method: 'GET',
        url: url,
        headers: {'Cookie': 'PHPSESSID=' + os_cokkie},
    }, (err, response, body) => {
        res.send(body)
    })
})


app.post('/os/student/delete/:id',checkAuth, function (req, res) {
    var id = req.params.id
    url = 'http://localhost/os/index.php?r=students/students/delete_student&id=' + id
    request({
        url: url,
        method: 'POST',
        formData: {
            'r': 'students/students/delete_student',
            'id': id
        },
        headers: {'Cookie': 'PHPSESSID=' + os_cokkie},
    }, (err, response, body) => {
        res.send({success:true, res:response})
    })
})


app.get('/os/student/view/:id',checkAuth, function (req, res){
    var id = req.params.id
    url = 'http://localhost/os/index.php?r=students/students/info&id=' + id
    request({
        method: 'GET',
        url: url,
        headers: {'Cookie': 'PHPSESSID=' + os_cokkie},
    }, (err, response, body) => {
        res.send(body)
    })
})


app.get('/os/student/edit/:id',checkAuth, function (req, res){
    var id = req.params.id
    res.render('os/edit', {id: id})
})


app.post('/os/student/edit/:id',checkAuth, function (req, res){
    var id = req.params.id

    var first_name = req.body.first_name
    var last_name = req.body.last_name
    var date_of_birth = req.body.date_of_birth
    var gender = req.body.gender
    var nationality_id = req.body.nationality_id
    var address_line1 = req.body.address_line1
    var address_line2 = req.body.address_line2
    var city = req.body.city
    var state = req.body.state
    var pin_code = req.body.pin_code
    var country_id = req.body.country_id
    var phone1 = req.body.phone1
    var email = req.body.email
    var updated_at = req.body.updated_at
    
    url = 'http://localhost/os/index.php?r=students/students/update&id=' + id
    request({
        url: url,
        method: 'POST',
        formData: {
            'Students[first_name]': first_name,
            'Students[last_name]': last_name,
            'Students[date_of_birth]': date_of_birth,
            'Students[gender]': gender,
            'Students[nationality_id]': nationality_id,
            'Students[address_line1]': address_line1,
            'Students[address_line2]': address_line2,
            'Students[city]': city,
            'Students[state]': state,
            'Students[pin_code]': pin_code,
            'Students[country_id]': country_id,
            'Students[phone1]': phone1,
            'Students[email]': email,
            'Students[updated_at]': updated_at,
        },
        headers: {'Cookie': 'PHPSESSID=' + os_cokkie},
    }, (err, response, body) => {
        res.send({success:true, body: body, res:response})
    })
})


app.get('/os/student/adno',checkAuth, function(req, res){
    request({
        method: 'GET',
        url: 'http://localhost/os/index.php?r=students/students/adno',
        headers: {'Cookie': 'PHPSESSID=' + os_cokkie},
    }, (err, response, body) => {
        res.send(body)
    })
})

const myCookieEncode = function (val) {
    return val;
};

app.get('/lms/login', (req, res) => {
    // request({
    //     method: 'GET',
    //     url: "http://127.0.0.1:8000/",
    // }, (err, response, body) => {
    //     console.log(err)
    //     res.send(body)
    // })

    // var username = req.body.username
    // var pass = req.body.pass
    var username = 'admin2'
    var pass = '123456'
    request({
        url: 'http://127.0.0.1:8000/sign-in',
        method: 'POST',
        formData: {
            'username': username,
            'password': pass,
        },
        headers: {'content-type':'application/x-www-form-urlencoded'},
    }, (err, response, body) => {
        var cokie = response.headers['set-cookie']
        var tmp1 = cokie[0].split(';')
        var tmp2 = tmp1[0].split('=')[1]
        lms_cokkie = tmp2
        // console.log(lms_cokkie)
        res.cookie('laravel_session', lms_cokkie, { encode: myCookieEncode })
        res.send({success: true})
    })
})

app.get('/lms/index',checkAuth, (req, res) => {
    res.cookie('laravel_session', lms_cokkie, { encode: myCookieEncode })
    res.render('lms/index')
})

app.get('/lms/logout',checkAuth, (req, res) => {
    request({
        method: 'GET',
        url: 'http://localhost:8000/sign-out',
    }, (err, response, body) => {
        lms_cokkie = ''
        res.cookie('laravel_session', lms_cokkie)
        res.send({success: true})
    })
})


app.get('/lms/regisinfo', (req, res) => {
    request({
        method: 'GET',
        url: 'http://localhost:8000/regisinfo',
    }, (err, response, body) => {
        res.send(body)
    })
})

app.get('/lms/stu-registration', (req, res) => {
    res.render('lms/registration')
})

app.post('/lms/stu-registration', (req, res) => {
    var fname = req.body.fname
    var lname = req.body.lname
    var roll = req.body.roll
    var branch = req.body.branch
    var year = req.body.year
    var email = req.body.email
    var category = req.body.category
    // console.log(fname, lname, roll, branch, year, email, category)

    request({
        url: 'http://localhost:8000/student-registration',
        method: 'GET',
    }, (err, response, body) => {
        var cokie = response.headers['set-cookie']
        var tmp1 = cokie[0].split(';')
        var tmp2 = tmp1[0].split('=')[1]
        // console.log(tmp2)
        
        request({
            url: 'http://localhost:8000/student-registration',
            method: 'POST',
            formData: {
                'first': fname,
                'last': lname,
                'rollnumber': roll,
                'branch': branch,
                'year': year,
                'email': email,
                'category': category,
            },
            headers: {'content-type':'application/x-www-form-urlencoded', 'Cookie': 'laravel_session=' + tmp2}
        }, (err, response, body) => {
            // console.log(body)
            res.send({success: true})
        })

    })
    

    
})

app.get('/lms/student',checkAuth, (req, res) => {
    request({
        method: 'GET',
        url: 'http://localhost:8000/student',
        headers: {'Cookie': 'laravel_session=' + lms_cokkie},
    }, (err, response, body) => {
        res.send(body)
    })
})

app.get('/lms/student-for-approval',checkAuth, (req, res) => {
    res.cookie('laravel_session', lms_cokkie, { encode: myCookieEncode })
    res.render('lms/student-approval')
})


app.post('/lms/student-for-approval',checkAuth, (req, res) => {
    flag = req.body.flag
    id = req.body.id
    request({
        method: 'POST',
        url: 'http://localhost:8000/student/' + id,
        formData: {
            '_method': "PUT",
            'flag': flag,
        },
        headers: {'content-type':'application/x-www-form-urlencoded', 'Cookie': 'laravel_session=' + lms_cokkie},
    }, (err, response, body) => {
        res.send({body: body})
    })
})


app.get('/lms/registered-students',checkAuth, (req, res) => {
    res.cookie('laravel_session', lms_cokkie, { encode: myCookieEncode })
    res.render('lms/registered-students')
})

app.get('/lms/student/create',checkAuth, (req, res) => {
    request({
        method: 'GET',
        url: 'http://localhost:8000/student/create',
        headers: {'Cookie': 'laravel_session=' + lms_cokkie},
    }, (err, response, body) => {
        res.send(body)
    })
})


app.get('/lms/all-book',checkAuth, (req, res) => {
    res.cookie('laravel_session', lms_cokkie, { encode: myCookieEncode })
    res.render('lms/all-book')
})


app.get('/lms/books',checkAuth, (req, res) => {
    request({
        method: 'GET',
        url: 'http://localhost:8000/books',
        headers: {'Cookie': 'laravel_session=' + lms_cokkie},
    }, (err, response, body) => {
        res.send(body)
    })
})

app.get('/lms/add-book',checkAuth, (req, res) => {
    res.cookie('laravel_session', lms_cokkie, { encode: myCookieEncode })
    res.render('lms/add-book')
})

app.get('/lms/book-category',checkAuth, (req, res) => {
    request({
        method: 'GET',
        url: 'http://localhost:8000/book-category',
        headers: {'Cookie': 'laravel_session=' + lms_cokkie},
    }, (err, response, body) => {
        res.send(body)
    })
})

app.post('/lms/books',checkAuth, (req, res) => {
    data = {}
    data.title = req.body.title
    data.author = req.body.author
    data.description = req.body.des
    data.category = req.body.category
    data.number = req.body.issue
    request({
        url: 'http://localhost:8000/books',
        method: 'POST',
        formData: {
            'add_book_data': JSON.stringify(data),
        },
        headers: {'content-type':'application/x-www-form-urlencoded', 'Cookie': 'laravel_session=' + lms_cokkie}
    }, (err, response, body) => {
        res.send({success: true, res: response})
    })
})


app.get('/lms/issue-return',checkAuth, (req, res) => {
    res.cookie('laravel_session', lms_cokkie, { encode: myCookieEncode })
    res.render('lms/issue-return')
})


app.post('/lms/issue-log',checkAuth, (req, res) => {
    var book_id = req.body.book_id
    var stu_id = req.body.stu_id
    
    request({
        url: 'http://localhost:8000/issue-log',
        method: 'POST',
        formData: {
            'data[bookID]': book_id,
            'data[studentID]': stu_id,
        },
        headers: {'content-type':'application/x-www-form-urlencoded', 'Cookie': 'laravel_session=' + lms_cokkie}
    }, (err, response, body) => {
        if(response.statusCode == 200)
            res.send({success: true,  mssg: body})
        else
            res.send({success: false,  mssg: "Student cannot issue any more books or Book not available for issue"})
    })
})

app.post('/lms/return-log',checkAuth, (req, res) => {
    var book_id = req.body.book_id
    request({
        url: 'http://localhost:8000/issue-log/' + book_id + '/edit',
        method: 'GET',
        headers: {'content-type':'application/x-www-form-urlencoded', 'Cookie': 'laravel_session=' + lms_cokkie}
    }, (err, response, body) => {
        if(response.statusCode == 200)
            res.send({success: true,  mssg: body})
        else
            res.send({success: false,  mssg: "Invalid Book ID entered or book already returned"})
    })

})


app.get('/lms/currently-issued',checkAuth, (req, res) => {
    res.cookie('laravel_session', lms_cokkie, { encode: myCookieEncode })
    res.render('lms/currently-issued')
})


app.get('/lms/issue-log',checkAuth, (req, res) => {
    request({
        method: 'GET',
        url: 'http://localhost:8000/issue-log',
        headers: {'Cookie': 'laravel_session=' + lms_cokkie},
    }, (err, response, body) => {
        res.send(body)
    })
})


app.get('/cms/login', (req, res) => {
    // request({
    //     method: 'GET',
    //     url: "http://127.0.0.1:8000/",
    // }, (err, response, body) => {
    //     console.log(err)
    //     res.send(body)
    // })

    // var username = req.body.username
    // var pass = req.body.pass
    var username = 'admin@admin.com'
    var pass = 'password'
    request({
        url: 'http://localhost:8001/login',
        method: 'POST',
        formData: {
            'email': username,
            'password': pass,
        },
        headers: {'content-type':'application/x-www-form-urlencoded'},
    }, (err, response, body) => {
        var cokie = response.headers['set-cookie']
        var tmp1 = cokie[0].split(';')
        var tmp2 = tmp1[0].split('=')[1]
        cms_cokkie = tmp2
        // console.log(lms_cokkie)
        res.cookie('laravel_session2', cms_cokkie, { encode: myCookieEncode })
        res.send({success: true})
    })
})


app.get('/cms/logout',checkAuth, (req, res) => {
    request({
        method: 'POST',
        url: 'http://localhost:8001/logout',
    }, (err, response, body) => {
        cms_cokkie = ''
        res.cookie('laravel_session2', cms_cokkie)
        res.send({success: true})
    })
})


app.get('/cms/index',checkAuth, (req, res) => {
    res.cookie('laravel_session2', cms_cokkie, { encode: myCookieEncode })
    res.render('cms/index')
})


app.get('/cms/courses',checkAuth, (req, res) => {
    request({
        method: 'GET',
        url: 'http://localhost:8001/admin/list/courses',
        headers: {'Cookie': 'laravel_session2=' + cms_cokkie},
    }, (err, response, body) => {
        res.send(body)
    })
})


app.get('/cms/courses/create',checkAuth, (req, res) => {
    res.cookie('laravel_session2', cms_cokkie, { encode: myCookieEncode })
    res.render('cms/create')
})


app.get('/cms/teachers',checkAuth, (req, res) => {
    request({
        method: 'GET',
        url: 'http://localhost:8001/admin/list/teachers',
        headers: {'Cookie': 'laravel_session2=' + cms_cokkie},
    }, (err, response, body) => {
        res.send(body)
    })
})


app.post('/cms/courses',checkAuth, (req, res) => {
    var teacher = req.body.teacher
    var title = req.body.title
    var slug = req.body.slug
    var des = req.body.des
    var price = req.body.price
    var date = req.body.date
    var pub = req.body.pub
    

    request({
        url: 'http://localhost:8001/admin/courses',
        method: 'POST',
        formData: {
            'teachers[]': teacher,
            'title': title,
            'slug': slug,
            'description' : des,
            'price' : price,
            'start_date': date,
            'published' : pub,
        },
        headers: {'content-type':'application/x-www-form-urlencoded', 'Cookie': 'laravel_session2=' + cms_cokkie},
    }, (err, response, body) => {
        res.send({success: true})
    })
})


app.post('/cms/courses/delete/:id',checkAuth, (req, res) => {
    var id = req.params.id
    
    request({
        url: 'http://localhost:8001/admin/courses/' + id,
        method: 'POST',
        formData: {
            '_method': 'DELETE',
        },
        headers: {'content-type':'application/x-www-form-urlencoded', 'Cookie': 'laravel_session2=' + cms_cokkie},
    }, (err, response, body) => {
        res.send({success: true})
    })
})


var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    
    console.log("Example app listening at http://%s:%s", host, port)
})