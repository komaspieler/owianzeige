async function generateImageSection() {
	var imgInput = document.getElementById('owiPics');
	var result = [];
	

	for(let i = 0; i < imgInput.files['length']; i++) {
		var fr = new FileReader();
		var p1 = new Promise((resolve, reject) => {
		    fr.onerror = () => {
		      fr.abort();
		      reject(new DOMException("Problem parsing input file."));
		    };

		    fr.onload = () => {
		      resolve(fr.result);
		    };

		    fr.readAsDataURL(imgInput.files[i]);
		  });


		result = result.concat([
			{
				text: 'Anlage ' + imgInput.files[i].name + ' ('+ (i+1) +' von ' + imgInput.files['length'] +') zur Anzeige betreffend '+ document.getElementById('owiKennz').value,
				margin: [20,5],
				fontSize: 12,
				pageBreak: 'before',
			},
			{
				image: await p1,
				fit: [500,500],
				margin: [10,20],
			}]);
	}
	
	return result;
}

async function generatePDF() {
	var now = new Date();
	var anzName = document.getElementById('anzName').value;
	var anzStr = document.getElementById('anzStr').value;
	var anzOrt = document.getElementById('anzOrt').value;

	var owiDatum = new Date(document.getElementById('owiDatum').value);
	var owiZeit = document.getElementById('owiZeit').value;
	var owiOrt = document.getElementById('owiOrt').value;
	var owiKennz = document.getElementById('owiKennz').value;
	var owiTyp = document.getElementById('owiTyp').value;
	var owiText = document.getElementById('owiText').value;

	var docDefinition = {
		content: [
			{
				text: [
					'Anzeige einer Ordnungswidrigkeit',
				],
				style: 'header'
			},
			{
				alignment: 'justify',
				columns: [
				{
					width: 200,
					text: [
						{text: anzName + ', ' + anzStr + ', ' + anzOrt + '\n\n', fontSize: 8},
						'An das\n',
						{text: 'Ordnungsamt Magdeburg\n', bold: true},
						'Bußgeldabteilung\n',
						'Bruno-Beye-Ring 50 (BB)\n',
						'39130 Magdeburg',
					],
					style: 'recipient'
				}]
			},
			{
				alignment: 'justify',
				columns: [
				{
					width: 200,
					text: 'Anzeige einer Ordnungswidrigkeit',
					bold: true,
				},
				{
					width: '*',
					alignment: 'right',
					text: 'Magdeburg, den ' + now.toLocaleDateString('de-DE'),
				}],
				style: 'subheader'
			},
			{
				stack: [
				{
					text: [
						'Sehr geehrte Damen und Herren\n\n',
						'hiermit möchte ich folgende Verkehrsordnungswidrigkeit zur Anzeige bringen:\n\n'
					]
				}]
			},
			{
				columns: [
				{
					width: 150,
					text: [
						'Anzeigenerstatter:\n',
						'Tattag:\n',
						'Tatzeit:\n',
						'Tatort:\n',
						'KfZ-Kennzeichen:\n',
						'Fabrikat:\n',
					],
					bold: true,
					alignment: 'right',
					margin: [20,0],
				},
				{
					width: '*',
					text: [
						anzName + ', ' + anzStr + ', ' + anzOrt + '\n',
						owiDatum.toLocaleDateString('de-DE') + '\n',
						owiZeit + '\n',
						owiOrt + '\n',
						owiKennz + '\n',
						owiTyp + '\n'
					]
				}]
			},
			{
				text: [
					{text: 'Beschreibung der Ordnungswidrigkeit und persönlicher Betroffenheit:\n\n', bold: true},
					owiText,
				],
				margin: [0, 20],
			},
			{
				fontSize: 10,
				text: 'Bitte berücksichtigen Sie außerdem die beigefügten Ablichtungen (Anzahl: '+ document.getElementById('owiPics').files['length'] +') zur Beurteilung des Sachverhalts. Digitale Kopien in höherer Auflösung können bei Bedarf bereitgestellt werden.\n\n'
			},
			{
				fontSize: 10,
				text: 'Meine oben gemachten Angaben einschließlich meiner Personalien sind zutreffend und vollständig (§111 OWiG). Mir ist bewusst, dass ich als Zeugin oder als Zeuge zur wahrheitsgemäßen Aussage (§ 57 und § 161a StPO i. V. m. § 46 OWiG) und auch zu einem möglichen Erscheinen vor Gericht verpflichtet bin. Vorsätzlich falsche Angaben zu angeblichen Ordnungswidrigkeiten können eine Straftat (§ 164 StGB) darstellen.'
			},
			{
				margin: [0, 40, 0, 20],
				text: [
					'___________________________________\n',
					{text: '('+ anzName + ')', fontSize: 8}
				],
			},
			await generateImageSection(),
		],
		styles: {
			recipient: {
				margin: [0,0,0,50]
			},
			header: {
				fontSize: 18,
				bold: true,
				alignment: 'right',
				margin: [0, 0, 0, 50]
			},
			subheader: {
				margin: [0,0,0,20]
			},
			superMargin: {
				margin: [20, 0, 40, 0],
				fontSize: 15
			}
		}
	}

	var pdf = pdfMake.createPdf(docDefinition);
	pdf.open();
}
