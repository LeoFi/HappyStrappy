(function(){
  
  $(function() {
    
  $('.tabgroup > div').hide();
  $('.tabgroup > div:first-of-type').show();
  $('.tabs a').click(function(e){
    e.preventDefault();
      var $this = $(this),
          tabgroup = '#'+$this.parents('.tabs').data('tabgroup'),
          others = $this.closest('li').siblings().children('a'),
          target = $this.attr('href');
      others.removeClass('active');
      $this.addClass('active');
      $(tabgroup).children('div').hide();
      $(target).show();

  })
    
  $('.product-select-bundle').prepend('<option class="disabled" value="" disabled>Auswählen</option>').val('').trigger('change');
    
  checkOptions();
  $(".product-select-bundle").change(checkOptions);

  function checkOptions() {
    var choseFound = false;
    $(".product-select-bundle").each(function(index, element) {
      //alert($(element).val());
      if ( $(element).val() == null ) {
        choseFound = true;
      }
    });

    $('#wrap-submit-bundle > div').click(function () {
      //alert("click");
      if (choseFound) {
        $("input.bundle-submit").val("Wähle deine Farbe aus");
        $("input.bundle-submit").css("background-color", "black");
        
      } else {
        $("input.bundle-submit").css("background-color", "#40a7a6");
        $("input.bundle-submit").val("Hinzufügen");
        $('#wrap-submit-bundle > div').remove();
      };
    })
    
    if (choseFound) {
      $("input.bundle-submit").attr("disabled","disabled");
    } else {
      $('#wrap-submit-bundle > div').remove();
      $("input.bundle-submit").css("background-color", "#40a7a6");
      $("input.bundle-submit").val("Hinzufügen");
      $("input.bundle-submit").removeAttr("disabled");
    };
  }
    
  $( ".cart-upgrade" ).wrap( "<form class='product-form-bundle' id='product-form-bundle[]' action='/cart/add' method='post'></form>" );
    
    var slideLoaded = function() {
      $('.slideshow-loader').hide();
    }
    
    if( $('.main-slideshow-wrapper')[0] ) {
          
      $('.main-slideshow-wrapper .slide-container').owlCarousel({
        afterInit : slideLoaded,
        autoPlay: false,
        margin:0,
        navigation:true,
        dots: true,
        items:1,
        loop: true,
        stopOnHover: true,
        lazyLoad:true,
        singleItem: true,
        transitionStyle: "fade"
      });
    }
    
    if( $('.product-slideshow-wrapper')[0] ) {
      
      // We set the current slide to 0 and check and update when changing color
      // so the new color goes to that same slide number as the previous
      window.currentSlide = 0;
    
      var strappySelect = {
        initiated: false,
        active: 0,
        owlSettings: {
          afterInit : slideLoaded,
          autoPlay: true,
          margin:0,
          navigation:true,
          dots: true,
          items:1,
          loop: true,
          lazyLoad:true,
          singleItem: true,
          transitionStyle: "fade",
          afterMove: function (elem) {
            window.currentSlide = this.currentItem;
          }
        },

        init: function(firstItem) {
      this.clickFunctions();
          if (this.initiated == false) {
            this.setProduct(firstItem);
          }
          this.initiated = true;
        },
        
        convertColor: function(selected) {
      
          var color = '',
              background = '';
          
          switch(selected) {
            case "schwarz":
              color = "black";
              background = '#B0B0B0';
              break;
            case "weiß":
              color = "white";
              background = '#5d5d5d';
              break;
            case "gold":
              color = "gold";
              background = '#FBCF66';
              break;
            case "silber":
              color = "silver";
              background = '#D6717B';
              break;
            case "ganz roségold":
              color = "ganzrosegold";
              background = '#BDBDBD';
              break;
            case "ganz gold":
              color = "ganzgolden";
              background = '#BDBDBD';
              break;
            case "ganz silber":
              color = "ganzsilver";
              background = '#BDBDBD';
              break;
          }

          return [color, background];
        },

        setProduct: function(selected) {

      var colorCodes = this.convertColor(selected),
              color = colorCodes[0],
              backgroundColor = colorCodes[1],
              sliderWrapper = $('.product-slideshow-wrapper');
          
          sliderWrapper.css('background-color', backgroundColor);
          
          
          this.initSlider(color);
        },
        
        
        color: function(select) {
          var options = select.children('option'),
              selected = select.val(),
              selectedText = select.children('option:selected').text();

          $('#custom-palette').prepend('<h3>Farbe</h3>')

          options.each(function(i) {
            var option = $(this).val(),
                text = $(this).text(),
              colorCodes = strappySelect.convertColor(option),
                color = colorCodes[0];

            if (option == selected) {
              $('#custom-palette ul').append('<li class="active color-' + color + '"></li>')
            } else {
              $('#custom-palette ul').append('<li class="color-' + color + '"></li>')
            }
          })
          
          $('#custom-palette h3').append('<span class="color-text">' + selectedText + '</span>')
        },

        initSlider : function(selectedProduct) {

          var sliderClass = '.slider-' +  selectedProduct;
          $('.slider').hide();

          if ( $(sliderClass).hasClass('owl-carousel') ) {
            $(sliderClass).show();
          } else {
            $(sliderClass).owlCarousel(this.owlSettings);
          }

        },
        
        clickFunctions : function() {
          
          var paletteColors = $('.palette-items li');
          $('.strappy-black').css("display", "block");
          
          /*$('.palette-items li').hover(function() {
            var index = $(this).index();
            
            var productSelect = $('#product-select-option-0'),
                colorText = $('.color-text');
            var textValue = productSelect.children('option').eq(index).text();
            colorText.text(textValue);
          });*/
          
          paletteColors.click(function() {
            var index = $(this).index();
      var wi = $( window ).width();
            
            $('.palette-items li').removeClass('active');
            $(this).addClass('active');
            
            if ($('.palette-items li.active').hasClass('color-black')) {
              $('.strappy-black').css("display", "block");
              $('.strappy-white').css("display", "none");
              $('.strappy-gold').css("display", "none");
              $('.strappy-silver').css("display", "none");
              $('.strappy-ganzrosegold').css("display", "none");
              $('.strappy-ganzgolden').css("display", "none");
              $('.strappy-ganzsilver').css("display", "none");
            }
            else if ($('.palette-items li.active').hasClass('color-white')) {
              $('.strappy-white').css("display", "block");
              $('.strappy-black').css("display", "none");
              $('.strappy-gold').css("display", "none");
              $('.strappy-silver').css("display", "none");
              $('.strappy-ganzrosegold').css("display", "none");
              $('.strappy-ganzgolden').css("display", "none");
              $('.strappy-ganzsilver').css("display", "none");
            }
            else if ($('.palette-items li.active').hasClass('color-gold')) {
              $('.strappy-gold').css("display", "block");
              $('.strappy-black').css("display", "none");
              $('.strappy-white').css("display", "none");
              $('.strappy-silver').css("display", "none");
              $('.strappy-ganzrosegold').css("display", "none");
              $('.strappy-ganzgolden').css("display", "none");
              $('.strappy-ganzsilver').css("display", "none");
            }
            else if ($('.palette-items li.active').hasClass('color-silver')) {
              $('.strappy-silver').css("display", "block");
              $('.strappy-black').css("display", "none");
              $('.strappy-white').css("display", "none");
              $('.strappy-gold').css("display", "none");
              $('.strappy-ganzrosegold').css("display", "none");
              $('.strappy-ganzgolden').css("display", "none");
              $('.strappy-ganzsilver').css("display", "none");
            }
            else if ($('.palette-items li.active').hasClass('color-ganzrosegold')) {
              $('.strappy-ganzrosegold').css("display", "block");
              $('.strappy-white').css("display", "none");
              $('.strappy-black').css("display", "none");
              $('.strappy-gold').css("display", "none");
              $('.strappy-silver').css("display", "none");
              $('.strappy-ganzgolden').css("display", "none");
              $('.strappy-ganzsilver').css("display", "none");
            }
            else if ($('.palette-items li.active').hasClass('color-ganzgolden')) {
              $('.strappy-ganzgolden').css("display", "block");
              $('.strappy-gold').css("display", "none");
              $('.strappy-black').css("display", "none");
              $('.strappy-white').css("display", "none");
              $('.strappy-silver').css("display", "none");
              $('.strappy-ganzrosegold').css("display", "none");
              $('.strappy-ganzsilver').css("display", "none");
            }
            else if ($('.palette-items li.active').hasClass('color-ganzsilver')) {
              $('.strappy-ganzsilver').css("display", "block");
              $('.strappy-silver').css("display", "none");
              $('.strappy-black').css("display", "none");
              $('.strappy-white').css("display", "none");
              $('.strappy-gold').css("display", "none");
              $('.strappy-ganzrosegold').css("display", "none");
              $('.strappy-ganzgolden').css("display", "none");
            }
            
            if (wi < 767){
                if ($('.palette-items li.active').hasClass('color-black')) {
                    $('.template-product-slideshow .product-details-wrapper').css( "background-color", "#B0B0B0" );
                }
                else if ($('.palette-items li.active').hasClass('color-white')) {
                    $('.template-product-slideshow .product-details-wrapper').css( "background-color", "#5D5D5D" );
                }
                else if ($('.palette-items li.active').hasClass('color-gold')) {
                    $('.template-product-slideshow .product-details-wrapper').css( "background-color", "#F0CF66" );
                }
                else if ($('.palette-items li.active').hasClass('color-silver')) {
                    $('.template-product-slideshow .product-details-wrapper').css( "background-color", "#D6717B" );
                }
                else if ($('.palette-items li.active').hasClass('color-ganzrosegold')) {
                    $('.template-product-slideshow .product-details-wrapper').css( "background-color", "#BDBDBD" );
                }
                else if ($('.palette-items li.active').hasClass('color-ganzgolden')) {
                    $('.template-product-slideshow .product-details-wrapper').css( "background-color", "#BDBDBD" );
                }
                else if ($('.palette-items li.active').hasClass('color-ganzsilver')) {
                    $('.template-product-slideshow .product-details-wrapper').css( "background-color", "#BDBDBD" );
                }
            }

            var productSelect = $('#product-select-option-0'),
                colorText = $('.color-text');

            productSelect.children('option').prop('selected', false);
            productSelect.children('option').eq(index).prop('selected', true);
            productSelect.change();
            
            var textValue = productSelect.children('option').eq(index).text();
            colorText.text(textValue);
          })
        }

      }

      setTimeout(function() {
    
        // Here we need to initialise out object
        
        var productSelect = $('#product-select-option-0'),
            loadedItem = $('#product-select-option-0 option:selected').val();
    
        strappySelect.color(productSelect);
        strappySelect.init(loadedItem);  
        
        productSelect.change(function() {

          var selectedItem = $(this).val();

          strappySelect.setProduct(selectedItem);
        });


      }, 10);
  }
    
    
    // Here we have a function to increase and decrease the product input amount

    $(".quantity-button").on("click", function() {

      var $button = $(this);
      var oldValue = $button.parent().find("input").val();

      if ($button.text() == "+") {
          var newVal = parseFloat(oldValue) + 1;
        } else {
       // Don't allow decrementing below zero
        if (oldValue > 0) {
          var newVal = parseFloat(oldValue) - 1;
        } else {
          newVal = 0;
        }
      }

      $button.parent().find("input").val(newVal);

    });
    
    if ( $('#paypal-express-button')[0] ) {
      var payPalButton = $('#paypal-express-button');
      
      payPalButton.empty();
    }
    
    // Set up the accordion functionality
    
    var acc = document.getElementsByClassName("accordion");

    for (var i = 0; i < acc.length; i++) {
        acc[i].onclick = function(){
            this.classList.toggle("active");
            this.nextElementSibling.classList.toggle("show");
      }
    }
    
    // Set scroll to functionality
    
    $('.scroll-to').click(function(event) {
      event.preventDefault();
      var href = $(this).attr("href");
      
      console.log(href)
      
      jQuery('html, body').animate({
        scrollTop: $(href).offset().top
      }, 600);
      return false;
    });
    
  });
  
})();