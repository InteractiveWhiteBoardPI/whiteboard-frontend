import React from "react";

export default function Button({title,width,height,text,onclick,typ}) {
    return(
        <button type={typ} onClick={onclick} className={"mr-auto ml-auto rounded-[10px] border-[0.5px] border-[solid] border-[#FFF] bg-[rgba(255,_255,_255,_0.20)] flex text-justify-center  justify-between items-center w-["+width+"%] h-["+height+"%]"}>
            <div className={text}>
                {title}
            </div>
        </button>
    )
}