import { Link } from 'react-router-dom';

export function createJoinForm() {
<p1> hello</p1>

const joinContainer = document.createElement('div');
joinContainer.className = 'join-container';

const joinHeader = document.createElement('header');
joinHeader.className = 'join-header';
joinContainer.appendChild(joinHeader);

const h1 = document.createElement('h1');
h1.innerHTML = '<i class="fas fa-plane"></i> SafeTravels Chat';
joinHeader.appendChild(h1);

const joinMain = document.createElement('main');
joinMain.className = 'join-main';
joinContainer.appendChild(joinMain);

const form = document.createElement('form');
form.action = 'chat.html';
joinMain.appendChild(form);

const formControl1 = document.createElement('div');
formControl1.className = 'form-control';
form.appendChild(formControl1);

const label1 = document.createElement('label');
label1.htmlFor = 'username';
label1.textContent = 'First and Last Name';
formControl1.appendChild(label1);

const input1 = document.createElement('input');
input1.type = 'text';
input1.name = 'username';
input1.id = 'username';
input1.placeholder = 'Enter first and last name...';
input1.required = true;
formControl1.appendChild(input1);

const formControl2 = document.createElement('div');
formControl2.className = 'form-control';
form.appendChild(formControl2);

const label2 = document.createElement('label');
label2.htmlFor = 'room';
label2.textContent = 'Room';
formControl2.appendChild(label2);

const select = document.createElement('select');
select.name = 'room';
select.id = 'room';
formControl2.appendChild(select);

const option1 = document.createElement('option');
option1.value = 'JavaScript';
option1.textContent = 'Trip ID 1';
select.appendChild(option1);

const option2 = document.createElement('option');
option2.value = 'Python';
option2.textContent = 'Trip ID 2';
select.appendChild(option2);

const option3 = document.createElement('option');
option3.value = 'PHP';
option3.textContent = 'Trip ID 3';
select.appendChild(option3);

const option4 = document.createElement('option');
option4.value = 'C#';
option4.textContent = 'Trip ID 4';
select.appendChild(option4);

const option5 = document.createElement('option');
option5.value = 'Ruby';
option5.textContent = 'Trip ID 5';
select.appendChild(option5);

const option6 = document.createElement('option');
option6.value = 'Java';
option6.textContent = 'Trip ID 6';
select.appendChild(option6);

const button = document.createElement('button');
button.type = 'submit';
button.className = 'btn';
<Link to="/initChat">
  <button type="submit">Join Chat</button>
</Link>
form.appendChild(button);

document.body.innerHTML = '';
document.body.appendChild(joinContainer);
}


