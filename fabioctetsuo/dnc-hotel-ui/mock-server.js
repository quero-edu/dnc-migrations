const jsonServer = require('json-server');
const jwt = require('jsonwebtoken');

const app = jsonServer.create();
const router = jsonServer.router('db.json');

const MOCKED_SECRET = "your-secret-key";

app.db = router.db;

app.use(jsonServer.bodyParser);

app.post('/auth/login', (req, res) => {
    const body = req.body;
    
    const user = app.db
        .get('users')
        .find({ email: body.email, password: body.password })
        .value();

    if (user) {
        const access_token = jwt.sign(
            { email: user.email, sub: user.id },
            MOCKED_SECRET,
            { expiresIn: '1h'}
        )

        res.status(201).jsonp({ access_token })
    } else {
        res.status(401).jsonp({ message: 'Not authorized' })
    }
})

app.post('/auth/register', (req, res) => {
    const body = req.body;
    const users = app.db.get('users').value();
    console.log({users})
    const id = users.length ? Math.max(...users.map(user => user.id)) : 1

    
    const newUser = {
        ...body,
        id: id + 1,
        avatar: null,
        createdAt: new Date().toISOString()
    };
    app.db.get('users').push(newUser).write()

    return res.status(201).jsonp(newUser)
})

app.post('/auth/forgot-password', (req, res) => {
    res.status(201).send('A verification code has been sent to fabio@teste.com')
})

app.patch('/auth/reset-password', (req, res) => {
    console.log('cheguei \n\n\n\n\n')
    res.status(201).send({
        access_token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsIm5hbWUiOiJGZWxpY2lhIFRlc3RlIiwiaWF0IjoxNzIyMDE3NTA3LCJleHAiOjE3MjIxMDM5MDcsImF1ZCI6InVzZXJzIiwiaXNzIjoiZG5jX2hvdGVsIn0.WQw1JuFsnBLrgX6q1Dg-vxCux_gVSB5-gdv3SBpg2v0",
      })
})

app.post('/users/avatar', (req, res) => {
    res.status(201).jsonp({
        "id": 1,
        "email": "fabio@teste.com",
        "name": "Fabio Tetsuo",
        "role": "ADMIN",
        "avatar": "3fa9959b-5883-4eeb-ac8f-89ff7d9b2b84tester.jpg",
        "createdAt": "2024-07-28T16:25:58.655Z"
    })
})

app.get('/hotels', (req, res) => {
    const page = Number(req.query.page) || 1;
    const perPage = Number(req.query.limit) || 10;

    const hotels = app.db.get('hotels').value();

    const total = hotels.length;
    
    const start = (page - 1) * perPage;
    const end = start + perPage;

    const paginatedHotels = hotels.slice(start, end);

    res.status(200).jsonp({
        total,
        page: page,
        per_page: perPage,
        data: paginatedHotels,
    })
})

app.post('/hotels', (req, res) => {
    res.status(201).jsonp({
        "id": 3,
        "name": "Hotel Beira Mar",
        "description": "Hotel de frente para praia",
        "address": "Rua da praia, 123",
        "image": null,
        "price": 480,
        "ownerId": 4,
        "createdAt": "2024-08-11T17:16:49.100Z",
        "updatedAt": "2024-08-11T17:16:49.100Z"
    })
})


app.patch('/hotels/:id', (req, res) => {
    res.status(201).jsonp({
        "id": 3,
        "name": "Hotel Beira Mar",
        "description": "Hotel de frente para praia",
        "address": "Rua da praia, 123",
        "image": null,
        "price": 480,
        "ownerId": 4,
        "createdAt": "2024-08-11T17:16:49.100Z",
        "updatedAt": "2024-08-11T17:16:49.100Z"
    })
})

app.patch('/hotels/image/:id', (req, res) => {
    res.status(200).jsonp({
        "id": 3,
        "name": "Hotel Beira Mar",
        "description": "Hotel de frente para praia",
        "address": "Rua da praia, 123",
        "image": "1a4e0b0e-1849-4c56-be6d-3ce52a29ecechotel1.jpg",
        "price": 480,
        "ownerId": 4,
        "createdAt": "2024-08-11T17:16:49.100Z",
        "updatedAt": "2024-08-11T17:17:33.082Z"
    })
})

app.get('/hotels/owner', (req, res) => {
    const hotels = app.db.get('hotels').value();
    res.status(200).jsonp(hotels)
})

app.post('/reservations', (req, res) => {
    res.status(201).jsonp({
        id: 1,
        userId: 3,
        hotelId: 2,
        checkIn: "2024-08-30T03:00:00.000Z",
        checkOut: "2024-09-05T03:00:00.000Z",
        total: -7674,
        status: "PENDING",
        createdAt: "2024-08-10T21:06:07.818Z",
        updatedAt: "2024-08-10T21:06:07.818Z"
    })
})

app.get('/reservations/user', (req, res) => {
    const reservations = app.db.get('reservations').value();
    res.status(200).jsonp(reservations)
})

app.get('/reservations/hotel/:id', (req, res) => {
    const reservations = app.db.get('reservations').value();
    res.status(200).jsonp(reservations)
})

app.use(router);
app.listen(3000);