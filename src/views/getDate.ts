// !快速得到本周开始、结束日期；本月开始、结束日期；上个月开始、结束日期；本季度开始、结束日期；
class GetDate {
  private nowDayOfWeek: number
  private nowDay: number
  private nowMonth: number
  private nowYear: number

  constructor (serverDateStr?: string) { // !date: Sat, 29 Oct 2022 15:42:03 GMT
    const diff = serverDateStr ? this.getDiffTime(serverDateStr) : 0;
    const nowDate = new Date(Date.now() - diff);
    this.nowDayOfWeek = nowDate.getDay(); // 今天本周的第几天
    this.nowDay = nowDate.getDate(); // 当前日
    this.nowMonth = nowDate.getMonth() + 1; // 当前月
    this.nowYear = nowDate.getFullYear(); // 当前年
  }

  private getDiffTime (serverDateStr: string) { // !因为本地时间不一定正确，所以计算本地时间与服务器时间的diff
    const serverDate = new Date(serverDateStr);
    const diff = Date.now() - serverDate.getTime();
    return diff;
  }

  // 格式化日期：yyyy-MM-dd
  private formatDate (date: Date) {
    const myyear = date.getFullYear();
    let mymonth: string | number = date.getMonth() + 1;
    let myweekday: string | number = date.getDate();

    if (mymonth < 10) {
      mymonth = '0' + mymonth;
    }
    if (myweekday < 10) {
      myweekday = '0' + myweekday;
    }
    return (myyear + '-' + mymonth + '-' + myweekday);
  }

  private getMonthDays (year: number, month: number) {
    const d = new Date(year, month, 0);
    return d.getDate();
  }

  // 获得本周的开始日期
  private getWeekStartDate () {
    const weekStartDate = new Date(this.nowYear, this.nowMonth - 1, this.nowDay - this.nowDayOfWeek); // !这种 月份-1  怪怪的，语义化不好
    // var weekStartDate = new Date(`${this.nowYear}/${this.nowMonth}/${this.nowDay - this.nowDayOfWeek}`);
    // !其实应该用'2021-1-1'这种比较直观，但不兼容IOS，所以用   2021/1/1   ，配合正则replace(/-/g, '/');
    return this.formatDate(weekStartDate);
  }

  // 获得本周的结束日期
  private getWeekEndDate () {
    const weekEndDate = new Date(this.nowYear, this.nowMonth - 1, this.nowDay + (6 - this.nowDayOfWeek));
    return this.formatDate(weekEndDate);
  }

  // 获得本月的开始日期
  private getMonthStartDate () {
    const monthStartDate = new Date(this.nowYear, this.nowMonth - 1, 1);
    return this.formatDate(monthStartDate);
  }

  // 获得本月的结束日期
  private getMonthEndDate () {
    const days = this.getMonthDays(this.nowYear, this.nowMonth); // 获取当月总共有多少天
    const monthEndDate = new Date(this.nowYear, this.nowMonth - 1, days);
    return this.formatDate(monthEndDate); // 返回当月结束时间
  }
  // console.log(getMonthStartDate(), getMonthEndDate());

  // 获得上月的开始日期
  private getLastMonthStartDate () {
    const monthStartDate = new Date(this.nowYear, this.nowMonth - 2, 1);
    return this.formatDate(monthStartDate);
  }

  // 获得上月的结束日期
  private getLastMonthEndDate () {
    const days = this.getMonthDays(this.nowYear, this.nowMonth - 1);
    const monthEndDate = new Date(this.nowYear, this.nowMonth - 2, days);
    return this.formatDate(monthEndDate); // 返回当月结束时间
  }
  // console.log(getLastMonthStartDate(), getLastMonthEndDate());

  // 获得本季度的开始月份
  private getQuarterStartMonth () {
    let quarterStartMonth = 0;
    if (this.nowMonth <= 3) {
      quarterStartMonth = 0;
    }
    if (this.nowMonth > 3 && this.nowMonth <= 6) {
      quarterStartMonth = 3;
    }
    if (this.nowMonth > 6 && this.nowMonth <= 9) {
      quarterStartMonth = 6;
    }
    if (this.nowMonth > 9) {
      quarterStartMonth = 9;
    }
    return quarterStartMonth;
  }

  // 获得本季度的开始日期
  private getQuarterStartDate () {
    const quarterStartDate = new Date(this.nowYear, this.getQuarterStartMonth(), 1);
    return this.formatDate(quarterStartDate);
  }

  // 或的本季度的结束日期
  private getQuarterEndDate () {
    const quarterEndMonth = this.getQuarterStartMonth() + 2;
    const quarterStartDate = new Date(this.nowYear, quarterEndMonth, this.getMonthDays(this.nowYear, quarterEndMonth + 1));
    return this.formatDate(quarterStartDate);
  }

  /**
   * !weekStartDate: 本周开始日期；
   * !weekEndDate: 本周结束日期；
   * !monthStartDate: 本月开始日期；
   * ....
   */
  getAllDates () {
    return {
      weekStartDate: this.getWeekStartDate(),
      weekEndDate: this.getWeekEndDate(),
      monthStartDate: this.getMonthStartDate(),
      monthEndDate: this.getMonthEndDate(),
      lastMonthStartDate: this.getLastMonthStartDate(),
      lastMonthEndDate: this.getLastMonthEndDate(),
      quarterStartDate: this.getQuarterStartDate(),
      quarterEndDate: this.getQuarterEndDate()
    };
  }
}

export default GetDate;
