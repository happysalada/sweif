export const fromTransferRequest = ({name, input_currency, input_amount, rate, output_currency, output_amount}: {name: string, input_currency: string, input_amount: number, rate: number, output_currency: string, output_amount: number}): { subject: string, content: string } => ({
  subject: "Solicitud de transacción",
  content: `
<head>
  <meta charset="utf-8">
  <meta name="x-apple-disable-message-reformatting">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="format-detection" content="telephone=no, date=no, address=no, email=no, url=no">
  <meta name="color-scheme" content="light dark">
  <meta name="supported-color-schemes" content="light dark">
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings xmlns:o="urn:schemas-microsoft-com:office:office">
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <style>
    td,th,div,p,a,h1,h2,h3,h4,h5,h6 {font-family: "Segoe UI", sans-serif; mso-line-height-rule: exactly;}
  </style>
  <![endif]-->
  <title>Solicitud de transacción</title>
  <style>
    img {
      max-width: 100%;
      vertical-align: middle;
      line-height: 1;
      border: 0
    }
    @media (max-width: 600px) {
      .sm-my-8 {
        margin-top: 32px !important;
        margin-bottom: 32px !important
      }
      .sm-px-4 {
        padding-left: 16px !important;
        padding-right: 16px !important
      }
      .sm-px-6 {
        padding-left: 24px !important;
        padding-right: 24px !important
      }
      .sm-leading-8 {
        line-height: 32px !important
      }
    }
  </style>
</head>
<body style="margin: 0; width: 100%; background-color: #f8fafc; padding: 0; -webkit-font-smoothing: antialiased; word-break: break-word">
  <div style="display: none">
    Solicitud de transacción
    &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847;
  </div>
  <div role="article" aria-roledescription="email" aria-label="Solicitud de transacción" lang="en">
    <div class="sm-px-4" style="background-color: #f8fafc; font-family: ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif">
      <table align="center" cellpadding="0" cellspacing="0" role="presentation">
        <tr>
          <td style="width: 552px; max-width: 100%">
            <div class="sm-my-8" style="margin-top: 48px; margin-bottom: 48px; text-align: center">
              <div style="margin-left: auto; margin-right: auto; height: 48px; width: 80px; border-radius: 8px">
                <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="570 350 750 380" style="enable-background:new 0 0 1920 1080;" xml:space="preserve">
                  <rect x="3892.29" y="-7.37" width="1928.41" height="1094.9" style="fill: #d0e4c3"></rect>
                  <g>
                    <circle cx="4394.41" cy="552.81" r="180.9" style="fill: #191932"></circle>
                    <g>
                      <path d="M4354.15,563.41c0-5.66,1.29-20.31,3.6-27.77c4.88-16.46,11.57-32.91,18.25-49.88
			c3.6-8.74,9.77-12.86,15.17-9.26c4.11,2.57,5.14,6.68,2.83,11.31c-3.86,7.71-7.2,15.94-10.54,24.68
			c-4.11,10.54-7.97,22.63-10.8,35.23c-1.8,7.97-2.31,18.51,1.29,19.54c3.86,1.03,9-3.09,13.11-6.69c10.03-9,18.77-18,26.48-27.51
			c8.74-10.54,13.88-18.25,21.08-12.34c3.09,2.57,3.86,6.43,2.06,10.28c-4.11,8.23-28.03,34.71-38.82,43.19
			c-8.23,6.43-14.14,10.8-22.88,10.8C4363.41,585,4354.15,575.23,4354.15,563.41z" style="fill: #d0e4c3;"></path>
                    </g>
                    <g>
                      <path d="M4419.82,644.59c-37.44,0-74.58-12.35-109.14-36.54c-34.67-24.27-54.37-51.58-55.19-52.73
			c-2.59-3.63-1.75-8.66,1.88-11.25c3.63-2.59,8.66-1.75,11.25,1.88c0.18,0.26,19.19,26.51,51.73,49.18
			c42.97,29.94,88.09,39.83,134.1,29.43c4.35-0.99,8.66,1.74,9.64,6.09c0.98,4.34-1.74,8.66-6.09,9.65
			C4445.3,643.17,4432.55,644.59,4419.82,644.59z" style="fill: #d0e4c3;"></path>
                    </g>
                    <g>
                      <path d="M4490.56,630.85c-1.4,0-2.8-0.46-3.97-1.42l-12.54-10.24c-2.68-2.19-3.08-6.14-0.89-8.83
			c2.19-2.68,6.14-3.08,8.83-0.89l12.54,10.24c2.68,2.19,3.08,6.14,0.89,8.83C4494.18,630.06,4492.37,630.85,4490.56,630.85z" style="fill: #d0e4c3;"></path>
                    </g>
                    <g>
                      <path d="M4482.26,645.55c-1.04,0-2.1-0.26-3.08-0.81c-3.02-1.7-4.08-5.53-2.38-8.55l8.3-14.7
			c1.7-3.02,5.53-4.08,8.55-2.38c3.02,1.7,4.08,5.53,2.38,8.55l-8.3,14.7C4486.57,644.4,4484.44,645.55,4482.26,645.55z" style="fill: #d0e4c3;"></path>
                    </g>
                    <g>
                      <path d="M4381.38,455.3c-2.44,0-4.76-1.44-5.78-3.83c-1.35-3.19,0.13-6.87,3.33-8.22l14.9-6.32
			c3.19-1.36,6.87,0.14,8.22,3.33c1.35,3.19-0.13,6.87-3.33,8.22l-14.9,6.32C4383.03,455.14,4382.2,455.3,4381.38,455.3z" style="fill: #d0e4c3;"></path>
                    </g>
                    <g>
                      <path d="M4405.43,463.17c-2.06,0-4.08-1.01-5.28-2.88l-9.14-14.19c-1.88-2.91-1.04-6.79,1.88-8.67
			c2.91-1.88,6.79-1.04,8.67,1.88l9.14,14.19c1.88,2.91,1.04,6.79-1.88,8.67C4407.77,462.85,4406.59,463.17,4405.43,463.17z" style="fill: #d0e4c3;"></path>
                    </g>
                  </g>
                  <g>
                    <circle cx="4898.9" cy="552.81" r="180.9" style="fill: #976026"></circle>
                    <g>
                      <path d="M4858.64,563.41c0-5.66,1.29-20.31,3.6-27.77c4.88-16.46,11.57-32.91,18.25-49.88
			c3.6-8.74,9.77-12.86,15.17-9.26c4.11,2.57,5.14,6.68,2.83,11.31c-3.86,7.71-7.2,15.94-10.54,24.68
			c-4.11,10.54-7.97,22.63-10.8,35.23c-1.8,7.97-2.31,18.51,1.29,19.54c3.86,1.03,9-3.09,13.11-6.69c10.03-9,18.77-18,26.48-27.51
			c8.74-10.54,13.88-18.25,21.08-12.34c3.09,2.57,3.86,6.43,2.06,10.28c-4.11,8.23-28.03,34.71-38.82,43.19
			c-8.23,6.43-14.14,10.8-22.88,10.8C4867.9,585,4858.64,575.23,4858.64,563.41z" style="fill: #d0e4c3;"></path>
                    </g>
                    <g>
                      <path d="M4924.31,644.59c-37.44,0-74.58-12.35-109.14-36.54c-34.67-24.27-54.37-51.58-55.19-52.73
			c-2.59-3.63-1.75-8.66,1.88-11.25c3.63-2.59,8.66-1.75,11.25,1.88c0.18,0.26,19.19,26.51,51.73,49.18
			c42.97,29.94,88.09,39.83,134.1,29.43c4.35-0.99,8.66,1.74,9.64,6.09c0.98,4.34-1.74,8.66-6.09,9.65
			C4949.8,643.17,4937.04,644.59,4924.31,644.59z" style="fill: #d0e4c3;"></path>
                    </g>
                    <g>
                      <path d="M4995.05,630.85c-1.4,0-2.8-0.46-3.97-1.42l-12.54-10.24c-2.68-2.19-3.08-6.14-0.89-8.83
			c2.19-2.68,6.14-3.08,8.83-0.89l12.54,10.24c2.68,2.19,3.08,6.14,0.89,8.83C4998.67,630.06,4996.87,630.85,4995.05,630.85z" style="fill: #d0e4c3;"></path>
                    </g>
                    <g>
                      <path d="M4986.75,645.55c-1.04,0-2.1-0.26-3.08-0.81c-3.02-1.7-4.08-5.53-2.38-8.55l8.3-14.7
			c1.7-3.02,5.53-4.08,8.55-2.38c3.02,1.7,4.08,5.53,2.38,8.55l-8.3,14.7C4991.06,644.4,4988.94,645.55,4986.75,645.55z" style="fill: #d0e4c3;"></path>
                    </g>
                    <g>
                      <path d="M4885.87,455.3c-2.44,0-4.76-1.44-5.78-3.83c-1.35-3.19,0.13-6.87,3.33-8.22l14.9-6.32
			c3.19-1.36,6.87,0.14,8.22,3.33c1.35,3.19-0.13,6.87-3.33,8.22l-14.9,6.32C4887.52,455.14,4886.69,455.3,4885.87,455.3z" style="fill: #d0e4c3;"></path>
                    </g>
                    <g>
                      <path d="M4909.92,463.17c-2.06,0-4.08-1.01-5.28-2.88l-9.14-14.19c-1.88-2.91-1.04-6.79,1.88-8.67
			c2.91-1.88,6.79-1.04,8.67,1.88l9.14,14.19c1.88,2.91,1.04,6.79-1.88,8.67C4912.26,462.85,4911.09,463.17,4909.92,463.17z" style="fill: #d0e4c3;"></path>
                    </g>
                  </g>
                  <g>
                    <circle cx="5381.7" cy="552.81" r="180.9" style="fill: #e9e73c"></circle>
                    <g>
                      <path d="M5341.44,563.41c0-5.66,1.29-20.31,3.6-27.77c4.88-16.46,11.57-32.91,18.25-49.88
			c3.6-8.74,9.77-12.86,15.17-9.26c4.11,2.57,5.14,6.68,2.83,11.31c-3.86,7.71-7.2,15.94-10.54,24.68
			c-4.11,10.54-7.97,22.63-10.8,35.23c-1.8,7.97-2.31,18.51,1.29,19.54c3.86,1.03,9-3.09,13.11-6.69c10.03-9,18.77-18,26.48-27.51
			c8.74-10.54,13.88-18.25,21.08-12.34c3.09,2.57,3.86,6.43,2.06,10.28c-4.11,8.23-28.03,34.71-38.82,43.19
			c-8.23,6.43-14.14,10.8-22.88,10.8C5350.69,585,5341.44,575.23,5341.44,563.41z" style="fill: #191932;"></path>
                    </g>
                    <g>
                      <path d="M5407.11,644.59c-37.44,0-74.58-12.35-109.14-36.54c-34.67-24.27-54.37-51.58-55.19-52.73
			c-2.59-3.63-1.75-8.66,1.88-11.25c3.63-2.59,8.66-1.75,11.25,1.88c0.18,0.26,19.19,26.51,51.73,49.18
			c42.97,29.94,88.09,39.83,134.1,29.43c4.35-0.99,8.66,1.74,9.64,6.09c0.98,4.34-1.74,8.66-6.09,9.65
			C5432.59,643.17,5419.83,644.59,5407.11,644.59z" style="fill: #191932;"></path>
                    </g>
                    <g>
                      <path d="M5477.84,630.85c-1.4,0-2.8-0.46-3.97-1.42l-12.54-10.24c-2.68-2.19-3.08-6.14-0.89-8.83
			c2.19-2.68,6.14-3.08,8.83-0.89l12.54,10.24c2.68,2.19,3.08,6.14,0.89,8.83C5481.46,630.06,5479.66,630.85,5477.84,630.85z" style="fill: #191932;"></path>
                    </g>
                    <g>
                      <path d="M5469.54,645.55c-1.04,0-2.1-0.26-3.08-0.81c-3.02-1.7-4.08-5.53-2.38-8.55l8.3-14.7
			c1.7-3.02,5.53-4.08,8.55-2.38c3.02,1.7,4.08,5.53,2.38,8.55l-8.3,14.7C5473.85,644.4,5471.73,645.55,5469.54,645.55z" style="fill: #191932;"></path>
                    </g>
                    <g>
                      <path d="M5368.67,455.3c-2.44,0-4.76-1.44-5.78-3.83c-1.35-3.19,0.13-6.87,3.33-8.22l14.9-6.32
			c3.19-1.36,6.87,0.14,8.22,3.33c1.35,3.19-0.13,6.87-3.33,8.22l-14.9,6.32C5370.31,455.14,5369.48,455.3,5368.67,455.3z" style="fill: #191932;"></path>
                    </g>
                    <g>
                      <path d="M5392.71,463.17c-2.06,0-4.08-1.01-5.28-2.88l-9.14-14.19c-1.88-2.91-1.04-6.79,1.88-8.67
			c2.91-1.88,6.79-1.04,8.67,1.88l9.14,14.19c1.88,2.91,1.04,6.79-1.88,8.67C5395.06,462.85,5393.88,463.17,5392.71,463.17z" style="fill: #191932;"></path>
                    </g>
                  </g>
                  <g>
                    <g>
                      <path d="M-1154.44,577.48c0-22.56,6.69-42.89,16.11-65.94c4.46-10.66,5.21-12.64,7.19-14.63
			c2.73-2.73,6.2-3.47,9.42-1.74c3.22,1.74,5.95,5.21,4.21,8.43c-2.23,4.21-12.89,34.21-14.13,37.93
			c-3.72,11.16-7.93,32.97-5.21,32.97c2.23,0,15.87-23.3,26.53-43.63c4.96-9.67,14.38-26.77,17.35-30.24
			c2.48-2.73,5.7-3.22,9.17-1.98c1.98,0.74,4.46,2.48,4.96,6.94c0.25,3.72-0.5,7.68-3.22,19.58c-1.98,9.17-3.47,18.59-5.45,27.77
			c-1.73,7.68-2.98,24.05-0.99,24.54c2.48,0.5,7.93-10.91,11.65-17.6c8.68-16.36,14.87-34.95,23.05-54.54
			c3.22-7.68,4.96-13.14,12.64-12.15c3.47,0.5,5.7,2.73,6.69,6.45c1.73,6.45,0,10.41,2.48,18.1c4.46,13.88,11.65,11.65,30.99,14.13
			c3.22,0.5,5.7,2.73,6.2,6.2c2.23,12.64-21.82,11.9-35.95,5.7c-4.96-2.23-13.88-12.4-14.38-13.39c0,0-3.72,7.68-4.96,10.91
			c-6.69,15.87-12.64,29.25-17.11,36.19c-5.45,8.43-11.9,16.11-20.08,19.09c-10.66,4.21-18.59-6.69-18.59-20.82
			c0-7.68,0.74-16.61,0.74-17.6c0-1.74-0.25-1.24-1.24,0.74c-3.97,7.93-8.43,15.62-14.13,22.56c-7.93,9.67-11.4,15.87-20.58,15.87
			C-1150.72,597.31-1154.44,586.16-1154.44,577.48z" style="fill: #010101"></path>
                    </g>
                    <g>
                      <path d="M-1012.13,555.91c0-23.05,9.92-42.89,25.29-59c6.94-7.19,14.63-10.41,23.55-10.16
			c19.34,0.74,21.82,21.82,7.44,36.19c-10.66,10.66-21.82,16.61-34.46,18.1c-2.23,0.25-3.22,0.74-3.47,2.23
			c-0.99,6.45-3.22,14.13-0.5,21.82c2.73,7.93,9.17,11.4,17.35,9.42c13.39-3.47,28.26-16.36,40.41-29
			c9.42-10.16,12.89-14.38,17.35-14.63c6.2-0.5,10.16,4.46,7.93,10.91c-0.99,3.22-17.35,20.33-25.29,27.02
			c-14.38,12.39-29.75,22.81-44.62,22.81C-1001.22,591.61-1012.13,577.48-1012.13,555.91z M-966.52,509.8
			c1.73-2.23,4.21-6.2,1.24-6.2c-7.44,0-15.37,10.16-19.83,19.09C-976.43,519.47-970.73,515.01-966.52,509.8z" style="fill: #010101;"></path>
                    </g>
                    <g>
                      <path d="M-931.06,573.27c0-5.45,1.24-19.58,3.47-26.77c4.71-15.87,11.16-31.73,17.6-48.09
			c3.47-8.43,9.42-12.4,14.63-8.92c3.97,2.48,4.96,6.45,2.73,10.91c-3.72,7.44-6.94,15.37-10.17,23.8
			c-3.97,10.16-7.68,21.82-10.41,33.96c-1.73,7.68-2.23,17.85,1.24,18.84c3.72,0.99,8.68-2.98,12.64-6.45
			c9.67-8.68,18.1-17.35,25.53-26.53c8.43-10.16,13.39-17.6,20.33-11.9c2.98,2.48,3.72,6.2,1.98,9.92
			c-3.97,7.93-27.02,33.47-37.43,41.65c-7.93,6.2-13.64,10.41-22.06,10.41C-922.14,594.09-931.06,584.67-931.06,573.27z" style="fill: #010101;"></path>
                    </g>
                    <g>
                      <path d="M-884.95,638.71c0-25.78,3.72-49.58,11.16-75.12c9.92-33.72,24.79-66.94,44.62-98.67
			c12.15-19.34,43.38-58.75,58.51-51.32c9.17,4.46,9.92,18.84,7.19,30.49c-6.94,29.5-33.22,58.01-59.99,77.59
			c-5.7,4.21-11.9,7.69-18.34,9.92c-2.23,0.74-3.97,1.73-4.71,3.72c-4.46,12.15-9.92,22.56-11.4,33.72
			c-0.25,1.98,0.5,1.98,2.23,1.98c29-6.45,45.86-21.57,78.59-37.68c5.95-4.71,11.65-4.21,14.38,0.5c1.73,2.73,1.73,5.7-0.5,8.68
			c-7.68,10.91-45.86,29.5-67.68,38.42c-7.93,3.22-15.12,5.45-22.06,6.69c-1.98,0.25-1.98,0.5-0.99,2.23l2.48,4.46
			c7.68,11.4,10.91,22.81,10.66,34.71c0,19.09-8.18,43.88-25.29,43.88C-881.73,672.92-884.95,656.81-884.95,638.71z M-857.93,621.61
			c-0.5-5.95-5.21-16.36-7.44-17.6c-0.99,0.99-2.48,15.87-2.98,22.56c-0.99,14.38,0,27.77,2.48,28.26
			C-860.41,656.32-856.94,632.52-857.93,621.61z M-829.92,505.84c13.88-11.16,25.29-22.56,34.71-34.71
			c7.44-9.42,16.36-27.27,16.36-36.19c0-2.23-0.5-3.22-2.23-1.49c-28.51,28.51-34.46,37.43-52.8,75.36
			C-832.4,507.82-831.16,506.83-829.92,505.84z" style="fill: #010101;"></path>
                    </g>
                    <g>
                      <g>
                        <path d="M-1255.96,567.25c13.73,15.81,35.12,23.71,55.85,20.84c18.88-2.61,42.16-17.92,31.84-39.82
				c-4.48-9.5-13.65-15.75-22.92-20.05c-5.54-2.57-11.26-4.45-17.14-6.02c-4.94-1.32-12.61-2.53-14.67-8.13
				c-5.1-13.84,16.48-21.68,26.41-21.64c12.39,0.06,22.86,7.02,29,17.51c5.35,9.15,19.61,0.87,14.23-8.32
				c-11.44-19.56-34.12-29.86-56.34-23.98c-20.12,5.33-42.07,30.33-23.91,50.04c7.59,8.24,18.87,9.28,28.91,12.76
				c7.77,2.69,29.55,12.38,20,23.58c-6.94,8.14-21.21,9.25-31.03,7.69c-11.35-1.8-21.08-7.49-28.57-16.12
				C-1251.27,547.57-1262.89,559.27-1255.96,567.25L-1255.96,567.25z" style="fill: #010101;"></path>
                      </g>
                    </g>
                    <g>
                      <path d="M-1149.2,636.54c-0.65-4.1-4.54-6.84-8.6-6.08c-44.85,8.34-89,1.1-129.4-29.43
			c-19.96-15.09-33.35-35.45-40.94-45.04c-0.91-1.15-2.32-1.8-3.79-1.7c-3.59,0.25-6.99,1.82-9.27,5.13
			c-0.01,0.01-0.01,0.03-0.02,0.04c-0.68,1.45-0.4,3.19,0.59,4.45c7.82,10.08,22.19,31.85,44.17,48.54
			c33.95,25.78,72.05,35.08,109.92,35.29c10.31,0.06,20.68-0.86,31.04-2.76C-1151.5,644.23-1148.56,640.55-1149.2,636.54z" style="fill: #010101;"></path>
                    </g>
                    <g>
                      <path d="M-1119.67,639.19c-1.41-0.01-2.83-0.51-3.97-1.52l-11.7-10.34c-2.5-2.21-2.74-6.03-0.53-8.54
			c2.21-2.5,6.04-2.74,8.54-0.53l11.7,10.34c2.5,2.21,2.74,6.03,0.53,8.54C-1116.31,638.51-1117.98,639.2-1119.67,639.19z" style="fill: #010101;"></path>
                    </g>
                    <g>
                      <path d="M-1128.21,653.04c-1.07-0.01-2.16-0.3-3.14-0.9c-2.84-1.75-3.73-5.48-1.97-8.32l8.54-13.85
			c1.75-2.84,5.48-3.73,8.32-1.97c2.84,1.75,3.73,5.48,1.97,8.32l-8.54,13.85C-1124.18,652.03-1126.17,653.05-1128.21,653.04z" style="fill: #010101;"></path>
                    </g>
                    <g>
                      <path d="M-899.63,469.04c-2.36,0-4.59-1.38-5.57-3.69c-1.3-3.07,0.13-6.63,3.21-7.93l14.37-6.1
			c3.07-1.31,6.63,0.13,7.93,3.21c1.3,3.07-0.13,6.63-3.21,7.93l-14.37,6.1C-898.04,468.88-898.84,469.04-899.63,469.04z" style="fill: #010101;"></path>
                    </g>
                    <g>
                      <path d="M-876.44,476.62c-1.99,0-3.93-0.98-5.09-2.77l-8.81-13.68c-1.81-2.81-1-6.55,1.81-8.36
			c2.81-1.81,6.55-1,8.36,1.81l8.81,13.68c1.81,2.81,1,6.55-1.81,8.36C-874.19,476.31-875.32,476.62-876.44,476.62z" style="fill: #010101;"></path>
                    </g>
                  </g>
                  <rect x="-4.2" y="-7.45" width="1928.41" height="1094.9" style="fill: #010101;"></rect>
                  <g>
                    <g>
                      <path d="M818.43,577.48c0-22.56,6.69-42.89,16.11-65.94c4.46-10.66,5.21-12.64,7.19-14.63
			c2.73-2.73,6.2-3.47,9.42-1.74c3.22,1.74,5.95,5.21,4.21,8.43c-2.23,4.21-12.89,34.21-14.13,37.93
			c-3.72,11.16-7.93,32.97-5.21,32.97c2.23,0,15.87-23.3,26.53-43.63c4.96-9.67,14.38-26.77,17.35-30.24
			c2.48-2.73,5.7-3.22,9.17-1.98c1.98,0.74,4.46,2.48,4.96,6.94c0.25,3.72-0.5,7.68-3.22,19.58c-1.98,9.17-3.47,18.59-5.45,27.77
			c-1.73,7.68-2.98,24.05-0.99,24.54c2.48,0.5,7.93-10.91,11.65-17.6c8.68-16.36,14.87-34.95,23.05-54.54
			c3.22-7.68,4.96-13.14,12.64-12.15c3.47,0.5,5.7,2.73,6.69,6.45c1.73,6.45,0,10.41,2.48,18.1c4.46,13.88,11.65,11.65,30.99,14.13
			c3.22,0.5,5.7,2.73,6.2,6.2c2.23,12.64-21.82,11.9-35.95,5.7c-4.96-2.23-13.88-12.4-14.38-13.39c0,0-3.72,7.68-4.96,10.91
			c-6.69,15.87-12.64,29.25-17.11,36.19c-5.45,8.43-11.9,16.11-20.08,19.09c-10.66,4.21-18.59-6.69-18.59-20.82
			c0-7.68,0.74-16.61,0.74-17.6c0-1.74-0.25-1.24-1.24,0.74c-3.97,7.93-8.43,15.62-14.13,22.56c-7.93,9.67-11.4,15.87-20.58,15.87
			C822.15,597.31,818.43,586.16,818.43,577.48z" style="fill: #ffffff"></path>
                    </g>
                    <g>
                      <path d="M960.74,555.91c0-23.05,9.92-42.89,25.29-59c6.94-7.19,14.63-10.41,23.55-10.16
			c19.34,0.74,21.82,21.82,7.44,36.19c-10.66,10.66-21.82,16.61-34.46,18.1c-2.23,0.25-3.22,0.74-3.47,2.23
			c-0.99,6.45-3.22,14.13-0.5,21.82c2.73,7.93,9.17,11.4,17.35,9.42c13.39-3.47,28.26-16.36,40.41-29
			c9.42-10.16,12.89-14.38,17.35-14.63c6.2-0.5,10.16,4.46,7.93,10.91c-0.99,3.22-17.35,20.33-25.29,27.02
			c-14.38,12.39-29.75,22.81-44.62,22.81C971.65,591.61,960.74,577.48,960.74,555.91z M1006.35,509.8c1.73-2.23,4.21-6.2,1.24-6.2
			c-7.44,0-15.37,10.16-19.83,19.09C996.44,519.47,1002.14,515.01,1006.35,509.8z" style="fill: #ffffff;"></path>
                    </g>
                    <g>
                      <path d="M1041.81,573.27c0-5.45,1.24-19.58,3.47-26.77c4.71-15.87,11.16-31.73,17.6-48.09
			c3.47-8.43,9.42-12.4,14.63-8.92c3.97,2.48,4.96,6.45,2.73,10.91c-3.72,7.44-6.94,15.37-10.17,23.8
			c-3.97,10.16-7.68,21.82-10.41,33.96c-1.73,7.68-2.23,17.85,1.24,18.84c3.72,0.99,8.68-2.98,12.64-6.45
			c9.67-8.68,18.1-17.35,25.53-26.53c8.43-10.16,13.39-17.6,20.33-11.9c2.98,2.48,3.72,6.2,1.98,9.92
			c-3.97,7.93-27.02,33.47-37.43,41.65c-7.93,6.2-13.64,10.41-22.06,10.41C1050.73,594.09,1041.81,584.67,1041.81,573.27z" style="fill: #ffffff;"></path>
                    </g>
                    <g>
                      <path d="M1087.92,638.71c0-25.78,3.72-49.58,11.16-75.12c9.92-33.72,24.79-66.94,44.62-98.67
			c12.15-19.34,43.38-58.75,58.51-51.32c9.17,4.46,9.92,18.84,7.19,30.49c-6.94,29.5-33.22,58.01-59.99,77.59
			c-5.7,4.21-11.9,7.69-18.34,9.92c-2.23,0.74-3.97,1.73-4.71,3.72c-4.46,12.15-9.92,22.56-11.4,33.72
			c-0.25,1.98,0.5,1.98,2.23,1.98c29-6.45,45.86-21.57,78.59-37.68c5.95-4.71,11.65-4.21,14.38,0.5c1.73,2.73,1.73,5.7-0.5,8.68
			c-7.68,10.91-45.86,29.5-67.68,38.42c-7.93,3.22-15.12,5.45-22.06,6.69c-1.98,0.25-1.98,0.5-0.99,2.23l2.48,4.46
			c7.68,11.4,10.91,22.81,10.66,34.71c0,19.09-8.18,43.88-25.29,43.88C1091.14,672.92,1087.92,656.81,1087.92,638.71z
			 M1114.94,621.61c-0.5-5.95-5.21-16.36-7.44-17.6c-0.99,0.99-2.48,15.87-2.97,22.56c-0.99,14.38,0,27.77,2.48,28.26
			C1112.46,656.32,1115.93,632.52,1114.94,621.61z M1142.95,505.84c13.88-11.16,25.29-22.56,34.71-34.71
			c7.44-9.42,16.36-27.27,16.36-36.19c0-2.23-0.5-3.22-2.23-1.49c-28.51,28.51-34.46,37.43-52.8,75.36
			C1140.47,507.82,1141.71,506.83,1142.95,505.84z" style="fill: #ffffff;"></path>
                    </g>
                    <g>
                      <g>
                        <path d="M716.91,567.25c13.73,15.81,35.12,23.71,55.85,20.84c18.88-2.61,42.16-17.92,31.84-39.82
				c-4.48-9.5-13.65-15.75-22.92-20.05c-5.54-2.57-11.26-4.45-17.14-6.02c-4.94-1.32-12.61-2.53-14.67-8.13
				c-5.1-13.84,16.48-21.68,26.41-21.64c12.39,0.06,22.86,7.02,29,17.51c5.35,9.15,19.61,0.87,14.23-8.32
				c-11.44-19.56-34.12-29.86-56.34-23.98c-20.12,5.33-42.07,30.33-23.91,50.04c7.59,8.24,18.87,9.28,28.91,12.76
				c7.76,2.69,29.55,12.38,20,23.58c-6.94,8.14-21.21,9.25-31.03,7.69c-11.35-1.8-21.08-7.49-28.57-16.12
				C721.6,547.57,709.98,559.27,716.91,567.25L716.91,567.25z" style="fill: #ffffff;"></path>
                      </g>
                    </g>
                    <g>
                      <path d="M823.67,636.54c-0.65-4.1-4.54-6.84-8.6-6.08c-44.85,8.34-89,1.1-129.4-29.43
			c-19.96-15.09-33.35-35.45-40.94-45.04c-0.91-1.15-2.32-1.8-3.79-1.7c-3.59,0.25-6.99,1.82-9.27,5.13
			c-0.01,0.01-0.01,0.03-0.02,0.04c-0.68,1.45-0.4,3.19,0.59,4.45c7.82,10.08,22.19,31.85,44.17,48.54
			c33.95,25.78,72.05,35.08,109.92,35.29c10.31,0.06,20.68-0.86,31.04-2.76C821.37,644.23,824.31,640.55,823.67,636.54z" style="fill: #ffffff;"></path>
                    </g>
                    <g>
                      <path d="M853.2,639.19c-1.41-0.01-2.83-0.51-3.97-1.52l-11.7-10.34c-2.5-2.21-2.74-6.03-0.53-8.54
			c2.21-2.5,6.04-2.74,8.54-0.53l11.7,10.34c2.5,2.21,2.74,6.03,0.53,8.54C856.56,638.51,854.89,639.2,853.2,639.19z" style="fill: #ffffff;"></path>
                    </g>
                    <g>
                      <path d="M844.66,653.04c-1.07-0.01-2.16-0.3-3.14-0.9c-2.84-1.75-3.73-5.48-1.97-8.32l8.54-13.85
			c1.75-2.84,5.48-3.73,8.32-1.97c2.84,1.75,3.73,5.48,1.97,8.32l-8.54,13.85C848.69,652.03,846.7,653.05,844.66,653.04z" style="fill: #ffffff;"></path>
                    </g>
                    <g>
                      <path d="M1073.24,469.04c-2.36,0-4.59-1.38-5.57-3.69c-1.3-3.07,0.13-6.63,3.21-7.93l14.37-6.1
			c3.07-1.31,6.63,0.13,7.93,3.21c1.3,3.07-0.13,6.63-3.21,7.93l-14.37,6.1C1074.83,468.88,1074.03,469.04,1073.24,469.04z" style="fill: #ffffff;"></path>
                    </g>
                    <g>
                      <path d="M1096.43,476.62c-1.99,0-3.93-0.98-5.09-2.77l-8.81-13.68c-1.81-2.81-1-6.55,1.81-8.36
			c2.81-1.81,6.55-1,8.36,1.81l8.81,13.68c1.81,2.81,1,6.55-1.81,8.36C1098.68,476.31,1097.55,476.62,1096.43,476.62z" style="fill: #ffffff;"></path>
                    </g>
                  </g>
                  <rect x="1935.8" y="-7.45" width="1928.41" height="1094.9" style="fill: #191932;"></rect>
                  <g>
                    <g>
                      <path d="M2791.3,577.48c0-22.56,6.69-42.89,16.11-65.94c4.46-10.66,5.21-12.64,7.19-14.63
			c2.73-2.73,6.2-3.47,9.42-1.74c3.22,1.74,5.95,5.21,4.21,8.43c-2.23,4.21-12.89,34.21-14.13,37.93
			c-3.72,11.16-7.93,32.97-5.21,32.97c2.23,0,15.87-23.3,26.53-43.63c4.96-9.67,14.38-26.77,17.35-30.24
			c2.48-2.73,5.7-3.22,9.17-1.98c1.98,0.74,4.46,2.48,4.96,6.94c0.25,3.72-0.5,7.68-3.22,19.58c-1.98,9.17-3.47,18.59-5.45,27.77
			c-1.73,7.68-2.98,24.05-0.99,24.54c2.48,0.5,7.93-10.91,11.65-17.6c8.68-16.36,14.87-34.95,23.05-54.54
			c3.22-7.68,4.96-13.14,12.64-12.15c3.47,0.5,5.7,2.73,6.69,6.45c1.73,6.45,0,10.41,2.48,18.1c4.46,13.88,11.65,11.65,30.99,14.13
			c3.22,0.5,5.7,2.73,6.2,6.2c2.23,12.64-21.82,11.9-35.95,5.7c-4.96-2.23-13.88-12.4-14.38-13.39c0,0-3.72,7.68-4.96,10.91
			c-6.69,15.87-12.64,29.25-17.11,36.19c-5.45,8.43-11.9,16.11-20.08,19.09c-10.66,4.21-18.59-6.69-18.59-20.82
			c0-7.68,0.74-16.61,0.74-17.6c0-1.74-0.25-1.24-1.24,0.74c-3.97,7.93-8.43,15.62-14.13,22.56c-7.93,9.67-11.4,15.87-20.58,15.87
			C2795.02,597.31,2791.3,586.16,2791.3,577.48z" style="fill: #d0e4c3;"></path>
                    </g>
                    <g>
                      <path d="M2933.61,555.91c0-23.05,9.92-42.89,25.29-59c6.94-7.19,14.63-10.41,23.55-10.16
			c19.34,0.74,21.82,21.82,7.44,36.19c-10.66,10.66-21.82,16.61-34.46,18.1c-2.23,0.25-3.22,0.74-3.47,2.23
			c-0.99,6.45-3.22,14.13-0.5,21.82c2.73,7.93,9.17,11.4,17.35,9.42c13.39-3.47,28.26-16.36,40.41-29
			c9.42-10.16,12.89-14.38,17.35-14.63c6.2-0.5,10.16,4.46,7.93,10.91c-0.99,3.22-17.35,20.33-25.29,27.02
			c-14.38,12.39-29.75,22.81-44.62,22.81C2944.52,591.61,2933.61,577.48,2933.61,555.91z M2979.22,509.8
			c1.73-2.23,4.21-6.2,1.24-6.2c-7.44,0-15.37,10.16-19.83,19.09C2969.31,519.47,2975.01,515.01,2979.22,509.8z" style="fill: #d0e4c3;"></path>
                    </g>
                    <g>
                      <path d="M3014.68,573.27c0-5.45,1.24-19.58,3.47-26.77c4.71-15.87,11.16-31.73,17.6-48.09
			c3.47-8.43,9.42-12.4,14.63-8.92c3.97,2.48,4.96,6.45,2.73,10.91c-3.72,7.44-6.94,15.37-10.17,23.8
			c-3.97,10.16-7.68,21.82-10.41,33.96c-1.73,7.68-2.23,17.85,1.24,18.84c3.72,0.99,8.68-2.98,12.64-6.45
			c9.67-8.68,18.1-17.35,25.53-26.53c8.43-10.16,13.39-17.6,20.33-11.9c2.98,2.48,3.72,6.2,1.98,9.92
			c-3.97,7.93-27.02,33.47-37.43,41.65c-7.93,6.2-13.64,10.41-22.06,10.41C3023.6,594.09,3014.68,584.67,3014.68,573.27z" style="fill: #d0e4c3;"></path>
                    </g>
                    <g>
                      <path d="M3060.79,638.71c0-25.78,3.72-49.58,11.16-75.12c9.92-33.72,24.79-66.94,44.62-98.67
			c12.15-19.34,43.38-58.75,58.51-51.32c9.17,4.46,9.92,18.84,7.19,30.49c-6.94,29.5-33.22,58.01-59.99,77.59
			c-5.7,4.21-11.9,7.69-18.34,9.92c-2.23,0.74-3.97,1.73-4.71,3.72c-4.46,12.15-9.92,22.56-11.4,33.72
			c-0.25,1.98,0.5,1.98,2.23,1.98c29-6.45,45.86-21.57,78.59-37.68c5.95-4.71,11.65-4.21,14.38,0.5c1.73,2.73,1.73,5.7-0.5,8.68
			c-7.68,10.91-45.86,29.5-67.68,38.42c-7.93,3.22-15.12,5.45-22.06,6.69c-1.98,0.25-1.98,0.5-0.99,2.23l2.48,4.46
			c7.69,11.4,10.91,22.81,10.66,34.71c0,19.09-8.18,43.88-25.29,43.88C3064.01,672.92,3060.79,656.81,3060.79,638.71z
			 M3087.81,621.61c-0.5-5.95-5.21-16.36-7.44-17.6c-0.99,0.99-2.48,15.87-2.98,22.56c-0.99,14.38,0,27.77,2.48,28.26
			C3085.33,656.32,3088.8,632.52,3087.81,621.61z M3115.82,505.84c13.88-11.16,25.29-22.56,34.71-34.71
			c7.44-9.42,16.36-27.27,16.36-36.19c0-2.23-0.5-3.22-2.23-1.49c-28.51,28.51-34.46,37.43-52.8,75.36
			C3113.34,507.82,3114.58,506.83,3115.82,505.84z" style="fill: #d0e4c3;"></path>
                    </g>
                    <g>
                      <g>
                        <path d="M2689.78,567.25c13.73,15.81,35.12,23.71,55.85,20.84c18.88-2.61,42.16-17.92,31.84-39.82
				c-4.48-9.5-13.65-15.75-22.92-20.05c-5.54-2.57-11.26-4.45-17.14-6.02c-4.94-1.32-12.61-2.53-14.67-8.13
				c-5.1-13.84,16.48-21.68,26.41-21.64c12.39,0.06,22.86,7.02,29,17.51c5.35,9.15,19.61,0.87,14.23-8.32
				c-11.44-19.56-34.12-29.86-56.34-23.98c-20.12,5.33-42.07,30.33-23.91,50.04c7.59,8.24,18.87,9.28,28.91,12.76
				c7.76,2.69,29.55,12.38,20,23.58c-6.94,8.14-21.21,9.25-31.03,7.69c-11.35-1.8-21.08-7.49-28.57-16.12
				C2694.47,547.57,2682.85,559.27,2689.78,567.25L2689.78,567.25z" style="fill: #d0e4c3;"></path>
                      </g>
                    </g>
                    <g>
                      <path d="M2796.54,636.54c-0.65-4.1-4.54-6.84-8.6-6.08c-44.85,8.34-89,1.1-129.4-29.43
			c-19.96-15.09-33.35-35.45-40.94-45.04c-0.91-1.15-2.32-1.8-3.79-1.7c-3.59,0.25-6.99,1.82-9.27,5.13
			c-0.01,0.01-0.01,0.03-0.02,0.04c-0.68,1.45-0.4,3.19,0.59,4.45c7.82,10.08,22.19,31.85,44.17,48.54
			c33.95,25.78,72.05,35.08,109.92,35.29c10.31,0.06,20.68-0.86,31.04-2.76C2794.24,644.23,2797.18,640.55,2796.54,636.54z" style="fill: #d0e4c3;"></path>
                    </g>
                    <g>
                      <path d="M2826.07,639.19c-1.41-0.01-2.83-0.51-3.97-1.52l-11.7-10.34c-2.5-2.21-2.74-6.03-0.53-8.54
			c2.21-2.5,6.04-2.74,8.54-0.53l11.7,10.34c2.5,2.21,2.74,6.03,0.53,8.54C2829.43,638.51,2827.76,639.2,2826.07,639.19z" style="fill: #d0e4c3;"></path>
                    </g>
                    <g>
                      <path d="M2817.53,653.04c-1.07-0.01-2.16-0.3-3.14-0.9c-2.84-1.75-3.73-5.48-1.97-8.32l8.54-13.85
			c1.75-2.84,5.48-3.73,8.32-1.97c2.84,1.75,3.73,5.48,1.97,8.32l-8.54,13.85C2821.56,652.03,2819.57,653.05,2817.53,653.04z" style="fill: #d0e4c3;"></path>
                    </g>
                    <g>
                      <path d="M3046.11,469.04c-2.36,0-4.59-1.38-5.57-3.69c-1.3-3.07,0.13-6.63,3.21-7.93l14.37-6.1
			c3.07-1.31,6.63,0.13,7.93,3.21c1.3,3.07-0.13,6.63-3.21,7.93l-14.37,6.1C3047.7,468.88,3046.9,469.04,3046.11,469.04z" style="fill: #d0e4c3;"></path>
                    </g>
                    <g>
                      <path d="M3069.3,476.62c-1.99,0-3.93-0.98-5.09-2.77l-8.81-13.68c-1.81-2.81-1-6.55,1.81-8.36
			c2.81-1.81,6.55-1,8.36,1.81l8.81,13.68c1.81,2.81,1,6.55-1.81,8.36C3071.55,476.31,3070.42,476.62,3069.3,476.62z" style="fill: #d0e4c3;"></path>
                    </g>
                  </g>
                </svg>
              </div>
            </div>
            <table style="width: 100%;" cellpadding="0" cellspacing="0" role="presentation">
              <tr>
                <td class="sm-px-6" style="border-radius: 4px; background-color: #fff; padding: 48px; font-size: 16px; color: #334155; box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05)">
                  <h1 class="sm-leading-8" style="margin: 0 0 24px; font-size: 24px; font-weight: 600; color: #000">
                    Hola ${name},
                  </h1>
                  <p style="margin: 0; line-height: 24px">
                    Gracias por usar Sweif, estamos esperando recibir tu dinero en nuestra cuenta.
                    <br>
                    <br>
                    Información de la transacción: <br>
                    Monto: ${input_currency} ${input_amount}<br>
                    Tasa: ${rate}<br>
                    Monto a recibir: ${output_currency} ${output_amount}<br>
                    <br>
                    <br>
                    En unos minutos te notificaremos vía correo electrónico que hemos recibido tu dinero.
                  </p>
                  <div role="separator" style="background-color: #e2e8f0; height: 1px; line-height: 1px; margin: 32px 0">&zwj;</div>
                  <p style="margin: 0;">
                    ¡Transferencias rápidas y seguras!
                    <br>
                    <br>
                    Gracias, <br>Equipo Sweif
                  </p>
                </td>
              </tr>
              <tr role="separator">
                <td style="line-height: 48px">&zwj;</td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>
  </div>
</body>
`})
