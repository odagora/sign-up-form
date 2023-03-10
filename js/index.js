function initValidation(form) {
  form.setAttribute("novalidate", "")

  /**
   * Prevent default submission behavior on validation error
   */
  form.addEventListener("submit", (event) => {
    const allValid = form.checkValidity();
    if (!allValid) {
      event.preventDefault();
    }
  })

  const fields = Array.from(form.elements)

  fields.forEach(field => {
    field.setAttribute("aria-invalid", false);
    const errorBox = document.createElement("div");
    errorBox.classList.add("error");
    const errorId = `${field.id} Error`;
    errorBox.setAttribute("id", errorId);
    field.setAttribute("aria-describedBy", errorId);
    field.insertAdjacentElement("afterend", errorBox);

    field.addEventListener("invalid", () => {
      field.setAttribute("aria-invalid", true);
      field.setAttribute("placeholder", "");
      field.parentElement.querySelector('.error-icon').style.display = 'block';
      field.closest('.input-container').querySelector('.button').style.opacity = '60%';
      const message = getMessage(field);
      errorBox.textContent = message || field.validationMessage;
    })

    /**
     * Execute validation when element loses focus
     */
    field.addEventListener("blur", () => {
      field.checkValidity();
    })

    /**
     * Avoid to execute re-validation as user types
     */
    field.addEventListener("input", () => {
      debounceCheckValidity(field, fields, errorBox);
    })
  })
}

const debounceCheckValidity = debounce((field, fields, errorBox) => {
  inputCheckValidity(field, fields, errorBox)
})

function inputCheckValidity(field, fields, errorBox) {
  const validField = field.checkValidity();
  const formValid = fields.every(ele => ele.ariaInvalid === 'false' && ele.value !== "");
  if (validField) {
    field.setAttribute("aria-invalid", false);
    field.parentElement.querySelector('.error-icon').style.display = 'none';
    errorBox.textContent = "";
  }
  if (formValid) {
    form.querySelector('.button').style.opacity = '100%';
  }
}

function formCheckValidity(form) {
  const validForm = form.checkValidity();

  if(validForm) {
    form.querySelector('.button').style.opacity = '100%';
  }
}

function getMessage(field) {
  const validity = field.validity;
  if (validity.valueMissing) return `${formatFieldName(field.name)} cannot be empty`;
  if (validity.typeMismatch) return `Looks like this is not an ${field.name}`;
}

function formatFieldName(name) {
  return name
    .toLowerCase()
    .split('-')
    .map(word => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
    .join(' ');
}

function debounce(callBack, delay = 250) {
  let timeout;

  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      callBack(...args)
    }, delay)
  }
}

const form = document.querySelector("form");
initValidation(form);