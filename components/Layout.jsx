// ---- IMPORTACIONES ---- //
import Header from './Header';
// ----------------------- //

// ---- COMPONENTE (LAYOUT) ---- //
export default function Layout({ children }) {
    return (
        <>
            {/* Contenedor */}
            <div className="bg-gray-100 min-h-screen">
                {/* Header */}
                <Header />
                {/* Contenido de las paginas */}
                <div className="container mx-auto">{children}</div>
            </div>
        </>
    );
}
// ----------------------------- //
