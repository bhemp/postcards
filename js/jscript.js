$(document).ready(function () {

    var mainImgRadioToggle = 'image';
    var mainTextRadioToggle = 'image';

    //    IMAGES
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

    //    Changes the border file
    var borderName = 'plain'
    $('#borderSelect').change(function () {
        borderName = 'img/' + this.value + '.png';
        $('#border').attr('src', borderName);
    });

    //  TEXT APPEARANCE
    //  ----------------------

    var mainTextFont = 'arial';
    $('#mainFont').change(function () {
        mainTextFont = this.value;
        $('#mainText').css('font-family', mainTextFont);
    });

    var mainTextColor = '#FFFFFF';
    $('#mainTextColor').change(function () {
        mainTextColor = '#' + this.value;
        if (mainTextRadioToggle == 'color') {
            $('#mainText').css('-webkit-text-fill-color', mainTextColor);
        }
    });

    var mainOutlineColor = '#FFFFFF';
    $('#mainOutlineColor').change(function () {
        mainOutlineColor = '#' + this.value;
        $('#mainText').css('-webkit-text-stroke-color', mainOutlineColor);
    });

    var secTextFont = 'arial';
    $('#secFont').change(function () {
        secTextFont = this.value;
        $('#secText').css('font-family', secTextFont);
    });

    var secOutlineColor = '#FFFFFF';
    $('#secOutlineColor').change(function () {
        secOutlineColor = '#' + this.value;
        $('#secText').css('-webkit-text-stroke-color', secOutlineColor);
    });

    var secInteriorColor = '#FFFFFF';
    $('#secInteriorColor').change(function () {
        secInteriorColor = '#' + this.value;
        $('#secText').css('color', secInteriorColor);
    });

    var secShadowColor = '#FFFFFF';
    $('#secShadowColor').change(function () {
        secShadowColor = '6px 6px #' + this.value;
        $('#secText').css('text-shadow', secShadowColor);
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

    $('#btn-download').click(function (e) {
        var canvas = document.getElementById("exportArea"),
            ctx = canvas.getContext('2d'),
            mainImage = document.getElementById('mainImg'),
            mainColor = document.getElementById('mainColor'),
            mainText = document.getElementById('mainText'),
            secText = document.getElementById('secText'),
            overlay = document.getElementById('overlay'),
            border = document.getElementById('border');

        //        need to incorporate this method:
        //        https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Drawing_DOM_objects_into_a_canvas
        var data = '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">' +
            '<foreignObject width="100%" height="100%">' +
            '<div xmlns="http://www.w3.org/1999/xhtml" style="font-size:40px">' +
            '<em>I</em> like ' +
            '<span style="color:white; text-shadow:0 0 2px blue;">' +
            'cheese</span>' +
            '</div>' +
            '</foreignObject>' +
            '</svg>';

        var DOMURL = window.URL || window.webkitURL || window;

        var img = new Image();
        var svg = new Blob([data], {
            type: 'image/svg+xml'
        });
        var url = DOMURL.createObjectURL(svg);

        img.onload = function () {
            ctx.drawImage(img, 0, 0);
            DOMURL.revokeObjectURL(url);
        }

        img.src = url;

        //        ctx.Font("120px Arial");

        ctx.drawImage(mainImage, 0, 0);
        //        ctx.fillStyle(mainColor, 0, 0);
        //        ctx.fillText('BEACH', 0, 0);
        //        ctx.fillText(secText, 0, 0);
        ctx.drawImage(overlay, 0, 0);
        ctx.drawImage(border, 0, 0);
        ctx.drawImage(img, 0, 0);


        var dataURL = canvas.to('image/png');
        document.getElementById('btn-download').href = dataURL;

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
