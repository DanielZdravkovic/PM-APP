document.addEventListener("DOMContentLoaded", function () {

    function getRandomQuizObject(){
        fetchJsonObjects().then(quizDaten => {
            const zufaelligerIndex = Math.floor(Math.random() * quizDaten.length);
            const quizObjekt = quizDaten[zufaelligerIndex];
            const containerId = "quizContainer";
            console.log(quizObjekt);
            document.getElementById("quizContainer").innerHTML = quizObjekt.frage;
            switch (quizObjekt.quizArt) {
                case "multipleChoice":
                    loadHtmlIntoContainer("MultipleChoice/quizFront.html", containerId);
                    break;
                case "simple":
                    loadHtmlIntoContainer("Simple/quizFront.html", containerId);
                    break;
                case "slider":
                    loadHtmlIntoContainer("Slider/quizFront.html", containerId);
                    break;
                default:
                    document.getElementById(containerId).innerHTML = "Es gab einen Fehler beim Laden des Quiz: Ungültiger Quiz-Typ:", quizObjekt.type;
            }
        });
    }

    async function fetchJsonObjects(){
        try {
            const response = await fetch("quizJson.json");
            const quizDaten = await response.json();
            return quizDaten; // Return the fetched data
        } catch (error) {
            console.error("Error loading quiz data:", error);
            return []; // Return an empty array in case of an error
        }
    }

    async function loadHtmlIntoContainer(filePath, containerId) {
        try {
            const response = await fetch(filePath); // Fetch the HTML file
            if (!response.ok) {
                throw new Error(`Failed to load HTML file: ${response.statusText}`);
            }
            const htmlContent = await response.text(); // Get the HTML content as text
            document.getElementById(containerId).innerHTML = htmlContent; // Set it into the container
        } catch (error) {
            document.getElementById(containerId).innerHTML = "Es gab einen Fehler beim Laden des Quiz: " + error;
        }
    }

    getRandomQuizObject();

});
