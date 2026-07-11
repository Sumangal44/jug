# Functions

Functions in JugaadLang are powerful and map exactly to JS capabilities.

## Basic Functions

- `banao` - Maps to `function`
- `wapas` - Maps to `return`

```jug
banao jod(a, b):
    wapas a + b

bolo(jod(5, 5)) // Output: 10
```

## Arrow Functions

You can use the standard JavaScript arrow syntax `=>`.

```jug
rakho jodArrow = (a, b) => a + b
```

## Generators

Generate iterators using `banao*` and yield values using `baanto`.

```jug
banao* numbers():
    baanto 1
    baanto 2
    baanto 3

rakho gen = numbers()
bolo(gen.next().value) // Output: 1
```
