/* ==========================================================================
   Result display - result.js
   Reads the registration number from ?reg=<number>, builds the image path
   images/<number>.jpg, and shows the image. If the image does not exist a
   clear "Registration Number not found." message is shown instead.
   Runs completely on the frontend.
   ========================================================================== */
(function ($) {
    "use strict";

    function getQueryParam(name) {
        var match = window.location.search.match(new RegExp("[?&]" + name + "=([^&]*)"));
        return match ? decodeURIComponent(match[1].replace(/\+/g, " ")) : null;
    }

    function showNotFound(message) {
        var html =
            '<i class="fa fa-search" style="font-size:34px;color:#84aac9;"></i>' +
            '<h4 style="color:#c0392b;">' + message + "</h4>" +
            '<p>Check the Registration Number and try again.</p>' +
            '<a href="index.html" class="btn btn-lg btn-theme">' +
            '<i class="fa fa-arrow-left"></i> Check Another Result</a>';
        $("#resultImage").hide();
        $("#resultLoading").hide();
        $("#resultNotFound").html(html).show();
    }

    $(document).ready(function () {
        var reg = getQueryParam("reg");

        if (reg === null || reg.trim() === "") {
            showNotFound("Registration Number not found.");
            return;
        }

        reg = reg.trim();

        /* Validate before touching the filesystem */
        if (!/^[0-9]{12}$/.test(reg)) {
            showNotFound("Invalid Registration Number.");
            return;
        }

        var imagePath = "images/" + reg + ".jpg";

        /* Pre-load the image to check whether it exists without executing
           any user input as HTML. */
        var probe = new Image();
        probe.onload = function () {
            var html =
                '<img src="' + imagePath + '" alt="Result - ' + reg + '" class="img-responsive">' +
                '<div class="result-actions">' +
                '<a href="index.html" class="btn btn-theme">' +
                '<i class="fa fa-search"></i> Check Another</a> ' +
                '<button type="button" class="btn btn-theme" id="btnPrint">' +
                '<i class="fa fa-print"></i> Print</button>' +
                "</div>";
            $("#resultLoading").hide();
            $("#resultNotFound").hide();
            $("#resultImage").html(html).show();
        };
        probe.onerror = function () {
            showNotFound("Registration Number not found.");
        };
        probe.src = imagePath;

        /* Optional print action */
        $(document).on("click", "#btnPrint", function () {
            window.print();
        });
    });
})(jQuery);