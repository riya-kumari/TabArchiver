let tabs =[]; // a sting array containing the TAB URLS 
console.log("chrome extension ready to go")
//let tabNames[];

// document.addEventListener('DOMContentLoaded', function(){
// 	var buttons = document.querySelectorAll('button'); // creates an array of all the buttons in the HTML file 
// 	 for (let i =0; i<buttons.length; i++){
// 	 	buttons[i].addEventListener('click',
// 		onclick,false) // we might want to do all three individualy instead not sure once I know which button is which the we can directly call the functions 
// 	 }
// 	  // selects all the buttons in the HTML file 
// 	function onclick (){
// 		chrome.tabs.query({currentWindow:true, active: true },
			
// 	}
// }, false)



//This function adds the current tab to the end of the tabs array it is called by the add button
function addTab(){
	tabs.push(chrome.tabs.getCurrent().url);
}
// this function clears all the tabs 
function clearTabs(){
	tabs= [];
	
}
// not quite sure how to find out the tab id's 
function addTabs(){

}


// if we have time we can create a new class which has an object which stores info on a tab 
