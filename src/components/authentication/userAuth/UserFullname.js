const users = JSON.parse(localStorage.getItem('userinfo'));
const UserFullname = () => {
  if (users != null) {
    return users.user[0].user_fullname;
  }
  if (users == null) {
    return null;
  }
};
export default UserFullname;
