import React, {useState} from "react";
import axios from "axios";
import {useDispatch} from "react-redux";
import {Notyf} from "notyf";
import {setLogin} from "../redux/loginSlice";
import "../styles/login.css";
import {useEffect} from "react";

function Login() {
    useEffect(() => {
        document.querySelector('.img_btn').addEventListener(
            'click',
            function () {
            document.querySelector('.cont').classList.toggle('s--signup');
        });
    })

    const url = "http://127.0.0.1:8000/api/";

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [newName, setNewName] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    // const checkEmail = (e) => {
    //     if (e.match(/(.+)@(gmail+)\.com/i)) {
    //         setEmail(e);
    //     }
    // }
    const dispatch = useDispatch();
    const [isLoggedIn, setLoggedIn] = useState(false);
    // Hiển thị thông báo Toast trong ứng dụng
    const notyf = new Notyf({
        position: {
            x: "right",
            y: "top",
        },
        types: [
            {
                type: 'success',
                background: 'green',
                icon: {
                    className: 'fas fa-check',
                    tagName: 'span',
                    color: 'white'
                }
            },
            {
                type: 'error',
                background: 'red',
                icon: {
                    className: 'fas fa-times',
                    tagName: 'span',
                    color: 'white'
                }
            },
        ],
    });


    const checkLogin = () => {
        if (email === "") {
            notyf.open({
                type: "error",
                message: "Thiếu email đăng nhập",
            });
        } else {
            axios({
                method: "POST",
                url: url + "checkLogin",
                data: {
                    email: email,
                    password: password
                }
            }).then((res) => {
                console.log(res.data);
                if (res.data.check === true) {
                    const user = {
                        email: email,
                        token: res.data.token
                    };
                    dispatch(setLogin(user));
                    notyf.open({
                        type: "success",
                        message: "Đăng nhập thành công"
                    });
                    setLoggedIn(true);
                }
            });
        }
    };

    const register = () => {
        if (newEmail === "") {
            notyf.open({
                type: "error",
                message: "Thiếu email đăng ký",
            });
        } else {
            axios({
                method: "POST",
                url: url + "register",
                data: {
                    name: newName,
                    email: newEmail,
                    password: newPassword
                }
            }).then((res) => {
                console.log(res.data);
                if (res.data.check === true) {
                    const user = {
                        email: email,
                        token: res.data.token
                    };
                    dispatch(setLogin(user));
                    notyf.open({
                        type: "success",
                        message: "Đăng ký thành công"
                    });
                    setLoggedIn(true);
                }
            });
        }
    }

    return (
        <>
            {isLoggedIn === false && (
                <div className="cont">
                    <div className="form sign-in">
                        <h2>Niam Auth</h2>
                        <label>
                            <span>Email</span>
                            <input type="text"
                                   value={email}
                                   className="form-control"
                                   onChange={(e) => setEmail(e.target.value)}/>
                        </label>
                        <label>
                            <span>Password</span>
                            <input type="password"
                                   value={password}
                                   className="form-control"
                                   onChange={(e) => setPassword(e.target.value)}/>
                        </label>
                        <p className="forgot-pass"><a href={"/forgot"}>Quên mật khẩu</a></p>
                        <button type="button" className="submit" id="submitLoginBtn" onClick={checkLogin}>Đăng nhập</button>
                    </div>


                    <div className="sub-cont">
                        <div className="img">
                            <div className="img_text m--up">
                                <h2>Bạn muốn tạo tài khoản mới ?</h2>
                            </div>

                            <div className="img_text m--in">
                                <h2>Đã có tài khoản!</h2>
                            </div>

                            <div className="img_btn">
                                <span className="m--up">Đăng ký</span>
                                <span className="m--in">Đăng nhập</span>
                            </div>
                        </div>

                        <div className="form sign-up">
                            <h2>Tạo tài khoản mới:</h2>
                            <label><span>Name</span><input type="text" name="name" className="form-control" required
                                                           onChange={e => setNewName(e.target.value)}
                            /></label>
                            <label><span>Email</span><input id="email" type="email" name="email" className="form-control" required
                                                            onChange={e => setNewEmail(e.target.value)}
                            /></label>
                            <label><span>Password</span><input id="password" type="password" name="password" className="form-control" required
                                                              onChange={e => setNewPassword(e.target.value)}
                            /></label>
                            <button type="button" className="submit" id="submitSignupBtn" onClick={register}>Đăng ký</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Login;