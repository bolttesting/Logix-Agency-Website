'use client';

import { useState, useEffect } from 'react';

export default function ServicesList() {
  const [activeService, setActiveService] = useState(0);
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch('/api/services')
      .then((res) => res.json())
      .then(setServices)
      .catch(() => setServices([]));
  }, []);

  if (services.length === 0) {
    return (
      <section className="py-[80px] bg-white">
        <div className="container mx-auto px-6 md:px-12 max-w-7xl">
          <p className="text-gray-500 text-center">Loading services...</p>
        </div>
      </section>
    );
  }

  const currentService = services[activeService] || services[0];

  return (
    <section className="py-[80px] bg-white">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <div className="sticky top-32 space-y-4">
              {services.map((service, index) => (
                <button
                  key={service.id}
                  onClick={() => setActiveService(index)}
                  className={`w-full text-left p-6 rounded-2xl transition-all duration-300 ${
                    activeService === index ? 'bg-black text-white' : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-3xl">{service.icon}</span>
                    <div>
                      <h3 className="text-xl font-bold">{service.title}</h3>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">{currentService.title}</h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">{currentService.description}</p>
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wide text-black mb-4">What we offer</h4>
                  <ul className="space-y-2">
                    {(currentService.features || []).map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="w-2 h-2 bg-[#0062a2] rounded-full flex-shrink-0 mt-2"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wide text-black mb-4">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {(currentService.tech || []).map((t, idx) => (
                      <span
                        key={idx}
                        className="bg-white border border-gray-200 px-4 py-2 rounded-full text-sm font-semibold"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
