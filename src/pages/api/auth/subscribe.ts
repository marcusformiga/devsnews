import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "../../../services/stripe";
import {getSession} from "next-auth/client"

export default async (request: NextApiRequest, response: NextApiResponse) => {
    const session = await getSession({ request })
    const stripeCustomer = await stripe.customers.create({
        email: session.user.email
    })
    if (request.method === "POST") {
        const stripeCheckOutSession = await stripe.checkout.sessions.create({
            customer: stripeCustomer.id,
            payment_method_types: ["card"],
            billing_address_collection: "required",
            line_items: [
                {price: "price_1JnpYiAHtfowqU82iNqujlup", quantity: 1}
            ],
            mode: "subscription",
            allow_promotion_codes: true,
            success_url: process.env.SUCCESS_URL,
            cancel_url: process.env.CANCEL_URL
        })
        return response.status(201).json({sessionId: stripeCheckOutSession.id})
    } else {
        response.setHeader("Allow", "POST")
        response.status(405).end("Method not allowed")
    }
}
