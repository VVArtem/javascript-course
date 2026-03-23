(function () {
    var names = ["Bill", "John", "Jen", "Jason", "Paul", "Frank", "Steven", "Larry", "Paula", "Laura", "Jim"];

    console.log("\n 1.2.2 Good bye J*-names :) \n");
    for (let i = 0; i < names.length; i++) {
        let firstLetter = names[i].charAt(0).toLowerCase();
        if (firstLetter === 'j') {
            byeSpeaker.speak(names[i]);
        } else {
            helloSpeaker.speak(names[i]);
        }
    }

    console.log("\n\n 1.2.3 Selection by ASCII sum parity :) ");
    console.log(" Annotation: Names with an EVEN sum of ASCII codes are sent to ByeSpeaker");

    for (let i = 0; i < names.length; i++) {
        let currentName = names[i];
        let asciiSum = 0;

        for (let j = 0; j < currentName.length; j++) {
            asciiSum += currentName.charCodeAt(j);
        }
        
        let nameWithSum = currentName + " (Sum: " + asciiSum + ")";
        if ((asciiSum & 1) === 0) {
            byeSpeaker.speak(nameWithSum);
        } else {
            helloSpeaker.speak(nameWithSum);
        }
    }
})();