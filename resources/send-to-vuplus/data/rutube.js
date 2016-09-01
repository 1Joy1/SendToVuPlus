var OBSERVER;
self.port.on("detach", function(data) {
    if (data !== ""){
       if(OBSERVER){    
	      OBSERVER.disconnect();
        }
       var ouritem = document.getElementById("SEND_TO_VU");
       if(ouritem){
	      ouritem.remove(); 
        }
    }
});
self.port.on("injectSendButton", function(data) {
addSendButton(data);
	var callback;
	callback = function( recordqueue ){
	  if(!document.getElementById("VuplusId") && document.body){
		addSendButton(data);
	  }
	}
	OBSERVER = new MutationObserver( callback );
	var  options = {
		 childList: true,
		 attributes: false,
		 characterData: false
		};
	var article = document.getElementsByTagName("body")[0];
	OBSERVER.observe( article, options );
});

self.port.on("refreshButton", function (data) {
   if(OBSERVER) OBSERVER.disconnect();
       var ouritem = document.getElementById("SEND_TO_VU");
       if(ouritem) ouritem.remove(); 
	   addSendButton(data);
	var callback;
	callback = function( recordqueue ){
	  if(!document.getElementById("VuplusId") && document.body){
		addSendButton(data);
	  }
	}
	OBSERVER = new MutationObserver( callback );
	var  options = {
		 childList: true,
		 attributes: false,
		 characterData: false
		};
	var article = document.getElementsByTagName("body")[0];
	OBSERVER.observe( article, options );
});

function addSendButton(data){
          var imagesrc = data.image;
          var servers = data.servers;
addto = document.getElementsByClassName('b-author');
if (addto.length > 0) {  
if (!document.getElementById('rod_for_SendTO')){ 
           var newDivRod = document.createElement('div');  
		   newDivRod.id = 'rod_for_SendTO';  
		   newDivRod.style.marginBottom = '20px';
		   parentElem = addto[0];  
		   parentElem.appendChild(newDivRod);
		   } else {
		        var newDivRod = document.getElementById('rod_for_SendTO');
				 }
  var newDiv = document.createElement('div');
  newDivRod.appendChild(newDiv);
  newDiv.id = 'SEND_TO_VU';
  var loadplag = document.getElementsByClassName('ByJoy').length;
  for (var n=0 ; n < loadplag; n++) {document.getElementsByClassName('ByJoy')[n].style.float = 'left';}  
  newDiv.className = 'ByJoy';
  newDiv.style.marginRight = '10px'; 
  newDiv.appendChild(document.createTextNode('Send to'));  
  if (servers.length > 1) {  
  var listv = document.createElement('span');
      listv.style.position = "relative";
	  listv.style.left = "4px";
	  listv.style.fontSize = "12px";
	  listv.textContent= "\u25bc";
	  newDiv.appendChild(listv);
  var serverlist = document.createElement('select');
      serverlist.id = 'selectVUPLUSserver';
	  serverlist.style.position = "relative";	  
	  serverlist.style.border= "1px solid rgba(117, 117, 117, 0)";
      serverlist.style.background= "transparent"; 
	  serverlist.style.padding= "0px 5px";	  
	  serverlist.style.right= "7px";
	  serverlist.style.MozAppearance= "none";
	  
	    servers.forEach(function (server, i) {
        var sopt = document.createElement('option');
        sopt.value = i;
        sopt.appendChild(document.createTextNode(server.label));
        serverlist.appendChild(sopt);
      });
  newDiv.appendChild(serverlist);
} 
  newDiv.appendChild(document.createElement('br'));     
    var a = document.createElement('a');
	  a.id = "VuplusId";
	  a.href = "#";
	  a.title = 'Send to VuPlus';
	  a.onclick = function(){	  
	     var serversend = {};
    	 var servselect = document.getElementById('selectVUPLUSserver');
            if (servselect) {
             serversend = servers[servselect.value]; 
    		 var serverstring = serversend.host + ':' + serversend.port;
			 var serverlabel = serversend.label;
            } else 
			    {if (servers[0] !== undefined){
				       serversend = servers[0];
				       var serverstring = serversend.host + ':' + serversend.port;
					   var serverlabel = "";
                    } else {var serverstring = ""; var serverlabel = "";}
				}
		self.port.emit('openurl', {
		"url": window.location.href,
		"server": serverstring,
		"imagevu": serversend.imagevu,
		"label": serverlabel
		});
		return false;
	    }
	  image = document.createElement('img');
	  image.src = imagesrc;
	  image.alt = 'Send to VuPlus';
	  a.appendChild(image);
	  newDiv.appendChild(a);
  }
}

