import React,{useState} from "react";
import InputField from "../components/InputField";
import Button from "../components/Button";

export default function AuthentificationPage() {

    const [isRegistrationView, setIsRegistrationView] = useState(false);

    const [bigTitle, setBigTitle] = useState("New user ? Hello!");

    const [smallTitle, setSmallTitle] = useState("please enter your personal informations to sign up :");

    const [fieldTitle, setFieldTitle] = useState("Login to your account");

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
      });
    
      
    
      const getInfo = (event) => {
        const { name, value } = event.target;
    
        setFormData({
          ...formData,
          [name]: value,
        });
        console.log(formData);
      };
    

    const toggleView = () => {
        setIsRegistrationView((prev) => !prev);
    };

    const toggleTitles = () => {
        if (!isRegistrationView) {
            setBigTitle("Welcome back!");
            setSmallTitle("Please sign in with your account's informations :");
            setFieldTitle("Create a new account");
        } else {
            setBigTitle("New user ? Hello!");
            setSmallTitle("Please enter your personal informations to sign up :");
            setFieldTitle("Login to your account");
        }
    };

    const toggle = () => {
        toggleView();
        toggleTitles();
    }

    


    return(
        <body className="bg-[#6A6A6A] flex  h-[100vh]">
            <div className="ml-auto mr-auto mb-auto mt-auto inline-block rounded-[25px] bg-[rgba(0,_0,_0,_0.70)] backdrop-filter-[12px] bg-opacity-50 flex w-[85vw] h-[80vh] p-[2%]">
                <div className="flex absolute w-[80vw] h-[6%] justify-between ">
                    <div className="text-[#FFF] font-[Manrope] text-[28px] not-italic font-extrabold leading-[normal]">
                                Teamboard
                    </div>
                    <button class="flex items-center justify-center gap-2 bg-black rounded-lg w-[10%] h-[100%] ">
                        <div className="text-white font-manrope text-md font-extrabold leading-normal">Explore</div>
                    </button>
                </div>

                <div className="mt-[5%] ml-auto mr-auto flex rounded-[2.5%] border-[1px] border-white bg-gradient-to-br bg-gradient-to-br from-[rgba(0,0,0,0.65)] to-[rgba(0,0,0,0.08)] backdrop-filter-[12px] w-[60vw] h-[60vh] ">
                        <div className="flex  w-[30vw] h-[50vh] px-[2%] py-[103px] flex-col justify-center items-center gap-[10px] border-r-[0.5px_solid_#FFF]">
                            <div className="text-[#FFF] font-[Manrope] text-[32px] not-italic font-extrabold leading-[normal]">
                                {bigTitle}
                            </div>
                            <div className="text-[rgba(255,_255,_255,_0.80)] font-[Manrope] text-[14px] not-italic font-extrabold leading-[normal]">
                                {smallTitle}
                            </div>
                            {<Button title={!isRegistrationView ? "R E G I S T E R" : "L O G I N"} height="20" width="60" text="mr-auto ml-auto text-[#FFF] text-[16px] w-[10vw] not-italic font-normal leading-[24px]" onclick={toggle}/>}
                        </div>
                        <div className="border-white  flex w-[30vw] h-[60vh] pl-0 pr-0 py-[11px] flex-col  items-center">
                            <div className="text-[#FFF] mt-[2%] text-center font-[Manrope] text-[24px] not-italic font-extrabold leading-[normal] mb-[2%]">
                                {fieldTitle}
                            </div>
                            <div className="w-[100%]  border-l-[0.5px] border-solid border-white h-[80%]">
                                <form onSubmit={getInfo}>
                                    <InputField title="Email" type="email" valeur={formData.email}></InputField>
                                    <InputField title="Password" type="password" valeur={formData.password}></InputField>
                                    {isRegistrationView && <InputField title="Confirm password" type="password" valeur={formData.confirmPassword}></InputField>}
                                    <div className="mb-[8%]"></div>
                                    <div className="flex">
                                        <div className="text-white font-inter text-md font-normal leading-6 mt-[-5%] mb-[4%] ml-auto mr-[5%]">Have already an account?</div>
                                    </div>
                                    <Button title={isRegistrationView ? "S I G N  U P" : "L O G I N"} height="13" width="90" text="ml-auto mr-auto justify-center text-white text-center font-inter text-md font-normal " onclick={getInfo} typ="submit"/>
                                </form>
                                <div className="flex ml-auto mr-auto mt-auto mb-auto w-[90%] h-[10%] pt-1 justify-center items-center flex-shrink-0">
                                    <div className="fill-current w-[100%] text-white stroke-current stroke-1 mt-[20%]">
                                        <div>
                                            <div className=" flex w-[100%] h-[10%] pt-1 justify-center items-center flex-shrink-0 ">
                                                <div class="w-[45%] h-[1px] bg-white "/>
                                                <div >
                                                    <div class="w-8 h-8 bg-white bg-opacity-20 border-[1px] border-white rounded-full">
                                                        <div class="text-white mt-auto mb-auto text-center font-inter text-[18px] font-normal leading-12  justify-center">
                                                            Or
                                                        </div>
                                                        <div></div>
                                                    </div>
                                                </div>
                                                <div class="w-[45%] h-[1px] bg-white"/>
                                            </div>
                                            <div className="flex justify-between ml-[30%] mr-[30%] mt-[3%]">
                                                <img src="icons/facebook.svg"/>
                                                <img src="icons/google.svg"/>
                                                <img src="icons/github.svg"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        </body>
    )
}