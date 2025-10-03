import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
// import { signUp } from "../../store/authSlice/authSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import './auth.css'
import { signUp } from "../../store/authSlice/authSlice";
import type { AppDispatch } from "../../store/store";
type FormData = {
  name: string;
  email: string;
  password: string;
};

const SignUp = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    //  localStorage.setItem("user", JSON.stringify(data));
    dispatch(signUp(data))
    .unwrap().then(()=>{
      alert("SignUp successfully")
      navigate("/login")
    }).catch((err) => alert(err.message || "Signup failed"))
    // alert("Signup successful!");
    console.log("sign data",data)
    // navigate("/login");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}  className="signup-form">
         <h2>Sign Up</h2>
      <input
        {...register("name", { required: "Name is required" })}
        placeholder="Name"
         className="form-input"
      />
      <p className="error">{errors.name?.message}</p>

      <input
        {...register("email", { required: "Email is required" })}
        placeholder="Email"
         className="form-input"
      />
      <p className="error">{errors.email?.message}</p>

      <input
        type="password"
        {...register("password", { required: "Password required" })}
        placeholder="Password"
         className="form-input"
      />
      <p className="error">{errors.password?.message}</p>
      <p className="link-text">If you have already account  
     <Link to={'/login'}   className="login-link">{""}  Login</Link>
     </p>

      <button type="submit"  className="submit-btn">Sign Up</button>
    </form>
  );
};

export default SignUp;
