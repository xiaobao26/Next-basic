import WelcomeTemplate from '@/emails/WelcomeTemplate';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';


const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
    const data = await resend.emails.send({
        // domain that you own
        from: 'whatever@codewithxxb.com',
        to:'xiaobao.xue@outlook.com',
        subject: 'test',
        react: <WelcomeTemplate name="xue" />,
    })
    return NextResponse.json(data);
    
}