const apiUrl = 'http://localhost:3000/users';

async function getData() {
  const response = await fetch(apiUrl);
  const data = await response.json();
  
  return data;
}

function addDataToTable(data) {
  const table = document.querySelector('#data');
  
  data.forEach(item => {
    const row = table.insertRow(-1);
    const idCell = row.insertCell(0);
    const nameCell = row.insertCell(1);
    const emailCell = row.insertCell(2);
    const phoneCell = row.insertCell(3);
    const actionsCell = row.insertCell(4);
    
    idCell.innerHTML = item.id;
    nameCell.innerHTML = item.name;
    emailCell.innerHTML = item.email;
    phoneCell.innerHTML = item.phone;
    actionsCell.innerHTML = `
      <button onclick="editData(${item.id})">Edit</button>
      <button onclick="deleteData(${item.id})">Delete</button>
    `;
  });
}

async function addData(event) {
  event.preventDefault();
  
  const name = document.querySelector('#name').value;
  const email = document.querySelector('#email').value;
  const phone = document.querySelector('#phone').value;
  
  const response = await fetch(apiUrl, {
    method: 'POST',
    body: JSON.stringify({
      name: name,
      email: email,
      phone: phone
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  
  const data = await response.json();
  
  const table = document.querySelector('#data');
  const row = table.insertRow(-1);
  const nameCell = row.insertCell(0);
  const emailCell = row.insertCell(1);
  const phoneCell = row.insertCell(2);
  const actionsCell = row.insertCell(3);

  nameCell.innerHTML = data.name;
  emailCell.innerHTML = data.email;
  phoneCell.innerHTML = data.phone;
  actionsCell.innerHTML = `
    <button onclick="editData(${data.id})">Edit</button>
    <button onclick="deleteData(${data.id})">Delete</button>
  `;
  
  document.querySelector('#add-form').reset();
}

async function editData(id) {
  const response = await fetch(apiUrl + '/' + id);
  const data = await response.json();
  
  const name = prompt('Enter name', data.name);
  const email = prompt('Enter email', data.email);
  const phone = prompt('Enter phone', data.phone);
  
  const updatedData = {
    name: name,
    email: email,
    phone: phone
  };
  
  await fetch(apiUrl + '/' + id, {
    method: 'PUT',
    body: JSON.stringify(updatedData),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  
  location.reload();
}

async function deleteData(id) {
  await fetch(apiUrl + '/' + id, {
    method: 'DELETE',
  });
  
  location.reload();
}


async function main() {
  const data = await getData();
  addDataToTable(data);
  
  document.querySelector('#add-form').addEventListener('submit', addData);
}

main();