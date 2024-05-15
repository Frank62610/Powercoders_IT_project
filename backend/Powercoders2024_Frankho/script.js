

function changeimage(){
    var img = document.getElementById('image');
    img.src = 'Pictures/dancer.jpg';
}

function changeimage1(){
    var img = document.getElementById('image');
    img.src = 'Pictures/output1.jpg';
}

function changeimage2(){
    var img = document.getElementById('image');
    img.src = 'Pictures/service.jpg';
}

function changeimage3(){
    var img = document.getElementById('image');
    img.src = 'Pictures/pencil.jpg';
}

function changeimage4(){
    alert("Linking you to Google. Please wait....")
}


function changeimage6(){
    var img = document.getElementById('image');
    img.src = 'Pictures/Air Jordan.jpg';
}


function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

const decode_jwt = parseJwt(document.cookie)
console.log(decode_jwt.username)

document.querySelector(".font-header").innerHTML = `Hello ${decode_jwt.username}!`


// let tempElement = document.createElement('div');
// tempElement.innerHTML = `Hello ${decode_jwt.username}!`;
// document.querySelector(".font-header").appendChild(tempElement);


