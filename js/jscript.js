    $(document).ready(function () {

        //    GLOBAL VARIABLES
        //    ---------------------

        var mainImgRadioToggle = 'image';
        var mainTextRadioToggle = 'image';

        var mainBGColor = 'blue';
        var mainImageType = 'image';

        var mainTextValue = 'Beach';
        var mainTextX = 400;
        var mainTextY = 700;
        var mainTextFS = '400px';
        var mainTextFontFam = 'arial';
        var mainTextWeight = 'bold';
        var mainTextOutlineColor = 'black';
        var mainTextOutlineThk = 5;
        var mainTextType = 'image';

        var secTextValue = 'Welcome to';
        var secTextX = 150;
        var secTextY = 200;
        var secTextFS = '100px';
        var secTextFontFam = 'arial';
        var secTextWeight = 'bold';
        var secTextColor = 'white';
        var secTextOutlineColor = 'black';
        var secTextOutlineThk = 5;
        var secTextType = 'color';

        var mainImageFilename;

        var mainImage = new Image();
        var mainTextImage = new Image();
        var secTextImage = new Image();
        var overlayImage = new Image();
        var borderImage = new Image();

        mainImage.src = 'img/background.jpg';
        mainTextImage.src = 'img/foreground.jpg';
        mainTextImage.src = 'img/foreground.jpg';
        overlayImage.src = 'img/white-linen.png';
        borderImage.src = 'img/worn.png';

        var canvasWidth = 1800;
        var canvasHeight = 1080;

        //    CANVAS
        //    ---------------------
        //    Draws layers to canvas

        //    https://tympanus.net/codrops/2013/12/02/techniques-for-creating-textured-text/
        //   https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Drawing_DOM_objects_into_a_canvas

        var canvas = $('#canvas');
        var ctx = canvas[0].getContext('2d');
        var mainTextFont = mainTextWeight + ' ' + mainTextFS + ' ' + mainTextFontFam;
        var secTextFont = secTextWeight + ' ' + secTextFS + ' ' + secTextFontFam;
        var mainTextColor = 'red';

        function drawText(text, x, y, font, color, outlineColor, outlineThk, type, image) {

            ctx.font = font;
            ctx.lineWidth = outlineThk;
            ctx.strokeStyle = outlineColor;
            if (type == 'image') {
                ctx.fillStyle = ctx.createPattern(image, 'repeat');
            } else {
                ctx.fillStyle = color;
            }
            ctx.textAlign = 'left';
            ctx.fillText(text, x, y);
            ctx.strokeText(text, x, y);
        }

        function drawImage() {

            //    Background Image
            if (mainImageType == 'image') {
                ctx.drawImage(mainImage, 0, 0, 1800, 1080);
            } else {
                ctx.fillStyle = mainBGColor;
                ctx.fillRect(0, 0, 1800, 1080);
            }

            //    Main Text
            drawText(mainTextValue, mainTextX, mainTextY, mainTextFont, mainTextColor, mainTextOutlineColor, mainTextOutlineThk, mainTextType, mainTextImage);

            //    Secondary Text
            drawText(secTextValue, secTextX, secTextY, secTextFont, secTextColor, secTextOutlineColor, secTextOutlineThk, secTextType, secTextImage);

            //    Overlay Image
            ctx.drawImage(overlayImage, 0, 0, 1800, 1080);

            //    BorderImage
            ctx.drawImage(borderImage, 0, 0, 1800, 1080);

        }

        drawImage();


        //  HANDLER FUNCTIONS
        //  ----------------------------------
        //  Checks controls for changes

        //    MAIN BACKGROUND COLOR
        // Get main background color value from color picker

        $('#mainImgColor').change(function () {
            mainBGColor = '#' + this.value;
            drawImage();
        });

        //    MAIN BACKGROUND TOGGLE
        //    Controls the radio button choice between a background image and solid color

        $('input[type=radio][name=mainImgRadio]').change(function () {
            if (this.value == 'image') {
                mainImageType = 'image';
            } else if (this.value == 'color') {
                mainImageType = 'color';
            }
            drawImage();
        });

        //    MAIN TEXT BACKGROUND TOGGLE
        //    Controls the radio button choice between a background image and solid color

        $('input[type=radio][name=mainTextRadio]').change(function () {
            if (this.value == 'image') {
                mainTextType = 'image';
            } else if (this.value == 'color') {
                mainTextType = 'color';
            }
            drawImage();
        });

        //    MAIN BACKGROUND FILE
        //    Changes the main background image after choosing a local file
        $('#mainImgFilename').change(function (e) {
            // Check for the various File API support.
            if (window.File && window.FileReader && window.FileList && window.Blob) {
                // Great success! All the File APIs are supported.
            } else {
                alert('The File APIs are not fully supported in this browser.');
            }

            var file = e.target.files[0];
            var reader = new FileReader();
            var result;
            reader.readAsDataURL(file);
            reader.onloadend = function (e) {
                mainImage.src = e.target.result;
            }

            drawImage();
        });

        //    MAIN TEXT BACKGROUND FILE
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

        //    BORDER FILE
        //    Changes the border file
        $('#borderSelect').change(function () {
            borderImage.src = 'img/' + this.value + '.png';
            drawImage();
        });

        //  TEXT APPEARANCE
        //  ----------------------

        $('#mainFont').change(function () {
            mainTextFontFam = this.value;
            mainTextFont = mainTextWeight + ' ' + mainTextFS + ' ' + mainTextFontFam;
            drawImage();
        });

        $('#mainTextColor').change(function () {
            mainTextColor = '#' + this.value;
            drawImage();
        });

        $('#mainOutlineColor').change(function () {
            mainTextOutlineColor = '#' + this.value;
            drawImage();
        });

        $('#secFont').change(function () {
            secTextFontFam = this.value;
            secTextFont = secTextWeight + ' ' + secTextFS + ' ' + secTextFontFam;
            drawImage();
        });

        $('#secOutlineColor').change(function () {
            secTextOutlineColor = '#' + this.value;
            drawImage();
        });

        var secInteriorColor = '#FFFFFF';
        $('#secInteriorColor').change(function () {
            secTextColor = '#' + this.value;
            drawImage();
        });

        var secShadowColor = '#FFFFFF';
        $('#secShadowColor').change(function () {
            secShadowColor = '6px 6px #' + this.value;
            drawImage();
        });

        //  TEXT VALUES
        //  ------------------------
        //  Updates the image text when the "Update" button is clicked

        $('#update').click(function () {
            mainTextValue = $('#mainTextInput').val();
            secTextValue = $('#secTextInput').val();
            drawImage();
        });

        //  SLIDERS
        //  --------------------------
        //  Updates the text appearance based on slider changes 

        //  Main Text - Horizontal
        $('#MHPSlider').change(function () {
            mainTextX = $('#MHPSlider').val();
            drawImage();
        });

        //  Main Text - Vertical
        $('#MVPSlider').change(function () {
            mainTextY = $('#MVPSlider').val();
            drawImage();
        });

        //  Main Text - Font Size
        $('#MFSSlider').change(function () {
            mainTextFS = $('#MFSSlider').val() + 'px';
            mainTextFont = mainTextWeight + ' ' + mainTextFS + ' ' + mainTextFontFam;
            drawImage();
        });

        //  Secondary Text - Horizontal
        $('#SHPSlider').change(function () {
            secTextX = $('#SHPSlider').val();
            drawImage();
        });

        //  Secondary Text - Vertical
        $('#SVPSlider').change(function () {
            secTextY = $('#SVPSlider').val();
            drawImage();
        });

        //  Secondary Text - Font Size
        $('#SFSSlider').change(function () {
            secTextFS = $('#SFSSlider').val() + 'px';
            secTextFont = secTextWeight + ' ' + secTextFS + ' ' + secTextFontFam;
            drawImage();
        });

        $('#btn-download').click(function (e) {
            downloadCanvas();
        });

    }); // end of document.ready

    function dataURLtoBlob(dataurl) {
        var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], {
            type: mime
        });
    }

    var downloadCanvas = function () {
        var cvs = document.getElementById('canvas');
        var button = document.getElementById('btn-download');
        var imgData = cvs.toDataURL({
            format: 'png',
            multiplier: 4
        });
        var strDataURI = imgData.substr(22, imgData.length);
        var blob = dataURLtoBlob(imgData);
        var objurl = URL.createObjectURL(blob);

        button.href = objurl;
    }
