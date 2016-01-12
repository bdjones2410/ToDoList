$(document).ready(function() {
    list.init();
});


var list = {
    init: function() {
        list.styling();
        list.events();
        $('.remainingToDo').html(itemsLeft);
    },

    styling: function() {
        list.loadToDo(youDoData);


    },
    events: function() {
        $('#hereDo').on('click', 'a', function(event) {
            event.preventDefault();
            $(this).children().toggleClass('hidden');
            $(this).siblings().children().toggleClass(
                'doneItem');
            $(this).closest('.toDoList').toggleClass('finished');
            elID = $(this).closest('.toDoList').data('id');
            if (_.contains(toDelete, elID)) {
                var idxof = _.indexOf(toDelete, elID);
                toDelete.splice(idxof, 1);
            } else(toDelete.push(elID));
            itemsLeft = youDoData.length - toDelete.length +
                " tasks remain";
            $('.remainingToDo').html(itemsLeft);
            toDelete.sort(function(a, b) {
                return b - a;
            });
        });

        $('form').on('submit', function(event) {
            event.preventDefault();
            var newToDo = {
                toDo: $('input[name="taskInput"]').val(),
            };
            youDoData.unshift(newToDo);
            var newDoId = youDoData.indexOf(newToDo);
            $('#hereDo').html('');
            list.loadToDo(youDoData);
            $('input').val('');
            itemsLeft = youDoData.length - toDelete.length +
                " tasks remain";
            $('.remainingToDo').html(itemsLeft);
            toDelete.sort(function(a, b) {
                return b - a;
            });
        });

        $('nav').on('click', '#deleteBut', function(event) {
            event.preventDefault();
            _.each(toDelete, function(el) {
                list.delTask(el);
            });
            $('#hereDo').html('');
            list.loadToDo(youDoData);
        });

        //Thank you to Neeraj Dubey on stackOverflow for keyCode code.

        $('#hereDo').on('dblclick', 'h4', function() {
            $(this).attr('contenteditable', 'true');
            $(this).keydown(function(event) {
                var keyCode = (event.keyCode ? event.keyCode :
                    event.which);
                if (keyCode === 13) {
                    $(this).attr('contenteditable',
                        'false');
                    var newText = $(this).text();
                    var idx = $(this).closest(
                        '.toDoList').data('id');
                    youDoData[idx].toDo = newText;
                } else {
                    var newTxt = $(this).text();
                    var idex = $(this).closest(
                        '.toDoList').data('id');
                    youDoData[idex].toDo = newTxt;
                }
            });

        });

        $('nav').on('click', 'a', function(event) {
            event.preventDefault();
            $(this).closest('li').addClass('clickedBorder');
            $(this).closest('li').siblings('li').removeClass(
                'clickedBorder');
            if ($(this).attr('rel') === 'Active') {
                $('.toDoList').removeClass('hide');
                $('.finished').addClass('hide');
            } else if ($(this).attr('rel') === "Completed") {
                $('.toDoList').addClass('hide');
                $('.finished').removeClass('hide');
            } else if ($(this).attr('rel') === 'All') {
                $('.toDoList').removeClass('hide');
            }
        });


    },

    delTask: function(idx) {
        youDoData.splice(idx, 1);
    },

    getTemplate: function(name) {
        return _.template(templates[name]);
    },

    loadTemplate: function($el, data, tmpl) {
        var template = list.getTemplate(tmpl);
        var html = template(data);
        $el.append(html);
    },

    loadToDo: function(arr) {
        _.each(arr, function(curEl, idx, arr) {
            curEl.id = idx;
            list.loadTemplate($('#hereDo'), curEl, 'toDoFill');
            toDelete = [];
        });
    },


























};
