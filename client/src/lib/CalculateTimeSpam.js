export const calculateTimeSpam = (date) => {
  const today = new Date();
  const createdAt = date;
  let diffTimeInMinutes = (today - createdAt) / (1000 * 60);

  // year time spam = 365×24×60=525600
  if (diffTimeInMinutes >= 525600) {
    const yearInMinutes = 525600;
    let yearCount = 0;
    while (diffTimeInMinutes >= yearInMinutes) {
      yearCount++;
      diffTimeInMinutes -= yearInMinutes;
    }
    return `${yearCount === 1 ? "a year ago" : yearCount + " years ago"}`;
  }
  // month time spam = 30×24×60=43200
  else if (diffTimeInMinutes >= 43200) {
    const monthInMinutes = 43200;
    let monthCount = 0;
    while (diffTimeInMinutes >= monthInMinutes) {
      monthCount++;
      diffTimeInMinutes -= monthInMinutes;
    }
    return `${monthCount === 1 ? "a month ago" : monthCount + " months ago"}`;
  }
  // week time spam = 7×24×60=10080
  else if (diffTimeInMinutes >= 10080) {
    const weekInMinutes = 10080;
    let weekCount = 0;
    while (diffTimeInMinutes >= weekInMinutes) {
      weekCount++;
      diffTimeInMinutes -= weekInMinutes;
    }
    return `${weekCount === 1 ? "a week ago" : weekCount + " weeks ago"}`;
  }
  // day time sapam = 24*60 = 1440
  else if (diffTimeInMinutes >= 1440) {
    const dayInMinutes = 1440;
    let dayCount = 0;
    while (diffTimeInMinutes >= dayInMinutes) {
      dayCount++;
      diffTimeInMinutes -= dayInMinutes;
    }
    return `${dayCount === 1 ? "a day ago" : dayCount + " days ago"}`;
  }
  // hour time spam = 60
  else if (diffTimeInMinutes >= 60) {
    const hourInMinutes = 60;
    let hourCount = 0;
    while (diffTimeInMinutes >= hourInMinutes) {
      hourCount++;
      diffTimeInMinutes -= hourInMinutes;
    }
    return `${hourCount === 1 ? "an hour ago" : hourCount + " hours ago"}`;
  } else {
    console.log("Just Now");
  }
};
