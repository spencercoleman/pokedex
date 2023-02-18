import { ReactNode } from 'react';
import Head from 'next/head';

interface Props {
    children: ReactNode;
}

const Layout = ({ children }: Props) => {
    return (
        <>
            <Head>
                <title>Pokédex</title>
                <meta name="description" content="" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {children}
        </>
    );
};

export default Layout;
