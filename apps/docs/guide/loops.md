# Loops

Iterating in JugaadLang is intuitive and fun.

## Standard For Loop

- `ghumo` - Maps to `for`

```jug
ghumo rakho i = 0; i < 5; i++:
    bolo("Ghoom raha hai: " + i)
```

## For...of and For...in

Iterate over arrays and objects easily:

```jug
rakho dost = ["Raju", "Shyam", "Babu Rao"]

ghumo rakho naam ka dost:
    bolo(naam)

rakho paise = { raju: 10, shyam: 20 }
ghumo rakho k mein paise:
    bolo(k + " = " + paise[k])
```

## While Loops

- `jabtak` - Maps to `while`
- `karo` - Maps to `do`

```jug
rakho i = 0
jabtak i < 5:
    bolo(i)
    i++

karo:
    bolo("Ek baar to chalega")
jabtak i < 0
```
