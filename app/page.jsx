// ---- IMPORTACIONES ---- //
import { metadata } from './layout';
import Layout from '@/components/Layout';
// ----------------------- //

// ---- METADATA ---- //
metadata.title = 'Inicio - NodeSend';
// ------------------ //

// ---- PAGINA (INICIO) ---- //
export default function Home() {
    return (
        <Layout>
            <div>Home</div>
        </Layout>
    );
}
// ------------------------- //
