(function( $ ){
    $.fn.degreeSelector = function() {
        this.each(function(){
            var selector = $("<div></div>")
                .addClass("selector")
                .appendTo($(this));
            /*var menu = $("<div></div>")
                .addClass("menu")
                .appendTo(selector);
                */
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
    var currentMenu = $($(this).siblings().get());
    currentMenu.css("display", "block");
    currentMenu.unbind("mousedown");
    currentMenu.mousedown(select);
    
}

function select(){
    var currentMenu = $($(this).siblings().get());
    currentMenu.css("display", "none");
    $(this).css("display", "block");
    currentMenu.unbind("mousedown");
    $(".menu-item").mousedown(dropDown);
    
}


