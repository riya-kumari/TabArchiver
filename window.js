
const tabsArray = ['google.com','wikipedia.org','mail.yahoo.com']

//When the save, saveAll and clear buttons are clicked they call their respective functions
document.getElementById("SaveAll").onclick = saveAll;
document.getElementById("Save").onclick = save;
document.getElementById("Clear").onclick = clear;
displayTabs()

// *********** Current Tabs Window ***************
// Default window that is open
// User can see all the tabs that are open 
// They can select the ones they wish to save using saveAll(), save(), or clear() all the tabs selected


// Gets the urls in the tabsArray and displays it in a list format with a checkbox on the left.
function displayTabs(){
    var result = ''
    for(tabs of tabsArray){
        console.log("Enters Display Tag")
        // Checkbox
        var x = document.createElement("INPUT");
        x.setAttribute("type", "checkbox");
        
        result =  '<li>' + tabs + "</li>"
        document.getElementById("ListOfTabs").appendChild(x);
        document.getElementById("ListOfTabs").innerHTML +=  tabs;
    }
}

// Button Functions:

// Stores all the tabs to local storage
function saveAll(){
    alert("Save All button clicked!");
    const folder = createFolder();
    storeFolder(folder);
    
}

function storeFolder(folder){
    if(typeof(Storage) != "undefined"){
        // if(localStorage.getItem('monkeyTab_folders')!=null){
        try
        { 
            var temp = localStorage.getItem('monkeyTab_folders')
            temp+=folder;
            localStorage.setItem('monkeyTab_folders', temp);
            alert('local storage successful')
        } catch (e) {
            alert('caught an error ' + e)
            localStorage.setItem('monkeyTab_folders', folder);
        }
    }
}
// Saves just the selected tabs on the CurrentTabsWindow
function save(){
    alert("Save button clicked!");
    createFolder()
}
// Clears the selection of the tabs on the CurrentTabsWindow
function clear(){
    alert("Clear button clicked!");
    
}

// Creates an instance of a Folder and stores all the tabs in it
// name of the folder is hour:min:seconds
// the Folder contains the array of tabs
function createFolder(){
    var d = new Date();
    var name = d.getHours() + ": " + d.getMinutes() + ": "+ d.getSeconds()+ ", ";
    alert("Folder Name : " + name);
    const tabsFolder = new Folder(name,tabsArray);
    alert("Folder created : " + tabsFolder.getName() + "\n" + "tabsArray : " + tabsFolder.getTabs())
    return tabsFolder;
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
