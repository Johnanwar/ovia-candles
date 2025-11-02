'use server';

import { Cart } from '@/types';
import { CheckoutFormData } from '@/components/checkout';

const RECIPIENT_EMAIL = 'johnanwar30@gmail.com';

export async function sendOrderEmail(
  cart: Cart,
  customerData: CheckoutFormData,
  locale: string
): Promise<{ success: boolean; message: string }> {
  try {
    const currency = cart.items.length > 0 ? cart.items[0].product.currency : 'EGP';
    const shippingThreshold = 500;
    const shippingCost = cart.total >= shippingThreshold ? 0 : 50;
    const tax = cart.total * 0.1;
    const finalTotal = cart.total + shippingCost + tax;

    const isRTL = locale === 'ar';
    const orderDate = new Date().toLocaleString(locale === 'ar' ? 'ar-EG' : 'en-US');

    // Build order items HTML
    const orderItems = cart.items.map(item => {
      const productName = isRTL ? item.product.nameAr : item.product.name;
      const itemTotal = item.product.price * item.quantity;
      
      return `
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${productName}</td>
          <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; text-align: center;">${item.quantity}</td>
          <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; text-align: right;">${item.product.price.toLocaleString()} ${currency}</td>
          <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; text-align: right; font-weight: bold;">${itemTotal.toLocaleString()} ${currency}</td>
        </tr>
      `;
    }).join('');

    // Email HTML content
    const emailHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>New Order - ${cart.itemCount} Items</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0; font-size: 24px;">🛍️ New Order Received</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Order Date: ${orderDate}</p>
          </div>

          <div style="background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; border-top: none;">
            <h2 style="margin-top: 0; color: #111827; border-bottom: 2px solid #667eea; padding-bottom: 10px;">
              Customer Information
            </h2>
            <table style="width: 100%; margin-bottom: 20px;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; width: 150px;">Name:</td>
                <td style="padding: 8px 0;">${customerData.name}</td>
              </tr>
              ${customerData.email ? `
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Email:</td>
                <td style="padding: 8px 0;">${customerData.email}</td>
              </tr>
              ` : ''}
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Mobile:</td>
                <td style="padding: 8px 0;">${customerData.mobile}</td>
              </tr>
            </table>

            <h3 style="margin-top: 20px; color: #111827; border-bottom: 2px solid #667eea; padding-bottom: 10px;">
              Delivery Address
            </h3>
            <p style="margin: 10px 0;">
              ${customerData.address.address1}<br>
              ${customerData.address.address2 ? customerData.address.address2 + '<br>' : ''}
              ${customerData.address.city}, ${customerData.address.state}${customerData.address.zipCode ? ' ' + customerData.address.zipCode : ''}${customerData.address.country ? '<br>' + customerData.address.country : ''}
            </p>
          </div>

          <div style="background: white; padding: 20px; border: 1px solid #e5e7eb; border-top: none;">
            <h2 style="margin-top: 0; color: #111827; border-bottom: 2px solid #667eea; padding-bottom: 10px;">
              Order Items
            </h2>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <thead>
                <tr style="background: #f3f4f6;">
                  <th style="padding: 10px; text-align: left; border-bottom: 2px solid #e5e7eb;">Product</th>
                  <th style="padding: 10px; text-align: center; border-bottom: 2px solid #e5e7eb;">Qty</th>
                  <th style="padding: 10px; text-align: right; border-bottom: 2px solid #e5e7eb;">Price</th>
                  <th style="padding: 10px; text-align: right; border-bottom: 2px solid #e5e7eb;">Total</th>
                </tr>
              </thead>
              <tbody>
                ${orderItems}
              </tbody>
            </table>

            <div style="background: #f9fafb; padding: 15px; border-radius: 6px; margin-top: 20px;">
              <table style="width: 100%;">
                <tr>
                  <td style="padding: 8px 0; font-weight: bold;">Subtotal:</td>
                  <td style="padding: 8px 0; text-align: right; font-weight: bold;">${cart.total.toLocaleString()} ${currency}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0;">Shipping:</td>
                  <td style="padding: 8px 0; text-align: right;">${shippingCost === 0 ? 'FREE' : `${shippingCost.toLocaleString()} ${currency}`}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0;">Tax (10%):</td>
                  <td style="padding: 8px 0; text-align: right;">${tax.toLocaleString()} ${currency}</td>
                </tr>
                <tr style="border-top: 2px solid #667eea;">
                  <td style="padding: 12px 0; font-size: 18px; font-weight: bold; color: #667eea;">Total:</td>
                  <td style="padding: 12px 0; text-align: right; font-size: 18px; font-weight: bold; color: #667eea;">${finalTotal.toLocaleString()} ${currency}</td>
                </tr>
              </table>
            </div>
          </div>

          <div style="background: #f9fafb; padding: 15px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px; text-align: center; color: #6b7280; font-size: 14px;">
            <p style="margin: 0;">This is an automated order notification email.</p>
          </div>
        </body>
      </html>
    `;

    // For now, we'll use a simple approach
    // In production, you would use a service like Resend, SendGrid, or nodemailer
    // This is a placeholder that logs the email content
    // You'll need to configure your email service provider
    
    // Using fetch to send email via a service or API route
    // For this example, we'll create an API route that handles the email sending
    
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/send-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: RECIPIENT_EMAIL,
        subject: `New Order - ${cart.itemCount} Items - ${customerData.name}`,
        html: emailHTML,
        text: `New order received from ${customerData.name}${customerData.email ? ' (' + customerData.email + ')' : ''}. Order total: ${finalTotal.toLocaleString()} ${currency}`,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to send email');
    }

    return {
      success: true,
      message: 'Order email sent successfully',
    };
  } catch (error) {
    console.error('Error sending order email:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to send order email',
    };
  }
}

