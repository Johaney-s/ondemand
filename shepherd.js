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

    tour.start();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startTour);
  } else {
    startTour();
  }
})();
