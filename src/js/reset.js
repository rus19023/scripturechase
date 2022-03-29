const emailField = document.getElementById('mail');
const resetPassword = document.getElementById('resetPassword');

const auth = firebase.auth();

//auth.languageCode = 'DE_de';

auth.useDeviceLanguage();

const resetPasswordFunction = () => {
    const email = emailField.value;

    //Built in Firebase function that sends password reset emails
    auth.sendPasswordResetEmail(email)
    .then(() => {
        console.log('Password Reset Email Sent Successfully!');
    })
    .catch(error => {
        console.error(error);
    });
}

resetPassword.addEventListener('click', resetPasswordFunction);
