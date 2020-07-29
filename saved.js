

class Folder{
    constructor(name, tabs){
        // alert("entered constructor of folder")
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
// import Folder from './folder.js'
//When the save, saveAll and clear buttons are clicked they call their respective functions
document.getElementById("OpenAll").onclick = openAll;
document.getElementById("Open").onclick = open;
document.getElementById("Delete").onclick = deleteAll;
// document.getElementById("Delete").onclick = deleteTab;

var foldersArray =[]
var checkbox;
// createFolder()
getTabs()

// *********** Saved Window ***************
// User can navigate to this window
// User can see folders of tabs that they have saved
// They can select the folders they wish to open
// They can tap on each folder to view the url contents inside it

// Retrieves folders from local storage
function getTabs(){
    try{

        const arrOfFolders = JSON.parse(localStorage.getItem('monkeyTab_folders'))
        // storing it in global variable
        foldersArray = arrOfFolders;
        console.log(arrOfFolders)
        for(obj of arrOfFolders){
            // <hr> horizontal line
            var line = document.createElement('hr')
            line.className = 'hr'

            // <label id="label"></label>
            var label = document.createElement('label')
            label.setAttribute('id', 'label')

            // <p id="name"> t.title </p>
            var name = document.createElement('p')
            name.appendChild(document.createTextNode(obj.name))
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
            checkbox.setAttribute("name", obj.name);
            // checkbox.setAttribute("name", t.title);
            // console.log("checkbox name : " + checkbox.checked)
            checkbox.className = 'checkbox'
            label.appendChild(checkbox)
            label.appendChild(span)
    
    
    
            // label.appendChild(checkbox_div)
            label.appendChild(name)
            checkbox_div.appendChild(label)
            document.getElementById("ListOfFolders").appendChild(label);
            document.getElementById("ListOfFolders").appendChild(line)

           

        }

    }
    catch (e){
        alert(e)
        var div = document.createElement('div')
        div.appendChild(document.createTextNode("You have no saved folders."))
        document.getElementById("ListOfFolders").appendChild(div)
    }
}

function openFolder(){
    console.log('enters openFodler')
    window.open('folderUrls.html',"_top")
}




// Button Functions:


// Saves just the selected tabs on the CurrentTabsWindow

function openAll(){
 
    folders =  JSON.parse(localStorage.getItem('monkeyTab_folders'));   
    for(obj of folders){
       tabsArray = obj.arrOfTabs;
       createTabs(tabsArray);
    }

}

// Saves just the selected tabs on the CurrentTabsWindow
function open(){

    savedTabs =[];
    allCheckboxes = document.querySelectorAll('input[type=checkbox]:checked'); 
    
     for( c of allCheckboxes){
         console.log(c)
         for(f of foldersArray){
             if(f.name == c.name)
                 createTabs(f.arrOfTabs)
         }    
     }
    
     alert("finished running open")
     
        

            
         
}
function createTabs(tabsArray){
    if(tabsArray != null && tabsArray.length !=0){

        for(let i=0; tabsArray.length; i++){
                    if(tabsArray[i] != null){
                     chrome.tabs.create({url: tabsArray[i].url })

                    }
             }
       }
    
        //for(let i=0;i<tabsArray.length; i++){
        //    chrome.tabs.create({url: tabs[i].url })
        //}
    
}

function deleteAll(){
    
    localStorage.setItem('monkeyTab_folders', JSON.stringify([]))
    getTabs()
}

