var topZ = 10;  //sets active move elmnt to this + increment

    //called when mouse hovers over a .fotopopup
    function dragElement(elmnt) {
        var pos1 = 0,
            pos2 = 0,
            pos3 = 0,
            pos4 = 0;
        if (document.getElementById(elmnt.id + "header")) {
            // if present, the header is where you move the DIV from:
            document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
        } else {
            // otherwise, move the DIV from anywhere inside the DIV:
            elmnt.onmousedown = dragMouseDown;
        }

        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
            // get the mouse cursor position at startup:
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            // call a function whenever the cursor moves:
            document.onmousemove = elementDrag;
            elmnt.style.zIndex = ++topZ;
        }

        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            // calculate the new cursor position:
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            // set the element's new position:
            elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
            //elmnt.style.zIndex += "1";
        }

        function closeDragElement() {
            // stop moving when mouse button is released:
            document.onmouseup = null;
            document.onmousemove = null;
            //elmnt.style.zIndex = "998";
        }
    }

    $(document).ready(function() {

        $(".fotopopup").each(function() {
            $(this).attr("z-index", "1");
        });

        $('.fotopopup').hover(function() {
            $(this).attr("id", "fotodrag");
            dragElement(this);
        }, function() {
            $(this).attr("id", "");
        });

			// neues Array mit allen Farben
        var colors = ["rgb(231,95,42)", "rgb(185,184,184)", "rgb(90,220,129)", "rgb(245,255,42)", "rgb(174,54,248)", "rgb(0,65,236)"];

        //Zufallsfunktion Farbzuteilung
        $('.randomcolor').each(function() {
            var number = 1 + Math.floor(Math.random() * 5);
            $(this).attr("style", "background:" + colors[number]);
        })


        // Find all YouTube videos
        // Expand that selector for Vimeo and whatever else
        var $allVideos = $("video"),

        // The element that is fluid width
        $fluidEl = $("body");

        var allAutoPlayVids = $("video")
        
        // Figure out and save aspect ratio for each video
        $allVideos.each(function() {

          $(this)
            .data('aspectRatio', this.height / this.width)

            // and remove the hard coded width/height
            .removeAttr('height')
            .removeAttr('width');

            if ($(this).paused) {
                $(this).play;
                console.log("played");
            }
        });

        // When the window is resized
        $(window).resize(function() {

          var newWidth = $fluidEl.width() - ($fluidEl.width()/1.5);

          // Resize all videos according to their own aspect ratio
          $allVideos.each(function() {
              
            var randomSizeAdd = Math.floor(Math.random() * (newWidth/1.5));
            console.log(randomSizeAdd);
            var $el = $(this);
            $el
              .width(newWidth+randomSizeAdd)
              .height(newWidth * $el.data('aspectRatio'));

          });

        // Kick off one resize to fix all videos on page load
        }).resize();
        
        //Zufallsfunktion Fotoposition
        $('.randompos').each(function() {
            var divWidth = $(this).outerWidth();
            var divHeight = $(this).outerHeight();
            $(this).attr("style", 
                         "left:" + (Math.random() * ($(window).width() - divWidth)).toFixed() + "px; top:" + (Math.random() * ($(window).height() - divHeight)).toFixed() + "px");
        });

    });

    jQuery(function($) {
        $('.golink').click(function() {
            return false;
        }).dblclick(function() {
            window.location = this.href;
            return false;
        });
    });