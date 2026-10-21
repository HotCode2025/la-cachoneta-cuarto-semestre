import math
from decimal import Decimal

# Nan (not a Number)
a = float("nan")
print(f"a: {a}")

# Modulo math
a = float("nan")
print(f"Es de tipo NaN(Not a number)?: {math.isnan(a)}")

# Modulo decimal
a = Decimal("NaN")
print(f"Es de tipo NaN(Not a number)?: {math.isnan(a)}")