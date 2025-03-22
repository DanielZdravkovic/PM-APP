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
                if(jsonObjects.length === 0){
                    window.location.href = "quizFinished.html";
                    return;
                    //wenn keine Quiz Fragen uebrig sind
                }       
                const zufaelligerIndex = Math.floor(Math.random() * jsonObjects.length);

                const quizObject = jsonObjects[zufaelligerIndex];
                console.log(quizObject);
                jsonObjects.splice(zufaelligerIndex, 1);

                document.getElementById("quizContainer").innerHTML = quizObject.frage;
                switch (quizObject.quizArt) {
                    case "multipleChoice":
                        loadQuiz("MultipleChoice/quizFront.html", quizObject);
                        break;
                    case "simple":
                        loadQuiz("Simple/quizFront.html", quizObject);
                        break;
                    case "slider":
                        loadQuiz("Slider/quizFront.html", quizObject);                       
                        break;
                    default:
                        document.getElementById(containerId).innerHTML = "Es gab einen Fehler beim Laden des Quiz: Ungültiger Quiz-Typ:", quizObjekt.type;
                }
            }

            function loadQuiz(quizPath, quizObject) {

                loadHtmlIntoContainer(quizPath).then(() => {
                    loadQuizScript(quizObject.quizArt);
                }).then(() => {
                    document.getElementById("nextButton").addEventListener("click", function () {
                        runQuizScript();
                    });
                }).then(() => {
                    loadJsonIntoQuiz(quizObject);
                });
                console.log("QuizGeladen");
            }

            async function loadHtmlIntoContainer(filePath) {
                try {
                    const response = await fetch(filePath); 
                    if (!response.ok) {
                        throw new Error(`Failed to load HTML file: ${response.statusText}`);
                    }
                    const htmlContent = await response.text();
                    document.getElementById("quizContainer").innerHTML = htmlContent; 
                } catch (error) {
                    document.getElementById("quizContainer").innerHTML = "Es gab einen Fehler beim Laden des Quiz: " + error;
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

                if (quizObject.quizArt === "simple" || quizObject.quizArt === "multipleChoice") {
                    document.getElementById("correctAnswer").textContent = quizObject.richtig;
                }

                if(quizObject.quizArt === "multipleChoice") {
                    imagePlaceholders[0].style.display = "none";
                
                    const radios = document.getElementsByName("answer");
                    for (let i = 0; i < radios.length; i++) {
                        
                        const label = document.querySelector(`label[for="${radios[i].value}"]`);
                        
                        if (label) {
                            label.textContent = quizObject.antwortmoeglichkeiten[i];
                        }
                    }
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

    });
