import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export const emailService = {
  sendWelcomeEmail: async (user: any) => {
    try {
      await resend.emails.send({
        from: 'StudyHive <onboarding@resend.dev>',
        to: user.email,
        subject: `Welcome to StudyHive 2.0, ${user.name}!`,
        html: `
          <h1>Welcome to StudyHive 2.0!</h1>
          <p>Hi ${user.name}, we're excited to help you ace your ${user.examTarget} exams.</p>
          <p>Your ARIA academic profile has been initialized.</p>
          <a href="${process.env.FRONTEND_URL}/dashboard">Go to Dashboard</a>
        `
      })
    } catch (e) {
      console.error('Error sending welcome email', e)
    }
  },

  sendDailyReminder: async (user: any, tasks: any[]) => {
    try {
      await resend.emails.send({
        from: 'StudyHive <reminders@resend.dev>',
        to: user.email,
        subject: `Your ${user.examTarget} Daily Tasks`,
        html: `
          <h2>Here are your top 3 tasks today:</h2>
          <ul>${tasks.map(t => `<li>${t}</li>`).join('')}</ul>
        `
      })
    } catch (e) {
      console.error('Error sending daily reminder', e)
    }
  },

  sendWeeklyReport: async (user: any, report: any) => {
    try {
      await resend.emails.send({
        from: 'StudyHive <reports@resend.dev>',
        to: user.email,
        subject: `Your StudyHive Weekly Report, ${user.name}`,
        html: `<h2>Weekly Summary</h2><p>${report.summary || 'A solid week of study!'}</p>`
      })
    } catch (e) {
      console.error('Error sending weekly report', e)
    }
  },

  sendStreakAlert: async (user: any) => {
    try {
      await resend.emails.send({
        from: 'StudyHive <alerts@resend.dev>',
        to: user.email,
        subject: `Don't break your ${user.streak} day streak!`,
        html: `<h3>Log in now to save your streak!</h3>`
      })
    } catch (e) {
      console.error('Error sending streak alert', e)
    }
  },

  sendRankUpEmail: async (user: any, newRank: string) => {
    try {
      await resend.emails.send({
        from: 'StudyHive <achievements@resend.dev>',
        to: user.email,
        subject: `You ranked up to ${newRank}!`,
        html: `<h2>Congratulations!</h2><p>You have reached the <b>${newRank}</b> rank.</p>`
      })
    } catch (e) {
      console.error('Error sending rank up email', e)
    }
  }
}
