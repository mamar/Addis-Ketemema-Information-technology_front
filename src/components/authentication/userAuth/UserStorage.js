const users = JSON.parse(localStorage.getItem('userinfo'));
const UserStorage = () => (users ? users.user[0].username : null);
export default UserStorage;
