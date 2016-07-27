/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).ready(function () {
    //add dropdown class to the drop down li
    window.current_window_size = $(window).width();
    function dropdown_class_hover() {
        var select = $(".drop_down_hover");
        var icon = "<i class='fa fa-caret-down' aria-hidden='true'></i>";
        select.parent().addClass("has_dropdown hover_effect");
        $(".hover_effect>a").append(icon);
    }
    function dropdown_class_click() {
        var select = $(".drop_down_click");
        var icon = "<i class='fa fa-caret-down' aria-hidden='true'></i>";
        select.parent().addClass("has_dropdown click_effect");
        $(".click_effect>a").append(icon);
    }
    dropdown_class_hover();
    dropdown_class_click();
    $(".has_dropdown.hover_effect").hover(function () {
        if (window.current_window_size > 1025)
        {
            $(this).find(".drop_down_hover").stop().fadeIn();
        }
    },
            function () {
                if (window.current_window_size > 1025) {
                    $(this).find(".drop_down_hover").stop().fadeOut();
                }
            });
    $(document).on('click', ".has_dropdown.click_effect", function () {
        $(this).find(".drop_down_click").toggle();
    });
    //create close button
    function nav_close() {
        var icon = "<i class='fa fa-bars' aria-hidden='true'></i>";
        $(".menu_wrapper .brand_name").after("<div class='close_btn'></div>");
        $(".menu_wrapper .close_btn").append(icon);

    }
    nav_close();

    $(".menu_wrapper .close_btn").click(function () {
        $(".menu_wrapper .main_menu").slideToggle();
    });
    $(".hover_effect").attr("data-hover", "true");

    //disable hover in touch screen
    function disable_hover() {

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
    }
    disable_hover();
    
    //dropdowns
    $(".simple-drop_down").attr("data-effect","click");
    $(".simple_drop_down.style_hover").attr("data-effect","hover");
//window resize functions
    $(window).resize(function () {
        window.current_window_size = $(window).width();
        disable_hover();
    });
});