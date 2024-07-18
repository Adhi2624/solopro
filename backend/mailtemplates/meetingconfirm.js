  const nodemailer = require('nodemailer');

  // Function to send email
  async function meetingconf( sourceemail,destinationemail,sourcename,destinationname) {
      // Create a transporter object using SMTP transport
      console.log(sourceemail,destinationemail,sourcename,destinationname)
      let transporter = nodemailer.createTransport({
          host: 'smtp.office365.com', // Replace with your SMTP server
          port: 587, // Replace with your SMTP port
          secure: false, // true for 465, false for other ports
          auth: {
              user: 'adhithiyan.21it@sonatech.ac.in', // Replace with your email
              pass: 'Adhi@2624', // Replace with your email password
          },
      });
      const htmlTemplate =`<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html dir="ltr" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
  <head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1" name="viewport">
    <meta name="x-apple-disable-message-reformatting">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="telephone=no" name="format-detection">
    <title>New email template 2024-07-02</title><!--[if (mso 16)]>
      <style type="text/css">
      a {text-decoration: none;}
      </style>
      <![endif]--><!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--><!--[if gte mso 9]>
  <xml>
      <o:OfficeDocumentSettings>
      <o:AllowPNG></o:AllowPNG>
      <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
  </xml>
  <![endif]--><!--[if !mso]><!-- -->
    <link href="https://fonts.googleapis.com/css2?family=Exo+2:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"><!--<![endif]-->
    <style type="text/css">
  .rollover:hover .rollover-first {
    max-height:0px!important;
    display:none!important;
    }
    .rollover:hover .rollover-second {
    max-height:none!important;
    display:block!important;
    }
    .rollover span {
    font-size:0;
    }
    u + .body img ~ div div {
    display:none;
    }
    #outlook a {
    padding:0;
    }
    span.MsoHyperlink,
  span.MsoHyperlinkFollowed {
    color:inherit;
    mso-style-priority:99;
    }
    a.es-button {
    mso-style-priority:100!important;
    text-decoration:none!important;
    }
    a[x-apple-data-detectors] {
    color:inherit!important;
    text-decoration:none!important;
    font-size:inherit!important;
    font-family:inherit!important;
    font-weight:inherit!important;
    line-height:inherit!important;
    }
    .es-desk-hidden {
    display:none;
    float:left;
    overflow:hidden;
    width:0;
    max-height:0;
    line-height:0;
    mso-hide:all;
    }
    .es-button-border:hover > a.es-button {
    color:#000000!important;
    }
    .es-menu.es-table-not-adapt td a:hover,
  a.es-button:hover {
    text-decoration:underline!important;
    }
    td .es-button-border:hover a.es-button-7775 {
    color:#ffffff!important;
    }
  @media only screen and (max-width:600px) {.es-m-p15r { padding-right:15px!important } .es-m-p15l { padding-left:15px!important } .es-m-p30t { padding-top:30px!important } .es-m-p20r { padding-right:20px!important } .es-m-p30b { padding-bottom:30px!important } .es-m-p20l { padding-left:20px!important } *[class="gmail-fix"] { display:none!important } p, a { line-height:200%!important } h1, h1 a { line-height:120%!important } h2, h2 a { line-height:120%!important } h3, h3 a { line-height:120%!important } h4, h4 a { line-height:120%!important } h5, h5 a { line-height:120%!important } h6, h6 a { line-height:120%!important } h1 { font-size:28px!important; text-align:left } h2 { font-size:24px!important; text-align:left } h3 { font-size:20px!important; text-align:left } h4 { font-size:24px!important; text-align:left } h5 { font-size:20px!important; text-align:left } h6 { font-size:16px!important; text-align:left } .es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a { font-size:28px!important } .es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a { font-size:24px!important } .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a { font-size:20px!important } .es-header-body h4 a, .es-content-body h4 a, .es-footer-body h4 a { font-size:24px!important } .es-header-body h5 a, .es-content-body h5 a, .es-footer-body h5 a { font-size:20px!important } .es-header-body h6 a, .es-content-body h6 a, .es-footer-body h6 a { font-size:16px!important } .es-menu td a { font-size:16px!important } .es-header-body p, .es-header-body a { font-size:16px!important } .es-content-body p, .es-content-body a { font-size:16px!important } .es-footer-body p, .es-footer-body a { font-size:16px!important } .es-infoblock p, .es-infoblock a { font-size:12px!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3, .es-m-txt-c h4, .es-m-txt-c h5, .es-m-txt-c h6 { text-align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3, .es-m-txt-r h4, .es-m-txt-r h5, .es-m-txt-r h6 { text-align:right!important } .es-m-txt-j, .es-m-txt-j h1, .es-m-txt-j h2, .es-m-txt-j h3, .es-m-txt-j h4, .es-m-txt-j h5, .es-m-txt-j h6 { text-align:justify!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3, .es-m-txt-l h4, .es-m-txt-l h5, .es-m-txt-l h6 { text-align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display:inline!important } .es-m-txt-r .rollover:hover .rollover-second, .es-m-txt-c .rollover:hover .rollover-second, .es-m-txt-l .rollover:hover .rollover-second { display:inline!important } .es-m-txt-r .rollover span, .es-m-txt-c .rollover span, .es-m-txt-l .rollover span { line-height:0!important; font-size:0!important } .es-spacer { display:inline-table } a.es-button, button.es-button { font-size:20px!important; line-height:120%!important } a.es-button, button.es-button, .es-button-border { display:inline-block!important } .es-m-fw, .es-m-fw.es-fw, .es-m-fw .es-button { display:block!important } .es-m-il, .es-m-il .es-button, .es-social, .es-social td, .es-menu { display:inline-block!important } .es-adaptive table, .es-left, .es-right { width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%!important; max-width:600px!important } .adapt-img { width:100%!important; height:auto!important } .es-mobile-hidden, .es-hidden { display:none!important } .es-desk-hidden { width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important } tr.es-desk-hidden { display:table-row!important } table.es-desk-hidden { display:table!important } td.es-desk-menu-hidden { display:table-cell!important } .es-menu td { width:1%!important } table.es-table-not-adapt, .esd-block-html table { width:auto!important } .es-social td { padding-bottom:10px } .h-auto { height:auto!important } .m-c-p16r { padding-right:8vw } }
  @media screen and (max-width:384px) {.mail-message-content { width:414px!important } }
  </style>
  </head>
  <body class="body" style="width:100%;height:100%;padding:0;Margin:0">
    <div dir="ltr" class="es-wrapper-color" lang="en" style="background-color:#12022F"><!--[if gte mso 9]>
        <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
          <v:fill type="tile" src="https://demo.stripocdn.email/content/guids/7e841d84-a07e-4500-b4bb-7eeeb9b5370d/images/logo_revised.png" color="#12022f" origin="0.5, 0" position="0.5, 0"></v:fill>
        </v:background>
      <![endif]-->
    <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-image:url(https://ehqwuij.stripocdn.email/content/guids/7e841d84-a07e-4500-b4bb-7eeeb9b5370d/images/logo_revised.png);background-repeat:no-repeat;background-position:center top;background-color:#12022F" background="https://ehqwuij.stripocdn.email/content/guids/7e841d84-a07e-4500-b4bb-7eeeb9b5370d/images/logo_revised.png" role="none">
      <tr>
        <td valign="top" style="padding:0;Margin:0">
        <table cellpadding="0" cellspacing="0" class="es-content" align="center" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:100%;table-layout:fixed !important">
          <tr>
            <td class="es-m-p15r es-m-p15l" align="center" style="padding:0;Margin:0">
            <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;border-top:10px dashed transparent;border-right:10px dashed transparent;border-left:10px dashed transparent;width:640px;border-bottom:10px dashed transparent" role="none">
              <tr>
                <td align="left" style="padding:0;Margin:0;padding-top:30px;padding-right:40px;padding-left:40px">
                <table cellpadding="0" cellspacing="0" width="100%" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                  <tr>
                    <td align="center" valign="top" style="padding:0;Margin:0;width:540px">
                    <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                      <tr>
                        <td align="center" height="271" style="padding:0;Margin:0"></td>
                      </tr>
                    </table></td>
                  </tr>
                </table></td>
              </tr>
              <tr>
                <td class="es-m-p30t es-m-p30b es-m-p20r es-m-p20l" align="left" bgcolor="#ffffff" style="padding:40px;Margin:0;background-color:#ffffff;border-radius:20px 20px 0px 0px">
                <table cellpadding="0" cellspacing="0" width="100%" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                  <tr>
                    <td align="left" style="padding:0;Margin:0;width:540px">
                    <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                      <tr>
                        <td align="center" style="padding:0;Margin:0"><h1 style="Margin:0;font-family:'Exo 2', sans-serif;mso-line-height-rule:exactly;letter-spacing:0;font-size:36px;font-style:normal;font-weight:bold;line-height:43px;color:#000000">Meeting Request Approved</h1></td>
                      </tr>
                      <tr>
                        <td align="center" style="padding:0;Margin:0;padding-top:20px;font-size:0px"><img class="adapt-img" src="https://ehqwuij.stripocdn.email/content/guids/7e841d84-a07e-4500-b4bb-7eeeb9b5370d/images/g60a23af8a010de4daf16f785aa4b00a0147b7dbe6bde5ecaa2214c858b1eae0f8cb1bdb4dd3874c7312c231abdc4df4e_640.png" alt="" style="display:block;font-size:18px;border:0;outline:none;text-decoration:none" width="540"></td>
                      </tr>
                      <tr>
                        <td align="center" style="padding:0;Margin:0;padding-top:30px"><p style="Margin:0;mso-line-height-rule:exactly;font-family:'Exo 2', sans-serif;line-height:36px;letter-spacing:0;color:#666666;font-size:18px">Greetings <strong>Innovator</strong>!</p></td>
                      </tr>
                      <tr>
                        <td align="center" style="padding:0;Margin:0;padding-top:5px"><p style="Margin:0;mso-line-height-rule:exactly;font-family:'Exo 2', sans-serif;line-height:36px;letter-spacing:0;color:#666666;font-size:18px">Your Meeting with&nbsp;<strong>Person B&nbsp;</strong>has been approved.</p></td>
                      </tr>
                      <tr>
                        <td align="center" style="padding:0;Margin:0;padding-top:5px"><p style="Margin:0;mso-line-height-rule:exactly;font-family:'Exo 2', sans-serif;line-height:36px;letter-spacing:0;color:#666666;font-size:18px">Click this button below to join meet on time or click here to redirect to meeting</p></td>
                      </tr>
                      <tr>
                        <td align="center" style="padding:0;Margin:0;padding-top:30px"><!--[if mso]><a href="https://viewstripo.email/" target="_blank" hidden>
    <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" esdevVmlButton href="https://viewstripo.email/" 
                  style="height:52px; v-text-anchor:middle; width:168px" arcsize="50%" strokecolor="#ffdda9" strokeweight="2px" fillcolor="#010506">
      <w:anchorlock></w:anchorlock>
      <center style='color:#ffffff; font-family:"Exo 2", sans-serif; font-size:20px; font-weight:400; line-height:20px;  mso-text-raise:1px'>Join Meet</center>
    </v:roundrect></a>
  <![endif]--><!--[if !mso]><!-- --><span class="es-button-border msohide" style="border-style:solid;border-color:#FFDDA9;background:#010506;border-width:0px 0px 2px 0px;display:inline-block;border-radius:30px;width:auto;mso-hide:all"><a href="https://viewstripo.email/" class="es-button es-button-7775" target="_blank" style="mso-style-priority:100 !important;text-decoration:none !important;mso-line-height-rule:exactly;color:#ffffff;font-size:20px;padding:15px 30px 15px 30px;display:inline-block;background:#010506;border-radius:30px;font-family:'Exo 2', sans-serif;font-weight:normal;font-style:normal;line-height:24px;width:auto;text-align:center;letter-spacing:0;mso-padding-alt:0;mso-border-alt:10px solid #010506">Join Meet</a></span><!--<![endif]--></td>
                      </tr>
                    </table></td>
                  </tr>
                </table></td>
              </tr>
              <tr>
                <td class="es-m-p30t es-m-p30b es-m-p20r es-m-p20l" align="left" bgcolor="#f9f9f9" style="padding:40px;Margin:0;background-color:#f9f9f9;border-radius:0px 0px 20px 20px">
                <table cellpadding="0" cellspacing="0" width="100%" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                  <tr>
                    <td align="center" valign="top" style="padding:0;Margin:0;width:540px">
                    <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                      <tr>
                        <td align="center" style="padding:0;Margin:0"><p style="Margin:0;mso-line-height-rule:exactly;font-family:'Exo 2', sans-serif;line-height:36px;letter-spacing:0;color:#666666;font-size:18px">Don't forget about your cool ideas . networks! Our Platform is curated just for your growth. check out <a target="_blank" href="" style="mso-line-height-rule:exactly;text-decoration:underline;color:#391484;font-size:18px">solopro&nbsp;</a></p></td>
                      </tr>
                      <tr>
                        <td align="left" style="padding:0;Margin:0"><h6 align="center" style="Margin:0;font-family:'Exo 2', sans-serif;mso-line-height-rule:exactly;letter-spacing:0;font-size:16px;font-style:normal;font-weight:normal;line-height:19px;color:#333333">©<em> SOLOPRO</em></h6></td>
                      </tr>
                    </table></td>
                  </tr>
                </table></td>
              </tr>
            </table></td>
          </tr>
        </table>
        <table cellpadding="0" cellspacing="0" class="es-footer" align="center" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:100%;table-layout:fixed !important;background-color:transparent;background-repeat:repeat;background-position:center top">
          <tr>
            <td class="es-m-p15r es-m-p15l" align="center" style="padding:0;Margin:0">
            <table class="es-footer-body" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:640px" role="none">
              <tr class="es-mobile-hidden">
                <td class="es-m-p30t es-m-p30b es-m-p20r es-m-p20l" align="left" bgcolor="#ffffff" style="padding:40px;Margin:0;background-color:#ffffff;border-radius:20px">
                <table cellpadding="0" cellspacing="0" width="100%" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                  <tr>
                    <td align="center" valign="top" style="padding:0;Margin:0;width:560px">
                    <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                      <tr>
                        <td align="center" class="es-m-txt-l" style="padding:0;Margin:0;font-size:0px" height="30"><a target="_blank" href="https://viewstripo.email/" style="mso-line-height-rule:exactly;text-decoration:underline;color:#391484;font-size:16px"><img src="https://ehqwuij.stripocdn.email/content/guids/7e841d84-a07e-4500-b4bb-7eeeb9b5370d/images/logo_revised.png" alt="" style="display:block;font-size:18px;border:0;outline:none;text-decoration:none" width="128"></a></td>
                      </tr>
                    </table></td>
                  </tr>
                </table></td>
              </tr>
            </table></td>
          </tr>
        </table></td>
      </tr>
    </table>
    </div>
  </body>
  </html>`;
  let mailOptions = {
      from: 'adhithiyan.21it@sonatech.ac.in', // sender address
      to: [sourceemail, destinationemail], // list of receivers
      subject: 'SOLOPRO- Meeting confirmation', // Subject line
      html: htmlTemplate, // html body
  };

  // Send mail with defined transport object
  try {
      let info = await transporter.sendMail(mailOptions);
      console.log('Message sent: %s', info.messageId);
  } catch (error) {
      console.error('Error sending email: %s', error);
  }
  }

  module.exports = meetingconf;
