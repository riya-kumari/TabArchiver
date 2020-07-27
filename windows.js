
const tabsArray = []


displayTabs()


document.addEventListener('DOMContentLoaded', function(){
	document.getElementById("Save").addEventListener('click',function(){
		save();
	});
	document.getElementById("SaveAll").addEventListener('click',function(){
		saveAll()
	});
	document.getElementById("Clear").addEventListener('click',function(){
		clear()
	});
			 // we might want to do all three individualy instead not sure once I know which button is which the we can directly call the functions 
	  // selects all the buttons in the HTML file 	
//
})



// *********** Current Tabs Window ***************
// Default window that is open
// User can see all the tabs that are open 
// They can select the ones they wish to save using saveAll(), save(), or clear() all the tabs selected
// Gets the urls in the tabsArray and displays it in a list format with a checkbox on the left.
function displayTabs(){
    var result = ''
    for(tabs of tabsArray){
        // console.log("Enters Display Tag")
        var x = document.createElement("INPUT");
        x.setAttribute("type", "checkbox");

        result = '<li>' + tabs.url + "</li>"
      document.getElementById("ListOfTabs").appendChild(x);
        document.getElementById("ListOfTabs").innerHTML +=  tabs;
    }
}

function saveAll(){

chrome.tabs.getAllInWindow(null, function(tabs){
    for (let i = 0; i < tabs.length; i++) {
   		tabsArray.push(tabs[i]);                        
    }
// alert(tabsArray)
});

}
// Saves just the selected tabs on the CurrentTabsWindow
function save(){

 chrome.tabs.query({currentWindow: true,active: true }, 
 function(tabs){
 
 	tabsArray.push(tabs[0]);
 	
 	
 })


 
   
}
// Clears the selection of the tabs on the CurrentTabsWindow
function clear(){
	
	tabsArray =[];
	
	
    
}
