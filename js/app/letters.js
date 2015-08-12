//constructor for hashtable object
function LetterHash(length, letters) {
    this._length = length || 0;
    this._letters = letters || {};
}
LetterHash.prototype = {
    constructor: LetterHash,
    getLength: function () {
        return this._length;
    },
    getLetters: function () {
        return this._letters;
    },
    getLetterCount: function (letter) {
        return this.hasLetter(letter) ? this._letters[letter] : 0;
    },
    countLetter: function (letter) {
        if (!this.hasLetter(letter)) {
            this._length++;
            this._letters[letter] = 1;
        }
        else {
            this._letters[letter]++;
        }
        return this._letters[letter];
    },
    hasLetter: function (letter) {
        return this._letters.hasOwnProperty(letter);
    }
}




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




//object that counts letters
var letterCounter = {
    //count the letters in the array and print to the given element
    countLettersAndUpdate: function (letters, topAmount, element, name) {
        if (letters) {
            var letterCountHash = this.countLetters(letters),
                sortedTopArray = this.sortTopLetters(topAmount, letterCountHash),
                topString = this.topLettersToString(sortedTopArray);
            this.update(topString, letters.length, topAmount, element, name)
        }
        else {
            element.html("");
        }
    },

    //return a hashTable containing all the letters in the given array and their occurrences
    countLetters: function (letterArray) {
        var hash = new LetterHash();
        for (var i = 0, j = letterArray.length; i < j; i++) {
            hash.countLetter(letterArray[i]);
        }
        return hash;
    },

    //return the top letters
    sortTopLetters: function (topAmount, letterCountHash) {
        var sorted = [],
            letters = letterCountHash.getLetters();
        //loop through all the counted letters
        for (var letter in letters) {
            var count = letters[letter],
                added = false;
            //sort top
            for (var i = 0, j = sorted.length; added == false && i < j; i++) {
                var sortedLetter = sorted[i];
                if (count >= sortedLetter.getCount()) {
                    sorted = insertAt(i, letter, count, sorted);
                    added = true;
                }
            }
            //add letter if not added yet and sortedArray is smaller than top
            if (sorted.length < topAmount && added == false) {
                sorted[sorted.length] = new Letter(letter, count);
            }
        }
        //insert at position and return new sorted array
        function insertAt(pos, letter, count, sorted) {
            var newSorted = (pos == 0) ? [] : sorted.slice(0, pos),
                sortedLength = sorted.length;
            //insert
            newSorted[pos] = new Letter(letter, count);
            //concat remaining
            if (pos < sortedLength) {
                var maxSlice = sortedLength;
                if (sortedLength >= topAmount) {
                    var lastCount = sorted[topAmount - 1].getCount(),
                        secondToLastCount = sorted[topAmount - 2].getCount();
                    //check for doubles that make top larger than max
                    if (lastCount != secondToLastCount && !(pos == topAmount - 1 && count == lastCount)) {
                        maxSlice = topAmount - 1;
                    }
                }
                newSorted = newSorted.concat(sorted.slice(pos, maxSlice));
            }
            return newSorted;
        }
        return sorted;
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
};