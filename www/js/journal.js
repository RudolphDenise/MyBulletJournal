console.log('journal.js loaded');
//Global variables for DOM access

const initialHREF_journal = 'http://localhost:5000/journal'
const j_BTN = document.getElementById('jbtn')
const j_BTN_close = document.getElementById('btn-close')
const j_TITLE = document.getElementById('jtitle')
const j_SUBTITLE = document.getElementById('jsubtitle')
const j_DATE = document.getElementById('jdate')
const j_ENTRY = document.getElementById('jentry')



//User guidance: add/remove boxshadow at feather-icon-button during mouseover

document.getElementById('feathericonbtn').addEventListener('mouseover', function () {
    this.classList.add("box")
})

document.getElementById('feathericonbtn').addEventListener('mouseout', function () {
    this.classList.remove("box")
})


// Convert entry date to local date format from String

// let testDate = '2022-10-13'
let convertDate = function (j_entryDate) {
    //save components of date-string in an array
    let dateStringArray = j_entryDate.split("-");
    //get values from arry and create a new dateobject 
    let year = dateStringArray[0]
    let month = dateStringArray[1]
    let date = dateStringArray[2]
    const EntrydateObj = new Date(year, month, date)
    // console.log('EntrydateObj', EntrydateObj);
    //Makes a String ony with date without time in standard local formatting
    let lacaleDateFormat = EntrydateObj.toLocaleDateString()
    return lacaleDateFormat
}
// convertDate(testDate)


// //Show creation Date

let showCreationEntry = function (milliseconds) {
    let convertedFromMilltoDate = createFromMilliseconfstoDateobj(milliseconds)
    // console.log('convertedFromMilltoDate in Show Creation Entry', convertedFromMilltoDate);

}


//Event Listener for Select Change 
//Activates  changeEntryOrderStatus fetch function  
let preferedOrder = document.getElementById('selectorder')
document.getElementById('selectorder').addEventListener('change', function () {
    orderEntrys(this)

})



//Create a random Picture for the entry

let randomPictures = async function () {

 await fetch('cybermoto')
        .then((resp) => resp.json())
        .then(function (picdata) {
            console.log('picdata:', picdata)
            // console.log('picdata.images[0].url', picdata.images[randomPictureNr *1].url);
            // console.log('picdata.images.length', picdata.images.length);
      
        document.querySelectorAll('img').forEach(element => {
            let url = picdata.images[randomNumber(0,5)].url
            element.setAttribute('src', url)
        });
            

        })
        .catch(function () {
            console.log('Something went wrong with orderEntrys-Fetch');
        });

}




// Fetch to change order of entrys

let orderEntrys = async function (order) {
    let SHOWALL_orderEntrys_ROUTE = '/journal/getAll'
    return await fetch(SHOWALL_orderEntrys_ROUTE)
        .then((resp) => resp.json())
        .then(function (data) {
            console.log('OrderEntrys:', data);

            switch (order.value) {
                //Order by newest custom
                case 'neweststcustom':
                    newJSON = data.sort(GetSortOrder("entryDate"));
                    break;
                //Order by oldest custom
                case 'oldestcustom':
                    newJSON = data.sort(GetSortOrder("entryDate"));
                    newJSON.reverse()
                    break;
                //Order by name 
                case 'namedes':
                    newJSON = data.sort(GetSortOrder("headline"));
                    break;
                //Order by name reverse
                case 'nameasc':
                    newJSON = data.sort(GetSortOrder("headline"));
                    newJSON.reverse()
                    break;
                default: console.log('Switch problem');
                    newJSON = data
                    break;
            }
            console.log('newJSON in switch case', newJSON);

            //Show Data to User
            const PARENT_ENTRY_VIEW = document.getElementById('journalentryview')
            PARENT_ENTRY_VIEW.innerHTML = ''

            data.forEach(async element => {
                const NEW_ENTRY_DIV = createNode('div')

                const CREATE_NEW_ENTRY = append(PARENT_ENTRY_VIEW, NEW_ENTRY_DIV)
                //Elements in DiarySchema
                let j_headline = element.headline
                let j_subtitle = element.subtitle
                let j_entryDate = convertDate(element.entryDate)
                // let creationDate = element.creationDate
                let j_content = element.content
                let j_id = element._id
                let randomPicture =  randomPictures()



                const ENTRY_HTML =
                    `<div id="${j_id}" class="mb-3 card text-center">
                <div class="card-header">
                Journal 
                </div>
                <img src="${randomPicture}" class=" card-img-top" alt="">
                <div class="card-body">
                <h5 class="display-5 card-title">${j_headline}</h5>
                <p class="lead">
                ${j_subtitle}
                </p>
                <p class="card-text">${j_content}</p>
                </div>
                <div class="d-flex justify-content-between card-footer text-muted">
                <div> <button  id="${j_id + 'update_BTN'}" onclick="updateentry('${j_id}')" type="submit" class="btn-calm input-group-text deletebtn"><i class="fa-solid fa-feather-pointed "></i></button></div>
                <div>${j_entryDate}</div>
                <div> <button  id="${j_id + 'delete_BTN'}" onclick="openDialog('${j_id}')" type="submit" class="btn-calm-two input-group-text deletebtn"><i class="fa-solid fa-trash"></i></button></div>
                </div>
                </div>`


                CREATE_NEW_ENTRY.innerHTML = ENTRY_HTML



            });


        })
        .catch(function () {
            console.log('Something went wrong with orderEntrys-Fetch');
        });
}



// GET all Journal Entrys from database and display 

let showAllEntrys = async function () {
    const SHOWALL_JOURNAL_ROUTE = '/journal/getAll'
   
    return await fetch(SHOWALL_JOURNAL_ROUTE)
        .then((resp) => resp.json())
        .then(function (data) {
            console.log('showAllEntrysData:', data);

            //Show Data to User
            const PARENT_ENTRY_VIEW = document.getElementById('journalentryview')
            PARENT_ENTRY_VIEW.innerHTML = ''

            data.forEach(element => {
                const NEW_ENTRY_DIV = createNode('div')

                const CREATE_NEW_ENTRY = append(PARENT_ENTRY_VIEW, NEW_ENTRY_DIV)
                //Elements in DiarySchema
                let j_headline = element.headline
                let j_subtitle = element.subtitle
                let j_entryDate = convertDate(element.entryDate)
                let j_content = element.content
                let j_id = element._id
                let randomPicture =  randomPictures()

                const ENTRY_HTML =
                    `<div id="${j_id}" class=" mb-3 card text-center">
                    <div class=" card-header">
                        Journal 
                    </div>
                    <img src="${randomPicture}"  class="  card-img-top" alt="">
                    <div class="card-body">
                        <h5 class="display-5 card-title">${j_headline}</h5>
                        <p class="lead">
                        ${j_subtitle}
                        </p>
                        <p class="card-text">${j_content}</p>
                    </div>
                    <div class="d-flex justify-content-between card-footer text-muted">
                        <div> <button  id="${j_id + 'update_BTN'}" onclick="updateentry('${j_id}')" type="submit" class="btn-calm input-group-text deletebtn"><i class="fa-solid fa-feather-pointed "></i></button></div>
                        <div>${j_entryDate}</div>
                        <div> <button  id="${j_id + 'delete_BTN'}" onclick="openDialog('${j_id}')" type="submit" class="btn-calm-two input-group-text deletebtn"><i class="fa-solid fa-trash"></i></button></div>
                    </div>
                </div>`


                CREATE_NEW_ENTRY.innerHTML = ENTRY_HTML


            });

        })
        .catch(function () {
            console.log('Something went wrong with showAllEntrys-Fetch');
        });
}




//Opens dialogue when user pushes delete Button 
//asks if user realy wants to delete entry

let openDialog = async function (j_id) {

    const modalHTML = `<!-- Modal -->
     <div class="modal fade show" id="exampleModal" style="display:block;" tabindex="-1" aria-labelledby="exampleModalLabel" aria-modal="true" role="dialog">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">Möchtest du den Beitrag wirklich löschen?</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              Bestätige, ob den den Beitrag wirklich löschen möchtest.
            </div>
            <div class="modal-footer">
              <button id="dontdeleteentry" type="button" class="btn btn-calm" data-bs-dismiss="modal">Schließen</button>
              <button id="deleteentry"  type="button" class="btn btn-calm-two">Beitrag löschen</button>
            </div>
          </div>
        </div>
      </div> `

    let dynamicModal = document.getElementById('dynamicmodal')

    dynamicModal.innerHTML = modalHTML
    document.getElementById('dontdeleteentry').addEventListener('click', function buttonClicked(e) {
        dynamicModal.innerHTML = ''
    })

    document.getElementById('deleteentry').addEventListener('click', function buttonClicked(e) {
        deleteentry(j_id)
        dynamicModal.innerHTML = ''
    })
}


// DELETE one Entry-Item 

let deleteentry = async function (j_id) {
    await fetch(`/journal/${j_id}`, {
        method: 'DELETE',
    })
    showAllEntrys()
}

//GET ONE BY ID
//Fetch that gets all values of an entry and shows them in form 

let getOnebyId = async function (j_id) {
    const SHOW_ONE_JOURNAL_ROUTE = `/journal/${j_id}`

    return await fetch(SHOW_ONE_JOURNAL_ROUTE)
        .then((resp) => resp.json())
        .then(function (data) {

            console.log(data);
            j_TITLE.value = data[0].headline
            j_SUBTITLE.value = data[0].subtitle
            j_DATE.value = data[0].entryDate
            j_ENTRY.value = data[0].content


        })
        .catch(function () {
            console.log('Something went wrong with getOnebyId-Fetch');
        });
}


//Updates all values of entry in database

let patchValues = async function (j_id) {
    event.preventDefault()

    let newTitle = j_TITLE.value
    let newSubtitle = j_SUBTITLE.value
    let newDate = j_DATE.value
    let newEntry = j_ENTRY.value
    let j_id_test = j_id
    await fetch(`/journal/${j_id_test}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(
            {
                headline: `${newTitle}`,
                subtitle: `${newSubtitle}`,
                entryDate: `${newDate}`,
                content: `${newEntry}`
            }
        )
    })
    showAllEntrys()
}

//activates  PATCH-Function of entry after big for button is pushed
//resets the form and button afterwards

const createdonclickForPatch = function (j_id) {
    event.preventDefault()
    console.log('You added a new onclick: id', j_id);
    let canvas = document.getElementById('offcanvasWithBothOptions')
    canvas.classList.remove("show")
    patchValues(j_id)

    document.getElementById('form').setAttribute('action', "/")
    document.getElementById('form').setAttribute('method', "POST")
    //  document.getElementById('form').removeAttribute('class')
    //  document.getElementById('form').setAttribute('class', "container")
    document.getElementById('jbtn').setAttribute('type', "submit")
    document.getElementById('jbtn').removeAttribute('onclick')
    showAllEntrys()
    location.reload()

}

// //PATCH: Change entry:
//opens the hidden form view 
//configues button and form action  
//after feather-update-button was clicked

let updateentry = async function (j_id) {
    event.preventDefault()
    let canvas = document.getElementById('offcanvasWithBothOptions')

    canvas.classList.add("show")
    //  j_BTN_close.onclick = () => {
    //       canvas.classList.remove("show")
    //  }
    await
        getOnebyId(j_id)
    document.getElementById('form').removeAttribute('action');
    document.getElementById('form').removeAttribute('method');
    j_BTN.removeAttribute('type');
    document.getElementById('jbtn').setAttribute('onclick', `createdonclickForPatch('${j_id}')`)

}


// Initial function to load journal entrys: load only when location (href) is right
//removes error message in console
if (document.location.href == initialHREF_journal) {
    showAllEntrys()
   

    //POST a new Entry 

    j_BTN.onclick = async (event) => {
        event.preventDefault()
        if (j_TITLE.value == '') {
            console.log('Bitte eine Aufgabe hinzufügen');
            j_TITLE.value = 'Bitte eine Überschrift hinzufügen'
        }
        else {
            //Values of Entry
            let newTitle = j_TITLE.value
            let newSubtitle = j_SUBTITLE.value
            let newDate = j_DATE.value
            let newEntry = j_ENTRY.value


            console.log('You added a enty:', j_TITLE);
            const ADD_NEW_ENTRY_PATH = '/journal/post'

            fetch(ADD_NEW_ENTRY_PATH, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    headline: `${newTitle}`,
                    subtitle: `${newSubtitle}`,
                    entryDate: `${newDate}`,
                    content: `${newEntry}`
                })
            })
                .then((resp) => resp.json())
                .then(function (data) {
                    console.log('data POST ENTRY:', data)
                    showAllEntrys()
                })

        }

    }


}
