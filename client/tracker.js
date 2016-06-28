// Tracker
Tracker.autorun(function () {
 var current = Router.current();
 Tracker.afterFlush(function () {
  // If the menu is currently open, collapse it.
  if ($('.navbar .navbar-collapse.collapse.in').length > 0) {
   $('.navbar .navbar-toggle').click();
  }
 });
});