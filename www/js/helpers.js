console.log('helpers.js loaded');


// Global Functions 


//DOM Manipulation 

let createNode = function (element) {
    return document.createElement(element);
}

let append = function (parent, el) {
    return parent.appendChild(el);
}

//Get a random number 
let randomNumber = function (from, to) {
    return Math.floor(Math.random() * (to - from + 1)) + from;
}

////Comparer Function    
function GetSortOrder(prop) {
    return function (a, b) {
        if (a[prop] > b[prop]) {
            return 1;
        } else if (a[prop] < b[prop]) {
            return -1;
        }
        return 0;
    }
}





// Maybe for later Use 

// //Convert from Milliseconds to Dateobj

// let convertMillisecondsTo = function (milliseconds) {
//     const convertedFromMilltoDate = new Date(milliseconds);
//     // console.log('convertedFromMilltoDate in smal function', convertedFromMilltoDate);
//     return convertedFromMilltoDate
// }


// Funktion seperately for later use 
// Chance Entry Order Status 

// let changeEntryOrderStatus = function (preferedOrder, data) {
//     let newJSON
//     switch (preferedOrder.value) {
//         case 'newestcustom':
//             newJSON = data.sort(GetSortOrder("entryDate"));
//             console.log('Order by newest');
//             break;
//         //Order by newest custom
//         case 'newestcustom':
//             newJSON = data.sort(GetSortOrder("entryDate"));
//             console.log('Order by newest');
//             break;
//         //Order by latest custom
//         case 'latestcustom':
//             newJSON = data.sort(GetSortOrder("entryDate"));
//             newJSON.reverse()

//             console.log('Order by latest:');

//             break;
//         //Order by name 
//         case 'namedes':
//             newJSON = data.sort(GetSortOrder("headline"));
//             console.log('Order by name descending ');

//             break;
//         //Order by name reverse
//         case 'nameasc':
//             newJSON = data.sort(GetSortOrder("headline"));
//             newJSON.reverse()
//             console.log('Order by name ascending');
            
//             break;
//         //Order by creation date ascending
//         case 'creationdate':
//             newJSON = data.sort(convertMillisecondsTo(GetSortOrder("creationDate")));
//             console.log('Order by creation date');
//             break;
//             //Order by creation date des
//         case 'creationdatedes':
//             newJSON = data.sort(convertMillisecondsTo(GetSortOrder("creationDate")));
//             newJSON.reverse()
//                console.log('Order by creation date des');
//                break;
//         default: console.log('Switch problem');
//         newJSON = data
//             break;
//     }
// console.log('newJSON in switch case', newJSON );
//     return newJSON
// }