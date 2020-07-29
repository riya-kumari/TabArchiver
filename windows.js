// const Folder = require('./folder.js').default
class Folder{
    constructor(name, tabs){
        this.name = name;
        this.arrOfTabs = tabs;
    }

    getName(){
        return this.name;
    }

    getTabs(){
        return this.arrOfTabs;
    }

    setName(val){
        this.name = val;
    }
}


const tabsArray = [] //Tabs displayed
const tabsSelected = [] // Tabs that are selected
var checkbox;
const checkboxArr = []
getUrls()



document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("Save").addEventListener('click', function () {
        save();
    });
    document.getElementById("SaveAll").addEventListener('click', function () {
        saveAll()
    });
    document.getElementById("Clear").addEventListener('click', function () {
        clear()
    });
  
})

// Gets all the urls of the current window
// Stores the urls in tabsArray
function getUrls(){
    chrome.tabs.getAllInWindow(null, function (tabs) {
        for (let i = 0; i < tabs.length; i++) {
            tabsArray.push(tabs[i]);
        }
        document.getElementById('ListOfTabs').innerHTML = ''
       displayTabs()
    });
    console.log("tabsArray in geturls after first loop :" + tabsArray)
    chrome.tabs.query({
        currentWindow: true,
        active: true
    },
    function (tabs) {
        tabsArray.push(tabs[0]);
    })
    console.log("tabsArray inside getUrls:" + tabsArray)
    
}

// *********** Current Tabs Window ***************
// Default window that is open
// User can see all the tabs that are open 
// They can select the ones they wish to save using saveAll(), save(), or clear() all the tabs selected
// Gets the urls in the tabsArray and displays it in a list format with a checkbox on the left.
function displayTabs() {

    for (t of tabsArray) {
        

        // <hr> horizontal line
        var line = document.createElement('hr')
        line.className = 'hr'

        // <label id="label"></label>
        var label = document.createElement('label')
        label.setAttribute('id', 'label')

        // <p id="name"> t.title </p>
        var name = document.createElement('p')
        name.appendChild(document.createTextNode(t.title))
        name.setAttribute('id', 'name')
        

        // <div id = "checkbox_div"></div>
        // <span class = "checkmark">
        var checkbox_div = document.createElement("div");
        checkbox_div.setAttribute('id', 'checkbox_div')
        var span = document.createElement('span')
        span.className= 'checkmark'

        
        // Creating the custom checkbox here : 
        /* <label id="label">
                <input class = "checkbox" type = "checkbox" checked="checked" name = t.title>
                <span class = "checkmark"> </span>
            </label>*/
        checkbox = document.createElement("INPUT");
        checkbox.setAttribute("type", "checkbox");
        checkbox.setAttribute("checked", "checked");
        checkbox.setAttribute("name", t.title);
        // console.log("checkbox name : " + checkbox.checked)
        checkbox.className = 'checkbox'
        label.appendChild(checkbox)
        label.appendChild(span)



        // label.appendChild(checkbox_div)
        label.appendChild(name)
        checkbox_div.appendChild(label)
        document.getElementById("ListOfTabs").appendChild(checkbox_div);
        // document.getElementById("ListOfTabs").appendChild(document.createElement('br'))
        document.getElementById("ListOfTabs").appendChild(line)
    }
    
}


function saveAll() {
    console.log("Save All button clicked!");
    console.log("tabsArray inside saveAll:" + tabsArray)
    const folder = createFolder();
    storeFolder(folder);

}
// Saves just the selected tabs on the CurrentTabsWindow
function save() {
       savedTabs =[];
       allCheckboxes = document.querySelectorAll('input[type=checkbox]:checked'); 
       
        for( c of allCheckboxes){
            console.log(c)
            for(t of tabsArray){
                if(t.title == c.name)
                    savedTabs.push(t)
            }    
        }
        const folder = createSpecificFolder(savedTabs)
        console.log(folder)
        alert("finished running save")
        storeFolder(folder);
}

// Clears the selection of the tabs on the CurrentTabsWindow
function clear() {
    tabsSelected = [];
}

// If user presses SaveAll
// Creates an instance of a Folder and stores all the tabs in it
// name of the folder is hour:min:seconds
// the Folder contains the array of tabs
function createFolder() {
    alert('entered createFolder(')
    var name = prompt("What would you like to name your session?");
        console.log("Folder Name : " + name);
        console.log("tabsArray before creating folder:" + tabsArray)
    var tabsFolder = new Folder(name, tabsArray);
        console.log(tabsFolder)
        console.log("Folder created : " + tabsFolder.getName() + "\n" + "tabsArray : " + tabsFolder.getTabs())
    return tabsFolder;
}

// If user presses the Save
function createSpecificFolder(tabs) {
        console.log('entered createFolder(tabs)')
    var name = prompt("What would you like to name your session?");
    var tabsFolder = new Folder(name, tabs);
        console.log(tabsFolder)
        console.log("Folder created : " + tabsFolder.getName() + "\n" + "tabsArray : " + tabsFolder.getTabs())
    return tabsFolder;
}

// folder is a Folder object
function storeFolder(folder) {

    if (typeof (Storage) != "undefined") {

        try {
            var data = JSON.parse(localStorage.getItem('monkeyTab_folders'))

            console.log("data before : " + data)
            if(data.length == null || data.length <= 0)
                data = [folder]
            else
                data.unshift(folder)
            console.log("data  after: " + data)
            localStorage.setItem('monkeyTab_folders', JSON.stringify(data));
                console.log('local storage successful')
        } catch (e) {
            
                console.log('caught an error ' + e)
                let foldersArray = []
                localStorage.setItem('monkeyTab_folders', JSON.stringify(foldersArray));
                console.log("finished catch")
        }


    }
}

