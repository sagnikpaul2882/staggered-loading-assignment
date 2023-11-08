import React from "react"
import { IImageProps } from "../../interfaces/IImageProps"

export const Image: React.FC<IImageProps> = (props: IImageProps) => {
    return (
        <img src={props.image} alt="Image" className="image" />
    )
}