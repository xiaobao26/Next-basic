import WelcomeTemplate from '@/emails/WelcomeTemplate';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
    await resend.emails.send({
        // domain that you own
        from: 'whatever@codewithxxb.com',
        to: ['765403734@qq.com'],
        subject: 'test',
        react: <WelcomeTemplate name="xue" />

    })
    return NextResponse.json({});
}