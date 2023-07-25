export const jwtConstants = {
  secret: 'JWT secret',
};

export const getEmailContent = (url, capcha) => {
  return `<body style="background-color: #e9ecef;">

<!-- start preheader -->
<div class="preheader" style="display: none; max-width: 0; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #fff; opacity: 0;">
  A preheader is the short summary text that follows the subject line when an email is viewed in the inbox.
</div>
<!-- end preheader -->

<!-- start body -->
<table border="0" cellpadding="0" cellspacing="0" width="100%" style="padding: 30px;">
  <!-- start hero -->
  <tr>
    <td align="center" bgcolor="#e9ecef">
      <!--[if (gte mso 9)|(IE)]>
      <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
      <tr>
      <td align="center" valign="top" width="600">
      <![endif]-->
      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
        <tr>
          <td align="left" bgcolor="#ffffff" style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;">
            <h1 style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">Confirm Your Email Address</h1>
          </td>
        </tr>
      </table>
      <!--[if (gte mso 9)|(IE)]>
      </td>
      </tr>
      </table>
      <![endif]-->
    </td>
  </tr>
  <!-- end hero -->

  <!-- start copy block -->
  <table border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto;">
  <tr>
  <td align="center" bgcolor="#e9ecef">
    <!--[if (gte mso 9)|(IE)]>
    <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
    <tr>
    <td align="center" valign="top" width="600">
    <![endif]-->
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">

      <!-- start copy -->
      <tr>
        <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
          <p style="margin: 0;">Tap the button below to confirm your email address. If you didn't create an account with <a href="${url}">Paste</a>, you can safely delete this email.</p>
        </td>
      </tr>
      <!-- end copy -->

      <!-- start button -->
      <tr>
        <td align="left" bgcolor="#ffffff">
          <table border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td align="center" bgcolor="#ffffff" style="padding: 12px;">
                <table border="0" cellpadding="0" cellspacing="0">
                  <tr>
                    <td align="center" bgcolor="#1a82e2" style="border-radius: 6px;">
                      <a href="${url}/${capcha}" target="_blank" style="display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px;">Verify</a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <!-- end button -->

      <!-- start copy -->
      <tr>
        <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
          <p style="margin: 0;">If that doesn't work, copy and paste the following link in your browser:</p>
          <p style="margin: 0;"><a href="${url}/${capcha}" target="_blank">${url}/${capcha}</a></p>
        </td>
      </tr>
      <!-- end copy -->

      <!-- start copy -->
      <tr>
        <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
          <p style="margin: 0;">Cheers,<br> Paste</p>
        </td>
      </tr>
      <!-- end copy -->

    </table>
    <!--[if (gte mso 9)|(IE)]>
    </td>
    </tr>
    </table>
    <![endif]-->
  </td>
</tr>
  </table>
  <!-- end copy block -->

</table>
<!-- end body -->

</body>`;
};
