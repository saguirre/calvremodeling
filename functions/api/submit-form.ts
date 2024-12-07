interface Env {
  CLOUDFLARE_EMAIL_TOKEN: string; // You'll set this in Cloudflare dashboard
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const formData = await context.request.formData();
    
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const phone = formData.get('phone');
    const message = formData.get('message');

    const emailContent = `
      New Contact Form Submission
      
      Name: ${name}
      Email: ${email}
      Subject: ${subject}
      Phone: ${phone}
      Message: ${message}
    `;

    const response = await fetch('https://api.mailchannels.net/tx/v1/send', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        personalizations: [
          {
            to: [{ email: 'info@calvremodeling.com', name: 'Calv Remodeling' }],
          },
        ],
        from: {
          email: 'noreply@yourdomain.com',
          name: 'Contact Form',
        },
        subject: `New Contact Form Submission: ${subject}`,
        content: [
          {
            type: 'text/plain',
            value: emailContent,
          },
        ],
      }),
    });

    if (response.ok) {
      return new Response(JSON.stringify({ success: true }), {
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      throw new Error('Failed to send email');
    }
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
} 