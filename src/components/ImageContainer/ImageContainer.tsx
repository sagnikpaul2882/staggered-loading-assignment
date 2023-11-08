import React, { useEffect, useState } from "react"
import { Image } from "../Image/Image"
import { Arrow } from "../Arrows/Arrow";
import { MAX_IMAGES_COUNT } from "../../constants/image";
import { getImageURLFromIndex } from "../../helpers/imageHelper";
import { ARROWS } from "../../constants/arrows";

export const ImageContainer: React.FC = () => {
    const [index, updateIndex] = useState(1);
    const [imageURL, updateImageURL] = useState(getImageURLFromIndex(1));

    useEffect(() => {
        updateImageURL(getImageURLFromIndex(index));
    }, [index]);

    const onClickArrow = (increment: number) => {
        updateIndex(((index - 1 + increment + MAX_IMAGES_COUNT) % MAX_IMAGES_COUNT) + 1);
    }

    return (
        <div className="image-container">
            <Image image={imageURL} />
            <Arrow type={ARROWS.LEFT} onClickArrow={(val: number) => onClickArrow(val)} />
            <Arrow type={ARROWS.RIGHT} onClickArrow={(val: number) => onClickArrow(val)} />
        </div>
    )
}