<% if (open) { %>
  <li class="manager indent_1">
    <form>
      <table width="100%">
        <tbody>
          <tr>
            <td colspan="2" class="form_content">
              <table>
                <tbody>
                  <tr>
                    <td class="text_box_holder">
                      <span class="rich_text_placeholder">例如： 每天读书时间 p3 @目标 共享</span>
                      <div tabindex="1" autocomplete="off" withplaceholders="true" class="richtext_editor sel_richtext_editor" contenteditable="true"></div>
                    </td>
                    <td class="due_date_holder minical_holder">
                      <input type="text" class="input_due_date dp_icon" name="due_date" tabindex="2" autocomplete="off" placeholder="日程安排"></td>
                    <td class="people_assigner_holder">
                      <img src="/img/img_placeholder.gif" width="22" height="20" class="cmp_share_person form_action_icon menu_icon assign_icon" style="display: none;"></td>
                    <td class="menu"></td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
      <table class="td_submit_area">
        <tbody>
          <tr>
            <td align="left" class="td_submit">
              <a href="javascript:;" class="amibutton amibutton_red submit_btn">
                <span>添加任务</span>
              </a>
              <a class="cancel" href="javascript:;" tabindex="4">取消</a>
            </td>
            <td align="right" class="td_extra">
              <span class="form_icon_holder">
                <img src="/img/img_placeholder.gif" width="16" height="16" class="cmp_dark_highlight_project form_action_icon">
                <span></span>
                <img src="/img/img_placeholder.gif" width="22" height="16" class="cmp_reminders form_action_icon menu_icon" id="reminders_icon">
                <img src="/img/img_placeholder.gif" width="22" height="16" class="cmp_priority4 form_action_icon menu_icon"></span>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  </li>
<% } %>