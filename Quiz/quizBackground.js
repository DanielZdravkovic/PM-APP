document.addEventListener("DOMContentLoaded", function () {

    const quizDaten = fetch("quiz.json")
        .then(response => response.json())
        .then(data => {
        })

    const zufaelligerIndex = Math.floor(Math.random() * quizDaten.length);
});
