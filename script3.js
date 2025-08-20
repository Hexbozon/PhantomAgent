// Mobile menu toggle functionality
function toggleMenu() {
  const navLinks = document.getElementById('navLinks');
  const menuToggle = document.querySelector('.menu-toggle');
  
  navLinks.classList.toggle('active');
  menuToggle.classList.toggle('active');
}

// Initialize page functionality when DOM loads
document.addEventListener('DOMContentLoaded', function() {
  
  // Close menu when clicking on a navigation link
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      const navLinks = document.getElementById('navLinks');
      const menuToggle = document.querySelector('.menu-toggle');
      
      navLinks.classList.remove('active');
      menuToggle.classList.remove('active');
    });
  });

  // Close menu when clicking outside the navbar
  document.addEventListener('click', (e) => {
    const navLinks = document.getElementById('navLinks');
    const menuToggle = document.querySelector('.menu-toggle');
    const navbar = document.querySelector('.navbar');
    
    if (!navbar.contains(e.target)) {
      navLinks.classList.remove('active');
      menuToggle.classList.remove('active');
    }
  });

  // Form submission handler
  document.querySelector('.support-form').addEventListener('submit', handleFormSubmission);
});

// Handle form submission
function handleFormSubmission(e) {
  e.preventDefault();
  
  // Get form field values
  const formData = getFormData();
  
  // Validate form data
  if (!validateForm(formData)) {
    showAlert('Please fill in all fields', 'error');
    return;
  }
  
  // Validate email format
  if (!isValidEmail(formData.email)) {
    showAlert('Please enter a valid email address', 'error');
    return;
  }
  
  // Simulate ticket submission
  submitTicket(formData);
}

// Get form data
function getFormData() {
  return {
    name: document.getElementById('name').value.trim(),
    email: document.getElementById('email').value.trim(),
    type: document.getElementById('type').value,
    description: document.getElementById('desc').value.trim()
  };
}

// Validate form data
function validateForm(data) {
  return data.name && 
         data.email && 
         data.type !== 'Select' && 
         data.description;
}

// Email validation
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Submit ticket (simulation)
function submitTicket(formData) {
  // Show loading state
  const submitBtn = document.querySelector('.submit-btn');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = 'Submitting...';
  submitBtn.disabled = true;
  
  // Simulate API call with timeout
  setTimeout(() => {
    // Reset button
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
    
    // Show success message
    showAlert('Support ticket submitted successfully!', 'success');
    
    // Update progress bar
    updateProgressBar(66);
    
    // Reset form
    resetForm();
    
    // Generate ticket ID
    const ticketId = generateTicketId();
    console.log('Ticket submitted:', {
      id: ticketId,
      ...formData,
      timestamp: new Date().toISOString()
    });
    
  }, 1500);
}

// Update progress bar
function updateProgressBar(percentage) {
  const progressBar = document.querySelector('.progress-bar');
  progressBar.style.width = percentage + '%';
  
  // Add visual feedback
  progressBar.style.background = '#4facfe';
  
  // Highlight current step
  const steps = document.querySelectorAll('.tracker-steps span');
  steps.forEach((step, index) => {
    if (index <= Math.floor(percentage / 33)) {
      step.style.color = '#4facfe';
      step.style.fontWeight = 'bold';
    }
  });
}

// Reset form
function resetForm() {
  document.querySelector('.support-form').reset();
}

// Generate random ticket ID
function generateTicketId() {
  return 'TKT-' + Date.now().toString().slice(-8) + Math.random().toString(36).substr(2, 4).toUpperCase();
}

// Show alert messages
function showAlert(message, type = 'info') {
  // Create alert element
  const alert = document.createElement('div');
  alert.className = `alert alert-${type}`;
  alert.textContent = message;
  
  // Style the alert
  alert.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px 20px;
    border-radius: 8px;
    color: white;
    font-weight: bold;
    z-index: 9999;
    max-width: 300px;
    word-wrap: break-word;
    animation: slideIn 0.3s ease-out;
    background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  `;
  
  // Add slide-in animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
      from { transform: translateX(0); opacity: 1; }
      to { transform: translateX(100%); opacity: 0; }
    }
  `;
  document.head.appendChild(style);
  
  // Add to page
  document.body.appendChild(alert);
  
  // Remove after 4 seconds
  setTimeout(() => {
    alert.style.animation = 'slideOut 0.3s ease-out forwards';
    setTimeout(() => {
      if (alert.parentNode) {
        alert.parentNode.removeChild(alert);
      }
    }, 300);
  }, 4000);
  
  // Allow manual dismiss on click
  alert.addEventListener('click', () => {
    alert.style.animation = 'slideOut 0.3s ease-out forwards';
    setTimeout(() => {
      if (alert.parentNode) {
        alert.parentNode.removeChild(alert);
      }
    }, 300);
  });
}

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
  // Close mobile menu with Escape key
  if (e.key === 'Escape') {
    const navLinks = document.getElementById('navLinks');
    const menuToggle = document.querySelector('.menu-toggle');
    
    if (navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
      menuToggle.classList.remove('active');
    }
  }
  
  // Submit form with Ctrl+Enter
  if (e.ctrlKey && e.key === 'Enter') {
    const form = document.querySelector('.support-form');
    form.dispatchEvent(new Event('submit'));
  }
});