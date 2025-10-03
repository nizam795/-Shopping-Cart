
// import { logIn } from '../../store/authSlice/authSlice';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './auth.css'
import { logIn } from '../../store/authSlice/authSlice';
import type { AppDispatch } from '../../store/store';


type LoginData = {
  email: string;
  password: string;
};
const Login = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>();

  const onSubmit = (data: LoginData) => {
    dispatch(logIn(data))
    .unwrap()
    .then(()=>{
      alert("login successfully")
      navigate('/')
    })
    .catch((err)=>{
      alert(err.message || "Login failed")
    })
    // navigate('/')
    // alert("Login attempted");
  };
  return (
   <form onSubmit={handleSubmit(onSubmit)} className="signup-form">
    <h2>Login</h2>
      <input {...register("email", { required: "Email required" })} placeholder="Email" className="form-input" />
      <p className="error">{errors.email?.message}</p>

      <input type="password" {...register("password", { required: "Password required" })} placeholder="Password" className="form-input" />
      <p className="error">{errors.password?.message}</p>

     <Link to={'/'}   className="login-link">{""}Create an Account</Link>
     
      <button type="submit" className="submit-btn">Login</button>
    </form>
  )
}

export default Login