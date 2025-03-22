function activateImagesAsButtons() {
    const imageAnswers = document.getElementsByClassName("imagePlaceholder");

    function clickOnImage() {
        if (this.id === document.getElementById("correctAnswer").textContent) {
            alert("correct");// Do something if correct
        }

        document.getElementById("answerContainer").style.visibility = "visible";
        document.getElementById("nextButton").style.visibility = "visible";

        // Remove click event from all images
        for (const img of imageAnswers) {
            img.removeEventListener("click", clickOnImage);
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