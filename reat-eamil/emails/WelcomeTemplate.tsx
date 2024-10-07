import React from 'react';
import { Html, Body, Container, Text, Link, Preview, Tailwind } from '@react-email/components';

const WelcomeTemplate = ({ name}: { name: string }) => {
    return (
        <Html lang='en'>
            <Preview>Welcome aboard!</Preview>
                <Tailwind>
                    <Body className='bg-slate-100'>
                        <Container>
                            <Text className='text-black font-bold text-3xl'>Hello {name}!</Text>
                            <Link href="www.google.com">Google</Link>
                        </Container>
                    </Body>
                </Tailwind>
                
            
        </Html>
    )
}

export default WelcomeTemplate