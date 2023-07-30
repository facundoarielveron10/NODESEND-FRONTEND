// ---- IMPORTACIONES ---- //
import AppState from '@/context/app/AppState';
import { Inter } from 'next/font/google';
import './globals.css';
// ----------------------- //

// ---- METADATA ---- //
export const metadata = {
    title: 'NodeSend',
    icons: {
        icon: '/nodesend.png',
    },
};
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
        <html lang="es">
            <body className={inter.className}>
                <AppState>{children}</AppState>
            </body>
        </html>
    );
}
// --------------------------- //
