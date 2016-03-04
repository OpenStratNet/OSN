// Options
AccountsTemplates.configure({
  // preSignUpHook: function (error, state) {
  //   console.log("love");
  // },
  // defaultLayout: 'emptyLayout',
  showForgotPasswordLink: true,
  overrideLoginErrors: true,
  enablePasswordChange: true,

  // sendVerificationEmail: true,
  // enforceEmailVerification: true,
  //confirmPassword: true,
  //continuousValidation: false,
  showLabels: false,
  //forbidClientAccountCreation: true,
  //formValidationFeedback: true,
  homeRoutePath: '/',
  redirectTimeout: 2000,
  //showAddRemoveServices: false,
  showPlaceholders: true,

  negativeValidation: true,
  positiveValidation: true,
  negativeFeedback: true,
  positiveFeedback: true,

  // Privacy Policy and Terms of Use
  //privacyUrl: 'privacy',
  //termsUrl: 'terms-of-use',
  texts: {
    sep: "OR REGISTER with your social account:",
    title: {
      signUp: "REGISTER by creating a new account:"
    },
    button: {
      signUp: "REGISTER"
    },
    socialSignUp: "",
    socialWith: ""
  }
});


var submitFunction = function(error, state){
  // if (!error) {
  //   if (state === "signIn") {
  //     // Successfully logged in
  //     console.log("hook logged in");
  //   }
  //   if (state === "signUp") {
  //     // Successfully registered
  //     console.log("hook singup");
  //   }
  // }
};


// remove fields and add them back in the right order
AccountsTemplates.removeField('email');
AccountsTemplates.removeField('password');


//all register fields
AccountsTemplates.addFields([
    {
      _id: 'firstName',
      type: 'text',
      placeholder: "First Name*",
      required: true,
      re: /^[^\d]{2,}$/i,
      errStr: "Please enter your first name.",
    },
    {
      _id: 'lastName',
      type: 'text',
      placeholder: "Last Name*",
      required: true,
      re: /^[^\d]{2,}$/i,
      errStr: "Please enter your last name.",
    },
    {
      _id: 'email',
      type: 'email',
      placeholder: "Email Address*",
      required: true,
      displayName: "email",
      re: /.+@(.+){2,}\.(.+){2,}/,
      errStr: 'Invalid email',
    },
    {
      _id: 'institution',
      type: 'text',
      placeholder: "Institution/Company*",
      required: true,
      re: /^[^\d]{2,}$/i,
      errStr: "Please enter the institution or company you work for.",
    },
    {
      _id: 'interests',
      type: 'text',
      placeholder: "Interests reg. Open Strategy*",
      required: true,
      re: /^[^\d]{2,}$/i,
      errStr: "Please enter the your interests in the institution/company.",
      template: 'interests'
    },
    {
      _id: 'position',
      type: 'text',
      placeholder: "Position",
      re: /^[^\d]{2,}$/i,
      errStr: "Please enter the your position in the institution/company.",
    },
    {
      _id: 'uploadProfile',
      type: 'text',
      template: 'uploadInput'
    },
    {
      _id: 'password',
      type: 'password',
      placeholder: "Password*",
      required: true,
      minLength: 6,
      errStr: 'Password must be at least six characters long',
    },
    {
      _id: 'password_again',
      type: 'password',
      placeholder: "Confirm Password*",
      required: true,
      minLength: 6,
      errStr: 'Password must be at least six characters long',
    }
]);
