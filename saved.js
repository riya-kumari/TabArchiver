//When the save, saveAll and clear buttons are clicked they call their respective functions
document.getElementById("OpenAll").onclick = openAll;
document.getElementById("Open").onclick = open;
document.getElementById("Delete").onclick = deleteTab;
getTabs()

// *********** Saved Window ***************
// User can navigate to this window
// User can see folders of tabs that they have saved
// They can select the folders they wish to open
// They can tap on each folder to view the url contents inside it

// Retrieves folders from local storage
function getTabs(){
    var temp = localStorage.getItem('monkeyTab_folders')
    alert("entered getTabs")
    alert(temp)
    // Iterating through folders
    for(obj of temp){
        // alert("inside for loop of  getTabs")
        var x = document.createElement("INPUT");
        x.setAttribute("type", "checkbox");
        const result =  '<li>' + obj.getName + "</li>"
        document.getElementById("ListOfTabs").appendChild(x);
        document.getElementById("ListOfTabs").innerHTML +=  result;
    }
        // document.getElementById("ListOfTabs").innerHTML = obj;

 
}

// Button Functions:

// Stores all the tabs to local storage
function openAll(){
    alert("Open All button clicked!");
    const folder = createFolder();

    if(typeof(Storage) != "undefined"){
        localStorage.setItem(folder.getName, folder.getTabs);
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

 