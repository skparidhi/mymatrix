document.getElementById('subscribeForm').addEventListener('submit', function(e) {
        e.preventDefault(); 
        
        const form = this;
        const actionUrl = form.action;
        
        // Find the existing heading text above your form
        // (Assuming it is an h3, h4, or p tag right before the form)
        const titleElement = form.previousElementSibling; 
        const originalTitle = titleElement ? titleElement.innerText : 'Drop your mail, we will get back to you';
        
        if (titleElement) {
            titleElement.style.color = '#888';
            titleElement.innerText = 'Sending...';
        }
        
        const formData = new FormData(form);
        
        fetch(actionUrl, {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.result === 'success') {
            if (titleElement) {
                titleElement.style.color = '#00FF66'; // Success Green
                titleElement.innerText = 'Thank you, we will get back to you soon!';
            }
            form.reset(); // Clears fields
            } else {
            if (titleElement) {
                titleElement.style.color = '#FF3333';
                titleElement.innerText = 'Something went wrong. Please try again.';
            }
            }
        })
        .catch(error => {
            console.error('Error:', error);
            if (titleElement) {
            titleElement.style.color = '#FF3333';
            titleElement.innerText = 'An error occurred. Please try again.';
            }
        });
        });