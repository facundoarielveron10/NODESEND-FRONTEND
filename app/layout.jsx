// ---- IMPORTACIONES ---- //
import AuthState from '@/context/auth/AuthState';
import { Inter } from 'next/font/google';
import './globals.css';
// ----------------------- //

// ---- METADATA ---- //
export function generateMetadata({ title }) {
    return {
        title: {
            default: 'NodeSend',
            template: `%s - NodeSend`,
        },
        icons: {
            icon: '/nodesend.png',
        },
    };
}
// ------------------ //

// ---- TIPOGRAFIA ---- //
const inter = Inter({
    subsets: ['latin'],
    weight: ['300', '400', '700'],
});
// -------------------- //

// ---- RAIZ DEL PROYECTO ---- //
export default function RootLayout({ children }) {
    return (
        <AuthState>
            <html lang="es">
                <body className={inter.className}>{children}</body>
            </html>
        </AuthState>
    );
}
// --------------------------- //
