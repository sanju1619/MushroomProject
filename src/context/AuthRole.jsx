export default function AuthUserRole (){
  const token = localStorage.getItem("accesstoken");
  if (!token) return ({role:'user'});

  const decoded = JSON.parse(atob(token.split(".")[1]));
  return decoded;
}