"use strict";
            
var gift_list = [];
var selectedSlot = "";
var box = $("#item-box").remove();

$.getJSON( "http://localhost/stardew_friends/data/stardew_gifts_data.json", function( data ) {
    gift_list = data;
    populateGifts();
  });

function searchGiftList() {
    var search = $("#search-box").val();

    if(search.length > 0) {
        $("#item-list").empty();
        populateGifts(search);
    } else {
        populateGifts();
    }
}

function populateGifts( searchTerm ) {
    if(searchTerm !== undefined) {
        for(var i = 0; i < gift_list.length; i++) {
            var item = gift_list[i].text;
            item = item.toLowerCase();
            if(item.indexOf(searchTerm.toLowerCase()) >= 0) {
                $("#item-list").append("<img class='item' src='" + gift_list[i].imageSrc + "' title='" + gift_list[i].text + "'>");
            }
        }  
    } else {
        for(var i = 0; i < gift_list.length; i++) {
            $("#item-list").append("<img class='item' src='" + gift_list[i].imageSrc + "' title='" + gift_list[i].text + "'>");
        }   
    }
}

function bindEventsAndFocus() {
    $("#item-list").on('mouseover', 'img.item', function() {
        $(this).addClass("hovered");
    });

    $("#item-list").on('click', 'img.item', function() {
        $(selectedSlot).attr("src", $(this).attr("src"));
        $(this).removeClass("hovered");
        $("#item-list").empty();
        $(box).remove();
    });

    $("#item-list").on('mouseleave', 'img.item', function() {
        $(this).removeClass("hovered");
    });

    $("#item-list").on('mouseover', 'img.item', function() {
        $(this).addClass("hovered");
    });

    $("#search-box").on('change keyup paste', function() {
        searchGiftList();
    });

    $("#search-box").val("");
    $("#search-box").focus();
}

$(".gift_items").on('click', 'img', function(m) {
    selectedSlot = $(this);
    $(box).css("left", m.pageX+"px");
    $(box).css("top", m.pageY+"px");
    $(document.body).append($(box));
    populateGifts();
    bindEventsAndFocus();
});

$(document).mouseup(function (e) {
    var container = $(box);

    if (!container.is(e.target) // if the target of the click isn't the container...
    && container.has(e.target).length === 0) // ... nor a descendant of the container
    {
        container.remove();
    }
});