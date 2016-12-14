/**
 * @description 拖拽模块
 * @time 2016.10.28 14:06
 */

var drapAndDropTpl = require('../tpl/drap_and_drop.tpl');
var TaskModel = require('../model/task_model.js');
var TaskCollection = require('../model/task_collection.js');

var drapAndDropView = Backbone.View.extend({
  el: '#editor',
  state: {
    //组件是否存在
    being: false
  },
  events: {
    'mousedown .drag_and_drop_handler': 'domMousedown',
    // 'mouseout .drag_and_drop_handler': 'destroy'
  },
  template: drapAndDropTpl,
  //修改状态
  setState: function(state) {
    $.extend(this.state, state);
  },
  initialize: function() {
    //单位缩进量
    this.indentUnit = 28;

  },
  stopPropagation: function(e) {
    var e = e || window.event;
    e.stopPropagation();
    e.preventDefault();
    return;
  },
  //拖动的时候后续的子节点隐藏
  hideSubDom: function(e){
    var self = this;
    var className = this.$element.get(0).className;
    var indentClass = className.match(/indent\_[1-5]{1}/ig)[0];
    var indent = indentClass.split('_')[1]/1;
    var index = this.$element.index();
    var $dragElements = [];
    this.$element.parent().find("li:not(.reorder_item)").each(function(i,ele){
      if($(ele).data('key')){
        var _indentClass = ele.className.match(/indent\_[1-5]{1}/ig)[0];
        var _indent = _indentClass.split('_')[1]/1;
        if((i+1)>index && _indent>indent){
          $(ele).addClass('dragSubHidden');
          $dragElements.push($(ele));
          $(ele).prependTo(self.project_temp);
        }else if((i+1) > index && _indent <= indent ){
          return false;
        }
      }
    });
    this.$dragElements = $dragElements;
  },
  domMousedown: function(e){
    var self = this;
    this.$element = $(e.target || e.srcElement).parents('li');
    this.project_temp = $('#project_temp');
    this.indentClass = this.$element.get(0).className.match(/indent\_[0-5]{1}/ig)[0];
    this.itemIndex = this.$element.index();
    this.eleHeight = this.$element.height();
    this.elePageY = this.$element.offset().top;
    this.elePageX = this.$element.offset().left;
    this.mouseX = e.pageX;
    this.mouseY = e.pageY;
    this.$element.addClass('on_drag').css({
      left:this.elePageX,
      top:this.elePageY
    });
    this.$ul = this.$el.find('.items');
    this.$placeholder = $("<li><span></span></li>");
    this.$placeholder.addClass('drag_item '+this.indentClass).css({
      height:this.eleHeight+'px'
    });
    this.$items = this.$ul.find("li:not(.reorder_item)");
    this.$placeholder.insertBefore(this.$element);
    this.hideSubDom(e);
    document.onmousemove = function(e){
      self.domMousemove(e);
    };
    document.onmouseup = function(){
      document.onmousemove = null;
      self.domMouseup();
    };
    this.stopPropagation(e);
  },
  domMousemove: function(e){
    var self = this;
    this._elePageX = e.pageX - this.mouseX  + this.elePageX;
    this._elePageY = e.pageY - this.mouseY  + this.elePageY;
    this.$element.css({
      left: this._elePageX,
      top: this._elePageY
    });
    var _insertPlace =-0.5;
    if(e.pageY < this.mouseY){
      _insertPlace = 1.5;
    }

    //获取占位dom的上一个节点
    var $prev = this.$placeholder.prev();
    //获取占位dom上一个节点的 indent值
    var prevIndent = 0;
    try{
      prevIndent = parseInt($prev.get(0).className.match(/indent\_[1-5]{1}/ig)[0].split("_")[1],10);
    }catch(e){

    }
    //计算出插入位置
    var insertPlace = parseInt((e.pageY - this.mouseY)/this.eleHeight + this.itemIndex - _insertPlace,10);
    this.indentPlace = Math.floor((e.pageX - this.mouseX)/this.indentUnit)+parseInt(this.indentClass.split('_')[1]);
    var pidx = this.$placeholder.index();
    this.indentPlace = this.indentPlace>5?5:this.indentPlace;

    if(pidx ==1 || pidx ==2){
      this.indentPlace = 0;
    }else{
      if(this.indentPlace > (prevIndent+1) && prevIndent<5){
        this.indentPlace = prevIndent+1;
      }
    }
    if(this.indentPlace <=0){
      this.indentPlace = 1;
    }
    //this.$placeholder.removeClass().addClass('drag_item');
    //if(this.indentPlace!=0){
    this.$placeholder.removeClass().addClass("drag_item indent_"+this.indentPlace);
    //}else{
    //  this.indentPlace = 1;
    //}
    self.dragDomPos(insertPlace);

    this.stopPropagation(e);
  },
  domMouseup: function(e){
    var self = this;
    this.$element.removeClass('on_drag').removeClass(this.indentClass).addClass('indent_'+this.indentPlace).css({
      left:0,
      top:0
    }).insertBefore(this.$placeholder);
    this.$placeholder.remove();
    var insertDom = this.$element;
      //将因为拖拽隐藏的子节点 显示出来
      // TODO 序列处理 并且发送当前所有节点的排序 到后台
    //$.each(this.$dragElements,function(i,ele){

    $.each(this.project_temp.find('li'),function(i,ele){
      var _this = $(ele);
      var _indent = _this.get(0).className.match(/(indent_\d+)/g)[0];
      var __indent = parseInt(_indent.split('_')[1]);
      _this.removeClass(_indent).addClass(function(){
        var __newIndent = (__indent+(Math.min(self.indentPlace, 5) - parseInt(self.indentClass.split('_')[1])));
        var _newIndent = __newIndent>5?5:__newIndent;
        _this.addClass('indent_'+_newIndent);
        _this.insertAfter(insertDom);
      });
      $(ele).removeClass("dragSubHidden");
    });
    document.onmouseup = null;
    this.stopPropagation(e);
    this.reBuildItemsData(e);

  },
  //灰色占位节点位置
  dragDomPos:function(insertPlace){
    if((insertPlace) < this.$items.length){
      this.$placeholder.insertBefore(this.$ul.find("li:not(.reorder_item)").eq(insertPlace+1));
    }else{
      this.$placeholder.insertAfter(this.$items.eq(this.$items.length-1));
    }
  },
  reBuildItemsData:function(e){
    var self = this;
    //拖动完毕后组装数据
    this.itemsData =  new TaskCollection();
    this.$ul.find('li:not(.reorder_item)').each(function(i,ele){
      var id = $(ele).data('key'),
          indent = parseInt($(ele).get(0).className.match(/(indent_\d+)/g)[0].split('_')[1]),
          parent = null;
      if(indent != 1){
        var t =  $(ele).prevUntil('.indent_'+(indent - 1));
        if(t.length == 0){
          parent = $(ele).prev().data('key');
        }else{
          parent = t.eq(t.length - 1).prev().data('key');
        }
      }
      console.log( i +":" + parent);

      self.itemsData.push(
          new TaskModel({
            sort:i+1,
            id:id,
            level:indent,
            parent:parent
          })
      );
    });
    self.update(self.itemsData);
  },
  //更新任务
  update: function(props) {
    //var task = new TaskModel();
    //task.url = '/v1/api/tasks/' + props;
    //task.save(props);
    this.itemsData.url = '/v1/api/tasksUpdate';
    //this.itemsData.create();
    this.itemsData.updateAll();
  },
  render: function(container) {
    var tpl = _.template(this.template)();

    this.container = $(container);

    if (this.container.find('.drag_and_drop_handler').length) {
      return;
    }

    this.container.prepend(tpl);
    // this.state.being = true;
  },
  //销毁组件
  destroy: function($container) {
    $container.find('.drag_and_drop_handler').remove();
    this.state.being = false;
  }
});

module.exports = drapAndDropView;