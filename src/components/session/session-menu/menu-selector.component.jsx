const MenuSelector = ({className,icon, onClick}) => {
    return (
        <button
            onClick={onClick} 
            className={`rounded-3xl  bg-dark-clr-50 bg-opacity-50  flex justify-center items-center p-5 h-3/4 ${className}`}>
            {icon}
        </button>
    );
}

export default MenuSelector;