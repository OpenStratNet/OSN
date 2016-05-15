UI.registerHelper('adminUserRole', function () {
  return Meteor.settings
    && Meteor.settings.public
    && Meteor.settings.public.users
    && Meteor.settings.public.users.roles
    && Meteor.settings.public.users.roles.admin
    || 'undefined-admin-role';
});
