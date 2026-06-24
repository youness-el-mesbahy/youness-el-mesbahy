import React, { useState } from 'react';
import { Send, X } from "lucide-react";
import Input from './Input.jsx';
import TextArea from './TextArea.jsx';
import Button from './Button.jsx';
import Modal from './Modal.jsx'

const WEB3FORMS_KEY = "e5254867-504d-440b-9af1-bf4f4c4c73a3";

const ContactF = ({ closeBtn, onCancel }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState("idle");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("loading");

        const formData = new FormData();
        formData.append("access_key", WEB3FORMS_KEY);
        formData.append("name", name);
        formData.append("email", email);
        formData.append("message", message);

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                setStatus("success");
                setName("");
                setEmail("");
                setMessage("");
                setTimeout(() => setStatus("idle"), 3000);
            } else {
                setStatus("error");
                setTimeout(() => setStatus("idle"), 3000);
            }
        } catch {
            setStatus("error");
            setTimeout(() => setStatus("idle"), 3000);
        }
    };

    const submitText = status === "loading" ? "Sending..." : status === "success" ? "Sent!" : status === "error" ? "Failed!" : "Send";
    const submitVariant = status === "success" ? "primary" : status === "error" ? "primary" : "primary";

    return (
        <form
            id="contact-form"
            onSubmit={handleSubmit}
            className="py-6  px-16 max-[567px]:px-[3%] rounded-sm mx-auto w-1/2 max-[1153px]:w-2/3 max-[1116px]:w-3/4 max-[955px]:w-[93%]"
        >
            <div className="flex justify-between items-center">
                <h3 className="relative w-fit text-xl font-semibold after:content-[''] after:absolute after:left-0 after:-bottom-2 after:w-full after:h-[0.125rem] after:bg-primary">
                    Contact Me
                </h3>
                {closeBtn}
            </div>

            <div className="mt-12 grid grid-cols-1 min-[567px]:grid-cols-2 items-center gap-5">
                <Input label="Name" placeholder="Your Name" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                <Input label="Email" placeholder="Your Email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />

                <div className="col-span-1 min-[567px]:col-span-2">
                    <TextArea label="Message" placeholder="Your Message" id="message" value={message} onChange={(e) => setMessage(e.target.value)} />
                </div>

                <Button
                    id="contact-form-cancel-btn"
                    type="button"
                    variant="secondary"
                    onClick={onCancel}
                    disabled={status === "loading"}
                >
                    Cancel
                </Button>

                <Button type="submit" disabled={status === "loading"}>
                    <Send size="1.25rem" />
                    &nbsp;{submitText}
                </Button>
            </div>

            {status === "success" && (
                <p className="mt-4 text-center text-green-600 dark:text-green-400 font-semibold">
                    Message sent successfully!
                </p>
            )}
            {status === "error" && (
                <p className="mt-4 text-center text-red-600 dark:text-red-400 font-semibold">
                    Something went wrong. Please try again.
                </p>
            )}
        </form>
    );
};

export default ContactF;
