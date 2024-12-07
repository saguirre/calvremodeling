export const onRequestPost: PagesFunction = async (context) => {
  try {
    console.log('Request received:',);
    const formData = await context.request.formData();

    const name = formData.get('name')?.toString();
    const email = formData.get('email')?.toString();
    const subject = formData.get('subject')?.toString();
    const phone = formData.get('phone')?.toString();
    const message = formData.get('message')?.toString();

    // Input validation
    if (!name || !email || !subject || !message) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Please fill in all required fields',
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const emailContent = `
        New Contact Form Submission
        
        Name: ${name}
        Email: ${email}
        Subject: ${subject}
        Phone: ${phone || 'Not provided'}
        Message: ${message}
      `;

    // Send email using MailChannels
    const response = await fetch('https://api.mailchannels.net/tx/v1/send', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        personalizations: [
          {
            to: [{ email: 'info@calvremodeling.com', name: 'CALV Remodeling' }],
          },
        ],
        from: {
          email: `contact-form@${context.request.headers.get('host')}`,
          name: 'CALV Remodeling Contact Form',
        },
        subject: `New Contact Form Submission: ${subject}`,
        content: [
          {
            type: 'text/plain',
            value: emailContent,
          },
          {
            type: 'text/html',
            value: `
                <html>
                  <body>
                    <h2>New Contact Form Submission</h2>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Subject:</strong> ${subject}</p>
                    <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
                    <p><strong>Message:</strong></p>
                    <p>${message.replace(/\n/g, '<br>')}</p>
                  </body>
                </html>
              `,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.error || 'Failed to send email');
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Email error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Failed to send message. Please try again.',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
