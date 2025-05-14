const nodemailer = require('nodemailer');

// Create a transporter using Proton Mail SMTP
const transporter = nodemailer.createTransport({
  host: 'smtp.protonmail.ch',
  port: 587,
  secure: true,
  auth: {
    user: process.env.PROTON_EMAIL,
    pass: process.env.PROTON_APP_PASSWORD
  }
});

exports.handler = async function(event, context) {
  console.log('Webhook received:', event.body);

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    console.log('Invalid method:', event.httpMethod);
    return {
      statusCode: 405,
      body: 'Method Not Allowed'
    };
  }

  try {
    // Parse the Typeform webhook data
    const formData = JSON.parse(event.body);
    console.log('Parsed form data:', formData);
    
    // Format the email content
    const emailContent = formatEmailContent(formData);
    console.log('Formatted email content:', emailContent);
    
    // Send email
    const info = await transporter.sendMail({
      from: process.env.PROTON_EMAIL,
      to: 'support@charterteams.com',
      cc: ['admin@charterteams.com'],
      subject: 'New Charter Application Submission',
      html: emailContent
    });
    console.log('Email sent:', info);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Form submission received and email sent' })
    };
  } catch (error) {
    console.error('Error processing webhook:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
}

function formatEmailContent(formData) {
  // Extract answers from Typeform response
  const answers = formData.form_response.answers;
  
  // Create a beautiful HTML email template
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #003087;">New Charter Application</h2>
      <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px;">
        ${answers.map(answer => `
          <div style="margin-bottom: 15px;">
            <strong style="color: #003087;">${answer.field.title}:</strong>
            <p style="margin: 5px 0;">${answer.text || answer.choice?.label || answer.choices?.labels?.join(', ') || 'N/A'}</p>
          </div>
        `).join('')}
      </div>
      <p style="color: #666; font-size: 12px; margin-top: 20px;">
        This is an automated message from the Charter application system.
      </p>
    </div>
  `;
} 