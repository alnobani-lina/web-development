function validateForm(event) {
    event.preventDefault();

    
    clearErrors();

    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    
    if (name === '') {
      displayError('name', 'Name is required');
      return;
    }

    
    if (!isValidEmail(email)) {
      displayError('email', 'Invalid email address');
      return;
    }

    
    const passwordError = validatePassword(password);
    if (passwordError) {
      displayError('password', passwordError);
      return;
    }

    
    if (password !== confirmPassword) {
      displayError('confirmPassword', 'Passwords do not match');
      return;
    }

    
    alert('Registration successful!');
  }

  function isValidEmail(email) {
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function validatePassword(password) {
    
    if (password.length < 8) {
      return 'Password must be at least 8 characters long';
    }

    
    if (!/[a-z]/.test(password)) {
      return 'Password must contain at least one lowercase letter';
    }

    
    if (!/[A-Z]/.test(password)) {
      return 'Password must contain at least one uppercase letter';
    }

    
    if (!/\d/.test(password)) {
      return 'Password must contain at least one digit';
    }

    
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      return 'Password must contain at least one special character';
    }

  
    return null;
  }

  function displayError(field, message) {
    const errorElement = document.createElement('div');
    errorElement.className = 'error';
    errorElement.textContent = message;
    document.getElementById(field).insertAdjacentElement('afterend', errorElement);
  }

  function clearErrors() {
    const errorElements = document.querySelectorAll('.error');
    errorElements.forEach(element => element.remove());
  }