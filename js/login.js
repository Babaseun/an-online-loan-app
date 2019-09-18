$(document).ready(() => {
 $('#loginForm').submit((e) => {
  e.preventDefault();

  const email = $('#email').val();
  const password = $('#password').val();

  const userData = {
   Email: email,
   Password: password
  };
  checkIfUserExist(userData);
 });
});

function checkIfUserExist(data) {
 const { Email, Password } = data;

 const options = {
  url: ` http://localhost:3000/users?Email=${Email}&&Password=${Password}`,
  type: 'GET',
  dataType: 'json'
 };
 $.ajax(options).done((res) => {
  res.length ? getUserId(res) : $('#alert-message').show();
 });
}

function getUserId(data) {
 $('#alert-message').hide();
 const [{ id }] = data;

 localStorage.setItem('key', id);
 window.location = 'request.html';
}
