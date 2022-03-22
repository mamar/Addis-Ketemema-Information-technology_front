const users = JSON.parse(localStorage.getItem('userinfo'));
const UserFullname = () => (users ? users.user[0].user_fullname : null);
export default UserFullname;
