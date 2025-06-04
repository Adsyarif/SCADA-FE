import { Loader } from "lucide-react";

export function LoadingPage() {
    return (
        <div className="flex justify-center items-center min-h-screen w-full">
            <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 border-solid border-current border-t-transparent text-blue-600 rounded-full" role="status">
            </div>
        </div>
    )
}