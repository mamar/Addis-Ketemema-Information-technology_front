const users = JSON.parse(localStorage.getItem('userinfo'));
const UserStorage = () => {
  if (users != null) {
    return users.user[0].username;
  }
  if (users == null) {
    return null;
  }
};
export default UserStorage;
