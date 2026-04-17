import { Inngest } from "inngest";
import connectDB from "@/config/db";
import User from "@/models/user";

export const inngest = new Inngest({ id: "shopitadvisor-next" });

export const syncUserCreation = inngest.createFunction(
    { id: "sync-user-from-clerk", triggers: { event: "clerk/user.created" } },
    async ({ event }) => {
        const { id, first_name, last_name, email_addresses, profile_image_url } = event.data;
        const userData = {
            _id: id,
            email: email_addresses[0].email_address,
            name: first_name + " " + last_name,
            imageUrl: profile_image_url,
        };
        await connectDB();
        await User.create(userData);
    }
)

export const syncUserUpdation = inngest.createFunction(
    { id: "update-user-from-clerk-update", triggers: { event: "clerk/user.updated" } },
    async ({ event }) => {
        const { id, first_name, last_name, email_addresses, profile_image_url } = event.data;
        const userData = {
            email: email_addresses[0].email_address,
            name: first_name + " " + last_name,
            imageUrl: profile_image_url,
        };
        await connectDB();
        await User.findByIdAndUpdate(id, userData);
    }
)

export const syncUserDeletion = inngest.createFunction(
    { id: "delete-user-from-clerk-delete", triggers: { event: "clerk/user.deleted" } },
    async ({ event }) => {
        const { id } = event.data;
        await connectDB();
        await User.findByIdAndDelete(id);
    }
)