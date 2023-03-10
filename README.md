# Frontend Mentor - Intro component with sign up form solution

This is a solution to the [Intro component with sign up form challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/intro-component-with-signup-form-5cf91bd49edda32581d28fd1). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)


## Overview

### The challenge

Users should be able to:

- View the optimal layout for the site depending on their device's screen size
- See hover states for all interactive elements on the page
- Receive an error message when the `form` is submitted if:
  - Any `input` field is empty. The message for this error should say *"[Field Name] cannot be empty"*
  - The email address is not formatted correctly (i.e. a correct email address should have this structure: `name@host.tld`). The message for this error should say *"Looks like this is not an email"*

### Screenshots

![Mobile Version](https://bit.ly/3Yvny12)
![Desktop Version](https://bit.ly/3JucJYK)

### Links

- Solution URL: [Click here](https://www.frontendmentor.io/solutions/intro-component-with-sign-up-form-n4vhDR_RaB)
- Live Site URL: [Click here](https://odagora.github.io/sign-up-form/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- BEM methodology
- WCAG AAA accessibility compliance

### What I learned

1. Use of `<label>`, `<input>` and `<span>` html elements for proper html markup validation
    ```html
    <label for="first-name" hidden>First Name</label>
    <input type="text" name="first-name" id="first-name" placeholder="First Name"  aria-label="first name" required>
    <span class="error-icon"></span>
    ```
2. Use of `novalidate` form attribute not to validate form-data when submitted
    ```js
    form.setAttribute("novalidate", "")
    ```
3. Use of `checkValidity()` form method for data validation on submission
    ```js
      form.addEventListener("submit", (event) => {
        const allValid = form.checkValidity();
        if (!allValid) {
          event.preventDefault();
        }
      })
    ```
4. Use of `blur` event listener to execute validation when element loses focus
    ```js
    field.addEventListener("blur", () => {
      field.checkValidity();
    })
    ```
5. Use of `invalid` event listener to execute validation when an input element has been checked and doesn't satisfy its constraints
    ```js
    field.addEventListener("invalid", () => {
      field.setAttribute("aria-invalid", true);
      field.setAttribute("placeholder", "");
      field.parentElement.querySelector('.error-icon').style.display = 'block';
      field.closest('.input-container').querySelector('.button').style.opacity = '60%';
      const message = getMessage(field);
      errorBox.textContent = message || field.validationMessage;
    })
    ```
6. Use of `debounce` principle to optimize `input` event listener and avoid triggering it on every key press
    ```js
    function debounce(callBack, delay = 1000) {
      let timeout;

      return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          callBack(...args)
        }, delay)
      }
    }
    ```
### Continued development

- Use of preprocessors like SASS for styling
- Use of CSS Grid in complex layouts
- Use of transformations and animations with CSS
- Implementation of UI testing
- Use of accessibility principles
- Cross-browser support
- Use of web components for reusability

### Useful resources

- [A Guide To Accessible Form Validation](https://www.smashingmagazine.com/2023/02/guide-accessible-form-validation/) - This helped me for implementing accessibility form validation. I liked the content and I will look forward to using them in future projects.


## Author

- Website - [Daniel González](https://odagora.com)
- Frontend Mentor - [@odagora](https://www.frontendmentor.io/profile/odagora)
- Twitter - [@odagora](https://twitter.com/odagora)


## Acknowledgments

The Frontend Platzi courses helped me out with the basic concepts of semantic HTML, CSS3, BEM methodology and Accessibility.
