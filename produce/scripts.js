
/**
 * Function to handle button toggling.
 * It takes a list of buttons and ensures only one can be "active" at a time.
 * Optional onToggle callback is called when state changes.
 */
function setupToggleButtons(buttonList, onToggle) {
  buttonList.forEach(btn => {
    btn.addEventListener('click', () => {
      // Check if it's already active
      const isAlreadyActive = btn.classList.contains('active');
      
      // Remove 'active' from all buttons in this specific group
      buttonList.forEach(b => b.classList.remove('active'));
      
      // If it wasn't active, make it active now
      if (!isAlreadyActive) {
        btn.classList.add('active');
      }

      if (onToggle) onToggle();
    });
  });
}

const rowIds = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

const SAMPLE_DATA = {
  names: {
    A: "Pears", B: "Mandarin Oranges", C: "Eggplant", D: "Bell Pepper", E: "Lettuce",
    F: "Cauliflower", G: "Honeydew Melon", H: "Potatoes", I: "Onions", J: "Apples"
  },
  sizes: {
    A: "3", B: "4", C: "1", D: "2", E: "1", F: "1", G: "1", H: "2", I: "2", J: "4"
  },
  limits: {
    A: 3, B: 3, C: 2, D: 3, E: 1, F: 1, G: 1, H: 2, I: 3, J: 3
  }
};


// 1. Initialize the button groups in the Settings Table
// Special handling for Limit Servings to update Order Grid visibility
function updateOrderTableVisibility() {
  const toggleOrderBtn = document.getElementById('toggle-order-btn');
  const is2X = toggleOrderBtn && toggleOrderBtn.classList.contains('active-2x');

  const rows = rowIds;
  let totalMaxVisible = 0;
  
  rows.forEach(rowId => {
    const activeLimitBtn = document.querySelector(`#limit-group-${rowId} button.active`);
    // Default to 3 if no limit selected for this row
    const baseLimit = activeLimitBtn ? parseInt(activeLimitBtn.textContent) : 3;
    const effectiveLimit = is2X ? baseLimit * 2 : baseLimit;

    const servingInput = document.getElementById(`serving-input-${rowId}`);
    const multiplier = servingInput ? (parseInt(servingInput.value) || 0) : 0;

    for (let i = 1; i <= 6; i++) {
      const elements = document.querySelectorAll(`.order-col-${i}[data-row="${rowId}"]`);
      
      const isWithinLimit = i <= effectiveLimit;
      const isNotZero = (i * multiplier) !== 0;
      const shouldBeVisible = isWithinLimit && isNotZero;

      if (shouldBeVisible && i > totalMaxVisible) {
        totalMaxVisible = i;
      }

      elements.forEach(el => {
        el.style.visibility = shouldBeVisible ? 'visible' : 'hidden';
        if (!shouldBeVisible && el.classList.contains('active')) {
          el.classList.remove('active');
          if (receiptItems[rowId]) {
            delete receiptItems[rowId];
            renderReceipt();
          }
        }
      });
    }
  });

  // Second, handle headers (elements with order-col class but NO data-row attribute)
  for (let i = 1; i <= 6; i++) {
    const headers = document.querySelectorAll(`.order-col-${i}:not([data-row])`);
    // Ensure headings 1, 2, 3 are always visible. 
    // Higher headings (4, 5, 6) follow totalMaxVisible.
    const shouldHeaderBeVisible = i <= 3 || i <= totalMaxVisible;
    headers.forEach(h => {
      h.style.visibility = shouldHeaderBeVisible ? 'visible' : 'hidden';
    });
  }
}

document.querySelectorAll('.limit-buttons').forEach(group => {
  const buttonsInGroup = group.querySelectorAll('button');
  setupToggleButtons(buttonsInGroup, updateOrderTableVisibility);
});

// 2. Initialize the numbered buttons in the Order Table
// State to track receipt data
let receiptItems = {}; // { rowId: { name: string, value: number, colIndex: number } }

function renderReceipt() {
  const container = document.getElementById('receipt-items');
  const totalEl = document.getElementById('receipt-total');
  if (!container || !totalEl) return;

  container.innerHTML = '';
  let totalColIndex = 0;

  // Sort keys alphabetically A, B, ...
  Object.keys(receiptItems).sort().forEach(rowId => {
    const item = receiptItems[rowId];
    if (item.value > 0) {
      const row = document.createElement('div');
      row.className = 'receipt-item';
      row.innerHTML = `<span>${item.name}</span><span>${item.value}</span>`;
      container.appendChild(row);
      totalColIndex += item.colIndex;
    }
  });

  totalEl.textContent = totalColIndex;
}

const orderRowButtons = document.querySelectorAll('.num-btn');

orderRowButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const rowId = btn.getAttribute('data-row'); 
    const nameInput = document.getElementById(`name-input-${rowId}`);
    const nameValue = nameInput ? nameInput.value.trim() : '';

    if (!nameValue) {
      btn.classList.remove('active');
      return;
    }

    const isAlreadyActive = btn.classList.contains('active');
    
    // Toggle logic for THIS row's buttons only
    const siblingButtons = document.querySelectorAll(`.num-btn[data-row="${rowId}"]`);
    siblingButtons.forEach(b => b.classList.remove('active'));
    
    if (!isAlreadyActive) {
      btn.classList.add('active');
      // Extract column index from class (e.g., order-col-3 -> 3)
      let colIndex = 0;
      const colClass = Array.from(btn.classList).find(c => c.startsWith('order-col-'));
      if (colClass) {
        colIndex = parseInt(colClass.replace('order-col-', ''));
      }
      receiptItems[rowId] = { name: nameValue, value: parseInt(btn.textContent), colIndex: colIndex };
    } else {
      delete receiptItems[rowId];
    }

    renderReceipt();
  });
});

// 3. Name and Serving synchronization
rowIds.forEach(rowId => {
  const nameInput = document.getElementById(`name-input-${rowId}`);
  const nameOutput = document.getElementById(`name-output-${rowId}`);
  const servingInput = document.getElementById(`serving-input-${rowId}`);

  // Name sync
  if (nameInput && nameOutput) {
    // Initial sync
    nameOutput.textContent = nameInput.value;

    nameInput.addEventListener('input', () => {
      const newVal = nameInput.value;
      nameOutput.textContent = newVal;
      
      if (receiptItems[rowId]) {
        if (newVal.trim() === '') {
          delete receiptItems[rowId];
          const rowButtons = document.querySelectorAll(`.num-btn[data-row="${rowId}"]`);
          rowButtons.forEach(b => b.classList.remove('active'));
        } else {
          receiptItems[rowId].name = newVal;
        }
        renderReceipt();
      }
    });
  }

  // Serving sync (multiplier)
  function updateRowSelectorLabels() {
    if (!servingInput) return;
    const rawValue = servingInput.value.trim();
    // Use 1 as fallback only if rawValue is completely empty or not a number
    const parsed = parseInt(rawValue);
    const multiplier = isNaN(parsed) ? 0 : parsed;
    
    for (let i = 1; i <= 6; i++) {
      const elements = document.querySelectorAll(`.order-col-${i}[data-row="${rowId}"]`);
      elements.forEach(el => {
        const newVal = i * multiplier;
        el.textContent = newVal;
        
        if (el.classList.contains('active')) {
          if (receiptItems[rowId]) {
            receiptItems[rowId].value = newVal;
          }
        }
      });
    }
    // Update visibility based on potential zero values
    updateOrderTableVisibility();
    renderReceipt();
  }

  if (servingInput) {
    servingInput.addEventListener('input', updateRowSelectorLabels);
  }

  // 4. Reset Row functionality (Settings table)
  const resetBtn = document.getElementById(`reset-row-${rowId}`);
  const limitGroup = document.getElementById(`limit-group-${rowId}`);

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (nameInput) {
        nameInput.value = '';
        if (nameOutput) nameOutput.textContent = '';
      }
      
      delete receiptItems[rowId];
      renderReceipt();

      if (servingInput) {
        servingInput.value = '';
        updateRowSelectorLabels();
      }
      
      if (limitGroup) {
        const buttons = limitGroup.querySelectorAll('button');
        buttons.forEach(btn => btn.classList.remove('active'));
        // Default to "3" (no limit) on reset
        const defaultBtn = Array.from(buttons).find(btn => btn.textContent === '3');
        if (defaultBtn) defaultBtn.classList.add('active');
      }

      // Explicitly clear active buttons in the order grid for this row
      const rowButtons = document.querySelectorAll(`.num-btn[data-row="${rowId}"]`);
      rowButtons.forEach(btn => btn.classList.remove('active'));

      updateOrderTableVisibility();
      resetBtn.blur();
    });
  }

  // 5. Order Table Reset Row functionality
  const orderResetBtn = document.getElementById(`order-reset-${rowId}`);
  if (orderResetBtn) {
    orderResetBtn.addEventListener('click', () => {
      const rowButtons = document.querySelectorAll(`.num-btn[data-row="${rowId}"]`);
      rowButtons.forEach(btn => btn.classList.remove('active'));
      
      delete receiptItems[rowId];
      renderReceipt();
      
      orderResetBtn.blur();
    });
  }

  // Initialize labels for this row
  updateRowSelectorLabels();
});

// 6. Reset All functionality
const resetAllBtn = document.getElementById('reset-all-btn');
if (resetAllBtn) {
  resetAllBtn.addEventListener('click', () => {
    // 1. Trigger each row's individual reset button
    rowIds.forEach(rowId => {
      const resetBtn = document.getElementById(`reset-row-${rowId}`);
      if (resetBtn) {
        // We use click() to reuse the existing row-reset logic
        resetBtn.click();
      }
    });

    // 2. Final global updates
    resetAllBtn.blur();
  });
}

// 7. Toggle Settings logic
const settingsToggleBtn = document.getElementById('settings-toggle-btn');
const settingsHideBtn = document.getElementById('settings-hide-btn');
const headerHideSettingsBtn = document.getElementById('header-hide-settings-btn');
const settingsContainer = document.getElementById('settings-container');

if (settingsToggleBtn && settingsContainer) {
  settingsToggleBtn.addEventListener('click', () => {
    settingsContainer.classList.toggle('collapsed');
    settingsToggleBtn.blur();
  });
}

if ((settingsHideBtn || headerHideSettingsBtn) && settingsContainer) {
  const hideAction = () => {
    settingsContainer.classList.add('collapsed');
  };
  if (settingsHideBtn) settingsHideBtn.addEventListener('click', hideAction);
  if (headerHideSettingsBtn) headerHideSettingsBtn.addEventListener('click', hideAction);
}

// 8. Toggle Order button logic
const toggleOrderBtn = document.getElementById('toggle-order-btn');

function resetFullOrder() {
  const orderButtons = document.querySelectorAll('.num-btn');
  orderButtons.forEach(btn => btn.classList.remove('active'));
  receiptItems = {};
  renderReceipt();
}

if (toggleOrderBtn) {
  toggleOrderBtn.addEventListener('click', () => {
    const isCurrently2X = toggleOrderBtn.classList.contains('active-2x');
    
    if (isCurrently2X) {
      // Transition from 2X back to 1X
      toggleOrderBtn.textContent = '2X Order';
      toggleOrderBtn.classList.remove('active-2x');
      resetFullOrder(); // Erase and reset order when reverting to 1X
      updateOrderTableVisibility();
    } else {
      // Transition from 1X to 2X
      toggleOrderBtn.textContent = 'Back to 1X Order';
      toggleOrderBtn.classList.add('active-2x');
      updateOrderTableVisibility();
    }
    
    toggleOrderBtn.blur();
  });
}

// 9. One of Each logic
const oneOfEachBtn = document.getElementById('one-of-each-btn');
if (oneOfEachBtn) {
  oneOfEachBtn.addEventListener('click', () => {
    rowIds.forEach(rowId => {
      const firstBtn = document.querySelector(`.num-btn.order-col-1[data-row="${rowId}"]`);
      if (firstBtn && firstBtn.style.visibility !== 'hidden') {
        const nameInput = document.getElementById(`name-input-${rowId}`);
        const nameValue = nameInput ? nameInput.value.trim() : '';
        
        // Only click if it has a name and is not already active
        if (nameValue && !firstBtn.classList.contains('active')) {
          firstBtn.click();
        }
      }
    });
    oneOfEachBtn.blur();
  });
}

// 10. Get Maximum logic
const getMaxBtn = document.getElementById('get-max-btn');
if (getMaxBtn) {
  getMaxBtn.addEventListener('click', () => {
    rowIds.forEach(rowId => {
      const btns = Array.from(document.querySelectorAll(`.num-btn[data-row="${rowId}"]`))
        .filter(btn => btn instanceof HTMLElement && btn.style.visibility !== 'hidden');
      
      if (btns.length > 0) {
        // Find the one with the highest numeric value in textContent
        const maxBtn = btns.reduce((prev, current) => {
          const prevVal = parseInt(prev.textContent || '0');
          const currVal = parseInt(current.textContent || '0');
          return prevVal > currVal ? prev : current;
        });

        const nameInput = document.getElementById(`name-input-${rowId}`);
        const nameValue = nameInput ? nameInput.value.trim() : '';
        
        if (nameValue && !maxBtn.classList.contains('active')) {
          maxBtn.click();
        }
      }
    });
    getMaxBtn.blur();
  });
}

// 11. Order Table reset all
const orderResetAllBtn = document.getElementById('order-reset-all');
if (orderResetAllBtn) {
  orderResetAllBtn.addEventListener('click', () => {
    resetFullOrder();
    orderResetAllBtn.blur();
  });
}

// 12. Sample Data dropdown logic
const sampleDataSelect = document.getElementById('sample-data-select');
if (sampleDataSelect) {
  sampleDataSelect.addEventListener('change', (e) => {
    const type = e.target.value;
    if (!type) return;

    rowIds.forEach(rowId => {
      const fillNames = () => {
        const input = document.getElementById(`name-input-${rowId}`);
        if (input) {
          input.value = SAMPLE_DATA.names[rowId];
          input.dispatchEvent(new Event('input'));
        }
      };

      const fillSizeOne = () => {
        const input = document.getElementById(`serving-input-${rowId}`);
        if (input) {
          input.value = "1";
          input.dispatchEvent(new Event('input'));
        }
      };
      
      const fillSizes = () => {
        const input = document.getElementById(`serving-input-${rowId}`);
        if (input) {
          input.value = SAMPLE_DATA.sizes[rowId];
          input.dispatchEvent(new Event('input'));
        }
      };
      
      const fillLimits = () => {
        const limitValue = SAMPLE_DATA.limits[rowId];
        const group = document.getElementById(`limit-group-${rowId}`);
        if (group) {
          const buttons = group.querySelectorAll('button');
          buttons.forEach(btn => btn.classList.remove('active'));
          const targetBtn = Array.from(buttons).find(btn => parseInt(btn.textContent) === limitValue);
          if (targetBtn) targetBtn.classList.add('active');
        }
      };

      if (type === 'names') {
        fillNames();
        fillSizeOne();
      } else if (type === 'sizes') {
        fillSizes();
      } else if (type === 'limits') {
        fillLimits();
        updateOrderTableVisibility();
      } else if (type === 'all') {
        fillNames();
        fillSizes();
        fillLimits();
        updateOrderTableVisibility();
      }
    });

    // Reset dropdown
    sampleDataSelect.value = "";
    sampleDataSelect.blur();
  });
}

console.log("Scripts loaded and ready!");
