import React, { useState } from 'react'
import { useSendEmailLinkUserPasswordMutation } from '../../../services/userAuthAPI';
import { useRouter } from 'next/navigation';

const PinLink = () => {
    const [email, setEmail] = useState('');
    const Navigate = useRouter();
    // Feedback states
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState("");
    const [SendEmailLinkUserPassword, { isLoading }] = useSendEmailLinkUserPasswordMutation();
    const EmailPinSubmit = async (e) => {
        e.preventDefault();

        const res = await SendEmailLinkUserPassword({ email });
        if (res.error) {
            setErrors(res?.error?.data?.errors || { apiError: res?.error?.data?.errors || 'Something went wrong.' })
            setSuccessMessage({})
            //setServerMsg({})  this mean 
        }
        if (res.data) {
            setSuccessMessage(res.data.msg)
            setErrors({})
            setEmail('');
        }

    };
    return (
        <>
            <form className=" container flex flex-col" component='form' noValidate onSubmit={EmailPinSubmit}>
                {errors.email ? <p style={{ fontSize: 12, color: 'red' }}>{errors.email[0]}</p> : ""}
                {successMessage.email ? <p style={{ fontSize: 12, color: 'red' }}>{successMessage.email[0]}</p> : ""}
                {errors.non_field_errors ? <p severity='error'>{errors.non_field_errors[0]}</p> : ""}
                <div className="mb-6">
                    <label htmlFor="email" className="text-white block mb-2 text-sm font-medium">
                        Your Email
                    </label>
                    <input
                        name="email"
                        type="email"
                        id="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-white text-sm rounded-lg block w-full p-2.5"
                        placeholder="your@email.com"
                    />
                </div>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-[#8B5CF6] hover:bg-purple-700 text-white font-medium py-2.5 px-5 rounded-lg w-full"
                >
                    {isLoading ? "Link sending..." : "send"}
                </button>
            </form>
        </>
    )
};

export default PinLink