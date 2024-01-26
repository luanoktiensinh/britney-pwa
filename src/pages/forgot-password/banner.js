import React from "react";
import Banner from 'src/images/ForgotPassword/banner.png'
const LoginBanner = () => {
    return (
        <div className="min-h-[400px] lg_min-h-[900px] flex">
            <img src={Banner} alt="login banner" className="w-full object-cover"/>
        </div>
    )

}
export default LoginBanner;