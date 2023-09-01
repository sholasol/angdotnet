using System;
namespace AngularAuthAPI.Helpers
{
	public static class EmailBody
	{
		public static string EmailStringBody(string email, string emailToken)
		{
			return $@"<html>
				<head>
					<meta charset=""utf-8"">
					<meta name=""viewport"" content=""width=device-width, initial-scale=1"">
					<title></title>
				</head>
				<body style=""margin: 0; padding: 0; font-family: Arial; Helvetical, sans-serif;"">
						<div style=""height: auto; background: linear-gradient(to top, #c9c9ff 50%, #6e6ef6 90%) no-repeat; width: 400px; padding: 30px"">
							<div>
								<h1>Reset your Password</h1>
								<hr>
								<p>You're receiving this email because you requested to reset your password</p>

								<p>Please tap the button below to choose a new password</p>

								<a href=""http://localhost:4200/reset?email={email}&code={emailToken}"" target=""_blank"" style=""background: #0d6efd;padding:10px;border:none; color: white; border-radius: 4px; display: block; margin:0 auto; width: 50%; text-align: center; text-decoration: none;"">Reset Password</a>

								<p>Kind regards</p>
							</div>
			
						</div>
				</body>
				</html>";
		}
	}
}

