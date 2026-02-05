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

    // step 1: welcome
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
    
    // step 2: Files menu
    const filesMenuSelector = 'nav a.nav-link.dropdown-toggle[title="Files"]';
    tour.addStep({
        id: 'files-menu',
        title: 'Files',
        text: 'Use the Files menu to browse, upload, and manage your files.',
        attachTo: {
          element: filesMenuSelector,
          on: 'bottom'
        },
        beforeShowPromise() {
          const el = document.querySelector(filesMenuSelector);
          if (el && !el.classList.contains('show')) {
            el.click(); // open the dropdown
          }
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
    tour.start();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startTour);
  } else {
    startTour();
  }
})();
