export function Topbar() {
    return (
        <div className="flex border-b border-black bg-white">
            <div className={"grow flex gap-2 space-between items-center p-4"}>
                <img src="/img/Logo.png" alt="scada-logo" className="w-12"/>
                <p>SCADA ONLINE</p>
            </div>
        </div>
    )
}