#include <cmath>
#include <iostream>
#include <iomanip>
#include <windows.h>
#include <string>

class PiPrinter
{
    private:
        const long double PI = 3.141592653589793238462643383279502884L;
        const HANDLE screen = GetStdHandle(STD_OUTPUT_HANDLE);
        const int rowAmount = 54, columnAmount = 5, offsetInc = 34;
        int offsetMult = 0, printCount = 0;
        COORD position;
        double result;
        std::string Msg;
        unsigned int tune(double n, int decimalPlaces);
        double factorial(double n);
        void setPrint(std::string name, int decimalPlaces);
        void print();
        double insideRamanujan(int i);
        double insideChudnovsky(int i);
    public:
        PiPrinter() {std::cout << std::left << std::setprecision(20);}
        void Leibniz(int decimalPlaces);
        void Wallis(int decimalPlaces);
        void Nilakantha(int decimalPlaces);
        void Newton(int decimalPlaces);
        void Madhava(int decimalPlaces);
        void Viete(int decimalPlaces);
        void Ramanujan(int decimalPlaces);
        void Chudnovsky(int decimalPlaces);
};

unsigned int PiPrinter::tune(double n, int decimalPlaces)
{
    return n * std::pow(10, decimalPlaces);
};

double PiPrinter::factorial(double n)
{
    // Should have better performance than recusive solution.
    double acc = 1;
    while (n)
        acc *= n--;
    return acc;
}

void PiPrinter::print()
{
    if (printCount % rowAmount == 0) {
        if (printCount / rowAmount >= columnAmount || !printCount) {
            system("cls");
            SetConsoleCursorPosition(screen, {0, 0});
            std::cout << Msg;
            offsetMult = 0;
        }
        position.X = offsetMult++ * offsetInc;
        position.Y = 2;
    }
    SetConsoleCursorPosition(screen, position);
    std::cout << ++printCount << ": " << result;
    position.Y++;
}

void PiPrinter::setPrint(std::string name, int decimalPlaces)
{
    Msg = name + " to " + std::to_string(decimalPlaces) + " decimal places";
    printCount = 0;
}

void PiPrinter::Wallis(int decimalPlaces)
{
    // Series begins with 1.
    char a;
    int target = tune(PI, decimalPlaces), i = 1;
    double acc = 1;
    result = 0;
    setPrint("Wallis", decimalPlaces);
    while (tune(result, decimalPlaces) != target) {
        acc *= ((2.0*i / (2*i - 1)) * (2.0*i / (2*i + 1)));
        result = 2 * acc;
        print();
        ++i;
    }
    system("pause");
}

void PiPrinter::Leibniz(int decimalPlaces)
{
    int target = tune(PI, decimalPlaces), i = 0;
    double acc = 0;
    result = 0;
    setPrint("Leibniz", decimalPlaces);
    while (tune(result, decimalPlaces) != target) {
        acc += std::pow((-1), i) / (2*i + 1);
        result = 4 * acc;
        print();
        ++i;
    }
    system("pause");
}

void PiPrinter::Nilakantha(int decimalPlaces)
{
    int target = tune(PI, decimalPlaces), i = 0;
    double acc = 0;
    result = 0;
    setPrint("Nilakantha", decimalPlaces);
    while (tune(result, decimalPlaces) != target) {
        acc += std::pow((-1), i) / ((2*i + 2) * (2*i + 3) * (2*i + 4));
        result = 4 * acc + 3;
        print();
        ++i;
    }
    system("pause");
}

void PiPrinter::Newton(int decimalPlaces)
{
    int target = tune(PI, decimalPlaces), i = 0;
    double acc = 0;
    result = 0;
    setPrint("Newton", decimalPlaces);
    while (tune(result, decimalPlaces) != target) {
        acc += (std::pow(2, i) * std::pow(factorial(i), 2)) / factorial(2*i + 1);
        result = 2 * acc;
        print();
        ++i;
    }
    std::cout << std::endl;
    system("pause");
}

void PiPrinter::Madhava(int decimalPlaces)
{
    const double root = sqrt(12);
    int target = tune(PI, decimalPlaces), i = 0;
    double acc= 0;
    result = 0;
    setPrint("Madhava", decimalPlaces);
    while (tune(result, decimalPlaces) != target) {
        acc += std::pow((-1.0/3), i)/ (2*i + 1);
        result = root * acc;
        print();
        ++i;
    }
    std::cout << std::endl;
    system("pause");
}

void PiPrinter::Viete(int decimalPlaces)
{
    int target = tune(PI, decimalPlaces), i = 0;
    double acc1 = 0, acc2 = 1;
    result = 0;
    setPrint("Viete", decimalPlaces);
    while (tune(result, decimalPlaces) != target) {
        acc1 = sqrt(2 + acc1);
        acc2 *= acc1/2;
        result = std::pow(acc2, -1) * 2;
        print();
        ++i;
    }
    std::cout << std::endl;
    system("pause");
}

double PiPrinter::insideRamanujan(int printCount)
{
   double Dividend = factorial(4*printCount)*(1103 + (26390 * printCount)),
          Divisor = std::pow(factorial(printCount), 4) * std::pow(396, (4*printCount));
   return Dividend / Divisor;
};

void PiPrinter::Ramanujan(int decimalPlaces)
{
    int target = tune(PI, decimalPlaces), i = 0;
    double acc = 0;
    result = 0;
    setPrint("Ramanujan", decimalPlaces);
    while (tune(result, decimalPlaces) != target) {
        const double ratio = (2*sqrt(2)/9801);
        acc += insideRamanujan(printCount);
        result = std::pow(ratio * acc, -1);
        print();
        ++i;
    }
    std::cout << std::endl;
    system("pause");
}

double PiPrinter::insideChudnovsky(int printCount)
{
    double Dividend = 1, Divisor = 1;
    Dividend *= std::pow((-1), printCount) * factorial(6*printCount);
    Dividend *= 13591409 + 545140134*printCount;
    Divisor *= factorial(3*printCount) * std::pow(factorial(printCount), 3);
    Divisor *= std::pow(640320, (3*printCount + 3.0/2));
    return Dividend / Divisor;
};

void PiPrinter::Chudnovsky(int decimalPlaces)
{
    int target = tune(PI, decimalPlaces), i = 0;
    double acc = 0;
    result = 0;
    setPrint("Chudnovsky", decimalPlaces);
    while (tune(result, decimalPlaces) != target) {
        acc += insideChudnovsky(printCount);
        result = std::pow(12 * acc, -1);
        print();
        ++i;
    }
    std::cout << std::endl;
    system("pause");
}

int main()
{
    PiPrinter pi;
    system("cls");
    pi.Wallis(1);
    pi.Wallis(2);
    pi.Leibniz(2);
    pi.Nilakantha(7);
    pi.Newton(14);
    pi.Madhava(14);
    pi.Viete(14);
    pi.Ramanujan(14);
    pi.Chudnovsky(14);
    return 0;
}
