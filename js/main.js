(function () {
  var lastScroll = 0;
  var header = document.querySelector(".main-header");
  var footer = document.querySelector(".site-footer");
  var sentinel = document.querySelector(".page-end-sentinel");

  // Header que desaparece ao rolar para baixo
  window.addEventListener("scroll", function () {
    var current = window.pageYOffset || document.documentElement.scrollTop || 0;

    if (current > lastScroll && current > 72) {
      header.classList.add("header--hidden");
    } else {
      header.classList.remove("header--hidden");
    }

    lastScroll = current <= 0 ? 0 : current;
  });

  // Footer só aparece no final da página
  if ("IntersectionObserver" in window && sentinel) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            footer.classList.add("footer--visible");
          } else {
            footer.classList.remove("footer--visible");
          }
        });
      },
      {
        threshold: 0.2,
      }
    );

    observer.observe(sentinel);
  } else {
    // Fallback: se o browser não suportar IntersectionObserver, deixa o footer sempre visível
    footer.classList.add("footer--visible");
  }
})();