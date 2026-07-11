# Introduction to JugaadLang

JugaadLang is a highly-performant, ECMAScript 2026 compatible programming language that uses Hindi keywords for syntax.

## Why JugaadLang?

1. **Native Feel:** Write code using natural Hindi/Hinglish keywords (`banao`, `agar`, `ghumo`).
2. **Extreme Performance:** Compiles directly to JavaScript (ESM) and executes directly on V8.
3. **Ecosystem Ready:** Supports dynamic imports, classes, async/await, and a robust micro-framework `@jugaad/web`.

## Quick Start

```jug
lao server se "@jugaad/web"

rakho app = server()

app.aao("/", banao(req, res):
    res.jawab("Namaste Duniya from JugaadWeb!")
)

app.sunno(3000, banao():
    bolo("Server chal raha hai port 3000 par!")
)
```
