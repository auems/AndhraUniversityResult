/* ==========================================================================
   AU EMS / Result page - main.js (replica)
   Behaviors copied from the original site: preloader fadeout, form-group
   focus highlight, captcha image generation + refresh.
   ========================================================================== */
(function ($) {
    "use strict";

    /* Preloader - fades out shortly after the page has loaded */
    $(window).on("load", function () {
        $("#preloader").delay(350).fadeOut(function () {
            $("body").delay(350).css({ "overflow": "visible" });
        });
    });

    /* Form group highlight on focus */
    $(document).ready(function () {
        $(".form-control")
            .on("focus", function () {
                $(this).closest(".form-group").addClass("focused");
            })
            .on("blur", function () {
                $(this).closest(".form-group").removeClass("focused");
            });
    });

    /* ------------------------------------------------------------------
       Captcha generation (frontend demo replica).
       Draws a random 5-character code onto a canvas and swaps the data-URL
       into the <img id="captcha_image">. Clicking the image refreshes it.
       ------------------------------------------------------------------ */
    function randomText(len) {
        var chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
        var out = "";
        for (var i = 0; i < len; i++) {
            out += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return out;
    }

    function wordToSeed(word) {
        var seed = 0;
        for (var i = 0; i < word.length; i++) {
            seed += word.charCodeAt(i);
        }
        return seed;
    }

    function drawCaptcha(canvas) {
        var ctx = canvas.getContext("2d");
        var w = canvas.width, h = canvas.height;
        var code = randomText(5);
        ctx.fillStyle = "#f4f7fb";
        ctx.fillRect(0, 0, w, h);
        var seed = wordToSeed(code);
        var rnd = function (top) { return Math.floor((Math.sin(seed * 91.7 + top * 13.3) % 1) * top + 0.5); };
        /* background noise lines */
        for (var n = 0; n < 6; n++) {
            ctx.strokeStyle = "rgba(39,106,170," + (0.15 + Math.random() * 0.2) + ")";
            ctx.beginPath();
            ctx.moveTo(rnd(w), rnd(h));
            ctx.lineTo(rnd(w), rnd(h));
            ctx.stroke();
        }
        /* characters */
        ctx.font = "bold 26px 'Open Sans', Arial, sans-serif";
        for (var i = 0; i < code.length; i++) {
            var x = 12 + i * 28;
            var y = 32 + rnd(8);
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate((Math.random() - 0.5) * 0.35);
            ctx.fillStyle = rnd(2) ? "#276aaa" : "#3a7fbf";
            ctx.fillText(code.charAt(i), 0, 0);
            ctx.restore();
        }
        /* foreground specks */
        for (var s = 0; s < 40; s++) {
            ctx.fillStyle = "rgba(39,106,170,0.35)";
            ctx.fillRect(rnd(w), rnd(h), 1.5, 1.5);
        }
        return code;
    }

    $(function () {
        var $captcha = $("#captcha_image");
        if ($captcha.length) {
            var cap = document.createElement("canvas");
            cap.width = 160;
            cap.height = 42;
            var code = drawCaptcha(cap);
            $captcha.attr("src", cap.toDataURL("image/png"));
            $captcha.css({ "cursor": "pointer", "height": "42px" });
            $captcha.on("click", function () {
                var fresh = drawCaptcha(cap);
                $captcha.attr("src", cap.toDataURL("image/png"));
                $("#captcha").val("").focus();
            });
        }
    });
})(jQuery);