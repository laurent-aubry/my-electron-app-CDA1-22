
// const list = document.querySelector('ul');
const tableHtml = document.querySelector('tbody');

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

        td1.appendChild(text1);
        td2.appendChild(text2);
        td3.appendChild(text3);
        td4.appendChild(text4);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
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
    // const dataRow = (<tr><td>{todo[0].description}</td>
    // <td>{todo[0].complement}</td>
    // <td>{todo[0].echeance}</td>
    // <td>{todo[0].responsibleFor}</td></tr>)

    //const text = document.createTextNode(dataRow);
    // const text = document.createElement(dataRow);

    // debugger;

    // li.appendChild(text);
    td1.appendChild(text1);
    td2.appendChild(text2);
    td3.appendChild(text3);
    td4.appendChild(text4);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tableHtml.appendChild(tr);
});

api.receive('todo:clear', () => {
    // list.innerHTML = '';
    tableHtml.innerHTML = '';
})