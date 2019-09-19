$(document).ready(() => {
 $('#signUpForm').submit((e) => {
  e.preventDefault();
  const firstName = $('#firstName').val();
  const lastName = $('#lastName').val();
  const age = $('#age').val();
  const occupation = $('#occupation').val();
  const appliedBefore = $('#appliedBefore').val();
  const email = $('#email').val();
  const password = $('#password').val();
  const confirmPassword = $('#confirm-password').val();
  // Needs Special Attention
  const userData = {
   FirstName: firstName,
   LastName: lastName,
   Age: age,
   Occupation: occupation,
   HasAppliedBefore: appliedBefore,
   Email: email,
   Password: password,
   ConfirmPassword: confirmPassword
  };
  verifyPassword(userData);
 });
});
function verifyPassword(userData) {
 const { Password, ConfirmPassword } = userData;
 if (Password === ConfirmPassword) {
  $('#alert-for-password').hide();

  checkIfUserExist(userData);
 } else {
  $('#alert-for-password').show();
 }
}
function checkIfUserExist(data) {
 const { Email, Password } = data;

 const options = {
  url: ` http://localhost:3000/users?Email=${Email}&&Password=${Password}`,
  type: 'GET',
  dataType: 'json'
 };
 $.ajax(options).done((res) => {
  res.length ? $('#alert-message').show() : insertUserData(data);
 });
}

function insertUserData(data) {
 $('#alert-message').hide();
 const options = {
  url: 'http://localhost:3000/users',
  type: 'POST',
  dataType: 'json',
  data: data
 };
 $.ajax(options).done(({ id }) => {
  localStorage.setItem('key', id);
 });
 window.location = 'request.html';
}
