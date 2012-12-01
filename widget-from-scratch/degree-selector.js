//A function to create the menu and append one to each element with the degree class.
(function( $ ){
    $.fn.degreeSelector = function() {
        this.each(function(){
            var selector = $("<div></div>")
                .addClass("selector")
                .appendTo($(this));
            var bs = $("<span>BS</span>")
                .addClass("menu-item")
                .appendTo(selector)
                .css("display", "inline-block");
            var ba = $("<span>BA</span>")
                .addClass("menu-item")
                .appendTo(selector);
            var ms = $("<span>MS</span>")
                .addClass("menu-item")
                .appendTo(selector);
            var ma = $("<span>MA</span>")
                .addClass("menu-item")
                .appendTo(selector);
            var other = $("<span>Other</span>")
                .addClass("menu-item")
                .appendTo(selector);
            var arrow = $("<span>▼</span>")
                .addClass("arrow")
                .appendTo(selector);  
            
            
        });
    
    };

})( jQuery );

$('.degree').degreeSelector();

$(".menu-item").mousedown(dropDown);
$(".arrow").mousedown(dropDown);

function dropDown(){
    /*Grab the parent of the selected element so we can get all of the elements in the
      list*/
    var parent = $(this).parent().get(0);
    var currentMenu = $($(parent).children().get());
    //Make the elements visible.
    currentMenu.css("display", "inline-block");
    //Push them to the front.
    $(parent).css("z-index", "1000");
    //Get rid of the dropDown listener and put in a selection listener.
    currentMenu.unbind("mousedown");
    currentMenu.mousedown(select);
    $(".arrow").unbind("mousedown");
}

function select(){
    var parent = $(this).parent().get(0);
    var currentMenu = $($(parent).children().get());
    $(".selector").css("z-index", "0");
    //Hide all of the elements except the selected element.
    currentMenu.css("display", "none");
    $(this).css("display", "inline-block");
    //Restore the dropDown listener and push the menu back.
    currentMenu.unbind("mousedown");
    $(".menu-item").mousedown(dropDown); 
    $(".arrow").css("display", "block");
    $(".arrow").mousedown(dropDown);
    
}


