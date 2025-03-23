function activateImagesAsButtons() { //Macht Images zu Knoepfen
    const imageAnswers = document.getElementsByClassName("imagePlaceholderContainer");

    function clickOnImage() { //versteckt und zeigt nach Knopfdruck Html Elemente an
        if (this.id === document.getElementById("correctAnswer").textContent) {
            //Keine Zeit zu implementieren
        }

        document.getElementById("answerContainer").style.display = "flex";
        document.getElementById("nextButton").style.visibility = "visible";

        for (const img of imageAnswers) {
            img.removeEventListener("click", clickOnImage);
            img.style.pointerEvents = "none";
        }
    }

    for (const imageAnswer of imageAnswers) {
        imageAnswer.addEventListener("click", clickOnImage);
    }
}

function back() {
    window.location.href = "../index.html";
}

activateImagesAsButtons();

document.getElementById("backButton").addEventListener("click", back);