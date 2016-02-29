var socket = io();
var meme;
var selecteditem=false;

var listener = function(event) {
    //if(event.origin !== 'http://*.zdf.de') return;
    if (event.data == "ping"){
        event.source.postMessage("pong",event.origin);        
    }
};

// listen to popup response
window.addEventListener('message', listener, false);

!function init() {    
    
    //app2 http://version1.api.memegenerator.net/#Generators_Select_ByTrending
    
    $.ajax({
        url: "https://api.imgflip.com/get_memes",
        context: document.body
    }).done(function( result ) {
          
        // data to list
        if (result.success){
            
            var memes = result.data.memes.slice(0,29);

            jQuery.each( memes, function(i,m){
                var memeitem = $.parseHTML(`<a href="#"><img src="${m.url}"></a>`);
                    $(memeitem).on( "click" , function(e){
                        
                        if (selecteditem){
                            selecteditem.removeClass("active");
                        }
                        selecteditem = $(memeitem);
                        selecteditem.addClass("active");
                        
                        meme = m;
                        e.preventDefault();
                    } );                    
                $( "#memes" ).append( memeitem );
            });
        }
    });
}();


$('#myButton').on('click', function () {
    var $btn = $(this).button('loading');
    // business logic...
    save(meme,()=>{
        $btn.button('reset'); 
    });    
});

function save(meme, cb){
    
    console.log(meme);
    sendPickerData();
    
}