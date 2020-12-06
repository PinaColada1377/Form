const submit = document.getElementById('btn');
const ver = document.getElementById('result');
const requestURL = 'https://jsonplaceholder.typicode.com/posts';


submit.addEventListener('click', (e) => {
    e.preventDefault();

    const number = document.getElementById('input');

    if (number.value == ''){
        ver.innerHTML = "<p style = 'color: red'>Заполните поле</p>"
    } else {
        fetch(requestURL, {
            method: 'POST',
            body: JSON.stringify({
              num: number.value
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
          })
          .then(response => {
            if (response.ok){
                return response.json()
            }
            return response.json().then (error => {
                ver.innerHTML = "<p style = 'color: yellow'>Перезагрузите странциу и попробуйте снова</p>"
                const e = new Error("Что-то не так...")
                e.data = error
                throw e
                
            })
          })
          .then(json => {
            ver.innerHTML = "<p style = 'color: green'>Всё хорошо</p>";
            number.value = '';
          })
          .catch(error =>  console.log(error))   
    }
    
})


