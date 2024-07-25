import ReactionError from "@reactioncommerce/reaction-error";

export default {
    Mutation: {
        async sendFeedBackFrom(_, { name, phoneNumber, experience, likeLihood, productQuality, customerService, deliveryTimeSatisfaction, feedBack, }, context, info) {
            const {
                collections: { Shops },
            } = context;
            const shop = await Shops.findOne({ shopType: "primary" });
            if (!shop) throw new ReactionError("not-found", "Shop not found");
            const emailBody = `Name: ${name}\nPhone Number: ${phoneNumber}
            \nOverall Experience with Bizb: ${experience}
            \nLikelihood of recommending BizB: ${likeLihood}
            \nProduct quality satisfaction: ${productQuality}
            \nCustomer service responsiveness: ${customerService}
            \nDelivery time satisfaction: ${deliveryTimeSatisfaction}
            \nFeedBack: ${feedBack}`;
            const sendEmailResult = await context.mutations.sendEmail(context, {
                to: shop.emails[0].address,
                data: emailBody,
                subject: "Feedback Form Submission",
                fromShop: shop,
            })
            if (sendEmailResult) {
                return true;
            } else {
                throw new ReactionError("Failed", "Failed to send email. Try again later");
            }
        }
    }
}