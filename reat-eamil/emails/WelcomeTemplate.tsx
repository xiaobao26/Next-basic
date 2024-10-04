import React from 'react';
import { Html, Text, Body, Link, Preview, Container } from '@react-email/components';

const WelcomeTemplate = ({ name}: { name: string }) => {
    return (
        <Html>
            <Preview>Welcome aboard!</Preview>
                <Body>
                    <Container>
                        <Text>Hello {name}!</Text>
                        <Link href="www.google.com">Google</Link>
                    </Container>
                </Body>
            
        </Html>
    )
}

export default WelcomeTemplate