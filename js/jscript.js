$(document).ready(function () {

    var mainImgRadioToggle = 'image';
    var mainTextRadioToggle = 'image';

    //    BACKGROUND
    //    ---------------------

    //    MAIN BACKGROUND COLOR
    // Get main background color value from color picker

    var mainBGColor = '#FFFFFF';
    $('#mainImgColor').change(function () {
        mainBGColor = '#' + this.value;
        if (mainImgRadioToggle == 'color') {
            $('#mainColor').css('background-color', mainBGColor);
        }
    });

    //    CHECK RADIO BUTTON STATUS
    //    Controls the radio button choice between a background image and solid color

    $('input[type=radio][name=mainImgRadio]').change(function () {
        if (this.value == 'image') {
            mainImgRadioToggle = 'image';

        } else if (this.value == 'color') {
            mainImgRadioToggle = 'color';
        }
    });

    //    Change solid color opacity based on radio click
    $('#RadioMC').click(function () {
        $('#mainColor').css('background-color', mainBGColor);
        $('#mainColor').css('opacity', '1');
    });

    $('#RadioMI').click(function () {
        $('#mainColor').css('opacity', '0');

    });

    //    Changes the main background image after choosing a local file
    $('#mainImgFilename').change(function () {
        if (mainImgRadioToggle == 'image') {
            if (this.files && this.files[0]) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    $('#mainImg').attr('src', e.target.result);
                    $('#workspace.color').css('opacity', '1');

                }
                reader.readAsDataURL(this.files[0]);
            }
        }
    });

    //  TEXT APPEARANCE
    //  ----------------------

    var mainTextColor = '#FFFFFF';
    $('#mainTextColor').change(function () {
        mainTextColor = '#' + this.value;
        if (mainTextRadioToggle == 'color') {
            $('#mainText').css('-webkit-text-fill-color', mainTextColor);
        }
    });

    var outlineColor = '#FFFFFF';
    $('#outlineColor').change(function () {
        outlineColor = '#' + this.value;
        $('#mainText').css('-webkit-text-stroke-color', outlineColor);
    });


    //    CHECK RADIO BUTTON STATUS
    //    Controls the radio button choice between a background image and solid color

    $('input[type=radio][name=mainTextRadio]').change(function () {
        if (this.value == 'image') {
            mainTextRadioToggle = 'image';

        } else if (this.value == 'color') {
            mainTextRadioToggle = 'color';
        }
    });


    //    Change solid color opacity based on radio click
    $('#RadioTC').click(function () {
        $('#mainText').css('-webkit-text-fill-color', mainTextColor);

    });

    $('#RadioTI').click(function () {
        $('#mainText').css('-webkit-text-fill-color', 'transparent');
    });


    //    Changes the main text background image after choosing a local file
    $('#mainTextFilename').change(function () {
        if (mainTextRadioToggle == 'image') {
            var file = document.getElementById('mainTextFilename').files[0];
            var reader = new FileReader();
            mainTextImgPath = "url(" + reader.result + ")";
            reader.onloadend = function () {
                document.getElementById('mainText').style.backgroundImage = "url(" + reader.result + ")";
            }
            if (file) {
                reader.readAsDataURL(file);
            } else {}
        }
    });

    //  TEXT VALUES
    //  ------------------------
    //    Updates the image text when the "Update" button is clicked
    $('#update').click(function () {
        var mainTextValue = $('#mainTextInput').val();
        var secTextValue = $('#secTextInput').val();

        $('#mainText').html(mainTextValue);
        $('#secText').html(secTextValue);
    });

    //  IMAGE EXPORT
    //  -----------------------------
    //    It would appear that there isn't a simple JS way to export the rendered canvas to an image file while preserving all of the image features (e.g. text clipping). For this implementation, printing to PDF seems to be the best way to preserve the rendered image.

    $('#export').click(function () {
        var mode = 'iframe'; //popup
        var close = mode == "popup";
        var options = {
            mode: mode,
            popClose: close
        };
        $("div.printArea").printArea(options);
    });

}); // end of document.ready


function updateMHPS(val) {
    document.getElementById('MHPSlider').innerHTML = val;
    document.getElementById('mainText').style.left = val + '%';
}

function updateMVPS(val) {
    document.getElementById('MVPSlider').innerHTML = val;
    document.getElementById('mainText').style.top = val + '%';
}

function updateMFSS(val) {
    document.getElementById('MFSSlider').innerHTML = val;
    document.getElementById('mainText').style.fontSize = val + 'px';
}

function updateSHPS(val) {
    document.getElementById('SHPSlider').innerHTML = val;
    document.getElementById('secText').style.left = val + '%';
}

function updateSVPS(val) {
    document.getElementById('SVPSlider').innerHTML = val;
    document.getElementById('secText').style.top = val + '%';
}

function updateSFSS(val) {
    document.getElementById('SFSSlider').innerHTML = val;
    document.getElementById('secText').style.fontSize = val + 'px';
}
