(function () {
  function initializeMenu() {
    var menu = document.getElementById('theMenu');
    var toggle = document.getElementById('menuToggle');
    if (!menu || !toggle) return;

    function setMenuOpen(isOpen) {
      if (isOpen) {
        menu.classList.add('menu-open');
        toggle.classList.add('active');
        document.body.classList.add('body-push-toleft');
      } else {
        menu.classList.remove('menu-open');
        toggle.classList.remove('active');
        document.body.classList.remove('body-push-toleft');
      }
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    }

    var suppressSyntheticClick = false;

    toggle.addEventListener('touchend', function (event) {
      event.preventDefault();
      suppressSyntheticClick = true;
      window.setTimeout(function () {
        suppressSyntheticClick = false;
      }, 700);
      setMenuOpen(!menu.classList.contains('menu-open'));
    }, false);

    toggle.addEventListener('click', function (event) {
      if (suppressSyntheticClick) {
        event.preventDefault();
        suppressSyntheticClick = false;
        return;
      }
      setMenuOpen(!menu.classList.contains('menu-open'));
    });

    var links = menu.querySelectorAll('.menu-wrap a');
    for (var i = 0; i < links.length; i++) {
      links[i].addEventListener('click', function () {
        setMenuOpen(false);
      });
    }

    document.addEventListener('click', function (event) {
      if (!menu.contains(event.target) && !toggle.contains(event.target)) {
        setMenuOpen(false);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeMenu);
  } else {
    initializeMenu();
  }
}());
