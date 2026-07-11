# Async & Await

JugaadLang supports top-level async and promises out of the box!

## Async Functions

- `tez` - Maps to `async`
- `intezaar` - Maps to `await`

```jug
tez banao dataLao():
    rakho data = intezaar Vaada.resolve("API Data")
    wapas data

tez banao run():
    rakho result = intezaar dataLao()
    bolo(result)

intezaar run()
```

## Promises

The global `Promise` object is aliased to `Vaada`.

```jug
rakho meraVaada = naya Vaada(banao(resolve, reject):
    resolve("Ho gaya!")
)

meraVaada.then(banao(res):
    bolo(res)
)
```
