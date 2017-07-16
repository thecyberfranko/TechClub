from math import factorial, sqrt

def Leibniz(iterations):
    print("Leibniz")
    Acc = 0
    for i in range(iterations):
        Acc += (-1)**i / (2*i + 1)
        print("{}: {:.14f}".format(i + 1, 4 * Acc))
    print()

def Wallis(iterations):
    print("Wallis")
    Acc = 1
    for i in range(1, iterations + 1):
        Acc *= ((2*i / (2*i - 1)) * (2*i / (2*i + 1)))
        print("{}: {:.14f}".format(i, 2 * Acc))
    print()
    
def Nilakantha(iterations):
    print("Nilakantha")
    Acc = 0
    for i in range(iterations):
        Acc += (-1)**i / ((2*i + 2) * (2*i + 3) * (2*i + 4))
        print("{}: {:.14f}".format(i + 1, 4*Acc  + 3))
    print()

def Newton(iterations):
    print("Newton")
    Acc = 0
    for i in range(0, iterations):
        Acc += (2**i * factorial(i)**2)/factorial(2*i + 1)
        print("{}: {:.14f}".format(i + 1, Acc * 2))
    print()
    
def Madhava(iterations):
    print("Madhava")
    Acc, rootConst = 0, sqrt(12)
    for i in range(iterations):
        Acc += ((-1/3)**i)/ (2*i + 1)
        print("{}: {:.14f}".format(i + 1, rootConst * Acc))
    print()
        

def Viete(iterations):
    print("Viete")
    Acc1, Acc2 = 0, 1;
    for i in range(iterations):
        Acc1 = sqrt(2 + Acc1);
        Acc2 *= Acc1/2;
        print("{}: {:.14f}".format(i + 1, Acc2**-1 * 2))
    print()

def Ramanujan(iterations):
    print("Ramanujan")
    def inside(i):
        Dividend = factorial(4*i)*(1103 + (26390 * i)) 
        Divisor = factorial(i)**4 * 396**(4*i)
        return Dividend / Divisor
    Acc = 0
    for i in range(iterations):
        Acc += inside(i)
        print("{}: {:.14f}".format(
            i + 1,
            (Acc * (2*sqrt(2)/9801))**-1))
    print()

def Chudnovsky(iterations):
    print("Chudnovsky")
    def inside(i):
        Dividend = (-1)**i * factorial(6*i) * (13591409 + 545140134*i)
        Divisor = factorial(3*i) * factorial(i)**3 * 640320**(3*i + 3/2)
        return Dividend / Divisor
    Acc = 0
    for i in range(iterations):
        Acc += inside(i)
        print("{}: {:.14f}".format(i + 1, (12 * Acc)**-1))
    print()



if __name__ == "__main__":
    Leibniz(50)
    input("Press enter to continue");
    Wallis(50)
    input("Press enter to continue");
    Nilakantha(50)
    input("Press enter to continue");
    Newton(50)
    input("Press enter to continue");
    Madhava(50)
    input("Press enter to continue");
    Viete(50)
    input("Press enter to continue");
    Ramanujan(50)
    input("Press enter to continue");
    # 18 Otherwise too large, I think to great a precision.
    Chudnovsky(18)
    input("Press enter to close");
    
