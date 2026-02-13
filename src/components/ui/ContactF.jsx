import React from 'react';
import { Send, X } from "lucide-react";
import Input from './Input.jsx';
import TextArea from './TextArea.jsx';
import Button from './Button.jsx';
import Modal from './Modal.jsx'

const ContactF = ({ closeBtn, onCancel }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log("Form submitted");
    };

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
                <Input label="Name" placeholder="Your Name" id="name" />
                <Input label="Email" placeholder="Your Email" id="email" />

                <div className="col-span-1 min-[567px]:col-span-2">
                    <TextArea label="Message" placeholder="Your Message" id="message" />
                </div>

                <Button
                    id="contact-form-cancel-btn"
                    type="button"
                    variant="secondary"
                    onClick={onCancel}
                >
                    Cancel
                </Button>

                <Button type="submit">
                    <Send size="1.25rem" />
                    &nbsp;Send
                </Button>
            </div>
        </form>
    );
};

export default ContactF;
