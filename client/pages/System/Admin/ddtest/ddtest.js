Template.ddtest.rendered = function () {
    setTimeout(function () {
      $(".drag").draggable({
        scroll: false,
        revert: "invalid",
        opacity: 0.7,
      });
  
      $(".target").droppable({
        drop: function (event, ui) {
          if (this.childNodes.length == 0) {
            $(this).append(ui.draggable);
            $(ui.draggable).css("top", "auto");
            $(ui.draggable).css("left", "auto");
            $(ui.draggable).css("cursor", "default");
          }else{
            $(ui.draggable).draggable('option', 'revert', true);
          }
        }
      });
    }, 200);
  }