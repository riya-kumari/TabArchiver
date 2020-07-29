

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
            // alert(obj.name)
            
            var line = document.createElement('hr')
            line.className = 'hr'
            var div = document.createElement('div')
            var content_div = document.createElement('div')
                var label = document.createElement('label')
                var checkbox = document.createElement("INPUT");
                var folder_icon = document.createElement('div')
            var dropdown_content = document.createElement('div')
            var button = document.createElement('div')
            button.setAttribute('id','button')
            button.setAttribute('href', 'folderUrls.html')

            div.setAttribute( 'id',"folder_div")

            content_div.className = "content_div"
            folder_icon.className = "folder_icon"
            checkbox.className = 'checkbox_saved'
            
            checkbox.setAttribute("type", "checkbox");
             
            label.append(checkbox)
            label.appendChild(document.createTextNode(obj.name))
            
            content_div.appendChild(label)

            div.appendChild(content_div)


           
                var a= document.createElement('a')
                // a.appendChild(obj.arrOfTabs.title)
                console.log(obj)
                div.appendChild(a)
            

            
            document.getElementById("ListOfFolders").appendChild(div)
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

// Stores all the tabs to local storage
function openAll(){
    alert("Open All button clicked!");

    if(typeof(Storage) != "undefined"){
        localStorage.setItem(folder.getName(), folder.getTabs());
        alert('local storage successful')
        tabs = folder.getTabs();
        for (let i=0; i< tabs.length; i++){
            chrome.tabs.create({url: tabs[i].url })
        }
    }
}
// Saves just the selected tabs on the CurrentTabsWindow
function open(){
   // alert("Open button clicked!");
     const folder = createFolder();
      if(typeof(Storage) != "undefined"){

      }
        
}

function deleteAll(){
    
    localStorage.setItem('monkeyTab_folders', JSON.stringify([]))
    getTabs()
}

// Creates an instance of a Folder and stores all the tabs in it
// name of the folder is hour:min:seconds
// the Folder contains the array of tabs
function createFolder() {
    var d = new Date();
    // var name = d.getHours() + ": " + d.getMinutes() + ": " + d.getSeconds() + ", ";
    // alert("Folder Name : " + name);
    // // alert("Before tabsFolder")
    // var tabsFolder = new Folder("name", []);
    // alert(tabsFolder)
    // // alert("Folder created : " + tabsFolder.getName() + "\n" + "tabsArray : " + .getTabs()
    // return tabsFolder;
}








