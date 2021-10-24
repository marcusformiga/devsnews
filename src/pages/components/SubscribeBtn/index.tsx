import style from "./style.module.scss"

interface SubscribeProps {
    priceId: string
}
export function SubscribeBtn({priceId}: SubscribeProps) {
    return (
        <>
            <button type="button" className={style.subscribeBtn}>Assinar</button>
        </>    
    )
}