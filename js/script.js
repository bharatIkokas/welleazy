/*=============WINDOW LOAD FUNCTIONS===================*/
$(window).on('load', function () {
    /*==========Header Fixed=========*/
    function shadowHeader() {
        var hh = $('.site_header').outerHeight();
        var sc = $(window).scrollTop();
        if (sc >= 30) {
            $('.site_header ').addClass('fixed_active');
        } else if (sc <= 30) {
            $('.site_header ').removeClass('fixed_active');
        }
    }
    $(window).scroll(function () {
        //if ($(window).width() > 1199) {
        shadowHeader();
        //}
    });
    shadowHeader();
    //===============Side bar Subnav=================
    $('li.has_subnav').on('click', function () {
        $('.sub_nav').slideUp();
        var xnav = $(this).find('.sub_nav');
        if (xnav.css('display') == 'none') {
            xnav.slideDown();
        } else {
            xnav.slideUp("slow", function () {
                xnav.removeClass('default_open');
            });
        }
    });
    //    =============Profile Pic Upload================
    $('#upload_prof_img').change(function () {

        var curElement = $('.prf_main_img');
        console.log(curElement);
        var reader = new FileReader();

        reader.onload = function (e) {
            // get loaded data and render thumbnail.
            curElement.attr('src', e.target.result);
        };

        // read the image file as a data URL.
        reader.readAsDataURL(this.files[0]);
        //----------------- 
        $('.cs_bn_upload_wrapper').removeClass('active')

    });
    //==========Drop Down Search===========
    $('.drp_input').on('keyup', function () {
        if ($(this).val() == 0) {
            $(this).parents('.drp_warpper').find('.dropdown_user').removeClass('active');

        } else {
            $(this).parents('.drp_warpper').find('.dropdown_user').addClass('active');
        }
    });
    $('.drp_warpper .dropdown_user li').on('click', function () {
        var xval = $(this).text();
        $(this).parents('.drp_warpper').find('.drp_input').val(xval);
        $(this).parents('.drp_warpper').find('.dropdown_user').removeClass('active');
    });
    //===========Upload File Name to Label=============
    // Input File Type.

    var inputs = document.querySelectorAll('.file_input')
    var jinputs = $('.file_input');

    for (var i = 0, len = inputs.length; i < len; i++) {
        customInput(inputs[i])
    }

    function customInput(el) {
        const fileInput = el.querySelector('[type="file"]')
        const label = el.querySelector('[data-js-label]')

        fileInput.onchange =
            fileInput.onmouseout = function () {
                if (!fileInput.value) return

                var value = fileInput.value.replace(/^.*[\\\/]/, '')
                el.className += ' -chosen'
                label.innerText = value;
                $(this).siblings('.uploaded_file_name_wrap').removeClass('d-none');
//                jinputs.find('.uploaded_file_name_wrap').removeClass('d-none');
            }
    }
    $('.unselectFile').on('click', function () {
        $(this).parents('.file_input').find('input').val('');
        $(this).parents('.uploaded_file_name_wrap').addClass('d-none');

    });
    //===========Upload File Name to Label=============

    /*===========Equal Height js============*/
    $.fn.equalHeights = function () {
        var max_height = 0;
        $(this).each(function () {
            max_height = Math.max($(this).height(), max_height);
        });
        $(this).each(function () {
            $(this).height(max_height);
        });
    };
    if ($(window).width() > 767) {
        $('.why_us_block ').equalHeights();
    }
    //    ==========arrow_up Sidebar==============
    $('#cs_sidebar .arrow_up').on('click', function () {
        $(this).toggleClass('active');
        if ($('.navmenu_nav').length) {
            $('#cs_sidebar .navmenu_nav ').slideToggle();
        }
    });
    // ===========Our service Page slider===============
    $('.serv_slider').slick({
        dots: true,
        infinite: false,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 3,
        arrows: false,
        responsive: [

            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
                },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
                }

              ]
    });
    // ===========Our service Page slider End===============
    // ===========location_slider slider===============
    $('.location_slider').slick({
        dots: false,
        infinite: false,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 2,
        arrows: true,
        responsive: [

            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
                },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
                }

              ]
    });
    // ===========Our service Page slider End===============
    // ===========footer button hide on scroll===============
    /*==========Scroll To Top==========*/
    function scrollTop() {

        if ($(window).scrollTop() > $(document).height() - ($(window).height() + 400)) {
            $(".f_fixed_link").fadeIn();

        } else {
            $(".f_fixed_link").fadeOut();
        }
    }
    $(window).on('scroll', function () {
        scrollTop();
    });
    scrollTop();
    // ===========footer button hide on scroll===============

    // ========Date Range Picker=======
    $('.start-date').datepicker({
        templates: {
            leftArrow: '<i class="fa fa-chevron-left"></i>',
            rightArrow: '<i class="fa fa-chevron-right"></i>'
        },
        format: "dd/mm/yyyy",
        startDate: new Date(),
        keyboardNavigation: false,
        autoclose: true,
        todayHighlight: true,
        disableTouchKeyboard: true,
        orientation: "bottom auto"
    });

    $('.end-date').datepicker({
        templates: {
            leftArrow: '<i class="fa fa-chevron-left"></i>',
            rightArrow: '<i class="fa fa-chevron-right"></i>'
        },
        format: "dd/mm/yyyy",
        startDate: moment().add(1, 'days').toDate(),
        keyboardNavigation: false,
        autoclose: true,
        todayHighlight: true,
        disableTouchKeyboard: true,
        orientation: "bottom auto"

    });


    $('.start-date').datepicker().on("changeDate", function () {
        var startDate = $('.start-date').datepicker('getDate');
        var oneDayFromStartDate = moment(startDate).add(1, 'days').toDate();
        $('.end-date').datepicker('setStartDate', oneDayFromStartDate);
        $('.end-date').datepicker('setDate', oneDayFromStartDate);
    });

    $('.end-date').datepicker().on("show", function () {
        var startDate = $('.start-date').datepicker('getDate');
        $('.day.disabled').filter(function (index) {
            return $(this).text() === moment(startDate).format('D');
        }).addClass('active');
    });
    // ========Date Range Picker End=======
    // =======Back to last Page===========
    $('.prev_page_btn').on('click', function () {
        window.history.go(-1);
    });

});


/*===============================================================*/

//Login using password
$('.view-using-otp').click(function () {
    $('.login-main').hide();
    $('.login-using-password').show();
  });

  $('.view-using-password').click(function () {
    $('.login-main').show();
    $('.login-using-password').hide();
  });

  $('.view-signup-form').click(function () {
    $('.login-main').hide();
    $('.login-using-password').hide();
    $('.sign-up-now').show();
  });

  $('.view-signin-form').click(function () {
    $('.login-main').show();
    $('.login-using-password').hide();
    $('.sign-up-now').hide();
  });

// Dependant page check functionlity 
var checkbox = document.getElementById('willing_1');
var chkFtaher = document.getElementById('checkmark_father');
function checkNo() {
    checkbox.checked = true;
    chkFtaher.style.display='block';
}

function checkYes() {
    checkbox.checked = false;
    chkFtaher.style.display='none';
}

// Resend Timer
var mins;
var secs;
var interval;

$(document).ready(function() {
  $("#rensend_1").click(function() {
    $('#timer').hide();
    mins = 1;
    secs = 0;
    var btn = $(this);
    btn.attr("disabled", true);
    interval = setInterval(function() {
      if (mins >= 0 && secs >= 0) {
        btn.text(" " + pad(mins, 2) + ":" + pad(secs, 2));
        if (secs > 0) {
          secs--;
        } else {
          secs = 59;
          mins--;
        }
        if (mins < 0)
        {
          clearInterval(interval);
          btn.removeAttr("disabled").text("Resend");
          return true;
        }
      }
      console.log("Mins: " + mins + ", Secs: " + secs);
    }, 1000);
  });
  $("#rensend_2").click(function() {
    mins = 1;
    secs = 0;
    var btn = $(this);
    btn.attr("disabled", true);
    interval = setInterval(function() {
      if (mins >= 0 && secs >= 0) {
        btn.text("Resend Code in " + pad(mins, 2) + ":" + pad(secs, 2));
        if (secs > 0) {
          secs--;
        } else {
          secs = 59;
          mins--;
        }
        if (mins < 0)
        {
          clearInterval(interval);
          btn.removeAttr("disabled").text("Resend");
          return true;
        }
      }
      console.log("Mins: " + mins + ", Secs: " + secs);
    }, 1000);
  });
});

function pad(num, size) {
    var s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
  }


// Custom Select
var x, i, j, l, ll, selElmnt, a, b, c;
/*look for any elements with the class "custom-select":*/
x = document.getElementsByClassName("custom-select");
l = x.length;
for (i = 0; i < l; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  ll = selElmnt.length;
  /*for each element, create a new DIV that will act as the selected item:*/
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  /*for each element, create a new DIV that will contain the option list:*/
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 1; j < ll; j++) {
    /*for each option in the original select element,
    create a new DIV that will act as an option item:*/
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function(e) {
        /*when an item is clicked, update the original select box,
        and the selected item:*/
        var y, i, k, s, h, sl, yl;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        sl = s.length;
        h = this.parentNode.previousSibling;
        for (i = 0; i < sl; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            yl = y.length;
            for (k = 0; k < yl; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function(e) {
      /*when the select box is clicked, close any other select boxes,
      and open/close the current select box:*/
      e.stopPropagation();
      closeAllSelect(this);
      this.nextSibling.classList.toggle("select-hide");
      this.classList.toggle("select-arrow-active");
    });
}
function closeAllSelect(elmnt) {
  /*a function that will close all select boxes in the document,
  except the current select box:*/
  var x, y, i, xl, yl, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  xl = x.length;
  yl = y.length;
  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}
/*if the user clicks anywhere outside the select box,
then close all select boxes:*/
document.addEventListener("click", closeAllSelect);


// Cart plus minus
$('.minus').click(function () {
  var $input = $(this).parent().find('input');
  var count = parseInt($input.val()) - 1;
  count = count < 1 ? 1 : count;
  $input.val(count);
  $input.change();
  return false;
});
$('.plus').click(function () {
  var $input = $(this).parent().find('input');
  $input.val(parseInt($input.val()) + 1);
  $input.change();
  return false;
});


// Cart Block
$('.cart-link').click(function () {
  $('.cart-block').toggle();
  $('.wallet').hide();
  $('.dropdown-cnt').hide();
});

$('.w-link').click(function () {
  $('.wallet').toggle();
  $('.wallet').toggleClass('opened');
  $('.cart-block').hide();
  $('.dropdown-cnt').hide();
});

// Dropdown Block
$('.drop-down-link').click(function () {
  $(this).find('.dropdown-cnt').toggle();
  $(this).find('.dropdown-cnt').toggleClass('opened');
  $('.cart-block').hide();
  $('.wallet').hide();
});

// Wallet
$('.waalet-showable-item').click(function () {
  $(this).next('.waalet-cnt').toggle();
});

$('.s-confirm').click(function () {
  $('.s-confirm-block').show();
  $('.scanner-block').hide();
});

$('.s-otp').click(function () {
  $('.s-otp-block').show();
  $('.s-confirm-block').hide();
  $('.scanner-block').hide();
});

// Cart page redirect
function pageRedirect() {
  window.location.replace("DLT-non-sponsored-cart.html");
} 

function pageRedirectDltSponsored() {
  window.location.replace("DLT-sponsored-cart.html");
}

function pageRedirectAhpNonSponsored() {
  window.location.replace("AHP-non-sponsored-cart.html");
}

function pageRedirectAhpSponsored() {
  window.location.replace("AHP-sponsored-cart.html");
}


// Side Menu On Mobile
$('.menu-icon').click(function () {
  $('.cs_sidenav').toggle();
});


//Shedule Time
$('#shedule_appoitment').click(function() {
  $('.before-shedule').addClass('d-none');
  $('.after-shedule').show();
});


//OTP Sent
let timerOn = true;

function timer(remaining) {
  var m = Math.floor(remaining / 60);
  var s = remaining % 60;
  
  m = m < 10 ? '0' + m : m;
  s = s < 10 ? '0' + s : s;
  document.getElementById('timer').innerHTML = m + ':' + s;
  remaining -= 1;
  
  if(remaining >= 0 && timerOn) {
    setTimeout(function() {
        timer(remaining);
    }, 1000);
    return;
  }

  if(!timerOn) {
    // Do validate stuff here
    return;
  }
  
  // Do timeout stuff here
  // alert('Timeout for otp');
  // document.getElementById('timer').innerHTML = 'Resend'
  $('#rensend_1').show();
  $('#timer').hide();
}

timer(60);


$('input[name=cor_email]').keyup(function(){
  var isValid = $(this).is(':valid') && validateEmail($(this).val());

  if (isValid){
   $('#otp_sent_cnt').show();
   $("#timer").show();
   setTimeout(function() {
          $('#otp_sent_cnt').hide();
        }, 3000);
  }
  else{
   $('#otp_sent_cnt').hide();
   $("#timer").hide();
  }
});

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

//OTP
let digitValidate = function(ele){
  console.log(ele.value);
  ele.value = ele.value.replace(/[^0-9]/g,'');
}

let tabChange = function(val){
    let ele = document.querySelectorAll('input');
    if(ele[val-1].value != ''){
      ele[val].focus()
    }else if(ele[val-1].value == ''){
      ele[val-2].focus()
    }   
 }