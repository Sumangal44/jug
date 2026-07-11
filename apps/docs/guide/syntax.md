# Syntax & Flow

JugaadLang brings native Hindi to your programming logic while mapping 1:1 with standard JavaScript.

## Variable Declarations

There are three ways to declare variables:

- `rakho` - Maps to `let` (mutable variable)
- `pakka` - Maps to `const` (immutable constant)
- `maanlo` - Maps to `var` (function-scoped variable)

```jug
rakho a = 10
pakka pi = 3.14
maanlo naam = "Sumu"
```

## Control Flow (If / Else)

Standard conditional branching:

- `agar` - Maps to `if`
- `shayad` - Maps to `else if`
- `warna` - Maps to `else`

```jug
agar a > 10:
    bolo("Bada hai")
shayad a < 10:
    bolo("Chhota hai")
warna:
    bolo("Barabar hai")
```

## Switch Statements

- `chuno` - Maps to `switch`
- `mamla` - Maps to `case`
- `warna_sab` - Maps to `default`
- `rukja` - Maps to `break`

```jug
chuno naam:
    mamla "Sumu":
        bolo("Namaste")
        rukja
    warna_sab:
        bolo("Kaun hai tu?")
```
