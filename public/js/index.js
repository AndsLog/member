$(document).ready(function() {
    getMembers();
});

function getMembers() {
    let apiUrl = 'http://localhost:3000/api/take';
    let reqInit = {
        "headers": new Headers({'Content-Type': 'application/json'}),
        "method": 'GET'
    }

    return window.fetch(apiUrl, reqInit).then(function(res) {
        res.json().then(function(resJson) {
            let docs = resJson['docs'];
            // // let docs = resJson.docs;
            // for(let i = 0; i< docs.length; i ++){
            //     let name = docs[i].name;
            //     let age = docs[i].age;
            //     let sex = docs[i].sex;
            //     let id = docs[i]._id;
            //     let trElement = `<tr data-memberId="${id}">
            //                         <td>${name}</td>
            //                         <td>${age}</td>
            //                         <td>${sex}</td>
            //                     </tr>`;
            //     $('#member-list').append(trElement);
            // }
            // let trElement;
            docs.map(function(doc) {
                let name = doc.name;
                let age = doc.age;
                let sex = doc.sex;
                let id = doc._id;
                let trElement = `<tr data-memberId="${id}">
                                    <td id="td-name">${name}</td>
                                    <td id="td-age">${age}</td>
                                    <td id="td-sex">${sex}</td>
                                    <td>
                                        <button type="button" id="delete">刪除</button>
                                        <button type="button" id="update" data-toggle="modal" data-target="#update-modal">修改</button>
                                    </td>
                                </tr>`;
                $('#member-list').append(trElement);
            });
            // $('#member-list').append(trElement);
        })
    })
}

$(document).on('click', '#submit', function() {
    let name = $('#name').val();
    let age = $('#age').val();
    let sex = $('#sex').val();

    let apiUrl = 'http://localhost:3000/api/create';
    let reqInit = {
        "headers": new Headers({'Content-Type': 'application/json'}),
        "method": 'POST',
        "body": JSON.stringify({
            "name_key": name,
            "age_key": age,
            "sex_key": sex
        })
    }

    console.log('name:' + name + ', age:' + age + ', sex:' + sex);
    console.log(`name:${name}, age: ${age}, sex: ${sex}`); //模板字串

    return window.fetch(apiUrl, reqInit).then(function (res) {
        res.json().then(function (resJson) {
            let id = resJson.id_key;
            let name = resJson.name;
            let age = resJson.age;
            let sex = resJson.sex;
            let trElement = `<tr data-memberId="${id}">
                                <td id="td-name">${name}</td>
                                <td id="td-age">${age}</td>
                                <td id="td-sex">${sex}</td>
                                <td>
                                    <button type="button" id="delete">刪除</button>
                                    <button type="button" id="update" data-toggle="modal" data-target="#update-modal">修改</button>
                                </td>
                            </tr>`;
            console.log(resJson);
            $('#member-list').append(trElement);
        })
        console.log(res);
    })
});

$(document).on('click', '#update', function() {
    let tdName = $(this).parent().parent().find('#td-name').text();
    let tdAge = $(this).parent().parent().find('#td-age').text();
    let tdSex = $(this).parent().parent().find('#td-sex').text();

    // 重要!! 取得id的方法，.attr('data-memberId')指的是取得屬性data-memberId的值
    let memberId = $(this).parent().parent().attr('data-memberId');

    $('#name_m').val(tdName);
    $('#age_m').val(tdAge);
    $('#sex_m').val(tdSex);
})
