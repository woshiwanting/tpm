<div class="dp_container" style="<%=dp_container_style%>">
  <div class="arrow_top" style="<%=arrow_top_style%>">
    <img src="/img/img_placeholder.gif" width="25" height="6" class="cmp_11_arrow_up"></div>
  <div class="dp_cal">
    <div class="minical_scheduler">
      <div class="scheduler_holder">
        <div class="icon_list">
          <a class="ai_scheduler hide has_result">
            <img class="spin_loader" src="static/images/firework_loader.gif">
            <span class="predicted_date">
              <img src="/img/img_placeholder.gif" width="26" height="26" class="cmp_ai_circle">
              <span class="date_text"><%=today.getDate()%></span>
            </span>
            <span class="error_icon">
              <img src="/img/img_placeholder.gif" width="24" height="22" class="cmp_triangle_warning"></span>
          </a>
          <a href="#" class="icon_scheduler today_icon">
            <img src="/img/img_placeholder.gif" width="26" height="26" class="cmp_scheduler_today">
            <span><%=today.getDate()%></span>
          </a>
          <a href="#" class="icon_scheduler">
            <img src="/img/img_placeholder.gif" width="26" height="26" class="cmp_scheduler_tomorrow"></a>
          <a href="#" class="icon_scheduler">
            <img src="/img/img_placeholder.gif" width="26" height="26" class="cmp_scheduler_next_week"></a>
          <a href="#" class="icon_scheduler">
            <img src="/img/img_placeholder.gif" width="26" height="26" class="cmp_scheduler_month"></a>
          <a href="#" class="icon_scheduler one_digit today_icon">
            <img src="/img/img_placeholder.gif" width="26" height="26" class="cmp_scheduler_today">
            <span>X</span>
          </a>
        </div>
      </div>
    </div>
    <table>
      <thead>
        <tr>
          <td class="dp_nav_top">
            <a href="javascript:;" class="dp_nav">
              <img src="/img/img_placeholder.gif" width="16" height="18" class="cmp_10_arrow_left"></a>
          </td>
          <th colspan="5" class="dp_nav_top">
            <span class="month_year"><%=currentMonth + 1%>月 <%=currentYear%></span>
          </th>
          <td class="dp_nav_top">
            <a href="javascript:;" class="dp_nav">
              <img src="/img/img_placeholder.gif" width="16" height="18" class="cmp_9_arrow_right"></a>
          </td>
        </tr>
      </thead>
      <tbody><%=tbody%></tbody>
    </table>
    <div class="recur_help">
      <p>
        您还可以这样输入循环日期
        <a href="#">每天</a>
        ,
        <a href="#">每周</a>
        and
        <a href="#">每月</a>
        <a class="more_ex_link">
          <img src="/img/img_placeholder.gif" width="12" height="12" class="cmp_question_circle"></a>
      </p>
    </div>
    <div id="quick_day_show">
      <div class="project_bar_holder">
        无到期任务
        <center>
          <div class="project_bar"></div>
        </center>
      </div>
    </div>
  </div>
</div>