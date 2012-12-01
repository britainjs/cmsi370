(function( $ ){
    $.fn.degreeSelector = function() {
        this.each(function(){
            var selector = $("<div></div>")
                .addClass("selector")
                .appendTo($(this));
            var bs = $("<span>BS</span>")
                .addClass("menu-item")
                .appendTo(selector)
                .css("display", "block");
            var ba = $("<span>BA</span>")
                .addClass("menu-item")
                .appendTo(selector);
        });
    
    };

})( jQuery );

$('.degree').degreeSelector();

$(".menu-item").mousedown(dropDown);

function dropDown(){
    var parent = $(this).parent().get(0);
    var currentMenu = $($(parent).children().get());
    currentMenu.css("display", "block");
    $(parent).css("z-index", "3");
    currentMenu.unbind("mousedown");
    currentMenu.mousedown(select);
}

function select(){
    var parent = $(this).parent().get(0);
    var currentMenu = $($(parent).children().get());
    currentMenu.css("display", "none");
    $(this).css("display", "block");
    currentMenu.unbind("mousedown");
    $(".menu-item").mousedown(dropDown); 
    $(".selector").css("z-index", "0");
}


