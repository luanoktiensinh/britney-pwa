import React, { useMemo } from "react";
import MemberImg from 'src/images/Register/Benefits/members.png';
import CompetitionsImg from 'src/images/Register/Benefits/competitions.png';
import EarlyAccessImg from 'src/images/Register/Benefits/early-access.png';
import FastCheckoutImg from 'src/images/Register/Benefits/fast-checkout.png';
import OrderHistoryImg from 'src/images/Register/Benefits/order-history.png';
import ReturnsImg from 'src/images/Register/Benefits/returns.png';
const Benefits = () => {
    const benefits = useMemo(() => [
        { title: 'Member Offers', 'desc': 'Briscoes members get exclusive monthly offers delivered straight into your inbox', image: MemberImg },
        { title: 'Competitions', 'desc': 'Member only competitions and prize draws, exclusively for Briscoes Club ', image: CompetitionsImg },
        { title: 'Fast Checkout', 'desc': 'Save your details under your account and you\'ll fly through the checkout', image: FastCheckoutImg },
        { title: 'Easy Returns', 'desc': 'Need to return or exchange? No problem, members can easily start a return through your account', image: ReturnsImg },
        { title: 'Early Access', 'desc': 'Members get early access to some of our biggest sale events of the year!', image: EarlyAccessImg },
        { title: 'Order History', 'desc': 'All your past orders are saved under your account so you can easily view and download receipts', image: OrderHistoryImg },
    ], [])
    return (
        <div className="bg-primary-500 lg_h-full flex items-center flex-col pt-15 lg_pt-[130px]">
            <h2 className="text-[22px] leading-[1.5] text-white mb-7.5 font-bold">Club Benefits</h2>
            <div className="mx-auto max-w-[502px] flex flex-wrap text-white">
                {
                    benefits.map(benefit => (
                        <div key={benefit.title} className="mb-7.5 px-4 w-1/2 text-center">
                            <img className="w-auto h-15 inline-block" src={benefit.image} alt={benefit.title}/>
                            <div className="mt-2.5 font-bold">{benefit.title}</div>
                            <div className="text-sm">{benefit.desc}</div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
export default Benefits;