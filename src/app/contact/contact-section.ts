import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-contact',
  imports: [CommonModule],
  templateUrl: './contact-section.html',
  styleUrl: './contact-section.css'
})
export class ContactSection {
  isSending = false;
  statusMessage = '';
  statusType: 'success' | 'error' | '' = '';

  async sendMessage(event: SubmitEvent): Promise<void> {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const firstName = String(formData.get('firstName') ?? '').trim();
    const lastName = String(formData.get('lastName') ?? '').trim();
    const fromEmail = String(formData.get('email') ?? '').trim();
    const message = String(formData.get('message') ?? '').trim();

    if (!firstName || !lastName || !fromEmail || !message) {
      this.showStatus('Please fill in all required fields.', 'error');
      return;
    }

    this.isSending = true;
    this.statusMessage = '';
    this.statusType = '';

    try {
      await emailjs.send('service_fwj1q64', 'template_iv7uowd', {
        name: `${firstName} ${lastName}`,
        from_email: fromEmail,
        message,
        phone: String(formData.get('phone') ?? '').trim(),
        service: String(formData.get('service') ?? '').trim(),
        time: new Date().toLocaleString('fr-FR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
      }, 'ifofOfoggt5NaV54l');

      form.reset();
      this.showStatus('Your message has been sent successfully. I will get back to you soon.', 'success');
    } catch {
      this.showStatus('An error occurred while sending your message. Please try again.', 'error');
    } finally {
      this.isSending = false;
    }
  }

  private showStatus(message: string, type: 'success' | 'error'): void {
    this.statusMessage = message;
    this.statusType = type;
  }
}
