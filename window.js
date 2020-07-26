

document.getElementById("SaveAll").onclick = saveAll;
document.getElementById("Save").onclick = save;
document.getElementById("Clear").onclick = clear;
// CurrentTabs Window
const tabsArray = ['google.com','wikipedia.org','mail.yahoo.com']

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
        
        result = '<li>' + tabs + "</li>"
        document.getElementById("ListOfTabs").appendChild(x);
        document.getElementById("ListOfTabs").innerHTML +=  tabs;
    }
}
function saveAll(){

}
// Saves just the selected tabs on the CurrentTabsWindow
function save(){
    
}
// Clears the selection of the tabs on the CurrentTabsWindow
function clear(){
    
}
