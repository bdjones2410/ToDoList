//////////////////
// DATA ARRAY   //
//////////////////

var youDoData = [

];


var toDelete = [];


var itemsLeft = youDoData.length - toDelete.length + " tasks remain";













//////////////////
// TEMPLATES    //
//////////////////
var templates= {
 toDoFill:[
            '<div class="toDoList" data-id="<%= id %>">',
            '<a href="" class="checkBox">',
            '<div id="check" class ="check hidden">&#x2713;</div>',
            '</a>',
            '<div class="toDoItem">',
            '<h4 class=" "><%= toDo %></h4>',
            '</div>',
            '</div>'
            ].join(""),

};
