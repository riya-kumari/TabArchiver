// const Folder = require('./folder.js').default

const tabsArray = []

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
    // we might want to do all three individualy instead not sure once I know which button is which the we can directly call the functions 
    // selects all the buttons in the HTML file 	
    //
})

function getUrls(){
    chrome.tabs.getAllInWindow(null, function (tabs) {
        for (let i = 0; i < tabs.length; i++) {
            tabsArray.push(tabs[i]);
            // alert("tabsArray"+ tabs[i])
        }
        document.getElementById('ListOfTabs').innerHTML = ''
       displayTabs()
    });
    chrome.tabs.query({
        currentWindow: true,
        active: true
    },
    function (tabs) {
        tabsArray.push(tabs[0]);
    })
    
}

// *********** Current Tabs Window ***************
// Default window that is open
// User can see all the tabs that are open 
// They can select the ones they wish to save using saveAll(), save(), or clear() all the tabs selected
// Gets the urls in the tabsArray and displays it in a list format with a checkbox on the left.
function displayTabs() {
    // alert("tabs.url:")
    // alert(tabsArray)
    for (tabs of tabsArray) {
        var result =''
        // alert("inside for loop")
        var x = document.createElement("INPUT");
        x.setAttribute("type", "checkbox");
        // result = x
        result += '<li>' + tabs.title + "</li>"
        document.getElementById("ListOfTabs").appendChild(x);
        document.getElementById("ListOfTabs").innerHTML += result;
    }
}

function saveAll() {

  
    alert("Save All button clicked!");
    const folder = createFolder();
    storeFolder(folder);

}
// Saves just the selected tabs on the CurrentTabsWindow
function save() {
        alert("Save button clicked!");
        const folder = createFolder()
        storeFolder(folder);

}
// Clears the selection of the tabs on the CurrentTabsWindow
function clear() {

    tabsArray = [];
    alert("Clear button clicked!");



}

// Creates an instance of a Folder and stores all the tabs in it
// name of the folder is hour:min:seconds
// the Folder contains the array of tabs
function createFolder() {
    var d = new Date();
    var name = d.getHours() + ": " + d.getMinutes() + ": " + d.getSeconds() + ", ";
    alert("Folder Name : " + name);
    // alert("Before tabsFolder")
    var tabsFolder = new Folder(name, tabsArray);
    alert(tabsFolder)
    alert("Folder created : " + tabsFolder.getName() + "\n" + "tabsArray : " + tabsFolder.getTabs())
    return tabsFolder;
}

function storeFolder(folder) {
    // alert('before if')
    if (typeof (Storage) != "undefined") {
        // if(localStorage.getItem('monkeyTab_folders')!=null){
        try {
            var temp = localStorage.getItem('monkeyTab_folders')
            temp += folder;
            localStorage.setItem('monkeyTab_folders', folder);
            alert('local storage successful')
        } catch (e) {
            alert('caught an error ' + e)
            localStorage.setItem('monkeyTab_folders', folder);
        }

        // alert('after try-catch ')
    }
}

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

