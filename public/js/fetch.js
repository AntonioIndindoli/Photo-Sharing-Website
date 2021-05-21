function fadeOut(event) {
    var el = document.getElementById(event.id);
    var opacity = 1;
    var timer = setInterval(function () {
        if (opacity <= 0.01) {
            clearInterval(timer);
            el.remove();
            document.getElementById('items-count').innerHTML = `There are ${document.querySelectorAll('.photocard').length} photo(s) being shown`;
        }
        el.style.opacity = opacity;
        el.style.filter = 'alpha(opacity=' + opacity * 100 + ")";
        opacity -= opacity * 0.025;
    }, .001);
}

function createPhotoCard(data) {
    let div = document.createElement('div');
    let img = document.createElement('img');
    let h1 = document.createElement('h1');
    h1.innerText += data.title;
    img.src = data.url;
    img.width = "200"
    img.height = "200";
    div.appendChild(img);
    div.appendChild(h1);
    div.setAttribute('id', data.id);
    div.setAttribute('class', 'photocard');
    img.onclick = function () { fadeOut(data) };
    return div;
}

let mainDiv = document.getElementById("container");

if (mainDiv) {
    let fetchURL = "https://jsonplaceholder.typicode.com/albums/2/photos"
    fetch(fetchURL)
        .then((data) => data.json())
        .then((photos) => {

            let innerHTML = "";
            photos.forEach((photo) => {
                mainDiv.appendChild(createPhotoCard(photo));

            });
            document.getElementById('items-count').innerHTML = `There are ${photos.length} photo(s) being shown`;
        })
        .catch((error) => {
            console.log(error);
        });
}
