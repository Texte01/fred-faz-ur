const passwordInput = document.getElementById('passwordInput');
const encodeButton = document.getElementById('encodeButton');
const resetButton = document.getElementById('resetButton');
const resultsSection = document.getElementById('resultsSection');

const originalValue = document.getElementById('originalValue');
const asciiValue = document.getElementById('asciiValue');
const caesarValue = document.getElementById('caesarValue');
const binaryValue = document.getElementById('binaryValue');
const finalCode = document.getElementById('finalCode');
const tableBody = document.getElementById('tableBody');

function shiftLetter(char, shift) {
  const code = char.charCodeAt(0);

  if (code >= 65 && code <= 90) {
    return String.fromCharCode(((code - 65 + shift) % 26) + 65);
  }

  if (code >= 97 && code <= 122) {
    return String.fromCharCode(((code - 97 + shift) % 26) + 97);
  }

  return char;
}

function toBinary8(decimal) {
  return decimal.toString(2).padStart(8, '0');
}

function encodePassword(password) {
  const chars = Array.from(password);

  const asciiCodes = chars.map((char) => char.charCodeAt(0));
  const caesarChars = chars.map((char) => shiftLetter(char, 3));
  const binaryCodes = caesarChars.map((char) => toBinary8(char.charCodeAt(0)));
  const finalBinary = binaryCodes.join(' ');

  return {
    original: password,
    asciiCodes,
    caesarChars,
    binaryCodes,
    finalBinary,
  };
}

function renderRows(rowsData) {
  tableBody.innerHTML = '';

  rowsData.forEach((item) => {
    const row = document.createElement('tr');

    const charCell = document.createElement('td');
    charCell.textContent = item.char;

    const asciiCell = document.createElement('td');
    asciiCell.textContent = item.ascii;

    const caesarCell = document.createElement('td');
    caesarCell.textContent = item.caesar;

    const binaryCell = document.createElement('td');
    binaryCell.textContent = item.binary;

    row.append(charCell, asciiCell, caesarCell, binaryCell);
    tableBody.appendChild(row);
  });
}

function showError(message) {
  passwordInput.style.borderColor = '#f87171';
  passwordInput.setAttribute('aria-invalid', 'true');
  passwordInput.placeholder = message;
}

function clearError() {
  passwordInput.style.borderColor = 'rgba(255, 255, 255, 0.08)';
  passwordInput.setAttribute('aria-invalid', 'false');
  passwordInput.placeholder = 'Ex.: MinhaSenha123';
}

function handleEncode() {
  const password = passwordInput.value.trim();

  if (!password) {
    showError('Digite uma senha primeiro');
    passwordInput.focus();
    return;
  }

  clearError();

  const result = encodePassword(password);

  originalValue.textContent = result.original;
  asciiValue.textContent = result.asciiCodes.join(' ');
  caesarValue.textContent = result.caesarChars.join(' ');
  binaryValue.textContent = result.binaryCodes.join(' ');
  finalCode.textContent = result.finalBinary;

  const rows = Array.from(result.original).map((char, index) => ({
    char,
    ascii: result.asciiCodes[index],
    caesar: result.caesarChars[index],
    binary: result.binaryCodes[index],
  }));

  renderRows(rows);
  resultsSection.classList.remove('hidden');
}

function handleReset() {
  passwordInput.value = '';
  clearError();
  resultsSection.classList.add('hidden');
  originalValue.textContent = '-';
  asciiValue.textContent = '-';
  caesarValue.textContent = '-';
  binaryValue.textContent = '-';
  finalCode.textContent = '-';
  tableBody.innerHTML = '';
  passwordInput.focus();
}

encodeButton.addEventListener('click', handleEncode);

passwordInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    handleEncode();
  }
});

resetButton.addEventListener('click', handleReset);
