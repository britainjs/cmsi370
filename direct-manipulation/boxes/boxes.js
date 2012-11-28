var Boxes = {
    /**
     * Constant for the left mouse button.
     */
    LEFT_BUTTON: 1,

    /**
     * Sets up the given jQuery collection as the drawing area(s).
     */
    setDrawingArea: function (jQueryElements) {
        jQueryElements
            .addClass("drawing-area")
            // "this" is Boxes.
            .mousedown(this.startDraw)
            .mousemove(this.trackDrag)
            
            // We conclude drawing on either a mouseup or a mouseleave.
            .mouseup(this.endDrag)
            .mouseleave(this.endDrag);
    },

    /**
     * Utility function for disabling certain behaviors when the drawing
     * area is in certain states.
     */
    setupDragState: function () {
        $(".drawing-area .box ")
            .unbind("mousemove")
            .unbind("mouseleave");
    },

    /**
     * Begins a box draw sequence.
     */
    startDraw: function (event) {
        // We only respond to the left mouse button.
        if (event.which === Boxes.LEFT_BUTTON) {
            console.log(this);
            // Add a new box to the drawing area.  Note how we use
            // the drawing area as a holder of "local" variables
            // ("this" as standardized by jQuery).
            this.anchorX = event.pageX;
            this.anchorY = event.pageY;
            this.drawingBox = $("<div></div>")
                .appendTo(this)
                .addClass("box")
                .offset({ left: this.anchorX, top: this.anchorY });
            // Add a handle to the box to indicate where to grab for resizing.
            this.drawingBox.handle = $("<div></div>")
                .appendTo(this.drawingBox)
                .addClass("handle");
                
            // Take away the highlight behavior while the draw is
            // happening.
            Boxes.setupDragState();
        }
    },

    /**
     * Tracks a box as it is rubberbanded or moved across the drawing area.
     */
    trackDrag: function (event) {
        // Don't bother if we aren't tracking anything.
        // JD: Have you tried console.log(this.resizingBox) to see if there
        //     really is a this.resizingBox after initiating a resize?
        if (this.drawingBox) {
            // Calculate the new box location and dimensions.  Note how
            // this might require a "corner switch."
            var newOffset = {
                left: (this.anchorX < event.pageX) ? this.anchorX : event.pageX,
                top: (this.anchorY < event.pageY) ? this.anchorY : event.pageY
            };

            this.drawingBox
                .offset(newOffset)
                .width(Math.abs(event.pageX - this.anchorX))
                .height(Math.abs(event.pageY - this.anchorY));
        }else if (this.resizingBox) {
           // Behaves just like drawing with different anchors.
           var newOffset = {
                left: (this.anchorX < event.pageX) ? this.anchorX : event.pageX,
                top: (this.anchorY < event.pageY) ? this.anchorY : event.pageY
            };
            // Set the dimensions of the box as defined by the cursor
            this.resizingBox
                .offset(newOffset)
                .width(Math.abs(event.pageX - this.anchorX))
                .height(Math.abs(event.pageY - this.anchorY));              
        } else if (this.movingBox) {
            // Reposition the object.
            if( (event.pageX > $(".drawing-area").width()) | 
                (event.pageY > $(".drawing-area").height())){
                    this.movingBox.css('background', "red");
            }else{
                this.movingBox.css('background', "white");
            }
            this.movingBox.offset({
                left: event.pageX - this.deltaX,
                top: event.pageY - this.deltaY,
            });
            
        }   
        
        
    },

    /**
     * Concludes a drawing or moving sequence.
     */
    endDrag: function (event) {
        if (this.drawingBox) {
            // Finalize things by setting the box's behavior.
            this.drawingBox
                .mousemove(Boxes.highlight)
                .mouseleave(Boxes.unhighlight)
                .mousedown(Boxes.startMove)
                .handle.mousedown(Boxes.startResize);
            // All done.
            this.drawingBox = null;
        } else if (this.resizingBox) {
                this.resizingBox = null;    
            
        } else if (this.movingBox) {
            // Change state to "not-moving-anything" by clearing out
            // this.movingBox.

            // JD: 512 is an avoidable hardcode!  What if the web designer
            //     changes the drawing area CSS behind your back?
            // Delete the box if it is outside the drawing area.
            if( (event.pageX > $(".drawing-area").width()) | 
                (event.pageY > $(".drawing-area").height())){
                    this.movingBox.remove();
            }
            this.movingBox = null;
        
        }

        // In either case, restore the highlight behavior that was
        // temporarily removed while the drag was happening.
        $(".drawing-area .box")
            .removeClass("box-highlight")
            .mousemove(Boxes.highlight)
            .mouseleave(Boxes.unhighlight);
        
    },
        

    /**
     * Indicates that an element is highlighted.
     */
    highlight: function () {
        $(this).addClass("box-highlight");
    },

    /**
     * Indicates that an element is unhighlighted.
     */
    unhighlight: function () {
        $(this).removeClass("box-highlight");
    },
    
    /**
     * Begins a box move sequence.
     */
    startMove: function (event) {
        // We only move using the left mouse button.
        if (event.which === Boxes.LEFT_BUTTON) {
            
            
            // Take note of the box's current (global) location.
            var jThis = $(this),
                startOffset = jThis.offset(),

                // Grab the drawing area (this element's parent).
                // We want the actual element, and not the jQuery wrapper
                // that usually comes with it.
                parent = jThis.parent().get(0);
            // Set the drawing area's state to indicate that it is
            // in the middle of a move.
            parent.movingBox = jThis;
            parent.deltaX = event.pageX - startOffset.left;
            parent.deltaY = event.pageY - startOffset.top;
            // Take away the highlight behavior while the move is
            // happening.
            Boxes.setupDragState();

            // Eat up the event so that the drawing area does not
            // deal with it.
            event.stopPropagation();
            
        }
    },
    /**
     * Begins a box resize sequence.
     */
    startResize: function (event) {
    // Only resize on left mouse button.
    
        if(event.which === Boxes.LEFT_BUTTON ) {
        
            // Grab the handle.
            var jThis = $(this);
            // JD: Take note---what object "owns" the resizingBox that is
            //     being assigned below?
            // Grab the box   
            var parentBox = jThis.parent().get(0);
            // Grab the drawing area
            var superParent = $(parentBox).parent().get(0);
            // Set the drawing area's state to show it is resizing.
            superParent.resizingBox = $(parentBox);
            // JD: Also, no need to $() something that was already $()'ed.
            // Set the anchors to the upper right corner.
            superParent.anchorX = event.pageX - $(parentBox).width();
            superParent.anchorY = event.pageY - $(parentBox).height();
    
            Boxes.setupDragState();
            
            event.stopPropagation();
        }
    
    },
    
};
