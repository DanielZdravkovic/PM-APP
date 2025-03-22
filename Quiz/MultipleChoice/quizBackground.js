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

function checkAnswer() {
    const correctAnswer = document.getElementById("correctAnswer").textContent;
    const radios = document.getElementsByName("answer");
    for (let i = 0; i < radios.length; i++) {
        const radio = radios[i];
        if (radio.checked && radio.value === correctAnswer) {
            alert("Correct");//Do something if correct
        }
        radio.disabled = true;
    }

    document.getElementById("answerContainer").style.visibility = "visible";
    nextButton.style.visibility = "visible";
    document.getElementById("checkAnswer").style.visibility = "hidden";
}

document.getElementById("checkAnswer").addEventListener("click", checkAnswer);

function back() {
    window.location.href = "../index.html";
}

document.getElementById("backButton").addEventListener("click", back);
