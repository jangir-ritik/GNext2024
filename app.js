document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contactForm');
  
    form.addEventListener('submit', function (event) {
      event.preventDefault(); // Prevent form submission
  
      // Validate form fields
      if (!validateForm()) {
        return;
      }
  
      // If validation passes, submit the form data
      submitFormData();
    });
  
    function validateForm() {
      // Perform form field validation here
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
  
      // Example validation: Check if required fields are not empty
      if (!name || !email) {
        alert('Please fill out all required fields.');
        return false;
      }
  
      // Additional validation logic can be added here
  
      return true; // Return true if validation passes
    }
  
    function submitFormData() {
      const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        modalMessage: document.getElementById('message').value,
        selectedCheckboxes: ['Example Checkbox 1', 'Example Checkbox 2'], // Example data
      };
  
      // Send form data to your server
      fetch('/api/send-mail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then(response => {
          if (response.ok) {
            console.log('Form submitted successfully');
            // Handle success, e.g., show success message
          } else {
            console.error('Failed to submit form');
            // Handle failure, e.g., show error message
          }
        })
        .catch(error => {
          console.error('Error submitting form:', error);
          // Handle error, e.g., show error message
        });
    }
  });
  