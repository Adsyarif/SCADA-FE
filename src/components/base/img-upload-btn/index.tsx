import { ImagePlus } from "lucide-react";
import { ImageUploadProps } from "./type";

export function ImgUpload(props: ImageUploadProps) {
    const {onChange, accept, multiple} = props
    return (
        <div>
            <label htmlFor="file-upload">
                <ImagePlus
                    className="cursor-pointer"
                />
            </label>
            <input
                id="file-upload"
                type="file"
                name={"img-upload"}
                className="hidden"
                onChange={onChange}
                accept={accept}
                multiple={multiple}
            />
        </div>
    )
}