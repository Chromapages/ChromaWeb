import { contactSchema } from "@/lib/validation/contact";
import sgMail from "@sendgrid/mail";

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  const parsed = contactSchema.safeParse(payload);

  if (!parsed.success) {
    return Response.json(
      {
        success: false,
        message: "Invalid form submission.",
        errors: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  if (parsed.data.honeypot) {
    return Response.json(
      {
        success: false,
        message: "Invalid form submission.",
      },
      { status: 400 },
    );
  }

  const referer = request.headers.get("referer");
  const sourcePage = referer ? new URL(referer).pathname : undefined;
  const apiKey = process.env.SENDGRID_API_KEY;
  const fromEmail = process.env.CONTACT_EMAIL_FROM || "hello@chromapages.com";
  const toEmail = process.env.CONTACT_EMAIL_TO || fromEmail;

  if (apiKey) {
    sgMail.setApiKey(apiKey);
    
    const msg = {
      to: toEmail,
      from: fromEmail,
      subject: `New Inquiry from ${parsed.data.name} via Chromapages`,
      replyTo: parsed.data.email,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a1a;">
          <h2 style="border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">New Inquiry</h2>
          <p><strong>Name:</strong> ${parsed.data.name}</p>
          <p><strong>Email:</strong> ${parsed.data.email}</p>
          <p><strong>Company:</strong> ${parsed.data.company || "N/A"}</p>
          <p><strong>Website:</strong> ${parsed.data.website || "N/A"}</p>
          <hr />
          <p><strong>Project Type:</strong> ${parsed.data.projectType}</p>
          <p><strong>Budget Range:</strong> ${parsed.data.budgetRange}</p>
          <p><strong>Timeline:</strong> ${parsed.data.timeline}</p>
          <hr />
          <p><strong>Message:</strong></p>
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px;">
            ${parsed.data.message.replace(/\n/g, "<br />")}
          </div>
          <p style="font-size: 12px; color: #6b7280; margin-top: 40px;">
            Submitted from ${sourcePage} at ${new Date().toLocaleString()}
          </p>
        </div>
      `,
    };

    try {
      await sgMail.send(msg);
    } catch (error) {
      console.error("SendGrid error:", error);
      // Fallback to local logging if direct send fails
    }
  }

  // Still support webhook as a secondary notification channel if configured
  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
  if (webhookUrl) {
    let body = JSON.stringify({
      ...parsed.data,
      sourcePage,
    });

    // Special formatting for Discord webhooks
    if (webhookUrl.includes("discord.com/api/webhooks")) {
      body = JSON.stringify({
        username: "Chromapages Leads",
        avatar_url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://chromapages.com"}/og-image.png`,
        embeds: [
          {
            title: "🚀 New Inquiry Received",
            color: 3447003, // Blue-ish
            fields: [
              { name: "Name", value: parsed.data.name, inline: true },
              { name: "Email", value: parsed.data.email, inline: true },
              { name: "Company", value: parsed.data.company || "N/A", inline: true },
              { name: "Project", value: parsed.data.projectType, inline: true },
              { name: "Budget", value: parsed.data.budgetRange, inline: true },
              { name: "Timeline", value: parsed.data.timeline, inline: true },
              { name: "Message", value: parsed.data.message },
            ],
            footer: {
              text: `Submitted from ${sourcePage} • ${new Date().toLocaleString()}`,
            },
          },
        ],
      });
    }

    await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    }).catch((err) => console.error("Webhook error:", err));
  }

  if (!apiKey && !webhookUrl) {
    console.info("Contact inquiry received (local only)", {
      ...parsed.data,
      sourcePage,
    });
  }

  return Response.json({
    success: true,
    message: "Inquiry received successfully.",
  });
}
