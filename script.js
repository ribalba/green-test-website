const state = {
  watts: 42.7,
  kwh: 0.184,
  containers: 38,
  meter: 34
};

function updateTelemetry() {
  state.watts = Math.max(15, state.watts + (Math.random() - 0.48) * 4.6);
  state.kwh = Math.max(0.01, state.kwh + Math.random() * 0.004);
  state.containers = Math.max(
    1,
    Math.round(state.containers + (Math.random() > 0.65 ? 1 : 0) - (Math.random() > 0.8 ? 1 : 0))
  );
  state.meter = Math.max(10, Math.min(96, state.meter + (Math.random() - 0.5) * 10));

  const wattsNode = document.querySelector('[data-live="watts"]');
  const kwhNode = document.querySelector('[data-live="kwh"]');
  const containersNode = document.querySelector('[data-live="containers"]');
  const timeNode = document.querySelector('[data-live="time"]');
  const meterNode = document.querySelector("[data-live-meter]");

  if (wattsNode) wattsNode.textContent = state.watts.toFixed(1);
  if (kwhNode) kwhNode.textContent = state.kwh.toFixed(3);
  if (containersNode) containersNode.textContent = String(state.containers);
  if (timeNode) timeNode.textContent = new Date().toLocaleTimeString();
  if (meterNode) meterNode.style.width = `${state.meter.toFixed(1)}%`;
}

function setupReveal() {
  const items = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window)) {
    items.forEach((item) => item.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  items.forEach((item) => observer.observe(item));
}

setupReveal();
updateTelemetry();
setInterval(updateTelemetry, 1800);
