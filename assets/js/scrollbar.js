function createScrollbar() {
  const scrollbar = document.createElement("div");
  scrollbar.id = "custom-scrollbar";
  const thumb = document.createElement("div");
  thumb.className = "scrollbar-thumb";
  scrollbar.appendChild(thumb);
  document.body.appendChild(scrollbar);
  return { scrollbar, thumb };
}

function updateScrollbar(thumb, scrollbar) {
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;
  const scrollTop = window.scrollY;

  if (scrollTop <= 0) {
    scrollbar.classList.remove("visible");
  } else {
    scrollbar.classList.add("visible");
  }

  const scrollPercent = windowHeight / documentHeight;
  const thumbHeight = Math.max(windowHeight * scrollPercent, 30); // min 30px height
  thumb.style.height = `${thumbHeight}px`;

  const scrollRange = documentHeight - windowHeight;
  const thumbPosition =
    (scrollTop / scrollRange) * (windowHeight - thumbHeight - 24); // margins adjustments
  thumb.style.transform = `translateY(${thumbPosition}px)`;

  scrollbar.style.height = `${windowHeight}px`;
}

document.addEventListener("DOMContentLoaded", () => {
  const { scrollbar, thumb } = createScrollbar();

  window.addEventListener("scroll", () => {
    updateScrollbar(thumb, scrollbar);
  });

  window.addEventListener("resize", () => {
    updateScrollbar(thumb, scrollbar);
  });

  updateScrollbar(thumb, scrollbar);

  let isDragging = false;
  let startY = 0;
  let startScroll = 0;

  thumb.addEventListener("mousedown", (e) => {
    isDragging = true;
    startY = e.clientY;
    startScroll = window.scrollY;
    document.body.style.userSelect = "none";
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    const delta = e.clientY - startY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollRange = documentHeight - windowHeight;
    const thumbHeight = parseInt(thumb.style.height);
    const scrollableHeight = windowHeight - thumbHeight - 24; // margins adjustments

    const scrollAmount = (delta / scrollableHeight) * scrollRange;
    window.scrollTo(0, startScroll + scrollAmount);
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
    document.body.style.userSelect = "";
  });
});
