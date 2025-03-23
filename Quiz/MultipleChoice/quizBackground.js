function clickedRadio() {
    document.getElementById("checkAnswer").disabled = false;
}

function activateRadiosAsButtons() { 
    const radios = document.getElementsByName("answer");
    for (const radio of radios) {
        radio.addEventListener("click", clickedRadio);
    }
}

activateRadiosAsButtons();

function checkAnswer() { //versteckt und zeigt nach Knopfdruck Html Elemente an
    const correctAnswer = document.getElementById("correctAnswer").textContent;
    const radios = document.getElementsByName("answer");
    for (let i = 0; i < radios.length; i++) {
        const radio = radios[i];
        if (radio.checked && radio.value === correctAnswer) {
           //Keine Zeit zu implementieren
        }
        radio.disabled = true;
    }
    const images = document.getElementsByClassName("imagePlaceholder");
    document.getElementById("answerContainer").style.display = "flex";
    document.getElementById("nextButton").style.visibility = "visible";
    document.getElementById("checkAnswer").style.visibility = "hidden";
    images[0].style.display = "flex";
    images[1].style.display = "none";
}

document.getElementById("checkAnswer").addEventListener("click", checkAnswer);

function back() {
    window.location.href = "../index.html";
}

document.getElementById("backButton").addEventListener("click", back);
