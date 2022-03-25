
// const list = document.querySelector('ul');
const tableHtml = document.querySelector('tbody');
let deleteBtn;
let editBtn;

function deleteRow(el) {
    // if (!confirm("Are you sure you want to delete?")) return;
    var tbl = el.parentNode.parentNode.parentNode;
    var row = el.parentNode.parentNode.rowIndex;
    tbl.deleteRow(row-1);
  }

// let deleteBtn = document.createElement("img");
// deleteBtn.src = "assets/trash.svg";
// deleteBtn.classList.add('bi', 'bi-trash');
// deleteBtn.src = "./assets/windows-icon@2x.png";
// $(deleteBtn).addClass("bi bi-trash");

api.receive('initData', initialData => {
    for (let i = 0; i < initialData[0].length; i++) {
        // const li = document.createElement('li');
        // const text = document.createTextNode(initialData[0][i].description);
        // li.appendChild(text);
        // list.appendChild(li);
        const tr = document.createElement('tr');
        const td1 = document.createElement('td');
        const text1 = document.createTextNode(initialData[0][i].description);
        const td2 = document.createElement('td');
        const text2 = document.createTextNode(initialData[0][i].complement);
        const td3 = document.createElement('td');
        const text3 = document.createTextNode(initialData[0][i].echeance);
        const td4 = document.createElement('td');
        const text4 = document.createTextNode(initialData[0][i].responsibleFor);
        const td5 = document.createElement('td');

        
        deleteBtn = document.createElement("button");
        deleteImg = document.createElement("img");
        deleteImg.src = "assets/trash.svg";
        deleteImg.classList.add('bi', 'bi-trash');
        deleteBtn.setAttribute('onclick', 'deleteRow(this)');
        deleteBtn.appendChild(deleteImg);

        editBtn = document.createElement("button");
        editImg = document.createElement("img");
        editImg.src = "assets/pencil-square.svg";
        editImg.classList.add('bi', 'bi-pencil-square');
        // editBtn.setAttribute('onclick', 'deleteRow(this)');
        editBtn.appendChild(editImg);

        td1.appendChild(text1);
        td2.appendChild(text2);
        td3.appendChild(text3);
        td4.appendChild(text4);
        td5.appendChild(deleteBtn);
        td5.appendChild(editBtn);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tableHtml.appendChild(tr);
      }
})

api.receive('todo:add', todo => {
    console.log("todo : ", todo);
    // const li = document.createElement('li');
    const tr = document.createElement('tr');
    const td1 = document.createElement('td');
    const text1 = document.createTextNode(todo[0].description);
    const td2 = document.createElement('td');
    const text2 = document.createTextNode(todo[0].complement);
    const td3 = document.createElement('td');
    const text3 = document.createTextNode(todo[0].echeance);
    const td4 = document.createElement('td');
    const text4 = document.createTextNode(todo[0].responsibleFor);
    const td5 = document.createElement('td');
    // const text5 = document.createTextNode(deleteBtn);
    // const dataRow = (<tr><td>{todo[0].description}</td>
    // <td>{todo[0].complement}</td>
    // <td>{todo[0].echeance}</td>
    // <td>{todo[0].responsibleFor}</td></tr>)

    //const text = document.createTextNode(dataRow);
    // const text = document.createElement(dataRow);

    // debugger;

    // li.appendChild(text);
    // debugger;

    deleteBtn = document.createElement("button");
    // deleteBtn.onclick = (e) => deleteRow(e.target);
    deleteImg = document.createElement("img");
    deleteImg.src = "assets/trash.svg";
    deleteImg.classList.add('bi', 'bi-trash');
    deleteBtn.setAttribute('onclick', 'deleteRow(this)');
    deleteBtn.appendChild(deleteImg);

    editBtn = document.createElement("button");
    editImg = document.createElement("img");
    editImg.src = "assets/pencil-square.svg";
    editImg.classList.add('bi', 'bi-pencil-square');
    // editBtn.setAttribute('onclick', 'deleteRow(this)');
    editBtn.appendChild(editImg);

    td1.appendChild(text1);
    td2.appendChild(text2);
    td3.appendChild(text3);
    td4.appendChild(text4);
    td5.appendChild(deleteBtn);
    td5.appendChild(editBtn);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    tableHtml.appendChild(tr);
});

api.receive('todo:clear', () => {
    // list.innerHTML = '';
    tableHtml.innerHTML = '';
})