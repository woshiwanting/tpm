<% _.each(taskList, function(task, index) { %>
  <li class="task_item item_<%=task.task_id%> not_shared menu_clickable indent_<%=task.level%> priority_<%=task.priority%>" id="item_<%=task.task_id%>" data-key="<%=task.task_id%>">
    <div class="arrow">
      <img src="/img/img_placeholder.gif" width="10" height="10" class="cmp_open_arrow_down">
    </div>
    <div class="invisible_space"></div>
    <table cellpadding="0" cellspacing="0">
      <tbody>
        <tr>
          <td class="checker sel_checkbox_td">
            <div class="amicheckbox">
              <img src="/img/img_placeholder.gif" width="17" height="17" class="cmp_12_checkbox_off amicheckbox_img">
            </div>
          </td>
          <td class="text_cursor content task_content_item">
            <div class="text_cursor div_due_date">
              <span class="date empty"></span>
            </div>
            <span class="text sel_item_content">
              <%=task.content%>
              <span class="clickable note_icon note_icon_hidden" data-note-type="item_note" data-note-parent-id="111699593">
                <img src="/img/img_placeholder.gif" width="15" height="14" class="cmp_comment clickable sel_item_notes">
              </span>
              <div></div>
            </span>
          </td>
          <td class="menu">
            <div class="icon menu cmp_menu_on gear_menu"></div>
          </td>
        </tr>
      </tbody>
    </table>
  </li>
<% }) %>