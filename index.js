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


let array = [1, 2, 3, 4, 2, 3, 5, 6, 1];

function getUniqueItems(arr) {
  return arr.reduce((accumulator, element) => {
    if (!accumulator.includes(element)) {
      accumulator.push(element)
    }
    console.log(accumulator)
    return accumulator
  }, [])
}

function getUniqueItems1(arr) {
  let seen = {};

  return arr.filter(item => {
    if (seen.hasOwnProperty(item)) {
      return false
    } else {
      return seen[item] = true
    }
  })

}

function getUniqueItems2(arr) {
  return new Set([arr])
}

getUniqueItems2(array)

console.log(getUniqueItems1(array))


const inputs = document.getElementById("weather");
const submitted = document.getElementById("start");
const wrap = document.createElement('div');
const img = document.querySelector('.imgs');
img.classList.add('hide')
  wrap.id = 'memo';
document.querySelectorAll('.container')[1].append(wrap);
let p = document.createElement("p")
document.querySelectorAll('.container')[1].append(p)



async function getWeatherData(arr) {

  try {
   
    let url = `https://api.weatherapi.com/v1/current.json?key=cc188cc6067b493aae3194433250302&q=${arr}`
    
    let response = await fetch(url);
    if (!response.ok) {
      throw new Error("Server down!")
    }
    
    let data = await response.json();
    console.log(data)
    return data;
  } catch (err) {
   
    img.classList.add('hide')
    return null; 
  }
}

async function inputData() {
  img.classList.remove('hide')
  const myValue = inputs.value.trim();
  console.log(myValue)
  
  displayerror(" ")
  wrap.innerHTML = "";

  if (!myValue) {
    displayerror("Please enter a location!");
    img.classList.add('hide');
    return;
  }
  

    let data = await getWeatherData(myValue);

    if (!data || !data.location) {
      displayerror("Invalid Location or Please Check your Network connection and try again!");
      return;
    }
    console.log(data.location.name.toLowerCase(),data.location.region.toLowerCase(), data.location.country.toLowerCase(), myValue)
    if (data.location.name.toLowerCase() === myValue.toLowerCase() || data.location.region.toLowerCase() === myValue.toLowerCase() || data.location.country.toLowerCase() === myValue.toLowerCase()) {
    

    
      console.log(data.current.condition.icon)
      img.classList.add('hide')
      let div = ` <div class="status">
        <p>Country: <span class="country">${data.location.country}</span></p>
        <p>Place: <span class="country">${data.location.name}</span></p>
        <p>Region: <span class="country">${data.location.region}</span></p>
        <p>Temperature: <span class="country">${data.current.temp_c}&degC</span></p>
        <p>Humidity: <span class="country">${data.current.humidity}%</span></p>
        <div class="condi">
          <p>Condition: ${data.current.condition.text} </p>
          <img class="shine" src="${data.current.condition.icon}" alt="">
        </div>
      </div>`;
    
      wrap.innerHTML = div;
      
    } else {
      img.classList.add('hide')

      displayerror("Location Mismatch!")
      
      return;
    }
  

    
 

}

function displayerror(msg) {
 
  p.classList.add('error')
  return p.innerHTML = msg
  
}



submitted.addEventListener('click', inputData)


const inputted = document.getElementById("myValue");
const submitting = document.getElementById("submitting");

let editFlag = false;
let editElement;
let editId;


submitting.addEventListener('click', (event) => {
  event.preventDefault();
  let enter = inputted.value
  let id = new Date().getTime().toString();

  if (enter && !editFlag) {
    let mi = document.createElement("div");
    mi.classList.add('cont');
    mi.id = id;
    let me = ` <div class="cor">
            <p>${enter}</p>
          </div>`;
    mi.innerHTML = me;
    document.querySelector(".contained").append(mi)

    inputted.value = "";
    
    

    console.log("logger");
  } else if (enter && editFlag) {
    console.log("editing")
  }
  else {
    console.log("input empty")
  }
})

