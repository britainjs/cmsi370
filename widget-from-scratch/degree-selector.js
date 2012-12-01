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
    $(".menu-item").css("display", "block");
    $(".menu-item").unbind("mousedown");
    $(".menu-item").mousedown(select);
    
}

function select(){
    $(".menu-item").css("display", "none");
    $(this).css("display", "block");
    $(".menu-item").unbind("mousedown");
    $(".menu-item").mousedown(dropDown);
    
}


