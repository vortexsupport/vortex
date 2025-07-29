// Contact Form Validation and Submission
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const formStatus = document.getElementById('formStatus');
    
    if (!form) return;
    
    // Form field validation
    const validators = {
        firstName: (value) => {
            if (!value.trim()) return 'First name is required';
            if (value.trim().length < 2) return 'First name must be at least 2 characters';
            return null;
        },
        
        lastName: (value) => {
            if (!value.trim()) return 'Last name is required';
            if (value.trim().length < 2) return 'Last name must be at least 2 characters';
            return null;
        },
        
        email: (value) => {
            if (!value.trim()) return 'Email address is required';
            if (!window.VortexSupport.validateEmail(value)) return 'Please enter a valid email address';
            return null;
        },
        
        phone: (value) => {
            if (value.trim() && !window.VortexSupport.validatePhone(value)) {
                return 'Please enter a valid phone number';
            }
            return null;
        },
        
        subject: (value) => {
            if (!value) return 'Please select a subject';
            return null;
        },
        
        message: (value) => {
            if (!value.trim()) return 'Message is required';
            if (value.trim().length < 10) return 'Message must be at least 10 characters';
            return null;
        },
        
        privacy: (checked) => {
            if (!checked) return 'You must agree to the Privacy Policy and Terms of Service';
            return null;
        }
    };
    
    // Real-time validation
    const validateField = (fieldName, value, isCheckbox = false) => {
        const validator = validators[fieldName];
        if (!validator) return;
        
        const error = validator(isCheckbox ? value : value);
        const errorElement = document.getElementById(`${fieldName}Error`);
        const fieldElement = document.querySelector(`[name="${fieldName}"]`);
        const formGroup = fieldElement?.closest('.form-group');
        
        if (error) {
            errorElement.textContent = error;
            errorElement.classList.add('show');
            formGroup?.classList.add('error');
            return false;
        } else {
            errorElement.textContent = '';
            errorElement.classList.remove('show');
            formGroup?.classList.remove('error');
            return true;
        }
    };
    
    // Add event listeners for real-time validation
    const formFields = form.querySelectorAll('input, select, textarea');
    formFields.forEach(field => {
        const eventType = field.type === 'checkbox' ? 'change' : 'blur';
        
        field.addEventListener(eventType, function() {
            const isCheckbox = this.type === 'checkbox';
            validateField(this.name, isCheckbox ? this.checked : this.value, isCheckbox);
        });
        
        // Also validate on input for text fields
        if (['text', 'email', 'tel', 'textarea'].includes(field.type) || field.tagName === 'TEXTAREA') {
            field.addEventListener('input', window.VortexSupport.debounce(() => {
                validateField(field.name, field.value);
            }, 300));
        }
    });
    
    // Form submission
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Validate all fields
        let isValid = true;
        const formData = new FormData(form);
        
        // Check required fields
        const requiredFields = ['firstName', 'lastName', 'email', 'subject', 'message'];
        requiredFields.forEach(fieldName => {
            const value = formData.get(fieldName);
            if (!validateField(fieldName, value)) {
                isValid = false;
            }
        });
        
        // Check privacy checkbox
        const privacyChecked = formData.get('privacy') === 'on';
        if (!validateField('privacy', privacyChecked, true)) {
            isValid = false;
        }
        
        // Check phone if provided
        const phone = formData.get('phone');
        if (phone && !validateField('phone', phone)) {
            isValid = false;
        }
        
        if (!isValid) {
            window.VortexSupport.showMessage(formStatus, 'Please correct the errors above.', 'error');
            return;
        }
        
        // Show loading state
        const originalText = window.VortexSupport.showLoading(submitBtn);
        
        try {
            // Simulate form submission (replace with actual endpoint)
            await simulateFormSubmission(formData);
            
            // Success
            form.reset();
            window.VortexSupport.showMessage(
                formStatus, 
                'Thank you for your message! We\'ll get back to you within 24 hours.',
                'success'
            );
            
            // Clear any error states
            const errorElements = form.querySelectorAll('.error-message.show');
            errorElements.forEach(el => el.classList.remove('show'));
            
            const errorGroups = form.querySelectorAll('.form-group.error');
            errorGroups.forEach(group => group.classList.remove('error'));
            
        } catch (error) {
            console.error('Form submission error:', error);
            window.VortexSupport.showMessage(
                formStatus,
                'Sorry, there was an error sending your message. Please try again or contact us directly.',
                'error'
            );
        } finally {
            window.VortexSupport.hideLoading(submitBtn, originalText);
        }
    });
    
    // Simulate form submission (replace with actual API call)
    async function simulateFormSubmission(formData) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate 90% success rate
                if (Math.random() > 0.1) {
                    resolve({ success: true });
                } else {
                    reject(new Error('Simulated server error'));
                }
            }, 2000);
        });
    }
});

// Subject field dynamic updates
document.addEventListener('DOMContentLoaded', function() {
    const subjectSelect = document.getElementById('subject');
    const messageTextarea = document.getElementById('message');
    
    if (subjectSelect && messageTextarea) {
        const subjectPrompts = {
            general: 'Please describe your general inquiry or question.',
            cloud: 'Tell us about your cloud migration needs and current infrastructure.',
            digital: 'Describe your digital transformation goals and current challenges.',
            security: 'What cybersecurity concerns or requirements do you have?',
            managed: 'What IT services do you need help managing?',
            consultation: 'What would you like to discuss in your free consultation?',
            partnership: 'Tell us about the partnership opportunity you\'d like to explore.',
            support: 'Please describe the technical issue you\'re experiencing.'
        };
        
        subjectSelect.addEventListener('change', function() {
            const prompt = subjectPrompts[this.value];
            if (prompt && !messageTextarea.value.trim()) {
                messageTextarea.placeholder = prompt;
            }
        });
    }
});

// Auto-resize textarea
document.addEventListener('DOMContentLoaded', function() {
    const textarea = document.getElementById('message');
    
    if (textarea) {
        textarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        });
    }
});

// Character counter for message field
document.addEventListener('DOMContentLoaded', function() {
    const messageField = document.getElementById('message');
    
    if (messageField) {
        const maxLength = 1000;
        const counter = document.createElement('div');
        counter.style.cssText = `
            font-size: 0.875rem;
            color: #718096;
            text-align: right;
            margin-top: 5px;
        `;
        
        messageField.parentElement.appendChild(counter);
        
        const updateCounter = () => {
            const current = messageField.value.length;
            counter.textContent = `${current}/${maxLength} characters`;
            
            if (current > maxLength * 0.9) {
                counter.style.color = '#e53e3e';
            } else if (current > maxLength * 0.7) {
                counter.style.color = '#d69e2e';
            } else {
                counter.style.color = '#718096';
            }
        };
        
        messageField.addEventListener('input', updateCounter);
        updateCounter();
    }
});

// Form field focus effects
document.addEventListener('DOMContentLoaded', function() {
    const formFields = document.querySelectorAll('.contact-form input, .contact-form select, .contact-form textarea');
    
    formFields.forEach(field => {
        field.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
            this.parentElement.style.transition = 'transform 0.2s ease';
        });
        
        field.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    });
});