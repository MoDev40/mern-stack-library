export const mailOtpHtml = (otp, name) => {
  return `
      <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        <header style="text-align: center; padding-bottom: 20px; border-bottom: 1px solid #ddd;">
            <a href="#">
                <img src="https://merakiui.com/images/full-logo.svg" alt="Ben Library" style="height: 40px;">
            </a>
        </header>
    
        <main style="margin-top: 20px;">
            <h2 style="color: #333;">Hi ${name},</h2>
    
            <p style="color: #555; font-size: 16px;">
                This is your verification code:
            </p>
    
            <div style="display: flex; justify-content: center; gap: 10px; margin-top: 20px;">
                ${otp
                  .split("")
                  .map(
                    (num) => `
                    <span style="display: flex; align-items: center; justify-content: center; width: 40px; height: 40px; font-size: 20px; font-weight: bold; color:blue;">
                        ${num}
                    </span>`
                  )
                  .join("")}
            </div>
    
            <p style="color: #555; font-size: 14px; margin-top: 20px;">
                This code will only be valid for the next <strong>10 minutes</strong>. 
            </p>
            
            <p style="color: #555; font-size: 14px; margin-top: 30px;">
                Thanks, <br>
                <strong>Ben Library Team</strong>
            </p>
        </main>
    
        <footer style="margin-top: 20px; padding-top: 10px; border-top: 1px solid #ddd; font-size: 12px; color: #777; text-align: center;">
            <p style="margin-top: 10px;">© ${new Date().getFullYear()} Ben Library. All Rights Reserved.</p>
        </footer>
      </div>`;
};
