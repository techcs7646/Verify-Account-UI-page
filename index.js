
const otpInputs = document.querySelectorAll('.otp-input');

otpInputs.forEach((input, index) => {
  input.addEventListener('input', () => {
    if (input.value.length === 1 && index < otpInputs.length - 1) {
      otpInputs[index + 1].focus();
    }
  });

  input.addEventListener('keydown', (event) => {
    if (event.key === 'Backspace' && index > 0 && input.value === '') {
      otpInputs[index - 1].focus();
    }
  });
});

// Handle Form Submission
document.getElementById('otp-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const otp = Array.from(otpInputs).map(input => input.value).join('');
  const resultMessage = document.getElementById('result-message');

  // Simulate checking the OTP
  const correctOtp = '123456';
  if (otp === correctOtp) {
    resultMessage.textContent = 'Account verified successfully!';
    resultMessage.classList.remove('hidden', 'error');
    resultMessage.classList.add('success');
  } else {
    resultMessage.textContent = 'Invalid OTP. Please try again.';
    resultMessage.classList.remove('hidden', 'success');
    resultMessage.classList.add('error');
  }
});

// Timer Logic for Resend Link
const resendLink = document.querySelector('.resend a');
let timer = 30;

function startTimer() {
  resendLink.classList.remove('active');
  resendLink.textContent = `Resend OTP in ${timer}s`;

  const interval = setInterval(() => {
    timer--;
    resendLink.textContent = `Resend OTP in ${timer}s`;

    if (timer === 0) {
      clearInterval(interval);
      resendLink.textContent = 'Resend OTP';
      resendLink.classList.add('active');
      timer = 30; // Reset timer for future use
    }
  }, 1000);
}

// Start timer on page load
startTimer();

// Resend OTP Click
resendLink.addEventListener('click', (e) => {
  e.preventDefault();
  if (resendLink.classList.contains('active')) {
    alert('A new OTP has been sent!');
    startTimer();
  }
});
