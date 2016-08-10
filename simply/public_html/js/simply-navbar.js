/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function () {
    current_window_width();

    dropdown_class_hover();
    dropdown_class_click();
    comman_arrow();

    $(document).on('mouseenter', ".has_dropdown.hover_effect", function () {
        if (window.current_window_size > 1025)
        {
            $(this).find(".drop_down_hover").stop().show();
        }
    });

    $(document).on('mouseleave', ".has_dropdown.hover_effect", function () {
        if (window.current_window_size > 1025)
        {
            $(this).find(".drop_down_hover").hide();
        }
    });

    $(document).on('click', ".has_dropdown.click_effect", function () {
        $(this).find(".drop_down_click").toggle();
    });

    mobile_nav_button();
    mobile_nav_drawer();
    if ($(".nav_fixed").length === 0)//if navbar is fixed then no body transformation effects
    {
        $(".mainContent").addClass("transfrom");
    }

    $(document).on('click', ".menu_wrapper .close_btn", function () {//mobile menu toggle
        mobile_drawer_action();
    });
    $(document).on('click', ".mobile_drawer .drawer_close", function () {//mobile menu toggle
        mobile_drawer_action();
    });
    $(document).on('click', '.mainContent.deactive', function () {
        mobile_drawer_action();
    });
    $(".hover_effect").attr("data-hover", "true");

    navbar_change();
    disable_hover();

    $(window).resize(function () {
        current_window_width();
        disable_hover();
        navbar_change();
    });
});

window.current_window_width = function () {
    window.current_window_size = $(window).width();

};
window.dropdown_class_hover = function () {
    var select = $(".drop_down_hover");
    var icon = "<i class='fa fa-caret-down' aria-hidden='true'></i>";
    select.parent().addClass("has_dropdown hover_effect");
    $(".hover_effect>a").append(icon);
};
window.dropdown_class_click = function () {
    var select = $(".drop_down_click");
    var icon = "<i class='fa fa-caret-down' aria-hidden='true'></i>";
    select.parent().addClass("has_dropdown click_effect");
    $(".click_effect>a").append(icon);
};
window.comman_arrow = function ()
{
    var icon = "<i class='fa fa-caret-down' aria-hidden='true'></i>";
    $(".has_dropdown .header").append(icon);
};

//create open button for navbar 
window.mobile_nav_button = function () {
    var icon = "<i class='fa fa-bars' aria-hidden='true'></i>";
    $(".menu_wrapper .brand_name").after("<div class='close_btn'></div>");
    $(".menu_wrapper .close_btn").append(icon);
};

//create a mobile navbar
window.mobile_nav_drawer = function () {
    $("body").prepend("<div class='mobile_drawer'></div>");
    $(".menu_wrapper .main_ul").clone().appendTo(".mobile_drawer");
    $(".mobile_drawer").prepend("<div class='drawer_close'>&times;</div>");
    $(".mobile_drawer .main_ul").addClass("mobile_menu");
    $(".mobile_drawer .hover_effect").addClass("click_effect").removeClass("hover_effect");
    $(".mobile_drawer .drop_down_hover").addClass("drop_down_click").removeClass("drop_down_hover");
    if ($(".mainContent.mobile_right").length > 0) {
        $(".mobile_drawer").addClass("mobile_right");
    }
};

//mobile dreawer actions on clicks
window.mobile_drawer_action = function () {
    $(".mainContent").toggleClass("deactive");
    $(".mobile_drawer").toggleClass("active");
    $("body").toggleClass("overflow_hidden");
    $("html").toggleClass("overflow_hidden");
};

//when items are more than parent space, it's turn into mobile menu view
window.navbar_change = function () {
    var sum = 0;
    var main_menu = $(".main_menu").width();
    $(".main_menu .main_ul>li").each(function () {
        var width = $(this).width();
        sum = sum + width;
    });
    sum = parseInt(sum) + 30;
    if (main_menu < sum)
    {
        $(".close_btn").show();
        $(".menu_wrapper .main_ul").addClass("hide_menu");
        $(".menu_wrapper").addClass("mobile_version");
    } else {
        $(".close_btn").hide();
        $(".menu_wrapper .main_ul").removeClass("hide_menu");
        $(".menu_wrapper").removeClass("mobile_version");
    }
};

//disable hover in touch screen
window.disable_hover = function () {
    var select = $(".has_dropdown[data-hover='true']");
    var ul = $(".has_dropdown[data-hover='true']>ul");
    var window_width = $(window).width();
    if (window_width <= 1024) {
        select.removeClass("hover_effect").addClass("click_effect");
        ul.removeClass("drop_down_hover").addClass("drop_down_click");
    } else {
        select.addClass("hover_effect").removeClass("click_effect");
        ul.addClass("drop_down_hover").removeClass("drop_down_click");
    }
};

