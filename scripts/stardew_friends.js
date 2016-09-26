"use strict";
            
var gift_list = [];
var friend_list = [];
var selectedSlot = "";
var box = $("#item-box").remove();

$.getJSON( "http://localhost/stardew_friends/data/stardew_friends_data.json", function( data ) {
    friend_list = data;
    generateFriends();
    bindEventsAndFocus();
  });

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
    $("#item-list").empty();
    
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

function generateFriends() {
    $("#gifts_table tbody").empty();
    
    for(var i = 0; i < friend_list.length; i++) {
        var character = friend_list[i];
        
        var table_row = "<tr><td>" + character.name + "</td>";
        table_row += "<td><img src='" + character.imageSrc + "' title='" + character.name + "'/></td>";
        table_row += "<td class='gift_items'><img src='images/gifts/Select_Item.png' title='Click to select'></td>";
        table_row += "<td class='gift_items'><img src='images/gifts/Select_Item.png' title='Click to select'></td>";
        table_row += "<td><strong>Loves: " +  character.gifts[0].loves + "</strong><br/><br/>Likes: " + character.gifts[0].likes + "</td></tr>";
        
        $("#gifts_table tbody").append(table_row);
    }
}

function bindEventsAndFocus() {
    $("#item-list").on('mouseover', 'img.item', function() {
        $(this).addClass("hovered");
    });

    $("#item-list").on('click', 'img.item', function() {
        $(selectedSlot).attr("src", $(this).attr("src"));
        $(selectedSlot).attr("title", $(this).attr("title"));
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
    
    $(".gift_items").on('click', 'img', function(m) {
        selectedSlot = $(this);
        $(box).css("left", m.pageX+"px");
        $(box).css("top", m.pageY+"px");
        $(document.body).append($(box));
        populateGifts();
        bindEventsAndFocus();
    });
}

$(document).mouseup(function (e) {
    var container = $(box);

    if (!container.is(e.target) // if the target of the click isn't the container...
    && container.has(e.target).length === 0) // ... nor a descendant of the container
    {
        container.remove();
    }
});