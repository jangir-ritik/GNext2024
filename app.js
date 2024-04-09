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
        const company = document.getElementById('company').value;
        const jobTitle = document.getElementById('jobTitle').value;

        // Example validation: Check if required fields are not empty
        if (!name || !email || !company || !jobTitle) {
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
            company: document.getElementById('company').value,
            jobTitle: document.getElementById('jobTitle').value,
            country: document.getElementById('country').value,
        };

        // Send form data to your server
        fetch('http://34.93.244.215:3005/api/send-mail', {
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
