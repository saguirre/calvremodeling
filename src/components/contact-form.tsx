import Button from "./button.tsx";
import { useState } from "react";

const ContactForm = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const formData = new FormData(e.currentTarget);
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Failed to send message');
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage('Failed to send message. Please try again.');
    }
  };

  return (
    <div className="col-span-1 lg:col-span-2">
      <form onSubmit={handleSubmit} className="w-full grid grid-cols-2 gap-x-10 gap-y-[50px]">
        <label htmlFor="name">
          <input
            type="text"
            name="name"
            className="pl-4 col-span-1 border-b w-full border-black outline-none py-3 text-base lg:text-[22px] lg:leading-[33px] tracking-tight font-jost text-text-gray"
            placeholder="Name"
          />
        </label>
        <label htmlFor="email">
          <input
            type="email"
            name="email"
            className="pl-4 col-span-1 border-b w-full border-black outline-none py-3 text-base lg:text-[22px] lg:leading-[33px] tracking-tight font-jost text-text-gray"
            placeholder="Email"
          />
        </label>
        <label htmlFor="subject">
          <input
            type="text"
            name="subject"
            className="pl-4 col-span-1 border-b w-full border-black outline-none py-3 text-base lg:text-[22px] lg:leading-[33px] tracking-tight font-jost text-text-gray"
            placeholder="Subject"
          />
        </label>
        <label htmlFor="phone">
          <input
            type="number"
            name="phone"
            className="pl-4 col-span-1 border-b w-full border-black outline-none py-3 text-base lg:text-[22px] lg:leading-[33px] tracking-tight font-jost text-text-gray"
            placeholder="Phone"
          />
        </label>
        <textarea
          name="message"
          className="pl-4 col-span-2 border-b w-full border-black outline-none py-3 text-base lg:text-[22px] lg:leading-[33px] tracking-tight font-jost text-text-gray"
          cols={30}
          rows={10}
          placeholder="Hello, I am interested in..."
        ></textarea>

        <div className="w-full flex justify-end col-span-2 items-center gap-4">
          {status === 'success' && (
            <p className="text-green-600">Message sent successfully!</p>
          )}
          {status === 'error' && (
            <p className="text-red-600">{errorMessage}</p>
          )}
          <Button 
            text={status === 'loading' ? "Sending..." : "Submit"} 
            type="submit" 
            disabled={status === 'loading'}
          />
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
