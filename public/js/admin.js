$(document).ready(() => {
 $('#loginForm').submit((e) => {
  e.preventDefault();

  const email = $('#email').val();
  const password = $('#password').val();

  const userData = {
   Email: email,
   Password: password
  };
  authenticateAdmin(userData);
 });
});

function authenticateAdmin(data) {
 const { Email, Password } = data;
 const options = {
  url: ` http://localhost:3000/admin?Email=${Email}&&Password=${Password}`,
  type: 'GET',
  dataType: 'json'
 };
 $.ajax(options).done((adminData) => {
  adminData.length ? loginAdmin(adminData) : $('#alert-message').show();
 });
}
function loginAdmin([{ id }]) {
 $('#alert-message').hide();

 localStorage.setItem('key', id);
 window.location = 'dashboard.html';
}
