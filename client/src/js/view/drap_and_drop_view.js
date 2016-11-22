/**
 * @description 拖拽模块
 * @time 2016.10.28 14:06
 */

var drapAndDropTpl = require('../tpl/drap_and_drop.tpl');
var TaskModel = require('../model/task_model.js');

var drapAndDropView = Backbone.View.extend({
  el: '#editor',
  state: {
    //组件是否存在
    being: false
  },
  events: {
    'mousedown .drag_and_drop_handler': 'handleMousedown',
    // 'mouseout .drag_and_drop_handler': 'destroy'
  },
  template: drapAndDropTpl,
  //修改状态
  setState: function(state) {
    $.extend(this.state, state);
  },
  initialize: function() {
    this.onDragClass = 'on_drag';
    this.placeholderSelector = '.drop_item';

    //单位缩进量
    this.indentUnit = 28;

    //拖动组件属性
    this.isXlimit = true; //x方向是否允许出界
    this.isYlimit = true; //y方向是否允许出界
    this.minX = ''; //x方向的最小位置
    this.minY = ''; //y方向的最小位置
    this.maxX = ''; //x方向的最大位置
    this.maxY = ''; //y方向的最大位置
  },
  stopPropagation: function(e) {
    e.stopPropagation();
    e.preventDefault();
    return;
  },
  handleMousedown: function(e) {
    this.$element = $(e.currentTarget).parent();
    var className = this.$element.get(0).className;

    this.left = this.$element.offset().left;
    this.top = this.$element.offset().top;
    this.x = e.clientX;
    this.y = e.clientY;

    this.placeholderTpl = '<li class="' + ['drop_item', className].join(' ') + '"></li>'

    this.handleExtraMousedown(e);

    document.onmousemove = $.proxy(this.handleMousemove, this);

    this.stopPropagation(e);
  },
  //鼠标按下附加回调
  handleExtraMousedown: function(e) {
    var height = this.$element.outerHeight(true);
    var indent = this.getIndent(this.$element);
    //占位元素
    var placeholderEle = $(this.placeholderTpl).css({
      height: height,
      marginLeft: Math.max(indent - 1, 0) * this.indentUnit
    });

    this.$element.addClass(this.onDragClass);

    //添加位置占位
    this.setMovingElePos(e);
    this.$element.after(placeholderEle);

    this.handleMouseup();
  },
  //设置移动的位置
  setMovingElePos: function(e) {
    var e = e || window.event;

    var left = this.left + e.clientX - this.x;
    var top = this.top + e.clientY - this.y;
    var eleWidth = this.$element.outerWidth();
    var eleHeight = this.$element.outerHeight();
    var pageWidth = $('body').width();
    var pageHeight = $('body').height();

    var width = this.$element.outerWidth();

    left = this.isXlimit && left < 0 ? 0 : left;
    left = this.isXlimit && (left > pageWidth - eleWidth) ? (pageWidth - eleWidth) : left;

    left = this.minX !== '' && left < this.minX ? this.minX : left;
    left = this.maxX !== '' && left > this.maxX ? this.maxX : left;

    top = this.isYlimit && top < 0 ? 0 : top;
    top = this.isXlimit && (top > pageHeight - eleHeight) ? (pageHeight - eleHeight) : top;

    top = this.minY !== '' && top < this.minY ? this.minY : top;
    top = this.maxY !== '' && top > this.maxY ? this.maxY : top;

    this.$element.css({
      visibility: 'visible',
      zIndex: 1000,
      opacity: 0.5,
      position: 'absolute',
      left: left,
      top: top,
      width: width
    });

    return {
      left: left,
      top: top
    }
  },
  handleMousemove: function(e) {
    var offset = this.setMovingElePos(e);

    this.setPlaceholderIndent(offset);
    this.updatePlaceholderLevel(offset);
    // this.handleAutoScroll(e);

    this.handleMouseup();
    this.stopPropagation(e);
  },
  //绑定mouseup
  handleMouseup: function() {
    document.onmouseup = function() {
      document.onmousemove = null;

      clearInterval(this.scroll_interval);
      this.scroll_interval = null;
      
      this.handleMouseupCallback();
    }.bind(this);
  },
  //比较目标元素与最近元素位置，添加占位元素
  updatePlaceholderLevel: function(self_offset) {
    var $placeholder = this.$el.find(this.placeholderSelector);
    var placeholderHeight = $placeholder.outerHeight(true);
    var placeholder_offset = $placeholder.offset();
    var itemHeight = 47;
    var self = this;

    //在placeholder内容区内移动，不重新计算placelholder位置
    if (placeholder_offset.top + placeholderHeight > self_offset.top 
      && self_offset.top > placeholder_offset.top) {
      return;
    }

    this.$el.find('.task_item').each(function() {
      var offset = $(this).offset();

      //目标块下边界
      if (self_offset.top > offset.top && self_offset.top < offset.top + itemHeight) {
        if ($(this).next(self.placeholderSelector).length) {
          return;
        }
        return $(this).after($placeholder);
      }

      //目标块上边界
      if (self_offset.top < offset.top && self_offset.top + itemHeight > offset.top) {
        if ($(this).prev(self.placeholderSelector).length) {
          return;
        }
        return $(this).before($placeholder);
      }
    });
  },
  //返回缩进值
  getIndent: function($ele) {
    var indent = +$ele.get(0).className.match(/indent_(\d+)/)[1] || 0;
    return indent;
  },
  //设置占位元素的缩进量
  setPlaceholderIndent: function(self_offset) {
    this.$placeholder = this.$el.find(this.placeholderSelector);
    this.$prevEle = this.$placeholder.prevAll(':not(.' + this.onDragClass + '):first');

    //当置于顶部时
    if (!this.$placeholder.prevAll('.task_item:not(.reorder_item)').length) {
      return this.$placeholder.css('marginLeft', 0);
    }

    var indent = this.getIndent(this.$prevEle);

    var prevEle_offset = this.$prevEle.offset();
    var marginLeft = this.$placeholder.css('marginLeft');

    prevEle_offset.top += parseInt(this.$prevEle.css('padding-top'), 10) || 0;
    prevEle_offset.left += parseInt(this.$prevEle.css('padding-left'), 10) || 0;

    console.log('self_offset:%s, prevEle_offset:%s', self_offset.left, prevEle_offset.left)

    //与上一级对齐
    if (self_offset.left == prevEle_offset.left || 
      (self_offset.left < prevEle_offset.left + this.indentUnit 
      && self_offset.left + this.indentUnit > prevEle_offset.left)) {

      return this.$placeholder.css('marginLeft', Math.max((indent - 1) * this.indentUnit, 0));
    }

    //相对上一级向右移动一个indent
    if (self_offset.left >= prevEle_offset.left + this.indentUnit) {
      return this.$placeholder.css('marginLeft', indent * this.indentUnit);
    }

    //相对上一级向左移动一个indent
    if (self_offset.left + this.indentUnit <= prevEle_offset.left) {
      return this.$placeholder.css('marginLeft',  Math.max((indent - 2) * this.indentUnit, 0));
    }
    
  },
  //拖动结束及释放鼠标后回调
  handleMouseupCallback: function() {
    this.$element.removeClass(this.onDragClass);
    this.$element.get(0).style = 'opacity:1;visibility: visible';
    this.$placeholder = this.$placeholder || this.$el.find(this.placeholderSelector);

    var indent = parseInt(this.$placeholder.css('marginLeft'), 10) / this.indentUnit + 1;
    //样式限制，最多缩进5层
    this.indentClass= 'indent_' + Math.min(indent, 5);

    this.$element.removeClass(function() {
      return this.className.match(/(indent_\d+)/g)[0];
    }).addClass(this.indentClass);

    //兼容拖动任务编辑器
    var $id = this.$element.get(0).id;

    if ($id) {
      //更新
      this.update({id: $id.match(/_(.+)$/)[1], level: Math.min(indent, 5)});
    }

    //将拖动的单个任务移动到占位元素处
    this.$el.find(this.placeholderSelector).replaceWith(this.$element);
  },
  //自动滚动
  handleAutoScroll: function(e) {
    var topBarHeight = $('#top_bar').outerHeight(true);
    var clientHeight = $(window).height();

    var top = this.$placeholder.offset().top;
    var height = this.$placeholder.outerHeight(true);

    if (this.scroll_interval) {
      clearInterval(this.scroll_interval);
      this.scroll_interval = null;
    }

    //Positive co-ordinates will scroll to the right and down the page. Negative values will scroll to the left and up the page.
    this.scroll_interval = setInterval(function() {
      var scrollTop = $(window).scrollTop();
      if (top < clientHeight - topBarHeight + scrollTop) {
        window.scrollBy(0, -6);
      }

      if (top + height > clientHeight + scrollTop) {
        window.scrollBy(0, 6);
      }
    }.bind(this), 1);
  },
  //更新任务
  update: function(props) {
    var task = new TaskModel();
    task.url = '/v1/api/tasks/' + props.id;
    task.save(props);
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