document.addEventListener('DOMContentLoaded', function () {
    const contactSection = document.querySelector('.contactSection');
    const form = document.getElementById('contactForm');
    const submitButton = form.querySelector('button[type="submit"]');
    const thankyouModal = document.querySelector('.thankyouCardWrapper');

    contactSection.classList.remove('hidden');
    thankyouModal.classList.toggle('hidden');

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent form submission

        submitButton.disabled = true;
        submitButton.textContent = 'Submitting...';

        // Validate form fields
        if (!validateForm()) {
            submitButton.disabled = false;
            submitButton.textContent = 'Get in touch';
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
        fetch('https://proteantech.in/maillead/send-mail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then(response => {
                if (response.ok) {
                    thankyouModal.classList.toggle('hidden');
                    contactSection.classList.toggle('hidden');
                    submitButton.textContent = 'Email sent';
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
            })
            .finally(() => {
                // Re-enable submit button after form submission completes
                submitButton.disabled = false;
                submitButton.textContent = 'Get in touch';
            });
    }
});
