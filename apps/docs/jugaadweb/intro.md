# JugaadWeb Framework

`@jugaad/web` is a blazing fast, zero-dependency micro-framework built exclusively for JugaadLang.

## Setup a Server

```jug
lao { banaoServer } se "@jugaad/web"

rakho app = banaoServer()
```

## Routing

Routes use simple, native Hindi terms for HTTP methods:

- `aao` (GET) - For incoming requests.
- `bhejo` (POST) - For sending data.
- `rakho` (PUT) - For updating/placing data.
- `hatao` (DELETE) - For deleting data.

```jug
app.aao("/hello", banao(req, res):
    res.jawab("Namaste!")
)

app.bhejo("/data", banao(req, res):
    res.json({ message: "Data received", body: req.jism })
)
```

## Listening on a Port

Start the server using `sunno` (listen):

```jug
app.sunno(3000, banao():
    bolo("Server port 3000 par sunn raha hai...")
)
```
