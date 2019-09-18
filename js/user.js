$(document).ready(() => {
 fetchNameOfUser();
});
function fetchNameOfUser() {
 const key = localStorage.getItem('key');
 const options = {
  url: ` http://localhost:3000/users/${key}`,
  type: 'GET',
  dataType: 'json'
 };
 $.ajax(options).done(({ FirstName }) => {
  $('#name-of-user').append(`Welcome Back ${FirstName}
  <button class="btn btn-danger" onclick=logout()>Logout</button>

  `);
 });
 fetchUserRequests();
}
function fetchUserRequests() {
 const key = localStorage.getItem('key');
 const options = {
  url: ` http://localhost:3000/requests?userId=${key}`,
  type: 'GET',
  dataType: 'json'
 };
 $.ajax(options).done((res) => {
  let data = '';
  data += res.map(
   (req) => `<tr>
     <th scope="row">${req.id}</th>
     <td>${req.Currency}</td>
     <td>${req.Amount}</td>
      <td>${req.Status}</td>
      <td>${req.Date}</td></tr>`
  );
  $('.user-output').append(data);
 });
}
const logout = () => {
 localStorage.clear();
 window.location = 'login.html';
};
