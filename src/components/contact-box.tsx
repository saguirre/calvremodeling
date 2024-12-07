import Mail from "../icons/mail.tsx";
import Phone from "../icons/phone.tsx";
import Web from "../icons/web.tsx";

const ContactInfo = () => {
  return (
    <div className="col-span-1 bg-primary-300 rounded-[30px] px-8 py-[76px] flex flex-col gap-[30px] w-full">
      <h5 className="flex flex-col xl:flex-row gap-4 items-center text-xl font-jost tracking-tight">
        <Phone /> Primary: (754) 231-5401
      </h5>
      <h5 className="flex flex-col xl:flex-row gap-4 items-center text-xl font-jost tracking-tight">
        <Phone /> Secondary: (786) 319-1849
      </h5>
      <h5 className="flex flex-col xl:flex-row gap-4 items-center text-xl font-jost tracking-tight">
        <Mail /> info@calvremodeling.com
      </h5>
      <h5 className="flex flex-col xl:flex-row gap-4 items-center text-xl font-jost tracking-tight">
        <Web /> www.calvremodeling.com
      </h5>
      <div className="pt-4 text-xl font-jost tracking-tight">
        <p className="mb-2">Serving Miami and South Florida:</p>
        <ul className="list-disc pl-6">
          <li>Miami Beach</li>
          <li>Coral Gables</li>
          <li>Brickell</li>
          <li>Downtown Miami</li>
          <li>And surrounding areas</li>
        </ul>
      </div>
      <p className="text-xl font-jost tracking-tight pt-2">
        20+ Years of Excellence in Home Remodeling
      </p>
    </div>
  );
};

export default ContactInfo;
