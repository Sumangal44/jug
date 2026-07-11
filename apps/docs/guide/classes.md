# Classes

Object-Oriented Programming is fully supported using standard ECMAScript 2026 class syntax.

## Class Definition

- `ustad` - Maps to `class`
- `shuru` - Maps to `constructor`
- `khud` - Maps to `this`

```jug
ustad Insaan:
    banao shuru(naam):
        khud.naam = naam
    
    banao hello():
        bolo("Namaste, mera naam " + khud.naam + " hai.")
```

## Inheritance

- `virasat` - Maps to `extends`
- `maha_ustad` - Maps to `super`

```jug
ustad Developer virasat Insaan:
    banao shuru(naam, bhasha):
        maha_ustad(naam)
        khud.bhasha = bhasha

    banao code():
        bolo("Main " + khud.bhasha + " mein code karta hu.")

rakho dev = naya Developer("Sumu", "JugaadLang")
dev.hello()
dev.code()
```
