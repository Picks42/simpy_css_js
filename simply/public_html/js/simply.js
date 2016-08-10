/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).ready(function () {
    window.current_window_size = $(window).width();

    function dropdown_class_hover() {    //add dropdown class to the drop down li
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
    function comman_arrow()
    {
        var icon = "<i class='fa fa-caret-down' aria-hidden='true'></i>";
        $(".has_dropdown .header").append(icon);
    }
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
    //create close button
    function nav_close() {
        var icon = "<i class='fa fa-bars' aria-hidden='true'></i>";
        $(".menu_wrapper .brand_name").after("<div class='close_btn'></div>");
        $(".menu_wrapper .close_btn").append(icon);
    }
    nav_close();

    function mobile_nav_drawer() {
        $("body").prepend("<div class='mobile_drawer'></div>");
        $(".menu_wrapper .main_ul").clone().appendTo(".mobile_drawer");
        $(".mobile_drawer").prepend("<div class='drawer_close'>&times;</div>");
        $(".mobile_drawer .main_ul").addClass("mobile_menu");
        $(".mobile_drawer .hover_effect").addClass("click_effect").removeClass("hover_effect");
        $(".mobile_drawer .drop_down_hover").addClass("drop_down_click").removeClass("drop_down_hover");

    }
    mobile_nav_drawer();

    function  mobile_drawer_action() {
        $(".mainContent").toggleClass("deactive");
        $(".mobile_drawer").toggleClass("active");
        $("body").toggleClass("overflow_hidden");
        $("html").toggleClass("overflow_hidden");
        $("nav").toggleClass("nav_fixed");
        
    }
    $(document).on('click', ".menu_wrapper .close_btn", function () {//mobile menu toggle
        mobile_drawer_action();
    });
        $(document).on('click',".mobile_drawer .drawer_close", function () {//mobile menu toggle
        mobile_drawer_action();
    });
    $(document).on('click','.mainContent.deactive',function (){
        mobile_drawer_action();
    });
    $(".hover_effect").attr("data-hover", "true");

    function navbar_change() {//when items are more than parent space, it's turn into mobile menu view
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
        }
        else{
            $(".close_btn").hide();
            $(".menu_wrapper .main_ul").removeClass("hide_menu");
            $(".menu_wrapper").removeClass("mobile_version");$(".main_menu")
        }
    }
    navbar_change();

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

    //panel dropdown
    $(document).on('click', ".panel.collapse .header", function () {
        var main_parent = $(this).parent().parent();
        var check_accordion = main_parent.hasClass('accordions');
        var body = $(this).next(".body");
        var footer = $(this).next().next(".footer");
        if (check_accordion) {
            main_parent.find(".panel.collapse .body").not(body).slideUp();
            main_parent.find(".panel.collapse .footer").not(footer).slideUp();
            panel_collpase(this, body, footer);
        } else {
            panel_collpase(this, body, footer);
        }
    });
    function  panel_collpase(select, target_body, target_footer) {
        target_body.slideToggle("fast");
        target_footer.stop().slideToggle("fast");
    }

    $(document).on('click', ".simply-card .button", function () {
        var obj = $(this).attr("data-target");
        $(this).closest(".simply-card").find('.content').removeClass("active");
        $(this).closest(".simply-card").find(obj).addClass("active");
    });
    $(document).on('click', ".simply-card .content .close", function () {
        $(this).parent().removeClass("active");
    });
    $(document).on('click', "[data-collapse]", function () {
        var parent = $(this).parent();
        var parent_class = parent.hasClass('accordions');
        var element = $(this).next();
        if (parent_class) {
            parent.find(".collapse").not(element).slideUp();
            collapse_action(this);
        } else {
            collapse_action(this);
        }
    });
    function collapse_action(select) {
        var target = $(select).attr("data-collapse");
        $(target).stop().slideToggle();
    }
//window resize functions
    $(window).resize(function () {
        window.current_window_size = $(window).width();
        disable_hover();
        navbar_change();
    });
});