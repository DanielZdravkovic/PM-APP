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
                
        function runQuizScript() { //Nimmt zufaelliges Quiz aud Liste und nutzt basierend auf Art vorgefertigtes Template

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

            function loadQuiz(quizPath, quizObject) { //Laedt Quiz Daten ins quizMain.html

                loadHtmlIntoContainer(quizPath, quizObject).then(() => {
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

            async function loadHtmlIntoContainer(filePath, quizObject) { //Laedt HTML Part des Templates
                try {
                    const response = await fetch(filePath); 
                    if (!response.ok) {
                        throw new Error(`Failed to load HTML file: ${response.statusText}`);
                    }
                    const htmlContent = await response.text();
                    switch(quizObject.quizArt){
                        case "multipleChoice":
                            document.getElementById("quizContainerMultipleChoice").innerHTML = htmlContent;
                            document.getElementById("quizContainerSimple").innerHTML = "";
                            document.getElementById("quizContainerSlider").innerHTML = "";
                            break;
                        case "simple":
                            document.getElementById("quizContainerMultipleChoice").innerHTML = "";
                            document.getElementById("quizContainerSimple").innerHTML = htmlContent;
                            document.getElementById("quizContainerSlider").innerHTML = "";
                            break; 
                        case "slider":
                            document.getElementById("quizContainerMultipleChoice").innerHTML = "";
                            document.getElementById("quizContainerSimple").innerHTML = "";
                            document.getElementById("quizContainerSlider").innerHTML = htmlContent;
                            break;
                        default:
                            document.getElementById("quizContainerMultipleChoice").innerHTML = "Es gab einen Fehler beim Laden des Quiz: " + error;
                            document.getElementById("quizContainerSimple").innerHTML = "";
                            document.getElementById("quizContainerSlider").innerHTML = "";
                        } 
                } catch (error) {
                    document.getElementById("quizContainerMultipleChoice").innerHTML = "Es gab einen Fehler beim Laden des Quiz: " + error;
                    document.getElementById("quizContainerSimple").innerHTML = "";
                    document.getElementById("quizContainerSlider").innerHTML = "";
                }
            }

            function loadJsonIntoQuiz(quizObject) { //Laedt Json Daten in das Html Template
                const frage = quizObject.frage;
                const antwort = quizObject.antwort;
                const imagePlaceholders = document.getElementsByClassName("imagePlaceholder");
                const imagePlaceholderTitles = document.getElementsByClassName("imagePlaceholderTitle");
                let imageIndex = 0;  
            
                quizObject.bilder.forEach(bild => {
                    if (imagePlaceholders[imageIndex]) {  
                        imagePlaceholders[imageIndex].src = bild.src;
                        imagePlaceholders[imageIndex].alt = bild.alt;
                        if(quizObject.quizArt === "simple"){
                            imagePlaceholderTitles[imageIndex].textContent = bild.title;
                        }
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
            
            function loadQuizScript(quizArt){ //Laedt passendes Skript zur Quiz Art

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
