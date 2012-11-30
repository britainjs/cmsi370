(function( $ ){
    $.fn.degreeSelector = function() {
        this.each(function(){
            var selector = $("<div>Degree</div>")
                .addClass("selector")
                .appendTo($(this));
        });
    
    };

})( jQuery );

$('.degree').degreeSelector();
