var OBSERVER;
self.port.on("detach", function(data) {
    if (data !== ""){
       if(OBSERVER){    
	      OBSERVER.disconnect();
	    }
       var ouritem = document.getElementById("VuplusIdLi");
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
       var ouritem = document.getElementById("VuplusIdLi");
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
		  var addto = document.getElementById('watch-related');
		  if(addto){
			 var targets = document.querySelector('#watch-related li');
			 var ouritem = document.createElement('li');
			 ouritem.id = "VuplusIdLi";
			 ouritem.className = 'video-list-item';
			 ouritem.appendChild(document.createTextNode('Send to'));			  
			 if (servers.length > 1) {
                 var serverlist = document.createElement('select');
                 serverlist.id = 'selectVUPLUSserver';
        	     serverlist.style.position = "relative"; 	 
        	     serverlist.style.left= "11em";
        	     serverlist.style.borderRadius= "2px"; 
        	     serverlist.style.border= "1px solid rgba(117, 117, 117, 0.21)"; 
        	     serverlist.style.fontWeight= "bold"; 
        	     serverlist.style.padding= "0px 5px";	  
               
			   servers.forEach(function (server, i) {
                 var sopt = document.createElement('option');
                 sopt.value = i;
                 sopt.appendChild(document.createTextNode(server.label));
                 serverlist.appendChild(sopt);
                 });
                 ouritem.appendChild(serverlist);
                }			  			  
			  ouritem.appendChild(document.createElement('br'));
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
                } else {
				   if (servers[0] !== undefined){
				       serversend = servers[0];
				       var serverstring = serversend.host + ':' + serversend.port;
					   var serverlabel = "";
                    } else {
						var serverstring = ""; var serverlabel = "";
						}
				}				
				self.port.emit('openurl', {
				"url": window.location.href,
				"server": serverstring,
				"imagevu": serversend.imagevu,
				"label": serverlabel
				});
				return false;
			  }
			  var image = document.createElement('img');
			  image.src = imagesrc;
			  image.alt = 'Send to VuPlus';
			  a.appendChild(image);
			  ouritem.appendChild(a);
			  addto.insertBefore(ouritem,targets);
			}
}
