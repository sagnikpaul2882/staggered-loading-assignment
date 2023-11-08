import React from "react"
import { IArrowProps } from "../../interfaces/IArrowProps"
import { ARROWS } from "../../constants/arrows"

export const Arrow: React.FC<IArrowProps> = (props: IArrowProps) => {
    return (
        <div className={props.type + " arrow"} onClick={() => { props.onClickArrow(props.type === ARROWS.LEFT ? -1 : 1) } }>
            <span>&#x2794;</span>
        </div>
    )
}