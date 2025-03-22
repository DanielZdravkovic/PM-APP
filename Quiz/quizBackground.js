    document.addEventListener("DOMContentLoaded", function () {
        function runQuizScript() {

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
                        loadHtmlIntoContainer("Slider/quizFront.html", containerId).then(() => {
                            loadQuizScript("slider");
                        }).then(() => {
                            document.getElementById("nextButton").addEventListener("click", function () {
                                runQuizScript();
                            });
                        });
                        break;
                    default:
                        document.getElementById(containerId).innerHTML = "Es gab einen Fehler beim Laden des Quiz: Ungültiger Quiz-Typ:", quizObjekt.type;
                }
            });
        }

        async function fetchJsonObjects(){
            try {
                const response = await fetch("./quizJson.json");
                const quizDaten = await response.json();
                return quizDaten; 
            } catch (error) {
                console.error("Error loading quiz data:", error);
                return []; 
            }
        }

        async function loadHtmlIntoContainer(filePath, containerId) {
            try {
                const response = await fetch(filePath); 
                if (!response.ok) {
                    throw new Error(`Failed to load HTML file: ${response.statusText}`);
                }
                const htmlContent = await response.text(); 
                document.getElementById(containerId).innerHTML = htmlContent; 
            } catch (error) {
                document.getElementById(containerId).innerHTML = "Es gab einen Fehler beim Laden des Quiz: " + error;
            }
        }

        function loadQuizScript(quizArt){

            const script = document.createElement("script");

            switch(quizArt){
                case "multipleChoice":
                    script.src = "MultipleChoice/quizBackground.js"; 
                    break;
                case "simple":
                    script.src = "Simple/quizBackground.js"; 
                    break;
                case "slider":
                    script.src = "Slider/quizBackground.js"; 
                    break;
                default:
                    console.error("Error loading quiz script: Invalid quiz type:", quizArt);
                    return;
            }

            document.getElementById("scriptContainer").appendChild(script);
        }

        getRandomQuizObject();

        }

        runQuizScript();
    });
