    document.addEventListener("DOMContentLoaded", function () {

        let jsonObjects = [];

        async function fetchJsonObjects() {
            try {
                const response = await fetch("./quizJson.json");
                const quizDaten = await response.json();
                console.log(quizDaten);
                return quizDaten;
            } catch (error) {
                console.error("Error loading quiz data:", error);
                return [];
            }
        }

        fetchJsonObjects().then(data => {
            jsonObjects = data;
            runQuizScript();
        });
                
        function runQuizScript() {

            function getRandomQuizObject(){        
                const zufaelligerIndex = Math.floor(Math.random() * jsonObjects.length);

                const quizObject = jsonObjects[0];//eigentlich zufaelligerIndex, jetzt 0 zum testen
                const containerId = "quizContainer";
                console.log(quizObject);
                document.getElementById("quizContainer").innerHTML = quizObject.frage;
                switch (quizObject.quizArt) {
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
                        }).then(() => {
                            loadJsonIntoQuiz(quizObject);
                        });
                        
                        console.log("heheheha");
                        break;
                    default:
                        document.getElementById(containerId).innerHTML = "Es gab einen Fehler beim Laden des Quiz: Ungültiger Quiz-Typ:", quizObjekt.type;
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

            function loadJsonIntoQuiz(quizObject) {
                const frage = quizObject.frage;
                const antwort = quizObject.antwort;
                const imagePlaceholders = document.getElementsByClassName("imagePlaceholder");
                let imageIndex = 0;  
            
                quizObject.bilder.forEach(bild => {
                    if (imagePlaceholders[imageIndex]) {  
                        imagePlaceholders[imageIndex].src = bild.src;
                        imagePlaceholders[imageIndex].alt = bild.alt;
                        imageIndex++;
                    }
                });
            
                const antwortContainer = document.getElementById("answerContainer");
                const frageContainer = document.getElementById("questionContainer");
                
                antwortContainer.textContent = antwort;
                frageContainer.textContent = frage;
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

    });
