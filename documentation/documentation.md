# Web Praktikum 2 - 3 Dokumentation
- ## Gruppe R
- ## Gruppenmitglieder: Redecker, Max; Tebart, Daniel
- ## Datum: 18.11.2014

## 1. Allgemeines zur Lösung
Die Web-Anwendung Studentenfeier ist eine Single-Page Webanwendung und wurde mit einer Client-Server Architektur implementiert. Der Server wurde hierbei mit Python und dem Framework Cherrypy realisiert. Die Übertragung der Daten findet asynchron mit den Jquery-Ajax Methoden statt. Das Format der übertragenden ist JSON konform. Einige Elemente mit ihrer Darstellung und Funktionalität stammen aus dem Bootstrap-Framework.

## 2. Beschreibung der Komponenten
An Komponenten existieren:

* Eine html Index-Datei
* Javascript Dateien für die Verarbeitung der Teilnehmerliste, der Manipulation von der Ansicht des Benutzers (View), für Clientseitige-Validierung und zum Versenden der Anfragen sowie Reagieren auf Server - Antworten
* Ein Python - Modul für die anfängliche Serverkonfiguration sowie ein Modul mit den Methoden, die von einem Client aufgerufen werden können.
* Ein Stylesheet für die Html-Elemente

#### 2.1 Verarbeitung der Teilnehmerliste
Die Verwaltung der Teilnehmerliste dient dazu die Kommunikation zum Server und das Anzeigen der gespeicherten Daten zu erleichtern. Demzufolge benutzen die Kommunikationsschnittstellen, also Ajax-Requests Methoden um Einträge zu speichern oder zu laden. Zur Verwaltung der Liste wurden folgende Methoden implementiert:

* Hinzufügen eines Teilnehmers(participant): *addEntry(participant)*
* Bearbeiten eines Teilnehmers(participant): *editEntry(participant)*
* Generierung eines Teilnehmer-Objekts aus einem Formulars: *buildParticipant(formName)*

Dabei benutzt *buildParticipant(formName)* eine Hilfsfunktion aus dem View Modul um die benötigten Information von dem Html-Dokument zu bekommen.

#### 2.2 Anfragen an den Server
Die Anfragen des Webbrowsers wurden in einer eigenen Datei zusammengefasst. In folgenden Fällen wird dabei einer der Anfragen durchgeführt:

* Das Dokument kann bearbeitet werden (Ready-Zustand): Es wird ein Get-Request versendet, woraufhin der Server eine Liste mit allen durchgeführten Anmeldungen zurückliefert. Die Liste wird daraufhin gespeichert und auf der Startseite angezeigt.
* Der Benutzer will sich für das Event registrieren: Es wird ein Post-Request versendet mit den Eingabedaten im JSON-Format. Die Serverantwort ist eine einfache Bestätigung woraufhin der Nutzer auf die Startseite zurück navigiert wird mit einer passenden Textanzeige.
* Der Benutzer möchte ein Profil bearbeiten: Ein Post-Request wird gesendet mit den veränderten Daten des Nutzeraccounts woraufhin der Server die entsprechende Daten anhand der Nutzernummer und bearbeitet. Das Ergebnis wird zum Client zurückgeschickt und die veränderten Daten in der Liste auf der Startseite angezeigt.
* Der Benutzer möchte ein Profil löschen: Ein Post-Request mit den Daten des zu löschenden Benutzers wird an den Server geschickt woraufhin die Daten im Bestand des Servers gelöscht werden. Als Reaktion auf die Bestätigung wird der Nutzer zur Startseite navigiert mit einer Liste ohne den Eintrag des gelöschten Nutzers.

Das wird durch die folgenden Methoden erreicht:

* Liste empfangen: Anonyme Callback-Methode
* Für Event registrieren: *registrate()*
* Profil bearbeiten: *edit()*
* Profil löschen: *erase()*

#### 2.3 Clientseitige Validierung
Die Clienseitige Validierung ist eine weitere seperate Komponente. Sie beinhaltet: 

* Eine Überprüfungsmethode die zu einem gegebenen Feld überprüft ob der Inhalt nicht leer ist: *isValid(fieldContent, fieldName)*:
* Eine Callback-Methode, die *isValid(fieldContent, fieldName)* benutzt, um bei Änderung des eventbezogenen Elements den neuen Inhalt zu überprüfen um unmittelbar eine clientseitige Rückmeldung beim Nutzer anzuzeigen: *checkInput(event)*

#### 2.4 Ansicht der Web-Anwendung(View)
Für die Verarbeitung der View, also der Struktur und Präsentation wurden folgende Methoden implementiert:

* Ausblenden eines Elements und Einblenden eines anderen: *changeView(oldView, newView)*
* Extrahieren der Eingabedaten aus einem Formular: *getFormData(formName)*
* Übertragen der Informationen von der Liste in einem Formular vor Wechsel auf Formularansicht: Anonyme Callback-Methode falls der Button zum Bearbeiten oder Löschen gedrückt wird.
* Anzeigen einer Rückmeldebox mit entsprechender Präsentation: *showFeedback(feedbackText, operationSuccessfull)*
* Anzeigen neuer Liste nach Registrierung: *showNewEntry(participant)*
* Anzeigen neuer Liste nach Bearbeitung: *showChangedEntry(participant)*
* Anzeigen neuer Liste nach Löschung: *deleteEntry(participant)*


### 2.2 API
#### 2.2.1 Server API
##### 2.2.1.1 Öffentliche Methoden
* Der Server stellt einige verschiedene Funktionen bereit: die *edit()* Methode, die Daten einer Anmeldung ändern kann, die *registrate()* Methode, die eine neue Anmeldung erstellt, die *delete()* Methode, welche eine Anmeldung dauerhaft löscht sowie die *get_list()* Methode, die alle bisherigen Anmeldungen liefert.
* Die Parameter werden von Clientseite gesendet und die Methoden lesen diese automatisch aus. Der Parameter (Teilnehmer) muss im JSON Format, wie in 3.1 dargestellt, gesendet werden.

| Funktionsname | Beschreibung                                       | Parameter                 | Rückgabewert |
|---------------|----------------------------------------------------|---------------------------|---------------------------|
| get_list()    | Liest alle JSON  Dateien aus und liefert alle Teilnehmer als String im JSON Format. | keine | Liste der Teilnehmer (string) |
| registrate()  | Fügt einen neuen Teilnehmer hinzu und speichert ihn mit einer ID im JSON Format persistent. | Einen Teilnehmer im JSON Format   | Nicht vorhanden |
| edit()        | Die ID des Teilnehmers wird ausgelesen und anschließend wird der Teilnehmer unter dieser ID im JSON Format gespeichert und überschreibt somit die alte Datei.  | Einen Teilnehmer im JSON Format | Nicht vorhanden |
| delete()      | Die ID des Teilnehmers wird ausgelesen, daraufhin wird die JSON Datei mit der ausgelesenen ID als Namen dauerhaft gelöscht.  |  Einen Teilnehmer im JSON Format | Nicht vorhanden |

* Die Methode *check_incoming_Data()* überprüft bei *registrate(), edit()* und *delete()* ob Daten angekommen sind. Falls nicht, wird eine Fehlermeldung an den Client gesendet.
* Unvollständige oder falsch manipulierte Teilnehmer können zu einem Absturz führen.

##### 2.2.1.2 Datenbank

| Funktionsname | Beschreibung                                       | Parameter                 | Rückgabewert |
|---------------|----------------------------------------------------|---------------------------|---------------------------|
| next_user_id()    | Liest die zuletzt verwendete ID aus und gibt eine neue, nicht verwendete ID zurück. | keine | ID (string) |
| insertFile(data)  | Zuerst wird eine neue ID mit *next_user_id()* berechnet, danach wird eine Datei mit der ID als Namen erstellt und der Inhalt von *data* dort gespeichert. | Einen Teilnehmer im JSON Format   | Nicht vorhanden|
| readFile(fileName)   | Das File *fileName* wird ausgelesen und zurückgegeben.  | Dateinamen als String                      | Ausgelesenens File (string) |
| editFile(data)      | Eine bestehende Datei wird mit *data* überschrieben. die ID für die Datei wird aus *data* ausgelesen. |  Einen Teilnehmer im JSON Format | Nicht vorhanden |
| deleteFile(data) | Eine bestehende Datei wird gelöscht. Die ID für die Datei wird aus *data* ausgelesen. |Einen Teilnehmer im JSON Format   | Nicht vorhanden |


#### 2.2.2 Client API
* Siehe Kapitel 2.1 bis 2.4.

### 3 Datenablage
### 3.1 Backend
Die Teilnehmerliste wird beim Server auf mehrere Dateien aufgeteilt, wobei eine Datei genau einen Teilnehmer mit seinen Daten speichert. Die Teilnehmerdaten liegen im JSON-Format vor mit den Attributen:

* Identifikation: *id*
* Name: *lastName*
* Vorname: *firstName*
* Studiengang: *course*
* Betreuer: *advisor*
* Begleiteranzahl: *numOfCompanions*
* Passwort: *passwort*

Die Dateien werden durch das Attribut *id* identifiziert. Die Daten eines Nutzers mit der id 5 werden also in der Datei 5.json gespeichert. Um die Anzahl der registrierten Nutzer verfolgen zu können existiert zusätlich eine Datei mit dem Namen id.txt, in dem die zuletzt zugewiesene id gespeichert wird.

### 3.2 Frontend
Clientseitig werden die Teilnehmer temporär in dem Array *entries* gespeichert, das mit einem implementierten Modul verarbeitet wird (siehe 2.1).
