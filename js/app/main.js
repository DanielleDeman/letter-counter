$(window).load(function () {


    var textId = '#analysedText',
        vowelId = '#letterCount .vowels',
        consonantId = '#letterCount .consonants';


    //bind any change to text
    $(textId).bind('change paste keyup keydown', function () {
        main.countLetters($(this).val(), $(vowelId), $(consonantId));
    });


    //execute on load
    if ($(textId).val() != $(textId).attr('placeholder')) {
        main.countLetters($(textId).val(), $(vowelId), $(consonantId));
    }
    else {
        $(vowelId).html("");
        $(consonantId).html("");
    }
});