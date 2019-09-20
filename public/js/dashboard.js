$(document).ready(() => {
 const options = {
  url: 'http://localhost:3000/users',
  type: 'GET',
  dataType: 'json'
 };
 $.ajax(options).done((users) => getAllRequestsForUsers(users));
});
function getAllRequestsForUsers(users) {
 const options = {
  url: 'http://localhost:3000/requests',
  type: 'GET',
  dataType: 'json'
 };
 let requests = '';

 $.ajax(options).done((req) => {
  if (req.length === 0) {
   $('.no-requests').show();
  } else {
   $('.no-requests').hide();
   let count = 1;
   req.forEach((req) => {
    const userName = users
     .filter((user) => user.id === Number(req.userId))
     .map((user) => user.FirstName);

    requests += `<tr>
        <th scope="row">${count++}</th>
        <td>${userName.toString()}</td>
        <td>${req.Currency}</td>
        <td>${req.Amount}</td>
        <td>${req.Status}</td>
        <td>${req.Date}</td>
        <td>${req.Time}</td>
        <td>${req.HasAppliedBefore}</td>
<td><button class="btn btn-success" onclick = approveButton(${
     req.id
    })>Approve</td>
        <td><button class="btn btn-dark" onclick = declineButton(${
         req.id
        })>Decline</td>
        <td><button class="btn btn-danger" onclick=deleteButton(${
         req.id
        })>Delete</td></tr>
        `;
   });
   $('.user-data').append(requests);
  }
 });
}
function deleteButton(id) {
 const options = {
  url: `http://localhost:3000/requests/${id}`,
  type: 'DELETE',
  dataType: 'json'
 };
 $.ajax(options).done(() => {
  window.location = 'dashboard.html';
 });
}
function approveButton(id) {
 const options = {
  url: `http://localhost:3000/requests/${id}`,
  type: 'GET',
  dataType: 'json'
 };
 $.ajax(options).done((req) => {
  const updateData = {
   Currency: req.Currency,
   Amount: req.Amount,
   Date: req.Date,
   Time: req.Time,
   HasAppliedBefore: req.HasAppliedBefore,
   userId: req.userId,
   Status: 'Approved'
  };

  const options = {
   url: `http://localhost:3000/requests/${id}`,
   type: 'PUT',
   dataType: 'json',
   data: updateData
  };
  $.ajax(options).done((req) => {
   console.log('updated successfully');
   window.location = 'dashboard.html';
  });
 });
}
function declineButton(id) {
 const options = {
  url: `http://localhost:3000/requests/${id}`,
  type: 'GET',
  dataType: 'json'
 };
 $.ajax(options).done((req) => {
  const updateData = {
   Currency: req.Currency,
   Amount: req.Amount,
   Date: req.Date,
   Time: req.Time,
   userId: req.userId,
   HasAppliedBefore: req.HasAppliedBefore,
   Status: 'Declined'
  };

  const options = {
   url: `http://localhost:3000/requests/${id}`,
   type: 'PUT',
   dataType: 'json',
   data: updateData
  };
  $.ajax(options).done((req) => {
   console.log('updated successfully');
   window.location = 'dashboard.html';
  });
 });
}
$('#logoutAdmin').click(() => logoutAdmin());
function logoutAdmin() {
 localStorage.clear();
 window.location = 'admin.html';
}
