(function () {
  function startTour() {
    if (typeof Shepherd === 'undefined') {
      console.error('Shepherd not loaded');
      return;
    }

    const tour = new Shepherd.Tour({
      defaultStepOptions: {
        cancelIcon: { enabled: true },
        classes: 'class-1 class-2',
        scrollTo: { behavior: 'smooth', block: 'center' }
      }
    });

    // Step 1: Welcome
    tour.addStep({
      id: 'welcome',
      title: 'Welcome to OnDemand',
      text: 'Here, you can access applications via graphical interface. You can start this tour anew anytime in the Help section.',
      buttons: [
        {
          action() { return this.back(); },
          classes: 'shepherd-button-secondary',
          text: 'Back'
        },
        {
          action() { return this.next(); },
          text: 'Next'
        }
      ]
    });

    // Step 2: Files menu (just highlight)
    const filesMenuSelector = 'nav a.nav-link.dropdown-toggle[title="Files"]';
    tour.addStep({
      id: 'files-menu',
      title: 'Files',
      text: 'Use the Files menu to browse, upload, and manage your files.',
      attachTo: {
        element: filesMenuSelector,
        on: 'bottom'
      },
      buttons: [
        {
          action() { return this.back(); },
          classes: 'shepherd-button-secondary',
          text: 'Back'
        },
        {
          action() { return this.next(); },
          text: 'Next'
        }
      ]
    });

    // Step 3: Home Directory (OPEN dropdown and attach to item)
    const homeDirSelector = 'a.dropdown-item[title="Home Directory"]';
    tour.addStep({
      id: 'home-directory',
      title: 'Home Directory',
      text: 'Home Directory defaults to Brno2',
      attachTo: {
        element: homeDirSelector,
        on: 'right'
      },
      beforeShowPromise() {
        return new Promise((resolve) => {
          const filesMenuEl = document.querySelector(filesMenuSelector);
          
          if (filesMenuEl) {
            // Force close first to ensure clean state
            if (filesMenuEl.classList.contains('show') || filesMenuEl.getAttribute('aria-expanded') === 'true') {
              filesMenuEl.click(); // close it
              setTimeout(() => {
                filesMenuEl.click(); // open it
                waitForElementAndResolve(homeDirSelector, resolve);
              }, 150);
            } else {
              filesMenuEl.click(); // open it
              waitForElementAndResolve(homeDirSelector, resolve);
            }
          } else {
            resolve();
          }
        });
      },
      buttons: [
        {
          action() { return this.back(); },
          classes: 'shepherd-button-secondary',
          text: 'Back'
        },
        {
          action() { return this.next(); },
          text: 'Next'
        }
      ]
    });

    // Helper function to wait for element to appear
    function waitForElementAndResolve(selector, resolve) {
      let attempts = 0;
      const maxAttempts = 50; // 5 seconds max
      
      const checkElement = () => {
        const el = document.querySelector(selector);
        if (el && el.offsetParent !== null) {
          resolve();
        } else if (attempts < maxAttempts) {
          attempts++;
          setTimeout(checkElement, 100);
        } else {
          resolve(); // resolve anyway to prevent hanging
        }
      };
      
      setTimeout(checkElement, 100);
    }

    // Start the tour
    tour.start();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startTour);
  } else {
    startTour();
  }
})();
