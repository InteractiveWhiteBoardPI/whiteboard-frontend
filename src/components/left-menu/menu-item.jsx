const MenuItem = ({icon, content, selected= false, small = false, onClick}) => {
    return ( 
        <div 
          onClick={onClick}
          className={`flex items-center gap-5 cursor-pointer  ${!small & "text-xl"} ${selected && 'border-r-[3px] border-white'}`}>
          {icon}
          <div className={small ? "text-sm" : "text-normal"}>{content}</div>
        </div>
     );
}
 
export default MenuItem;