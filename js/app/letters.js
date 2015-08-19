//constructor for a letter
function Letter(letter, count) {
    this._letter = letter;
    this._count = count;
}
Letter.prototype = {
    constructor: Letter,
    getLetter: function () {
        return this._letter;
    },
    getCount: function () {
        return this._count;
    },
    hasEqualCount: function (letter) {
        return (letter.getCount() == this._count);
    },
    letterCountToString: function () {
        return this._letter + " " + this._count;
    }
}




//main code
var main = {
    //count all the letters in the given input
    countLetters: function (input, vowelElement, consonantElement) {
        var topAmount = 3, //sets the amount of top letters

            consonants = letterExtracter.getConsonants(input),
            vowels = letterExtracter.getVowels(input);

        letterCounter.countLettersAndUpdate(vowels, topAmount, vowelElement, 'Vowels');
        letterCounter.countLettersAndUpdate(consonants, topAmount, consonantElement, 'Consonants');
    }
}




//object that extracts letters
var letterExtracter = {
    //return an array that contains the consonants of the given input
    getConsonants: function (input) {
        return this.convertToLowerCase(input.match(/[bcdfghjklmnpqrstvwxyz]/gi));
    },

    //return an array that contains the vowels of the given input
    getVowels: function (input) {
        return this.convertToLowerCase(input.match(/[aeiou]/gi));
    },

    //convert given array to lowercase
    convertToLowerCase: function (letterArray) {
        if (letterArray) {
            for (var i = 0, j = letterArray.length; i < j; i++) {
                letterArray[i] = letterArray[i].toLowerCase();
            }
        }
        return letterArray;
    },
}




//hashtable object containing letters and their count
var letterHash = {
    length: 0,
    letters: {},

    //fill the hashTable with all the letters in the given array and their occurrences
    countLetters: function (letterArray) {
        this.letters = {};
        for (var i = 0, j = letterArray.length; i < j; i++) {
            this.countLetter(letterArray[i]);
        }
        return this.letters;
    },

    //count a single letter
    countLetter: function (letter) {
        if (!this.hasLetter(letter)) {
            this.length++;
            this.letters[letter] = 1;
        }
        else {
            this.letters[letter]++;
        }
        return this.letters[letter];
    },

    //create an array of letters from the hash
    lettersToArray: function () {
        var arr = [];
        for(var letter in this.letters){
            arr[arr.length] = new Letter(letter, this.letters[letter]);
        }
        return arr;
    },

    //check if letter is in the hash
    hasLetter: function (letter) {
        return this.letters.hasOwnProperty(letter);
    }
}




//object that counts letters
var letterCounter = {
    //count the letters in the array and print to the given element
    countLettersAndUpdate: function (letters, topAmount, element, name) {
        if (letters) {
            letterHash.countLetters(letters);
            var sortedTopArray = this.sortTopLetters(topAmount),
                topString = this.topLettersToString(sortedTopArray);
            this.update(topString, letters.length, topAmount, element, name)
        }
        else {
            element.html("");
        }
    },


    //compare function for two letter objects
    compare: function (letterA, letterB) {
        var countA = letterA.getCount(),
            countB = letterB.getCount();
        if (countA > countB) {
            return -1;
        }
        if (countA < countB) {
            return 1;
        }
        return 0;
    },


    //return the top letters
    sortTopLetters: function (topAmount) {
        var letterArray = letterHash.lettersToArray(),
            sorted = letterArray.sort(this.compare),
            pos = sorted.length;
        //find slice position for top letters
        for (var i = topAmount, j = sorted.length; i < j; i++){
            if (sorted[i - 1].getCount() != sorted[i].getCount()) {
                pos = i;
                break;
            }
        }
        return sorted.slice(0, pos);
    },

    //create a string of the top letter array
    topLettersToString: function (sortedTopArray) {
        var topString = "";
        for (var i = 0, j = sortedTopArray.length; i < j; i++) {
            var letter = sortedTopArray[i],
                letterCountEqualPrevious = (i > 0 && letter.hasEqualCount(sortedTopArray[i - 1]));
            topString += (letterCountEqualPrevious) ? ', ' + letter.letterCountToString() : '<br>' + (i + 1) + ': ' + letter.letterCountToString();
        }
        return topString;
    },

    //print to the given element
    update: function (topString, letterAmount, topAmount, element, name) {
        var displayString = '<h2>' + name + '</h2>';
        displayString += '<p>Number of letters: ' + letterAmount + '</p>'
        displayString += '<p>Top ' + topAmount + ': ' + topString + '</p>';
        element.html(displayString);
    },
}