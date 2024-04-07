let displayValue = '';
let history = [];
let previousResult = null;

function appendToDisplay(value) {
  displayValue += value;
  document.getElementById('display').value = displayValue;
}

function calculate() {
  try {
    if (displayValue.trim() === '') return; // If displayValue is empty, do nothing
    let result = eval(parseExpression(displayValue));
    document.getElementById('display').value = result;
    if (result !== previousResult) {
      addToHistory(displayValue + ' = ' + result);
      previousResult = result;
    }
    displayValue = result.toString(); // Set the result as the new display value
  } catch (error) {
    document.getElementById('display').value = 'Error';
    displayValue = '';
  }
}

function clearDisplay() {
  displayValue = '';
  document.getElementById('display').value = '';
}

function clearAll() {
  displayValue = '';
  document.getElementById('display').value = '';
  clearHistory();
  previousResult = null; // Reset previousResult
}

function parseExpression(expression) {
  // Regex to match percentage operations like "10%"
  const percentageRegex = /(\d+(?:\.\d+)?)%/g;

  // Replace percentage operations with their equivalent values
  expression = expression.replace(percentageRegex, function(match, p1) {
    return parseFloat(p1) / 100;
  });

  return expression;
}

function addToHistory(expression) {
  history.push(expression);
  updateHistoryDisplay();
}

function clearHistory() {
  history = [];
  updateHistoryDisplay();
}

function updateHistoryDisplay() {
  const historyElement = document.getElementById('history');
  historyElement.innerHTML = '';
  if (history.length === 0) {
    historyElement.innerHTML = '<p>No history</p>';
  } else {
    history.forEach(item => {
      const p = document.createElement('p');
      p.textContent = item;
      historyElement.appendChild(p);
    });

    historyElement.scrollTop = historyElement.scrollHeight;

  }
}

function backspace() {
  displayValue = displayValue.slice(0, -1);
  document.getElementById('display').value = displayValue;
}

document.addEventListener('keydown', function(event) {
    const key = event.key;
    if (key >= '0' && key <= '9') {
      appendToDisplay(key);
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
      appendToDisplay(key);
    } else if (key === '.' || key === '%') {
      appendToDisplay(key);
    } else if (key === 'Enter') {
      calculate();
    } else if (key === 'Backspace') {
      backspace();
    }
  });
//////////////////////////////////////////////////////

function convertLength() {
    const lengthValue = parseFloat(document.getElementById('lengthValue').value);
    const sourceUnit = document.getElementById('sourceUnit').value;
    const targetUnit = document.getElementById('targetUnit').value;
  
    let result;
  
    switch (sourceUnit) {
      case 'feet':
        if (targetUnit === 'inch') {
          result = lengthValue * 12;
        } else if (targetUnit === 'cm') {
          result = lengthValue * 30.48;
        } else if (targetUnit === 'm') {
          result = lengthValue * 0.3048;
        } else if (targetUnit === 'mm') {
          result = lengthValue * 304.8;
        } else {
          result = lengthValue;
        }
        break;
      case 'inch':
        if (targetUnit === 'feet') {
          result = lengthValue / 12;
        } else if (targetUnit === 'cm') {
          result = lengthValue * 2.54;
        } else if (targetUnit === 'm') {
          result = lengthValue * 0.0254;
        } else if (targetUnit === 'mm') {
          result = lengthValue * 25.4;
        } else {
          result = lengthValue;
        }
        break;
      case 'cm':
        if (targetUnit === 'feet') {
          result = lengthValue * 0.0328084;
        } else if (targetUnit === 'inch') {
          result = lengthValue * 0.393701;
        } else if (targetUnit === 'm') {
          result = lengthValue * 0.01;
        } else if (targetUnit === 'mm') {
          result = lengthValue * 10;
        } else {
          result = lengthValue;
        }
        break;
      case 'm':
        if (targetUnit === 'feet') {
          result = lengthValue * 3.28084;
        } else if (targetUnit === 'inch') {
          result = lengthValue * 39.3701;
        } else if (targetUnit === 'cm') {
          result = lengthValue * 100;
        } else if (targetUnit === 'mm') {
          result = lengthValue * 1000;
        } else {
          result = lengthValue;
        }
        break;
      case 'mm':
        if (targetUnit === 'feet') {
          result = lengthValue * 0.00328084;
        } else if (targetUnit === 'inch') {
          result = lengthValue * 0.0393701;
        } else if (targetUnit === 'cm') {
          result = lengthValue * 0.1;
        } else if (targetUnit === 'm') {
          result = lengthValue * 0.001;
        } else {
          result = lengthValue;
        }
        break;
      default:
        result = lengthValue;
    }
  
    document.getElementById('conversionResult').textContent = `${lengthValue} ${sourceUnit} = ${result.toFixed(2)} ${targetUnit}`;
  }
  