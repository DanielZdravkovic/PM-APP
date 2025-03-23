async function loadBubbles() {
    try {
        const response = await fetch("bubbles.json");
        if (!response.ok) throw new Error("Fehler beim Laden der JSON-Datei");

        const bubbles = await response.json();
        if (!bubbles || bubbles.length === 0) {
            console.warn("Keine Bubbles gefunden.");
            return;
        }

        const img = document.getElementById("World-Map");
        if (!img) {
            console.error("Fehler: Bild 'World-Map' nicht gefunden.");
            return;
        }

        console.log("Start - Bild gefunden:", img);

        function generateBubbles() {
            console.log("Bild wurde geladen!");
            const imgWidth = img.clientWidth || img.naturalWidth;
            const imgHeight = img.clientHeight || img.naturalHeight;

            console.log("Bildgröße:", imgWidth, imgHeight);
            if (!imgWidth || !imgHeight) {
                console.warn("Bildgröße konnte nicht ermittelt werden.");
                return;
            }

            bubbles.forEach(bubble => {
                let div = document.createElement("div");
                div.className = "bubbles";
                div.id = bubble.id;
                const textElement = document.createElement("p");
                textElement.className = "text";
                textElement.innerText = bubble.text;
                div.appendChild(textElement);
                div.onclick = () => openPopup(bubble.link);
                console.log("Bubble erstellt:", bubble.text);

                // Position berechnen
                div.style.position = "absolute";
                div.style.left = `${bubble.x}vw`;
                div.style.top = `${bubble.y}vh`;
                div.style.zIndex = "10";
                document.getElementById("World-Map-Div").appendChild(div);
            });
        }

        // Falls das Bild bereits geladen ist:
        if (img.complete) {
            generateBubbles();
        } else {
            img.onload = generateBubbles;
        }
    } catch (error) {
        console.error("Fehler beim Laden der Bubbles:", error);
    }
}

function openPopup(videoSrc) {
    let popup = document.getElementById("video-popup");
    let video = document.getElementById("popup-video");
    if (!popup) {
        popup = document.createElement("div");
        popup.id = "video-popup";
        popup.style.position = "absolute";
        const bubble = event.currentTarget;
        const rect = bubble.getBoundingClientRect();
        popup.style.left = `${rect.left}px`;
        popup.style.top = `${rect.top - 45}px`;
        if(bubble.id === "bArkMee"){
            popup.style.left = `${rect.left + 320}px`;
            popup.style.top = `${rect.top - 90}px`;
        } else if(bubble.id === "bJetStr"){
            popup.style.left = `${rect.left + 530}px`;
            popup.style.top = `${rect.top - 170}px`;
        }

        popup.style.transform = "translate(-50%, -50%)";
        popup.style.width = "40vw";
        popup.style.height = "40vh";
        popup.style.background = "rgba(184, 153, 77, 0.69)";
        popup.style.display = "flex";
        popup.style.justifyContent = "center";
        popup.style.alignItems = "center";
        popup.style.zIndex = "1000";
        popup.style.borderRadius = "10px";
        popup.style.padding = "10px";

        video = document.createElement("video");
        video.id = "popup-video";
        video.autoplay = true;
        video.style.width = "100%";
        video.style.height = "100%";
        video.controls = true;
        
        let closeButton = document.createElement("span");
        closeButton.innerText = "✖";
        closeButton.style.position = "absolute";
        closeButton.style.top = "5px";
        closeButton.style.right = "10px";
        closeButton.style.color = "white";
        closeButton.style.fontSize = "20px";
        closeButton.style.cursor = "pointer";
        closeButton.onclick = () => popup.remove();

        popup.appendChild(video);
        popup.appendChild(closeButton);
        document.getElementById("World-Map-Div").appendChild(popup);
    }
    
    video.src = videoSrc;
    popup.style.display = "flex";
}
document.getElementById("menu-button").addEventListener("click", function() {
    window.location.href = "../index.html";
});

loadBubbles();