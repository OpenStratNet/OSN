Template.joinUs.onRendered(function () {
  // if scrolling is necessary $("html, body").animate({ scrollTop: 0 });
  window.scrollTo(0, 0);
});

Template.joinUs.events({
  'click .js-scrollToForm': function (evt, tpl) {
    evt.preventDefault();
    $('html, body').animate({
        scrollTop: $('#js-scrollStop').offset().top - 35
    }, 2000);
  }
});