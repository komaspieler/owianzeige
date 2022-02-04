
let ordnungsaemter = [];

function ladeOrdnungsaemter(callback) {
    let xObj = new XMLHttpRequest();
    xObj.overrideMimeType('application/json');
    xObj.open('GET', './ordnungsaemter.json', true);
    xObj.onreadystatechange = () => {
        if (xObj.readyState === 4 && xObj.status === 200) {
            callback(JSON.parse(xObj.responseText));
        }
    };
    xObj.send(null);
}

let newSelect = document.getElementById('owiOrdnungsaemterSelect');
ladeOrdnungsaemter(geladeneOrdnungsaemter => {
    ordnungsaemter = geladeneOrdnungsaemter;
    for (let ordnungsamt of ordnungsaemter) {
        let opt = document.createElement("option");
        opt.value = ordnungsamt.id;
        opt.innerHTML = ordnungsamt.name;
        newSelect.appendChild(opt);
    }
});

function onSelectOrdnungsamt(selectObject) {
    let ordnungsamtId = selectObject.value;
    let ordnungsamt = ordnungsaemter.find(ordnungsamt => ordnungsamt.id == ordnungsamtId);
    let ordnungsamtAdresseInput = document.getElementById('owiAdresseOrdnungsamt');
    ordnungsamtAdresseInput.value = ordnungsamt.name + '\n' + ordnungsamt.address;
}
