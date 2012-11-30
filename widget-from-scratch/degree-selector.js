(function( $ ){
    $.fn.degreeSelector = function() {
        this.each(function(){
            var selector = $("<div>Degree</div>")
                .addClass("selector")
                .appendTo($(this));
            var menu = $("<select></select>")
                .addClass("menu")
                .appendTo(selector);
            var bs = $("<option>BS</option>")
                .addClass("menuItem")
                .appendTo(menu);
            var ba = $("<option>BA</option>")
                .addClass("menuItem")
                .appendTo(menu);
        });
    
    };

})( jQuery );

$('.degree').degreeSelector();
