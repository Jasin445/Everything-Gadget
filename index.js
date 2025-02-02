const form = document.getElementById("form");
const input = document.querySelectorAll('input');
const message = document.querySelectorAll(".message");


form.addEventListener('submit', event => {
  event.preventDefault();

  let isFormValid = true;

  message.forEach((msg, index) => {
    msg.textContent = "";
    msg.classList.remove('success','failure');

    if (input[index].value.trim() === "") {
      msg.textContent = input[index].id + " is required";
      msg.classList.add('failure');
      isFormValid = false
     }
     else if (input[index].id === "email" && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(input[index].value)
) {
      msg.textContent = "invalid email format";
      msg.classList.add('failure');
      isFormValid = false
    } else if (input[index].id === "password" && input[index].value.length < 7) {
      msg.textContent = "password should be greater than 7 characters";
      msg.classList.add('failure');
      isFormValid = false
    }
     else {
      msg.textContent = input[index].id + " is valid";
      msg.classList.add('success');
      
    }
  })

  setTimeout(() => {
    
    if (isFormValid) {
      form.submit();
    }
  }, 1000);

})
