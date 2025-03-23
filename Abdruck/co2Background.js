function berechnen() {
    let haus = parseFloat(document.getElementById('wohnflaeche').value) * 0.02;
    let mobilitaet = document.getElementById('auto').value === 'Ja' ? 2 : 0;
    mobilitaet += parseFloat(document.getElementById('flugstunden').value) * 0.25;
    let ernaehrung = document.getElementById('fleisch').value === 'Ja' ? 1.5 : 0.8;
    let sonstiges = 2;
    let gesamt = haus + mobilitaet + ernaehrung + sonstiges;
    
    document.getElementById('haus').innerText = haus.toFixed(2);
    document.getElementById('mobilitaet').innerText = mobilitaet.toFixed(2);
    document.getElementById('ernaehrung').innerText = ernaehrung.toFixed(2);
    document.getElementById('sonstiges').innerText = sonstiges.toFixed(2);
    document.getElementById('gesamt').innerText = gesamt.toFixed(2);
    document.getElementById('ergebnis').style.display = 'table';
}
document.getElementById("menu-button").addEventListener("click", function() {
    window.location.href = "../index.html";
});