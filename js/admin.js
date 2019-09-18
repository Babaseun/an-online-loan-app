$(document).ready(() => {
 $('#loginForm').submit((e) => {
  e.preventDefault();

  const email = $('#email').val();
  const password = $('#password').val();

  const userData = {
   Email: email,
   Password: password
  };
  loginAdmin(userData);
 });
});

function authenticateAdmin(data) {
 const options = {
  url: ` http://localhost:3000/admin`,
  type: 'GET',
  dataType: 'json'
 };
 $.ajax(options).done((res) => {
  res.length ? $('#alert-message').show() : loginAdmin(data);
 });
}

function loginAdmin(data) {
 const options = {
  url: '  http://localhost:3000/admin',
  type: 'POST',
  dataType: 'json',
  data: data
 };
 $.ajax(options).done(({ id }) => {
  localStorage.setItem('key', id);
 });
}
