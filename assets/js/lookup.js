/* ==========================================================================
   Registration Number lookup - lookup.js
   Reads the entered registration number, trims spaces, validates it, and
   forwards to result.html?reg=<number> where the matching image is shown.
   Runs completely on the frontend (no PHP / MySQL / API).
   ========================================================================== */
(function ($) {
    "use strict";

    function showError(message) {
        var $error = $("#formError");
        $error.text(message).css("display", "block");
    }

    $(document).ready(function () {
        $("form[name='result']").on("submit", function (e) {
            e.preventDefault();

            var $error = $("#formError");
            $error.css("display", "none");

            var input = document.getElementById("reg");
            var raw = input.value;

            /* 1. Trim leading / trailing spaces */
            var reg = raw.replace(/^\s+|\s+$/g, "");

            /* 2. Reject empty submissions */
            if (reg.length === 0) {
                showError("Please enter a Registration Number.");
                input.focus();
                return;
            }

            /* 3. Accept only valid characters (digits) and length */
            if (!/^[0-9]+$/.test(reg)) {
                showError("Registration Number must contain only numbers.");
                input.focus();
                return;
            }

            if (reg.length !== 12) {
                showError("Registration Number must be exactly 12 digits.");
                input.focus();
                return;
            }

            /* 4. Forward to the result page - the image filename equals the number */
            window.location.href = "result.html?reg=" + encodeURIComponent(reg);
        });

        /* Hide the error again whenever the user types */
        $("#reg").on("input", function () {
            $("#formError").css("display", "none");
        });
    });
})(jQuery);