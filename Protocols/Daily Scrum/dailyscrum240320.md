# Mötesprotokoll (2024-03-20)

Sätt en timer på 15 minuter

## Närvarande
* Linus
* Kim
* Peter
* Andreas

## Protokoll
Var och en svarar på frågorna nedan.
* Vad gjorde du igår?
* Vad ska du göra idag?
* Finns det några hinder?

### Linus
* Igår grejades med status page update och det uppkom frågor så har modifierat 
* Idag tar jag tag i något i backloggen
* Hinder - om något 

### Kim
* Gjorde profilsidan och rendera ut produkter i menyn från API
* Ska idag ta någon punkt. Kanske Admin control features.
* Ser inga hinder just nu men Store Customer order history ligger kvar i pending. Behöver hitta nåt bra sätt att
spara orderhistoriken.

### Peter
* Register page färdig igår.
* Ska försöka med Admin controll features idag.
* Kompetens
### Andreas
* Igår lade jag in nav-menyn på profilsidan och buggfix i script.js. jag profile page changes. Men det var fel. Vi får göra om!
* Register customer feature ska jag göra idag.
* Risk för att jag inte läser uppgifterna ordentligt, som igår.


### Övrigt
Vi bör lägga till en issue om att skriva om window.onload och inkludera alla funktioner som är specifika för html-sidor.
Bugg i profilsidan när den renderas, if-sats som kollar längden på order. Denna kan tas bort. Räcker med currentUser.orders. Ligger på rad 210 i render.js.
Funktion för att dölja orderstatus när det inte finns någon aktiv order. 
Animation eller händelse när man klickar på plus-ikon i menyn.
I varukorgen behöver det ändras grejer 
- ta bort leveranskostnaden. Ändra siffran som hovrar över varukorgen så den visar aktuellt antal i varukorg.
- funktion för Take my money-knappen

