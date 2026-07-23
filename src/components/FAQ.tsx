import { useState, useRef } from 'react';

const faqs = [
  { question: 'How does financing work?', answer: 'We partner with 20+ top lenders to get you pre-approved in minutes. Our finance team reviews your budget and finds the best rates available—often better than going direct to the bank. Apply online or visit the dealership.' },
  { question: 'What is your trade-in process?', answer: 'Get a fair market value estimate instantly through our online appraisal tool. We evaluate your vehicle using current market data and make a transparent offer on the spot—no negotiations, no pressure.' },
  { question: 'Can I test drive a vehicle?', answer: 'Absolutely. Schedule a test drive online or by phone. We offer flexible same-day and next-day slots, including evenings and weekends for your convenience.' },
  { question: 'Are vehicles certified inspected?', answer: 'Every vehicle undergoes a comprehensive 150-point inspection covering brakes, tires, engine, transmission, electronics, and safety systems. We provide a full inspection report you can review before purchase.' },
  { question: 'Do you offer warranties?', answer: 'Yes. All certified pre-owned vehicles include a warranty up to 7 years/100,000 miles. Extended warranty options are available for most models at competitive rates.' },
  { question: 'Can I get a vehicle delivered?', answer: 'We offer home delivery within a 50-mile radius at no cost. For farther locations, we partner with trusted auto transporters and coordinate the entire process for you.' },
  { question: 'What payment methods do you accept?', answer: 'We accept cash, certified checks, bank wire transfers, and all major credit/debit cards. Financing through our lending partners is also available.' }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);
  const contentRefs = useRef([]);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" aria-labelledby="faq-heading" className="py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 id="faq-heading" className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Frequently Asked Questions</h2>
          <p className="mt-4 text-lg text-muted-foreground">Everything you need to know about buying from Premier Auto Sales.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl border border-border bg-accent transition-colors data-[open=true]:border-primary/30"
                data-open={isOpen}
              >
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${index}`}
                    onClick={() => toggle(index)}
                    className="flex w-full items-center justify-between gap-4 p-6 text-left focus-visible:ring-2 focus-visible:ring-ring rounded-2xl"
                  >
                    <span className="text-base font-semibold text-foreground">{item.question}</span>
                    <svg
                      className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </h3>
                <div
                  id={`faq-panel-${index}`}
                  role="region"
                  aria-labelledby={`faq-question-${index}`}
                  className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <div ref={(el) => { contentRefs.current[index] = el; }} className="px-6 pb-6">
                    <p className="text-muted-foreground">{item.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
