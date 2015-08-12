//letter extraction module
QUnit.module("letter extraction");
QUnit.test("extract consonants", function (assert) {
    function compairToArray(input, expected) {
        assert.deepEqual(letterExtracter.getConsonants(input), expected, "test with input '" + input + "'");
    }
    function compairToUndefined(input) {
        assert.equal(letterExtracter.getConsonants(input), undefined, "test if output undefined with input '" + input + "'");
    }
    compairToArray("cON soN anT S", ['c', 'n', 's', 'n', 'n', 't', 's']);
    compairToArray("Q wr tyP sdf ghj klZx cvb nM", ['q', 'w', 'r', 't', 'y', 'p', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm']);
    compairToArray("^&5  6Yoe Prt*& 02Hi", ['y', 'p', 'r', 't', 'h']);
    compairToUndefined("<738> (eioa) '%^&*^'");
    compairToUndefined("E#$(67)  oi^&u !A23UE *87 ");
    compairToUndefined("");
});

QUnit.test("extract vowels", function (assert) {
    function compairToArray(input, expected) {
        assert.deepEqual(letterExtracter.getVowels(input), expected, "test with input '" + input + "'");
    }
    function compairToUndefined(input) {
        assert.equal(letterExtracter.getVowels(input), undefined, "test if output undefined with input '" + input + "'");
    }
    compairToArray("cON soN anT S", ['o', 'o', 'a']);
    compairToArray("^&5  6Yoe Prt*& 02Hi", ['o','e', 'i']);
    compairToArray("Er hisuet bdsafHnjk VAeinU lo", ['e', 'i', 'u', 'e', 'a', 'a', 'e', 'i', 'u', 'o']);
    compairToUndefined("<738> (qtrwpktdgh) '%^&*^'");
    compairToUndefined("#$(YRT67)  pD^& !2bv3 *87 KL");
    compairToUndefined("");
});

QUnit.test("convert to lower case", function (assert) {
    function compairToArray(input, expected) {
        var inputToString = arrayToString(input);
        assert.deepEqual(letterExtracter.convertToLowerCase(input), expected, "test with input '" + inputToString + "'");
    }
    compairToArray(['TeStInG', 'S', 'o', 'm', 'E', 'stRINg'], ['testing', 's', 'o', 'm', 'e', 'string']);
    compairToArray(['JU', 'ST', 'C', 'APS'], ['ju', 'st', 'c', 'aps']);
    compairToArray(['alls', 'm', 'a', 'll'], ['alls', 'm', 'a', 'll']);
    compairToArray(['^&$%', 'POr#$87', '!@$^%543'], ['^&$%', 'por#$87', '!@$^%543']);
    compairToArray([], []);
});




//letter counting module
QUnit.module("letter counting");
QUnit.test("count letters", function (assert) {
    function compairToObject(input, expected) {
        var inputToString = arrayToString(input);
        assert.deepEqual(letterCounter.countLetters(input), expected, "test with input '" + inputToString + "'");
    }
    compairToObject(['a', 'b', 'b', 'a', 'c', 'a', 'd', 'd', 'd', 'a'], new LetterHash(4, { 'a': 4, 'b': 2, 'c': 1, 'd': 3 }));
    compairToObject(['q', 'u', 'a', 's', 'i'], new LetterHash(5, { 'q': 1, 'u': 1, 'a': 1, 's': 1, 'i': 1 }));
    compairToObject(['y', 'y', 'y', 'z', 'y', 'z', 'y'], new LetterHash(2, { 'z': 2, 'y': 5 }));
});

QUnit.test("sort top", function (assert) {
    function compairToArray(input, expected) {
        var inputToString = objectToString(input.getLetters());
        assert.deepEqual(letterCounter.sortTopLetters(3, input), expected, "test with input '" + inputToString + "'");
    }
    compairToArray(new LetterHash(4, { 'a': 4, 'b': 2, 'c': 1, 'd': 3 }), [new Letter('a', 4), new Letter('d', 3), new Letter('b', 2)]);
    compairToArray(new LetterHash(5, { 'q': 13, 'u': 1, 'a': 1, 's': 20, 'i': 1 }), [new Letter('s', 20), new Letter('q', 13), new Letter('i', 1), new Letter('a', 1), new Letter('u', 1)]);
    compairToArray(new LetterHash(1, { 'y': 299 }), [new Letter('y', 299)]);
    compairToArray(new LetterHash(), []);
});

QUnit.test("top to string", function (assert) {
    function compairToString(input, expected) {
        var inputToString = arrayOfLetterObjectsToString(input);
        assert.equal(letterCounter.topLettersToString(input), expected, "test with input '" + inputToString + "'");
    }
    compairToString([new Letter('a', 4), new Letter('d', 3), new Letter('b', 2)], "<br>1: a 4<br>2: d 3<br>3: b 2");
    compairToString([new Letter('s', 20), new Letter('q', 13), new Letter('i', 1), new Letter('a', 1), new Letter('u', 1)], "<br>1: s 20<br>2: q 13<br>3: i 1, a 1, u 1");
    compairToString([new Letter('y', 299)], "<br>1: y 299");
    compairToString([], "");
});




//DOM manipulation module
QUnit.module("DOM manipulation");
QUnit.test("update the DOM", function (assert) {
    var element = $('#qunit-fixture .vowels');
    function compairToElement(input, letterAmount, expected) {
        letterCounter.update(input, letterAmount, 3, element, 'Vowels');
        assert.equal(element.html(), (vowelStart + expected), "test with input '" + input + "'");
    }
    compairToElement("<br>1: y 299", 1, "1</p><p>Top 3: <br>1: y 299</p>");
    compairToElement("<br>1: s 20<br>2: q 13<br>3: i 1, a 1, u 1", 5, "5</p><p>Top 3: <br>1: s 20<br>2: q 13<br>3: i 1, a 1, u 1</p>");
    compairToElement("<br>1: a 4<br>2: d 3<br>3: b 2", 3, "3</p><p>Top 3: <br>1: a 4<br>2: d 3<br>3: b 2</p>");
});

QUnit.test("count and update the DOM", function (assert) {
    var element = $('#qunit-fixture .consonants');
    function compairToElement(input, expected) {
        letterCounter.countLettersAndUpdate(input, 3, element, "Consonants");
        var inputString = arrayToString(input);
        assert.equal(element.html(), (consonantStart + expected), "test with input '" + inputString + "'");
    }
    compairToElement(['y', 'y', 'y'], "3</p><p>Top 3: <br>1: y 3</p>");
    compairToElement(['a', 'b', 'b', 'a', 'c', 'a', 'd', 'd', 'd', 'a'], "10</p><p>Top 3: <br>1: a 4<br>2: d 3<br>3: b 2</p>");
    compairToElement(['q', 'u', 'a', 's', 'i'], "5</p><p>Top 3: <br>1: i 1, s 1, a 1, u 1, q 1</p>");
});

QUnit.test("full count and update the DOM", function (assert) {
    var elementVow = $('#qunit-fixture .vowels'),
        elementCon = $('#qunit-fixture .consonants');
    function compairToElement(input, expectedVow, expectedCon) {
        main.countLetters(input, elementVow, elementCon);
        assert.equal(elementVow.html(), (vowelStart + expectedVow), "test with input '" + input + "'");
        assert.equal(elementCon.html(), (consonantStart + expectedCon), "test with input '" + input + "'");
    }
    compairToElement('abc def', "2</p><p>Top 3: <br>1: e 1, a 1</p>", "4</p><p>Top 3: <br>1: f 1, d 1, c 1, b 1</p>");
    compairToElement("EJer Ninsue bdsa HaNEnjk", "8</p><p>Top 3: <br>1: e 4<br>2: a 2<br>3: u 1, i 1</p>", "13</p><p>Top 3: <br>1: n 4<br>2: s 2, j 2</p>");
    compairToElement("cON soN anT S", "3</p><p>Top 3: <br>1: o 2<br>2: a 1</p>", "7</p><p>Top 3: <br>1: n 3<br>2: s 2<br>3: t 1, c 1</p>");
});




//variables and functions for easyer use and output
var consonantStart = "<h2>Consonants</h2><p>Number of letters: ",
    vowelStart = "<h2>Vowels</h2><p>Number of letters: ";

function arrayToString(items) {
    var toString = "";
    for (var i = 0, j = items.length; i < j; i++) {
        toString += items[i] + ' ';
    }
    return toString;
}

function objectToString(obj) {
    var toString = "";
    for (var item in obj) {
        toString += item + ': ' + obj[item] + ' ';
    }
    return toString;
}

function arrayOfLetterObjectsToString(letters) {
    var toString = "";
    for (var i = 0, j = letters.length; i < j; i++) {
        toString += letters[i].getLetter() + ': ' + letters[i].getCount() + ' ';
    }
    return toString;
}