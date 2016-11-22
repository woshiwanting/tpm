<div class="project_editor_instance current_editor">
  <div class="list_editor">
    <h2 class="project_header section_header">
      <a href="#" class="project_link">
        <span>收件箱</span>
      </a>
      <div class="right_task_actions">
        <span class="clickable note_icon" data-note-type="project_note" data-note-parent-id="179807262">
          <img src="/img/img_placeholder.gif" width="15" height="14" class="cmp_comment clickable sel_item_notes"></span>
        <a href="#">
          <img src="/img/img_placeholder.gif" width="16" height="16" class="cmp_task_actions icon"></a>
      </div>
    </h2>
    <ul class="items" id="J-taskItem">
      <li class="reorder_item task_item"></li>
      <%=taskListFragment%>
    </ul>
  </div>
  <div class="controller actions pe_controller">
    <div class="history_icon">
      <a href="javascript:;">
        <img src="/img/img_placeholder.gif" width="26" height="16" class="cmp_history_big"></a>
    </div>
    <a id="J-addTask" href="javascript:;" class="action">
      <span class="icon icon-add"></span>
      添加任务
    </a>
  </div>
  <div class="history_desc" style="/* display: block; */">
    <ul class="items history" id="project_history"></ul>
  </div>
  <div class="controller actions his_ctrl">
    <a href="#" class="action" style="display: none;">获取更多...</a>
  </div>
</div>