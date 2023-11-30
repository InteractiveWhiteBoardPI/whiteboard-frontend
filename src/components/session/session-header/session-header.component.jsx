const SessionHeader = () => {
    return (
        <div className="bg-dark-clr-50 rounded-3xl py-4 px-6 h-1/6 flex flex-col justify-between">
            <div className="flex w-full justify-between font-semibold">
                <h1>Daily StandUp Meeting</h1>
                <div className="flex gap-6">
                    <span>Time</span>
                    <span>00:12:00</span>
                </div>
            </div>

            <p>30 Novembre 2023</p>
        </div>
    );
}

export default SessionHeader;