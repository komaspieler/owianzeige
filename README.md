# owianzeige.ein-formular.de

Dies ist der Quellcode des Anschreibengenerators "owianzeige.ein-formular.de".

## How To: OA-Adressen aktualisieren
Mit Hilfe des Skriptes `fetch-fds-ordnungsaemter.js` (Node.js v16+) können die Anschriften von Ordnungsämtern via der FragDenStaat-API geladen werden. Das Skript ruft die Schnittstelle und speichert die Daten in der Datei `ordnungsaemter.json` ab.
```
$ node fetch-fds-ordnungsaemter.js
```

## Datenquellen
- Ordnungsämter: [fragdenstaat.de](https://fragdenstaat.de)
