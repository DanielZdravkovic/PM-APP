    function transformValue(val, side) { //Zahlen anpassen automatisch ueber json implementieren
        let value = 0;
        if (val < 10) {
            value =  10 - val; 
        } 
        else {
            value = val - 8; 
        }

        if(side==="left"){
            return val>9 ? 1 : value;
        }
        else{
            return val>9 ? value : 1;
        }
    }
        
    document.getElementById("customSlider").addEventListener("input", function () {
        document.getElementById("sliderValueLeft").textContent = transformValue(Number(document.getElementById("customSlider").value), "left");
        document.getElementById("sliderValueRight").textContent = transformValue(Number(document.getElementById("customSlider").value), "right");
    });

    function checkAnswer() {
        const answerValue = document.getElementById("customSlider").value; 
        document.getElementById("answerContainer").style.display = "flex";
        nextButton.style.visibility = "visible";
        document.getElementById("checkAnswer").style.display = "none";
        document.getElementById("customSlider").disabled = true;
    }

    function back() {
        window.location.href = "../index.html";
    }
            
    document.getElementById("checkAnswer").addEventListener("click", checkAnswer);

    document.getElementById("backButton").addEventListener("click", back);