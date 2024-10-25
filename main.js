// Función para la validación en tiempo real de la longitud
function validateLength() {
    const lengthInput = document.getElementById("inputLength");
    const lengthValidation = document.getElementById("lengthValidation");
    const length = parseInt(lengthInput.value, 10);

    if (length < 8) {
        lengthValidation.textContent = "Too short! Increase length for better security.";
        lengthValidation.style.color = "red";
    } else if (length >= 8 && length < 12) {
        lengthValidation.textContent = "Decent, but try to reach at least 12 characters.";
        lengthValidation.style.color = "orange";
    } else {
        lengthValidation.textContent = "Good! The recommended length is 12 or more.";
        lengthValidation.style.color = "green";
    }
}

// Asignar la validación en tiempo real al campo de longitud
document.getElementById("inputLength").addEventListener("input", validateLength);

// Función para generar la contraseña de forma local
function generatePassword() {
    let length = document.getElementById("inputLength").value;
    let includeNumbers = document.getElementById("checkbox1").checked;
    let includeSymbols = document.getElementById("checkbox2").checked;

    let charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeNumbers) charset += "0123456789";
    if (includeSymbols) charset += "!@#$%^&*()_+{}[]";

    let password = "";
    for (let i = 0; i < length; i++) {
        password += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    document.getElementById("generatedPassword").textContent = password;

    // Evaluar la fuerza de la contraseña generada
    evaluatePasswordStrength(password);
}

// Asignar la función de generación al botón
document.getElementById("btnGenerate").addEventListener("click", generatePassword);

// Función para evaluar la fuerza de la contraseña
function evaluatePasswordStrength(password) {
    let strength = 0;

    // Criterios de fortaleza
    if (password.length >= 8) strength++;
    if (password.match(/[A-Z]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    if (password.match(/[!@#$%^&*()_+{}[\]]/)) strength++;

    // Mostrar la evaluación
    const strengthBadge = document.getElementById("passwordStrength");
    if (strength <= 1) {
        strengthBadge.textContent = "Debil";
        strengthBadge.style.backgroundColor = "red";
    } else if (strength === 2) {
        strengthBadge.textContent = "Media";
        strengthBadge.style.backgroundColor = "yellow";
    } else if (strength >= 3) {
        strengthBadge.textContent = "Fuerte";
        strengthBadge.style.backgroundColor = "green";
    }
}

// Función para copiar la contraseña al portapapeles
function copyPassword() {
    let password = document.getElementById("generatedPassword").textContent;

    if (password) {
        navigator.clipboard.writeText(password)
            .then(() => {
                alert("Password copied to clipboard!");
            })
            .catch(err => {
                console.error('Failed to copy password: ', err);
            });
    } else {
        alert("No password to copy!");
    }
}
