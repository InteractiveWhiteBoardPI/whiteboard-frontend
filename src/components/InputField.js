import React, {useState} from "react";

export default function InputField({title,type}) {
    
    const [inputValue, setInputValue] = useState('');
  
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };
    
    return(
        <div className="mt-[3%] ml-auto mr-auto border-b border-solid border-white shadow-xs border-b-[1px_solid_#FFF] flex w-[90%] px-[12px] py-[8px] items-center gap-[8px] self-stretch">
            <div  className={`bg-clip-text text-transparent bg-[linear-gradient(108deg,_#F9FDFF_0.9%,_rgba(160,_160,_160,_0.90)_100.9%)] bg-clip-text font-[Inter] text-[16px] not-italic font-normal leading-[24px] absolute ${inputValue ? 'invisible' : 'visible'}`}>
                {title}
            </div>
            <input type={type} className="font-inter text-base font-normal text-[16px] w-[100%] bg-transparent text-white text-bg-transparent border-b-0 focus:border-none focus:outline-none text-black bg-blue-50" value={inputValue} onChange={handleInputChange}/>
        </div>
    )
}