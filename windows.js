// const Folder = require('./folder.js').default

const tabsArray = []
const tabsSelected = []

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
// <label id="label"><div><input id = "checkbox" type="checkbox"></div><p id="name"></p></label>
    for (tabs of tabsArray) {

        var label = document.createElement('label')
        label.setAttribute('id', 'label')

        var name = document.createElement('p')
        name.appendChild(document.createTextNode(tabs.title))
        name.setAttribute('id', 'name')
        // name.setAttribute('id', 'name')

        var checkbox_div = document.createElement("div");
        checkbox_div.setAttribute('id', 'checkbox_div')

        var checkbox = document.createElement("INPUT");
        checkbox.setAttribute("type", "checkbox");
        checkbox.setAttribute("checked", "checked");
        checkbox_div.appendChild(checkbox)

        label.appendChild(checkbox)
        label.appendChild(name)
        document.getElementById("ListOfTabs").appendChild(label);
        document.getElementById("ListOfTabs").appendChild(document.createElement('br'))
    }
}

function saveAll() {
    alert("Save All button clicked!");
    const folder = createFolder();
    storeFolder(folder);

}
// Saves just the selected tabs on the CurrentTabsWindow
function save() {
       savedTabs =[];
       allCheckboxes = document.querySelectorAll('input[type=checkbox]'); 
         for(let i=0; i< allCheckboxes.length; i++){
            if(allCheckboxes[i].checked){
               var  tabTitle = allCheckboxes[i].id
               for(let i=0; i<tabsArray.length; i++){
                if(tabsArray[i].title.valueOf() == tabTitle.valueOf()){
                     savedTabs.push(tabsArray[i]); 
                }
               }
                
            }
         }
        const folder = createFolder(savedTabs)
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
function createFolder(tabs) {
    var d = new Date();
    var name = d.getHours() + ": " + d.getMinutes() + ": " + d.getSeconds() + ", ";
    alert("Folder Name : " + name);
    // alert("Before tabsFolder")
    var tabsFolder = new Folder(name, tabs);
    alert(tabsFolder)
    alert("Folder created : " + tabsFolder.getName() + "\n" + "tabsArray : " + tabsFolder.getTabs())
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
            data.push(folder)
            console.log("data  after: " + data)
            localStorage.setItem('monkeyTab_folders', JSON.stringify(data));
                alert('local storage successful')
        } catch (e) {
            
                alert('caught an error ' + e)
            let foldersArray = []
            localStorage.setItem('monkeyTab_folders', JSON.stringify(foldersArray));
                alert("finished catch")
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

