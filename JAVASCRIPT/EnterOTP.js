
  function collectOTP() {
    const otp = [...document.querySelectorAll('.otp-input')]
      .map(input => input.value)
      .join('');

    if (otp.length !== 4) {
      alert("Please enter all 4 digits.");
      return false;
    }

    document.getElementById('full-otp').value = otp;
    return true; // allow form to submit
  }

  const inputs = document.querySelectorAll('.otp-input');

  inputs.forEach((input, index) => {
    input.addEventListener('input', (e) => {
      const value = e.target.value;
      
      // If user pasted or typed multiple digits
      if (value.length > 1) {
        const digits = value.split('');
        for (let i = 0; i < digits.length && index + i < inputs.length; i++) {
          inputs[index + i].value = digits[i];
        }
        const nextInput = inputs[Math.min(index + digits.length, inputs.length - 1)];
        nextInput.focus();
      } else if (value && index < inputs.length - 1) {
        inputs[index + 1].focus();
      }
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace' && !input.value && index > 0) {
        inputs[index - 1].focus();
      }
    });
  });

  // Optional: Autofocus first box
  inputs[0].focus();

  inputs[0].addEventListener('paste', (e) => {
  const paste = e.clipboardData.getData('text');
  const digits = paste.replace(/\D/g, '').split('');
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].value = digits[i] || '';
  }
});
