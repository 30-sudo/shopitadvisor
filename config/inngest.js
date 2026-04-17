// src/inngest/client.ts
import { Inngest } from "inngest";

export const inngest = new Inngest({ id: "shopitadvisor-next" });
// inngest function to save user data to database

export const syncUserCreation = inngest.createFunction(
    { id: "sync-user-from-clerk" },
    { event: "clerk/user.created" },
    async ({ event}) => {
        const{ id, first_name, last_name, email_addresses, profile_image_url } = event.data;
        const userData = {_id:id,email_addresses:email_addresses[0].email_address,
            name:first_name+" "+last_name,
            imageUrl:image_url
        }
        await connectDB();
        await User.create(userData);
    }
    
)

// inngest function to update user data in database on update

export const syncUserUpdation = inngest.createFunction(
    { id: "update-user-from-clerk-update" },
    { event: "clerk/user.updated" },
    async ({ event}) => {
        const{ id, first_name, last_name, email_addresses, profile_image_url } = event.data;
        const userData = {_id:id,email_addresses:email_addresses[0].email_address,
            name:first_name+" "+last_name,
            imageUrl:image_url
        }
        await connectDB();
        await User.findByIdAndUpdate(id, userData);
    }
    
)
// Inngest function to delete user data from database on user deletion

export const syncUserDeletion = inngest.createFunction(
    { id: "delete-user-from-clerk-delete" },
    { event: "clerk/user.deleted" },
    async ({ event}) => {
        const{ id } = event.data;
        await connectDB();
        await User.findByIdAndDelete(id);
    }
)