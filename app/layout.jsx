// ---- IMPORTACIONES ---- //
import './globals.css';
// ----------------------- //

// ---- METADATA ---- //
export const metadata = {
    title: '',
    icons: {
        icon: '/nodesend.png',
    },
};
// ------------------ //

// ---- RAIZ DEL PROYECTO ---- //
export default function RootLayout({ children }) {
    return (
        <html lang="es">
            <body>{children}</body>
        </html>
    );
}
// --------------------------- //
