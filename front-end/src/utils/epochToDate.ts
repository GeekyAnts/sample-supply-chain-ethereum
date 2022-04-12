// var myDate = new Date(1647860874*1000);
// console.log(myDate.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric',month:"long",day:"numeric", hour12: true }))

export const epochToDate = (epoc: number) => {
  var date = new Date(Math.round(Number(epoc * 1000)));
  const formatDate =
    date.getUTCDate() +
    "-" +
    (date.getUTCMonth() + 1) +
    "-" +
    date.getUTCFullYear();
  return formatDate.replaceAll("-", "/");
};
