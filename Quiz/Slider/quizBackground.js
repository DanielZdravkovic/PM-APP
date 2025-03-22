            const slider = document.getElementById("customSlider");
            const output = document.getElementById("sliderValue");
            const checkAnswerButton = document.getElementById("checkAnswer");
            const answer = document.getElementById("answer");
            const backButton = document.getElementById("backButton");
        
            function transformValue(val) { //Zahlen anpassen automatisch ueber json implementieren
                console.log(val);
                if (val < 10) {
                    return  10 - val; 
                } 
                else {
                    return val - 8; 
                }
            }
        
            slider.addEventListener("input", function () {
                output.textContent = transformValue(Number(slider.value));
            });

            function checkAnswer() {
                const answerValue = document.getElementById("customSlider").value; 
                alert(answerValue);
                answer.style.visibility = "visible";
                nextButton.style.visibility = "visible";
                checkAnswerButton.style.visibility = "hidden";
            }

            function back() {
                window.location.href = "../index.html";
            }
            
            checkAnswerButton.addEventListener("click", checkAnswer);

            backButton.addEventListener("click", back);