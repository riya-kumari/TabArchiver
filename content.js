let tabs =[]; // a sting array containing the TAB URLS 
console.log("chrome extension ready to go")
addTab()
//This function adds the current tab to the end of the tabs array it is called by the add button
function addTab(){
	// tabs.push(chrome.tabs.getCurrent().url)
	alert("tabs:"+ tabs)
}
// this function clears all the tabs 
function clearTabs(){
	tabs= [];
	
}
// not quite sure how to find out the tab id's 
function addTabs(){

}


// if we have time we can create a new class which has an object which stores info on a tab 
