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
      const valid = field.checkValidity();
      if (valid) {
        field.setAttribute("aria-invalid", false);
        field.parentElement.querySelector('.error-icon').style.display = 'none';
        errorBox.textContent = "";
      }
    })
  })
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

const form = document.querySelector("form");
initValidation(form);