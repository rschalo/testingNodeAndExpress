// this function takes an array of users, a year to filter by,
// and a callback function to call once the array has been filtered
// by the year
function filterByYear(arrayOfUsers, year, callback) {
  const response = arrayOfUsers.filter((user) => {
    const date = new Date(user.created_at);
    return date.getFullYear() >= year;
  });
  callback(null, response);
}

module.exports = {
  filterByYear
};
