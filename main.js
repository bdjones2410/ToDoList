$(document).ready(function () {
  list.init();
});


var list ={
    init: function(){
      list.styling();
      list.events();

    },

    styling: function(){
      list.loadToDo(youDoData);


    },
    events: function(){
      $('#hereDo').on('click','a', function(event) {
        event.preventDefault();
        $(this).children().toggleClass('hidden');
        $(this).siblings().children().toggleClass('doneItem');
        $(this).closest('.toDoList').toggleClass('finished');
        elID = $(this).closest('.toDoList').data('id');
          if ( _.contains(toDelete, elID)) {
            var idxof = _.indexOf(toDelete, elID);
            toDelete.splice(idxof, 1); }
          else (toDelete.push(elID));
      });

      $('nav').on('click','#deleteBut', function(event){
          event.preventDefault();
          _.each(toDelete, function(el){
            list.delTask(el);
          });
          $('#hereDo').html('');
          list.loadToDo(youDoData);

      });


    },

    delTask: function(idx) {
      youDoData.splice(idx,1);
    },

    getTemplate: function(name){
      return _.template(templates[name]);
    },

    loadTemplate: function($el, data, tmpl) {
      var template = list.getTemplate(tmpl);
      var html = template(data);
      $el.append(html);
    },

    loadToDo: function(arr) {
      _.each(arr, function(curEl, idx, arr){
        curEl.id = idx;
        list.loadTemplate($('#hereDo'), curEl, 'toDoFill');
        toDelete = [];
      });
    },
























};
