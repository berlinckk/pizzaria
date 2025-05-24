document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    contactForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent default form submission

        // Collect form data
        const vesselName = document.getElementById('vesselName').value;
        const serviceType = document.getElementById('serviceType').value;
        const volume = document.getElementById('volume').value;
        const portEta = document.getElementById('portEta').value;
        const contactName = document.getElementById('contactName').value;
        const corporateEmail = document.getElementById('corporateEmail').value;
        const whatsappNumber = document.getElementById('whatsappNumber').value;

        // Basic validation for required fields
        if (!vesselName || !serviceType || !portEta || !contactName || !corporateEmail) {
            formMessage.textContent = 'Please fill in all required fields to get your instant quote.';
            formMessage.className = 'form-message error';
            formMessage.style.display = 'block';
            return;
        }

        // Construct the data payload
        const formData = {
            vesselName: vesselName,
            serviceType: serviceType,
            volume: volume,
            portEta: portEta,
            contactName: contactName,
            corporateEmail: corporateEmail,
            whatsappNumber: whatsappNumber,
            timestamp: new Date().toISOString() // Add timestamp for tracking
        };

        formMessage.textContent = 'Processing your request... Stand by for your quote.';
        formMessage.className = 'form-message'; // Clear previous status
        formMessage.style.display = 'block';

        try {
            // **CRITICAL: ACTUAL FORM SUBMISSION LOGIC HERE**
            // THIS IS A SIMULATION. YOU MUST REPLACE THIS WITH YOUR OWN BACKEND API OR A THIRD-PARTY FORM SERVICE.
            // Example using Formspree.io (you'd need to set your form's 'action' attribute to your Formspree endpoint):
            /*
            const response = await fetch(event.target.action, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                // If using Formspree, check for 'response.status === 400' for validation errors
                throw new Error('Form submission failed. Please check your inputs and try again.');
            }
            */

            // Simulation of success (REMOVE THIS IN PRODUCTION WITH REAL INTEGRATION)
            await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate network delay

            formMessage.textContent = 'Quote requested successfully! BSB Sludge Control will contact you promptly. Expect your MARPOL certificate documentation soon.';
            formMessage.className = 'form-message success';
            contactForm.reset(); // Clear the form

            // **CRITICAL: Fire Google Ads Conversion Event**
            // Replace 'AW-XXXXXXXXX/YYYYY' with your actual Google Ads Conversion ID and Label.
            if (typeof gtag === 'function') {
                gtag('event', 'conversion', {
                    'send_to': 'AW-XXXXXXXXX/YYYYY', // YOUR GOOGLE ADS CONVERSION ID HERE
                    'value': 0.0, // Set a monetary value if this lead has an estimated worth
                    'currency': 'USD', // Currency for reporting
                    'transaction_id': 'BSB-' + Date.now(), // Unique ID for each conversion
                    'items': [{
                        'id': serviceType,
                        'name': serviceType,
                        'category': 'maritime_waste_removal',
                        'quantity': 1,
                        'price': 0.0
                    }]
                });
            }

        } catch (error) {
            console.error('Form submission error:', error);
            formMessage.textContent = `An error occurred: ${error.message || 'Please try again later. Alternatively, use WhatsApp or Email for direct contact.'}`;
            formMessage.className = 'form-message error';
        }
    });
});