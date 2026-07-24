import { useState, useMemo } from "react";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "ZMW",
    maximumFractionDigits: 0,
  }).format(value);

export default function FinanceCalculator() {
  const [price, setPrice] = useState(800000);
  const [downPayment, setDownPayment] = useState(100000);
  const [rate, setRate] = useState(6.5);
  const [months, setMonths] = useState(60);

  const monthlyPayment = useMemo(() => {
    const principal = price - downPayment;
    if (principal <= 0) return 0;
    const r = rate / 100 / 12;
    const n = months;
    return (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  }, [price, downPayment, rate, months]);

  const totalInterest = useMemo(() => {
    const principal = price - downPayment;
    return monthlyPayment * months - principal;
  }, [monthlyPayment, months, price, downPayment]);

  return (
    <section id="finance" aria-labelledby="finance-heading" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2
            id="finance-heading"
            className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Calculate Your Payment
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Estimate your monthly payment in seconds.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-accent p-8 backdrop-blur-xl max-w-4xl mx-auto">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="space-y-8">
              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-muted-foreground mb-2"
                >
                  Vehicle Price: {formatCurrency(price)}
                </label>
                <input
                  id="price"
                  type="range"
                  min="200000"
                  max="1200000"
                  step="10000"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full accent-primary"
                  aria-valuemin={200000}
                  aria-valuemax={1200000}
                  aria-valuenow={price}
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>K200,000</span>
                  <span>K1.2m</span>
                </div>
              </div>

              <div>
                <label
                  htmlFor="downPayment"
                  className="block text-sm font-medium text-muted-foreground mb-2"
                >
                  Down Payment: {formatCurrency(downPayment)}
                </label>
                <input
                  id="downPayment"
                  type="range"
                  min="0"
                  max="400000"
                  step="5000"
                  value={downPayment}
                  onChange={(e) => setDownPayment(Number(e.target.value))}
                  className="w-full accent-primary"
                  aria-valuemin={0}
                  aria-valuemax={400000}
                  aria-valuenow={downPayment}
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>K0</span>
                  <span>K400,000</span>
                </div>
              </div>

              <div>
                <label
                  htmlFor="rate"
                  className="block text-sm font-medium text-muted-foreground mb-2"
                >
                  Interest Rate: {rate.toFixed(1)}%
                </label>
                <input
                  id="rate"
                  type="range"
                  min="3"
                  max="12"
                  step="0.1"
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                  className="w-full accent-primary"
                  aria-valuemin={3}
                  aria-valuemax={12}
                  aria-valuenow={rate}
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>3%</span>
                  <span>12%</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-3">
                  Loan Term
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[36, 48, 60, 72].map((term) => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => setMonths(term)}
                      className={`rounded-lg py-2.5 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-ring ${
                        months === term
                          ? "bg-primary text-primary-foreground"
                          : "bg-accent text-muted-foreground hover:bg-accent/80"
                      }`}
                    >
                      {term / 12}yr
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center rounded-xl bg-background p-8 border border-border">
              <p className="text-sm font-medium text-muted-foreground mb-2">
                Estimated Monthly Payment
              </p>
              <p className="text-2xl md:text-5xl font-bold text-foreground" aria-live="polite">
                {formatCurrency(monthlyPayment)}
              </p>
              <div className="mt-6 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Interest</span>
                  <span className="text-foreground">
                    {formatCurrency(totalInterest)}
                  </span>
                </div>
                <div className="h-px bg-border" aria-hidden="true" />
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Loan Amount</span>
                  <span className="text-foreground">
                    {formatCurrency(price - downPayment)}
                  </span>
                </div>
              </div>
              <a
                href="#contact"
                className="mt-8 inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-colors hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring"
              >
                Apply for Financing
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
