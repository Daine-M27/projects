// State Object
var state = {
	list1: []
};

// Modify List
var addItem = function(state, item) {
	state.list1.push(item);
};

// function toggClass(clicker2) {
// 	$('.shopping-item').toggleClass('shopping-item__checked')
// }

// Render List
var renderList = function(state, element) {
    var itemsHTML = state.list1.map(function(item) {
        return '<li>' + 
        '<span class="shopping-item">' + item + '</span>' +
        '<div class="shopping-item-controls">' +
          '<button class="shopping-item-toggle">' +
            '<span class="button-label">check</span>' +
          '</button>' + ' ' +
          '<button class="shopping-item-delete">' +
            '<span class="button-label">delete</span>' +
          '</button>' +
        '</div>' + '</li>'
    });
    element.append(itemsHTML);
   };

// Listeners
$('#js-shopping-list-form').submit(function(event) {
    event.preventDefault();
    addItem(state, $('#shopping-list-entry').val());
    renderList(state, $('.shopping-list'));
});

$('.shopping-item-toggle').click(function(clicker) {
	clicker.preventDefault();
  //console.log($(this).parent().parent().find('.shopping-item'));
	$(this).closest('li').find('.shopping-item').toggleClass('shopping-item__checked');
  //console.log($(this).closest('li').find('.shopping-item'));
});

$('.shopping-item-delete').click(function(event){
  event.preventDefault();
  $(this).closest('li').toggleClass('item-delete');
  $('.item-delete').remove('li');

});