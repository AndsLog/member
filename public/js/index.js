$(document).ready(function() {

});
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
        console.log(res);
    })
});

