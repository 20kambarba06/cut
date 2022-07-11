let post = document.querySelector('.post')

let url = 'http://localhost:3001/students'

let form = document.forms.register
let inputs = form.querySelectorAll('input')

let father_two = document.querySelector('.father_two')
let nam = document.querySelector('.inp_one')
let god = document.querySelector('.inp_two')

let pattern = {
    name: /^[a-z ,.'-]+$/i,
    year: /[0-9]/g,
};

function validate(field, regex) {
    if (regex.test(field.value)) {
        field.classList.add('valid');
        field.classList.remove('invalid');
    } else {
        field.classList.add('invalid');
        field.classList.remove('valid');
    }
}

inputs.forEach((input) => {
    input.onkeyup = () => {
        validate(input, pattern[input.name]);
    };
});

post.onclick = () => {
    if (nam.classList.contains('invalid') || nam.length === 0 || god.classList.contains('invalid') || god.length === 0) {
        alert('error')
    } else {
        otpravka()
    }
}

function otpravka() {

    axios.post(url, {
        "id": Math.random(),
        "name": nam.value,
        "year": god.value
    })
        .then(res => {
            if (res.status === 200 || res.status === 201) {
                console.log(res.data);
            }
        })

    axios.get(url)
        .then(res => reload(res.data))

}

axios.get(url)
    .then(res => reload(res.data))

function reload(arr) {
    father_two.innerHTML = ''
    setTimeout(() => {
        for (let item of arr) {
            father_two.innerHTML += `
            <div class="info">
                    <div class="number_two">
                        <p>${item.id}</p>
                    </div>
                    <div class="student_two">
                        <p>${item.name}</p>
                    </div>
                    <div class="year_two">
                        <p>${item.year}</p>
                    </div>
                    <div class="create">
                        <img src="../icon/create.svg" class="img_one">
                        <img src="../icon/delete.svg" class="img_two">
            </div>
            `
        }
    }, 200);
}
