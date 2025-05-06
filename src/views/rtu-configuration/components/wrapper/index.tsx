import { Title } from "@/components";

export function RTUConfigurationWrapper() {
    return (
        <div className="flex flex-col grow">
            <div className="grow flex justify-center items-center">
                <Title isButton text="RTU Configuration" />
            </div>
            <div className="grow bg-gray-200">
                <div className="grid grid-cols-4 gap-4 text-xs justify-items-center align-center p-8">
                    {/* Add your menu items here */}
                </div>
            </div>
        </div>
    )
}