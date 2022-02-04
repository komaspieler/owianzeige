
const https = require('https');
const fs = require('fs');

async function fetchData(url) {
    return new Promise((resolve, reject) => {
        https
            .get(url, response => {
                let data = '';
                response.on('data', chunk => data += chunk);
                response.on('end', () => resolve(JSON.parse(data)));
            })
            .on('error', reject);
    });
}

(async () => {

    const alleOrdnungsaemter = [];

    let nextUrl = 'https://fragdenstaat.de/api/v1/publicbody/?classification_id=228&limit=50'
    while (nextUrl) {
        const result = await fetchData(nextUrl);
        const ordnungsaemter = result.objects.map(ordnungsamt => ({
            id: ordnungsamt.id,
            name: ordnungsamt.name,
            address: ordnungsamt.address
        }))
        alleOrdnungsaemter.push(...ordnungsaemter);
        nextUrl = result.meta.next;
    }

    fs.writeFileSync('ordnungsaemter.json', JSON.stringify(alleOrdnungsaemter, null, 2));
    console.log(`Gespeicherte Anschriften: ${alleOrdnungsaemter.length}`);

})();
