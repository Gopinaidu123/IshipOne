document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('booking-form');

  if (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();

      const name = document.getElementById('name').value;
      const phone = document.getElementById('phone').value;   
      const address = document.getElementById('address').value;
      const issue = document.getElementById('issue').value;

      console.log('--- Booking Request Submitted ---');
      console.log(`Name: ${name}`);   
      console.log(`Phone Number: ${phone}`);   
      console.log(`Address: ${address}`);
      console.log(`Issue Description: ${issue}`);
      console.log('---------------------------------');
   
      alert('Your service request has been submitted successfully!');

      form.reset();
    });
  } else {   
    console.error("Booking form not found!");
  }
});