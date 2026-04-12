"use server";

import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

const contactFormSchema = z.object({
    name: z.string().min(2, "Name is required").max(100),
    organization: z.string().max(100).optional(),
    email: z.string().email("Invalid email address"),
    phone: z.string().max(20).optional(),
    address: z.string().max(200).optional(),
    city: z.string().max(100).optional(),
    state: z.string().max(100).optional(),
    zip: z.string().max(20).optional(),
    subject: z.string().min(10, "Subject must be at least 10 characters").max(2000),
});

export type FormState = {
    success: boolean;
    message?: string;
    error?: string;
};

export const sendContactEmail = async (prevState: FormState, formData: FormData): Promise<FormState> => {
    try {

        const rawData = {
            name: formData.get("name"),
            organization: formData.get("organization"),
            email: formData.get("email"),
            phone: formData.get("phone"),
            address: formData.get("address"),
            city: formData.get("city"),
            state: formData.get("state"),
            zip: formData.get("zip"),
            subject: formData.get("subject"),
        };

        const validatedFields = contactFormSchema.safeParse(rawData);

        if (!validatedFields.success) {
            const fieldErrors = validatedFields.error.flatten().fieldErrors;
            const errorMessages = Object.values(fieldErrors).flat().join(", ");
            return {
                success: false,
                error: `Validation failed: ${errorMessages}`,
            };
        }

        const { name, organization, email, phone, address, city, state, zip, subject } = validatedFields.data;

        await resend.emails.send({
            from: "ALC Trading System <website@alctrading.com>",
            to: "frank@alctrading.com",
            replyTo: email,
            subject: `New Inquiry from ${name} via alctrading.com`,
            text: `
        Name: ${name}
        Organization: ${organization || "N/A"}
        Email: ${email}
        Phone: ${phone || "N/A"}
        Address: ${address || "N/A"}
        City: ${city || "N/A"}, State: ${state || "N/A"}, Zip: ${zip || "N/A"}

        Message:
        ${subject}
      `,
        });

        return {
            success: true,
            message: "Your inquiry has been sent successfully!",
        };
    } catch (error) {
        console.error("Failed to send email:", error);
        return {
            success: false,
            error: "An unexpected error occurred. Please try again later.",
        };
    }
};
