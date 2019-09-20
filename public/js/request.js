$(document).ready(() => {
 $('#postRequest').submit((e) => {
  e.preventDefault();
  const selectedCurrency = $('#select').val();
  const amount = $('#Amount').val();
  const date = new Date();
  const hasAppliedBefore = $('#appliedBefore').val();

  const userRequest = {
   Currency: selectedCurrency,
   Amount: amount,
   Date: date.toDateString(),
   Time: date.toLocaleTimeString(),
   HasAppliedBefore: hasAppliedBefore,
   Status: 'pending'
  };
  storeUserRequest(userRequest);
 });
});
function storeUserRequest(request) {
 const key = localStorage.getItem('key');
 const options = {
  url: `http://localhost:3000/users/${key}/requests`,
  type: 'POST',
  dataType: 'json',
  data: request
 };
 $.ajax(options).done(() => {
  console.log('posted successfully');
  $('#alert-message').show();
  setTimeout(() => {
   $('#alert-message').hide();
  }, 2000);
 });
}
