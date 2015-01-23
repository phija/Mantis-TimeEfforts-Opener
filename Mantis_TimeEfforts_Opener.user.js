// ==UserScript==
// @name        Mantis TimeEfforts Opener
// @author      phija
// @namespace   http://www.phiworld.de
// @description Opens collapsed lines in TimeEfforts script
// @include     http://tracker.atrics.loc/plugin.php?page=TimeEffortAnalysis/developerView
// @include     http://tracker.atrics.loc/plugin.php?page=TimeEffortAnalysis/productView
// @grant       none
// version      0.1.0
// ==/UserScript==

var developerToOpen = "";
var developerRowsToOpen = 2;

var productToOpen = "";
var productRowsToOpen = 1;


function openDeveloperRows() 
{
  if (window.location.href.indexOf("developerView") == -1) 
  {
    return;
  }
  
  console.log("opening developer rows");
  
  var amountOpened = 0;
  
  var trElements = document.getElementsByTagName("tr");  
  
  for (var i = 0; i < trElements.length; i++) 
  {
    if (amountOpened >= developerRowsToOpen)
    {
      break;
    }
    
    var trEl = trElements[i];
    var className = trEl.className;
    
    if (className[0] == "p" ||
        className == "tooHigh")    
    {
      var openAction = trEl.getAttribute("onclick");      
      var open = false; 
    
      var tdElements = trEl.getElementsByTagName("td");
      for (var j = 0; j < tdElements.length; j++) 
      {   
        if (tdElements[j].innerHTML == developerToOpen)
        {
          open = true;
          break;
        }
      }
      
      if (open)
      {
        var strings = openAction.split("deadline");  
        var number = strings[1].split("'")[0];
        
        console.log("open number " + number);
        
        toggle(trEl, "#deadline" + number);
        ++amountOpened;
      }
    }
  }
}


function openProductRows() 
{
  if (window.location.href.indexOf("productView") == -1) 
  {
    return;
  }
  console.log("opening product rows");
  
  var amountOpened = 0;
  
  var trElements = document.getElementsByTagName("tr");  
  var developerIdToOpen = "";
  
  for (var i = 0; i < trElements.length; i++)
  {    
    var trEl = trElements[i];
    var className = trEl.className;
    className = className.substring(className.length - 9, className.length);  
  
    
    if (className == "subheader")
    {
      if (amountOpened >= productRowsToOpen)
      {
        return;
      }
      
      developerIdToOpen = "";
      var openAction = trEl.getAttribute("onclick");      
      var open = false; 
    
      var tdElements = trEl.getElementsByTagName("td");
      for (var j = 0; j < tdElements.length; j++) 
      {   
        if (tdElements[j].innerHTML == productToOpen)
        {
          open = true;
          break;
        }
      }
      
      if (open)
      {
        var number = openAction.split("'")[1];       
        
        console.log("open number " + number);               
                
        toggleRowIds(number);
        developerIdToOpen = number;        
        
        ++amountOpened;
      }
    }
    else if (developerIdToOpen != "")
    { 
      console.log("  compare: " + trEl.getAttribute("data-rowid") + " : " + developerIdToOpen);
      if (trEl.getAttribute("data-rowid") == developerIdToOpen)
      {
        var openAction = trEl.getAttribute("onclick");
        var number = openAction.split("'")[1];
        console.log("  open:" + number);
        toggleContent(trEl, number);
      }
    }
  }
}


openDeveloperRows();
openProductRows();