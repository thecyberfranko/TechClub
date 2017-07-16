#include <cmath>
#include <iostream>
#include <iomanip>

double factorial(double n)
{
  return (n == 1 || n == 0) ? 1 : factorial(n - 1) * n;
}

void Leibniz(int iterations)
{
    std::cout << "Leibniz" << std::endl;
    double Acc = 0;
    for (int i = 0; i < iterations; ++i) {
        Acc += std::pow((-1), i) / (2*i + 1);
        std::cout << "Iteration " << i + 1 << ": " << 4 * Acc << std::endl;
    }
    std::cout << std::endl;
}

void Wallis(int iterations)
{
    std::cout << "Wallis" << std::endl;
    double Acc = 1;
    for (int i = 1; i < iterations + 1; ++i) {
        Acc *= ((2.0*i / (2*i - 1)) * (2.0*i / (2*i + 1)));
        std::cout << "Iteration " << i << ": " << 2 * Acc << std::endl;
    }
    std::cout << std::endl;
}

void Nilakantha(int iterations)
{
    std::cout << "Nilakantha" << std::endl;
    double Acc = 0;
    for (int i = 0; i < iterations; ++i) {
        Acc += std::pow((-1), i) / ((2*i + 2) * (2*i + 3) * (2*i + 4));
        std::cout << "Iteration " << i + 1 << ": " << 4 * Acc + 3 << std::endl;
    }
    std::cout << std::endl;
}

void Newton(int iterations)
{
    std::cout << "Newton" << std::endl;
    double Acc = 0;
    for (int i = 0; i < iterations; ++i) {
        Acc += (std::pow(2, i) * std::pow(factorial(i), 2)) / factorial(2*i + 1);
        std::cout << "Iteration " << i + 1 << ": " << 2 * Acc << std::endl;
    }
    std::cout << std::endl;
}

void Madhava(int iterations)
{
    std::cout << "Madhava" << std::endl;
    const double root = sqrt(12);
    double Acc= 0;
    for (int i = 0; i < iterations; ++i) {
        Acc += std::pow((-1.0/3), i)/ (2*i + 1);
        std::cout << "Iteration " << i + 1 << ": " << root * Acc << std::endl;
    }
    std::cout << std::endl;
}

void Viete(int iterations)
{
    std::cout << "Viete" << std::endl;
    double Acc1 = 0, Acc2 = 1;
    for (int i = 0; i < iterations; ++i) {
        Acc1 = sqrt(2 + Acc1);
        Acc2 *= Acc1/2;
        std::cout << "Iteration " << i + 1 << ": " << std::pow(Acc2, -1) * 2
                  << std::endl;
    }
    std::cout << std::endl;
}

double insideRamanujan(int printCount)
{
   double Dividend = factorial(4*printCount)*(1103 + (26390 * printCount)),
          Divisor = std::pow(factorial(printCount), 4) * std::pow(396, (4*printCount));
   return Dividend / Divisor;
};

void Ramanujan(int iterations)
{
    std::cout << "Ramanujan" << std::endl;
    double Acc = 0;
    for (int i = 0; i < iterations; ++i) {
        const double ratio = (2*sqrt(2)/9801);
        Acc += insideRamanujan(i);
        std::cout << "Iteration " << i + 1 << ": " << std::pow(ratio * Acc, -1)
                  << std::endl;
    }
    std::cout << std::endl;
}

double insideChudnovsky(int printCount)
{
    double Dividend = 1, Divisor = 1;
    Dividend *= std::pow((-1), printCount) * factorial(6*printCount);
    Dividend *= 13591409 + 545140134*printCount;
    Divisor *= factorial(3*printCount) * std::pow(factorial(printCount), 3);
    Divisor *= std::pow(640320, (3*printCount + 3.0/2));
    return Dividend / Divisor;
};

void Chudnovsky(int iterations)
{
    std::cout << "Chudnovsky" << std::endl;
    double Acc = 0;
    for (int i = 0; i < iterations; ++i) {
        Acc += insideChudnovsky(i);
        std::cout << "Iteration " << i + 1 << ": " << std::pow(12 * Acc, -1)
                  << std::endl;
    }
    std::cout << std::endl;
}

int main()
{
    std::cout << std::setprecision(20);
    Wallis(50);
    std::cin.get();
    Leibniz(50);
    std::cin.get();
    Nilakantha(50);
    std::cin.get();
    Newton(50);
    std::cin.get();
    Madhava(50);
    std::cin.get();
    Viete(50);
    std::cin.get();
    Ramanujan(43);
    std::cin.get();
    Chudnovsky(29);
    std::cin.get();
    return 0;
}
