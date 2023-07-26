// ---- IMPORTACIONES ---- //
// ----------------------- //

// ---- COMPONENTE (HEADER) ---- //
export default function Header() {
    return (
        <header className="py-8 flex flex-col md:flex-row items-center justify-between">
            <img
                className="w-64 mb-8 md:mb-0"
                src="/img/logo.svg"
                alt="NodeSend Logotipo"
            />
        </header>
    );
}
// ----------------------------- //
