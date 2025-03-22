    function transformValue(val) { //Zahlen anpassen automatisch ueber json implementieren
        console.log(val);
        if (val < 10) {
            return  10 - val; 
        } 
        else {
            return val - 8; 
        }
    }
        
    document.getElementById("customSlider").addEventListener("input", function () {
        document.getElementById("sliderValue").textContent = transformValue(Number(document.getElementById("customSlider").value));
    });

    function checkAnswer() {
        const answerValue = document.getElementById("customSlider").value; 
        alert(answerValue);
        document.getElementById("answer").style.visibility = "visible";
        nextButton.style.visibility = "visible";
        document.getElementById("checkAnswer").style.visibility = "hidden";
    }

    function back() {
        window.location.href = "../index.html";
    }
            
    document.getElementById("checkAnswer").addEventListener("click", checkAnswer);

    document.getElementById("backButton").addEventListener("click", back);