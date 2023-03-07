var table = document.getElementsByTagName("table")[0];
var menu = document.getElementsByClassName("menu")[0];
var button = document.getElementsByClassName("play-game")[0];
var totalPictures;
var firstFlip, first;
var flipCount = 0;

function startGame() {
    totalPictures = document.getElementById("totalPictures");
    var pictures = [];
    for (i = 0; i < Number(totalPictures.value); i++) {
        pictures.push(`<div></div><img id='${i}' src='photos/placeholder.jpeg' />`);
        pictures.push(`<div></div><img id='${i + 0.5}' src='photos/placeholder.jpeg' />`);
    }

    shuffle(pictures);
    display(pictures);

    /*
    console.log(`totalpictures: ${totalPictures.value}`);
    console.log(`difficulty: ${getRadioValue()}`);
    */
    console.log(`pictures: ${pictures}`);

    button.classList.remove("hide");
    table.classList.remove("hide");
    menu.classList.add("hide");
}

function playGame() {
    let time;

    switch (getRadioValue()) {
        case "easy":
            time = 8000;
            break;
        case "medium":
            time = 5000;
            break;
        case "hard":
            time = 3000;
            break;
    }

    button.classList.add("hide");
    showAll();
    setTimeout(hideAll, time);

}

function getRadioValue() {
    var group = document.getElementsByName("difficulty");

    for (i = 0; i < group.length; i++) {
        if (group[i].checked) {
            return group[i].value;
        }
    }
}

function shuffle(array) {
    var currentIndex = array.length, randomIndex;
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

function display(array) {
    var count = 0;
    for (i = 0; i < 4; i++) {
        var row = document.createElement("tr");
        for (j = 0; j < array.length / 4; j++) {
            var picture = document.createElement("td");
            picture.innerHTML = array[count];
            row.appendChild(picture);
            count++;
        }
        table.appendChild(row);
    }
}

function flip(e) {
    flipCount++;
    picture = document.getElementById(e.id);
    console.log(`element id : ${e.id}`);
    picture.src = `photos/photo${Math.floor(e.id)}.jpeg`;
    picture.onclick = null;

    if (flipCount % 2 == 1) {
        first = Number(e.id);
        firstFlip = Number(Math.floor(e.id));
    } else {
        if (firstFlip != Number(Math.floor(e.id))) {
            picture.parentNode.firstChild.classList.add("incorrect");
            showAll();
            disableAll();
            endGame("Better Luck Next Time!");
        }
        if (firstFlip == Number(Math.floor(e.id))) {
            document.getElementById(first).parentNode.firstChild.classList.add("correct");
            picture.parentNode.firstChild.classList.add("correct");
        }
        if (flipCount == Number(totalPictures.value) * 2) {
            endGame("Congratulations! You Won!");
        }
    }
}

function showAll() {
    var pictureList = document.getElementsByTagName("img");
    for (i = 0; i < pictureList.length; i++) {
        pictureList[i].src = `photos/photo${Math.floor(pictureList[i].id)}.jpeg`;
    }
}

function hideAll() {
    var pictureList = document.getElementsByTagName("img");
    for (i = 0; i < pictureList.length; i++) {
        pictureList[i].src = "photos/placeholder.jpeg";
        pictureList[i].onclick = e => { flip(e.target) };
    }
}

function disableAll() {
    var pictureList = document.getElementsByTagName("img");
    for (i = 0; i < pictureList.length; i++) {
        pictureList[i].onclick = null;
    }
}

function endGame(message) {
    var menu2 = document.getElementsByClassName("menu")[1];
    var endMessage = document.createElement("div");
    var endButton = document.createElement("a");

    endMessage.innerHTML = message;
    endButton.innerHTML = "<button class='play-game'>Try Again?</button>";
    endButton.href = "bIndex.html";
    endButton.style = "text-decoration: none;";

    menu2.appendChild(endMessage);
    menu2.appendChild(endButton);
}