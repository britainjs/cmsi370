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
                .appendTo(selector);
            var ba = $("<span>BA</span>")
                .addClass("menu-item")
                .appendTo(selector);
        });
    
    };

})( jQuery );

$('.degree').degreeSelector();
