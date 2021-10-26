import style from "./style.module.scss"
import { useSession, signIn } from "next-auth/client"
import { api } from "../../services/axios"
import { getStripeJs } from "../../services/stripe-js"
interface SubscribeProps {
    priceId: string
}
export function SubscribeBtn({ priceId }: SubscribeProps) {
    const [session] = useSession()
   async function handleSubscribe() {
        if (!session) {
            signIn("github")
            return
        }{
            try {
                const response = await api.post("/subscribe")
                const { sessionId } = response.data
                const stripe = await getStripeJs()
                await stripe.redirectToCheckout({sessionId})
            } catch (err) {
                alert(err.message)
          }
        }
    }
    return (
        <>
            <button type="button" className={style.subscribeBtn} onClick={handleSubscribe}>Assinar</button>
        </>    
    )
}