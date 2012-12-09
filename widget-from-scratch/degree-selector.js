/* This widget creates a drop down menu for selecting the type of degree, i.e. bs, ba,
   etc. It is set to bs by default. No server interaction at the moment. The selection
   function returns the selected element though, so that could be used to implement server
   interaction. I couldn't quite work out getting the menu to close properly by clicking
   outside the menu, but at the moment you can close it and return to the previous 
   selection by clicking on the arrow. This plugin is used by giving a div the class
   "degree." Any element marked with this class is given a degree selector drop down
   when the page is loaded.*/

//A function to create the menu and append one to each element with the degree class.
(function( $ ){
    $.fn.degreeSelector = function() {
        this.each(function(){
            // JD: I can see why selector is a variable, but why
            //     the others?
            var selector = $("<div></div>")
                .addClass("selector")
                .appendTo($(this));
            var bs = $("<span>BS</span>")
                .addClass("menu-item previous")
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

// JD: Why isn't this code also part of the plugin?  That way you can
//     turn anything into a fully functioning degree selector by calling
//
//     $(jQuery selector).degreeSelector();
//
$('.degree').degreeSelector();
$(".menu-item").mousedown(dropDown);
$(".arrow").mousedown(dropDown);

// JD: You probably resorted to the function notation because you could
//     not call mousedown on .menu-item and .arrow without it.  Two things:
//
//     - First, that is easy to solve by declaring these functions before
//       trying to set them as event handlers (that is what the function
//       notation does anyway, just not as clearly).
//
//     - Second, it is generally not good to put stuff at the top-level
//       JavaScript scope.  You have just declared *global* functions
//       called dropDown and and select, for no real reason.  There are
//       better ways to separate (and encapsulate!) these concerns---like
//       for instance, putting everything in the plugin function!
//
function dropDown() {
    /*Grab the parent of the selected element so we can get all of the elements in the
      list and grab the last active element in case the user closes the menu without
      selecting a new item*/
    $(this).addClass("previous");
    var parent = $(this).parent().get(0);
    var currentMenu = $($(parent).children().get());
    currentMenu.unbind("mousedown");
    //Make the elements visible.
    currentMenu.css("display", "inline-block");
    //Push them to the front.
    $(parent).css("z-index", "1000");
    //Get rid of the dropDown listener and put in a selection listener.
    currentMenu.mousedown(select);
    $(".arrow").unbind("mousedown");
    $(".arrow").mousedown(function(){
        $(".selector").css("z-index", "0");
        currentMenu.css("display", "none");
        $(".previous").css("display", "inline-block");
        currentMenu.unbind("mousedown");
        $(".menu-item").mousedown(dropDown); 
        $(".arrow").css("display", "block");
        $(".arrow").mousedown(dropDown);
    });      
}

function select() {
    var parent = $(this).parent().get(0);
    var currentMenu = $($(parent).children().get());
    $("span").removeClass("previous");
    $(".selector").css("z-index", "0");
    //Hide all of the elements except the selected element.
    currentMenu.css("display", "none");
    $(this).css("display", "inline-block");
    $(this).addClass("previous");
    //Restore the dropDown listener and push the menu back.
    currentMenu.unbind("mousedown");
    $(".menu-item").mousedown(dropDown); 
    $(".arrow").css("display", "block");
    $(".arrow").mousedown(dropDown);
    // JD: Compare the above to:
    //
    //    $(".arrow")
    //        .css("display", "block")
    //        .mousedown(dropDown);
    //
    // Easier to read, I think.  A lot of your code can be consolidated
    // in this way.
    return $(this); 
}


