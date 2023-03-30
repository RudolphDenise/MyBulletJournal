
console.log('index.js loaded');


// (Very inspirational) Quote of the Day Fetch API

let getInspirationalQuote = function () {

    const QUOTE_POS = document.getElementById('veryinspirationalquote')
    const QUOTE_AUTHOR_POS = document.getElementById('quoteauthor')
    const ELEMENT_P_QUOTE = createNode('p')
    const ELEMENT_P_AUTHOR = createNode('p')
    const QUOTE_API_URL_OF_CHOICE = 'https://type.fit/api/quotes'

    fetch(QUOTE_API_URL_OF_CHOICE)
        .then((resp) => resp.json())
        .then(function (data) {
            console.log(data);

            let RandomQuoteNumber = randomNumber(0, data.length);


            let resQuote = data[RandomQuoteNumber].text
            let resAuthor = data[RandomQuoteNumber].author
            let resCreatedQuote = append(QUOTE_POS, ELEMENT_P_QUOTE)
            let resCreatedQuoteAuthor = append(QUOTE_AUTHOR_POS, ELEMENT_P_AUTHOR)
            resCreatedQuote.innerHTML = resQuote
            resCreatedQuoteAuthor.innerHTML = resAuthor

        })
        .catch(function () {

            let rejQuote = 'Der Server ist gerade in Meditation versenkt und hat heute keinen super inspirierenden Quote für dich'
            let rejAuthor = 'Deine App-Programmierin'
            let rejCreatedQuote = append(QUOTE_POS, ELEMENT_P_QUOTE)
            let rejCreatedQuoteAuthor = append(QUOTE_AUTHOR_POS, ELEMENT_P_AUTHOR)
            rejCreatedQuote.innerHTML = rejQuote
            rejCreatedQuoteAuthor.innerHTML = rejAuthor;

        });


}



getInspirationalQuote()

