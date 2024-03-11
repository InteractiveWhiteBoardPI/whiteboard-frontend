import { ToastContainer } from "react-toastify";
const ToastDisplayer = () => {
    return (
        <ToastContainer
            hideProgressBar={false}
            autoClose={5000}
            position={"top-center"}
            theme={"dark"}
        />
    );
}

export default ToastDisplayer;