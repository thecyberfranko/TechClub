from math import factorial, sqrt, pi

# print("\033[6;3HHello")

class PiPrinter():
    
    def init(self):
        self.row_amount, self.column_amount, self.offset_inc = 60, 5, 34
        self.offset_mult, self.result, self.print_count = 0, 0, 0
        self.x, self.y = 0, 0;
        self.msg = ""
        print(self.print_count)

    def print(self):
        if (self.print_count % self.rowAmount == 0):
            if (self.print_count/self.rowAmount == columnAmount or
                    not self.print_count):
                print("\033[0,0H{}".format(self.msg))
                self.x, self.y = 0, 2
            self.x = self.offsetMult * self.offsetInc
            self.offsetMult += 1
        print("\033[{},{}H{}".format(self.x, self.y, self.result))
        

# def Leibniz(iterations):
    # print("Leibniz")
    # Acc = 0
    # for i in range(iterations):
        # Acc += (-1)**i / (2*i + 1)
        # print("{}: {:.14f}".format(i + 1, 4 * Acc))
    # print()
# 
# def Wallis(iterations):
    # print("Wallis")
    # Acc = 1
    # for i in range(1, iterations + 1):
        # Acc *= ((2*i / (2*i - 1)) * (2*i / (2*i + 1)))
        # print("{}: {:.14f}".format(i, 2 * Acc))
    # print()
    # 
# def Nilakantha(iterations):
    # print("Nilakantha")
    # Acc = 0
    # for i in range(iterations):
        # Acc += (-1)**i / ((2*i + 2) * (2*i + 3) * (2*i + 4))
        # print("{}: {:.14f}".format(i + 1, 4*Acc  + 3))
    # print()
# 
# def Newton(iterations):
    # print("Newton")
    # Acc = 0
    # for i in range(0, iterations):
        # Acc += (2**i * factorial(i)**2)/factorial(2*i + 1)
        # print("{}: {:.14f}".format(i + 1, Acc * 2))
    # print()
    # 
# def Madhava(iterations):
    # print("Madhava")
    # Acc, rootConst = 0, sqrt(12)
    # for i in range(iterations):
        # Acc += ((-1/3)**i)/ (2*i + 1)
        # print("{}: {:.14f}".format(i + 1, rootConst * Acc))
    # print()
        # 
# 
# def Viete(iterations):
    # print("Viete")
    # Acc1, Acc2 = 0, 1;
    # for i in range(iterations):
        # Acc1 = sqrt(2 + Acc1);
        # Acc2 *= Acc1/2;
        # print("{}: {:.14f}".format(i + 1, Acc2**-1 * 2))
    # print()
# 
# def Ramanujan(iterations):
    # print("Ramanujan")
    # def inside(i):
        # Dividend = factorial(4*i)*(1103 + (26390 * i)) 
        # Divisor = factorial(i)**4 * 396**(4*i)
        # return Dividend / Divisor
    # Acc = 0
    # for i in range(iterations):
        # Acc += inside(i)
        # print("{}: {:.14f}".format(
            # i + 1,
            # (Acc * (2*sqrt(2)/9801))**-1))
    # print()
# 
# def Chudnovsky(iterations):
    # print("Chudnovsky")
    # def inside(i):
        # Dividend = (-1)**i * factorial(6*i) * (13591409 + 545140134*i)
        # Divisor = factorial(3*i) * factorial(i)**3 * 640320**(3*i + 3/2)
        # return Dividend / Divisor
    # Acc = 0
    # for i in range(iterations):
        # Acc += inside(i)
        # print("{}: {:.14f}".format(i + 1, (12 * Acc)**-1))
    # print()

if __name__ == "__main__":
    # Leibniz(20)
    # Wallis(19)
    # Nilakantha(10)
    # Newton(10)
    # Madhava(8)
    # Viete(7)
    # Ramanujan(2)
    # Chudnovsky(2)
    pi = PiPrinter()
    pi.msg = "This is a test"
    # pi.print()
