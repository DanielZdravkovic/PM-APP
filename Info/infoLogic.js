async function loadBubbles() {
    try {
        const response = await fetch("bubbles.json");
        if (!response.ok) throw new Error("Fehler beim Laden der JSON-Datei");

        const bubbles = await response.json();
        if (!bubbles || bubbles.length === 0) {
            console.warn("Keine Bubbles gefunden.");
            return;
        }

        const container = document.getElementById("DivBubbleId");
        if (!container) {
            console.error("Fehler: Container 'DivBubbleId' nicht gefunden.");
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
                div.appendChild(textElement);
                textElement.className = "text";
                textElement.innerText = bubble.text;
                div.onclick = () => window.location.href = bubble.link;
                console.log("Bubble erstellt:", bubble.text);

                // Position berechnen
                div.style.position = "absolute";
                div.style.left = `${(bubble.x / 100) * imgWidth}px`;
                div.style.top = `${(bubble.y / 100) * imgHeight}px`;
                div.style.zIndex = "10";

                container.appendChild(div);
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

loadBubbles();
