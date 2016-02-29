
function sendPickerData () {
        
    var targetOrigin = "";

    if (location.search.match(/targetOrigin=([^&]+)/) != null){
        targetOrigin = location.search.match(/targetOrigin=([^&]+)/)!= null && unescape(location.search.match(/targetOrigin=([^&]+)/)[1]);

        var scriptEl = document.createElement('script');
            scriptEl.type = 'text/javascript';
            scriptEl.async = true;
            scriptEl.src = targetOrigin + '/studio/pickerResultInterface.js';
        (document.head || document.body).appendChild(scriptEl);
    }



    if(!targetOrigin || (location.search == "")) return; //kein submit ohne hostsystem

    if ("http://cm2-int-pre.zdf.de/studio/"  != document.referrer && 
        "http://cm2-prod-pre.zdf.de/studio/" != document.referrer){
        //todo button ohne p12 oder imp ausblenden
        //alert("Nur aus P12 heraus aufrufbar.");
    }

    //raus oder imperia mit aufnehmen
    //if ("http://cm2-prod-pre.zdf.de/studio/" == document.referrer) {
    var pickerData = { 
            playoutUrl:     "http://"+ db_hosts.pub + "/c/twr/" + docId + "/embed.html",
            playoutXmlUrl:  "http://"+ db_hosts.pub + "/c/twr/" + docId + "/embedm.html"
        };			

    var query = window.location.search.substring(1);
    var vars = query.split("&");
    var getvars = {};

    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        getvars[ pair[0] ] = pair[1];
    }
                
    var res = {
        "getvars":getvars,
        "content":[
            {
                "id": "noid",
                "description":	"Social  Overlay",
                "visibleFrom":"2011-11-24T00:00:00+01:00",
                "visibleTo":"2024-11-24T00:00:00+01:00",
                "fragments":[
                    {
                        "fragmentURI": pickerData.playoutUrl + "?" + Math.random(),
                        "playout":"web"
                    },
                    {
                        "fragmentURI": pickerData.playoutXmlUrl,
                        "playout":"xml"
                    }							
                ]
            }
        ]
    };

    PickerResultInterface.sendResult(res, targetOrigin);	    	


    
    
}
