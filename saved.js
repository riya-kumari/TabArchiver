
// import Folder from './folder.js'
//When the save, saveAll and clear buttons are clicked they call their respective functions
document.getElementById("OpenAll").onclick = openAll;
document.getElementById("Open").onclick = open;
document.getElementById("Delete").onclick = deleteTab;
const tabsArray = [1,2,3]
createFolder()
// getTabs()

// *********** Saved Window ***************
// User can navigate to this window
// User can see folders of tabs that they have saved
// They can select the folders they wish to open
// They can tap on each folder to view the url contents inside it

// Retrieves folders from local storage
function getTabs(){
    var temp = localStorage.getItem('monkeyTab_folders')
    // alert("entered getTabs")
    alert(temp)
    // Iterating through folders
    for(obj of temp){
        // alert("inside for loop of  getTabs")
        var x = document.createElement("INPUT");
        x.setAttribute("type", "checkbox");
                alert("before creating folder")
        var folder1 = createFolder()
        // var folder1 = new Folder("name",1)
                alert("after creating folder")
                alert("folder "+folder1)
        var name = folder1.getName()
        if(name!=null){
            const result =  '<li>' + name + "</li>"
            document.getElementById("ListOfTabs").appendChild(x);
            document.getElementById("ListOfTabs").innerHTML +=  result;
        }
    }
        // document.getElementById("ListOfTabs").innerHTML = obj;

 
}

// Button Functions:

// Stores all the tabs to local storage
function openAll(){
    alert("Open All button clicked!");
    const folder = createFolder();

    if(typeof(Storage) != "undefined"){
        localStorage.setItem(folder.getName(), folder.getTabs());
        alert('local storage successful')
    }
}
// Saves just the selected tabs on the CurrentTabsWindow
function open(){
    alert("Open button clicked!");
    createFolder()
}

function deleteTab(tabToBeDeleted){
    alert("delete button clicked!");
}

// Creates an instance of a Folder and stores all the tabs in it
// name of the folder is hour:min:seconds
// the Folder contains the array of tabs
function createFolder() {
    var d = new Date();
    var name = d.getHours() + ": " + d.getMinutes() + ": " + d.getSeconds() + ", ";
    alert("Folder Name : " + name);
    alert("Before tabsFolder")
    var tabsFolder = new Folder(name, tabsArray);
    alert("After tabsFolder")
    alert("Folder created : " + tabsFolder.getName() + "\n" + "tabsArray : " + tabsFolder.getTabs())
    return tabsFolder;
}


class Folder{
    constructor(name, tabs){
        alert("entered constructor of folder")
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
