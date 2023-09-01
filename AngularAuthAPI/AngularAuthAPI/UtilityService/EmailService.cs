
using AngularAuthAPI.Models;
using MailKit.Net.Smtp;
using MimeKit;

namespace AngularAuthAPI.UtilityService
{
    public class EmailService : IEmailService
	{
		private readonly IConfiguration _config;

		public EmailService(IConfiguration configuration)
		{
			_config = configuration;
		}

		public void SendEmail(EmailModel emailModel)
		{
			var emailMessage = new MimeMessage(); //install netcore Mailkit
			var from = _config["EmailSettings:From"];
			emailMessage.From.Add(new MailboxAddress("No Reply", from));

			emailMessage.To.Add(new MailboxAddress(emailModel.To, emailModel.To));
			emailMessage.Subject = emailModel.Subject;
			emailMessage.Body = new TextPart(MimeKit.Text.TextFormat.Html)
			{
				Text = string.Format(emailModel.Content)
			};

			//send email using smtp
			using(var client = new SmtpClient())
			{
				try
				{
					client.Connect(_config["EmailSettings: SmtpServer"], 465, true);
					client.Authenticate(_config["EmailSettings: From"], _config["EmailSettings: Password"]);
					client.Send(emailMessage);
				}
				catch (Exception ex)
				{
					throw;
				}
				finally
				{
					client.Disconnect(true);
					client.Dispose();
				}
			}
		}
	}
}

