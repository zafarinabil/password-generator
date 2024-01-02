// Get DOM Elements
const lengthSlider = document.getElementById("length");
const lengthValue = document.getElementById("lengthValue");
const uppercaseCheckbox = document.getElementById("uppercase");
const lowercaseCheckbox = document.getElementById("lowercase");
const numbersCheckbox = document.getElementById("numbers");
const specialCheckbox = document.getElementById("special");
const generateButton = document.getElementById("generate");
const passwordInput = document.getElementById("password");
const copyButton = document.getElementById("copy");
const strengthMeter = document.querySelectorAll(".strength-boxes div");

// Listen to Slider
lengthSlider.addEventListener("input", function () {
  lengthValue.textContent = lengthSlider.value;
});

// Listen to Generate button
generateButton.addEventListener("click", function () {
  const length = lengthSlider.value;
  const includeUppercase = uppercaseCheckbox.checked;
  const includeLowercase = lowercaseCheckbox.checked;
  const includeNumbers = numbersCheckbox.checked;
  const includeSpecial = specialCheckbox.checked;
  const password = generatePassword(
    length,
    includeUppercase,
    includeLowercase,
    includeNumbers,
    includeSpecial
  );
  passwordInput.value = password;
  updateStrengthMeter(password);
});

// Listen to copy button
copyButton.addEventListener("click", function () {
  passwordInput.select();
  document.execCommand("copy");
  alert("Password copied to clipboard!");
});

// Function for Generating Password
function generatePassword(
  length,
  includeUppercase,
  includeLowercase,
  includeNumbers,
  includeSpecial
) {
  let charset = "";
  if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (includeLowercase) charset += "abcdefghijklmnopqrstuvwxyz";
  if (includeNumbers) charset += "0123456789";
  if (includeSpecial)
    charset += "!@#$%^&*()_+~`|}{[]:;?><,./-=";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset.charAt(randomIndex);
  }
  return password;
}

// Function to update passwords strength
function updateStrengthMeter(password) {
  const strength = calculatePasswordStrength(password);

  strengthMeter.forEach((div) => {
    div.style.backgroundColor = "";
    div.textContent = "";
  });

  if (strength === "veryStrong") {
    strengthMeter.forEach((div) => {
      div.style.backgroundColor = "#4ABEA0";
    });
    strengthMeter[0].textContent = "Very Strong";
    strengthMeter[0].style.backgroundColor = "#A638F6";
  } else if (strength === "strong") {
    strengthMeter[1].style.backgroundColor = "#4ABEA0";
    strengthMeter[2].style.backgroundColor = "#4ABEA0";
    strengthMeter[3].style.backgroundColor = "#4ABEA0";
    strengthMeter[0].textContent = "Strong";
    strengthMeter[0].style.backgroundColor = "#A638F6";
  } else if (strength === "medium") {
    strengthMeter[1].style.backgroundColor = "#FFA257";
    strengthMeter[2].style.backgroundColor = "#FFA257";
    strengthMeter[0].textContent = "Medium";
    strengthMeter[0].style.backgroundColor = "#A638F6";
  } else if (strength === "weak") {
    strengthMeter[1].style.backgroundColor = "red";
    strengthMeter[0].textContent = "Weak";
    strengthMeter[0].style.backgroundColor = "#A638F6";
  } 
}

function calculatePasswordStrength(password) {
    const passwordLength = password.length;
  
    // Check if password meets minimum length requirement
    if (passwordLength < 8 && !hasLowercase && !hasUppercase && !hasNumbers && !hasSpecialChars) {
      return "weak";
    }
  
    // Check if password contains uppercase letters, lowercase letters, numbers, and special characters
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSpecialChars = /[^A-Za-z0-9]/.test(password);
  
    // Calculate password strength based on criteria
    if (passwordLength >= 8 && hasUppercase && hasLowercase && hasNumbers && hasSpecialChars) {
      return "veryStrong";
    } else if (
      (hasUppercase && hasLowercase && hasNumbers) ||
      (hasUppercase && hasLowercase && hasSpecialChars) ||
      (hasUppercase && hasNumbers && hasSpecialChars) ||
      (hasLowercase && hasNumbers && hasSpecialChars)
    ) {
      return "strong";
    } else if ( passwordLength >= 8 &&
        (hasUppercase && hasLowercase) ||
        (hasUppercase && hasSpecialChars) ||
        (hasUppercase && hasNumbers) ||
        (hasLowercase && hasNumbers) ||
        (hasLowercase && hasSpecialChars)||
        (hasNumbers && hasSpecialChars)
      ) {
        return "medium";
    } else {
      return "weak";
    }
  }
  