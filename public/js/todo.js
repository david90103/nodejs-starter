// todo.js
// 擴充 jQuery 方法
$.delete = function(url, data, callback, type) {
    if ($.isFunction(data)) {
      type = type || callback,
      callback = data,
      data = {}
    }
    return $.ajax({
      url: url,
      type: 'DELETE',
      success: callback,
      data: data,
      contentType: type
    });
  };
  $.put = function(url, data, callback, type) {
    if ($.isFunction(data)) {
      type = type || callback,
      callback = data,
      data = {}
    }
    return $.ajax({
      url: url,
      type: 'PUT',
      success: callback,
      data: data,
      contentType: type
    });
  };
  
  // 建立 API 清單
  var api = {
    editTask: function (userId, taskId) {
      var path = '/api/user/' + userId + '/task/' + taskId;
      return path;
    },
    newTask: function (userId) {
      var path = '/api/user/' + userId + '/task';
      return path;
    },
  };
  
  // 建立 close 按鈕，以便刪除 task
  var appendClose = function() {
    $('li.todo').each(function(e) {
      var close = $('<span></span>').text('\u00D7').addClass('close');
      $(this).append(close);
    });
  };
  
  // 按下建立時新增一個 task
  var addTask = function () {
    var value = $('#input-add-todo').val();
    var task = $('<li></li>').addClass('todo').text(value);
    if (!value) {
      return alert('嘿！要寫點東西！');
    }
    $('#todo-list').append(task);
    var userId = $('select#user-select').val();
    $.post(api.newTask(userId), { title: value });
    appendClose();
    $('#input-add-todo').val('');
  }
  
  // 處理 close 按鈕事件
  $(document).delegate('span.close', 'click', function(e) {
    $(this).parent().css('display', 'none');
    var taskId = $(this).parent().data('id');
    var userId = $('select#user-select').val();
    $.delete(api.editTask(userId, taskId));
  });
  
  // 處理 task 被按下時事件
  $(document).delegate('li.todo', 'click', function(e) {
    if ($(this).hasClass('checked')) {
      $(this).removeClass('checked');
    } else {
      $(this).addClass('checked');
    }
    var userId = $('select#user-select').val();
    var taskId = $(this).data('id');
    $.put(api.editTask(userId, taskId));
  });
  
  // when document is ready
  $(function() { appendClose() });